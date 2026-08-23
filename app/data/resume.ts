export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type Role = {
  id: string;
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  mode: WorkMode;
  current?: boolean;
  brief: string;
  highlights: { lead: string; detail: string }[];
  tags: string[];
};

export const profile = {
  name: "Abdul Ghani",
  firstName: "Abdul",
  lastName: "Ghani",
  title: "Senior Back-end Engineer",
  location: "Jakarta, APAC",
  timezone: "GMT+8",
  availability: "Open to remote roles",
  lede: "I build and maintain REST and GraphQL services for companies that move money, data and compliance across borders — designing the service architecture, then owning the infrastructure it runs on.",
  paragraphs: [
    "Seven years across fintech, e-commerce and business services in Singapore, Hong Kong and Indonesia. My work sits where API design meets operations: breaking monoliths into domain-separated microservices, hardening bank integrations with request signing and cryptography, and replacing manual releases with CI/CD that ships in minutes instead of days.",
    "Full-stack when it helps — TypeScript, Node.js and Go on the server, React and React Native on the client, AWS, Azure and CDK underneath.",
  ],
} as const;

export const contacts = [
  { label: "Email", value: "contact.abdulghani@gmail.com", href: "mailto:contact.abdulghani@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/itsabdulghani", href: "https://linkedin.com/in/itsabdulghani" },
  { label: "GitHub", value: "github.com/abdulghani", href: "https://github.com/abdulghani" },
  { label: "WhatsApp", value: "+62 812 2055 5782", href: "https://wa.me/+6281220555782" },
] as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
] as const;

export const stats = [
  { label: "Experience", value: "7", unit: " yrs" },
  { label: "Peak traffic", value: "+200", unit: "%" },
  { label: "Release time", value: "Days", unit: " → minutes" },
  { label: "Markets", value: "SG · HK", unit: " · GB · US · ID" },
] as const;

