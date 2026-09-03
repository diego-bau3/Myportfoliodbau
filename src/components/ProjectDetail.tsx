import { useEffect, useMemo, useRef } from "react";
import portfolioPdf from "../../assets/diego-bau-portfolio.pdf";
import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";
import { homeSectionPath } from "../routing.ts";
import StationScene from "./StationScene.tsx";

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

const TOTAL_PROJECTS = Object.keys(PROJECT_NUMBERS).length;

const DETAIL_COPY = {
  en: {
    back: "Back to hangar",
    overview: "Overview",
    process: "Process",
    station: "Project station",
    archive: "Engineering archive",
    log: "Development log",
    discipline: "Discipline",
    period: "Period",
    records: "Visual records",
    entries: "Log entries",
    status: "Status",
    completed: "Completed",
    inDevelopment: "In development",
    undated: "Date not specified",
  },
  es: {
    back: "Volver al hangar",
    overview: "Resumen",
    process: "Proceso",
    station: "Estación de proyecto",
    archive: "Archivo de ingeniería",
    log: "Bitácora de desarrollo",
    discipline: "Disciplina",
    period: "Periodo",
    records: "Registros visuales",
    entries: "Entradas de bitácora",
    status: "Estado",
    completed: "Completado",
    inDevelopment: "En desarrollo",
    undated: "Fecha no especificada",
  },
} as const;

function projectVisuals(project: Project | undefined): string[] {
  if (!project?.blocks) return project ? [project.image] : [];

  const visuals: string[] = [];
  project.blocks.forEach((block) => {
    if (block.kind === "figures") visuals.push(...block.images);
    if (block.kind === "video" && block.poster) visuals.push(block.poster);
  });

  return visuals.length > 0 ? Array.from(new Set(visuals)) : [project.image];
}

function projectYear(project: Project | undefined, fallback: string): string {
  return project?.period?.end?.slice(0, 4) ?? project?.period?.start.slice(0, 4) ?? fallback;
}

