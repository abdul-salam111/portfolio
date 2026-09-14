import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-grab, [data-cursor]';

/**
 * A soft ring that trails the pointer and swells over interactive targets.
 *
 * The native cursor is deliberately left visible — hiding it costs precision
 * on links and text selection for no real gain. Fine pointers only.
 */
const Cursor = () => {
  const { interactive } = useMotionPrefs();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!interactive) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target instanceof Element ? e.target.closest(HOVER_SELECTOR) : null;
      setActive(Boolean(target));
      setLabel(target?.getAttribute("data-cursor") || "");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, visible, x, y]);

  if (!interactive) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden lg:block"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="center rounded-full border border-brand/70 bg-brand/10 backdrop-blur-[1px]"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 78 : active ? 46 : 26,
          height: label ? 78 : active ? 46 : 26,
          opacity: active || label ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        {label && (
          <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-brand uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cursor;
