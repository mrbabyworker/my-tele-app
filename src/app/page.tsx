"use client";

import { BottomMenu } from "@/components/bottom-menu";
import Image from "next/image";

const TELEGRAM_URL = "https://t.me/thealienton?direct";
const X_URL = "https://x.com/mrcactusx?s=21";
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

          <button className="about-card" type="button">
            <span className="about-card__panel">
              <span className="about-card__title">Hello</span>
              <span className="about-card__description">
                I am a developer and during my career I have developed more
                than 10 applications and websites for private startups and
                entrepreneurs. In this application you can contact me or ask
                questions to the AI assistant, find links to my social networks
                and view prototypes of projects created by me.
              </span>
            </span>

            <span className="about-card__footer">
              <span>Read more about me</span>
              <ArrowIcon />
            </span>
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
    <svg viewBox="0 0 496 512" focusable="false" aria-hidden="true">
      <path
        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8Zm121.8 169.9-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 512 512" focusable="false" aria-hidden="true">
      <path
        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48Zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 448 512" focusable="false" aria-hidden="true">
      <path
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141Zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7Zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8Zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S9.9 127.6 8.2 163.5c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.9Zm-47.8 224.6c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 512 512" focusable="false" aria-hidden="true">
      <path
        d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48H48ZM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L313.6 324.8c-34.1 25.6-81.1 25.6-115.2 0L0 176Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="about-card__arrow"
      viewBox="0 0 20 18"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M3 9h13M11 4l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}
