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
    icon: (
      <MenuIcon
        className="hgi hgi-solid hgi-rounded hgi-source-code-circle"
        kind="works"
      />
    ),
  },
  {
    id: "main",
    label: "Main",
    href: "/",
    icon: (
      <MenuIcon
        className="hgi hgi-solid hgi-rounded hgi-user-circle"
        kind="main"
      />
    ),
  },
  {
    id: "assistant",
    label: "Assistant",
    href: "/assistant",
    icon: (
      <MenuIcon
        className="hgi hgi-solid hgi-rounded hgi-bubble-chat-spark-01"
        kind="assistant"
      />
    ),
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

function MenuIcon({
  className,
  kind,
}: {
  className: string;
  kind: BottomMenuTab;
}) {
  return (
    <i className={className}>
      <svg
        className="bottom-menu__icon-glyph"
        viewBox="0 0 24 24"
        focusable="false"
        aria-hidden="true"
      >
        {kind === "works" ? <WorksGlyph /> : null}
        {kind === "main" ? <MainGlyph /> : null}
        {kind === "assistant" ? <AssistantGlyph /> : null}
      </svg>
    </i>
  );
}

function WorksGlyph() {
  return (
    <>
      <path
        d="M12 2.25A9.75 9.75 0 1 0 12 21.75 9.75 9.75 0 0 0 12 2.25Zm0 2.25a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M9.18 8.05 5.7 11.1a1.18 1.18 0 0 0 0 1.8l3.48 3.05a1.12 1.12 0 0 0 1.48-1.68L8.2 12l2.46-2.27a1.12 1.12 0 1 0-1.48-1.68Zm5.64 0a1.12 1.12 0 0 0-1.48 1.68L15.8 12l-2.46 2.27a1.12 1.12 0 0 0 1.48 1.68l3.48-3.05a1.18 1.18 0 0 0 0-1.8l-3.48-3.05Z"
        fill="currentColor"
      />
    </>
  );
}

function MainGlyph() {
  return (
    <>
      <path
        d="M12 2.25A9.75 9.75 0 1 0 12 21.75 9.75 9.75 0 0 0 12 2.25Zm0 2.25a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M12 6.65a3.15 3.15 0 1 1 0 6.3 3.15 3.15 0 0 1 0-6.3Zm-5.15 10.8c.9-2.8 2.68-4.2 5.15-4.2s4.25 1.4 5.15 4.2a7.05 7.05 0 0 1-10.3 0Z"
        fill="currentColor"
      />
    </>
  );
}

function AssistantGlyph() {
  return (
    <>
      <path
        d="M7.1 5.8h8.55a4.72 4.72 0 0 1 4.72 4.72v2.5a4.72 4.72 0 0 1-4.72 4.72H12.2l-3.9 2.12a.86.86 0 0 1-1.27-.76v-1.42A4.72 4.72 0 0 1 2.38 13v-2.5A4.72 4.72 0 0 1 7.1 5.8Zm.22 3.96a1.28 1.28 0 1 0 0 2.56 1.28 1.28 0 0 0 0-2.56Zm4.2 0a1.28 1.28 0 1 0 0 2.56 1.28 1.28 0 0 0 0-2.56Zm4.2 0a1.28 1.28 0 1 0 0 2.56 1.28 1.28 0 0 0 0-2.56Z"
        fill="currentColor"
      />
      <path
        d="m18.82 2.64.4 1.05 1.05.4a.42.42 0 0 1 0 .78l-1.05.4-.4 1.05a.42.42 0 0 1-.78 0l-.4-1.05-1.05-.4a.42.42 0 0 1 0-.78l1.05-.4.4-1.05a.42.42 0 0 1 .78 0Z"
        fill="currentColor"
      />
    </>
  );
}
