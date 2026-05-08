"use client";

import { BottomMenu } from "@/components/bottom-menu";
import { LottieAnimation } from "@/components/lottie-animation";
import Image from "next/image";
import { useEffect, useState, type UIEvent } from "react";

const PROJECT_GROUPS = {
  mine: [
    {
      id: "mine-1",
      className: "work-card__visual--one",
    },
    {
      id: "mine-2",
      className: "work-card__visual--two",
    },
    {
      id: "mine-3",
      className: "work-card__visual--three",
    },
    {
      id: "mine-4",
      className: "work-card__visual--four",
    },
    {
      id: "mine-5",
      className: "work-card__visual--five",
    },
  ],
  other: [
    {
      id: "other-1",
      className: "work-card__visual--two",
    },
    {
      id: "other-2",
      className: "work-card__visual--one",
    },
    {
      id: "other-3",
      className: "work-card__visual--four",
    },
    {
      id: "other-4",
      className: "work-card__visual--five",
    },
    {
      id: "other-5",
      className: "work-card__visual--three",
    },
  ],
};

type Segment = keyof typeof PROJECT_GROUPS;

const CACTUS_ASSISTANT_DETAILS = [
  "Cactus Assistant is a Telegram-native AI companion for quick, natural work inside the chat environment you already use every day. It helps with ideas, drafts, explanations, planning, translations, coding questions, and fast answers without forcing you to leave Telegram or switch context. The assistant is always close to the conversation, so a useful response feels only one tap away.",
  "The assistant is designed to feel calm and personal: short requests stay quick, complex questions can unfold into deeper conversations, and every response is tuned for comfortable mobile reading. You can shape prompts, polish messages, summarize information, prepare tasks, and turn scattered thoughts into clean next steps.",
  "For creators, students, and builders, Cactus Assistant becomes a small command center for turning rough notes into useful output before the idea disappears. It keeps practical project work close to the conversation, so you can refine a message, prepare an idea, or organize a task without opening another tool.",
  "The interface stays lightweight and premium, with a friendly visual identity, smooth motion, and controls that feel native to a Telegram mini app. The goal is simple: keep an intelligent assistant close enough to become part of your everyday rhythm while preserving the speed and ease of a conversation. Everything is shaped to stay quiet, readable, and useful on a mobile screen.",
];

