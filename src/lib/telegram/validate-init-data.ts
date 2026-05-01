import { createHmac, timingSafeEqual } from "node:crypto";

export type TelegramValidationResult =
  | {
      isValid: true;
      authDate: Date;
      user?: TelegramWebAppUser;
    }
  | {
      isValid: false;
      reason: string;
    };

type ValidationOptions = {
  maxAgeSeconds?: number;
};

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24;

export function validateTelegramInitData(
  initData: string,
  botToken: string,
  options: ValidationOptions = {},
): TelegramValidationResult {
  if (!initData) {
    return { isValid: false, reason: "Missing initData" };
  }

  if (!botToken) {
    return { isValid: false, reason: "Missing bot token" };
  }

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");

  if (!hash) {
    return { isValid: false, reason: "Missing hash" };
  }

  params.delete("hash");

  const dataCheckString = Array.from(params.entries())
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const calculatedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (!safeCompareHex(hash, calculatedHash)) {
    return { isValid: false, reason: "Invalid hash" };
  }

  const authDateSeconds = Number(params.get("auth_date"));

  if (!Number.isFinite(authDateSeconds)) {
    return { isValid: false, reason: "Missing auth_date" };
  }

  const maxAgeSeconds = options.maxAgeSeconds ?? DEFAULT_MAX_AGE_SECONDS;
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (nowSeconds - authDateSeconds > maxAgeSeconds) {
    return { isValid: false, reason: "initData expired" };
  }

  return {
    isValid: true,
    authDate: new Date(authDateSeconds * 1000),
    user: parseTelegramUser(params.get("user")),
  };
}

function parseTelegramUser(rawUser: string | null) {
  if (!rawUser) {
    return undefined;
  }

  try {
    return JSON.parse(rawUser) as TelegramWebAppUser;
  } catch {
    return undefined;
  }
}

function safeCompareHex(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
