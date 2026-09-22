import type { ViewId } from "@/data/types";

export const sectionIds = ["overview", "problem", "thinking", "build", "outcome", "learnings"] as const;
export type SectionId = (typeof sectionIds)[number];

export interface Route {
  view: ViewId;
  /** case study slug (work view only) */
  study?: string;
  section?: SectionId;
}

const viewIds: ViewId[] = ["home", "work", "lab", "experience", "about"];

/** "#work/elmo/build" → { view: "work", study: "elmo", section: "build" } */
export function parseHash(hash: string): Route {
  const [view, study, section] = hash.replace(/^#\/?/, "").split("/");
  if (!viewIds.includes(view as ViewId)) return { view: "home" };
  if (view !== "work" || !study) return { view: view as ViewId };
  return {
    view: "work",
    study,
    section: sectionIds.includes(section as SectionId) ? (section as SectionId) : "overview",
  };
}

export function formatHash(r: Route): string {
  if (r.view === "work" && r.study) return `#work/${r.study}/${r.section ?? "overview"}`;
  return `#${r.view}`;
}
