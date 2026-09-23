// Roles in reverse chronological order (the dial reads top-to-bottom as newest
// to oldest). `start` (YYYY-MM) is where the role sits on the dial; `meta` is
// the exact date label shown beside the title.
export const roles = [
  {
    id: 'queralt-engineer',
    employer: 'Queralt Inc.',
    logo: '/queralt-logo.svg',
    title: 'Software Engineer',
    meta: 'Jan 2026 - Present · 9 mos',
    start: '2026-01',
    body:
      'Sole developer on a channel sales partner portal built with Next.js, TypeScript, and Tailwind, featuring Microsoft Entra ID B2B guest authentication, per-partner document storage via SharePoint and the Microsoft Graph API, and database-backed tracking of partner onboarding progress and deal registration, with full ownership of the authentication flow and repository architecture. Also built and maintained a secure, password protected, responsive investor portal using Next.js, React, and Node.js, with an emphasis on performance, modular architecture, and cross device reliability, implementing protected navigation flows, reusable component systems, analytics, and domain level configuration to support deployment and ongoing iteration.',
    tags: ['Next.js', 'React.js', 'Node.js', 'Hosting'],
  },
  {
    id: 'atlantic-engineer',
    employer: 'Atlantic Security',
    logo: '/atlantic-logo.svg',
    title: 'Software Engineer',
    meta: 'Seasonal · Dec 2025 - Jan 2026 · 2 mos · On-site',
    start: '2025-12',
    body:
      'Designed and implemented a backend webhook service in Python using FastAPI to receive approved bid events, validate requests, normalize third-party data, and persist structured payloads for automation. Integrated the backend service with simPRO to support automated quote creation and cost-center mapping, using Zapier as an event trigger.',
    tags: ['API Development', 'Python', 'FastAPI'],
  },
  {
    id: 'queralt-intern',
    employer: 'Queralt Inc.',
    logo: '/queralt-logo.svg',
    title: 'Web Development Intern',
    meta: 'Summer 2025',
    start: '2025-06',
    body:
      'Led the development and design process of our commercial website into production. Conducted extensive market research on competitors. Produced multiple iterations of wireframes and copy decks to present to our board of investors and CEO. Managed outsourced design talent, and set up communication channels of exterior applications providing secure data store.',
    tags: ['HTML', 'CSS', 'UI/UX'],
  },
  {
    id: 'atlantic-intern',
    employer: 'Atlantic Security',
    logo: '/atlantic-logo.svg',
    title: 'Field Engineering Intern',
    meta: 'Summer 2024',
    start: '2024-06',
    body:
      "Worked with a talented team of engineers to install complex commercial and residential Fire and security systems. Developed my networking skills by connecting Cat-6 wires for LAN's inside of companies and homes in Northern Florida. Programmed the connection of various housing zones to provide a seamless connection to all devices in the system.",
    tags: ['Security Systems', 'Smart Home'],
  },
];
