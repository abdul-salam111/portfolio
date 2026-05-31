import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { projectData as staticProjectData } from "../data/projectData";
import { projectsPromise } from "../services/prefetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import ScrollReveal from "../components/common/ScrollReveal";

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const isRealLink = (link) => link && link !== "#!";

const ProjectDetail = () => {
  const { id } = useParams();
  const [allProjects, setAllProjects] = useState(staticProjectData);

  useEffect(() => {
    projectsPromise.then((data) => {
      if (data.length > 0) setAllProjects(data);
    });
  }, []);

  const project = allProjects.find((p) => String(p.id) === String(id));
  const techRef = useRef(null);
  const techInView = useInView(techRef, { once: true, margin: "-50px 0px" });

  if (!project) return <Navigate to="/" replace />;

  const hasScreenshot0 = !!project.screenshots?.[0];
  const hasScreenshot1 = !!project.screenshots?.[1];

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#01579b] via-[#0080ff] to-[#54c5f8] pt-10 pb-32 px-4">
        <div className="content">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-10 group text-sm font-medium">
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Portfolio
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap gap-2 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
            {project.category.split(" · ").map((cat) => (
              <span key={cat} className="text-xs bg-white/15 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">{cat}</span>
            ))}
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="text-blue-100 text-lg sm:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
          >
            {project.tagline}
          </motion.p>
        </div>
      </div>

      {/* ── Main image floating over hero ── */}
      <div className="content px-4 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,128,255,0.28)] border border-white/80"
        >
          <img src={project.image} alt={project.title} className="w-full object-cover" />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT — banner + alternating sections
      ══════════════════════════════════════════ */}
      {(project.description || project.fullDescription) && (
        <div>

          {/* ── About banner ── */}
          <div className="mt-16 bg-[#f0f8ff] border-y border-[#0080ff]/10">
            <div className="content px-4 py-14 sm:py-20">
              <ScrollReveal>
                <span className="inline-block text-xs font-bold text-[#0080ff] tracking-widest uppercase bg-white px-3 py-1 rounded-full mb-5 border border-[#0080ff]/15">
                  About the Project
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#132238] leading-tight mb-5">
                  {project.title}
                </h2>
                <div className="w-12 h-1 bg-[#0080ff] rounded-full mb-6" />
                {(project.about || project.tagline) && (
                  <p className="text-[#4a5568] text-base sm:text-xl leading-relaxed max-w-3xl">
                    {project.about || project.tagline}
                  </p>
                )}
              </ScrollReveal>
            </div>
          </div>

          {/* ── The Problem — text LEFT, image RIGHT ── */}
          {project.description && (
            <section className="py-20 bg-white">
              <div className="content px-4">
                <div className={`grid items-center gap-12 lg:gap-16 ${hasScreenshot0 ? "lg:grid-cols-2" : ""}`}>

                  {/* Text */}
                  <ScrollReveal>
                    <span className="inline-block text-xs font-bold text-[#0080ff] tracking-widest uppercase bg-[#e8f4fd] px-3 py-1 rounded-full mb-5">
                      The Problem
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#132238] mb-5 leading-tight">
                      The Challenge
                    </h3>
                    <div className="w-10 h-1 bg-[#0080ff] rounded-full mb-6" />
                    <p className="text-[#4a5568] text-base sm:text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </ScrollReveal>

                  {/* Image (right) */}
                  {hasScreenshot0 && (
                    <ScrollReveal delay={0.18}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 250, damping: 20 }}
                        className="rounded-2xl overflow-hidden shadow-[0_20px_56px_rgba(0,128,255,0.16)] border border-gray-100"
                      >
                        <img src={project.screenshots[0]} alt="Challenge illustration" className="w-full object-cover" />
                      </motion.div>
                    </ScrollReveal>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ── The Solution — image LEFT, text RIGHT ── */}
          {project.fullDescription && (
            <section className="py-20 bg-[#f0f8ff]">
              <div className="content px-4">
                <div className={`grid items-center gap-12 lg:gap-16 ${hasScreenshot1 ? "lg:grid-cols-2" : ""}`}>

                  {/* Image (left) */}
                  {hasScreenshot1 && (
                    <ScrollReveal delay={0.18}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 250, damping: 20 }}
                        className="rounded-2xl overflow-hidden shadow-[0_20px_56px_rgba(0,128,255,0.16)] border border-gray-100"
                      >
                        <img src={project.screenshots[1]} alt="Solution illustration" className="w-full object-cover" />
                      </motion.div>
                    </ScrollReveal>
                  )}

                  {/* Text (right) */}
                  <ScrollReveal>
                    <span className="inline-block text-xs font-bold text-[#0080ff] tracking-widest uppercase bg-white px-3 py-1 rounded-full mb-5">
                      The Solution
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#132238] mb-5 leading-tight">
                      How I solved it
                    </h3>
                    <div className="w-10 h-1 bg-[#0080ff] rounded-full mb-6" />
                    <p className="text-[#4a5568] text-base sm:text-lg leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </ScrollReveal>

                </div>
              </div>
            </section>
          )}

        </div>
      )}

      {/* ── Key Features ── */}
      {project.features?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="content px-4">
            <ScrollReveal>
              <span className="inline-block text-xs font-bold text-[#0080ff] tracking-widest uppercase bg-[#e8f4fd] px-3 py-1 rounded-full mb-4">
                Key Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#132238] mb-10">What I built</h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(0,128,255,0.12)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative p-6 rounded-2xl border border-gray-100 bg-white overflow-hidden"
                  >
                    <span className="absolute -top-1 right-4 text-6xl font-black text-[#0080ff]/6 select-none leading-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0080ff] mb-4" />
                    <p className="text-[#132238] font-semibold text-sm sm:text-[15px] leading-snug">
                      {feature}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Tech Stack ── */}
      {project.techStack?.length > 0 && (
        <section className="py-16 bg-[#f0f8ff]">
          <div className="content px-4" ref={techRef}>
            <ScrollReveal>
              <span className="inline-block text-xs font-bold text-[#0080ff] tracking-widest uppercase bg-white px-3 py-1 rounded-full mb-4">
                Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#132238] mb-8">Built with</h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  custom={i}
                  variants={chipVariants}
                  initial="hidden"
                  animate={techInView ? "visible" : "hidden"}
                  className="bg-white border border-[#0080ff]/25 text-[#0080ff] font-medium px-5 py-2.5 rounded-full text-sm shadow-sm hover:bg-[#0080ff] hover:text-white hover:shadow-md transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-[#01579b] to-[#0080ff] py-20 px-4">
        <div className="content text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Try the App</h2>
            <p className="text-blue-100 text-base sm:text-lg mb-10">Available on Android and iOS platforms.</p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {isRealLink(project.playStoreLink) ? (
                <motion.a href={project.playStoreLink} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white text-[#0080ff] font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FontAwesomeIcon icon={faGooglePlay} className="text-xl" />
                  Google Play
                </motion.a>
              ) : (
                <div className="flex items-center gap-3 bg-white/15 text-white/60 font-semibold px-7 py-4 rounded-xl border border-white/20 cursor-not-allowed">
                  <FontAwesomeIcon icon={faGooglePlay} className="text-xl" />
                  Coming to Play Store
                </div>
              )}

              {isRealLink(project.appStoreLink) ? (
                <motion.a href={project.appStoreLink} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white text-[#0080ff] font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FontAwesomeIcon icon={faApple} className="text-xl" />
                  App Store
                </motion.a>
              ) : (
                <div className="flex items-center gap-3 bg-white/15 text-white/60 font-semibold px-7 py-4 rounded-xl border border-white/20 cursor-not-allowed">
                  <FontAwesomeIcon icon={faApple} className="text-xl" />
                  Coming to App Store
                </div>
              )}
            </div>

            <Link to="/" className="text-blue-200 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group text-sm font-medium">
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to all projects
            </Link>
          </ScrollReveal>
        </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
