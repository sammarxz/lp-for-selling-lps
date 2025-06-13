import { memo, useMemo } from "react";
import { ProjectRow } from "../ui/project-row";
import { duplicatedProjects } from "@/data/projects";
import { ScrollSpeed } from "@/hooks/useInfiniteScroll";

interface ProjectsProps {
  className?: string;
  rowSpacing?: string;
  animationSpeed?: ScrollSpeed;
}

export const Projects = memo(function Projects({
  className = "",
  rowSpacing = "space-x-6",
  animationSpeed = "slow",
}: ProjectsProps) {
  const projectRows = useMemo(
    () => [
      { direction: "right" as const, rowKey: "row1", speed: animationSpeed },
      { direction: "left" as const, rowKey: "row2", speed: animationSpeed },
    ],
    [animationSpeed]
  );

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {projectRows.map(({ direction, rowKey, speed }, index) => (
        <ProjectRow
          key={rowKey}
          projects={duplicatedProjects}
          direction={direction}
          rowKey={rowKey}
          spacing={rowSpacing}
          speed={speed}
          isLastRow={index === projectRows.length - 1}
        />
      ))}
    </section>
  );
});