export default function WorksPage() {
  const [activeSegment, setActiveSegment] = useState<Segment>("mine");
  const [isProjectDetailsMounted, setIsProjectDetailsMounted] =
    useState(false);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  const [isProjectDetailsScrolled, setIsProjectDetailsScrolled] =
    useState(false);
  const projects = PROJECT_GROUPS[activeSegment];

  function selectSegment(segment: Segment) {
    if (segment !== activeSegment) {
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged?.();
    }

    setActiveSegment(segment);
  }

  function openProjectDetails() {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred?.("light");
    setIsProjectDetailsScrolled(false);
    setIsProjectDetailsMounted(true);
    window.requestAnimationFrame(() => setIsProjectDetailsOpen(true));
  }

  function closeProjectDetails() {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred?.("light");
    setIsProjectDetailsOpen(false);
  }

  function handleProjectDetailsScroll(event: UIEvent<HTMLDivElement>) {
    setIsProjectDetailsScrolled(event.currentTarget.scrollTop > 4);
  }

  useEffect(() => {
    if (!isProjectDetailsMounted || isProjectDetailsOpen) {
      return;
    }

    const unmountTimer = window.setTimeout(() => {
      setIsProjectDetailsMounted(false);
    }, 540);

    return () => window.clearTimeout(unmountTimer);
  }, [isProjectDetailsMounted, isProjectDetailsOpen]);

  useEffect(() => {
    if (!isProjectDetailsOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProjectDetailsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProjectDetailsOpen]);

  return (
    <>
      <main className="works-screen">
        <section className="works-frame" aria-label="My Works">
          <div className="works-content">
            <header className="works-hero">
              <LottieAnimation
                className="works-hero__mascot"
                path="/fluffy-mascot.tgs.json"
              />

              <h1 className="works-title">My Works</h1>
              <p className="works-subtitle">
                On this page are projects that belong to me or projects in
                creation of which I participated
              </p>
            </header>

            <div
              className="works-segmented"
              data-selected={activeSegment}
              role="tablist"
              aria-label="Project type"
            >
              <span className="works-segmented__pill" aria-hidden="true" />
              <button
                className="works-segmented__button"
                type="button"
                role="tab"
                aria-selected={activeSegment === "mine"}
                onClick={() => selectSegment("mine")}
              >
                My projects
              </button>
              <button
                className="works-segmented__button"
                type="button"
                role="tab"
                aria-selected={activeSegment === "other"}
                onClick={() => selectSegment("other")}
              >
                Other projects
              </button>
            </div>

            <div className="works-list" aria-label="Project cards">
              {projects.map((project) => (
                <article
                  className={`work-card${
                    project.id === "mine-1" ? " work-card--featured" : ""
                  }`}
                  key={project.id}
                >
                  {project.id === "mine-1" ? (
                    <>
                      <div className="cactus-work-card__visual">
                        <div className="cactus-work-card__copy">
                          <h2 className="cactus-work-card__title">
                            CACTUS ASSISTANT
                          </h2>
                          <p className="cactus-work-card__subtitle">
                            Have your AI assistant right inside Telegram.
                          </p>
                          <div
                            className="cactus-work-card__chips"
                            aria-hidden="true"
                          >
                            <span className="cactus-work-card__chip">
                              <span className="cactus-work-card__chip-icon">
                                AI
                              </span>
                              Smart
                            </span>
                            <span className="cactus-work-card__chip">
                              <span className="cactus-work-card__chip-icon">
                                24
                              </span>
                              Online
                            </span>
                            <span className="cactus-work-card__chip">
                              <span className="cactus-work-card__chip-icon cactus-work-card__chip-icon--spark" />
                              Beta
                            </span>
                          </div>
                        </div>
                        <Image
                          className="cactus-work-card__avatar"
                          src="/cactus-assistant-avatar.jpg"
                          alt=""
                          width={260}
                          height={260}
                          priority
                        />
                      </div>
                      <button
                        className="work-card__cta cactus-work-card__cta"
                        type="button"
                        onClick={openProjectDetails}
                      >
                        <span
                          className="cactus-work-card__tea-mark"
                          aria-hidden="true"
                        />
                        <span className="cactus-work-card__cta-label">
                          Watch More
                        </span>
                        <span
                          className="cactus-work-card__tea-mark"
                          aria-hidden="true"
                        />
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className={`work-card__visual ${project.className}`}
                      />
                      <button className="work-card__cta" type="button">
                        Watch more
                      </button>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="works-spacer" aria-hidden="true" />
        </section>
      </main>
      <BottomMenu activeTab="works" />

      {isProjectDetailsMounted ? (
        <div
          className={`project-details-modal${
            isProjectDetailsOpen ? " project-details-modal--open" : ""
          }`}
          aria-hidden={!isProjectDetailsOpen}
        >
          <button
            className="project-details-modal__backdrop"
            type="button"
            aria-label="Close project details"
            onClick={closeProjectDetails}
          />

          <section
            className="project-details-modal__sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            aria-describedby="project-details-description"
          >
            <header className="project-details-modal__header">
              <button
                className="project-details-modal__close"
                type="button"
                aria-label="Close project details"
                onClick={closeProjectDetails}
              >
                <span aria-hidden="true" />
              </button>

              <h2
                className="project-details-modal__title"
                id="project-details-title"
              >
                Cactus Assistant
              </h2>
            </header>

            <div
              className={`project-details-modal__scroll-shell${
                isProjectDetailsScrolled
                  ? " project-details-modal__scroll-shell--scrolled"
                  : ""
              }`}
            >
              <span
                className="project-details-modal__fade project-details-modal__fade--top"
                aria-hidden="true"
              />
              <div
                className="project-details-modal__body"
                id="project-details-description"
                tabIndex={0}
                onScroll={handleProjectDetailsScroll}
              >
                {CACTUS_ASSISTANT_DETAILS.map((paragraph) => (
                  <p className="project-details-modal__paragraph" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <span
                className="project-details-modal__fade project-details-modal__fade--bottom"
                aria-hidden="true"
              />
            </div>

            <footer className="project-details-modal__footer">
              <button
                className="project-details-modal__confirm"
                type="button"
                onClick={closeProjectDetails}
              >
                Understood
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
