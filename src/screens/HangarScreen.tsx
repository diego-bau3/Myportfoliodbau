import { useCallback, useEffect, useMemo, useState } from "react";

import portfolioPdf from "../../assets/diego-bau-portfolio.pdf";
import HangarBay from "../components/HangarBay.tsx";
import ProjectDetail from "../components/ProjectDetail.tsx";
import { projectsFor } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";

const PROJECT_LEVELS = [
  ["cnc", "aircraft", "so101"],
  ["gripper", "wearable", "car"],
  ["bomba", "harv"],
] as const;

const LEVEL_COPY = {
  en: [
    { label: "Selected machines", title: "" },
    { label: "Applied robotics", title: "Robotics, data & motion" },
    { label: "Engineering systems", title: "From flow to factory" },
  ],
  es: [
    { label: "Máquinas seleccionadas", title: "" },
    { label: "Robótica aplicada", title: "Robótica, datos y movimiento" },
    { label: "Sistemas de ingeniería", title: "Del flujo a la fábrica" },
  ],
} as const;

const CATEGORY_COPY = {
  en: {
    cnc: "Mechanical engineering",
    aircraft: "Aeronautics",
    so101: "Robotics",
    gripper: "Robotic tooling",
    wearable: "Embodied data",
    car: "Electromechanical",
    bomba: "Fluid systems",
    harv: "Manufacturing software",
  },
  es: {
    cnc: "Ingeniería mecánica",
    aircraft: "Aeronáutica",
    so101: "Robótica",
    gripper: "Herramientas robóticas",
    wearable: "Datos corporales",
    car: "Electromecánica",
    bomba: "Sistemas de fluidos",
    harv: "Software de manufactura",
  },
} as const;

const BAY_TITLE_COPY = {
  en: {
    cnc: "Custom CNC lathe",
    aircraft: "RC aircraft",
    so101: "SO-101 robotic arm",
    gripper: "Interchangeable gripper",
    wearable: "Wearable data collector",
    car: "Brushless motor car",
    bomba: "Centrifugal pump",
    harv: "Harv manufacturing ERP",
  },
  es: {
    cnc: "Torno CNC",
    aircraft: "Avión RC",
    so101: "Brazo robótico SO-101",
    gripper: "Gripper intercambiable",
    wearable: "Recolector de datos",
    car: "Carro brushless",
    bomba: "Bomba centrífuga",
    harv: "Harv ERP de manufactura",
  },
} as const;

export default function HangarScreen() {
  const { language, ui } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState(0);
  const projects = useMemo(() => projectsFor(language), [language]);
  const levels = useMemo(() => {
    const byKey = new Map(projects.map((project) => [project.key, project]));
    return PROJECT_LEVELS.map((keys) =>
      keys.map((key) => byKey.get(key)).filter((project) => project !== undefined),
    );
  }, [projects]);
  const levelCopy = LEVEL_COPY[language];
  const categoryCopy = CATEGORY_COPY[language];
  const bayTitleCopy = BAY_TITLE_COPY[language];
  const openProject = useCallback((key: string) => setOpenKey(key), []);
  const closeProject = useCallback(() => setOpenKey(null), []);
  const openProjectData = projects.find((project) => project.key === openKey);

  useEffect(() => {
    const levelElements = document.querySelectorAll<HTMLElement>(".hangar-level");
    const observer = new IntersectionObserver(
      (entries) => {
        const closest = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!closest) return;

        const level = Number((closest.target as HTMLElement).dataset.level);
        if (Number.isFinite(level)) setActiveLevel(level);
      },
      { threshold: [0.32, 0.5, 0.68] },
    );

    levelElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="hangar-page">
      <a className="hangar-skip-link" href="#hangar-level-01">
        {language === "es" ? "Saltar a los proyectos" : "Skip to projects"}
      </a>
      <section className={`hangar-showcase is-level-${activeLevel + 1}`} id="hangar-work">
        <div className="hangar-stage" aria-hidden="true">
          <div className="hangar-roof" />
          <div className="hangar-wall" />
        </div>

        <header className="hangar-header">
          <a className="hangar-mark" href="#hangar-level-01" aria-label="Diego Bau">
            DBS
          </a>
          <nav className="hangar-nav" aria-label={ui.primaryNavigation}>
            <a className="is-active" href="#hangar-work">
              {ui.work}
            </a>
            <a href="#hangar-about">{ui.about}</a>
            <a href={portfolioPdf} target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </nav>
        </header>

        <nav
          className="hangar-level-rail"
          aria-label={language === "es" ? "Niveles del hangar" : "Hangar levels"}
        >
          {levelCopy.map((copy, index) => (
            <a
              aria-current={activeLevel === index ? "step" : undefined}
              aria-label={`${language === "es" ? "Ir al nivel" : "Go to level"} ${index + 1}: ${copy.label}`}
              href={`#hangar-level-0${index + 1}`}
              key={copy.label}
            >
              {String(index + 1).padStart(2, "0")}
            </a>
          ))}
        </nav>

        <div className="hangar-levels">
          {levels.map((levelProjects, levelIndex) => {
            const copy = levelCopy[levelIndex] ?? levelCopy[0];
            const nextTarget =
              levelIndex < levels.length - 1
                ? `#hangar-level-0${levelIndex + 2}`
                : "#hangar-about";
            const levelId = `hangar-level-0${levelIndex + 1}`;
            const headingId = levelIndex === 0 ? "hangar-title" : `${levelId}-title`;

            return (
              <section
                aria-labelledby={headingId}
                className={`hangar-level${activeLevel === levelIndex ? " is-active" : ""}`}
                data-level={levelIndex}
                id={levelId}
                key={levelId}
                tabIndex={-1}
              >
                <div className="hangar-level-shell">
                  {levelIndex === 0 ? (
                    <div className="hangar-identity">
                      <p className="hangar-kicker">{ui.hangarKicker}</p>
                      <h1 id="hangar-title">
                        <strong>DIEGO</strong>
                        <span>Bautista Silva</span>
                      </h1>
                      <p>{ui.tagline}</p>
                    </div>
                  ) : (
                    <div className="hangar-level-heading">
                      <span className="hangar-level-watermark" aria-hidden="true">
                        0{levelIndex + 1}
                      </span>
                      <p>
                        {language === "es" ? "Nivel" : "Level"} 0{levelIndex + 1} /{" "}
                        {copy.label}
                      </p>
                      <h2 id={headingId}>{copy.title}</h2>
                    </div>
                  )}

                  <div
                    className={`hangar-bays hangar-bays--${levelProjects.length}`}
                    aria-label={`${ui.featuredProjects}: ${copy.label}`}
                  >
                    {levelProjects.map((project, projectIndex) => (
                      <HangarBay
                        category={
                          categoryCopy[project.key as keyof typeof categoryCopy] ??
                          ui.sections.hardware
                        }
                        displayTitle={
                          bayTitleCopy[project.key as keyof typeof bayTitleCopy] ??
                          project.title
                        }
                        key={project.key}
                        number={levelIndex * 3 + projectIndex + 1}
                        onOpen={openProject}
                        project={project}
                      />
                    ))}
                  </div>

                  <a className="hangar-scroll-cue" href={nextTarget}>
                    <span>{ui.scrollToExplore}</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="hangar-about" id="hangar-about">
        <p>{ui.hangarNextKicker}</p>
        <h2>{ui.hangarNextTitle}</h2>
      </section>

      <ProjectDetail project={openProjectData} onClose={closeProject} />
    </main>
  );
}
