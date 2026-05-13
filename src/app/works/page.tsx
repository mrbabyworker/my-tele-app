"use client";

import { BottomMenu } from "@/components/bottom-menu";
import { LottieAnimation } from "@/components/lottie-animation";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type UIEvent,
} from "react";

type ProjectTheme = "cactus" | "aurora" | "coral" | "violet" | "mint";

type ProjectChip = {
  icon: string;
  label: string;
};

type ProjectCard = {
  id: string;
  title: string;
  subtitle: string;
  theme: ProjectTheme;
  chips: ProjectChip[];
  isCactusAssistant?: boolean;
};

const CACTUS_ASSISTANT_PROJECT: ProjectCard = {
  id: "mine-1",
  title: "CACTUS ASSISTANT",
  subtitle: "Have your AI assistant right inside Telegram.",
  theme: "cactus",
  isCactusAssistant: true,
  chips: [
    { icon: "AI", label: "Smart" },
    { icon: "24", label: "Online" },
    { icon: "spark", label: "Beta" },
  ],
};

const PLACEHOLDER_PROJECTS: ProjectCard[] = [
  {
    id: "mine-2",
    title: "AURORA BOARD",
    subtitle: "A bright concept space for the next polished idea.",
    theme: "aurora",
    chips: [
      { icon: "UI", label: "Soft" },
      { icon: "01", label: "Draft" },
      { icon: "spark", label: "Soon" },
    ],
  },
  {
    id: "mine-3",
    title: "CORAL STUDIO",
    subtitle: "Warm visual direction for a future mobile product.",
    theme: "coral",
    chips: [
      { icon: "UX", label: "Flow" },
      { icon: "02", label: "Mock" },
      { icon: "spark", label: "Soon" },
    ],
  },
  {
    id: "mine-4",
    title: "NOVA NOTES",
    subtitle: "Calm placeholder content with a premium card rhythm.",
    theme: "violet",
    chips: [
      { icon: "AI", label: "Idea" },
      { icon: "03", label: "Lab" },
      { icon: "spark", label: "Soon" },
    ],
  },
  {
    id: "mine-5",
    title: "MINT CANVAS",
    subtitle: "Fresh abstract surface reserved for upcoming work.",
    theme: "mint",
    chips: [
      { icon: "AR", label: "Visual" },
      { icon: "04", label: "New" },
      { icon: "spark", label: "Soon" },
    ],
  },
];

