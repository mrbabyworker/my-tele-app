import { NextResponse } from "next/server";

import { callTelegramBotApi } from "@/lib/telegram/bot-api";
import {
  clampEmploymentPercent,
  hasPersistentEmploymentStore,
  setEmploymentPercent,
} from "@/lib/employment-store";

export const runtime = "nodejs";

type TelegramWebhookUpdate = {
  message?: {
    chat?: {
      id?: number | string;
    };
    from?: {
      id?: number;
    };
    text?: string;
  };
};

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const incomingSecret = request.headers.get("x-telegram-bot-api-secret-token");

  if (secret && incomingSecret !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = (await request.json().catch(() => null)) as
    | TelegramWebhookUpdate
    | null;
  const message = update?.message;
  const chatId = message?.chat?.id;
  const text = message?.text?.trim() ?? "";

  if (!message || !chatId || !text) {
    return NextResponse.json({ ok: true });
  }

  if (!isBusynessCommand(text)) {
    return NextResponse.json({ ok: true });
  }

  if (!isAllowedAdmin(message.from?.id)) {
    await sendTelegramMessage(chatId, "У вас нет доступа к этой команде.");
    return NextResponse.json({ ok: true });
  }

  const percent = parseBusynessPercent(text);

  if (percent === null) {
    await sendTelegramMessage(
      chatId,
      "Используй команду в формате /busyness 9, где число от 0 до 100.",
    );
    return NextResponse.json({ ok: true });
  }

  if (process.env.NODE_ENV === "production" && !hasPersistentEmploymentStore()) {
    await sendTelegramMessage(
      chatId,
      "Хранилище процента загруженности не настроено.",
    );
    return NextResponse.json({ ok: true });
  }

  await setEmploymentPercent(percent);
  await sendTelegramMessage(chatId, "Процент загруженности обновлён");

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

function isBusynessCommand(text: string) {
  return /^\/busyness(?:@\w+)?(?:\s|$)/i.test(text);
}

function parseBusynessPercent(text: string) {
  const match = text.match(/^\/busyness(?:@\w+)?\s+(\d{1,3})\s*$/i);

  if (!match) {
    return null;
  }

  const percent = Number(match[1]);

  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    return null;
  }

  return clampEmploymentPercent(percent);
}

function isAllowedAdmin(userId: number | undefined) {
  const adminIds = (process.env.TELEGRAM_ADMIN_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (adminIds.length === 0) {
    return true;
  }

  return userId !== undefined && adminIds.includes(String(userId));
}

async function sendTelegramMessage(chatId: number | string, text: string) {
  await callTelegramBotApi("sendMessage", {
    chat_id: chatId,
    text,
  });
}
