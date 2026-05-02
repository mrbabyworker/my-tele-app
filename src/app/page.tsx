"use client";

import { BottomMenu } from "@/components/bottom-menu";
import Image from "next/image";

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

export default function Home() {
  return (
    <>
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
      </section>
      </main>
      <BottomMenu activeTab="main" />
    </>
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
