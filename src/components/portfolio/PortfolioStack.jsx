import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMotionPrefs } from "../motion";

const VH_PER_PROJECT = 85;

const ProjectCard = ({ data, index, total }) => {
  const title = data?.title ?? "Untitled project";

  return (
    <Link
      to={`/project/${data?.id}`}
      data-cursor="View"
      aria-label={`Open the ${title} case study`}
      // A hard min-h clipped on short viewports; a pure h-[50vh] over-shrank
      // the card on taller ones. max-w caps the width on tall screens while
      // max-h caps the height on short ones — the browser picks whichever
      // binds first, so the card is as large as it can be without ever
      // pushing the pinned block past the viewport.
      className="panel relative mx-auto block aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] lg:aspect-video lg:h-auto lg:w-full lg:max-w-6xl lg:max-h-[64vh]"
    >
      <img
        src={data?.image}
        alt={`${title} interface preview`}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      {/* Count, overlaid in the top-right corner of the image. */}
      <span
        aria-hidden="true"
        className="chip glass-thin absolute right-4 top-4 font-mono text-xs tracking-[0.2em] uppercase"
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      {/* Case study badge — top-left, paired with the counter at top-right.
          Bottom-left looked right in isolation, but on shorter viewports the
          bottom edge of the pinned card can sit right at (or past) the fold,
          cutting the badge off. The top of the card is always visible since
          sticky positioning pins it there, so this corner never clips. Solid
          brand fill rather than the glass treatment so it reads as a clear
          call-to-action instead of blending into the screenshot behind it. */}
      <span
        aria-hidden="true"
        className="btn btn-primary absolute left-4 top-4 h-auto gap-2 px-4 py-2 text-xs font-semibold shadow-lg"
      >
        Case Study
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
      </span>
    </Link>
  );
};

/**
 * Pins the heading AND the active card together as one frozen unit while the
 * reader scrolls through every project, so nothing drifts apart mid-scroll —
 * the layout the visitor sees the moment it locks is the layout they keep
 * until the last project, at which point everything releases together.
 * Falls back to a plain stacked list under reduced motion, since
 * scroll-jacking a page is exactly the kind of thing that preference exists
 * to opt out of.
 */
const PortfolioStack = ({ projects, heading }) => {
  const { reduced } = useMotionPrefs();
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  // Jumps the actual scroll position (not just the state) so the dots don't
  // get immediately overridden by the next scroll-progress reading.
  const goTo = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const fraction = (index + 0.5) / projects.length;
    const top = el.offsetTop + el.offsetHeight * fraction - window.innerHeight / 2;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (reduced || projects.length === 0) {
    return (
      <div className="content flex flex-col gap-8">
        {heading}
        {projects.map((data, i) => (
          <ProjectCard key={data?.id} data={data} index={i} total={projects.length} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: `${projects.length * VH_PER_PROJECT}vh` }}>
      {/* Heading and card live inside the SAME sticky box now, so they pin
          together at one fixed position (top-24) instead of the heading
          scrolling away on its own while only the card locks in — that
          mismatch was the actual bug: the visitor would see the heading
          disappear, then the card jump to a different (centered) spot before
          cycling started. Now the whole block freezes exactly where it is
          once pinned, and only the project inside it changes. */}
      <div className="content sticky top-4 flex flex-col items-center py-2 lg:top-6">
        {heading}

        <div className="relative mx-auto mt-6 w-full max-w-6xl">
          {/* The next couple of projects, peeking out from behind the active
              card as a real (if faded/scaled) preview of what's coming next —
              not flat placeholder color bars. Furthest first so the nearest
              upcoming project ends up on top of the stack. */}
          {[2, 1].map((offset) => {
            const upcoming = projects[(active + offset) % projects.length];
            return (
              <div
                key={`${upcoming?.id}-${offset}`}
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden rounded-[1.75rem] opacity-50"
                style={{
                  transform: `scale(${1 - offset * 0.05}) translateY(${offset * 14}px)`,
                  zIndex: -offset,
                }}
              >
                <img
                  src={upcoming?.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}

          {/* mode="wait" fully faded the old card out, THEN faded the new
              one in — the gap between those two steps is what showed as a
              blank flash. popLayout crossfades them at the same time instead
              (exiting card goes position:absolute so it doesn't collide with
              the entering one in normal flow). */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={projects[active]?.id ?? active}
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <ProjectCard data={projects[active]} index={active} total={projects.length} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center gap-1.5">
          {projects.map((data, i) => (
            <button
              key={data?.id ?? i}
              type="button"
              aria-label={`Show project ${i + 1}`}
              onClick={() => goTo(i)}
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
    </div>
  );
};

export default PortfolioStack;
