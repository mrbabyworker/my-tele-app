"use client";

import { useEffect, useState } from "react";

type TelegramWebAppState = {
  isReady: boolean;
  webApp: TelegramWebApp | null;
  initData: string;
  initDataUnsafe: TelegramWebAppInitDataUnsafe | null;
};

export function useTelegramWebApp(): TelegramWebAppState {
  const [state, setState] = useState<TelegramWebAppState>({
    isReady: false,
    webApp: null,
    initData: "",
    initDataUnsafe: null,
  });

  useEffect(() => {
    let isMounted = true;
    const webApp = window.Telegram?.WebApp;

    if (!webApp) {
      return undefined;
    }

    webApp.ready();
    webApp.expand();

    queueMicrotask(() => {
      if (!isMounted) {
        return;
      }

      setState({
        isReady: true,
        webApp,
        initData: webApp.initData,
        initDataUnsafe: webApp.initDataUnsafe,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
