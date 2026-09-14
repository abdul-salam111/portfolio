import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

const offsets = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { x: -34, y: 0 },
  right: { x: 34, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Reveals children once as they scroll into view.
 *
 * `blur` adds a short defocus on entry, which reads as depth on dark
 * backgrounds. Under prefers-reduced-motion the children render immediately
 * with no transform, so nothing is ever left off-screen.
 */
const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  distance,
  duration = 0.7,
  blur = false,
  scale,
  once = true,
  margin = "-70px 0px",
  className = "",
  as = "div",
  style,
  ...rest
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });
  const { reduced } = useMotionPrefs();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain ref={ref} className={className} style={style} {...rest}>
        {children}
      </Plain>
    );
  }

  const base = offsets[direction] ?? offsets.up;
  const from = distance
    ? { x: Math.sign(base.x) * distance, y: Math.sign(base.y) * distance }
    : base;

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial={{
        opacity: 0,
        ...from,
        ...(scale ? { scale } : null),
        ...(blur ? { filter: "blur(10px)" } : null),
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              ...(scale ? { scale: 1 } : null),
              ...(blur ? { filter: "blur(0px)" } : null),
            }
          : undefined
      }
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

/** Parent that staggers direct `RevealItem` children as the group enters view. */
export const RevealGroup = ({
  children,
  stagger = 0.09,
  delay = 0,
  className = "",
  margin = "-70px 0px",
  once = true,
  ...rest
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });
  const { reduced } = useMotionPrefs();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : "hidden"}
      animate={reduced || inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const revealItemVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
  },
};

export const RevealItem = ({ children, className = "", as = "div", ...rest }) => {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={revealItemVariants} {...rest}>
      {children}
    </Tag>
  );
};
