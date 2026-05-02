"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export type BottomMenuTab = "works" | "main" | "assistant";

const BOTTOM_TABS: Array<{
  id: BottomMenuTab;
  label: string;
  href: string;
  icon: ReactNode;
}> = [
  {
    id: "works",
    label: "My Works",
    href: "/works",
    icon: <WorksIcon />,
  },
  {
    id: "main",
    label: "Main",
    href: "/",
    icon: <MainIcon />,
  },
  {
    id: "assistant",
    label: "Assistant",
    href: "/assistant",
    icon: <AssistantIcon />,
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
            <span className="bottom-menu__icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="bottom-menu__label">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function WorksIcon() {
  return (
    <svg viewBox="0 0 44 44" focusable="false" aria-hidden="true">
      <circle className="bottom-menu__icon-disc" cx="22" cy="22" r="18.2" />
      <path
        d="M15.8 14.2v-3.1c0-2.2 1.6-3.9 3.8-3.9h4.8c2.2 0 3.8 1.7 3.8 3.9v3.1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3.2"
      />
      <rect
        x="12.2"
        y="13.5"
        width="19.6"
        height="22.5"
        rx="6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M12.2 21.1h-3c-1.6 0-2.8 1.2-2.8 2.8v4.8c0 1.6 1.2 2.8 2.8 2.8h3M31.8 21.1h3c1.6 0 2.8 1.2 2.8 2.8v4.8c0 1.6-1.2 2.8-2.8 2.8h-3M19.6 13.5v3.3c0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4v-3.3M17.4 29.5h9.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3.2"
      />
    </svg>
  );
}

function MainIcon() {
  return (
    <svg viewBox="0 0 44 44" focusable="false" aria-hidden="true">
      <circle className="bottom-menu__icon-disc" cx="22" cy="22" r="18.2" />
      <circle cx="22" cy="17.2" r="5.7" fill="currentColor" />
      <path
        d="M11.6 33.1c2.1-6 5.7-9.2 10.4-9.2s8.3 3.2 10.4 9.2"
        fill="currentColor"
      />
    </svg>
  );
}

function AssistantIcon() {
  return (
    <svg viewBox="0 0 44 44" focusable="false" aria-hidden="true">
      <circle className="bottom-menu__icon-disc" cx="22" cy="22" r="18.2" />
      <path
        d="M22 8.2v5.1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3.2"
      />
      <circle cx="22" cy="6.4" r="3.2" fill="currentColor" />
      <rect
        x="10"
        y="14"
        width="24"
        height="20.8"
        rx="7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M10 23.2H7.8c-1.5 0-2.7 1.2-2.7 2.7v3c0 1.5 1.2 2.7 2.7 2.7H10M34 23.2h2.2c1.5 0 2.7 1.2 2.7 2.7v3c0 1.5-1.2 2.7-2.7 2.7H34"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3.2"
      />
      <circle cx="17.4" cy="23.8" r="2.2" fill="currentColor" />
      <circle cx="26.6" cy="23.8" r="2.2" fill="currentColor" />
      <path
        d="M18.4 29.5c1.1.9 2.3 1.3 3.6 1.3s2.5-.4 3.6-1.3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}
