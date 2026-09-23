import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { roles } from '../data/experience';
import '../styles/experience.css';

// ── Time scale ────────────────────────────────────────────────────────────────
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const monthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};
const today = new Date();
const NOW = today.getFullYear() * 12 + today.getMonth();
const STATIONS = roles.map((r) => monthIndex(r.start));
const TOP = NOW + 3; // ruler runs a little past today…
const BOTTOM = Math.min(...STATIONS) - 9; // …and below the first role

// ── Drum geometry ─────────────────────────────────────────────────────────────
const FACE_ANGLE = 38; // degrees between station cards on the drum
const FACE_GAP = 18; // px of air between neighbouring cards at the rim
const MONTH_ANGLE = 5.2; // degrees per month on the date drum
const DATE_RADIUS = 330;
const PITCH = Math.round(DATE_RADIUS * ((MONTH_ANGLE * Math.PI) / 180)); // px
const STEP_VH = 75; // scroll distance between stations
const ENTRY = 0.9; // how far below station 1 the drum starts as the section arrives

// ── Spring (mass 1): slightly under-damped so a drum overshoots a hair and settles ──
const STIFFNESS = 140;
const DAMPING = 2 * 0.74 * Math.sqrt(STIFFNESS);

const TICKS = [];
for (let m = TOP; m >= BOTTOM; m -= 1) {
  TICKS.push({
    m,
    k: TOP - m,
    kind: m % 12 === 0 ? 'year' : m % 3 === 0 ? 'quarter' : 'month',
    station: STATIONS.includes(m),
  });
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/** Month under the needle for a (fractional) station position. */
function monthAt(s) {
  if (s <= 0) return STATIONS[0] + (TOP - 1 - STATIONS[0]) * clamp(-s / ENTRY, 0, 1);
  const last = STATIONS.length - 1;
  if (s >= last) return STATIONS[last];
  const i = Math.floor(s);
  return STATIONS[i] + (STATIONS[i + 1] - STATIONS[i]) * (s - i);
}

const faceRadius = (h) => (h / 2 + FACE_GAP) / Math.tan(((FACE_ANGLE / 2) * Math.PI) / 180);

function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on));
  }, [query]);
  return match;
}

// Vertical padding + borders of .xp-card, added to the tallest body to size the drum faces.
const CARD_CHROME = 30 + 34 + 2;