const PROJECT_GROUPS = {
  mine: [CACTUS_ASSISTANT_PROJECT, ...PLACEHOLDER_PROJECTS],
  other: PLACEHOLDER_PROJECTS.map((project, index) => ({
    ...project,
    id: `other-${index + 1}`,
  })),
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
  const [isWorksInfoMounted, setIsWorksInfoMounted] = useState(false);
  const [isWorksInfoOpen, setIsWorksInfoOpen] = useState(false);
  const [isProjectDetailsMounted, setIsProjectDetailsMounted] =
    useState(false);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  const [isProjectDetailsScrolled, setIsProjectDetailsScrolled] =
    useState(false);
  const worksInfoDragStartY = useRef<number | null>(null);
  const worksInfoDragOffset = useRef(0);
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

  function openWorksInfo() {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred?.("light");
    setIsWorksInfoMounted(true);
    window.requestAnimationFrame(() => setIsWorksInfoOpen(true));
  }

  function closeWorksInfo() {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred?.("light");
    setIsWorksInfoOpen(false);
  }

  function notifyHeroBadgeTap() {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred?.("light");
  }

  function handleWorksInfoPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    worksInfoDragStartY.current = event.clientY;
    worksInfoDragOffset.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleWorksInfoPointerMove(event: PointerEvent<HTMLElement>) {
    if (worksInfoDragStartY.current === null) {
      return;
    }

    const offset = Math.max(0, event.clientY - worksInfoDragStartY.current);
    worksInfoDragOffset.current = offset;
    event.currentTarget.style.setProperty(
      "--works-info-drag-offset",
      `${offset}px`,
    );
  }

  function handleWorksInfoPointerUp(event: PointerEvent<HTMLElement>) {
    if (worksInfoDragStartY.current === null) {
      return;
    }

    const sheet = event.currentTarget;
    worksInfoDragStartY.current = null;

    if (worksInfoDragOffset.current > 82) {
      sheet.style.removeProperty("--works-info-drag-offset");
      closeWorksInfo();
      return;
    }

    worksInfoDragOffset.current = 0;
    sheet.style.setProperty("--works-info-drag-offset", "0px");
    window.setTimeout(() => {
      sheet.style.removeProperty("--works-info-drag-offset");
    }, 260);
  }

  function handleWorksInfoPointerCancel(event: PointerEvent<HTMLElement>) {
    worksInfoDragStartY.current = null;
    worksInfoDragOffset.current = 0;
    event.currentTarget.style.removeProperty("--works-info-drag-offset");
  }

  function handleProjectDetailsScroll(event: UIEvent<HTMLDivElement>) {
    setIsProjectDetailsScrolled(event.currentTarget.scrollTop > 4);
  }

  useEffect(() => {
    if (!isWorksInfoMounted || isWorksInfoOpen) {
      return;
    }

    const unmountTimer = window.setTimeout(() => {
      setIsWorksInfoMounted(false);
    }, 540);

    return () => window.clearTimeout(unmountTimer);
  }, [isWorksInfoMounted, isWorksInfoOpen]);

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
    if (!isWorksInfoOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsWorksInfoOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWorksInfoOpen]);

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
              <div className="works-hero__badges" aria-label="My Works details">
                <button
                  className="works-hero-badge works-hero-badge--info"
                  type="button"
                  onClick={openWorksInfo}
                >
                  <span className="works-hero-badge__label">What is it?</span>
                  <span
                    className="works-hero-badge__icon works-hero-badge__icon--question"
                    aria-hidden="true"
                  />
                </button>

                <button
                  className="works-hero-badge works-hero-badge--employment"
                  type="button"
                  onClick={notifyHeroBadgeTap}
                >
                  <span
                    className="works-hero-badge__icon works-hero-badge__icon--employment"
                    aria-hidden="true"
                  />
                  <span className="works-hero-badge__label">Employment</span>
                </button>
              </div>

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
                <WorkProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={openProjectDetails}
                />
              ))}
            </div>
          </div>

          <div className="works-spacer" aria-hidden="true" />
        </section>
      </main>
      <BottomMenu activeTab="works" />

      {isWorksInfoMounted ? (
        <div
          className={`works-info-modal${
            isWorksInfoOpen ? " works-info-modal--open" : ""
          }`}
          aria-hidden={!isWorksInfoOpen}
        >
          <button
            className="works-info-modal__backdrop"
            type="button"
            aria-label="Close My Works information"
            onClick={closeWorksInfo}
          />

          <section
            className="works-info-modal__sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="works-info-title"
            aria-describedby="works-info-description"
            onPointerDown={handleWorksInfoPointerDown}
            onPointerMove={handleWorksInfoPointerMove}
            onPointerUp={handleWorksInfoPointerUp}
            onPointerCancel={handleWorksInfoPointerCancel}
          >
            <span className="works-info-modal__handle" aria-hidden="true" />

            <div className="works-info-visual" aria-labelledby="works-info-title">
              <div className="works-info-visual__gallery" aria-hidden="true">
                <article className="works-info-preview-card works-info-preview-card--aurora">
                  <div className="works-info-preview-card__visual">
                    <div className="works-info-preview-card__copy">
                      <span className="works-info-preview-card__title">
                        AURORA BOARD
                      </span>
                      <span className="works-info-preview-card__subtitle">
                        Soft concept space.
                      </span>
                    </div>
                    <span className="works-info-preview-card__abstract">
                      <span className="works-info-preview-card__abstract-mark" />
                    </span>
                  </div>
                  <div className="works-info-preview-card__cta">
                    <span>Watch more</span>
                  </div>
                </article>

                <article className="works-info-preview-card works-info-preview-card--coral">
                  <div className="works-info-preview-card__visual">
                    <div className="works-info-preview-card__copy">
                      <span className="works-info-preview-card__title">
                        CORAL STUDIO
                      </span>
                      <span className="works-info-preview-card__subtitle">
                        Visual direction.
                      </span>
                    </div>
                    <span className="works-info-preview-card__abstract">
                      <span className="works-info-preview-card__abstract-mark" />
                    </span>
                  </div>
                  <div className="works-info-preview-card__cta">
                    <span>Watch more</span>
                  </div>
                </article>

                <article className="works-info-preview-card works-info-preview-card--cactus">
                  <div className="works-info-preview-card__visual">
                    <div className="works-info-preview-card__copy">
                      <span className="works-info-preview-card__title">
                        CACTUS ASSISTANT
                      </span>
                      <span className="works-info-preview-card__subtitle">
                        AI assistant inside Telegram.
                      </span>
                      <span className="works-info-preview-card__chips">
                        <span className="works-info-preview-card__chip">
                          <span className="works-info-preview-card__chip-icon">
                            AI
                          </span>
                          Smart
                        </span>
                        <span className="works-info-preview-card__chip">
                          <span className="works-info-preview-card__chip-icon">
                            24
                          </span>
                          Online
                        </span>
                      </span>
                    </div>
                    <Image
                      className="works-info-preview-card__avatar"
                      src="/cactus-assistant-avatar.jpg"
                      alt=""
                      width={220}
                      height={220}
                    />
                  </div>
                  <div className="works-info-preview-card__cta">
                    <span className="works-info-preview-card__tea-mark" />
                    <span>Watch more</span>
                    <span className="works-info-preview-card__tea-mark" />
                  </div>
                </article>
              </div>
              <h2 className="works-info-visual__title" id="works-info-title">
                My Works
              </h2>
            </div>

            <div className="works-info-modal__cards" id="works-info-description">
              <article className="works-info-card works-info-card--projects">
                <span className="works-info-card__icon" aria-hidden="true">
                  <span className="works-info-card__icon-mark" />
                </span>
                <div className="works-info-card__copy">
                  <h3 className="works-info-card__title">My projects</h3>
                  <p className="works-info-card__text">
                    В разделе «My projects» представлены различные прототипы
                    проектов которые я делал. Благодаря этим прототипам можно
                    посмотреть какие визуальные и стилистические элементы я умею
                    делать при разработке. А также эти прототипы можно открыть и
                    протестировать на своём телефоне, что очень удобно.
                  </p>
                </div>
              </article>

              <article className="works-info-card works-info-card--other">
                <span className="works-info-card__icon" aria-hidden="true">
                  <span className="works-info-card__icon-mark" />
                </span>
                <div className="works-info-card__copy">
                  <h3 className="works-info-card__title">Other projects</h3>
                  <p className="works-info-card__text">
                    На странице «Other projects» представлены проекты созданные
                    мной или в разработке которых я принимал участие. О всех
                    проектах можно прочитать описание и узнать что именно
                    разрабатывалось мной. Все проекты можно открыть из приложения
                    и протестировать на своём устройстве.
                  </p>
                </div>
              </article>
            </div>

            <button
              className="works-info-modal__confirm"
              type="button"
              aria-label="OK"
              onClick={closeWorksInfo}
            >
              <span className="works-info-modal__confirm-label" aria-hidden="true" />
            </button>
          </section>
        </div>
      ) : null}

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

