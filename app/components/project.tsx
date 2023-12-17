import parser from "html-react-parser";
import { useState } from "react";
import { ProjectData } from "~/types";

export function Project({
  project: { name, link, sourceUrl, slug, description, screenshot, logo, tech },
}: {
  project: ProjectData;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`portfolio__item portfolio__item--${slug} ${
        isOpen ? "" : "portfolio__item--active"
      }`}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="item__img-container">
        <img loading="lazy" src={logo} alt={name + " logo"} />
        <div className="img-container__additional-pics">
          <div className="additional-pics__container">
            <a rel="nofollow" target="_self">
              <img
                loading="lazy"
                src={screenshot}
                className="aditional-pics__sss"
                alt={name + " screenshot on phone, tablet, and desktop"}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="item__text-container">
        <h3>
          <span>{tech}</span>
          <a
            className="item__header-link"
            style={{ lineHeight: 0.9 }}
            href={link}
            target="_blank"
            rel="noopener"
          >
            {parser(name)}
          </a>
        </h3>
        <p>{parser(description)}</p>
        {!sourceUrl ? null : (
          <a
            className="item__header-code-link"
            href={sourceUrl}
            target="_blank"
            rel="noopener"
          >{`{{ See the code }}`}</a>
        )}
      </div>
    </div>
  );
}
