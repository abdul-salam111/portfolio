import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Motion capability of the current device.
 *
 * `reduced` mirrors prefers-reduced-motion. `fine` is false on touch devices,
 * where hover-driven effects (magnetic buttons, 3D tilt, the custom cursor)
 * have nothing to track and only cost battery.
 */
export const useMotionPrefs = () => {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return { reduced: Boolean(reduced), fine, interactive: fine && !reduced };
};

/** True once the element has been scrolled past the fold at least once. */
export const useHasScrolled = (threshold = 24) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};
