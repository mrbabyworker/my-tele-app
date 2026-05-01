"use client";

import Image from "next/image";
import { useState } from "react";

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/";
const X_URL = process.env.NEXT_PUBLIC_X_URL || "https://x.com/";
const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/";
const EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "contact@example.com";

const SOCIAL_LINKS = [
  {
    label: "Open Telegram",
    href: TELEGRAM_URL,
    icon: <TelegramIcon />,
    className: "social-button__icon--telegram",
  },
  {
    label: "Open X",
    href: X_URL,
    icon: <XIcon />,
    className: "social-button__icon--x",
  },
  {
    label: "Open Instagram",
    href: INSTAGRAM_URL,
    icon: <InstagramIcon />,
    className: "social-button__icon--instagram",
  },
  {
    label: "Send email",
    href: `mailto:${EMAIL_ADDRESS}`,
    icon: <MailIcon />,
    className: "social-button__icon--mail",
  },
];

const BOTTOM_TABS = [
  {
    id: "works",
    label: "My Works",
    icon: <WorksIcon />,
  },
  {
    id: "main",
    label: "Main",
    icon: <MainIcon />,
  },
  {
    id: "assistant",
    label: "Assistant",
    icon: <AssistantIcon />,
  },
];

export default function Home() {
  return (
    <main className="profile-screen">
      <section className="profile-frame" aria-label="Profile">
        <div className="profile-content">
          <div className="hero-avatar" aria-hidden="true">
            <Image
              src="/memoji-avatar.png"
              alt=""
              width={480}
              height={659}
              priority
            />
          </div>

          <h1 className="profile-name">Mr Cactus</h1>

          <div className="social-row" aria-label="Social links">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                className="social-button"
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noreferrer noopener"
                }
              >
                <span className={link.className} aria-hidden="true">
                  {link.icon}
                </span>
              </a>
            ))}
          </div>

          <button className="poster-card" type="button">
            <span className="poster-card__thumb" aria-hidden="true">
              <Image src="/memoji-avatar.png" alt="" width={72} height={72} />
            </span>
            <span className="poster-card__text">Фото и постер контакта</span>
            <ChevronIcon />
          </button>
        </div>

        <div className="profile-spacer" aria-hidden="true" />
        <BottomMenu />
      </section>
    </main>
  );
}

function BottomMenu() {
  const [activeTab, setActiveTab] = useState(1);

  function selectTab(index: number) {
    if (index !== activeTab) {
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged?.();
    }

    setActiveTab(index);
  }

  return (
    <nav
      className="bottom-menu"
      data-active-index={activeTab}
      aria-label="Primary navigation"
    >
      <span className="bottom-menu__indicator" aria-hidden="true" />

      <div className="bottom-menu__tabs" role="tablist">
        {BOTTOM_TABS.map((tab, index) => (
          <button
            key={tab.id}
            className="bottom-menu__tab"
            type="button"
            role="tab"
            aria-selected={index === activeTab}
            aria-label={tab.label}
            onClick={() => selectTab(index)}
          >
            <span className="bottom-menu__icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="bottom-menu__label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 64 56" focusable="false" aria-hidden="true">
      <path
        d="M58.1 3.7 4.8 24.3c-3.6 1.4-3.6 3.4-.6 4.3l13.7 4.3L49.6 13c1.5-.9 2.8-.4 1.7.6L25.6 36.8l-1 14.6c1.5 0 2.2-.7 3-1.5l7.3-7.1 15.2 11.2c2.8 1.6 4.8.8 5.5-2.6l10-46.9c1-4-1.5-5.8-7.5-.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 56 56" focusable="false" aria-hidden="true">
      <path
        d="m8 8 40 40M48 8 8 48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 58 58" focusable="false" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="40"
        height="40"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle
        cx="29"
        cy="29"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="41.5" cy="16.5" r="3.2" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 60 48" focusable="false" aria-hidden="true">
      <path
        d="M5 7h50v34H5V7Zm2 2 23 20L53 9M7 39l18-16M53 39 35 23"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="poster-card__chevron"
      viewBox="0 0 20 32"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="m5 4 10 12L5 28"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function WorksIcon() {
  return (
    <svg viewBox="0 0 44 44" focusable="false" aria-hidden="true">
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
      <defs>
        <mask id="main-icon-mask">
          <rect width="44" height="44" fill="black" />
          <circle cx="22" cy="22" r="18" fill="white" />
          <circle cx="22" cy="17.2" r="5.7" fill="black" />
          <path
            d="M11.4 33.1c2.1-6 5.8-9.2 10.6-9.2s8.5 3.2 10.6 9.2"
            fill="black"
            stroke="black"
            strokeLinecap="round"
            strokeWidth="4.4"
          />
        </mask>
      </defs>
      <rect
        width="44"
        height="44"
        fill="currentColor"
        mask="url(#main-icon-mask)"
      />
    </svg>
  );
}

function AssistantIcon() {
  return (
    <svg viewBox="0 0 44 44" focusable="false" aria-hidden="true">
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
