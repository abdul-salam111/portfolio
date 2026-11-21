import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlutter, faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faPlug } from "@fortawesome/free-solid-svg-icons";

const AUTO_ADVANCE_MS = 4500;

// One accent per service, cycling if there are ever more than four.
// Written as literal class strings (not template-built) so Tailwind's
// scanner can actually see and generate them.
const tones = [
  {
    tile: "bg-primary/15 ring-primary/30 text-primary",
    glow: "var(--color-primary)",
  },
  {
    tile: "bg-accent/15 ring-accent/30 text-accent",
    glow: "var(--color-accent)",
  },
  {
    tile: "bg-success/15 ring-success/30 text-success",
    glow: "var(--color-success)",
  },
  {
    tile: "bg-secondary/15 ring-secondary/30 text-secondary",
    glow: "var(--color-secondary)",
  },
];

// Real brand marks for the stack; Integrations has no single brand, so a
// plug stands in for "connects to everything else."
const faIcons = [faFlutter, faReact, faPython, faPlug];

const Icon = ({ index, className }) => (
  <FontAwesomeIcon icon={faIcons[index % faIcons.length]} className={className} />
);

// How far back each card in the deck sits — index 0 is always the active
// (front) card. Alternating rotation direction is what sells the "fanned
// hand of cards" read instead of a plain drop-shadow pile.
const depthOffsets = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 26, y: 20, rotate: 4, scale: 0.95 },
  { x: 48, y: 36, rotate: -5, scale: 0.9 },
  { x: 66, y: 50, rotate: 7, scale: 0.85 },
];

/**
 * A fanned card deck instead of a flat panel: every service is always on
 * screen, stacked and rotated behind the active one. Clicking a peeking card
 * brings it to the front — the number rail above stays as the direct jump.
 * Auto-advances on a timer that pauses while the cursor is over it.
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

      {/* The deck — extra right/bottom room (pr/pb) is so the cards fanned
          out behind the active one don't clip against the column edge. */}
      <div className="relative mt-7 min-h-[29rem] flex-1 pr-10 pb-10 sm:pr-16 sm:pb-14">
        {roles.map((role, i) => {
          const depth = (i - active + roles.length) % roles.length;
          const offset = depthOffsets[Math.min(depth, depthOffsets.length - 1)];
          const tone = tones[i % tones.length];
          const isFront = depth === 0;

          return (
            <motion.div
              key={role.id}
              className={`absolute inset-0 ${isFront ? "" : "cursor-pointer"}`}
              style={{ zIndex: roles.length - depth }}
              animate={{
                x: offset.x,
                y: offset.y,
                rotate: offset.rotate,
                scale: offset.scale,
                opacity: isFront ? 1 : Math.max(0.5, 1 - depth * 0.18),
              }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={() => !isFront && setActive(i)}
              aria-hidden={!isFront}
            >
              <div
                className="panel panel-sheen relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-9"
                style={{ boxShadow: isFront ? "var(--shadow-lifted)" : "var(--shadow-ambient)" }}
              >
                {/* Diagonal accent wash — swaps tone per card, only lit on the front one. */}
                {isFront && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-[90px]"
                    style={{ background: tone.glow, opacity: 0.16 }}
                  />
                )}

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-4 select-none font-display text-6xl font-bold leading-none text-fg opacity-[0.06] sm:text-7xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tone.tile}`}
                  >
                    <Icon index={i} className="size-5" />
                  </div>
                  <h3 className="font-display text-fluid-2xl text-fg">{role?.title}</h3>
                </div>

                {/* Only the front card shows copy — the ones behind are
                    just a title peeking out, like a real card in a hand. */}
                {isFront && (
                  <>
                    <p className="relative z-10 mt-4 max-w-[58ch] text-fg-muted">
                      {role?.description}
                    </p>
                    {role?.tags?.length > 0 && (
                      <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-5">
                        {role.tags.map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceShowcase;
