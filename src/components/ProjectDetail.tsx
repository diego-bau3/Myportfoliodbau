import { useEffect, useMemo, useRef } from "react";

import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";

type ProjectDetailProps = {
  /** The open project, or undefined when the panel is closed. */
  project: Project | undefined;
  onClose: () => void;
};

const PROJECT_NUMBERS: Record<string, string> = {
  cnc: "01",
  aircraft: "02",
  so101: "03",
  gripper: "04",
  wearable: "05",
  car: "06",
  bomba: "07",
  harv: "08",
};

const DETAIL_COPY = {
  en: {
    station: "Project station",
    archive: "Engineering archive",
    log: "Development log",
    discipline: "Discipline",
    period: "Period",
    records: "Visual records",
    entries: "Log entries",
    status: "Status",
    online: "Archive online",
    undated: "Ongoing archive",
  },
  es: {
    station: "Estación de proyecto",
    archive: "Archivo de ingeniería",
    log: "Bitácora de desarrollo",
    discipline: "Disciplina",
    period: "Periodo",
    records: "Registros visuales",
    entries: "Entradas de bitácora",
    status: "Estado",
    online: "Archivo disponible",
    undated: "Archivo en desarrollo",
  },
} as const;

export default function ProjectDetail({
  project,
  onClose,
}: ProjectDetailProps) {
  const { language, ui } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const copy = DETAIL_COPY[language];
  const projectNumber = project ? (PROJECT_NUMBERS[project.key] ?? "00") : "00";
  const recordCount = useMemo(
    () =>
      project?.blocks?.reduce(
        (total, block) =>
          total +
          (block.kind === "figures" ? block.images.length : block.kind === "video" ? 1 : 0),
        0,
      ) ?? 0,
    [project],
  );

  useEffect(() => {
    if (project) {
      if (!wasOpenRef.current) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      }
      wasOpenRef.current = true;
      closeRef.current?.focus({ preventScroll: true });
      return;
    }

    if (wasOpenRef.current) {
      previouslyFocusedRef.current?.focus({ preventScroll: true });
      wasOpenRef.current = false;
    }
  }, [project]);

  useEffect(() => {
    document.body.classList.toggle("detail-open", Boolean(project));
    const background = document.querySelectorAll<HTMLElement>(
      ".hangar-showcase, .hangar-about",
    );

    background.forEach((element) => {
      if (project) {
        element.setAttribute("inert", "");
        element.setAttribute("aria-hidden", "true");
      } else {
        element.removeAttribute("inert");
        element.removeAttribute("aria-hidden");
      }
    });

    return () => {
      document.body.classList.remove("detail-open");
      background.forEach((element) => {
        element.removeAttribute("inert");
        element.removeAttribute("aria-hidden");
      });
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <section
      aria-hidden={project ? "false" : "true"}
      aria-labelledby={project ? "project-detail-title" : undefined}
      aria-modal={project ? "true" : undefined}
      className="project-detail"
      id="project-detail-dialog"
      ref={dialogRef}
      role={project ? "dialog" : undefined}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="project-detail-architecture" aria-hidden="true">
        <span />
        <span />
      </div>

      <header className="project-detail-topbar">
        <span className="project-detail-mark">DBS</span>
        <span className="project-detail-topbar-label">
          {copy.station} / {projectNumber}
        </span>
        <button
          aria-label={ui.closeAria}
          className="project-detail-close"
          onClick={onClose}
          ref={closeRef}
          tabIndex={project ? 0 : -1}
          type="button"
        >
          <span>{ui.close}</span>
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <div className="project-detail-inner">
        <header className="project-detail-hero">
          <div className="project-detail-hero-copy">
            <p className="project-detail-kicker">
              {copy.archive} / {projectNumber}
            </p>
            <h2 className="project-detail-title" id="project-detail-title">
              {project?.detailTitle ?? ""}
            </h2>
            <div className="project-detail-hero-meta">
              <span>{project ? ui.sections[project.section] : ""}</span>
              <span>{project?.date ?? copy.undated}</span>
            </div>
          </div>

          <div className="project-detail-machine" aria-hidden={!project}>
            <span className="project-detail-machine-light" aria-hidden="true" />
            {project ? (
              <img
                alt={project.title}
                className="project-detail-machine-image"
                decoding="async"
                src={project.image}
              />
            ) : null}
            <span className="project-detail-machine-floor" aria-hidden="true" />
          </div>
        </header>

        {project ? (
          <div className="project-detail-workbench">
            <aside className="project-detail-telemetry" aria-label={copy.archive}>
              <p className="project-detail-telemetry-title">{copy.station}</p>
              <dl>
                <div>
                  <dt>{copy.discipline}</dt>
                  <dd>{ui.sections[project.section]}</dd>
                </div>
                <div>
                  <dt>{copy.period}</dt>
                  <dd>{project.date ?? copy.undated}</dd>
                </div>
                <div>
                  <dt>{copy.records}</dt>
                  <dd>{String(recordCount).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>{copy.entries}</dt>
                  <dd>{String(project.blocks?.length ?? project.paragraphs?.length ?? 0).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>{copy.status}</dt>
                  <dd className="is-online">{copy.online}</dd>
                </div>
              </dl>
            </aside>

            <article className="project-detail-article">
              <div className="project-detail-log-heading">
                <span>{copy.log}</span>
                <span>{projectNumber} / DBS</span>
              </div>

              {project.blocks ? (
                project.blocks.map((block, index) => {
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
                          controls
                          loop
                          muted
                          playsInline
                          poster={block.poster}
                          preload="metadata"
                          src={block.src}
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
                          rel="noreferrer"
                          target="_blank"
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
                      {block.images.map((src, imageIndex) => (
                        <figure className="project-detail-figure" key={src}>
                          <img
                            alt={`${project.detailTitle} — ${copy.records} ${index + 1}.${imageIndex + 1}`}
                            className="project-detail-figure-img"
                            decoding="async"
                            loading="lazy"
                            src={src}
                          />
                          <figcaption>
                            {projectNumber}.{String(index + 1).padStart(2, "0")}.
                            {String(imageIndex + 1).padStart(2, "0")}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="project-detail-copy">
                  {project.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </article>
          </div>
        ) : null}
      </div>
    </section>
  );
}
