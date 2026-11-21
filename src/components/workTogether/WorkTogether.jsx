import { faArrowRight, faArrowUpRightFromSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Marquee from "react-fast-marquee";

import { Aurora, Magnetic, Reveal, TextReveal, TiltCard } from "../motion";

const EMAIL = "abdulsalam.0302@gmail.com";

// Denser and brighter than the default mesh — on near-black it reads as a
// light show instead of a wash.
const ctaBlobs = [
  { color: "var(--accent)", size: "46rem", top: "-30%", left: "-12%", opacity: 0.44, delay: "0s" },
  { color: "var(--violet)", size: "42rem", top: "2%", left: "52%", opacity: 0.4, delay: "-6s" },
  { color: "var(--accent-soft)", size: "30rem", top: "58%", left: "20%", opacity: 0.28, delay: "-13s" },
];

// Floats lazily around the panel — purely atmospheric, same trick as the
// portrait badges on the hero.
const floaters = [
  { emoji: "👋", position: "top-[6%] left-[4%] sm:left-[8%]", delay: "-0.8s" },
  { emoji: "🚀", position: "top-[14%] right-[3%] sm:right-[7%]", delay: "-3.4s" },
  { emoji: "💬", position: "bottom-[10%] left-[2%] sm:left-[6%]", delay: "-2.1s" },
  { emoji: "✨", position: "bottom-[16%] right-[5%] sm:right-[10%]", delay: "-5.2s" },
];

const WorkTogether = () => {
  return (
    // The one sanctioned fixed-colour band: it stays dark in both themes, so it
    // carries the dark token set locally and hardcodes light text on top.
    <section
      data-theme="salam-dark"
      className="section relative overflow-hidden bg-ink"
      style={{ paddingBlock: "clamp(3rem, 5vw, 4.5rem)" }}
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

      {/* A sticker-like ribbon cutting across the section at a slight tilt —
          the one unapologetically playful move in an otherwise clean layout. */}
      <Reveal direction="none" duration={0.9} className="absolute inset-x-0 top-[18%] z-0 -rotate-2">
        <div
          aria-hidden="true"
          className="border-y border-white/10 py-2.5"
          style={{ background: "var(--accent)" }}
        >
          <Marquee speed={32} autoFill>
            <span className="mx-6 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-ink/80">
              Let&rsquo;s talk ✦ Let&rsquo;s build ✦ Let&rsquo;s ship ✦
            </span>
          </Marquee>
        </div>
      </Reveal>

      <div className="content relative z-10">
        <TiltCard
          max={3}
          scale={1.005}
          className="panel spotlight relative mx-auto flex max-w-[52rem] flex-col items-center overflow-hidden rounded-[2.5rem]! px-6 py-9 text-center sm:px-10 sm:py-11"
        >
          {/* Floating emoji — hidden on small screens so they don't collide
              with the text. */}
          {floaters.map((f) => (
            <span
              key={f.emoji}
              aria-hidden="true"
              className={`chip absolute hidden size-10 animate-float items-center justify-center rounded-full text-lg sm:flex ${f.position}`}
              style={{
                background: "var(--surface-veil)",
                animationDelay: f.delay,
              }}
            >
              {f.emoji}
            </span>
          ))}

          {/* Rotating "available for work" badge — a spinning ring of
              repeating text with a static arrow glyph locked in the centre. */}
          <Reveal delay={0.1} scale={0.9} className="relative mb-1 size-16 shrink-0 sm:size-[4.5rem]">
            <svg viewBox="0 0 100 100" className="size-full animate-spin-slow text-white/70">
              <defs>
                <path
                  id="cta-ring-path"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text fill="currentColor" fontSize="8.2" letterSpacing="2.5" className="font-mono uppercase">
                <textPath href="#cta-ring-path" startOffset="0%">
                  Available for work • Available for work •
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-3 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
                <span className="relative size-3 rounded-full bg-emerald-500" />
              </span>
            </span>
          </Reveal>

          <Reveal direction="none" duration={0.8}>
            <span className="eyebrow eyebrow-center">Let&rsquo;s build</span>
          </Reveal>

          {/* The base 1.08 heading leading clips descenders inside the per-word
              clip boxes TextReveal renders — "project" and "together" need the
              extra room. */}
          <h2 className="mt-4 font-display text-fluid-4xl leading-[1.14] text-white">
            <TextReveal
              as="span"
              by="word"
              className="block"
              text="Have a project in mind?"
            />
            <TextReveal
              as="span"
              by="word"
              delay={0.16}
              className="block text-white/45"
              text="Let's build it together."
            />
          </h2>

          <Reveal delay={0.3} className="mt-4 max-w-[42ch]">
            <p className="text-fluid-base leading-relaxed text-white/70">
              I&rsquo;m always open to discussing new projects and creative
              ideas — whether it&rsquo;s a full product build or a single hard
              problem you want solved properly.
            </p>
          </Reveal>

          <Reveal delay={0.42} scale={0.96} className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Magnetic className="inline-flex" strength={0.38}>
              <a
                href="#contact"
                className="btn btn-primary btn-lg group px-9 text-[0.95rem]"
              >
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
                className="chip glass-thin group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-fluid-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-white/50" />
                {EMAIL}
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-xs text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
          </Reveal>
        </TiltCard>
      </div>
    </section>
  );
};

export default WorkTogether;
