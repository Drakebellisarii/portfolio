import React, { useEffect, useRef, useState } from 'react';
import SmartVideo from '../components/SmartVideo';
import Typewriter from '../components/Typewriter';
import { observe } from '../lib/observe';
import '../styles/hero.css';

const STORY = ['Scroll down to meet me.'];
const CITIES = ['Columbus, OH', 'Hartford, CT', 'New York City, NY'];
const FIRST_NAME = 'DRAKE'.split('');
const LAST_NAME = 'BELLISARI'.split('');

const HERO_SOURCES = [
  { src: '/media/hero/hero.webm', type: 'video/webm' },
  { src: '/media/hero/hero.mp4', type: 'video/mp4' },
];

// Scroll choreography, as fractions of the hero's 120vh of scroll travel.
const TIMING = {
  promptFade: 0.03,
  first: { start: 0.03, step: 0.045 },
  last: { start: 0.25, step: 0.04 },
  bio: [0.52, 0.67],
  meta: [0.7, 0.88],
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ramp = (p, [from, to]) => clamp01((p - from) / (to - from));

export default function Hero({ onContact }) {
  const sectionRef = useRef(null);
  const promptRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const bioRef = useRef(null);
  const metaRef = useRef(null);

  // Flips once, the first time the location/socials block appears, so the city
  // typewriter starts when it can actually be seen rather than at page load.
  const [metaLive, setMetaLive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const prompt = promptRef.current;
    const bio = bioRef.current;
    const meta = metaRef.current;
    const first = Array.from(firstRef.current.children);
    const last = Array.from(lastRef.current.children);

    let onScreen = true;
    let queued = false;
    let lastProgress = -1;

    // One rAF-batched pass per frame. Writes straight to the DOM: React never
    // re-renders on scroll.
    const paint = () => {
      queued = false;
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? clamp01(window.scrollY / travel) : 0;
      if (p === lastProgress) return;
      lastProgress = p;

      const promptOpacity = clamp01(1 - p / TIMING.promptFade);
      prompt.style.opacity = promptOpacity;
      prompt.style.transform = `translate3d(0, ${-12 * (1 - promptOpacity)}px, 0)`;
      prompt.style.visibility = promptOpacity === 0 ? 'hidden' : 'visible';

      first.forEach((el, i) => el.classList.toggle('is-in', p >= TIMING.first.start + i * TIMING.first.step));
      last.forEach((el, i) => el.classList.toggle('is-in', p >= TIMING.last.start + i * TIMING.last.step));

      const bioP = ramp(p, TIMING.bio);
      bio.style.opacity = bioP;
      bio.style.transform = `translate3d(0, ${20 * (1 - bioP)}px, 0)`;

      const metaP = ramp(p, TIMING.meta);
      meta.style.opacity = metaP;
      meta.style.transform = `translate3d(0, ${16 * (1 - metaP)}px, 0)`;
      // Invisible controls must never be clickable: an unseen Contact button in
      // this block is what used to fling stray taps straight to the form.
      meta.classList.toggle('is-live', metaP > 0);
      if (metaP > 0) setMetaLive(true);
    };

    const schedule = () => {
      if (!onScreen || queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };
    const onResize = () => {
      lastProgress = -1;
      schedule();
    };

    // Only track scroll while the hero is on screen.
    const stop = observe(section, (visible) => {
      onScreen = visible;
      if (visible) schedule();
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    paint();

    return () => {
      stop();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="hero" aria-label="Introduction">
      <div className="hero__viewport">
        <div className="hero__backdrop" aria-hidden="true">
          <SmartVideo
            className="hero__media"
            sources={HERO_SOURCES}
            poster="/media/hero/poster.jpg"
            preload="auto"
            priority
            rootMargin="0px"
          />
          <div className="hero__tint" />
          <div className="hero__fade" />
        </div>

        <div className="hero__watermark" aria-hidden="true">
          DEVELOPER
        </div>

        <div ref={promptRef} className="hero__prompt">
          <p>
            <Typewriter phrases={STORY} typeSpeed={55} />
          </p>
        </div>

        <div className="hero__content">
          <h1 className="hero__name" aria-label="Drake Bellisari">
            <span ref={firstRef} className="hero__line" aria-hidden="true">
              {FIRST_NAME.map((letter, i) => (
                <span key={i} className="hero__letter">{letter}</span>
              ))}
            </span>
            <span ref={lastRef} className="hero__line hero__line--outline" aria-hidden="true">
              {LAST_NAME.map((letter, i) => (
                <span key={i} className="hero__letter">{letter}</span>
              ))}
            </span>
          </h1>

          <p ref={bioRef} className="hero__bio">
            Most of what I build starts as a note on my phone that made more sense at 2 a.m. The few
            that still make sense in the morning are the ones I build, and turning them into real
            software is what I've spent the last eight years learning to do. It started with tinkering
            in middle school, got serious in high school, and led me to Trinity College, where I just
            graduated with a B.S. in Computer Science and an experiential certificate in cybersecurity.
            Somewhere along the way, I found where I like to work: the seam between creativity and
            code. The tools keep getting smarter, and I'm glad they do. But the imagining is the one
            part I won't hand off. It's what makes software feel like someone made it for you. Say
            hello; I'd love to hear what you're working on.
          </p>

          <div ref={metaRef} className="hero__meta">
            <div className="hero__location">
              <Typewriter phrases={CITIES} active={metaLive} typeSpeed={65} deleteSpeed={32} holdMs={1100} />
            </div>

            <div className="hero__actions">
              <a
                href="https://www.linkedin.com/in/drake-bellisari/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social hero__social--linkedin"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="hero__social-label">LinkedIn</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href="https://github.com/DrakeBellisarii"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span className="hero__social-label">GitHub</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <button type="button" onClick={onContact} className="hero__social">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="hero__social-label">Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
