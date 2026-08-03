import type { RefObject } from "react";

import ProjectCard from "./ProjectCard.tsx";
import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";
import type { SectionId } from "../i18n.tsx";

export type SectionLink = {
  label: string;
  href: string;
  /** When set, the link downloads its target with this filename instead of
      opening it in a new tab. */
  download?: string;
};

/** Fixed top-to-bottom order of the grid sections. */
const SECTION_ORDER: SectionId[] = ["hardware", "software", "work"];

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
  const { ui } = useLanguage();

  // Group cards under their section, keeping ENTRIES order within each and
  // dropping any section that has no projects yet.
  const groups = SECTION_ORDER.map((id) => ({
    id,
    title: ui.sections[id],
    items: projects.filter((project) => project.section === id),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="projects-section" id="projects">
      <nav className="section-links" aria-label={linksLabel}>
        {links.map((link) =>
          link.download ? (
            <a key={link.href} href={link.href} download={link.download}>
              {link.label}
            </a>
          ) : (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ),
        )}
      </nav>
      <div className="projects-strip" ref={stripRef}>
        {groups.map((group) => (
          <div className="project-section-group" key={group.id}>
            <h2 className="project-section-title">{group.title}</h2>
            <div className="project-section-grid">
              {group.items.map((project) => (
                <ProjectCard
                  key={project.key}
                  project={project}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
