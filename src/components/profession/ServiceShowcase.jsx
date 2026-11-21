import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlutter, faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { TiltCard } from "../motion";

const AUTO_ADVANCE_MS = 4500;

// One accent per service, cycling if there are ever more than four.
// Written as literal class strings (not template-built) so Tailwind's
// scanner can actually see and generate them.
const tones = [
  {
    tile: "bg-primary/15 ring-primary/30 text-primary",
    beam: "from-primary via-primary/40",
    glow: "var(--color-primary)",
  },
  {
    tile: "bg-accent/15 ring-accent/30 text-accent",
    beam: "from-accent via-accent/40",
    glow: "var(--color-accent)",
  },
  {
    tile: "bg-success/15 ring-success/30 text-success",
    beam: "from-success via-success/40",
    glow: "var(--color-success)",
  },
  {
    tile: "bg-secondary/15 ring-secondary/30 text-secondary",
    beam: "from-secondary via-secondary/40",
    glow: "var(--color-secondary)",
  },
];

// Real brand marks for the stack; Integrations has no single brand, so a
// plug stands in for "connects to everything else."
const faIcons = [faFlutter, faReact, faPython, faPlug];

const Icon = ({ index, className }) => (
  <FontAwesomeIcon icon={faIcons[index % faIcons.length]} className={className} />
);

/**
 * Tab rail + single detail panel instead of a stacked card list — the panel's
 * height stays fixed no matter how many services there are, so the section
 * doesn't grow with the content. Auto-advances on a timer that pauses while
 * the cursor is over it.
 *
 * Accepts optional `active` + `onSelect` to run as a controlled component if
 * something external ever needs to drive the active tab; omit them (as
 * Profession currently does) and it manages its own state.
 */
const ServiceShowcase = ({ roles, active: controlledActive, onSelect }) => {
  const isControlled = controlledActive !== undefined;
  const [internalActive, setInternalActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = isControlled ? controlledActive : internalActive;
  const setActive = isControlled ? onSelect : setInternalActive;
  const tone = tones[active % tones.length];
  const role = roles[active];

  useEffect(() => {
    if (isControlled || paused || roles.length < 2) return;
    const id = setInterval(() => {
      setInternalActive((a) => (a + 1) % roles.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isControlled, paused, roles.length, internalActive]);

  return (
    <div
      className="flex h-full min-w-0 flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Numbered tab rail */}
      <div
        role="tablist"
        aria-label="Services"
        className="glass-thin flex shrink-0 items-stretch gap-1.5 overflow-x-auto rounded-2xl p-1.5"
      >
        {roles.map((r, i) => {
          const isActive = i === active;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl px-4 py-3 transition-colors duration-300 sm:flex-1 sm:justify-center ${
                isActive ? "text-fg" : "text-fg-faint hover:text-fg-muted"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-tab-pill"
                  className="absolute inset-0 rounded-xl bg-bg-elev ring-1 ring-line-strong"
                  style={{ boxShadow: "var(--shadow-ambient)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                />
              )}
              <span
                className={`relative font-mono text-[0.7rem] tabular-nums transition-colors duration-300 ${
                  isActive ? tones[i % tones.length].tile.split(" ")[2] : ""
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon index={i} className="relative size-4 shrink-0" />
              <span className="relative hidden whitespace-nowrap text-sm font-medium md:inline">
                {r.shortTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active service detail — flex-1 so it stretches to match the sticky
          intro column instead of leaving dead space below a short card. */}
      <TiltCard max={3} scale={1.006} className="mt-5 flex-1 rounded-[1.75rem]">
        <div className="panel panel-sheen relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-9">
          {/* Diagonal accent wash — the "funky" bit, swaps tone per tab. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-[90px] transition-colors duration-500"
            style={{ background: tone.glow, opacity: 0.16 }}
          />

          {/* Oversized watermark number — purely decorative, never read by AT. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-4 select-none font-display text-6xl font-bold leading-none text-fg opacity-[0.06] sm:text-7xl"
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-1 flex-col"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tone.tile}`}
                >
                  <Icon index={active} className="size-5" />
                </div>
                <h3 className="font-display text-fluid-2xl text-fg">{role?.title}</h3>
              </div>
              <p className="mt-4 max-w-[58ch] text-fg-muted">{role?.description}</p>

              {/* mt-auto pins the badges to the bottom of the stretched
                  content area, just above the progress dots. */}
              {role?.tags?.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {role.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress dots — doubles as a quick "n of 4" cue, anchored under
              the badges at the card's bottom edge. */}
          <div className="relative z-10 flex shrink-0 items-center gap-1.5 pt-7">
            {roles.map((r, i) => (
              <button
                key={r.id}
                type="button"
                aria-label={`Show ${r.shortTitle}`}
                onClick={() => setActive(i)}
                className="cursor-pointer py-2"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-brand" : "w-1.5 bg-line-strong"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default ServiceShowcase;
