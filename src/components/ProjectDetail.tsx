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
      {/* Stacked blocks: header row, then body. Projects with `blocks` render an
          interleaved text/image article; the rest keep the title-plus-copy layout. */}
      <div className="project-detail-inner">
        <p className="project-detail-kicker">{ui.detailKicker}</p>
        {project?.blocks ? (
          <>
            <header className="project-detail-head-full">
              <h2 className="project-detail-title">{project.detailTitle}</h2>
              {project.date ? (
                <p className="project-detail-date">{project.date}</p>
              ) : null}
            </header>
            <div className="project-detail-article">
              {project.blocks.map((block, index) => {
                if (block.kind === "text") {
                  return (
                    <p className="project-detail-para" key={index}>
                      {block.text}
                    </p>
                  );
                }
                if (block.kind === "heading") {
                  return (
                    <h3 className="project-detail-subhead" key={index}>
                      {block.text}
                    </h3>
                  );
                }
                if (block.kind === "video") {
                  return (
                    <div className="project-detail-video-wrap" key={index}>
                      <video
                        className="project-detail-video"
                        src={block.src}
                        poster={block.poster}
                        controls
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  );
                }
                if (block.kind === "link") {
                  return (
                    <p className="project-detail-para" key={index}>
                      <a
                        className="project-detail-link"
                        href={block.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {block.label}
                      </a>
                    </p>
                  );
                }
                return (
                  <div
                    className="project-detail-figures"
                    data-count={block.images.length}
                    key={index}
                  >
                    {block.images.map((src) => (
                      <span className="project-detail-figure" key={src}>
                        <img
                          src={src}
                          alt={project.detailTitle}
                          className="project-detail-figure-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="project-detail-head">
              <h2 className="project-detail-title">
                {project?.detailTitle ?? ""}
              </h2>
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
              {project?.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
