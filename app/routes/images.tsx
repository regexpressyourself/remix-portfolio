import { type LinksFunction, type MetaFunction } from "@remix-run/node";
import baseStylesUrl from "~/styles/base/index.css";

import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: baseStylesUrl,
    },
  ];
};

export default function Index() {
  return (
    <main>
      <img src="/images/headshot.jpg"></img>
      <img src="/images/sm.png"></img>
    </main>
  );
}
