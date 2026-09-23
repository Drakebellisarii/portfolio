/**
 * Every word on the Queralt case study pages lives here. Components render
 * whatever this file describes, so copy can change without touching them.
 *
 * Voice: informational. State what was built, how it works and why a choice
 * was made. No superlatives, no selling.
 *
 * Accuracy rules: only facts from the brief. No metrics, dates or outcomes
 * beyond those listed. UI shown in visuals is recreated with fictional data.
 *
 * Block kinds
 *   chapter  { number, eyebrow, title, body[], visual?, tone?, flip?, wide?, aside? }
 *   pull     { text, tone? }
 *   sticky   { number, eyebrow, title, intro?, steps: [{ label, title, body, visual }] }
 *   numbers  { items: [{ value, label }] }
 *   decisions{ number, title, items: [{ title, choice, tradeoff }] }
 *   roadmap  { number, title, intro, items: [{ title, body }] }
 *   spec     { rows: [[label, value]] }
 */

export const SERIES = {
  path: '/work/queralt',
  name: 'Queralt',
  kicker: 'Case study series',
  title: 'Building the internal platform',
  lede:
    'I joined Queralt Solutions, an identity and cybersecurity company in Connecticut, as a web development intern and built its investor portal. That led to a role as lead engineer for the company’s internal platforms.',
  body: [
    'Queralt’s core product is built by a separate engineering team. The internal platforms are the systems the company runs on around it. Over the following months I designed and built three of them: a channel sales portal for partners, a pilot support portal for early product users, and a company hub that connects the others and serves as the starting point for everyone at Queralt.',
  ],
  throughline: 'The common thread is identity and access control, applied to tools that are meant to be simple to use.',
  studies: ['hub', 'channel', 'investor'],
};

