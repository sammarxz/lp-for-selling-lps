import { createSmartProjectSequence } from "@/lib/utils";

const projectsLength = 12;
const repetitions = 3;

export const duplicatedProjects = createSmartProjectSequence(projectsLength, repetitions);

export const projects = Array.from({ length: projectsLength }, (_, index) => 
  `/projects/${index + 1}.webp`
);