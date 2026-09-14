import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

/**
 * Shifts its children along the scroll axis as the element crosses the
 * viewport. `speed` is the total travel in pixels across that crossing;
 * negative values move against the scroll direction.
 */
const Parallax = ({ children, speed = 60, axis = "y", className = "", style, ...rest }) => {
  const ref = useRef(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const smooth = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? style : { [axis]: smooth, ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
