export type WorkMode = "Remote" | "Hybrid" | "On-site";

/** Everything here is language-independent; the prose lives in app/i18n/content. */
export type RoleMeta = {
  id: string;
  company: string;
  companyUrl: string;
  mode: WorkMode;
  current?: boolean;
  tags: string[];
};

export const profile = {
  name: "Abdul Ghani",
  firstName: "Abdul",
  lastName: "Ghani",
  timezone: "GMT+8",
} as const;

export const contacts = [
  { label: "Email", value: "contact.abdulghani@gmail.com", href: "mailto:contact.abdulghani@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/itsabdulghani", href: "https://linkedin.com/in/itsabdulghani" },
  { label: "GitHub", value: "github.com/abdulghani", href: "https://github.com/abdulghani" },
  { label: "WhatsApp", value: "+62 812 2055 5782", href: "https://wa.me/+6281220555782" },
] as const;

export const sectionIds = ["about", "work", "stack", "education"] as const;
export type SectionId = (typeof sectionIds)[number];

export const roles: RoleMeta[] = [
  {
    id: "osome",
    company: "Osome",
    companyUrl: "https://osome.com/",
    mode: "Remote",
    current: true,
    tags: ["Node.js", "TypeScript", "Compliance", "AI-assisted dev"],
  },
  {
    id: "necto",
    company: "Necto",
    companyUrl: "https://www.linkedin.com/company/necto-api",
    mode: "Remote",
    tags: ["Node.js", "REST", "Cryptography", "CI/CD", "Fintech"],
  },
  {
    id: "pawjourr",
    company: "Pawjourr",
    companyUrl: "https://www.linkedin.com/company/pawjourr/",
    mode: "Hybrid",
    tags: ["GraphQL", "Nest.js", "NATS", "Microservices", "AWS", "Azure"],
  },
  {
    id: "kaddra-lead",
    company: "Kaddra",
    companyUrl: "https://www.linkedin.com/company/kaddra/",
    mode: "Remote",
    tags: ["Serverless", "Express", "CircleCI", "ORM"],
  },
  {
    id: "kaddra-fullstack",
    company: "Kaddra",
    companyUrl: "https://www.linkedin.com/company/kaddra/",
    mode: "Remote",
    tags: ["React Native", "Node.js", "Express"],
  },
  {
    id: "soyaka-fullstack",
    company: "SoyakaAI",
    companyUrl: "https://www.linkedin.com/company/soyakaai/",
    mode: "On-site",
    tags: ["Flutter", "Node.js", "Express"],
  },
  {
    id: "soyaka-frontend",
    company: "SoyakaAI",
    companyUrl: "https://www.linkedin.com/company/soyakaai/",
    mode: "On-site",
    tags: ["React", "Hooks", "PWA"],
  },
];

export const education = {
  school: "Universitas Pasundan",
  schoolUrl: "https://www.linkedin.com/school/pasundanuniversity/",
} as const;
