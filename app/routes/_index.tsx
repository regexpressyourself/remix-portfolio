import { type LinksFunction, type MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import ProjectSection from "~/components/project-section";
import homeStylesUrl from "~/styles/pages/home/index.css";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeStylesUrl,
    },
  ];
};

export default function Index() {
  const contactSection = useRef<HTMLDivElement>(null);
  const [contactIsOpen, setContactIsOpen] = useState<boolean | null>(null);

  const closeContactForm = () => {
    setContactIsOpen(false);
    setTimeout(() => {
      setContactIsOpen(null);
    }, 600);
  };

  let contactClass = "";
  if (contactIsOpen === null) {
    contactClass = "";
  } else if (contactIsOpen === false) {
    contactClass = "unshown";
  } else if (contactIsOpen === true) {
    contactClass = "shown";
  }
  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContactForm();
        console.log("Escape key pressed!");
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, []);

  return (
    <main>
      <header>
        <div className="header__bg"></div>
        <h1>
          <span id="sam" className="delay">
            Sam
          </span>
          <span id="smessina-tag" className="delay">
            @smessina.com
          </span>
          <br />
          <span id="messina" className="delay">
            Messina
          </span>
        </h1>

        <h2 id="tagline" className="delay">{`{{ Software Engineer }}`}</h2>
      </header>

      <ProjectSection setContactIsOpen={setContactIsOpen} />
      <section
        ref={contactSection}
        className={`contact-section ${contactClass}`}
      >
        <div className="contact-form-bg" onClick={closeContactForm}></div>
        <div className="contact-header__bg bottom"></div>
        <div id="contact-form" className="contact-form">
          <span onClick={closeContactForm} className="x">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
          <h2 className="contact-header">
            Get In Touch.
            <br />
            <div className="contact-subhead">
              <p>
                If you like what you see here, I'd love to chat more about
                working together. <br />
                <br />
                Don't hesitate to check out:
              </p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.github.com/regexpressyourself"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-github"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <abbr title="github.com/regexpressyourself">
                      my <strong>GitHub</strong>
                    </abbr>
                  </a>
                  ,
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://www.linkedin.com/in/sammessina/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <abbr title="github.com/regexpressyourself">
                      my <strong>LinkedIn</strong>
                    </abbr>
                  </a>
                  , or
                </li>
                <li>
                  <a
                    href="mailto:sam@smessina.com"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <abbr title="sam@smessina.com">
                      <strong>email</strong> me directly
                    </abbr>
                  </a>
                  .
                </li>
              </ul>
            </div>
          </h2>
        </div>
      </section>
      <footer>
        <p>
          Copyright &copy;{" "}
          <span id="cr-date">{new Date().getFullYear() || "2023"}</span> Sam
          Messina
        </p>
      </footer>
    </main>
  );
}
