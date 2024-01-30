import type { MetaDescriptor, MetaFunction } from "@remix-run/node";
import manifest from "~/data/manifest.json";
import { HTML_HEAD } from "~/utils/constants/html";

export const mergeMeta = (
  overrideFn: MetaFunction,
  appendFn?: MetaFunction
): MetaFunction => {
  return (arg) => {
    let mergedMeta = arg.matches.reduce((acc, match) => {
      return acc.concat(match.meta || []);
    }, [] as MetaDescriptor[]);

    let overrides = overrideFn(arg);
    for (let override of overrides) {
      let index = mergedMeta.findIndex(
        (meta) =>
          ("name" in meta &&
            "name" in override &&
            meta.name === override.name) ||
          ("property" in meta &&
            "property" in override &&
            meta.property === override.property) ||
          ("title" in meta && "title" in override)
      );
      if (index !== -1) {
        mergedMeta.splice(index, 1, override);
      }
    }

    if (appendFn) {
      mergedMeta = mergedMeta.concat(appendFn(arg));
    }

    return mergedMeta;
  };
};

export const makeMeta = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  let nextTitle = title ? title : manifest.title;
  let nextDescription = description ? description : manifest.description;

  const nextMeta = mergeMeta(() => {
    return [
      ...HTML_HEAD,
      { title: nextTitle },
      { name: "description", content: nextDescription },
    ];
  });
  return nextMeta;
};
