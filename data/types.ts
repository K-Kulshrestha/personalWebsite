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

/**
 * A real image used as evidence (photo, screenshot, poster). Files live in /public/images.
 * Shown as a small taped print; clicking opens the full image in a lightbox.
 */
export interface Figure {
  /** Full-size image, used in the lightbox, e.g. "/images/elmo/explore-1145.webp". */
  src: string;
  /** Smaller version for the inline print. Falls back to `src`. */
  thumb?: string;
  /** Intrinsic size of `src`: reserves space so nothing shifts while loading. */
  width: number;
  height: number;
  alt: string;
  /** Short visible caption in the handwritten voice. */
  caption?: string;
  /** Crop the inline print to this aspect ratio (w/h), e.g. 3/4 for tall screenshots. */
  crop?: number;
  /** CSS object-position for that crop, e.g. "top". */
  position?: string;
}

/** An optional "rabbit hole" link to real work elsewhere. Opens in a new tab. */
export interface ExtLink {
  href: string;
  /** e.g. "GitHub", "Visit live site". The ↗ is added for you. */
  label: string;
}

/** Evidence placed inside a case-study state, with an optional small note above it. */
export interface Visuals {
  figures: Figure[];
  note?: string;
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
  /** Optional line above the decisions (defaults to "the calls I made…"). Use it for team projects. */
  thinkingNote?: string;
  thinking: Decision[];
  build: {
    /** On team projects these are *my* contributions (labelled "My work" when `team` is set). */
    steps: Step[];
    /** Team projects: what the wider team built, shown separately so ownership stays clear. */
    team?: Step[];
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
  /** Real images, placed where they support the story (not a gallery). */
  visuals?: Partial<Record<"overview" | "build" | "outcome", Visuals>>;
  link?: { href: string; label: string };
}

export type ExperimentStatus = "shipped" | "capstone" | "prototype" | "research" | "in progress" | "open slot";

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
  /** Optional image shown in the detail drawer. */
  figure?: Figure;
  links?: ExtLink[];
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
  links?: ExtLink[];
}
