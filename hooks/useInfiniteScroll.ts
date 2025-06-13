import { useMemo } from "react";

export type ScrollDirection = "left" | "right";
export type ScrollSpeed = "slow" | "medium" | "fast";

export function useInfiniteScroll(
  direction: ScrollDirection,
  speed: ScrollSpeed = "slow"
) {
  return useMemo(() => {
    const baseClass =
      direction === "right" ? "animate-scroll-right" : "animate-scroll-left";
    const speedClass = speed !== "slow" ? `animate-scroll-${speed}` : "";

    return [baseClass, speedClass].filter(Boolean).join(" ");
  }, [direction, speed]);
}
