import {
  redirect,
  type LoaderFunction,
  type MetaFunction,
} from "@remix-run/node";
import { makeMeta } from "~/utils/merge-meta";

export const meta: MetaFunction = makeMeta({ title: "Not found" });

export const loader: LoaderFunction = async () => {
  return await redirect("/");
};
