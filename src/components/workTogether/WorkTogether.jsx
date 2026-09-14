import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Aurora, Magnetic, Reveal, TextReveal } from "../motion";

const EMAIL = "abdulsalam.0302@gmail.com";

// Denser and brighter than the default mesh — on near-black it reads as a
// light show instead of a wash.
const ctaBlobs = [
  { color: "var(--accent)", size: "46rem", top: "-30%", left: "-12%", opacity: 0.44, delay: "0s" },
  { color: "var(--violet)", size: "42rem", top: "2%", left: "52%", opacity: 0.4, delay: "-6s" },
  { color: "var(--accent-soft)", size: "30rem", top: "58%", left: "20%", opacity: 0.28, delay: "-13s" },
];

const WorkTogether = () => {
  return (
    // The one sanctioned fixed-colour band: it stays dark in both themes, so it
    // carries the dark token set locally and hardcodes light text on top.
    <section
      data-theme="salam-dark"
      className="section relative overflow-hidden bg-ink"
      style={{ paddingBlock: "clamp(6.5rem, 14vw, 13rem)" }}
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

      <div className="content relative z-10">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <Reveal direction="none" duration={0.8}>
            <span className="eyebrow eyebrow-center">Let&rsquo;s build</span>
          </Reveal>

          {/* The base 1.08 heading leading clips descenders inside the per-word
              clip boxes TextReveal renders — "project" and "together" need the
              extra room. */}
          <h2 className="mt-7 font-display text-fluid-5xl leading-[1.14] text-white">
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

          <Reveal delay={0.3} className="mt-8 max-w-[44ch]">
            <p className="text-fluid-lg leading-relaxed text-white/70">
              I&rsquo;m always open to discussing new projects and creative
              ideas — whether it&rsquo;s a full product build or a single hard
              problem you want solved properly.
            </p>
          </Reveal>

          <Reveal delay={0.42} scale={0.96} className="mt-12">
            <Magnetic className="inline-flex" strength={0.38}>
              <a
                href="#contact"
                className="btn btn-primary btn-lg px-9 text-[0.95rem]"
              >
                Start a conversation
                <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.54} className="mt-8">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-block py-1.5 font-mono text-sm text-white/60 hover:text-white/85"
            >
              {/* Underline drawn with a sized background so only transform-free
                  paint animates on hover. */}
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-300 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
                {EMAIL}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WorkTogether;
