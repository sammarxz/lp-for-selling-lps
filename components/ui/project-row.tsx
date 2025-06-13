import {
  useInfiniteScroll,
  ScrollDirection,
  ScrollSpeed,
} from "@/hooks/useInfiniteScroll";
import { ProjectItem } from "./project-item";

interface ProjectRowProps {
  projects: string[];
  direction: ScrollDirection;
  rowKey: string;
  spacing?: string;
  speed?: ScrollSpeed;
  isLastRow?: boolean;
}

export function ProjectRow({
  projects,
  direction,
  rowKey,
  spacing = "space-x-6",
  speed = "slow",
  isLastRow = false,
}: ProjectRowProps) {
  const animationClass = useInfiniteScroll(direction, speed);

  return (
    <div className="relative">
      <div
        className={`flex ${animationClass} ${spacing} h-full ${
          !isLastRow ? "mb-6" : ""
        }`}
      >
        {projects.map((project, index) => (
          <ProjectItem
            key={`${rowKey}-${index}`}
            project={project}
            index={index}
            rowKey={rowKey}
          />
        ))}
      </div>
    </div>
  );
}
