import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { projectData } from "../data/projectData";
import { useContent } from "../services/useContent";
import { Aurora, Reveal, RevealGroup, RevealItem, TiltCard } from "../components/motion";

// The hero is an always-dark band, same treatment as the project detail
// page — raw tokens are pinned to their dark values so `.chip`/`.grid-lines`
// stay readable even when the site is in its light theme.
const darkBand = {
  "--border-hairline": "rgb(255 255 255 / 0.13)",
  "--border-strong": "rgb(255 255 255 / 0.24)",
  "--surface-veil": "rgb(255 255 255 / 0.08)",
  "--text-muted": "rgb(255 255 255 / 0.74)",
};

const ProjectTile = ({ project, index }) => {
  const categories = project.category?.split(" · ") ?? [];

  return (
    <RevealItem className="h-full">
      <Link to={`/project/${project.id}`} data-cursor="View" className="group block h-full">
        <TiltCard max={5} className="panel panel-sheen spotlight flex h-full flex-col overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out-quint group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="chip glass-thin absolute right-3 top-3 font-mono text-[0.65rem] tracking-[0.2em] uppercase"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {categories.slice(0, 2).map((cat) => (
                  <span key={cat} className="chip text-[0.65rem]">{cat}</span>
                ))}
              </div>
            )}

            <h3 className="mt-4 text-fluid-xl font-semibold text-fg">{project.title}</h3>

            {project.tagline && (
              <p className="mt-2 flex-1 text-fluid-sm leading-relaxed text-fg-muted">
                {project.tagline}
              </p>
            )}

            <span className="mt-5 inline-flex items-center gap-2 text-fluid-sm font-medium text-brand">
              View case study
              <svg
                viewBox="0 0 16 16"
                width="13"
                height="13"
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
            </span>
          </div>
        </TiltCard>
      </Link>
    </RevealItem>
  );
};

const AllProjects = () => {
  const [projects] = useContent("projects", projectData);

  return (
    <div className="bg-bg">
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 sm:pt-36" style={darkBand}>
        <Aurora />
        <div className="grid-lines" aria-hidden="true" />

        <div className="content relative z-10">
          <Reveal direction="none" duration={0.6}>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-fluid-sm font-medium text-white/70 hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back to home
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow mt-10 block">Portfolio</span>
            <h1 className="mt-5 max-w-3xl text-fluid-4xl text-white">All projects</h1>
            <p className="mt-6 max-w-2xl text-fluid-lg leading-relaxed text-white/70">
              Every shipped app and platform I&rsquo;ve built, in one place —
              {" "}{projects.length} project{projects.length === 1 ? "" : "s"} across mobile,
              web and backend.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="content">
          <RevealGroup stagger={0.07} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectTile key={project.id ?? i} project={project} index={i} />
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
