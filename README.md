# Drake Bellisari — Portfolio

Personal portfolio site. React 19 on Create React App, Tailwind for utility styling,
plain CSS for the hero and nav choreography. No animation libraries: every effect
is CSS transitions driven by a handful of small hooks.

## Scripts

| Command          | What it does                                              |
| ---------------- | --------------------------------------------------------- |
| `npm start`      | Dev server on http://localhost:3000                       |
| `npm run build`  | Production build into `build/`                            |
| `npm test`       | Jest + Testing Library smoke test                         |
| `npm run media`  | Regenerates every optimized asset in `public/media`       |

## Layout

```
src/
  App.jsx            Stateless page shell: Nav + sections + Footer
  sections/          One file per section of the page
  components/        Reveal, SmartVideo, Picture, Typewriter
  hooks/             useInView, usePrefersReducedMotion
  lib/               observe (IntersectionObserver wrapper), scroll, contact (Formspree)
  data/              Copy and media references for projects, experience, education
  styles/            globals.css, components.css, hero.css, nav.css
scripts/
  build-media.sh     ffmpeg + cwebp + fonttools pipeline (see below)
public/
  media/             Generated. Never edit by hand; run `npm run media`.
  fonts/             Generated WOFF2 subsets of DM Serif Text.
  *.mp4, *.png, ...  Source assets the pipeline reads from.
```

## How the page stays fast

- **Hero video** is served as a 0.7x motion-interpolated encode (VP9 first, H.264
  fallback) at roughly a quarter of the original size. Its poster is the exact
  first frame and is preloaded from `index.html`, so the hero paints before the
  JavaScript bundle is parsed, and the video crossfades in once frames are
  actually rendering.
- **`SmartVideo`** only plays while on screen and, for project clips, does not
  download until it is near the viewport. Reduced-motion and data-saver users get
  the poster only.
- **Section backgrounds** have their blur/brightness baked into the pixels at
  build time instead of running CSS `filter` at paint time.
- **Nothing re-renders on scroll.** The hero animation writes to the DOM inside a
  single `requestAnimationFrame` per frame; the nav tracks the active section with
  an `IntersectionObserver`.
- **The contact terminal** boots when it scrolls into view and never moves
  keyboard focus until the visitor clicks into it, so the page can never be
  yanked down to the form.

## Media pipeline

`scripts/build-media.sh` needs `ffmpeg` (with libx264 and libvpx-vp9) and `cwebp`;
the font step additionally needs `pyftsubset` from `pip install fonttools brotli`.
Run one group with `./scripts/build-media.sh hero|projects|backgrounds|fonts`.
