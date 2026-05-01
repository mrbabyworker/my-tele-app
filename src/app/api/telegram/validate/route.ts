import { NextResponse } from "next/server";

import { validateTelegramInitData } from "@/lib/telegram/validate-init-data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    initData?: unknown;
  } | null;

  if (!body || typeof body.initData !== "string") {
    return NextResponse.json(
      { ok: false, message: "initData is required" },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return NextResponse.json(
      { ok: false, message: "TELEGRAM_BOT_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const validation = validateTelegramInitData(body.initData, token);

  if (!validation.isValid) {
    return NextResponse.json(
      { ok: false, message: validation.reason },
      { status: 401 },
    );
  }

  const adminIds = new Set(
    (process.env.TELEGRAM_ADMIN_IDS ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );

  return NextResponse.json({
    ok: true,
    authDate: validation.authDate.toISOString(),
    user: validation.user,
    isAdmin: validation.user ? adminIds.has(String(validation.user.id)) : false,
  });
}
