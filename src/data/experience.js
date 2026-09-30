// Roles in reverse chronological order. `org` is the organization the role
// belongs to, and `spans` the months it occupies (YYYY-MM, inclusive; a missing
// end means present); most roles have one, a role worked in stints has several.
// `dates` is the short label in the entry's margin, and `meta` is the fuller
// label shown beside the title.
export const roles = [
  {
    id: 'queralt-systems',
    org: 'queralt',
    employer: 'Queralt Inc.',
    logo: '/queralt-logo.svg',
    title: 'Systems Engineer',
    meta: 'Full-time · Aug 2026 – Present',
    spans: [['2026-08']],
    dates: 'Aug 2026 – Present',
    body:
      'Brought on full-time to run Queralt’s internal platforms and its pilot program. I oversee every pilot from onboarding to progress tracking, and I lead the company’s engineering calls with Solwey, the Austin software firm named to the 2025 Inc. 5000 that has built for more than 100 organizations. I also design and build the applications the company runs on, including a hub that connects every team, tool and portal, and a pilot support portal.',
    tags: ['Pilot programs', 'Engineering leadership', 'Systems architecture', 'Next.js', 'Supabase'],
  },
  {
    id: 'atlantic-engineer',
    org: 'atlantic',
    employer: 'Atlantic Security',
    logo: '/atlantic-logo.svg',
    title: 'Software Engineer',
    meta: 'Seasonal · Dec 2025 – Jan 2026 and May – Aug 2026 · On-site',
    spans: [
      ['2025-12', '2026-01'],
      ['2026-05', '2026-08'],
    ],
    dates: 'Winter 2025 · Summer 2026',
    body:
      'Designed and implemented a backend webhook service in Python using FastAPI to receive approved bid events, validate requests, normalize third-party data, and persist structured payloads for automation. Integrated the backend service with simPRO to support automated quote creation and cost-center mapping, using Zapier as an event trigger.',
    tags: ['API Development', 'Python', 'FastAPI'],
  },
  {
    id: 'queralt-engineer',
    org: 'queralt',
    employer: 'Queralt Inc.',
    logo: '/queralt-logo.svg',
    title: 'Software Engineer',
    meta: 'Through senior year · Sep 2025 – Jul 2026 · 11 mos',
    spans: [['2025-09', '2026-07']],
    dates: 'Sep 2025 – Jul 2026',
    body:
      'Lead engineer on a channel sales partner portal built with Next.js, TypeScript, and Tailwind, featuring Microsoft Entra ID B2B guest authentication, per-partner document storage via SharePoint and the Microsoft Graph API, and database-backed tracking of partner onboarding progress and deal registration, with full ownership of the authentication flow and repository architecture. Also built and maintained a secure, password protected, responsive investor portal using Next.js, React, and Node.js, with an emphasis on performance, modular architecture, and cross device reliability, implementing protected navigation flows, reusable component systems, analytics, and domain level configuration to support deployment and ongoing iteration.',
    tags: ['Next.js', 'React.js', 'Node.js', 'Hosting'],
  },
  {
    id: 'queralt-intern',
    org: 'queralt',
    employer: 'Queralt Inc.',
    logo: '/queralt-logo.svg',
    title: 'Web Development Intern',
    meta: 'May – Aug 2025 · 4 mos',
    spans: [['2025-05', '2025-08']],
    dates: 'May – Aug 2025',
    body:
      'Led the development and design process of our commercial website into production. Conducted extensive market research on competitors. Produced multiple iterations of wireframes and copy decks to present to our board of investors and CEO. Managed outsourced design talent, and set up communication channels of exterior applications providing secure data store.',
    tags: ['HTML', 'CSS', 'UI/UX'],
  },
  {
    id: 'atlantic-intern',
    org: 'atlantic',
    employer: 'Atlantic Security',
    logo: '/atlantic-logo.svg',
    title: 'Field Engineering Intern',
    meta: 'Summer 2024',
    spans: [['2024-06', '2024-08']],
    dates: 'Summer 2024',
    body:
      "Worked with a talented team of engineers to install complex commercial and residential Fire and security systems. Developed my networking skills by connecting Cat-6 wires for LAN's inside of companies and homes in Northern Florida. Programmed the connection of various housing zones to provide a seamless connection to all devices in the system.",
    tags: ['Security Systems', 'Smart Home'],
  },
];
