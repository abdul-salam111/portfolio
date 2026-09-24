import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import person from "../../assets/about-me-pic.jpg";
import SocialMedia from "../common/socialMedia/SocialMedia";
import {
  CountUp,
  Magnetic,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
  TextReveal,
} from "../motion";

const metrics = [
  { value: 90, suffix: "%", label: "crash-free sessions" },
  { value: 35, suffix: "%", label: "increase in retention" },
  { value: 40, suffix: "%", label: "fewer post-release bugs" },
];

const stack = [
  "Flutter",
  "Dart",
  "BLoC",
  "Provider",
  "GetX",
  "Firebase",
  "REST APIs",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Clean Architecture",
];

const Profile = () => {
  return (
    <section
      id="profile"
      className="section relative bg-bg-elev border-y border-line"
    >
      <div className="content">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Image column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
              {/* Offset plate — the photo sits proud of it */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 aspect-[4/5] -translate-x-3 -translate-y-3 rounded-3xl border border-brand/30 sm:-translate-x-5 sm:-translate-y-5 lg:-translate-x-7 lg:-translate-y-7"
                style={{ background: "var(--accent-tint)" }}
              />

              {/* Travel stays under the plate's smallest offset (12px) so the
                  plate never slides out from behind the photo. */}
              <Parallax speed={12} className="relative">
                <div
                  className="relative overflow-hidden rounded-3xl border border-line"
                  style={{ boxShadow: "var(--shadow-lifted)" }}
                >
                  <img
                    src={person}
                    alt="Abdul Salam, Senior Flutter Developer at Softronix"
                    loading="lazy"
                    // Framed slightly right of centre so the 4:5 crop keeps
                    // the outstretched hand inside the frame.
                    className="aspect-[4/5] w-full object-cover object-[62%_50%]"
                  />
                  {/* Dissolves the photo's hard bottom crop into the section and
                      gives the social pills below it something to sit against. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                    style={{ background: "linear-gradient(to top, var(--bg-elev), transparent)" }}
                  />
                </div>
              </Parallax>

              {/* Social pills straddle the photo's bottom edge. Kept outside
                  the Parallax so their blur never rides a scroll transform. */}
              <div className="relative z-10 -mt-5 flex justify-center">
                <SocialMedia />
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">ABOUT ME</p>
            </Reveal>

            <TextReveal
              as="h2"
              by="word"
              text="Senior Flutter Developer at Softronix"
              className="section-title mt-5"
              // section-title's 1.04 leading clips descenders inside the
              // per-word clip boxes TextReveal renders.
              style={{ lineHeight: 1.14 }}
            />

            <Reveal delay={0.1} className="mt-6 max-w-[62ch] space-y-4">
              <p className="text-fg-muted text-fluid-base">
                With 4+ years of experience, I build high-performance,
                cross-platform mobile applications for Android and iOS with
                Flutter and Dart — fluent in BLoC, Provider and GetX state
                management, RESTful API integration, Firebase services, and
                clean architecture (MVVM/MVC).
              </p>
              <p className="text-fg-muted text-fluid-base">
                I also write the backends they talk to, in Python and FastAPI:
                JWT auth, PostgreSQL schemas and migrations, background tasks
                and auto-generated OpenAPI docs — so the contract between app
                and server is designed once, by one person, instead of
                negotiated across two teams.
              </p>
              <p className="text-fg-muted text-fluid-base">
                That architecture work shows up in production. Across the apps
                I have shipped, it holds under real traffic:
              </p>
            </Reveal>

            <RevealGroup
              stagger={0.08}
              className="mt-7 grid max-w-[36rem] grid-cols-3 gap-x-4 border-y border-line py-6 sm:gap-x-8"
            >
              {metrics.map((metric) => (
                <RevealItem key={metric.label}>
                  <div className="font-display text-fluid-2xl font-semibold tracking-tight text-fg tabular-nums">
                    <CountUp value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="mt-1.5 font-mono text-[0.6875rem] uppercase leading-snug tracking-[0.16em] text-fg-muted sm:text-xs">
                    {metric.label}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup stagger={0.05} className="mt-7 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <RevealItem as="span" key={tech} className="chip">
                  {tech}
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal
              delay={0.08}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.24} className="inline-flex">
                <a className="btn btn-primary btn-lg px-7" href="#portfolio">
                  My Projects
                </a>
              </Magnetic>
              <a
                className="btn btn-ghost-line btn-lg gap-2 px-7"
                href="https://drive.google.com/file/d/1cLYsYev927G_5q_lwX2gD1h28ww9CXJA/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faDownload} className="w-3.5" />
                Download CV
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
