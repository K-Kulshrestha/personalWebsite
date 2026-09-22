import type { ViewId } from "./types";

export const profile = {
  name: "Kshitij Kulshrestha",
  firstName: "Kshitij",
  roles: ["Engineer", "Designer", "Product", "Builder"],
  /** One line on the home canvas. Keep it short, it sits beside the art. */
  tagline: "I turn fuzzy ideas into real products, and I own them from idea → shipped → impact.",
  intro:
    "I like taking fuzzy ideas and turning them into real things people use: talking to the people involved, sketching the solution, building it, and sticking around until it works.",
  short: "Product-minded builder. CS @ UT Dallas. MS CS @ Georgia Tech from 2027.",
  currently: "Looking for a team where I can own something from idea → shipped.",
  email: "kshitijkuls6@gmail.com",
  links: [
    { label: "Resume", href: "/resume.pdf" },
    { label: "LinkedIn", href: "https://linkedin.com/in/kshitijkulshrestha" },
    { label: "GitHub", href: "https://github.com/K-Kulshrestha" },
  ],

  /**
   * Hero artwork: /public/hero.svg, the supplied SVG copied byte for byte.
   * It's rendered as an image, so its own CSS animations (the hat cycle,
   * glancing eyes, blinking) run unchanged and its ids/styles can't leak into the page.
   * The SVG's text was removed, so the name and pillars are laid over its empty
   * top-left and bottom-left areas as HTML. `nameBox`/`pillarBox` are those
   * areas in SVG units (viewBox 0 0 1536 1024).
   */
  hero: {
    src: "/hero.svg",
    alt: "Hand-drawn illustration of Kshitij, relaxed, while his hat cycles between engineer, designer, product and builder.",
    width: 1536,
    height: 1024,
    nameBox: { x: 56, y: 52, w: 440, h: 330 },
    pillarBox: { x: 56, y: 722, w: 222, h: 270 },
  },

  /** The four words on the home canvas. Each one doubles as a door into a view. */
  pillars: [
    { word: "Ideas", note: "notice what's broken", view: "lab" },
    { word: "Products", note: "make it real", view: "work" },
    { word: "People", note: "build with them, for them", view: "about" },
    { word: "Impact", note: "check it actually helped", view: "experience" },
  ] satisfies { word: string; note: string; view: ViewId }[],
};

export const views: { id: ViewId; label: string; hint: string }[] = [
  { id: "home", label: "Home", hint: "the cover" },
  { id: "work", label: "Work", hint: "case studies" },
  { id: "lab", label: "Lab", hint: "things I made" },
  { id: "experience", label: "Experience", hint: "where I've been" },
  { id: "about", label: "About", hint: "hi" },
];
