import { useCallback, useMemo, useRef, useState } from "react";

import portfolioPdf from "../../assets/diego-bau-portfolio.pdf";
import Hero from "../components/Hero.tsx";
import ProjectDetail from "../components/ProjectDetail.tsx";
import ProjectsStrip from "../components/ProjectsStrip.tsx";
import type { SectionLink } from "../components/ProjectsStrip.tsx";
import ScrollCar from "../components/ScrollCar.tsx";
import { projectsFor } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";
import { useScrollScene } from "../hooks/useScrollScene.ts";

export default function LandingScreen() {
  const { language, ui } = useLanguage();
  const heroLockup = useRef<HTMLDivElement>(null);
  const heroPrimary = useRef<HTMLDivElement>(null);
  const projectsStrip = useRef<HTMLDivElement>(null);
  const scrollCar = useRef<HTMLImageElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useScrollScene({ heroLockup, heroPrimary, projectsStrip, scrollCar });

  const projects = useMemo(() => projectsFor(language), [language]);
  const sectionLinks = useMemo<SectionLink[]>(
    () => [
      { label: ui.startupLink, href: "https://ready2l.com/" },
      { label: ui.portfolioLink, href: portfolioPdf },
    ],
    [ui],
  );
  const openProject = useCallback((key: string) => setOpenKey(key), []);
  const closeProject = useCallback(() => setOpenKey(null), []);
  const openProjectData = projects.find((project) => project.key === openKey);

  return (
    <main className="landing-page">
      <Hero
        lockupRef={heroLockup}
        primaryRef={heroPrimary}
        name="DIEGO"
        surname="Bautista Silva"
        tagline={ui.tagline}
      />
      <ProjectsStrip
        stripRef={projectsStrip}
        projects={projects}
        onOpen={openProject}
        links={sectionLinks}
        linksLabel={ui.heroLinksAria}
      />
      <ProjectDetail project={openProjectData} onClose={closeProject} />
      <ScrollCar carRef={scrollCar} />
    </main>
  );
}
