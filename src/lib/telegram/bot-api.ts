type TelegramBotApiResponse<T> =
  | {
      ok: true;
      result: T;
    }
  | {
      ok: false;
      error_code: number;
      description: string;
    };

export async function callTelegramBotApi<T>(
  method: string,
  payload?: Record<string, unknown>,
  botToken = process.env.TELEGRAM_BOT_TOKEN,
) {
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload ?? {}),
  });

  const data = (await response.json()) as TelegramBotApiResponse<T>;

  if (!data.ok) {
    throw new Error(data.description);
  }

  return data.result;
}
