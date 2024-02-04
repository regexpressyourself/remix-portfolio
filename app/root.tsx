import {
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { posthog } from "posthog-js";
import manifest from "~/data/manifest.json";
import { HTML_HEAD } from "~/utils/constants/html";

export const meta: MetaFunction = () => [
  ...HTML_HEAD,
  { title: manifest.title },
  { name: "description", content: manifest.description },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: manifest.faviconSrc,
      type: "image/png",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const runAnalytics = process.env.NODE_ENV === "production";
  return { runAnalytics, postHogId: process.env.POSTHOG_ID };
};

export default function App() {
  const { runAnalytics, postHogId } = useLoaderData<any>();
  const theme = "default";

  if (runAnalytics) {
    posthog?.init(postHogId || "", {
      api_host: "https://us.posthog.com",
    });
  }

  return (
    <html lang="en" className={`${theme}-theme`}>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <link rel="icon" href="/images/sm_fav_small.png" sizes="32x32" />
        <link rel="icon" href="/images/sm_fav_small.png" sizes="192x192" />

        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>Sorry about that. Try refreshing the page to fix the issue.</p>
        <Scripts />
      </body>
    </html>
  );
}
