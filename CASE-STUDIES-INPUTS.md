# What to gather from the portals

Everything on the case study pages today comes from the original brief. Each item below would
let a chapter state something more specific. Gather what you can; skip anything you are unsure
about sharing. Nothing here needs a real name, URL, customer, partner or document.

**Ground rules while gathering**
- Numbers can be rounded or given as ranges ("about 40", "under a second"). Say which.
- For screens, a screenshot *for me to recreate from* is fine; it never goes on the site.
  Blur or crop names, emails, company names and deal values before sending.
- For code, describe the pattern or paste a trimmed, renamed snippet. No keys, URLs, tenant IDs.
- If a fact needs sign-off from Queralt, note "needs approval" next to it.

## Queralt Hub

Usage and scope
- [ ] How many people have signed in at least once, and roughly how many use it on a given day
- [ ] Share of use on phone vs. desktop, if the analytics show it
- [ ] Whether Teams chat is still used internally, less used, or fully replaced
- [ ] How long the build took: first commit to first company-wide use (month is enough)

The redesign
- [ ] The actual list of 16 sidebar items in version one, and the 8 after
- [ ] The discovery method: who you talked to (roles only), how many people, and the three or
      four findings that changed the design
- [ ] The role-based Home defaults: which roles exist and what each sees first
- [ ] Screenshots of version one and the current Home (for recreation only)

Features
- [ ] Check-ins: how often updates are requested, and whether status timelines replaced a meeting
      or a status email
- [ ] Which portal events create notifications (deal registered, ticket filed, others)
- [ ] Document library: where files come from (uploads, SharePoint, Drive) and how many
- [ ] Assistant: whether it is switched on today, and what people mostly ask it

Engineering
- [ ] Number of database tables and whether row-level security is on every table
- [ ] How the outbox works in one sentence: retries, backoff, how failures surface
- [ ] How Entra ID directory sync runs (on sign-in, on a schedule, or both)
- [ ] Anything you measured: page load, time to first message, notification delay

## Pilot Support Portal

- [ ] Number of pilot organizations or users invited (a range is fine)
- [ ] Number of entries filed, split roughly by bug / error / feedback
- [ ] What happens after an entry is filed: who sees it and how fast
- [ ] The audit fix: when it was found, how (code review, test, pen test) and what the check was
      moved from and to, described at the pattern level

## Channel Sales Portal

- [ ] Number of partner organizations onboarded or invited, and deals registered (ranges fine)
- [ ] Which of the eight Figma pages were built and which remain designs
- [ ] What the two-day MVP included, and what was added during hardening
- [ ] How cross-account isolation testing was done (manual, scripted, how many cases)
- [ ] The HubSpot integration design: which objects sync and in which direction
- [ ] What the security review required, at the level of principles (for example "data must stay
      in a Microsoft tenant" or "no third-party identity provider")
- [ ] Screenshots of the dashboard, deal form and asset library (for recreation only)

## Investor Portal

- [ ] What investors could see: update types and material types, not the content itself
- [ ] How long the first version ran before the rebuild decision
- [ ] What drove the rebuild: which compliance or audit control, in general terms
- [ ] Rebuild status: in progress, launched, or planned

## Across all three

- [ ] Rough dates: internship start, investor portal launch, move to engineer, each later
      platform. A month and year is enough and would let the series show a timeline.
- [ ] One thing you would do differently on each project
- [ ] Any feedback from coworkers or partners you are comfortable paraphrasing without names
- [ ] Whether Queralt is comfortable being named, and whether its logo may appear on these pages
