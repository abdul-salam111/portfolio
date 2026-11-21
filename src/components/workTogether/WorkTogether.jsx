import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faClock,
  faEnvelope,
  faLayerGroup,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Marquee from "react-fast-marquee";

import { Aurora, Magnetic, Reveal, TextReveal, TiltCard } from "../motion";

const EMAIL = "abdulsalam.0302@gmail.com";

// Denser and brighter than the default mesh — on near-black it reads as a
// light show instead of a wash.
const ctaBlobs = [
  { color: "var(--accent)", size: "42rem", top: "-28%", left: "-14%", opacity: 0.4, delay: "0s" },
  { color: "var(--violet)", size: "38rem", top: "6%", left: "58%", opacity: 0.36, delay: "-6s" },
];

const cardFacts = [
  { icon: faLocationDot, label: "Based in", value: "Lahore, Pakistan" },
  { icon: faClock, label: "Replies within", value: "24 hours" },
  { icon: faLayerGroup, label: "Stack", value: "Flutter · React · FastAPI" },
];

// A couple of emoji floating around the contact card — purely atmospheric,
// same trick as the portrait badges on the hero.
const floaters = [
  { emoji: "👋", position: "-top-5 -left-5", delay: "-1.2s" },
  { emoji: "✨", position: "-bottom-4 -right-4", delay: "-3.6s" },
];

const WorkTogether = () => {
  return (
    // The one sanctioned fixed-colour band: it stays dark in both themes, so it
    // carries the dark token set locally and hardcodes light text on top.
    <section
      data-theme="salam-dark"
      className="section relative overflow-hidden bg-ink"
      style={{ paddingBlock: "clamp(4rem, 7vw, 6rem)" }}
    >
      <Aurora blobs={ctaBlobs} />
      <div className="grid-lines" aria-hidden="true" />

      {/* Hairlines so the band still reads as a distinct block in light mode. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.16),transparent)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.16),transparent)]"
      />

      {/* A sticker-like ribbon banner across the very top of the section. */}
      <Reveal direction="none" duration={0.9} className="absolute inset-x-0 top-0 z-0">
        <div
          aria-hidden="true"
          className="border-y border-white/10 py-2"
          style={{ background: "var(--accent)" }}
        >
          <Marquee speed={28} autoFill>
            <span className="mx-6 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-ink/80">
              Let&rsquo;s talk ✦ Let&rsquo;s build ✦ Let&rsquo;s ship ✦
            </span>
          </Marquee>
        </div>
      </Reveal>

      <div className="content relative z-10 mt-10">
        <div className="mx-auto grid max-w-[68rem] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ── Text column ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
            <Reveal direction="none" duration={0.8} className="flex items-center gap-3">
              {/* Rotating "available for work" badge — a spinning ring of
                  repeating text with a pulsing dot locked in the centre. */}
              <span className="relative inline-flex size-9 shrink-0 items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow text-white/50">
                  <defs>
                    <path id="cta-ring-path" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                  </defs>
                  <text fill="currentColor" fontSize="9.5" letterSpacing="2" className="font-mono uppercase">
                    <textPath href="#cta-ring-path" startOffset="0%">
                      Available now • Available now •
                    </textPath>
                  </text>
                </svg>
                <span className="relative flex size-2.5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
                  <span className="relative size-2.5 rounded-full bg-emerald-500" />
                </span>
              </span>
              <span className="eyebrow [&::before]:hidden">Let&rsquo;s build</span>
            </Reveal>

            {/* The base 1.08 heading leading clips descenders inside the per-word
                clip boxes TextReveal renders — "project" and "together" need the
                extra room. */}
            <h2 className="mt-5 font-display text-fluid-4xl leading-[1.14] text-white">
              <TextReveal as="span" by="word" className="block" text="Have a project in mind?" />
              <TextReveal
                as="span"
                by="word"
                delay={0.16}
                className="block text-white/45"
                text="Let's build it together."
              />
            </h2>

            <Reveal delay={0.3} className="mt-5 max-w-[46ch]">
              <p className="text-fluid-base leading-relaxed text-white/70">
                I&rsquo;m always open to discussing new projects and creative
                ideas — whether it&rsquo;s a full product build or a single hard
                problem you want solved properly.
              </p>
            </Reveal>

            <Reveal
              delay={0.42}
              scale={0.96}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Magnetic className="inline-flex" strength={0.38}>
                <a href="#contact" className="btn btn-primary btn-lg group px-9 text-[0.95rem]">
                  Start a conversation
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ms-3 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </Magnetic>

              <Magnetic className="inline-flex" strength={0.3}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="chip glass-thin group inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-fluid-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-white/50" />
                  {EMAIL}
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* ── Contact-card column ─────────────────────────────────────── */}
          <Reveal delay={0.2} scale={0.95} className="mx-auto w-full max-w-sm">
            <div className="relative">
              {/* A second card peeking out behind the front one — the same
                  stacked-card trick used on the Portfolio section, here just
                  for atmosphere rather than real content. */}
              <div
                aria-hidden="true"
                className="panel absolute inset-x-3 -bottom-3 rounded-[2rem]!"
                style={{ top: "0.75rem", background: "var(--violet)", opacity: 0.35 }}
              />

              <TiltCard max={8} className="panel spotlight relative rounded-[2rem]! p-7">
                {floaters.map((f) => (
                  <span
                    key={f.emoji}
                    aria-hidden="true"
                    className={`chip absolute hidden size-10 animate-float items-center justify-center rounded-full text-lg sm:flex ${f.position}`}
                    style={{ background: "var(--surface-veil)", animationDelay: f.delay }}
                  >
                    {f.emoji}
                  </span>
                ))}

                <div className="flex items-center gap-3.5">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-ink"
                    style={{ background: "linear-gradient(135deg, var(--accent), var(--violet))" }}
                  >
                    AS
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="truncate font-display text-base font-semibold text-white">
                      Abdul Salam
                    </p>
                    <p className="truncate text-xs text-white/55">Full-Stack Developer</p>
                  </div>
                </div>

                <div className="my-5 h-px bg-white/10" />

                <ul className="flex flex-col gap-3.5 text-left">
                  {cardFacts.map((fact) => (
                    <li key={fact.label} className="flex items-center gap-3">
                      <span className="chip glass-thin flex size-8 shrink-0 items-center justify-center rounded-full text-white/60">
                        <FontAwesomeIcon icon={fact.icon} className="text-xs" />
                      </span>
                      <span className="min-w-0 text-sm text-white/70">
                        <span className="text-white/40">{fact.label}: </span>
                        {fact.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:${EMAIL}`}
                  className="group mt-6 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  Say hello
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-xs text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;
