"use client";

import { useEffect } from "react";
import * as fbpixel from "@/lib/fbpixel";

export function useScrollTracking() {
  useEffect(() => {
    let ticking = false;
    const scrollThresholds = [25, 50, 75, 90];
    const triggeredThresholds = new Set<number>();

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;
          const scrollPercent = Math.round(
            (scrollTop / (docHeight - winHeight)) * 100
          );

          scrollThresholds.forEach((threshold) => {
            if (
              scrollPercent >= threshold &&
              !triggeredThresholds.has(threshold)
            ) {
              triggeredThresholds.add(threshold);
              fbpixel.trackScroll(threshold);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
