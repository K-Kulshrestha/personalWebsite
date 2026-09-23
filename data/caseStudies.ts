import type { CaseStudy } from "./types";

// Facts and numbers come from the resume. The framing, decisions and reflections
// are a first draft of the story: edit them so they sound like you.
// Keep each section short. The reader shows one section at a time, and it
// should fit in a viewport without scrolling.

export const caseStudies: CaseStudy[] = [
  {
    slug: "design-a-thon",
    label: "Design-a-thon",
    title: "A 24-hour design-a-thon, started from a blank doc",
    org: "UX Club @ UT Dallas",
    role: "Founder & lead",
    when: "2024",
    hook: "Students kept telling us they wanted to design, but there was nowhere to practice start-to-finish under a real deadline. So I built the place.",
    scribble: "my favorite one →",
    metrics: [
      { value: "220", label: "signups" },
      { value: "24h", label: "problem → prototype" },
      { value: "3", label: "headline sponsors (JPMC, Palantir, CBRE)" },
    ],
    tags: ["0 → 1", "events as products", "sponsorships", "team of 22"],
    visuals: {
      build: {
        figures: [
          {
            src: "/images/design-a-thon/sticky-notes-1600.webp",
            thumb: "/images/design-a-thon/sticky-notes-800.webp",
            width: 1600,
            height: 1066,
            alt: "Close-up of a participant writing ideas on pink sticky notes spread across a white table.",
            caption: "Ideas going up on sticky notes during Design-a-thon '24.",
          },
        ],
      },
      outcome: {
        figures: [
          {
            src: "/images/design-a-thon/team-1200.webp",
            thumb: "/images/design-a-thon/team-600.webp",
            width: 1200,
            height: 1800,
            crop: 4 / 5,
            position: "center 62%",
            alt: "Group photo at the Design-a-thon closing ceremony: the UX Club team holding a 'UXperience: The First Draft' sign and a phone mascot cutout, under 'UX UTD Designathon' balloons.",
            caption: "The team at the closing ceremony · theme: “The First Draft.”",
          },
        ],
      },
    },
    overview: {
      context:
        "UX Club served 1,000+ members and worked with 50+ sponsors and partners. Its events were mostly talks and workshops. Hackathons existed, but they were built for engineers.",
      ownership:
        "Everything, end to end: the concept, sponsor pitches, programming, marketing, the participant experience, and the day-of chaos.",
      team: "A 22-officer team across design, engineering, marketing and operations.",
    },
    problem: {
      statement:
        "Workshops teach steps. Hackathons teach shipping, but they're built around code. Designers didn't have an equivalent where they could take a messy problem all the way to a prototype.",
      question: "What would a hackathon look like if it were built for designers first?",
      needs: [
        "Participants: a real problem, a deadline, and feedback from people in the industry",
        "Sponsors: a reason to show up beyond putting their logo on a banner",
        "Club: an event people would remember and come back for",
      ],
      constraints: ["Student budget", "Volunteer team", "No playbook. It had never been run before."],
    },
    thinking: [
      {
        choice: "24 hours",
        over: "a full weekend",
        why: "Short enough that students could actually commit, long enough to get from problem to prototype.",
      },
      {
        choice: "Prompts framed around users",
        over: "prompts framed around technology",
        why: "Non-coders should never feel like the second team. The brief started with a person, not a stack.",
      },
      {
        choice: "Sell sponsors on access to talent",
        over: "logo placement",
        why: "It made the pitch about what sponsors got out of it, and that's how JPMC, Palantir and CBRE came on board.",
      },
      {
        choice: "Treat it like a product launch",
        why: "Who is it for, what do they walk away with, what can't break. I wrote that doc before anything else.",
      },
    ],
    build: {
      steps: [
        { title: "Spec", body: "Wrote the event as a one-pager: audience, promise, the moments that matter, the risks." },
        { title: "Fund", body: "Pitched sponsors and partner orgs, and matched each one to something participants actually needed." },
        { title: "Staff", body: "Split the 22 officers into owners for programming, ops, marketing and participant experience." },
        { title: "Run", body: "24 hours of kickoff, mentoring, check-ins and judging. Plus pizza logistics, which are a real problem." },
        { title: "Listen", body: "Collected attendee feedback and fed it into the next round of events." },
      ],
    },
    outcome: {
      summary: "It went from an idea in a doc to a flagship event with 220 signups and big-name sponsors.",
      results: [
        "220 signups for the club's first 24-hour Design-a-thon",
        "Sponsorships from JPMC, Palantir and CBRE",
        "Part of a 12-event year that, with 5+ partner orgs, reached ~6,000 students",
      ],
    },
    learnings: {
      lessons: [
        "An event is a product: onboarding, an 'aha' moment, and retention (did they come back?).",
        "The pitch that lands is always about the other person's problem.",
      ],
      differently:
        "Lock sponsors and judging criteria earlier. Most of the late-night stress came from decisions I'd put off.",
    },
  },
  {
    slug: "reporting",
    label: "The report nobody trusted",
    title: "Following a support ticket all the way down",
    org: "Paycom",
    role: "Software Developer",
    when: "2025",
    hook: "The same reporting issues kept coming back as support tickets. Instead of patching one more symptom, I traced the data through every layer until the pattern made sense.",
    scribble: "support tickets = free user research",
    metrics: [
      { value: "~25%", label: "fewer reporting-related support tickets" },
      { value: "50+", label: "features & fixes shipped" },
      { value: "$50M+", label: "client value on the products I worked on" },
    ],
    tags: ["root cause", "enterprise", "cross-functional", "full stack"],
    overview: {
      context:
        "Enterprise background-check and tax-credit products, used by clients who rely on their reports being right.",
      ownership:
        "Investigating the recurring issues, finding the root cause, and shipping the fix across UI, APIs, backend services and data.",
      team: "Product, QA, DBAs and fellow engineers.",
    },
    problem: {
      statement:
        "Each reporting ticket looked like a one-off, so each one got a one-off fix. The underlying cause survived every patch and the tickets kept coming.",
      question: "What do these tickets have in common, and where does the data go wrong?",
      needs: [
        "Clients: reports they can trust without calling support",
        "Support: fewer repeat tickets for the same issue",
        "Engineering: a fix that doesn't break anything else reading that data",
      ],
      constraints: ["Production enterprise data", "Logic spread across PHP, SQL, REST APIs and React", "No appetite for risky rewrites"],
    },
    thinking: [
      {
        choice: "Fix it at the source",
        over: "patch the screen",
        why: "A frontend patch would ship faster, but every other place using that data would still be wrong.",
      },
      {
        choice: "Bring in DBAs and QA early",
        why: "Changing SQL behind production reports is scary. Reviewing it early made the change safe and easy to follow.",
      },
      {
        choice: "Refactor, not rewrite",
        why: "Small, verifiable changes we could ship and roll back beat a big-bang rewrite that nobody could review.",
      },
    ],
    build: {
      steps: [
        { title: "Cluster", body: "Grouped the recurring tickets to find the common thread." },
        { title: "Trace", body: "Followed a report from the React component through the REST API and PHP service to the SQL query." },
        { title: "Refactor", body: "Reworked the backend-generated reporting where the logic actually lived." },
        { title: "Verify", body: "Ran automated suites, manual regression, and Docker-based environments before the GitLab pipelines." },
      ],
      stack: ["PHP", "MySQL", "REST APIs", "React", "Docker", "GitLab CI"],
    },
    outcome: {
      summary: "Reporting-related support tickets dropped by an estimated 25%.",
      results: [
        "~25% fewer reporting-related support tickets",
        "Part of 50+ features, fixes and improvements shipped",
        "UI components modernized and checked across desktop and mobile",
      ],
      alsoShipped:
        "Access-control logic that shut off services for former clients but kept their historical records read-only. That cut operational costs without deleting anyone's history.",
    },
    learnings: {
      lessons: [
        "Support tickets are the most honest user research a company has.",
        "Understanding the whole stack matters most when you're debugging, not when you're building.",
      ],
      differently:
        "Measure report accuracy directly, instead of inferring it from ticket volume after the fact.",
    },
  },
  {
    slug: "tunetunnel",
    label: "Admin, but faster",
    title: "Replacing manual admin work at a music startup",
    org: "TuneTunnel",
    role: "Product & engineering intern",
    when: "Summer 2024",
    hook: "A small music-distribution startup, a CTO with too many tabs open, and internal workflows held together by manual steps. I scoped and built the dashboard that replaced them.",
    scribble: "scoped with the CTO",
    metrics: [
      { value: "~20%", label: "more efficient admin workflows" },
      { value: "30%", label: "platform performance improvement" },
      { value: "5", label: "APIs integrated" },
    ],
    tags: ["internal tools", "scoping", "startup", "shipping"],
    overview: {
      context:
        "TuneTunnel is a music-distribution platform with a small team. Admin work ate time that should have gone to the product.",
      ownership:
        "Design and development of an internal React dashboard: requirements, priorities, API integrations, testing and deployment.",
      team: "Worked directly with the CTO in month-long sprints.",
    },
    problem: {
      statement:
        "Everyday admin tasks were spread across tools and manual steps. That was slow for the team and got harder as the platform grew.",
      question: "What's the smallest tool that takes the most repetitive work off the team?",
      needs: ["One place for the most common admin tasks", "Reliable data from existing services", "Something new pages could be added to easily"],
      constraints: ["One summer", "Tiny team", "Existing APIs we couldn't redesign"],
    },
    thinking: [
      {
        choice: "Scope hard with the CTO",
        over: "build every screen people asked for",
        why: "We ranked tasks by frequency × pain and built from the top of that list.",
      },
      {
        choice: "Reusable components",
        over: "one-off pages",
        why: "Internal tools keep growing sideways. A small kit made each new admin page cheap to add.",
      },
      {
        choice: "Material UI",
        over: "a custom look",
        why: "It's an internal tool. Consistency and speed mattered more than a bespoke style.",
      },
    ],
    build: {
      steps: [
        { title: "Scope", body: "Listed the admin workflows with the CTO and prioritized them." },
        { title: "Build", body: "Built a React + Material UI dashboard from reusable components." },
        { title: "Integrate", body: "Wired up 5 REST APIs and validated request behavior and JSON in Postman." },
        { title: "Ship", body: "Deployed and configured the services on AWS EC2, with work tracked in GitHub." },
      ],
      stack: ["React", "Material UI", "REST APIs", "Postman", "AWS EC2"],
    },
    outcome: {
      summary: "Admin workflows got about 20% more efficient, and the platform got faster.",
      results: [
        "~20% improvement in team workflow efficiency",
        "30% platform performance improvement through targeted optimizations",
        "5 APIs integrated into one internal tool",
      ],
    },
    learnings: {
      lessons: [
        "At a startup, 'what should we not build' is the most useful question.",
        "Internal users are still users.",
      ],
      differently:
        "Sit with the admins earlier. I scoped mostly through the CTO, and the people actually doing the clicks would have caught edge cases sooner.",
    },
  },
  {
    slug: "elmo",
    label: "ELMO",
    title: "ELMO: the news without the twelve tabs",
    org: "UT Dallas senior capstone",
    role: "Full-stack developer · Product & UX",
    when: "2025",
    hook: "Understanding one news story meant jumping between a dozen tabs. AI summaries make that faster, but they can strip out the sourcing that makes news worth trusting. Our five-person team built ELMO to keep both.",
    scribble: "twelve tabs → one screen",
    metrics: [
      { value: "5", label: "person capstone team" },
      { value: "multi", label: "source retrieval + AI synthesis" },
      { value: "end-to-end", label: "working full-stack product" },
    ],
    tags: ["AI", "team of 5", "product & UX", "full stack"],
    visuals: {
      overview: {
        figures: [
          {
            src: "/images/elmo/landing-1600.webp",
            thumb: "/images/elmo/landing-800.webp",
            width: 1600,
            height: 900,
            alt: "ELMO landing screen: a large serif ELMO wordmark with the tagline 'Big stories. Little details.' beside a coral circle on warm grey.",
            caption: "The landing page. Design system + branding were my part.",
          },
        ],
      },
      outcome: {
        note: "Prototype screens · 2025 capstone build · no longer live",
        figures: [
          {
            src: "/images/elmo/explore-1145.webp",
            thumb: "/images/elmo/explore-480.webp",
            width: 1145,
            height: 2000,
            crop: 3 / 4,
            position: "top",
            alt: "ELMO Explore screen: a sidebar (Home, Explore, Ask ELMO, Saved, Settings, Recent Reads) beside a list of topics such as Breaking News, Technology, Science & Health and Travel.",
            caption: "1 · topics",
          },
          {
            src: "/images/elmo/topic-feed-1145.webp",
            thumb: "/images/elmo/topic-feed-480.webp",
            width: 1145,
            height: 2000,
            crop: 3 / 4,
            position: "top",
            alt: "ELMO topic feed for Breaking News & Current Events: a two-column grid of story cards with photos and headlines.",
            caption: "2 · stories",
          },
          {
            src: "/images/elmo/article-1145.webp",
            thumb: "/images/elmo/article-480.webp",
            width: 1145,
            height: 2000,
            crop: 3 / 4,
            position: "center 38%",
            alt: "ELMO article view: headline and photo, then three reading modes (Brief, Standard, Deep Dive), the article text, and a Sources list at the bottom.",
            caption: "3 · reading modes + sources",
          },
        ],
      },
    },
    overview: {
      context:
        "My senior CS capstone at UT Dallas. ELMO (Evolving Learning Media Outlet) brought multi-source news, retrieval, AI synthesis, sign-in and personalization into one app.",
      ownership:
        "I worked across the stack, with particular ownership of the product experience and the interfaces connecting users to ELMO's retrieval, AI and backend.",
      team: "Five of us. Teammates were responsible for other parts of the AWS infrastructure, backend, AI/RAG pipeline and product design; I worked with them to bring those pieces into the interface.",
    },
    problem: {
      statement:
        "Understanding one news story often means jumping between many sources. AI summaries make that faster, but they can remove the context and sourcing that make information trustworthy.",
      question: "Can AI make a story faster to understand without hiding where it came from?",
      needs: [
        "Readers: one place to follow a story across outlets",
        "Readers: summaries they can check against the original reporting",
        "Returning readers: a feed shaped by their own preferences",
      ],
      constraints: ["Capstone timeline", "AI + backend evolving in parallel", "Summaries must stay tied to sources"],
    },
    thinkingNote: "the product calls behind the experience, and what we didn't do instead:",
    thinking: [
      {
        choice: "Progressive disclosure",
        over: "every feature on one screen",
        why: "Summary first; sources, related coverage and the full article one step deeper. Readers choose how far to go.",
      },
      {
        choice: "Keep sources in view",
        over: "a clean AI answer on its own",
        why: "Every summary stays attached to the outlets behind it, so the trust signal is part of reading, not a footnote.",
      },
      {
        choice: "A clear article hierarchy",
        why: "Headline, synthesis, sources, then expansion, with a sidebar for moving between stories without losing your place.",
      },
      {
        choice: "Design for a moving backend",
        over: "waiting for the APIs to settle",
        why: "Retrieval and AI features changed while we built. A shared design system let the interface keep up as they landed.",
      },
      {
        choice: "One product, not five features",
        why: "Retrieval, AI, auth, preferences and APIs each worked alone. The job was one flow: sign in, set preferences, search, read, dig deeper.",
      },
      {
        choice: "Feasible first, then polish",
        over: "the ideal UX on paper",
        why: "Interactions were scoped to what the backend could reliably return, then refined as it matured.",
      },
    ],
    build: {
      steps: [
        { title: "Design system", body: "Set up the frontend design system and branding so every screen spoke one visual language." },
        { title: "Landing", body: "Built the landing page: what ELMO does, and the path into sign-in and search." },
        { title: "Articles", body: "Built and refined article rendering: the synthesis, its sources, and expansion into the full story." },
        { title: "Navigation", body: "Sidebar and navigation flows for moving between stories and sources." },
        { title: "Integration", body: "Wired the interface to the backend and APIs, and contributed across the full-stack app." },
      ],
      team: [
        { title: "Infrastructure", body: "Serverless AWS: Amplify, Lambda, API Gateway, DynamoDB" },
        { title: "Accounts", body: "Cognito authentication and user preferences" },
        { title: "Sources", body: "Multi-source aggregation via NewsAPI and Google Search" },
        { title: "AI + retrieval", body: "Pinecone RAG and context search; DeepSeek and Ollama synthesis" },
      ],
      stack: [
        "Next.js", "TypeScript", "Tailwind", "AWS Amplify", "Lambda", "Cognito", "DynamoDB", "API Gateway",
        "NewsAPI", "Google Search", "DeepSeek", "Ollama", "Pinecone",
      ],
    },
    outcome: {
      summary:
        "A working, end-to-end capstone product built by a five-person team: sign in, set preferences, search across sources, and read AI summaries with their sources attached.",
      results: [
        "Multi-source aggregation with retrieval and similarity/context search",
        "AI-generated summaries and articles, with source exploration and article expansion",
        "Authentication and user preferences on serverless AWS",
        "My part: the design system, landing page, article reading and navigation that made those capabilities usable",
      ],
    },
    learnings: {
      lessons: [
        "With AI products, trust is a UX problem as much as a model problem.",
        "A system can do ten things. The product is deciding which three a reader sees first.",
      ],
      differently:
        "Put the reading experience in front of real readers sooner, before polishing it, to learn which summary-and-sources format they actually wanted.",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
