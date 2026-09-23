# Case studies plan: Queralt Solutions

## Where they live

| Route | Page |
|---|---|
| `/work/queralt` | Series intro: "Queralt: building the internal platform" |
| `/work/queralt/hub` | Case study 1, Queralt Hub (flagship; includes the Pilot Support Portal as a supporting chapter) |
| `/work/queralt/channel-portal` | Case study 2, Channel Sales Portal |
| `/work/queralt/investor-portal` | Case study 3, Investor Portal (short prologue) |

The site is a Create React App single-page app with no router. Rather than add a routing library,
`src/lib/router.js` is a ~40-line History API router (`usePath`, `Link`, `navigate`). `App.jsx`
renders the existing home page for `/` and lazy-loads the case study bundle for `/work/*`, so the
home page's JavaScript does not grow.

Deep links on Vercel: `vercel.json` rewrites unknown paths to `index.html`. A postbuild script
(`scripts/prerender-meta.js`) writes `build/work/queralt/**/index.html` copies with each page's
own `<title>`, description and Open Graph tags, so link unfurlers see correct metadata without
server rendering. Static files win over rewrites on Vercel.

## How they connect to the existing site

- **Experience section:** unchanged (the tuner). The Queralt role card is the natural lead-in.
- **Projects section:** the series is the first item of the project grid, spanning its full
  width in the same white card language as the project cards, with the three studies as rows.
- **Case study pages** have their own slim top bar: back to the portfolio, the series name, a
  reading progress hairline, and the study list. Pages have no site footer; each ends with a
  "next case study" link, and the investor prologue loops back to the series.

## Design system use

Existing tokens only: DM Serif Text (display), the system sans (body and the black-weight
outlined display used by the hero), system monospace for labels, ink/paper neutrals, the site
blue `#2563eb`/`#3b82f6`, the night background `#06080c`. Missing pieces added as tokens in
`src/styles/globals.css`: a fluid type scale (`--step-*`), `--font-mono`, and neutral colour
tokens (`--paper`, `--ink*`, `--night*`, `--accent*`). No new fonts, no new brand colours.

## Content

All copy and page structure lives in `src/case-studies/content.js` (plain JS objects: chapters,
beats, specs, numbers, pull quotes). Page metadata lives in `src/case-studies/meta.json`, shared
by the app and the prerender script. Components render whatever the content file describes.

## Components (`src/case-studies/`)

Layout and editorial:
- `CaseStudyPage` – renders a study from content; top bar, progress, metadata, chapters
- `SeriesPage` – the series intro
- `Chapter` – numbered chapter: eyebrow, oversized headline, short paragraphs, one visual
- `PullQuote` – a large set statement
- `StickySequence` – text steps scroll beside a sticky visual that crossfades per step (inline
  visuals below 900px; instant under reduced motion)
- `NumbersBand` – "by the numbers", only figures from the brief
- `SpecSheet` – Apple-style tech specs table
- `NextStory` – large editorial link to the next study
- `Frame` – browser / laptop / phone frames; `Scaled` renders a fixed-size UI recreation scaled
  to its container so it stays pixel-crisp at every width

UI recreations (fictional data, HTML/CSS):
- Hub: `HubHome`, `HubBefore` (the 16-item first version), `CommandPalette`, `CheckIn`,
  `ChatChannel`, `GoalsScorecard`, `Directory`, `AskHub`, `MobileTabBar`, `ScatteredTools`
- Channel portal: `PartnerDashboard`, `DealRegistration`, `DealThread`, `AssetLibrary`,
  `FigmaBoard` (the eight-page concept)
- Pilot support: `PilotTimeline`
- Investor: `InvestorSignIn`

Diagrams (responsive HTML, one visual system; vertical on phones):
- `EcosystemDiagram` – hub at the centre, three portals via API keys + webhooks, Entra ID for
  identity, Supabase/Vercel underneath
- `SignInFlow` – Microsoft sign-in with magic-link fallback, allowlist gate
- `IsolationDiagram` – row-level security: partner accounts see their own deals, admin sees all
- `B2BFlow` – partner sign-in via Entra ID B2B and NextAuth v5 into row-level security

## Confidentiality rules applied

No real URLs, domains, repo names, tenants, endpoints, or real people/partners/customers/investors.
Fictional names only (Northwind Security, Halcyon IT, Brightline MSP, invented people). Security
described at pattern level. Only facts from the brief; no invented metrics or dates.
