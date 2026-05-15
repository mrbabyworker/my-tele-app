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
  try {
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const incomingSecret = request.headers.get("x-telegram-bot-api-secret-token");

    if (secret && incomingSecret !== secret) {
      console.warn("[telegram-webhook] rejected request with invalid secret");

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

    console.log("[telegram-webhook] busyness command received", {
      hasPersistentStore: hasPersistentEmploymentStore(),
      userId: message.from?.id,
    });

    if (!isAllowedAdmin(message.from?.id)) {
      console.warn("[telegram-webhook] rejected command from non-admin user", {
        userId: message.from?.id,
      });

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
      console.error("[telegram-webhook] persistent employment store is missing");

      await sendTelegramMessage(
        chatId,
        "Хранилище процента загруженности не настроено.",
      );

      return NextResponse.json({ ok: true });
    }

    await setEmploymentPercent(percent);
    console.log("[telegram-webhook] employment percent updated", { percent });

    await sendTelegramMessage(chatId, "Процент загруженности обновлён");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[telegram-webhook] failed to process update", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ ok: false }, { status: 500 });
  }
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