export const roles: Role[] = [
  {
    id: "osome",
    title: "Senior Back-end Engineer",
    company: "Osome",
    companyUrl: "https://osome.com/",
    location: "Singapore",
    period: "May 2025 — Present",
    mode: "Remote",
    current: true,
    brief:
      "Digital business services — incorporation, bookkeeping, accounting and compliance for entrepreneurs across Singapore, Hong Kong and the UK.",
    highlights: [
      {
        lead: "Launched Hong Kong incorporation.",
        detail:
          "Built full incorporation support for the HK region with the rules and validations needed for smooth HK-based filings — the platform previously covered only Great Britain and Singapore.",
      },
      {
        lead: "Closed a sensitive-data logging gap.",
        detail:
          "Fixed production logging where sensitive fields were not properly masked, strengthening data protection and compliance.",
      },
      {
        lead: "Kept Singapore filings ACRA-compliant.",
        detail: "Added the required contact-address field to meet ACRA regulations.",
      },
      {
        lead: "Put AI into the review loop.",
        detail:
          "Use AI to draft implementations quickly, then review for correctness and security and debug what it misses.",
      },
    ],
    tags: ["Node.js", "TypeScript", "Compliance", "AI-assisted dev"],
  },
  {
    id: "necto",
    title: "Senior Back-end Engineer",
    company: "Necto",
    companyUrl: "https://www.linkedin.com/company/necto-api",
    location: "Singapore",
    period: "Dec 2022 — May 2025",
    mode: "Remote",
    brief: "Corporate bank API aggregation for corporate treasury, enterprise and finance teams.",
    highlights: [
      {
        lead: "Owned the core bank-integration API.",
        detail:
          "Maintained the Node.js REST API clients build against to connect their tools to the aggregation layer.",
      },
      {
        lead: "Refactored the legacy core service.",
        detail:
          "Reworked the internal Node.js API to process multiple service entries in parallel rather than sequentially.",
      },
      {
        lead: "Integrated multiple banks.",
        detail: "Connected several banks and eleven services to the company's API layer.",
      },
      {
        lead: "Met bank security standards.",
        detail:
          "Implemented request signing, encryption and response decryption with certificate and cryptographic techniques to protect financial data.",
      },
      {
        lead: "Cut releases from days to minutes.",
        detail:
          "Built a one-click release pipeline and automated PR test-environment deployment, raising iteration velocity.",
      },
      {
        lead: "Led on critical decisions.",
        detail: "Onboarded new engineers to productivity and troubleshot issues raised across the team.",
      },
    ],
    tags: ["Node.js", "REST", "Cryptography", "CI/CD", "Fintech"],
  },
  {
    id: "pawjourr",
    title: "Senior Back-end Engineer",
    company: "Pawjourr",
    companyUrl: "https://www.linkedin.com/company/pawjourr/",
    location: "Singapore",
    period: "Nov 2021 — Dec 2022",
    mode: "Hybrid",
    brief: "Pet-centric freelance outsourcing platform operating in the US and Singapore.",
    highlights: [
      {
        lead: "Built the GraphQL API.",
        detail: "Stood up a GraphQL layer on Nest.js and Node.js serving the whole website.",
      },
      {
        lead: "Broke the monolith apart.",
        detail:
          "Split the API into domain-separated microservices with TypeScript, Nest.js and NATS, deploying each independently for higher availability and domain resilience.",
      },
      {
        lead: "Auto-scaled the infrastructure.",
        detail:
          "Cut server instances from thousands to hundreds while raising peak traffic capacity by 200%.",
      },
      {
        lead: "Introduced CI/CD.",
        detail:
          "GitHub Actions, AWS CodeDeploy and Azure Pipelines — time to release dropped from hours and days to minutes.",
      },
      {
        lead: "Set the engineering baseline.",
        detail:
          "Project tooling, formatting, commit conventions and linting; introduced agile and scrum; ran technical screenings for hires.",
      },
    ],
    tags: ["GraphQL", "Nest.js", "NATS", "Microservices", "AWS", "Azure"],
  },
  {
    id: "kaddra-lead",
    title: "Lead Back-end Engineer",
    company: "Kaddra",
    companyUrl: "https://www.linkedin.com/company/kaddra/",
    location: "Singapore",
    period: "Apr 2021 — Sep 2021",
    mode: "Remote",
    brief: "Mobile e-commerce and retail platform; led the backend team through a move into serverless.",
    highlights: [
      {
        lead: "Designed serverless APIs.",
        detail: "Implemented serverless services to make the platform more agile and responsive.",
      },
      {
        lead: "Maintained the REST core.",
        detail: "Kept the Node.js and Express service running, adding features and addressing bugs.",
      },
      {
        lead: "Expanded the CI/CD workflow.",
        detail: "CircleCI and AWS CodeDeploy across development and deployment.",
      },
      {
        lead: "Standardised data access.",
        detail: "Introduced ORM tooling for consistent database interactions.",
      },
      {
        lead: "Led engineers and QA.",
        detail: "Managed the team and held the bar on code quality.",
      },
    ],
    tags: ["Serverless", "Express", "CircleCI", "ORM"],
  },
  {
    id: "kaddra-fullstack",
    title: "Full-stack Software Engineer",
    company: "Kaddra",
    companyUrl: "https://www.linkedin.com/company/kaddra/",
    location: "Singapore",
    period: "Aug 2020 — Mar 2021",
    mode: "Remote",
    brief: "Backend services and mobile app for a leading Singapore retail platform.",
    highlights: [
      {
        lead: "Maintained the full-stack application.",
        detail:
          "React Native mobile app against a Node.js and Express REST API — bug fixes and new features.",
      },
      {
        lead: "Promoted to Lead.",
        detail: "Recognised for the work above and given the backend team.",
      },
    ],
    tags: ["React Native", "Node.js", "Express"],
  },
  {
    id: "soyaka-fullstack",
    title: "Full-stack Software Engineer",
    company: "SoyakaAI",
    companyUrl: "https://www.linkedin.com/company/soyakaai/",
    location: "Jakarta",
    period: "Jan 2020 — May 2020",
    mode: "On-site",
    brief: "Mobile fashion social-commerce platform; led a new product from the ground up.",
    highlights: [
      {
        lead: "Shipped cross-platform mobile.",
        detail: "Set up Android and iOS applications in Flutter.",
      },
      {
        lead: "Built the product APIs.",
        detail: "Backend services in Node.js and Express connecting front-end and back-end cleanly.",
      },
      {
        lead: "Ran the outsourced team.",
        detail: "Coordinated vendor engineers and internal teams to hit project milestones.",
      },
    ],
    tags: ["Flutter", "Node.js", "Express"],
  },
  {
    id: "soyaka-frontend",
    title: "Front-end Engineer",
    company: "SoyakaAI",
    companyUrl: "https://www.linkedin.com/company/soyakaai/",
    location: "Jakarta",
    period: "Mar 2019 — Dec 2019",
    mode: "On-site",
    brief: "Frontend web application and the internal tools the company ran on.",
    highlights: [
      {
        lead: "Maintained the React.js web app",
        detail: "and internal tooling, resolving issues promptly.",
      },
      {
        lead: "Led the internal-tools redesign,",
        detail: "improving interface design and overall usability.",
      },
      {
        lead: "Migrated to React Hooks,",
        detail: "improving maintainability on the latest React features.",
      },
      {
        lead: "Made products installable.",
        detail: "Built a Progressive Web App, improving accessibility on devices.",
      },
    ],
    tags: ["React", "Hooks", "PWA"],
  },
];

export const stack = [
  {
    area: "Languages",
    lead: "TypeScript, Node.js, Go.",
    detail: "JavaScript, Dart on mobile.",
  },
  {
    area: "APIs",
    lead: "REST, GraphQL.",
    detail:
      "Nest.js, Express, request signing, encryption and certificate-based auth for bank integrations.",
  },
  {
    area: "Architecture",
    lead: "Microservices, serverless, monoliths.",
    detail: "Domain separation, NATS messaging, independent deploys, parallel processing.",
  },
  {
    area: "Cloud",
    lead: "AWS, Azure, CDK.",
    detail: "Auto-scaling infrastructure, high availability, cost reduction.",
  },
  {
    area: "Delivery",
    lead: "CI/CD end to end.",
    detail: "GitHub Actions, CircleCI, AWS CodeDeploy, Azure Pipelines, PR preview environments.",
  },
  {
    area: "Front-end",
    lead: "React, React Native, Flutter.",
    detail: "PWAs, internal tooling, design-to-interface work.",
  },
  {
    area: "Practice",
    lead: "Team leadership.",
    detail:
      "Onboarding, agile and scrum, technical screening, linting and commit conventions, AI-assisted development with human review.",
  },
] as const;

export const education = {
  degree: "B.Eng, Informatics Engineering",
  school: "Universitas Pasundan",
  schoolUrl: "https://www.linkedin.com/school/pasundanuniversity/",
  place: "Bandung, Indonesia",
  period: "July 2014 — March 2019",
  note: "Equivalent to Computer Science, focused on software engineering. GPA 3.72 / 4.00.",
} as const;
