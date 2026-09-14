import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

/**
 * Pulls its child toward the cursor while hovered. Disabled on touch devices
 * and under prefers-reduced-motion, where it renders a plain wrapper.
 */
const Magnetic = ({ children, strength = 0.32, radius = 1, className = "", ...rest }) => {
  const ref = useRef(null);
  const { interactive } = useMotionPrefs();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  if (!interactive) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength * radius);
    y.set(dy * strength * radius);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
