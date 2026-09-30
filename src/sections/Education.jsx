import React, { useEffect, useRef, useState } from 'react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { observe } from '../lib/observe';
import { disciplines, achievements } from '../data/education';
import '../styles/education.css';

// Phones get the portrait painting; keep in step with src/styles/education.css.
const PHONE = '(max-width: 767px)';
const BACKDROP_SOURCES = [
  { media: PHONE, type: 'image/webp', srcSet: '/media/backgrounds/trinity-watercolor-mobile.webp' },
  { media: PHONE, srcSet: '/media/backgrounds/trinity-watercolor-mobile.jpg' },
];

const COURSES = disciplines.flatMap((d, di) => d.courses.map((c) => ({ ...c, discipline: di })));

const Dot = () => <span className="edu-dot" aria-hidden="true" />;

/**
 * The painting drifts a little slower than the page, so the type seems to sit
 * in front of it. Transform only, and only while the section is on screen.
 */
function useDrift(sectionRef, layerRef, off) {
  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (off || !section || !layer) return undefined;
    let raf = 0;
    let onScreen = false;
    const paint = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 as it enters, 1 as it leaves
      layer.style.transform = `translate3d(0, ${((p - 0.5) * -7).toFixed(2)}%, 0)`;
    };
    const schedule = () => {
      if (onScreen && !raf) raf = requestAnimationFrame(paint);
    };
    const stop = observe(section, (visible) => {
      onScreen = visible;
      schedule();
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      stop();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      layer.style.transform = '';
    };
  }, [sectionRef, layerRef, off]);
}

export default function Education() {
  const [active, setActive] = useState(COURSES[0].id);
  const sectionRef = useRef(null);
  const driftRef = useRef(null);
  const backdropRef = useRef(null);
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  useDrift(sectionRef, driftRef, reducedMotion);

  // Covers a painting that was already cached and decoded before React listened for it.
  useEffect(() => {
    const img = backdropRef.current;
    if (img && img.complete && img.naturalWidth) setBackdropLoaded(true);
  }, []);

  const course = COURSES.find((c) => c.id === active);

  return (
    <section ref={sectionRef} id="education" className="edu">
      {/* Watercolour of the Long Walk, dimmed at build time rather than with CSS filters.
          A blurred copy holds its place (see education.css) until it fades in. */}
      <div className="edu-bg" aria-hidden="true">
        <div ref={driftRef} className="edu-bg__drift">
          <Picture
            ref={backdropRef}
            sources={BACKDROP_SOURCES}
            webp="/media/backgrounds/trinity-watercolor.webp"
            src="/media/backgrounds/trinity-watercolor.jpg"
            className={`edu-bg__img${backdropLoaded ? ' is-loaded' : ''}`}
            onLoad={() => setBackdropLoaded(true)}
          />
        </div>
      </div>
      <div className="edu-scrim" aria-hidden="true" />

      <div className="edu-inner">
        {/* The college */}
        <Reveal className="edu-mark">
          <img className="edu-seal" src="/media/education/trinity-seal.webp" alt="" width="85" height="92" loading="lazy" decoding="async" />
          <p className="edu-place edu-sc">Hartford, Connecticut</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="edu-name">
            <span className="sr-only">Education: </span>Trinity College
          </h2>
        </Reveal>
        <Reveal delay={160} className="edu-degree">
          <span>
            <span className="edu-sc">B.S.</span> Computer Science
          </span>
          <Dot />
          <span className="edu-sc">Graduated May 2026</span>
        </Reveal>
        <Reveal delay={220}>
          <ul className="edu-honours" aria-label="Distinctions">
            {achievements.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </Reveal>

        {/* The coursework: a column to each discipline, and the chosen course's
            description in a caption beneath them. */}
        <Reveal delay={120} className="edu-study" style={{ '--caption-row': course.discipline * 2 + 2 }}>
          <h3 className="sr-only">Coursework</h3>
          {disciplines.map((d, di) => (
            <div key={d.label} className="edu-subject" style={{ '--row': di * 2 + 1 }}>
              <h4 className="edu-subject__name">{d.label}</h4>
              <ul className="edu-subject__courses">
                {d.courses.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="edu-course"
                      aria-pressed={c.id === active}
                      aria-controls="edu-caption"
                      onClick={() => setActive(c.id)}
                      onFocus={() => setActive(c.id)}
                      onMouseEnter={() => setActive(c.id)}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p id="edu-caption" className="edu-caption" aria-live="polite">
            <span key={course.id} className="edu-caption__text">
              <span className="edu-caption__name">{course.name}</span>
              <Dot />
              {course.detail}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
