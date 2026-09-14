import { motion } from "framer-motion";
import { useMotionPrefs } from "../../motion";

/* Black in the mask is a stencil, not a colour — it punches the ring's centre. */
const RING_MASK =
  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))";

const Loading = () => {
  const { reduced } = useMotionPrefs();

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-bg"
    >
      <motion.span
        aria-hidden="true"
        className="block size-14 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--accent-tint-strong) 120deg, var(--accent-soft) 250deg, var(--accent) 340deg)",
          mask: RING_MASK,
          WebkitMask: RING_MASK,
          filter: "drop-shadow(0 0 18px var(--glow))",
        }}
        animate={reduced ? { opacity: [0.35, 1, 0.35] } : { rotate: 360 }}
        transition={
          reduced
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 1.15, repeat: Infinity, ease: "linear" }
        }
      />

      <p
        aria-hidden="true"
        className="font-display text-fluid-sm font-medium tracking-[0.34em] text-fg/45 uppercase"
      >
        Abdul Salam
      </p>

      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Loading;
