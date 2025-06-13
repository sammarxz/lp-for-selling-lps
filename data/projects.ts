import { createSmartProjectSequence } from "@/lib/utils";

const projectsLength = 12;
const repetitions = 3;

// ✅ Gera sequência inteligente sem repetições consecutivas
export const duplicatedProjects = createSmartProjectSequence(projectsLength, repetitions);

// ✅ Mantém compatibilidade com código existente
export const projects = Array.from({ length: projectsLength }, (_, index) => 
  `/projects/${index + 1}.webp`
);