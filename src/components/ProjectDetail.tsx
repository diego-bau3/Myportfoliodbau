import { useEffect, useRef } from "react";

import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";

type ProjectDetailProps = {
  /** The open project, or undefined when the panel is closed. */
  project: Project | undefined;
  onClose: () => void;
};

export default function ProjectDetail({
  project,
  onClose,
}: ProjectDetailProps) {
  const { ui } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus({ preventScroll: true });
  }, [project]);

  useEffect(() => {
    document.body.classList.toggle("detail-open", Boolean(project));
    return () => document.body.classList.remove("detail-open");
  }, [project]);

  useEffect(() => {
    if (!project) return;

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <section
      className="project-detail"
      aria-hidden={project ? "false" : "true"}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="project-detail-close"
        type="button"
        aria-label={ui.closeAria}
        ref={closeRef}
        onClick={onClose}
      >
        {ui.close}
      </button>
      {/* Stacked blocks: header row, then body. Further text and image blocks
          can be appended here without touching the header. */}
      <div className="project-detail-inner">
        <p className="project-detail-kicker">{ui.detailKicker}</p>
        <div className="project-detail-head">
          <h2 className="project-detail-title">{project?.detailTitle ?? ""}</h2>
          {project ? (
            <span className="project-detail-media">
              <img
                src={project.image}
                alt={project.title}
                className="project-detail-image"
                decoding="async"
              />
            </span>
          ) : null}
        </div>
        <div className="project-detail-copy">
          {project?.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
