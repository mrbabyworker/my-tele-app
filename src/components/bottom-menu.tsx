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
        className="hgi hgi-solid hgi-rounded hgi-bubble-chat-spark"
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
        className="fa-solid fa-circle-user"
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
        className="fa-jelly-fill fa-regular fa-grid"
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

function MainGlyph() {
  return (
    <>
      <path
        d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Z"
        fill="currentColor"
      />
      <path
        d="M12 6.28a3.14 3.14 0 1 1 0 6.28 3.14 3.14 0 0 1 0-6.28Zm-5.24 11.1c.88-2.82 2.7-4.45 5.24-4.45s4.36 1.63 5.24 4.45a7.38 7.38 0 0 1-10.48 0Z"
        fill="var(--bottom-menu-glyph-cutout)"
      />
    </>
  );
}

function WorksGlyph() {
  return (
    <>
      <path
        d="M5.98 4.5h9.36a5.32 5.32 0 0 1 5.32 5.32v2.86A5.32 5.32 0 0 1 15.34 18H12.2l-4.02 2.17a.82.82 0 0 1-1.2-.72V18h-1a5.32 5.32 0 0 1-5.32-5.32V9.82A5.32 5.32 0 0 1 5.98 4.5Z"
        fill="currentColor"
      />
      <path
        d="m18.78 2.34.42 1.1 1.1.42a.44.44 0 0 1 0 .82l-1.1.42-.42 1.1a.44.44 0 0 1-.82 0l-.42-1.1-1.1-.42a.44.44 0 0 1 0-.82l1.1-.42.42-1.1a.44.44 0 0 1 .82 0Z"
        fill="currentColor"
      />
      <circle cx="7.7" cy="11.24" r="1.08" fill="var(--bottom-menu-glyph-cutout)" />
      <circle cx="11.3" cy="11.24" r="1.08" fill="var(--bottom-menu-glyph-cutout)" />
      <circle cx="14.9" cy="11.24" r="1.08" fill="var(--bottom-menu-glyph-cutout)" />
    </>
  );
}

function AssistantGlyph() {
  return (
    <>
      <rect x="3.35" y="3.35" width="7.18" height="7.18" rx="1.72" fill="currentColor" />
      <rect x="13.47" y="3.35" width="7.18" height="7.18" rx="1.72" fill="currentColor" />
      <rect x="3.35" y="13.47" width="7.18" height="7.18" rx="1.72" fill="currentColor" />
      <rect x="13.47" y="13.47" width="7.18" height="7.18" rx="1.72" fill="currentColor" />
    </>
  );
}
