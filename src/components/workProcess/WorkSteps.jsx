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

const WorkSteps = ({ data, index = 0 }) => {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <RevealItem as="li" role="listitem" className="relative lg:h-full">
      {/* Card — pinned above the spine on even steps, below it on odd ones.
          A fixed lg height keeps the stem math below exact. */}
      <div
        className={`panel panel-sheen group static flex flex-col gap-3 rounded-[1.25rem] p-6 transition-transform duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-1 lg:absolute lg:inset-x-0 lg:h-[15rem] ${
          isEven ? "lg:top-0" : "lg:bottom-0"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "var(--shadow-lifted)" }}
        />

        <div className="relative flex items-center gap-3">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "var(--grad-accent)" }}
            />
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="relative h-4.5 w-4.5 fill-brand transition-colors duration-300 group-hover:fill-[var(--accent-contrast)]"
            >
              <path d={data?.svgPath} />
            </svg>
          </span>

          <h3 className="font-display min-w-0 flex-1 text-fluid-base font-semibold">
            {data?.title}
          </h3>

          {/* Mirrors the spine node for touch/mobile, where the node is hidden. */}
          <span className="relative shrink-0 font-mono text-[0.65rem] font-medium text-fg-faint lg:hidden">
            {number}
          </span>
        </div>

        <p className="relative text-sm text-fg-muted">{data?.description}</p>
      </div>

      {/* Stem — ties the card's near edge to the node on the spine. */}
      <span
        aria-hidden="true"
        className={`hidden h-8 w-px -translate-x-1/2 bg-line-strong lg:absolute lg:left-1/2 lg:block ${
          isEven ? "lg:top-[15rem]" : "lg:bottom-[15rem]"
        }`}
      />

      {/* Node — sits dead-centre on the spine regardless of card height. */}
      <span className="absolute top-1/2 left-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg font-mono text-xs font-medium text-brand lg:flex">
        <motion.span
          aria-hidden="true"
          variants={nodeRingVariants}
          className="absolute -inset-px rounded-full border border-brand"
          style={{ boxShadow: "var(--shadow-glow)" }}
        />
        <span className="relative">{number}</span>
      </span>
    </RevealItem>
  );
};

export default WorkSteps;
