export const en = {
  ui: {
    eyebrow: "Portfolio",
    language: "Language",
    languageName: "English",
    theme: { system: "Match system theme", light: "Light theme", dark: "Dark theme" },
    nav: {
      about: "About",
      work: "Experience",
      stack: "Stack",
      education: "Education",
      portfolio: "Work",
    },
    sections: "Sections",
    backToWork: "Work",
    resetPrototype: "Reset the prototype",
    buildNotes: "Build notes",
  },

  profile: {
    title: "Senior Back-end Engineer",
    location: "Jakarta, APAC",
    availability: "Open to remote roles",
    lede: "I build and maintain REST and GraphQL services for companies that move money, data and compliance across borders — designing the service architecture, then owning the infrastructure it runs on.",
    paragraphs: [
      "Seven years across fintech, e-commerce and business services in Singapore, Hong Kong and Indonesia. My work sits where API design meets operations: breaking monoliths into domain-separated microservices, hardening bank integrations with request signing and cryptography, and replacing manual releases with CI/CD that ships in minutes instead of days.",
      "Full-stack when it helps — TypeScript, Node.js and Go on the server, React and React Native on the client, AWS, Azure and CDK underneath.",
    ],
  },

  headings: {
    about: { title: "About", meta: "2019 — present" },
    work: { title: "Experience", meta: (count: number) => `${count} roles` },
    stack: { title: "Stack", meta: "What I reach for" },
    education: { title: "Education", meta: "2014 — 2019" },
  },

  stats: [
    { label: "Experience", value: "7", unit: " yrs" },
    { label: "Peak traffic", value: "+200", unit: "%" },
    { label: "Release time", value: "Days", unit: " → minutes" },
    { label: "Markets", value: "SG · HK", unit: " · GB · US · ID" },
  ],

  workTeaser: {
    label: "Selected work",
    text: "Five interactive prototypes, rebuilt from static designs",
  },

  modes: { Remote: "Remote", Hybrid: "Hybrid", "On-site": "On-site" },

  /** How long a still-running role has lasted, e.g. "1 yr 3 mos". */
  tenure: ({ years, months }: { years: number; months: number }) =>
    [years && `${years} ${years === 1 ? "yr" : "yrs"}`, months && `${months} ${months === 1 ? "mo" : "mos"}`]
      .filter(Boolean)
      .join(" ") || "< 1 mo",

  roles: {
    osome: {
      title: "Senior Back-end Engineer",
      location: "Singapore",
      period: "May 2025 — Present",
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
    },
    necto: {
      title: "Senior Back-end Engineer",
      location: "Singapore",
      period: "Dec 2022 — May 2025",
      brief:
        "Corporate bank API aggregation for corporate treasury, enterprise and finance teams.",
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
          detail:
            "Onboarded new engineers to productivity and troubleshot issues raised across the team.",
        },
      ],
    },
    pawjourr: {
      title: "Senior Back-end Engineer",
      location: "Singapore",
      period: "Nov 2021 — Dec 2022",
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
    },
    "kaddra-lead": {
      title: "Lead Back-end Engineer",
      location: "Singapore",
      period: "Apr 2021 — Sep 2021",
      brief:
        "Mobile e-commerce and retail platform; led the backend team through a move into serverless.",
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
        { lead: "Led engineers and QA.", detail: "Managed the team and held the bar on code quality." },
      ],
    },
    "kaddra-fullstack": {
      title: "Full-stack Software Engineer",
      location: "Singapore",
      period: "Aug 2020 — Mar 2021",
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
    },
    "soyaka-fullstack": {
      title: "Full-stack Software Engineer",
      location: "Jakarta",
      period: "Jan 2020 — May 2020",
      brief: "Mobile fashion social-commerce platform; led a new product from the ground up.",
      highlights: [
        {
          lead: "Shipped cross-platform mobile.",
          detail: "Set up Android and iOS applications in Flutter.",
        },
        {
          lead: "Built the product APIs.",
          detail:
            "Backend services in Node.js and Express connecting front-end and back-end cleanly.",
        },
        {
          lead: "Ran the outsourced team.",
          detail: "Coordinated vendor engineers and internal teams to hit project milestones.",
        },
      ],
    },
    "soyaka-frontend": {
      title: "Front-end Engineer",
      location: "Jakarta",
      period: "Mar 2019 — Dec 2019",
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
    },
  },

  stack: [
    { area: "Languages", lead: "TypeScript, Node.js, Go.", detail: "JavaScript, Dart on mobile." },
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
  ],

  education: {
    degree: "B.Eng, Informatics Engineering",
    place: "Bandung, Indonesia",
    period: "July 2014 — March 2019",
    note: "Equivalent to Computer Science, focused on software engineering. GPA 3.72 / 4.00.",
  },

  portfolio: {
    title: "Work",
    meta: (count: number) => (count === 1 ? "1 project" : `${count} projects`),
    intro: {
      before: "Things you can open and use. Backend work I owned in production is described under ",
      link: "Experience",
      after: ".",
    },
    kind: "Interactive prototype",
    role: "Design port, front-end",
    items: "items",
  },

  projects: {
    salah: {
      name: "Muslim Salah Times",
      kind: "Shipped app",
      role: "My iOS app, rebuilt for the browser",
      storeLabel: "View on the App Store",
      summary:
        "A prayer-times app I built and shipped to the App Store. This is the same product rebuilt in the browser so you can try it here: a live countdown to the next prayer, a timetable marking what is now and next, and a settings sheet where provider, city and calculation method really move the times.",
      thumbnailAlt:
        "Muslim Salah Times on a phone: a running clock, a Maghrib-to-Isha progress bar with a countdown, and the day's six prayer times.",
      lede: "My prayer-times app, rebuilt in the browser so it can be tried without an install. Scrub through the day and watch the window, the countdown and the NOW badge move; open Settings and change the city or the madhab to see the timetable answer.",
      sub: "The iOS original is on the App Store; this rebuild runs on the same device shell as the other prototypes. The clock ticks in real time, and the slider under the phone is a prototype control rather than part of the app.",
      notes: [
        {
          title: "Time is the state",
          body: "Everything on the screen is derived from one number — minutes since midnight. The current window, the progress bar, the countdown and which row is marked NOW all fall out of it, so the whole screen stays consistent whether the clock ticks a second or jumps six hours.",
        },
        {
          title: "Settings that mean what they say",
          body: "The sheet explains that method and madhab only apply to times the app works out itself. So they do exactly that: with the Kemenag timetable cached they are inert and the app says so, and switching the provider to the offline fallback makes Hanafi push Asr back three quarters of an hour.",
        },
        {
          title: "Wrapping midnight without special cases",
          body: "The window after Isha runs into the next day's Fajr. Rather than branch on it, the last window borrows tomorrow's first prayer, so the countdown behaves the same at 23:50 as it does at noon.",
        },
      ],
      attribution:
        "The shipped app fetches the official Kementerian Agama RI timetable via api.myquran.com and caches it. This browser rebuild carries a small fixed sample for three cities instead — use the real app for actual prayer times.",
    },
    "task-manager": {
      name: "Task manager",
      summary:
        "A mobile task app built from a static design: week planner, task detail with subtasks, and a new-task sheet. Every screen is wired to real state — create a task and it shows up in the list, the boards view and the activity feed.",
      thumbnailAlt:
        "The prototype's home screen on a phone: a week planner with Thursday selected and a high-priority task card.",
      lede: "A three-screen mobile design, rebuilt as something you can actually use. Pick a day, open a task, tick subtasks off, or add a task and watch it appear everywhere it should.",
      sub: "Nothing here is a screenshot — the phone below is React state. It runs entirely in the browser, so a refresh puts it back to the seeded week.",
      notes: [
        {
          title: "One reducer, four screens",
          body: "Tasks, activity, the selected day and which sheet is open all live in a single reducer. Every screen reads the same state, so creating a task updates the planner, the boards view and the activity log at once.",
        },
        {
          title: "The design's flow, kept honest",
          body: "The three screens in the source design are a list, a detail view and a create sheet. The tab bar implied two more, so boards and activity are derived from the same data rather than faked with placeholder art.",
        },
        {
          title: "Interactive means operable",
          body: "Day chips, tabs, priority segments and subtask rows are real buttons with pressed state; the sheet is a labelled dialog that closes on Escape and refuses to save an untitled task.",
        },
      ],
      attribution:
        "Original design: a task-manager concept shot. Rebuilt for practice — not affiliated with its author.",
    },
    wallet: {
      name: "Wallet",
      summary:
        "A mobile wallet rebuilt from a two-screen design: a card you can actually pay off, accounts that filter the activity feed, a portfolio-growth chart with switchable ranges, and a watch list. Balances reconcile — paying a card debits the account behind it.",
      thumbnailAlt:
        "The wallet prototype on a phone: a balance, a lime payment card and a list of accounts.",
      lede: "A two-screen wallet design, rebuilt so the numbers hold together. Pay a card and the money leaves an account; freeze it and the payment is refused; hide balances and the whole app goes quiet.",
      sub: "Same device shell as the task manager — the difference is the palette and the data. It runs entirely in the browser, so a refresh restores the opening balances.",
      notes: [
        {
          title: "Money that actually moves",
          body: "Paying a card debits chequing, writes an entry into recent activity and flips the button to Paid. The balance at the top is the sum of the accounts, so every action reconciles instead of being decoration.",
        },
        {
          title: "One switch, felt everywhere",
          body: "Hide balances in Settings and every amount in the app masks — balance, cards, accounts, activity, prices. It is the cheapest way to show that these screens read from one store rather than their own copies.",
        },
        {
          title: "A chart you can question",
          body: "The range chips rebuild the series, the growth percentage is derived from the balance behind it, and tapping a bar swaps the headline figure for that day's change.",
        },
      ],
      attribution:
        "Original design: a wallet app concept shot. Rebuilt for practice — not affiliated with its author. Balances, prices and holdings are invented.",
    },
    finance: {
      name: "Finance",
      summary:
        "A personal-finance app rebuilt from a four-screen design: a spend chart you pick months on, subscriptions you can pause, transactions filtered by account, and a savings target that answers to all of it. Pausing a plan moves the numbers on three other screens.",
      thumbnailAlt:
        "The finance prototype on a phone: a total-spend card with a two-line chart, and income and expense tiles.",
      lede: "A four-screen finance design, rebuilt so the figures answer to each other. Pick a month on the chart, pause a subscription, or put money against the savings target and watch the rest of the app move.",
      sub: "Third port on the same device shell — only the palette and the data differ. Everything runs in the browser, so a refresh restores the opening month.",
      notes: [
        {
          title: "The chart is an input, not a picture",
          body: "Four months, two series, drawn as inline SVG. Tapping a month moves the marker and rewrites the Total Spend headline, the income tile and the expense tile beneath it.",
        },
        {
          title: "Pausing a plan is felt three screens away",
          body: "Subscriptions are added on top of each month's base figures, so pausing Adobe drops total spend and expense on Home, lowers upcoming bills, and turns up as paused savings in the Target stats.",
        },
        {
          title: "A goal that can actually be met",
          body: "Adding to savings moves the percentage left, the milestone dots, the per-day figure and the streak banner together, and writes the transfer into the transaction list.",
        },
      ],
      attribution:
        "Original design: a personal-finance app concept shot. Rebuilt for practice — not affiliated with its author. Balances, merchants and plans are invented.",
    },
    shop: {
      name: "Shop",
      summary:
        "A fashion storefront rebuilt from a three-screen design: hero carousel, categories and search that filter one catalogue, a product page with size and colour selection, and a cart that adds, decrements, deletes and checks out. Product photography is replaced with drawn SVG garments.",
      thumbnailAlt:
        "The shop prototype on a phone: a Winter Deal hero card above category chips and a sneaker rail.",
      lede: "A three-screen storefront, rebuilt as a shop you can actually run through: browse or search, pick a size and colour, add to the bag, change your mind, and check out.",
      sub: "Fourth port on the same device shell. Product photography is replaced with drawn SVG garments — see the last build note.",
      notes: [
        {
          title: "A bag that can be wrong",
          body: "Adding to cart refuses an unsized product and says so; a line at quantity one turns its minus into a delete; checkout empties the bag and reports what it charged. The badge in the header counts units, not lines.",
        },
        {
          title: "Search and categories compose",
          body: "The category chips and the search field filter the same list rather than owning separate ones, so searching inside Shoes narrows within Shoes and the empty state names both.",
        },
        {
          title: "Drawn, not borrowed",
          body: "The source design leans on product photography I have no licence to. Every garment here is flat SVG art tinted by the selected colourway, so choosing a colour restyles the product, the cart thumbnail and the category chip from one value.",
        },
      ],
      attribution:
        "Original design: a fashion commerce concept shot. Rebuilt for practice — not affiliated with its author. Brands, products and prices are invented.",
    },
  },

  meta: {
    home: {
      title: "Abdul Ghani — Back-end Engineer",
      description:
        "Portfolio of Abdul Ghani, senior back-end engineer in Jakarta, APAC building REST and GraphQL services, cloud infrastructure and CI/CD.",
    },
    portfolio: {
      title: "Work — Abdul Ghani",
      description:
        "Interactive work by Abdul Ghani: mobile designs rebuilt as working prototypes.",
    },
  },

  errors: {
    notFound: "Page not found",
    notFoundDetail: "That page does not exist here.",
    generic: "Something went wrong",
    genericDetail: "An unexpected error occurred.",
    label: "Error",
    back: "← Back to the portfolio",
  },
};

export type Content = typeof en;
