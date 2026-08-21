import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";

import portfolioPdf from "../../assets/diego-bau-portfolio.pdf";
import hangarBackground from "../../assets/hangar-background-v1.png";
import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";
import type { Language } from "../i18n.tsx";

type ProjectDetailProps = {
  /** The open project, or undefined when the panel is closed. */
  project: Project | undefined;
  onClose: () => void;
};

type StationPresentation = {
  bayTitle: string;
  discipline: string;
  overview: string;
  tags: string[];
  process: string[];
};

type StationStyle = CSSProperties & {
  "--station-machine-bottom": string;
  "--station-machine-left": string;
  "--station-machine-width": string;
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

const STATION_PRESENTATION: Record<
  string,
  Record<Language, StationPresentation>
> = {
  cnc: {
    en: {
      bayTitle: "CUSTOM CNC LATHE",
      discipline: "MECHANICAL ENGINEERING",
      overview:
        "An in-house CNC lathe designed, manufactured and tuned from the ground up as a rigid precision system.",
      tags: ["DESIGN", "MANUFACTURING", "VALIDATION"],
      process: ["CONCEPT", "FABRICATION", "VIBRATION CONTROL"],
    },
    es: {
      bayTitle: "TORNO CNC",
      discipline: "INGENIERÍA MECÁNICA",
      overview:
        "Un torno CNC diseñado, manufacturado y ajustado desde cero como un sistema rígido de precisión.",
      tags: ["DISEÑO", "MANUFACTURA", "VALIDACIÓN"],
      process: ["CONCEPTO", "FABRICACIÓN", "CONTROL DE VIBRACIÓN"],
    },
  },
  aircraft: {
    en: {
      bayTitle: "RC AIRCRAFT",
      discipline: "AERONAUTICS",
      overview:
        "A complete combustion-powered scale aircraft designed, manufactured and tested as an integrated engineering system.",
      tags: ["DESIGN", "MANUFACTURING", "TESTING"],
      process: ["PROCESS", "STRUCTURAL ANALYSIS", "AERODYNAMICS"],
    },
    es: {
      bayTitle: "AVIÓN RC",
      discipline: "AERONÁUTICA",
      overview:
        "Un avión a escala con motor de combustión, diseñado, manufacturado y probado como un sistema de ingeniería integrado.",
      tags: ["DISEÑO", "MANUFACTURA", "PRUEBAS"],
      process: ["PROCESO", "ANÁLISIS ESTRUCTURAL", "AERODINÁMICA"],
    },
  },
  so101: {
    en: {
      bayTitle: "SO-101 ROBOTIC ARM",
      discipline: "ROBOTICS",
      overview:
        "A multi-arm learning platform built for teleoperation, data capture and structural optimization.",
      tags: ["ROBOTICS", "SIMULATION", "DATA"],
      process: ["ASSEMBLY", "STRESS ANALYSIS", "OPTIMIZATION"],
    },
    es: {
      bayTitle: "BRAZO ROBÓTICO SO-101",
      discipline: "ROBÓTICA",
      overview:
        "Una plataforma de aprendizaje multibrazo construida para teleoperación, captura de datos y optimización estructural.",
      tags: ["ROBÓTICA", "SIMULACIÓN", "DATOS"],
      process: ["ENSAMBLE", "ANÁLISIS DE ESFUERZOS", "OPTIMIZACIÓN"],
    },
  },
  gripper: {
    en: {
      bayTitle: "INTERCHANGEABLE GRIPPER",
      discipline: "ROBOTIC TOOLING",
      overview:
        "A low-cost interchangeable tool system that simplifies manipulation tasks for domestic robots.",
      tags: ["TOOLING", "PROTOTYPING", "TELEOPERATION"],
      process: ["CONCEPT", "TOOL SYSTEM", "LATEST DESIGN"],
    },
    es: {
      bayTitle: "GRIPPER INTERCAMBIABLE",
      discipline: "HERRAMIENTAS ROBÓTICAS",
      overview:
        "Un sistema económico de herramientas intercambiables que simplifica tareas de manipulación para robots domésticos.",
      tags: ["HERRAMIENTAS", "PROTOTIPADO", "TELEOPERACIÓN"],
      process: ["CONCEPTO", "SISTEMA DE HERRAMIENTAS", "ÚLTIMO DISEÑO"],
    },
  },
  wearable: {
    en: {
      bayTitle: "WEARABLE DATA COLLECTOR",
      discipline: "EMBODIED DATA",
      overview:
        "A wearable first-person capture system engineered to collect stable egocentric robotics data at 30 fps.",
      tags: ["HARDWARE", "COMPUTER VISION", "DATA"],
      process: ["HARDWARE", "CAPTURE PIPELINE", "DEPLOYMENT"],
    },
    es: {
      bayTitle: "RECOLECTOR DE DATOS",
      discipline: "DATOS CORPORALES",
      overview:
        "Un sistema vestible de captura en primera persona diseñado para recolectar datos robóticos egocéntricos estables a 30 fps.",
      tags: ["HARDWARE", "VISIÓN", "DATOS"],
      process: ["HARDWARE", "CAPTURA", "DESPLIEGUE"],
    },
  },
  car: {
    en: {
      bayTitle: "BRUSHLESS MOTOR CAR",
      discipline: "ELECTROMECHANICAL",
      overview:
        "A hand-built electric vehicle developed around a custom brushless drivetrain and lightweight chassis.",
      tags: ["DRIVETRAIN", "FABRICATION", "TESTING"],
      process: ["POWERTRAIN", "CHASSIS", "ROAD TEST"],
    },
    es: {
      bayTitle: "CARRO BRUSHLESS",
      discipline: "ELECTROMECÁNICA",
      overview:
        "Un vehículo eléctrico construido a mano alrededor de un tren motriz brushless y un chasis ligero.",
      tags: ["TREN MOTRIZ", "FABRICACIÓN", "PRUEBAS"],
      process: ["PROPULSIÓN", "CHASIS", "PRUEBA EN PISTA"],
    },
  },
  bomba: {
    en: {
      bayTitle: "CENTRIFUGAL PUMP",
      discipline: "FLUID SYSTEMS",
      overview:
        "A functional centrifugal water pump designed and manufactured to study head, flow and Venturi behavior.",
      tags: ["FLUIDS", "DESIGN", "TESTING"],
      process: ["DESIGN", "IMPELLER", "PERFORMANCE"],
    },
    es: {
      bayTitle: "BOMBA CENTRÍFUGA",
      discipline: "SISTEMAS DE FLUIDOS",
      overview:
        "Una bomba centrífuga funcional diseñada y manufacturada para estudiar altura, flujo y comportamiento Venturi.",
      tags: ["FLUIDOS", "DISEÑO", "PRUEBAS"],
      process: ["DISEÑO", "IMPULSOR", "RENDIMIENTO"],
    },
  },
  harv: {
    en: {
      bayTitle: "HARV MANUFACTURING ERP",
      discipline: "MANUFACTURING SOFTWARE",
      overview:
        "A connected manufacturing operating system spanning purchasing, production, inventory, finance and automation.",
      tags: ["WORKFLOW", "AUTOMATION", "ANALYTICS"],
      process: ["OPERATIONS", "PRODUCTION", "FINANCE"],
    },
    es: {
      bayTitle: "HARV ERP DE MANUFACTURA",
      discipline: "SOFTWARE DE MANUFACTURA",
      overview:
        "Un sistema operativo de manufactura que conecta compras, producción, inventario, finanzas y automatización.",
      tags: ["FLUJO", "AUTOMATIZACIÓN", "ANALÍTICA"],
      process: ["OPERACIONES", "PRODUCCIÓN", "FINANZAS"],
    },
  },
};

const STAGE_PRESETS: Record<string, StationStyle> = {
  aircraft: {
    "--station-machine-bottom": "34%",
    "--station-machine-left": "14%",
    "--station-machine-width": "74%",
  },
  cnc: {
    "--station-machine-bottom": "27%",
    "--station-machine-left": "18%",
    "--station-machine-width": "55%",
  },
  so101: {
    "--station-machine-bottom": "25%",
    "--station-machine-left": "31%",
    "--station-machine-width": "40%",
  },
  gripper: {
    "--station-machine-bottom": "25%",
    "--station-machine-left": "13%",
    "--station-machine-width": "73%",
  },
  wearable: {
    "--station-machine-bottom": "25%",
    "--station-machine-left": "27%",
    "--station-machine-width": "47%",
  },
  car: {
    "--station-machine-bottom": "27%",
    "--station-machine-left": "18%",
    "--station-machine-width": "63%",
  },
  bomba: {
    "--station-machine-bottom": "27%",
    "--station-machine-left": "26%",
    "--station-machine-width": "48%",
  },
  harv: {
    "--station-machine-bottom": "27%",
    "--station-machine-left": "23%",
    "--station-machine-width": "54%",
  },
};

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
    online: "Archive online",
    undated: "Ongoing archive",
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
    online: "Archivo disponible",
    undated: "Archivo en desarrollo",
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
  const years = project?.date?.match(/\d{4}/g);
  return years?.at(-1) ?? fallback;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { language, ui } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const copy = DETAIL_COPY[language];
  const projectNumber = project ? (PROJECT_NUMBERS[project.key] ?? "00") : "00";
  const presentation = project ? STATION_PRESENTATION[project.key]?.[language] : undefined;
  const visualRecords = useMemo(() => projectVisuals(project), [project]);
  const processVisuals = visualRecords.slice(0, 3);
  const stageStyle = project
    ? (STAGE_PRESETS[project.key] ?? STAGE_PRESETS.aircraft)
    : STAGE_PRESETS.aircraft;
  const progress = `${(Number(projectNumber) / TOTAL_PROJECTS) * 100}%`;
  const recordCount = visualRecords.length;

  useEffect(() => {
    if (project) {
      if (!wasOpenRef.current) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      }
      wasOpenRef.current = true;
      dialogRef.current?.scrollTo({ top: 0 });
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
          <a href="#hangar-work" onClick={onClose}>{ui.work}</a>
          <a href="#hangar-about" onClick={onClose}>{ui.about}</a>
          <a href={portfolioPdf} target="_blank" rel="noopener noreferrer">CV</a>
        </nav>
      </header>

      {project && presentation ? (
        <div className="project-detail-inner">
          <section className="project-detail-overview-screen">
            <div
              className="project-detail-stage"
              data-project={project.key}
              style={stageStyle}
            >
              <img
                alt=""
                aria-hidden="true"
                className="project-detail-hangar-photo"
                src={hangarBackground}
              />

              <div className="project-detail-bay-frame" aria-hidden="true">
                <span>{presentation.bayTitle}</span>
                <i />
              </div>

              <div className="project-detail-machine">
                <img
                  alt={project.title}
                  className="project-detail-machine-image"
                  decoding="async"
                  src={project.image}
                />
              </div>

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
                  {projectYear(project, copy.undated)} · {presentation.discipline}
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
