import { motion } from "framer-motion";
import { RevealItem } from "../motion";

/* Rides the RevealGroup's stagger: framer propagates the parent's variant
   state down to any descendant motion element that doesn't set its own. */
const nodeRingVariants = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
  },
};

const WorkSteps = ({ data, index = 0, total = 0 }) => {
  const isLast = index === total - 1;

  return (
    <RevealItem
      as="li"
      role="listitem"
      className={`relative flex gap-4 sm:gap-6 ${isLast ? "" : "pb-8 sm:pb-12"}`}
    >
      {/* Node: opaque so it punches a hole through the rail behind it. */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-bg font-mono text-fluid-sm font-medium text-brand">
        <motion.span
          aria-hidden="true"
          variants={nodeRingVariants}
          className="absolute -inset-px rounded-full border border-brand"
          style={{ boxShadow: "var(--shadow-glow)" }}
        />
        <span className="relative">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="panel panel-sheen group min-w-0 flex-1 p-5 transition-transform duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-1 sm:p-7">
        {/* Lift shadow lives on a child: `.panel` is unlayered CSS and would
            outrank a `hover:shadow-*` utility on the card itself. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "var(--shadow-lifted)" }}
        />

        <div className="relative flex items-center gap-4">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10 sm:h-14 sm:w-14">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "var(--grad-accent)",
              }}
            />
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="relative h-7 w-7 fill-brand transition-colors duration-300 group-hover:fill-[var(--accent-contrast)] sm:h-8 sm:w-8"
            >
              <path d={data?.svgPath} />
            </svg>
          </span>

          <h3 className="font-display text-fluid-lg sm:text-fluid-xl">
            {data?.title}
          </h3>
        </div>

        <p className="relative mt-4 text-fg-muted">{data?.description}</p>
      </div>
    </RevealItem>
  );
};

export default WorkSteps;
