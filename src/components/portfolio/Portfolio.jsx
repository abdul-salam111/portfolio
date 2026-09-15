import Projects from "./Projects";
import { projectData } from "../../data/projectData";
import { useContent } from "../../services/useContent";
import { Reveal, RevealGroup, RevealItem } from "../motion";

const GITHUB_URL = "https://github.com/abdul-salam111";

/**
 * Asymmetric bento on a six-column track, sized to how many projects are
 * actually published. A fixed 4 + 2 lead row only reads as deliberate once
 * there are enough cards to fill the rows beneath it; with two published
 * projects it just leaves the second one starved, so small counts split the
 * track evenly instead.
 */
const spanFor = (index, total) => {
  if (total === 1) return "xl:col-span-6";
  if (total === 2 || total === 4) return "xl:col-span-3";
  if (total === 3) return "xl:col-span-2";
  return index === 0 ? "xl:col-span-4" : "xl:col-span-2";
};

/** The wide lead treatment only applies when the layout gives it four columns. */
const isFeatured = (index, total) => total >= 5 && index === 0;

const Portfolio = () => {
  const projects = useContent("projects", projectData);

  return (
    <section id="portfolio" className="section relative">
      <div className="content">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center">Selected Work</span>
          <h2 className="section-title mt-4">Portfolio</h2>
          <p className="section-lead mx-auto mt-5">
            Here&rsquo;s a selection of my recent work, showcasing my skills in
            creating user-centric and visually appealing interfaces.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-6"
          stagger={0.08}
        >
          {projects.map((data, index) => (
            <RevealItem
              key={data?.id ?? index}
              className={spanFor(index, projects.length)}
            >
              <Projects
                data={data}
                featured={isFeatured(index, projects.length)}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal
          delay={0.08}
          className="mt-10 text-center text-fluid-sm text-fg-faint md:mt-12"
        >
          <p>
            Shipped work only — side projects and source live on{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block py-1 text-brand underline decoration-brand/30 underline-offset-4 transition-colors duration-200 hover:decoration-brand"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Portfolio;
