# Case studies self-review

Pages reviewed at 375, 768 and 1440px in headless Chromium (full-page and viewport captures, looked at
directly), plus Lighthouse 12.8 mobile runs against a local server configured like Vercel (gzip,
immutable caching for hashed assets, no trailing-slash redirects).

Rubric: Story · Editorial design · Technical credibility · Visual craft · Consistency with the site ·
Responsiveness/mobile · Accessibility & performance · Confidentiality & accuracy (must be 10).

## Round 1

| Page | Story | Editorial | Tech | Visual | Consistency | Mobile | A11y/Perf | Accuracy |
|---|---|---|---|---|---|---|---|---|
| Series | 8 | 8 | 8 | 7 | 8 | 6 | 7 | 10 |
| Hub | 8 | 7 | 8 | 7 | 8 | 6 | 7 | 9 |
| Channel | 8 | 7 | 8 | 7 | 8 | 6 | 7 | 9 |
| Investor | 8 | 8 | 8 | 8 | 8 | 7 | 7 | 10 |

- Mobile 6: 285px horizontal overflow at 375px (diagram min-width inflating grid tracks); UI recreations scaled to ~30%, unreadable.
- Visual 7: flipped chapters put the recreation in the narrow column; the magic-link label spilled out of its node.
- Editorial 7: side-by-side headlines too large for their column (five ragged lines); hero shot clipped at the section edge; doubled padding between same-tone chapters.
- Accuracy 9 (Hub): "every one of them a daily user", "names, titles and teams", "never more than a click from the thread" overreached the brief. Channel: a decisions card labelled a fact as a "Decision". Earlier in the build the architecture diagram also claimed "row-level security on every table" for the hub and named a provider for the magic-link path; both removed before review.
- A11y/Perf 7: Lighthouse mobile performance 79–87; blue labels on paper at 4.49:1; faint greys inside recreations; site footer grey at 3.66:1.

## Round 2

Fixes: min-width guards on every grid track; recreations hold a 50% legibility floor and pan in a keyboard-focusable region with a "swipe to explore" hint; flipped chapters give the visual the wide column; side-by-side headline size tuned; hero shot given room; same-tone chapters share one gap; accuracy copy rewritten to the brief; `--accent-ink` token for accent text on paper; recreation greys to AA; footer copyright to gray-400.

| Page | Story | Editorial | Tech | Visual | Consistency | Mobile | A11y/Perf | Accuracy |
|---|---|---|---|---|---|---|---|---|
| Series | 9 | 9 | 8 | 8 | 9 | 7 | 8 | 10 |
| Hub | 9 | 8 | 9 | 8 | 9 | 8 | 8 | 10 |
| Channel | 9 | 8 | 9 | 8 | 9 | 8 | 8 | 10 |
| Investor | 9 | 9 | 8 | 9 | 9 | 9 | 8 | 10 |

- Series still overflowed at 375/768 (index rows had no min-width guard).
- Performance 87–90 median: nothing painted until JavaScript rendered; the prerendered pages also inherited the home page's beach-photo placeholder.

## Round 3

Fixes: index grid guard; the case study chunk and CSS preloaded from HTML; analytics deferred to after `load`; each route now fully server-rendered at build time with the app's own components and hydrated in place (`hydrateRoot`), so the page paints from HTML and React adopts it; a pre-paint script sizes recreations for the screen so hydration changes nothing visible; home placeholder removed from case study HTML.

Lighthouse mobile (median of 3): performance 99–100 on all four pages, accessibility 100, best practices 100, SEO 100, LCP 1.8–2.0 s, CLS 0.

| Page | Story | Editorial | Tech | Visual | Consistency | Mobile | A11y/Perf | Accuracy |
|---|---|---|---|---|---|---|---|---|
| Series | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 10 |
| Hub | 9 | 9 | 9 | 9 | 9 | 8 | 10 | 10 |
| Channel | 9 | 9 | 9 | 9 | 9 | 8 | 10 | 10 |
| Investor | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 10 |

- Mobile 8: wide diagrams scrolled but their labels were ~7px on phones; next-story arrow wrapped onto its own line; one headline still five lines at 1440.

## Round 4 (final)

Fixes: the partner sign-in diagram becomes a vertical stepper on phones; other diagrams keep a legible 720px minimum with a swipe hint and focusable scroll region; next-story arrow sits inline after the last word; headline measure widened; the security-review decision reworded so the "Decision" label states an actual choice.

| Page | Story | Editorial | Tech | Visual | Consistency | Mobile | A11y/Perf | Accuracy |
|---|---|---|---|---|---|---|---|---|
| Series | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 10 |
| Hub | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 10 |
| Channel | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 10 |
| Investor | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 10 |

Every category is 9 or higher on every page; stopped after round 4.

Final checks: no horizontal overflow at any width; no console errors (including hydration); sticky redesign sequence activates each of its five steps in a real viewport; client navigation, back button, return to `/#projects`, and skip link all verified; home page regression suite and unit test pass. Lighthouse mobile final: 99–100 / 100 / 100 / 100.
