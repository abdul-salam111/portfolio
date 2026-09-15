import Projects from "./Projects";
import { projectData } from "../../data/projectData";
import { useContent } from "../../services/useContent";
import { Reveal, RevealGroup, RevealItem } from "../motion";

const GITHUB_URL = "https://github.com/abdul-salam111";

/**
 * Asymmetric bento on xl: a six-column track where the lead project takes four
 * and everything after it takes two, so row one reads 4 + 2 and every later row
 * falls into 2 + 2 + 2 — whatever number of projects the admin publishes.
 */
const spanFor = (index) => (index === 0 ? "xl:col-span-4" : "xl:col-span-2");

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
            <RevealItem key={data?.id ?? index} className={spanFor(index)}>
              <Projects data={data} featured={index === 0} />
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
