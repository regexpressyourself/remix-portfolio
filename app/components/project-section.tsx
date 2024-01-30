import { Project } from "~/components/project";
import projectsJson from "~/data/projects.json";

export default function ProjectSection({
  setContactIsOpen,
}: {
  setContactIsOpen: (arg: boolean) => void;
}) {
  const { projects } = projectsJson;
  const projectElements =
    !projects || !projects.map
      ? null
      : projects.map((project) => (
          <Project key={project.slug} project={project} />
        ));

  return (
    <section id="projects" className="portfolio-section">
      <div id="project-header">
        <div className="project-header__bg"></div>
        <div className="project-header-text">
          <h2 className="project-header-h2">Personal Projects:</h2>
          <div className="project-header-adtl-links">
            <h3>Or check out:</h3>
            <ul className="portfolio-links">
              <li>
                <div
                  className="clickable"
                  onClick={() => {
                    setContactIsOpen(true);
                  }}
                >
                  My contact info
                </div>
              </li>
              <li>
                <a
                  href="https://smessina.lol/now"
                  target="_blank"
                  rel="noopener"
                >
                  What I'm up to now
                </a>
              </li>
              <li>
                My&nbsp;
                <a href="/resume" target="_blank" rel="noopener">
                  resume
                </a>
                &nbsp;
                <a href="/resume" target="_blank" rel="noopener">
                  (HTML
                </a>
                &nbsp;or&nbsp;
                <a
                  href="/resume.pdf"
                  download="SamMessinaResume.pdf"
                  target="_blank"
                  rel="noopener"
                >
                  PDF
                </a>
                )
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="portfolio-section__portfolio">{projectElements}</div>
    </section>
  );
}
