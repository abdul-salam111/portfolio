import Projects from "./Projects";
import { projectData } from "../../data/projectData";
import { useContent } from "../../services/useContent";
import { Aurora, Magnetic, Reveal, RevealGroup, RevealItem } from "../motion";

const GITHUB_URL = "https://github.com/abdul-salam111";

const portfolioBlobs = [
  { color: "var(--accent)", size: "34rem", top: "-6%", left: "68%", opacity: 0.14, delay: "-4s" },
  { color: "var(--violet)", size: "30rem", top: "70%", left: "-6%", opacity: 0.12, delay: "-11s" },
];

const Portfolio = () => {
  const projects = useContent("projects", projectData);

  return (
    <section id="portfolio" className="section relative overflow-hidden">
      <Aurora blobs={portfolioBlobs} grain={false} />
      <div className="grid-lines" />

      <div className="content relative z-10">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center">Selected Work</span>
          <h2 className="section-title mt-4">Portfolio</h2>
          <p className="section-lead mx-auto mt-5">
            Here&rsquo;s a selection of my recent work, showcasing my skills in
            creating user-centric and visually appealing interfaces.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
          stagger={0.08}
        >
          {projects.map((data, index) => (
            <RevealItem key={data?.id ?? index}>
              <Projects data={data} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.08} className="mt-12 flex justify-center md:mt-16">
          <Magnetic strength={0.2}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="View"
              className="glass-thin group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-fluid-sm font-medium text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              Shipped work only — side projects and source live on GitHub
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h13M12 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
};

export default Portfolio;