function formatPeriod(project: Project, language: "en" | "es", fallback: string): string {
  if (!project.period) return fallback;

  const locale = language === "es" ? "es-MX" : "en-US";
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const formatMonth = (value: string): string => {
    const [year, month] = value.split("-").map(Number);
    return formatter.format(new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, 1)));
  };

  const start = formatMonth(project.period.start);
  const end = project.period.end ? formatMonth(project.period.end) : undefined;
  return end && end !== start ? `${start} – ${end}` : start;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { language, ui } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const copy = DETAIL_COPY[language];
  const projectNumber = project ? (PROJECT_NUMBERS[project.key] ?? "00") : "00";
  const presentation = project;
  const visualRecords = useMemo(() => projectVisuals(project), [project]);
  const processVisuals = visualRecords.slice(0, 3);
  const progress = `${(Number(projectNumber) / TOTAL_PROJECTS) * 100}%`;
  const recordCount = visualRecords.length;

  useEffect(() => {
    if (project) {
      if (!wasOpenRef.current) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      }
      wasOpenRef.current = true;
      dialogRef.current?.scrollTo({ top: 0 });
      dialogRef.current?.focus({ preventScroll: true });
      return;
    }

    if (wasOpenRef.current) {
      previouslyFocusedRef.current?.focus({ preventScroll: true });
      wasOpenRef.current = false;
    }
  }, [project]);

  useEffect(() => {
    document.body.classList.toggle("detail-open", Boolean(project));
    const background = document.querySelectorAll<HTMLElement>(".hangar-showcase");

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

      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialogRef.current)
      ) {
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
      tabIndex={project ? -1 : undefined}
    >
      <header className="project-detail-topbar">
        <button
          aria-label={ui.closeAria}
          className="project-detail-close"
          onClick={onClose}
          ref={closeRef}
          tabIndex={project ? 0 : -1}
          type="button"
        >
          <span aria-hidden="true">←</span>
          <span>{copy.back}</span>
        </button>

        <nav className="project-detail-nav" aria-label={ui.primaryNavigation}>
          <a
            href={homeSectionPath(language, "hangar-work", window.location.search)}
            onClick={(event) => {
              event.preventDefault();
              onClose();
              requestAnimationFrame(() => document.querySelector("#hangar-work")?.scrollIntoView());
            }}
          >
            {ui.work}
          </a>
          <a href={portfolioPdf} target="_blank" rel="noopener noreferrer">
            {ui.portfolioNav}
          </a>
        </nav>
      </header>

      {project && presentation ? (
        <div className="project-detail-inner">
          <section className="project-detail-overview-screen">
            <div
              className="project-detail-stage"
              data-project={project.key}
            >
              <StationScene
                projectKey={project.key}
                title={project.title}
                language={language}
                fallbackImage={project.image}
              />

              <section
                aria-label={`${copy.process}: ${project.title}`}
                className="project-detail-process"
              >
                <p className="project-detail-process-heading">{copy.process}</p>
                <div className="project-detail-process-grid">
                  {processVisuals.map((src, index) => (
                    <figure className="project-detail-process-card" key={src}>
                      <img
                        alt={`${project.title} — ${presentation.process[index] ?? copy.process}`}
                        decoding="async"
                        src={src}
                      />
                      <figcaption>
                        {presentation.process[index] ?? `${copy.process} ${index + 1}`}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>

            <aside className="project-detail-dossier">
              <div className="project-detail-dossier-copy">
                <h2 className="project-detail-title" id="project-detail-title">
                  {project.title}
                </h2>
                <p className="project-detail-dossier-meta">
                  {project.period ? `${projectYear(project, "")} · ` : ""}
                  {presentation.discipline}
                </p>

                <div className="project-detail-summary">
                  <h3>{copy.overview}</h3>
                  <p>{presentation.overview}</p>
                </div>

                <p className="project-detail-tags">
                  {presentation.tags.map((tag, index) => (
                    <span key={tag}>{index > 0 ? " · " : ""}{tag}</span>
                  ))}
                </p>
              </div>

              <div className="project-detail-progress" aria-label={`${projectNumber} / ${TOTAL_PROJECTS}`}>
                <p><strong>{projectNumber}</strong> / {String(TOTAL_PROJECTS).padStart(2, "0")}</p>
                <span aria-hidden="true"><i style={{ width: progress }} /></span>
              </div>
            </aside>
          </section>

          <div className="project-detail-workbench" id="project-detail-log">
            <aside className="project-detail-telemetry" aria-label={copy.archive}>
              <p className="project-detail-telemetry-title">{copy.station}</p>
              <dl>
                <div>
                  <dt>{copy.discipline}</dt>
                  <dd>{presentation.discipline}</dd>
                </div>
                <div>
                  <dt>{copy.period}</dt>
                  <dd>{formatPeriod(project, language, copy.undated)}</dd>
                </div>
                <div>
                  <dt>{copy.records}</dt>
                  <dd>{String(recordCount).padStart(2, "0")}</dd>
                </div>
                <div>
                  <dt>{copy.entries}</dt>
                  <dd>{String(project.blocks?.length ?? project.paragraphs?.length ?? 0).padStart(2, "0")}</dd>
                </div>
                {project.status ? (
                  <div>
                    <dt>{copy.status}</dt>
                    <dd className="is-online">
                      {project.status === "completed" ? copy.completed : copy.inDevelopment}
                    </dd>
                  </div>
                ) : null}
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
                    return <p className="project-detail-para" key={index}>{block.text}</p>;
                  }
                  if (block.kind === "heading") {
                    return <h3 className="project-detail-subhead" key={index}>{block.text}</h3>;
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
                        <a className="project-detail-link" href={block.href} rel="noreferrer" target="_blank">
                          {block.label}
                        </a>
                      </p>
                    );
                  }
                  return (
                    <div className="project-detail-figures" data-count={block.images.length} key={index}>
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
                  {project.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              )}
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
