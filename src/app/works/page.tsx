"use client";

import { BottomMenu } from "@/components/bottom-menu";
import Image from "next/image";
import { useState } from "react";

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
  ],
};

type Segment = keyof typeof PROJECT_GROUPS;

export default function WorksPage() {
  const [activeSegment, setActiveSegment] = useState<Segment>("mine");
  const projects = PROJECT_GROUPS[activeSegment];

  function selectSegment(segment: Segment) {
    if (segment !== activeSegment) {
      window.Telegram?.WebApp.HapticFeedback?.selectionChanged?.();
    }

    setActiveSegment(segment);
  }

  return (
    <main className="works-screen">
      <section className="works-frame" aria-label="My Works">
        <div className="works-content">
          <header className="works-hero">
            <div className="works-hero__mascot" aria-hidden="true">
              <Image
                src="/fluffy-mascot.png"
                alt=""
                width={211}
                height={250}
                priority
              />
            </div>

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
              <article className="work-card" key={project.id}>
                <div className={`work-card__visual ${project.className}`} />
                <button className="work-card__cta" type="button">
                  Watch more
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="works-spacer" aria-hidden="true" />
        <BottomMenu activeTab="works" />
      </section>
    </main>
  );
}