function Card({ role, index, bodyRef }) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <article className="xp-card">
      <span className="xp-card__grille" aria-hidden="true" />
      <img className="xp-card__logo" src={role.logo} alt="" loading="lazy" decoding="async" />
      <div ref={bodyRef} className="xp-card__body">
        {/* Printed dial scale: the blue pointer marks where this station sits on the band. */}
        <div className="xp-card__band" aria-hidden="true">
          <span className="xp-card__index">
            STN {pad(index + 1)}
            <span className="xp-card__of">/{pad(roles.length)}</span>
          </span>
          <span className="xp-card__scale" style={{ '--pos': `${(index / (roles.length - 1)) * 100}%` }}>
            <span className="xp-card__pointer" />
          </span>
          <span className="xp-card__freq">
            {MONTHS[monthIndex(role.start) % 12]} {role.start.slice(0, 4)}
          </span>
        </div>
        <div className="xp-card__head">
          <h3 className="xp-card__title">{role.title}</h3>
          <p className="xp-card__meta">
            <strong>{role.employer}</strong>
            <span aria-hidden="true"> · </span>
            {role.meta}
          </p>
        </div>
        <p className="xp-card__text">{role.body}</p>
        <ul className="xp-card__tags" aria-label="Technologies">
          {role.tags.map((tag) => (
            <li key={tag} className="xp-key">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Heading() {
  return (
    <Reveal>
      <h2 className="xp-heading display-heading display-heading-outline text-4xl sm:text-5xl text-center">Work Experience</h2>
    </Reveal>
  );
}

/** Phones, short screens and reduced motion: the same cards in a plain column. */
function ListLayout() {
  return (
    <div className="xp-list relative z-10 max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <Heading />
      </div>
      <div className="relative pl-7 sm:pl-9">
        <span className="xp-list-rail" aria-hidden="true" />
        <ol className="list-none m-0 p-0 space-y-8">
          {roles.map((role, i) => (
            <li key={role.id} className="relative">
              <span className="xp-list-dot" style={{ left: 'calc(-1 * (1.75rem + 5px))' }} aria-hidden="true" />
              <span className="xp-list-date" aria-hidden="true">
                {MONTHS[monthIndex(role.start) % 12]} {role.start.slice(0, 4)}
              </span>
              <Reveal className="xp-roll">
                <Card role={role} index={i} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function TunerLayout() {
  const sectionRef = useRef(null);
  const faceDrumRef = useRef(null);
  const dateDrumRef = useRef(null);
  const fillRef = useRef(null);
  const faceRefs = useRef([]);
  const bodyRefs = useRef([]);
  const presetRefs = useRef([]);
  const [faceH, setFaceH] = useState(480);
  const [nearRef, nearby] = useInView({ rootMargin: '900px 0px', once: true });

  const setSection = (el) => {
    sectionRef.current = el;
    nearRef.current = el;
  };

  // Every card gets the height of the tallest one so the drum is a true polygon.
  useLayoutEffect(() => {
    const measure = () => {
      const tallest = Math.max(...bodyRefs.current.filter(Boolean).map((b) => b.offsetHeight));
      if (Number.isFinite(tallest)) setFaceH(Math.ceil(tallest + CARD_CHROME));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    bodyRefs.current.filter(Boolean).forEach((b) => ro.observe(b));
    return () => ro.disconnect();
  }, []);

  const R = faceRadius(faceH);

  // Paint one frame of the tuner for station position `s`.
  const paintRef = useRef(null);
  paintRef.current = (s) => {
    const faceDrum = faceDrumRef.current;
    const dateDrum = dateDrumRef.current;
    if (!faceDrum || !dateDrum) return;
    faceDrum.style.transform = `translate3d(0,0,${-R}px) rotateX(${s * FACE_ANGLE}deg)`;
    faceRefs.current.forEach((face, i) => {
      if (!face) return;
      const d = Math.abs(i - s);
      face.style.opacity = d > 1.6 ? '0' : String(clamp(1 - d * 0.45, 0, 1));
      face.style.visibility = d > 1.6 ? 'hidden' : 'visible';
      face.style.pointerEvents = d < 0.5 ? 'auto' : 'none';
      const shade = face.firstChild;
      if (shade) {
        shade.style.opacity = String(clamp(Math.sin(Math.min(d, 1.6) * ((FACE_ANGLE * Math.PI) / 180)) * 1.6, 0, 0.85));
        shade.className = `xp-shade${i > s ? ' xp-shade--below' : ''}`;
      }
    });
    const month = monthAt(s);
    dateDrum.style.transform = `translate3d(0,0,${-DATE_RADIUS}px) rotateX(${(TOP - month) * MONTH_ANGLE}deg)`;
    const last = roles.length - 1;
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${clamp(s / last, 0, 1)})`;
    presetRefs.current.forEach((p, i) => {
      if (!p) return;
      p.classList.toggle('is-on', Math.abs(i - s) < 0.5);
      p.classList.toggle('is-passed', s > i + 0.5);
    });
  };

  // Static first paint (before GSAP arrives): the drum parked a little below station one.
  useLayoutEffect(() => {
    paintRef.current(-ENTRY);
  }, [faceH]);

  useEffect(() => {
    if (!nearby) return undefined;
    let cancelled = false;
    let teardown = () => {};

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const last = roles.length - 1;

        // Where scrolling says the drum should be: a pre-roll while the section
        // rises into view, then one station per STEP_VH of scroll.
        const target = () => {
          const top = section.getBoundingClientRect().top;
          if (top > 0) return -ENTRY * clamp(top / window.innerHeight, 0, 1);
          const travel = section.offsetHeight - window.innerHeight;
          return clamp((-top / (travel || 1)) * last, 0, last);
        };

        // Physics: a damped spring pulls the drum toward the scroll target, so it
        // has mass. Semi-implicit Euler in fixed 1/120 s substeps stays stable
        // at any frame rate.
        let x = target();
        let v = 0;
        let visible = true;
        const tick = (_time, deltaMs) => {
          if (!visible) return;
          let dt = Math.min(deltaMs / 1000, 1 / 20);
          const goal = target();
          if (Math.abs(goal - x) < 0.0004 && Math.abs(v) < 0.0004) {
            if (x !== goal) paintRef.current((x = goal));
            v = 0;
            return;
          }
          while (dt > 0) {
            const h = Math.min(dt, 1 / 120);
            v += (-STIFFNESS * (x - goal) - DAMPING * v) * h;
            x += v * h;
            dt -= h;
          }
          paintRef.current(x);
        };
        gsap.ticker.add(tick);
        paintRef.current(x);

        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        io.observe(section);

        // Detents: when scrolling stops between stations, ease onto the nearest one.
        const snap = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          snap: { snapTo: 1 / last, duration: { min: 0.25, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
        });

        teardown = () => {
          gsap.ticker.remove(tick);
          io.disconnect();
          snap.kill();
        };
      })
      .catch(() => {
        // Without GSAP the tuner still reads: it just sits on station one.
        paintRef.current(0);
      });

    return () => {
      cancelled = true;
      teardown();
    };
  }, [nearby]);

  const goTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + (travel * i) / (roles.length - 1);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div ref={setSection} className="relative" style={{ height: `calc(100vh + ${(roles.length - 1) * STEP_VH}vh)` }}>
      <div className="xp-stage">
        <div className="pt-12 pb-2 relative z-10">
          <Heading />
        </div>

        <div className="xp-tuner">
          <div className="xp-needle" aria-hidden="true">
            <svg viewBox="0 0 90 14" preserveAspectRatio="none">
              {/* blade: a hair at the tip, widening toward the hub */}
              <path d="M0 7 L68 4.2 L68 9.8 Z" fill="#111" />
              <circle cx="76" cy="7" r="6.2" fill="#fbfaf7" stroke="#2563eb" strokeWidth="2" />
              <circle cx="76" cy="7" r="2" fill="#111" />
            </svg>
          </div>

          {/* Date drum */}
          <div className="xp-window" aria-hidden="true">
            <div ref={dateDrumRef} className="xp-drum" style={{ '--pitch': `${PITCH}px` }}>
              {TICKS.map((t) => (
                <span
                  key={t.m}
                  className={`xp-tick xp-tick--${t.kind}${t.station ? ' xp-tick--station' : ''}`}
                  style={{ transform: `rotateX(${-t.k * MONTH_ANGLE}deg) translate3d(0,0,${DATE_RADIUS}px)` }}
                >
                  {t.kind !== 'year' && (t.kind === 'quarter' || t.station) && <span className="xp-tick__month">{MONTHS[t.m % 12]}</span>}
                </span>
              ))}
              {TICKS.filter((t) => t.kind === 'year').map((t) => (
                <span key={`y${t.m}`} className="xp-year" style={{ transform: `rotateX(${-t.k * MONTH_ANGLE}deg) translate3d(0,0,${DATE_RADIUS}px)` }}>
                  {t.m / 12}
                </span>
              ))}
            </div>
          </div>

          {/* Station presets */}
          <div className="xp-presets">
            <div className="xp-presets__track">
              <span ref={fillRef} className="xp-presets__fill" />
              {roles.map((role, i) => (
                <button
                  key={role.id}
                  ref={(el) => {
                    presetRefs.current[i] = el;
                  }}
                  type="button"
                  className="xp-preset"
                  style={{ top: `${(i / (roles.length - 1)) * 100}%` }}
                  onClick={() => goTo(i)}
                  aria-label={`${role.title}, ${role.employer}`}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          {/* Station drum */}
          <div className="xp-window" style={{ '--face-h': `${faceH}px` }}>
            <ol ref={faceDrumRef} className="xp-drum list-none m-0 p-0">
              {roles.map((role, i) => (
                <li
                  key={role.id}
                  ref={(el) => {
                    faceRefs.current[i] = el;
                  }}
                  className="xp-face"
                  style={{ transform: `rotateX(${-i * FACE_ANGLE}deg) translate3d(0,0,${R}px)` }}
                >
                  <span className="xp-shade" aria-hidden="true" />
                  <Card
                    role={role}
                    index={i}
                    bodyRef={(el) => {
                      bodyRefs.current[i] = el;
                    }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const reducedMotion = usePrefersReducedMotion();
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 680px)');
  return (
    <section id="experience" className="xp">
      {roomy && !reducedMotion ? <TunerLayout /> : <ListLayout />}
    </section>
  );
}
