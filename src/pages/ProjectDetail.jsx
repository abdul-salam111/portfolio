import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { projectData } from "../data/projectData";
import { useContent } from "../services/useContent";
import { Aurora, Magnetic, Reveal, RevealGroup, RevealItem, TiltCard } from "../components/motion";

const easeOut = [0.16, 1, 0.3, 1];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

// The hero is an always-dark band. Tailwind's `border-line` / `text-fg-muted`
// utilities are resolved at :root and cannot be re-pointed here, but the shared
// `.chip` and `.grid-lines` classes read the raw tokens directly — pinning those
// to their dark values keeps both readable when the site is in its light theme.
const darkBand = {
  "--border-hairline": "rgb(255 255 255 / 0.13)",
  "--border-strong": "rgb(255 255 255 / 0.24)",
  "--surface-veil": "rgb(255 255 255 / 0.08)",
  "--text-muted": "rgb(255 255 255 / 0.74)",
};

const isRealLink = (link) => link && link !== "#!";

const StoreBadge = ({ href, icon, label, pending }) =>
  isRealLink(href) ? (
    <Magnetic strength={0.2}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary h-12 min-h-12 gap-3 px-7 text-fluid-base"
      >
        <FontAwesomeIcon icon={icon} className="text-lg" />
        {label}
      </a>
    </Magnetic>
  ) : (
    <span
      aria-disabled="true"
      className="btn btn-ghost-line h-12 min-h-12 cursor-not-allowed gap-3 px-7 text-fluid-base opacity-60"
    >
      <FontAwesomeIcon icon={icon} className="text-lg" />
      {pending}
    </span>
  );

