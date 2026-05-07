"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

export type BottomMenuTab = "works" | "main" | "assistant";

const BOTTOM_TABS: Array<{
  id: BottomMenuTab;
  label: string;
  href: string;
  icon: string;
}> = [
  {
    id: "works",
    label: "My Works",
    href: "/works",
    icon: "/menu-icons/works.png",
  },
  {
    id: "main",
    label: "Main",
    href: "/",
    icon: "/menu-icons/main.png",
  },
  {
    id: "assistant",
    label: "Assistant",
    href: "/assistant",
    icon: "/menu-icons/assistant.png",
  },
];

const ACTIVE_INDEX: Record<BottomMenuTab, number> = {
  works: 0,
  main: 1,
  assistant: 2,
};

type BottomMenuProps = {
  activeTab: BottomMenuTab;
};

export function BottomMenu({ activeTab }: BottomMenuProps) {
  const [pendingTab, setPendingTab] = useState<BottomMenuTab | null>(null);
  const visualTab = pendingTab ?? activeTab;
  const activeIndex = ACTIVE_INDEX[visualTab];

  function handleSelect(tab: BottomMenuTab) {
    if (tab !== visualTab) {
      setPendingTab(tab);
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged?.();
    }
  }

  return (
    <nav
      className="bottom-menu"
      data-active-index={activeIndex}
      aria-label="Primary navigation"
    >
      <span className="bottom-menu__indicator" aria-hidden="true" />

      <div className="bottom-menu__tabs" role="tablist">
        {BOTTOM_TABS.map((tab) => (
          <Link
            key={tab.id}
            className="bottom-menu__tab"
            href={tab.href}
            role="tab"
            aria-selected={tab.id === visualTab}
            aria-label={tab.label}
            onClick={() => handleSelect(tab.id)}
          >
            <span
              className="bottom-menu__icon"
              style={
                { "--menu-icon-url": `url("${tab.icon}")` } as CSSProperties
              }
              aria-hidden="true"
            />
            <span className="bottom-menu__label">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
