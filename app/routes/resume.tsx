import {
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import parser from "html-react-parser";
import resumeData from "~/data/resume.json";
import resumeCss from "~/styles/pages/resume.css";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({ title: "Sam Messina Resume" });

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: resumeCss,
    },
  ];
};
export const loader: LoaderFunction = async () => {
  return {};
};

export default function Resume() {
  return (
    <>
      <header className="header">
        <h1>SAM MESSINA</h1>
        <div className="contact-header">
          Saint Louis, MO
          <br />
          <br />
          <a href="https:&#x2F;&#x2F;smessina.com" target="_blank">
            sam@smessina.com
          </a>
        </div>
      </header>

      <main className="main">
        <hr />
        <section id="education">
          <h2>EDUCATION</h2>
          <div className="heading-inline heading-inline--education">
            <h3>
              B.S. Computer Science
              <span style={{ fontWeight: 300 }}>
                {" "}
                | Southern Illinois University
              </span>
            </h3>
            <p className="date">Jan. 2014 - May 2018</p>
          </div>
        </section>

        <hr />

        <section id="work">
          <h2>WORK EXPERIENCE</h2>
          {resumeData.work.map((job) => {
            let endYear = 2020;
            let endMonth = "";
            const startDate = new Date(job.startDate); // 2009-11-10
            const startMonth = startDate.toLocaleString("default", {
              month: "long",
            });

            const startYear = startDate.getFullYear();

            if (job.endDate) {
              const endDate = new Date(job.endDate); // 2009-11-10
              endMonth = endDate.toLocaleString("default", { month: "long" });
              endYear = endDate.getFullYear();
            }
            return (
              <div key={job.company} className="job">
                <div className="heading-inline">
                  <h3>
                    {job.position} | {job.company}
                  </h3>
                  <p className="date">
                    {startMonth} {startYear} -{" "}
                    {job.endDate ? `${endMonth} ${endYear}` : "Present"}
                  </p>
                </div>
                <ul className="job-list">
                  {job.highlights.map((highlight) => {
                    return (
                      <li key={highlight} className="job-list__item">
                        {parser(highlight)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>
        <hr />
        <section id="publications" className="publications">
          <h2>PERSONAL PROJECTS</h2>
          <div className="publication-list">
            {resumeData.publications.map((publication) => {
              const publicationDate = new Date(publication.releaseDate); // 2009-11-10
              const publicationYear = publicationDate.getFullYear();
              return (
                <div key={publication.name} className="publication">
                  <div className="heading-inline heading-inline--publications">
                    <h3>
                      {publication.name}
                      <a
                        className="project-link"
                        href={`https://${publication.website}`}
                        target="_blank"
                      >
                        {publication.website}
                      </a>
                    </h3>
                    <p className="date">{publicationYear}</p>
                  </div>
                  <h4 className="publications-tech">
                    <span className="tech-list">
                      {"["}
                      {parser(publication.tech)}
                      {"]"}
                    </span>
                    <span>
                      {!publication.source ? null : (
                        <a href={publication.source} target="_blank">
                          [source code]
                        </a>
                      )}
                    </span>
                  </h4>
                  <p className="publications-summary">{publication.summary}</p>
                </div>
              );
            })}
          </div>
        </section>
        <hr className="publications-hr" />
        <section id="skills">
          <div className="skill-container">
            <div className="skill-section">
              <h3 className="skill">Languages</h3>
              <span className="keywords">
                {resumeData.skills[0].keywords.join(" ")}
              </span>
            </div>
            <div className="skill-section">
              <h3 className="skill">Libraries</h3>
              <span className="keywords">
                {resumeData.skills[1].keywords.join(" ")}
              </span>
            </div>
            <div className="skill-section">
              <h3 className="skill">Tools</h3>
              <span className="keywords">
                {resumeData.skills[2].keywords.join(" ")}
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
