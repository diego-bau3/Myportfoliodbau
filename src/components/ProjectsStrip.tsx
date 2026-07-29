import type { RefObject } from "react";

import ProjectCard from "./ProjectCard.tsx";
import type { Project } from "../data/projects.ts";

export type SectionLink = {
  label: string;
  href: string;
};

type ProjectsStripProps = {
  stripRef: RefObject<HTMLDivElement | null>;
  projects: Project[];
  onOpen: (key: string) => void;
  links: SectionLink[];
  linksLabel: string;
};

export default function ProjectsStrip({
  stripRef,
  projects,
  onOpen,
  links,
  linksLabel,
}: ProjectsStripProps) {
  return (
    <section className="projects-section" id="projects">
      <nav className="section-links" aria-label={linksLabel}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="projects-strip" ref={stripRef}>
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
