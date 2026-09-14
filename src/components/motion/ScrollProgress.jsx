import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress bar pinned under the navbar. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-soft via-brand to-violet"
    />
  );
};

export default ScrollProgress;
