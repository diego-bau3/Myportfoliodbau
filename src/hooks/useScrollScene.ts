import { useEffect } from "react";
import type { RefObject } from "react";

export type ScrollSceneRefs = {
  heroLockup: RefObject<HTMLDivElement | null>;
  heroPrimary: RefObject<HTMLDivElement | null>;
  projectsStrip: RefObject<HTMLDivElement | null>;
  scrollCar: RefObject<HTMLImageElement | null>;
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Drives the scroll-linked hero fade, projects reveal, and travelling car.
// Styles are written straight to the DOM nodes so scrolling never re-renders.
export function useScrollScene({
  heroLockup,
  heroPrimary,
  projectsStrip,
  scrollCar,
}: ScrollSceneRefs): void {
  useEffect(() => {
    let frame = 0;

    function paint(): void {
      frame = 0;
      const lockup = heroLockup.current;
      const primary = heroPrimary.current;
      const strip = projectsStrip.current;
      const car = scrollCar.current;
      if (!lockup || !primary || !strip || !car) return;

      const scrolled = window.scrollY;
      const progress = clamp(scrolled / (window.innerHeight * 0.55), 0, 1);
      const pageProgress = clamp(
        scrolled / (document.documentElement.scrollHeight - window.innerHeight),
        0,
        1,
      );

      primary.style.opacity = (1 - progress).toFixed(3);
      primary.style.transform = `translateY(-${progress * 210}px)`;
      lockup.style.pointerEvents = progress > 0.96 ? "none" : "auto";
      strip.style.opacity = clamp(progress * 1.15, 0.18, 1).toFixed(3);
      strip.style.transform = `translateY(${(1 - progress) * 90}px)`;
      car.style.transform = `translateY(${pageProgress * 72}vh) rotate(-90deg)`;
      car.style.opacity = clamp(0.18 + pageProgress * 0.82, 0.18, 1).toFixed(3);
    }

    function schedule(): void {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [heroLockup, heroPrimary, projectsStrip, scrollCar]);
}
