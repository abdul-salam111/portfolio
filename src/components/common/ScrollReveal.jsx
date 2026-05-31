import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const directionMap = {
  up: { y: 50, x: 0 },
  down: { y: -50, x: 0 },
  left: { x: -50, y: 0 },
  right: { x: 50, y: 0 },
};

const ScrollReveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const from = directionMap[direction] ?? directionMap.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