function WorkProjectCard({
  project,
  onOpenDetails,
}: {
  project: ProjectCard;
  onOpenDetails: () => void;
}) {
  const canOpenDetails = project.isCactusAssistant === true;

  return (
    <article
      className={`work-card work-card--featured premium-work-card premium-work-card--${project.theme}`}
    >
      <div className="premium-work-card__visual">
        <div className="premium-work-card__copy">
          <h2 className="premium-work-card__title">{project.title}</h2>
          <p className="premium-work-card__subtitle">{project.subtitle}</p>
          <div className="premium-work-card__chips" aria-hidden="true">
            {project.chips.map((chip) => (
              <span className="premium-work-card__chip" key={chip.label}>
                <span
                  className={`premium-work-card__chip-icon${
                    chip.icon === "spark"
                      ? " premium-work-card__chip-icon--spark"
                      : ""
                  }`}
                >
                  {chip.icon === "spark" ? null : chip.icon}
                </span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {project.isCactusAssistant ? (
          <Image
            className="premium-work-card__avatar"
            src="/cactus-assistant-avatar.jpg"
            alt=""
            width={260}
            height={260}
            priority
          />
        ) : (
          <span className="premium-work-card__abstract" aria-hidden="true">
            <span className="premium-work-card__abstract-mark" />
          </span>
        )}
      </div>

      <button
        className="work-card__cta premium-work-card__cta"
        type="button"
        onClick={canOpenDetails ? onOpenDetails : undefined}
      >
        <span className="premium-work-card__tea-mark" aria-hidden="true" />
        <span className="premium-work-card__cta-label">Watch more</span>
        <span className="premium-work-card__tea-mark" aria-hidden="true" />
      </button>
    </article>
  );
}
