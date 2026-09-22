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
    label: "Elmo",
    title: "Elmo: the news without the twelve tabs",
    org: "Side project",
    role: "Builder (solo)",
    when: "2025",
    hook: "Following one story meant opening a dozen tabs and guessing which ones to trust. Elmo pulls from multiple sources, retrieves the relevant ones, and writes a grounded summary.",
    scribble: "because I had 12 tabs open",
    metrics: [
      { value: "0 → 1", label: "solo, from idea to working product" },
      { value: "multi", label: "source summaries, grounded in the articles" },
      { value: "0", label: "servers to babysit (serverless AWS)" },
    ],
    tags: ["AI", "0 → 1", "solo build", "trust"],
    overview: {
      context: "AI summaries are easy to make and hard to trust. News is exactly where trust matters most.",
      ownership: "The whole thing: the product idea, the UX, the retrieval pipeline, the backend, and auth.",
      team: "Just me, plus a lot of articles.",
    },
    problem: {
      statement:
        "Getting a clear picture of a story means reading many sources. Generic AI summaries skip that work and sometimes invent things.",
      question: "Can a summary be fast and still stay grounded in what the sources actually say?",
      needs: ["See multiple perspectives quickly", "Trust that the summary isn't making things up", "Sign in and come back"],
      constraints: ["Solo builder", "LLM costs", "Summaries must stay tied to their sources"],
    },
    thinking: [
      {
        choice: "Grounded over clever",
        why: "Constrained prompts keep the model to what the retrieved articles say. Being boring is a feature here.",
      },
      {
        choice: "Locally hosted DeepSeek",
        over: "a paid API for everything",
        why: "More control over cost and behavior while I iterated on prompts.",
      },
      {
        choice: "Serverless",
        over: "always-on servers",
        why: "One builder, spiky traffic. Pay for use and spend my time on the product instead of ops.",
      },
    ],
    build: {
      steps: [
        { title: "Retrieve", body: "Built a Pinecone RAG pipeline for real-time retrieval and context-aware filtering." },
        { title: "Summarize", body: "Wrote constrained prompts so the multi-source summaries stay grounded." },
        { title: "Backend", body: "Lambda, DynamoDB, S3 and API Gateway for retrieval and automated delivery." },
        { title: "Accounts", body: "Cognito-based authentication and user flows in Next.js." },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind", "AWS Lambda", "DynamoDB", "Cognito", "Pinecone", "DeepSeek"],
    },
    outcome: {
      summary: "A working discovery flow: search → retrieve → rank → a grounded summary, behind real sign-in.",
      results: [
        "Multi-source search, article retrieval and similarity ranking in one flow",
        "Grounded AI summaries",
        "Authenticated, serverless product end to end",
      ],
    },
    learnings: {
      lessons: [
        "With AI products, trust is the product.",
        "Constraints on the model are product decisions, not only technical ones.",
      ],
      differently:
        "Put it in front of readers sooner. I spent a long time on the pipeline before learning which summary format people actually wanted.",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