const ProjectDetail = () => {
  const { id } = useParams();
  const allProjects = useContent("projects", projectData);
  const project = allProjects.find((p) => String(p.id) === String(id));
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-50px 0px" });

  if (!project) return <Navigate to="/" replace />;

  const categories = project.category?.split(" · ") ?? [];
  const hasScreenshot0 = !!project.screenshots?.[0];
  const hasScreenshot1 = !!project.screenshots?.[1];

  return (
    <div className="bg-bg">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-36 sm:pt-36" style={darkBand}>
        <Aurora />
        <div className="grid-lines" aria-hidden="true" />

        <div className="content relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-fluid-sm font-medium text-white/70 hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </motion.div>

          {categories.length > 0 && (
            <motion.div
              className="mt-10 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.65, ease: easeOut }}
            >
              {categories.map((cat) => (
                <span key={cat} className="chip">{cat}</span>
              ))}
            </motion.div>
          )}

          <motion.h1
            className="mt-6 max-w-4xl text-fluid-4xl text-white"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75, ease: easeOut }}
          >
            {project.title}
          </motion.h1>

          {project.tagline && (
            <motion.p
              className="mt-6 max-w-2xl text-fluid-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.75, ease: easeOut }}
            >
              {project.tagline}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Cover image floating over the hero ── */}
      {project.image && (
        <div className="content relative z-20 -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.42, duration: 0.85, ease: easeOut }}
            className="overflow-hidden rounded-[1.5rem] border border-line bg-surface"
            style={{ boxShadow: "var(--shadow-lifted)" }}
          >
            <img
              src={project.image}
              alt={project.title ? `${project.title} cover` : "Project cover"}
              loading="eager"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          ABOUT — banner + alternating sections
      ══════════════════════════════════════════ */}
      {(project.description || project.fullDescription) && (
        <div>

          {/* ── About banner ── */}
          <section className="section border-y border-line bg-bg-elev">
            <div className="content">
              <Reveal>
                <span className="eyebrow">About the Project</span>
                <h2 className="section-title mt-4">{project.title}</h2>
                <div className="mt-6 h-[3px] w-12 rounded-full bg-brand" />
                {(project.about || project.tagline) && (
                  <p className="mt-7 max-w-3xl text-fluid-lg leading-relaxed text-fg-muted">
                    {project.about || project.tagline}
                  </p>
                )}
              </Reveal>
            </div>
          </section>

          {/* ── The Problem — text LEFT, image RIGHT ── */}
          {project.description && (
            <section className="section">
              <div className="content">
                <div className={`grid items-center gap-12 lg:gap-16 ${hasScreenshot0 ? "lg:grid-cols-2" : ""}`}>

                  <Reveal>
                    <span className="eyebrow">The Problem</span>
                    <h3 className="mt-4 text-fluid-2xl text-fg">The Challenge</h3>
                    <div className="mt-5 h-[3px] w-10 rounded-full bg-brand" />
                    <p className="mt-6 text-fluid-base leading-relaxed text-fg-muted">
                      {project.description}
                    </p>
                  </Reveal>

                  {hasScreenshot0 && (
                    <Reveal delay={0.16} direction="right">
                      <TiltCard
                        max={6}
                        className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface"
                        style={{ boxShadow: "var(--shadow-lifted)" }}
                      >
                        <img
                          src={project.screenshots[0]}
                          alt="Screenshot illustrating the challenge"
                          loading="lazy"
                          className="w-full object-cover"
                        />
                      </TiltCard>
                    </Reveal>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ── The Solution — image LEFT, text RIGHT ── */}
          {project.fullDescription && (
            <section className="section border-y border-line bg-bg-elev">
              <div className="content">
                <div className={`grid items-center gap-12 lg:gap-16 ${hasScreenshot1 ? "lg:grid-cols-2" : ""}`}>

                  {hasScreenshot1 && (
                    <Reveal delay={0.16} direction="left">
                      <TiltCard
                        max={6}
                        className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface"
                        style={{ boxShadow: "var(--shadow-lifted)" }}
                      >
                        <img
                          src={project.screenshots[1]}
                          alt="Screenshot illustrating the solution"
                          loading="lazy"
                          className="w-full object-cover"
                        />
                      </TiltCard>
                    </Reveal>
                  )}

                  <Reveal>
                    <span className="eyebrow">The Solution</span>
                    <h3 className="mt-4 text-fluid-2xl text-fg">How I solved it</h3>
                    <div className="mt-5 h-[3px] w-10 rounded-full bg-brand" />
                    <p className="mt-6 text-fluid-base leading-relaxed text-fg-muted">
                      {project.fullDescription}
                    </p>
                  </Reveal>

                </div>
              </div>
            </section>
          )}

        </div>
      )}

      {/* ── Key Features ── */}
      {project.features?.length > 0 && (
        <section className="section">
          <div className="content">
            <Reveal>
              <span className="eyebrow">Key Features</span>
              <h2 className="section-title mt-4">What I built</h2>
            </Reveal>

            <RevealGroup stagger={0.07} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, i) => (
                <RevealItem key={i} className="h-full">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.28, ease: easeOut }}
                    className="panel panel-sheen h-full overflow-hidden p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-1 right-4 select-none font-display text-6xl font-bold leading-none text-brand/10"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mb-5 block h-2.5 w-2.5 rounded-full bg-brand"
                      style={{ boxShadow: "0 0 0 4px var(--accent-tint)" }}
                    />
                    <p className="relative text-fluid-sm font-medium leading-snug text-fg">
                      {feature}
                    </p>
                  </motion.article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ── Tech Stack ── */}
      {project.techStack?.length > 0 && (
        <section className="section border-y border-line bg-bg-elev">
          <div className="content">
            <Reveal>
              <span className="eyebrow">Stack</span>
              <h2 className="section-title mt-4">Built with</h2>
            </Reveal>

            <div ref={techRef} className="mt-10 flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  custom={i}
                  variants={chipVariants}
                  initial="hidden"
                  animate={techInView ? "visible" : "hidden"}
                  whileHover={{ y: -3 }}
                  className="chip chip-accent cursor-default px-4 py-2 text-[0.72rem] hover:border-brand"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section relative overflow-hidden">
        <Aurora />
        <div className="content relative z-10 text-center">
          <Reveal>
            <span className="eyebrow eyebrow-center">Availability</span>
            <h2 className="section-title mt-4">Try the App</h2>
            <p className="section-lead mx-auto mt-5 text-center">
              Available on Android and iOS platforms.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <StoreBadge
                href={project.playStoreLink}
                icon={faGooglePlay}
                label="Google Play"
                pending="Coming to Play Store"
              />
              <StoreBadge
                href={project.appStoreLink}
                icon={faApple}
                label="App Store"
                pending="Coming to App Store"
              />
            </div>

            <Link
              to="/"
              className="group mt-12 inline-flex items-center gap-2 text-fluid-sm font-medium text-fg-muted hover:text-brand"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back to all projects
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default ProjectDetail;
