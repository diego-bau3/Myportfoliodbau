import type { Project } from "../data/projects.ts";
import { useLanguage } from "../i18n.tsx";

type HangarBayProps = {
  category: string;
  displayTitle: string;
  number: number;
  onOpen: (key: string) => void;
  project: Project;
};

export default function HangarBay({
  category,
  displayTitle,
  number,
  onOpen,
  project,
}: HangarBayProps) {
  const { ui } = useLanguage();

  return (
    <button
      aria-controls="project-detail-dialog"
      aria-haspopup="dialog"
      className="hangar-bay"
      data-project={project.key}
      type="button"
      aria-label={ui.openProject(project.detailTitle)}
      onClick={() => onOpen(project.key)}
    >
      <span className="hangar-bay-ceiling" aria-hidden="true" />
      <span className="hangar-bay-machine">
        <img
          src={project.image}
          alt=""
          className="hangar-bay-image"
          decoding="async"
        />
      </span>
      <span className="hangar-bay-heading">
        <span className="hangar-bay-title">{displayTitle}</span>
        <span className="hangar-bay-number">
          {String(number).padStart(2, "0")}
        </span>
      </span>
      <span className="hangar-bay-floor" aria-hidden="true" />
      <span className="hangar-bay-meta">
        <span>{category}</span>
        <span>{ui.explore}</span>
      </span>
    </button>
  );
}
