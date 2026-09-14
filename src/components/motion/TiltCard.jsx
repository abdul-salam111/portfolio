import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

/**
 * Tilts toward the cursor in 3D and tracks a spotlight across the surface.
 *
 * The spotlight is driven through the `--mx` / `--my` custom properties that
 * the `.spotlight` class in index.css reads, so the glow and the tilt stay in
 * sync without a second listener.
 */
const TiltCard = ({
  children,
  className = "",
  max = 7,
  scale = 1.015,
  glare = true,
  style,
  ...rest
}) => {
  const ref = useRef(null);
  const { interactive } = useMotionPrefs();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  if (!interactive) {
    return (
      <div className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el?.getBoundingClientRect();
    if (!rect) return;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    px.set(localX / rect.width);
    py.set(localY / rect.height);
    el.style.setProperty("--mx", `${localX}px`);
    el.style.setProperty("--my", `${localY}px`);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`${glare ? "spotlight " : ""}${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d", ...style }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
