import type { Experiment } from "./types";

// Things I made because I thought they should exist.
// Add a new one by pushing another object. The Lab board lays them out automatically.

export const experiments: Experiment[] = [
  {
    id: "swift-cards",
    name: "Swift Cards",
    status: "shipped",
    because: "making flashcards is the worst part of studying",
    what: "Type a topic, get a personalized study deck.",
    details: [
      "AI-generated decks from a prompt (Llama 3.1 via Groq)",
      "Designed the whole flow: onboarding → generate → save → upgrade",
      "Auth, saved decks, and Stripe subscriptions for premium features",
    ],
    stack: ["Next.js", "TypeScript", "Clerk", "Firebase", "Stripe", "Groq"],
    color: "sticky",
  },
  {
    id: "elmo",
    name: "ELMO",
    status: "capstone",
    because: "following one news story shouldn't take twelve tabs",
    what: "Multi-source news with AI summaries that keep their sources attached.",
    details: [
      "Five-person senior capstone at UT Dallas",
      "I worked full-stack, focused on the product experience: design system, landing page, article reading, navigation",
      "Team system: multi-source retrieval + RAG, AI synthesis, sign-in and preferences on serverless AWS",
    ],
    stack: ["Next.js", "TypeScript", "AWS", "Pinecone", "DeepSeek"],
    caseStudy: "elmo",
    color: "white",
  },
  {
    id: "feelings",
    name: "Feelings Behind Words",
    status: "research",
    because: "memes are persuasive, and I wanted to know how",
    what: "A model that spots persuasion techniques in text + images.",
    details: [
      "Multimodal: BERT for text, ResNet-18 for images",
      "Classifies 22 persuasion techniques (SemEval 2021)",
      "89.2% accuracy",
    ],
    stack: ["Python", "PyTorch", "BERT", "ResNet-18"],
    metric: "89.2%",
    color: "blue",
  },
  {
    id: "ux-rebrand",
    name: "UX Club rebrand + site",
    status: "shipped",
    because: "designers and developers were building from different blueprints",
    what: "An org-wide rebrand, a new website, and a shared design system.",
    details: [
      "Got designers and developers aligned on one design system",
      "Gave the club a consistent digital identity across events and web",
    ],
    color: "paper",
  },
  {
    id: "design-a-thon",
    name: "Design-a-thon",
    status: "shipped",
    because: "designers deserved their own hackathon",
    what: "A 24-hour event built for designers first. 220 signups.",
    details: [],
    caseStudy: "design-a-thon",
    color: "sticky",
  },
  {
    id: "this-site",
    name: "This notebook",
    status: "in progress",
    because: "I wanted my portfolio to feel like a desk, not a document",
    what: "A portfolio with no scrolling. Every view is one canvas.",
    details: [
      "Next.js + TypeScript + Tailwind",
      "Content lives in plain data files, so adding a project is one object",
      "Hand-drawn SVG annotations, all built in code",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    color: "white",
  },
  {
    id: "your-idea",
    name: "Your problem here?",
    status: "open slot",
    because: "the best projects start with someone saying 'why doesn't this exist?'",
    what: "Got something that should exist? I'd like to hear about it.",
    details: [],
    color: "paper",
  },
];
