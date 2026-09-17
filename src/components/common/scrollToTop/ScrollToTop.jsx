import { useEffect, useState } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animateScroll } from "react-scroll";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Magnetic } from "../../motion";

const options = {
  duration: 500,
  smooth: true,
};

const scrollToTop = () => {
  animateScroll.scrollToTop(options);
};

const RADIUS = 23;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v));

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 14 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed right-4 bottom-6 z-40 sm:right-8 sm:bottom-10"
    >
      <Magnetic strength={0.25}>
        <button
          type="button"
          onClick={scrollToTop}
          tabIndex={visible ? 0 : -1}
          aria-label="Back to top"
          className="glass group relative grid size-12 cursor-pointer place-items-center rounded-full sm:size-14"
          style={{ boxShadow: "var(--shadow-ambient)" }}
        >
          {/* Reading progress, drawn from 12 o'clock by the -90° rotation. */}
          <svg
            viewBox="0 0 52 52"
            aria-hidden="true"
            className="absolute inset-0 size-full -rotate-90"
          >
            {/* Not --lg-edge: the glass rim brightens to the accent on hover,
                and the track would inherit it and swallow the progress arc. */}
            <circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <FontAwesomeIcon
            icon={faAngleUp}
            className="relative size-4 text-fg-muted transition-colors duration-200 group-hover:text-brand sm:size-5"
          />
        </button>
      </Magnetic>
    </motion.div>
  );
};

export default ScrollToTop;
