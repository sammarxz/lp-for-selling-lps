import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function shuffleArrayAvoidingSequentialDuplicates<T>(array: T[], repetitions: number = 3): T[] {
  if (array.length === 0) return [];
  
  const result: T[] = [];
  let lastItem: T | null = null;
  
  for (let i = 0; i < repetitions; i++) {
    let shuffled = shuffleArray(array);
    
    if (lastItem !== null) {
      let attempts = 0;
      while (shuffled[0] === lastItem && attempts < 10) {
        shuffled = shuffleArray(array);
        attempts++;
      }
      
      if (shuffled[0] === lastItem && shuffled.length > 1) {
        const differentIndex = shuffled.findIndex(item => item !== lastItem);
        if (differentIndex !== -1) {
          [shuffled[0], shuffled[differentIndex]] = [shuffled[differentIndex], shuffled[0]];
        }
      }
    }
    
    result.push(...shuffled);
    lastItem = shuffled[shuffled.length - 1]; 
  }
  
  return result;
}


export function createSmartProjectSequence(projectCount: number, repetitions: number = 3): string[] {
  const baseProjects = Array.from({ length: projectCount }, (_, index) => 
    `/projects/${index + 1}.webp`
  );
  
  return shuffleArrayAvoidingSequentialDuplicates(baseProjects, repetitions);
}