export const STUDIES = {
  hub: {
    slug: 'hub',
    path: '/work/queralt/hub',
    index: '01',
    name: 'Queralt Hub',
    kind: 'Case study',
    oneLiner: 'A company-wide intranet that brings chat, calendars, tasks, projects and the company’s internal portals into one application.',
    hero: 'HubHome',
    meta: [
      ['Role', 'Lead engineer'],
      ['Year', '2026'],
      ['Stack', 'Next.js · Supabase · Entra ID'],
      ['Status', 'Company-wide; roadmap in progress'],
    ],
    blocks: [
      {
        kind: 'chapter',
        number: '01',
        eyebrow: 'The problem',
        title: 'Company information was spread across six tools.',
        body: [
          'Queralt has about twelve people. Work ran across Teams chat, Outlook, SharePoint and three separate internal portals.',
          'Routine questions had no single place to be answered: who is working on what, what is overdue, where the current version of a document is, and what was decided in the last meeting.',
        ],
        visual: 'ScatteredTools',
        tone: 'paper',
      },
      {
        kind: 'pull',
        text: 'The goal: one application for chat, calendars, tasks, projects and the internal portals.',
        tone: 'night',
      },
      {
        kind: 'chapter',
        number: '02',
        eyebrow: 'Conversation',
        title: 'Real-time chat and channels',
        body: [
          'Chat and channels run on Supabase Realtime. They were designed to replace Teams chat for internal conversation.',
          'Announcements and kudos are part of the same area.',
        ],
        visual: 'ChatChannel',
        tone: 'night',
      },
      {
        kind: 'chapter',
        number: '03',
        eyebrow: 'Projects & delegation',
        title: 'Check-ins on request',
        body: [
          'Projects and tasks support on-request check-ins. A teammate requests an update; the assignee replies with On track, At risk or Blocked and a short note.',
          'Each reply is added to the task’s status timeline.',
        ],
        visual: 'CheckIn',
        tone: 'paper',
        flip: true,
      },
      {
        kind: 'chapter',
        number: '04',
        eyebrow: 'Direction',
        title: 'Goals, vision and a scorecard',
        body: ['Company goals, personal goals, the company vision and a scorecard are part of the hub, next to the projects and tasks they relate to.'],
        visual: 'GoalsScorecard',
        tone: 'paper',
      },
      {
        kind: 'chapter',
        number: '05',
        eyebrow: 'People & documents',
        title: 'Directory and document library',
        body: [
          'Profiles in the company directory are synced from Microsoft Entra ID, the same identity system people sign in with.',
          'A unified document library gives files a single location inside the hub.',
        ],
        visual: 'Directory',
        tone: 'paper',
        flip: true,
      },
      {
        kind: 'chapter',
        number: '06',
        eyebrow: 'Assistant',
        title: 'An optional AI assistant',
        body: ['“Ask the hub” is an assistant built on the Anthropic API. It is off by default and only runs once it has been configured.'],
        visual: 'AskHub',
        tone: 'night',
      },
      {
        kind: 'sticky',
        number: '07',
        eyebrow: 'The redesign',
        title: 'What does this person need right now?',
        intro: 'The first version worked, but it presented everything at once. The redesign was organized around that one question.',
        steps: [
          {
            label: 'Before',
            title: 'Version one',
            body: 'Sixteen sidebar items, duplicated statistics and empty widgets. Everything was reachable, and nothing was prioritized.',
            visual: 'HubBefore',
          },
          {
            label: 'Discovery',
            title: 'Structured discovery',
            body: 'Three questions: who uses the hub, what they need first each morning, and whether they use it at a desk or on a phone.',
            visual: 'Discovery',
          },
          {
            label: 'After',
            title: 'Home, ordered by the morning',
            body: 'Navigation went from sixteen items to eight. Home leads with today’s meetings, then tasks, then messages. Each person customizes Home, starting from defaults for their role.',
            visual: 'HubHome',
          },
          {
            label: 'Command palette',
            title: 'Command palette',
            body: 'A ⌘K command palette was added for keyboard navigation.',
            visual: 'CommandPalette',
          },
          {
            label: 'Phone',
            title: 'Mobile tab bar',
            body: 'A mobile tab bar was added for use on phones.',
            visual: 'MobileTabBar',
          },
        ],
      },
      {
        kind: 'pull',
        text: 'Sixteen navigation items became eight. Nothing was removed; it was reorganized.',
        tone: 'paper',
      },
      {
        kind: 'chapter',
        number: '08',
        eyebrow: 'Architecture',
        title: 'How the portals connect',
        body: [
          'Each portal connects to the hub with its own API key and sends webhooks. A new partner deal or a pilot support ticket appears in the hub as a notification.',
          'Background jobs run on Vercel Cron. Email and webhook deliveries use an outbox pattern: each delivery is recorded first and sent by a background job, which makes delivery reliable.',
        ],
        visual: 'EcosystemDiagram',
        tone: 'night',
        wide: true,
      },
      {
        kind: 'chapter',
        number: '09',
        eyebrow: 'Identity & access',
        title: 'Sign-in',
        body: [
          'People sign in with Microsoft: Entra ID, through Supabase Auth’s Azure provider.',
          'People without a company Microsoft account use a magic link instead. Both paths are checked against an allowlist before access is granted.',
        ],
        visual: 'SignInFlow',
        tone: 'night',
        wide: true,
      },
      {
        kind: 'chapter',
        number: '10',
        eyebrow: 'Connected system',
        title: 'Pilot Support Portal',
        body: [
          'A separate portal where early pilot users of Queralt’s product report bugs, errors and feedback. Sign-in is invite-only and passwordless: magic links, with accounts provisioned server-side and no self-signup.',
          'Pilot users see only their own entries, enforced with Postgres row-level security. Internal admins see a filterable timeline of all entries and can export it as CSV.',
        ],
        aside: {
          label: 'From an audit',
          text: 'I found and closed a gap where a secondary sign-in path could provision accounts outside the invite-only flow, and moved an admin check from the interface to the server.',
        },
        visual: 'PilotTimeline',
        tone: 'paper',
      },
      {
        kind: 'decisions',
        number: '11',
        title: 'Decisions and trade-offs',
        items: [
          {
            title: 'Build chat into the hub',
            choice: 'Real-time channels inside the hub, designed to replace Teams chat for internal conversation.',
            tradeoff: 'More to build and maintain, and people have to change a habit. In return, conversations sit next to the tasks, projects and documents they refer to.',
          },
          {
            title: 'Connect portals through keys and webhooks',
            choice: 'Each portal authenticates to the hub with its own API key and sends events as webhooks.',
            tradeoff: 'More integration code than a shared database would need. Each portal can be deployed on its own, and each key is limited to one system.',
          },
          {
            title: 'Deliver through an outbox',
            choice: 'Email and webhook deliveries are queued in an outbox and sent by Vercel Cron jobs.',
            tradeoff: 'Deliveries can lag the action slightly. A failure is retried instead of lost.',
          },
        ],
      },
      {
        kind: 'roadmap',
        number: '12',
        title: 'In progress',
        intro: 'These are being built and have not shipped.',
        items: [
          { title: 'Calendar sync', body: 'Microsoft and Google calendar sync.' },
          { title: 'Meeting notes', body: 'Live, collaborative meeting notes in which action items become tasks.' },
          { title: 'Onboarding', body: 'A first-login flow in which admin consent is granted once, so employees do not configure connections themselves.' },
        ],
      },
      {
        kind: 'numbers',
        items: [
          { value: '~12', label: 'people it was built for, on desktop and phone' },
          { value: '3', label: 'internal portals connected to the hub' },
          { value: '16 → 8', label: 'navigation items after the redesign' },
        ],
      },
      {
        kind: 'spec',
        rows: [
          ['Role', 'Lead engineer: design, engineering and deployment'],
          ['Year', '2026'],
          ['Platforms', 'Web, on desktop and phone'],
          ['Framework', 'Next.js (App Router), TypeScript, Tailwind'],
          ['Data & realtime', 'Supabase: Postgres, Auth, Realtime'],
          ['Identity', 'Microsoft Entra ID; magic-link fallback; allowlist'],
          ['Hosting & jobs', 'Vercel, Vercel Cron, outbox'],
          ['AI', 'Anthropic API; optional, off by default'],
          ['Status', 'Built for company-wide daily use; calendar sync, meeting notes and onboarding in progress'],
        ],
      },
    ],
    next: 'channel',
  },

  channel: {
    slug: 'channel',
    path: '/work/queralt/channel-portal',
    index: '02',
    name: 'Channel Sales Portal',
    kind: 'Case study',
    oneLiner: 'A partner relationship management portal where Queralt’s resellers and integration partners register deals, find sales resources and message the Queralt team.',
    hero: 'PartnerDashboard',
    meta: [
      ['Role', 'Lead engineer'],
      ['Year', '2026'],
      ['Stack', 'Next.js · NextAuth v5 · Supabase'],
      ['Status', 'Functional; CRM integration pending'],
    ],
    blocks: [
      {
        kind: 'chapter',
        number: '01',
        eyebrow: 'Context',
        title: 'Why a custom partner portal',
        body: [
          'Queralt sells through channel partners: resellers, managed service providers and integrators.',
          'Off-the-shelf partner relationship management platforms are expensive and generic, so this one was built for Queralt.',
        ],
        visual: 'PartnerTypes',
        tone: 'paper',
      },
      {
        kind: 'sticky',
        number: '02',
        eyebrow: 'How it was built',
        title: 'From concept to working application',
        steps: [
          {
            label: '01 · Concept',
            title: 'Eight pages in Figma',
            body: 'The project began as a Microsoft 365 low-code concept. I designed an eight-page product in Figma in Queralt’s brand: dashboard, deal registration, resource library, onboarding, implementation tracker, customer discovery, help and settings.',
            visual: 'FigmaBoard',
          },
          {
            label: '02 · Custom build',
            title: 'MVP in about two days',
            body: 'I moved to a custom build to control the data model and the user experience. Using AI-assisted development with Claude Code, I had a working MVP in about two days.',
            visual: 'PartnerDashboard',
          },
          {
            label: '03 · Hardening',
            title: 'Partner sign-in and data isolation',
            body: 'Partners sign in with their own company Microsoft accounts through Microsoft Entra ID B2B guest authentication, using NextAuth v5. Data is in Supabase Postgres, with row-level security limiting each partner to its own deals.',
            visual: 'IsolationDiagram',
          },
          {
            label: '04 · Features',
            title: 'What partners use',
            body: 'Deal registration, messaging between partners and the Queralt team, a library of sales collateral, and an admin view across all partners.',
            visual: 'DealRegistration',
          },
        ],
      },
      {
        kind: 'chapter',
        number: '03',
        eyebrow: 'Deal registration',
        title: 'Deals and messaging',
        body: ['Partners register deals through a form. Each deal has a message thread between the partner and the Queralt team, so questions and updates stay attached to the deal.'],
        visual: 'DealThread',
        tone: 'night',
      },
      {
        kind: 'chapter',
        number: '04',
        eyebrow: 'Resources',
        title: 'Sales collateral library',
        body: ['An asset library gives every partner the same current set of sales materials. The Queralt team has an admin view across all partners.'],
        visual: 'AssetLibrary',
        tone: 'paper',
        flip: true,
      },
      {
        kind: 'chapter',
        number: '05',
        eyebrow: 'Security',
        title: 'Per-partner data isolation',
        body: [
          'Row-level security in Postgres enforces isolation in the database rather than in the interface.',
          'I verified it with cross-account testing: a partner account, which should see only its own deals, against an internal admin account, which should see all partners.',
        ],
        visual: 'B2BFlow',
        tone: 'night',
        wide: true,
      },
      {
        kind: 'decisions',
        number: '06',
        title: 'Decisions and trade-offs',
        items: [
          {
            title: 'Custom build instead of low-code',
            choice: 'Replace the Microsoft 365 low-code concept with a Next.js and Supabase application.',
            tradeoff: 'More to own and maintain. In return, full control over the data model, the security boundary and the partner experience.',
          },
          {
            title: 'Security review as a design input',
            choice: 'The project went through a security review that evaluated a Microsoft-native low-code platform; its requirements shaped the architecture.',
            tradeoff: 'Some design choices follow the organization’s security requirements rather than developer preference, which is expected for enterprise software.',
          },
          {
            title: 'Ready for CRM integration',
            choice: 'Build the portal for a bidirectional HubSpot integration.',
            tradeoff: 'The portal works without it. The integration is pending configuration on the CRM side.',
          },
        ],
      },
      {
        kind: 'numbers',
        items: [
          { value: '~2 days', label: 'from starting the custom build to a working MVP' },
          { value: '8', label: 'pages designed in Figma' },
          { value: '1', label: 'architecture reused by the later Queralt platforms' },
        ],
      },
      {
        kind: 'chapter',
        number: '07',
        eyebrow: 'Outcome',
        title: 'A pattern for later platforms',
        body: ['The portal established how Queralt builds a secure, multi-tenant business application quickly. The same pattern was reused for each later Queralt platform.'],
        tone: 'paper',
        closing: true,
      },
      {
        kind: 'spec',
        rows: [
          ['Role', 'Lead engineer: design, engineering and deployment'],
          ['Year', '2026'],
          ['Design', 'Figma; eight-page product in Queralt’s brand'],
          ['Framework', 'Next.js, TypeScript, Tailwind'],
          ['Identity', 'Microsoft Entra ID B2B guests via NextAuth v5'],
          ['Data', 'Supabase Postgres with row-level security'],
          ['Hosting', 'Vercel'],
          ['Integrations', 'Prepared for bidirectional HubSpot sync'],
          ['Status', 'Functional; HubSpot integration pending CRM-side configuration'],
        ],
      },
    ],
    next: 'investor',
  },

  investor: {
    slug: 'investor',
    path: '/work/queralt/investor-portal',
    index: '03',
    name: 'Investor Portal',
    kind: 'Prologue',
    oneLiner: 'The investor portal I built as an intern, and why it is being rebuilt in Microsoft 365.',
    hero: 'InvestorSignIn',
    short: true,
    beats: [
      {
        title: 'First version',
        body: 'A custom Next.js application with authentication based on HTTP-only cookies, giving investors gated access to company updates and materials.',
      },
      {
        title: 'Rebuild',
        body: 'The portal is being rebuilt in Microsoft 365, on SharePoint with Entra B2B guest access, so investor documents fall under the company’s native compliance and audit controls.',
      },
      {
        title: 'What it taught me',
        body: 'For confidential documents, the right architecture keeps them inside the organization’s security boundary, even when a custom build would be more interesting to work on. This project is also where the internship became an engineering role.',
      },
    ],
    stack: 'Next.js · HTTP-only cookie sessions · being rebuilt on SharePoint with Entra B2B guest access',
    next: 'series',
  },
};
