import { useCallback, useEffect, useMemo, useState } from "react";

import portfolioPdf from "../../assets/diego-bau-portfolio.pdf";
import hangarBackground from "../../assets/hangar-background-v1.png";
import integratedHangarBackground from "../../assets/hangar-hero-integrated-v2.png";
import HangarBay from "../components/HangarBay.tsx";
import ProjectDetail from "../components/ProjectDetail.tsx";
import { projectsFor } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";
import { homePath, homeSectionPath, projectPath, projectSlugFromPath, pushRoute } from "../routing.ts";

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
  const sectionCounts = useMemo(
    () => ({
      hardware: projects.filter((project) => project.section === "hardware").length,
      software: projects.filter((project) => project.section === "software").length,
    }),
    [projects],
  );
  const levelCopy = LEVEL_COPY[language];
  const sectionHref = (id: string) => homeSectionPath(language, id, window.location.search);
  const openProject = useCallback(
    (key: string) => {
      const selected = projects.find((project) => project.key === key);
      if (!selected) return;
      pushRoute(projectPath(language, selected.slug));
      setOpenKey(key);
    },
    [language, projects],
  );
  const closeProject = useCallback(() => {
    pushRoute(homePath(language));
    setOpenKey(null);
  }, [language]);
  const openProjectData = projects.find((project) => project.key === openKey);

  useEffect(() => {
    const syncProjectFromRoute = (): void => {
      const slug = projectSlugFromPath();
      setOpenKey(slug ? (projects.find((project) => project.slug === slug)?.key ?? null) : null);
    };

    syncProjectFromRoute();
    window.addEventListener("popstate", syncProjectFromRoute);
    return () => window.removeEventListener("popstate", syncProjectFromRoute);
  }, [projects]);

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

  useEffect(() => {
    const scrollToRouteHash = (): void => {
      const id = window.location.hash.slice(1);
      const scroller = document.querySelector<HTMLElement>(".hangar-page");
      if (!scroller) return;

      const root = document.documentElement;
      const previousBehavior = scroller.style.scrollBehavior;
      const previousSnapType = scroller.style.scrollSnapType;
      const previousRootBehavior = root.style.scrollBehavior;
      const previousRootSnapType = root.style.scrollSnapType;
      scroller.style.scrollBehavior = "auto";
      scroller.style.scrollSnapType = "none";
      root.style.scrollBehavior = "auto";
      root.style.scrollSnapType = "none";

      if (!id) {
        scroller.scrollTo({ behavior: "auto", top: 0 });
        window.scrollTo({ behavior: "auto", top: 0 });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      }

      requestAnimationFrame(() => {
        scroller.style.scrollBehavior = previousBehavior;
        scroller.style.scrollSnapType = previousSnapType;
        root.style.scrollBehavior = previousRootBehavior;
        root.style.scrollSnapType = previousRootSnapType;
      });
    };

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const initialScroll = window.setTimeout(scrollToRouteHash, 0);
    window.addEventListener("hashchange", scrollToRouteHash);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.clearTimeout(initialScroll);
      window.removeEventListener("hashchange", scrollToRouteHash);
    };
  }, []);

  return (
    <main className="hangar-page">
      <a className="hangar-skip-link" href={sectionHref("hangar-level-01")}>
        {language === "es" ? "Saltar a los proyectos" : "Skip to projects"}
      </a>
      <section className={`hangar-showcase is-level-${activeLevel + 1}`} id="hangar-work">
        <div className="hangar-stage" aria-hidden="true">
          <img
            className="hangar-stage-photo hangar-stage-photo--clean"
            src={hangarBackground}
            alt=""
          />
          <img
            className="hangar-stage-photo hangar-stage-photo--integrated"
            src={integratedHangarBackground}
            alt=""
          />
          <div className="hangar-roof" />
          <div className="hangar-wall" />
        </div>

        <header className="hangar-header">
          <a className="hangar-mark" href={sectionHref("hangar-level-01")} aria-label="Diego Bau">
            DBS
          </a>
          <nav className="hangar-nav" aria-label={ui.primaryNavigation}>
            <a className="is-active" href={sectionHref("hangar-work")}>
              {ui.work}
            </a>
            <a href={portfolioPdf} target="_blank" rel="noopener noreferrer">
              {ui.portfolioNav}
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
              href={sectionHref(`hangar-level-0${index + 1}`)}
              key={copy.label}
            >
              {String(index + 1).padStart(2, "0")}
            </a>
          ))}
        </nav>

        <div className="hangar-levels">
          {levels.map((levelProjects, levelIndex) => {
            const copy = levelCopy[levelIndex] ?? levelCopy[0];
            const hasLoadingBay = levelIndex === levels.length - 1;
            const visibleBayCount = levelProjects.length + (hasLoadingBay ? 1 : 0);
            const nextTarget =
              levelIndex < levels.length - 1
                ? `hangar-level-0${levelIndex + 2}`
                : null;
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
                      <p className="hangar-identity-tagline">{ui.tagline}</p>
                      <nav
                        aria-label={
                          language === "es"
                            ? "Categorías de proyectos"
                            : "Project categories"
                        }
                        className="hangar-section-index"
                      >
                        <a href={sectionHref("project-cnc-lathe")}>
                          <span>{ui.sections.hardware}</span>
                          <strong>{String(sectionCounts.hardware).padStart(2, "0")}</strong>
                        </a>
                        <a href={sectionHref("project-harv")}>
                          <span>{ui.sections.software}</span>
                          <strong>{String(sectionCounts.software).padStart(2, "0")}</strong>
                        </a>
                      </nav>
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
                    className={`hangar-bays hangar-bays--${visibleBayCount}`}
                    aria-label={`${ui.featuredProjects}: ${copy.label}`}
                  >
                    {levelProjects.map((project, projectIndex) => (
                      <HangarBay
                        category={`${ui.sections[project.section]} · ${project.discipline}`}
                        displayTitle={project.bayTitle}
                        key={project.key}
                        number={levelIndex * 3 + projectIndex + 1}
                        onOpen={openProject}
                        project={project}
                      />
                    ))}
                    {hasLoadingBay ? (
                      <div
                        aria-label={
                          language === "es"
                            ? "Próximo proyecto en preparación"
                            : "Next project in preparation"
                        }
                        className="hangar-bay hangar-bay--loading"
                        role="status"
                      >
                        <span className="hangar-loading-module" aria-hidden="true">
                          <span className="hangar-loading-label">LOADING...</span>
                          <span className="hangar-loading-track" />
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {nextTarget ? (
                    <a className="hangar-scroll-cue" href={sectionHref(nextTarget)}>
                      <span>{ui.scrollToExplore}</span>
                      <span aria-hidden="true">↓</span>
                    </a>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <ProjectDetail project={openProjectData} onClose={closeProject} />
    </main>
  );
}
