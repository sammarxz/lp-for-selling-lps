"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface ProjectItemProps {
  project: string;
  index: number;
  rowKey: string;
}
export function ProjectItem({
  project,
  index,
  rowKey,
  ...props
}: ProjectItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
  });

  return (
    <div
      ref={ref}
      className="relative flex-shrink-0 w-64 h-52 md:w-96 md:h-80 overflow-hidden rounded-lg group cursor-pointer"
      role="button"
      tabIndex={0}
      {...props}
    >
      {inView && (
        <Image
          src={project}
          alt={`Projeto ${index + 1}`}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 256px, 384px"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
}
