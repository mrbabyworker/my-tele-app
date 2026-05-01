# Telegram Mini App

Стартовая инфраструктура для личного Telegram Mini App на Next.js и Vercel.

## Локальный запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:3000`. В обычном браузере приложение покажет demo-режим, а внутри Telegram использует `window.Telegram.WebApp`.

## Переменные окружения

Скопируй `.env.example` в `.env.local` и заполни:

```bash
TELEGRAM_BOT_TOKEN=123456:bot-token-from-botfather
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
TELEGRAM_ADMIN_IDS=123456789,987654321
```

`TELEGRAM_BOT_TOKEN` нужен только на сервере для проверки `initData`. Не добавляй его в публичные переменные `NEXT_PUBLIC_*`.

## Настройка Telegram

1. Создай бота через BotFather и получи токен.
2. После деплоя на Vercel укажи URL Mini App в BotFather: `/setmenubutton` или `/newapp`.
3. В Vercel добавь `TELEGRAM_BOT_TOKEN` и `NEXT_PUBLIC_APP_URL`.

## Что уже готово

- Next.js App Router + TypeScript.
- Подключение Telegram WebApp SDK script.
- Клиентский hook для Telegram WebApp.
- Серверная проверка Telegram `initData`.
- API route `/api/telegram/validate`.
- Базовые Vercel headers и env-шаблон.

Документация Telegram: https://core.telegram.org/bots/webapps
