import person from "../../assets/images/person.png";
import {
  Aurora,
  Magnetic,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
  TextReveal,
} from "../motion";
import InformationSummary from "./InformationSummary";

// Information summary data
const informationSummaryData = [
  {
    id: 1,
    title: "Experience",
    value: 3,
    suffix: "+",
  },
  {
    id: 2,
    title: "Apps Delivered",
    value: 10,
    suffix: "+",
  },
  {
    id: 3,
    title: "Happy Clients",
    value: 15,
    suffix: "+",
  },
];

// Decorative badges pinned to the portrait frame's edges.
const techBadges = [
  { label: "Flutter", position: "top-[13%] left-0 sm:-left-5", delay: "-0.6s" },
  { label: "Dart", position: "top-[47%] right-0 sm:-right-5", delay: "-2.9s" },
  { label: "Firebase", position: "-bottom-4 left-[10%]", delay: "-4.9s" },
];

const Introduction = () => {
  return (
    <section
      id="introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg pt-28 pb-24 lg:pt-32 lg:pb-28"
    >
      <Aurora />
      <div className="grid-lines" />

      <div className="content relative z-10 pb-14 lg:pb-8">
        <div className="grid items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-16">
          {/* ── Text column ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
            <Reveal delay={0.15} duration={0.6} distance={14}>
              <span className="chip">
                <span className="relative flex size-1.5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
                  <span className="relative size-1.5 rounded-full bg-emerald-500" />
                </span>
                Available for new projects
              </span>
            </Reveal>

            <Reveal delay={0.3} duration={0.6} distance={14} className="mt-6">
              {/* The leading rule only reads correctly when the label is left-aligned. */}
              <p className="eyebrow [&::before]:hidden lg:[&::before]:block">
                Flutter Engineer · Lahore, PK
              </p>
            </Reveal>

            <h1 className="mt-4 font-display text-fluid-6xl font-bold leading-[0.94] tracking-[-0.042em]">
              <TextReveal
                as="span"
                text="Hello, I’m"
                by="word"
                trigger="mount"
                delay={0.42}
                duration={0.8}
                className="block text-[0.4em] font-medium leading-[1.2] tracking-[-0.02em] text-fg-muted"
              />
              {/* will-change on the animated glyphs promotes them to their own
                  layer, which can drop them out of the gradient's text clip. */}
              <TextReveal
                as="span"
                text="Abdul Salam"
                by="char"
                trigger="mount"
                delay={0.62}
                duration={0.9}
                className="text-gradient block [&_span]:[will-change:auto]!"
              />
            </h1>

            <Reveal delay={0.95} className="mt-7 max-w-[52ch]">
              <p className="text-fluid-lg text-fg-muted">
                I’m a <span className="bg-highlight">Flutter Developer</span> with{" "}
                <span className="bg-highlight">3+ years</span> of experience building
                high-performance cross-platform mobile apps for Android and iOS,
                based in Lahore, Pakistan.
              </p>
            </Reveal>

            <Reveal
              delay={1.1}
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Magnetic>
                <a
                  href="#contact"
                  className="btn btn-primary group h-12 min-h-12 gap-2 px-7 text-fluid-base"
                >
                  Let’s talk
                  <svg
                    viewBox="0 0 16 16"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </a>
              </Magnetic>
              <a
                href="#portfolio"
                className="btn btn-ghost-line h-12 min-h-12 px-7 text-fluid-base"
              >
                View my work
              </a>
            </Reveal>

            <RevealGroup
              delay={1.25}
              stagger={0.09}
              className="mt-12 flex items-start justify-center lg:justify-start"
            >
              {informationSummaryData.map((item, i) => (
                <RevealItem
                  key={item.id}
                  className={`px-4 sm:px-7 lg:first:pl-0 ${
                    i > 0 ? "border-l border-line" : ""
                  }`}
                >
                  <InformationSummary item={item} delay={1.35 + i * 0.09} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* ── Portrait column ─────────────────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 translate-x-7 translate-y-9 rounded-[3rem] blur-3xl"
              style={{
                background:
                  "radial-gradient(58% 58% at 50% 50%, var(--accent-tint-strong), transparent 72%)",
              }}
            />

            <Parallax speed={40} className="relative">
              {/* `.panel` is unlayered CSS, so its 1.25rem radius beats a plain
                  utility — without `!` the frame rounds tighter than the image. */}
              <div className="panel panel-sheen overflow-hidden rounded-[2rem]! p-2">
                <img
                  src={person}
                  alt="Abdul Salam, Flutter engineer"
                  width={536}
                  height={636}
                  className="aspect-[536/636] w-full rounded-[1.6rem] object-cover"
                />
              </div>

              {techBadges.map((badge) => (
                <span
                  key={badge.label}
                  aria-hidden="true"
                  className={`chip absolute animate-float ${badge.position}`}
                  style={{
                    background: "var(--surface-solid)",
                    boxShadow: "var(--shadow-ambient)",
                    animationDelay: badge.delay,
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </Parallax>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2.5"
      >
        <span className="flex h-10 w-[1.4rem] justify-center overflow-hidden rounded-full border border-line-strong pt-2">
          <span
            className="h-3 w-[3px] rounded-full bg-brand"
            style={{ animation: "scroll-hint 2.6s var(--ease-out-quint) infinite" }}
          />
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-fg-faint">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Introduction;
