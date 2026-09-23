import type { Figure } from "./types";

export const about = {
  /** The one real-world photo on About. Keep the room in frame; the audience is the point. */
  photo: {
    src: "/images/about/design-a-thon-kickoff-1600.webp",
    thumb: "/images/about/design-a-thon-kickoff-800.webp",
    width: 1600,
    height: 1060,
    alt: "Kshitij speaking into a microphone at the front of a lecture hall full of students at Design-a-thon '24, with the event's Discord QR code on three screens.",
    caption: "Design-a-thon '24: kicking off the 24-hour design competition I helped bring to life with UX Club.",
  } satisfies Figure,
  hello: "Hi, I'm Kshitij.",
  paragraphs: [
    "I studied computer science, but my favorite part has always been the work before and after the code: figuring out what's actually wrong, and checking whether what we built fixed it.",
    "I've run a 22-person student org, called alumni asking for donations, taught kids Scratch, and shipped enterprise software. Different hats, same person. It's always the same loop: notice something, talk to people, build, learn, repeat.",
  ],
  // Rendered as a notebook list. `crossed` shows the old idea struck through, with the rewrite after it.
  beliefs: [
    { crossed: "Build it and they will come.", text: "Talk to them, then build it." },
    { text: "Own the outcome, not just the ticket." },
    { crossed: "Wait until it's perfect.", text: "Ship small, learn fast." },
    { text: "Good design is mostly good listening." },
  ],
  notes: [
    { label: "Currently", text: "Looking for my next thing to own: product-minded engineering, APM, or an early team." },
    { label: "Next", text: "MS CS at Georgia Tech, starting Jan 2027." },
    { label: "Ask me about", text: "Running a 24-hour event on no sleep." },
  ],
};
