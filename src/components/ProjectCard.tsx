import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";

type ProjectCardProps = {
  project: Project;
  onOpen: (key: string) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { ui } = useLanguage();

  return (
    <button
      className="project-item"
      type="button"
      data-layout={project.layout}
      aria-label={ui.openProject(project.detailTitle)}
      onClick={() => onOpen(project.key)}
    >
      <span className="project-title">{project.title}</span>
      {/* The panel gives every project the same footprint even though the
          photos themselves range from 2.65:1 to 0.67:1. */}
      <span className="project-media">
        {/* Every project sits below the fold, so the hero paints without
            waiting on ~290 KB of photography. */}
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
          decoding="async"
        />
      </span>
    </button>
  );
}
