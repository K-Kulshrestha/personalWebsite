// Shared content types. Everything the site renders comes from /data —
// edit those files to change copy, add case studies, or add experiments.

export type ViewId = "home" | "work" | "lab" | "experience" | "about";

export interface Metric {
  value: string;
  label: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Decision {
  /** What I chose. */
  choice: string;
  /** What I chose it over (optional, rendered crossed-out). */
  over?: string;
  why: string;
}

/** Optional image/screenshot slot. Put files in /public and reference them as "/file.png". */
export interface Figure {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudy {
  slug: string;
  /** Short label used on the Work board, e.g. "Design-a-thon". */
  label: string;
  title: string;
  org: string;
  role: string;
  when: string;
  /** One or two sentences: the hook. */
  hook: string;
  /** Margin note scribbled next to the project on the Work board. */
  scribble: string;
  metrics: Metric[];
  tags: string[];
  overview: {
    context: string;
    ownership: string;
    team: string;
  };
  problem: {
    statement: string;
    /** The question I was really trying to answer. */
    question: string;
    needs: string[];
    constraints: string[];
  };
  thinking: Decision[];
  build: {
    steps: Step[];
    stack?: string[];
  };
  outcome: {
    summary: string;
    results: string[];
    alsoShipped?: string;
  };
  learnings: {
    lessons: string[];
    differently: string;
  };
  figures?: Figure[];
  link?: { href: string; label: string };
}

export type ExperimentStatus = "shipped" | "prototype" | "research" | "in progress" | "open slot";

export interface Experiment {
  id: string;
  name: string;
  status: ExperimentStatus;
  /** "because…" — why it should exist. */
  because: string;
  what: string;
  details: string[];
  stack?: string[];
  metric?: string;
  /** Links to a case study slug instead of opening the detail drawer. */
  caseStudy?: string;
  link?: { href: string; label: string };
  color: "paper" | "sticky" | "blue" | "white";
}

export interface Role {
  id: string;
  org: string;
  /** Short label for the timeline. */
  short: string;
  role: string;
  when: string;
  /** Used to place the node on the timeline, e.g. 2024.5 */
  start: number;
  end: number;
  where?: string;
  kind: "work" | "leadership" | "teaching" | "education";
  headline: string;
  owned: string[];
  changed: string[];
  shipped: string[];
  learned: string;
  people: string;
  caseStudy?: string;
}
