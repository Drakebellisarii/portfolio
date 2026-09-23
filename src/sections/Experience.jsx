import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { observe } from '../lib/observe';
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

// Each role is a band on the dial, like the band markings on a shortwave set:
// start to end month, inclusive; a current role runs to today. Bands that share
// a month take separate lanes.
const BANDS = [];
roles.forEach((r, i) => {
  const band = { role: i, from: monthIndex(r.start), to: r.end ? monthIndex(r.end) : NOW };
  const taken = new Set(BANDS.filter((o) => o.from <= band.to && band.from <= o.to).map((o) => o.lane));
  let lane = 0;
  while (taken.has(lane)) lane += 1;
  BANDS.push({ ...band, lane });
});
// A station is tuned at the middle of its band, as a radio is tuned into a band
// rather than onto its edge.
const STATIONS = BANDS.map((b) => (b.from + b.to) / 2);
const TOP = NOW + 3; // ruler runs a little past today…
const BOTTOM = Math.min(...BANDS.map((b) => b.from)) - 9; // …and below the first role

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
    bands: BANDS.filter((b) => m >= b.from && m <= b.to).map((b) => ({ ...b, first: m === b.from, last: m === b.to })),
  });
}

// ── Pocket tuner (phones, tablets, short screens) ────────────────────────────
// A portrait screen can't hold a drum of full cards, so the tuner splits in two:
// a faceplate docked to the top carries the date drum, turned on its side like a
// car radio's dial, and the station log scrolls natively beneath it. The page
// itself becomes the second drum: cards roll up over its lower edge and wind
// away under the faceplate, 1:1 with the thumb.
const DIAL_PITCH = 25; // px per month at the front of the dial drum
const LOCK_GAP = 40; // px between the docked faceplate and a tuned card's top edge
const ENTER_BAND = 0.36; // share of the log view over which a card rolls up into place
const EXIT_BAND = 0.2; // …and over which it winds away under the faceplate
const ENTER_TILT = 30; // degrees
const EXIT_TILT = 34;
const BARS = [0, 1, 2, 3, 4];

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const smooth = (t) => t * t * (3 - 2 * t);
const pad = (n) => String(n).padStart(2, '0');

/** Month label on the pocket dial: quarters only; a year is named by the figure beside its tick. */
function dialLabel(t) {
  return t.kind === 'quarter' ? MONTHS[t.m % 12] : null;
}

/**
 * One month's slice of each band running through it. Slices sit edge to edge on
 * the drum, so together they draw a continuous engraved bracket; the ends carry
 * the bracket's short arms. The tuned role's band is lit.
 */
function BandMarks({ bands }) {
  return bands.map((b) => (
    <span
      key={b.role}
      data-role={b.role}
      className={`xp-band xp-band--lane${b.lane}${b.first ? ' xp-band--from' : ''}${b.last ? ' xp-band--to' : ''}`}
    />
  ));
}

/** Light the tuned role's band (or none, with -1). */
function lightBand(root, role) {
  if (!root) return;
  root.querySelectorAll('.xp-band').forEach((el) => el.classList.toggle('is-lit', Number(el.dataset.role) === role));
}

/**
 * Station position for a month on the pocket dial, the inverse of pocketMonth:
 * -1…0 over the pre-roll above the first station, then fractional stations.
 */
function stationAt(month) {
  if (month > STATIONS[0]) return -clamp((month - STATIONS[0]) / (TOP - 1 - STATIONS[0]), 0, 1);
  for (let i = 0; i < STATIONS.length - 1; i += 1) {
    if (month >= STATIONS[i + 1]) return i + (STATIONS[i] - month) / (STATIONS[i] - STATIONS[i + 1]);
  }
  return STATIONS.length - 1;
}

/** Month under the needle for a (fractional) station position. */
function monthAt(s) {
  if (s <= 0) return STATIONS[0] + (TOP - 1 - STATIONS[0]) * clamp(-s / ENTRY, 0, 1);
  const last = STATIONS.length - 1;
  if (s >= last) return STATIONS[last];
  const i = Math.floor(s);
  return STATIONS[i] + (STATIONS[i + 1] - STATIONS[i]) * (s - i);
}

/** The pocket dial pre-rolls over its whole -1…0 range rather than ENTRY of it. */
const pocketMonth = (s) => monthAt(s < 0 ? s * ENTRY : s);

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

// Vertical padding + borders of a desktop .xp-card--plain, added to the tallest body to size the drum faces.
const CARD_CHROME = 36 + 36 + 2;

/**
 * A role's card. On the phone it carries a station band (index, scale and date)
 * because its dial sits apart from the log; on desktop the dial beside the drum
 * already says all that, so `band={false}` opens the card straight on the title.
 */
function Card({ role, index, bodyRef, band = true }) {
  const logo = <img className="xp-card__logo" src={role.logo} alt="" loading="lazy" decoding="async" />;
  const tags = (
    <ul className="xp-card__tags" aria-label="Technologies">
      {role.tags.map((tag) => (
        <li key={tag} className="xp-key">
          {tag}
        </li>
      ))}
    </ul>
  );
  return (
    <article className={`xp-card${band ? '' : ' xp-card--plain'}`}>
      <span className="xp-card__grille" aria-hidden="true" />
      {band && logo}
      <div ref={bodyRef} className="xp-card__body">
        {band && (
          // Printed dial scale: the blue pointer marks where this station sits on the band.
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
        )}
        <div className="xp-card__head">
          <h3 className="xp-card__title">{role.title}</h3>
          <p className="xp-card__meta">
            <strong>{role.employer}</strong>
            <span aria-hidden="true"> · </span>
            {role.meta}
          </p>
        </div>
        <p className="xp-card__text">{role.body}</p>
        {band ? (
          tags
        ) : (
          <div className="xp-card__foot">
            {tags}
            {logo}
          </div>
        )}
      </div>
    </article>
  );
}

function Heading() {
  return (
    <Reveal>
      <h2 className="xp-heading display-heading display-heading-outline text-3xl sm:text-4xl text-left">Work Experience</h2>
    </Reveal>
  );
}

/**
 * Phones, tablets, short screens and reduced motion. With `still`, the dial
 * steps from station to station and the cards stay flat.
 */
function PocketLayout({ still }) {
  const rootRef = useRef(null);
  const plateRef = useRef(null);
  const dialRef = useRef(null);
  const tickRefs = useRef([]);
  const logRef = useRef(null);
  const itemRefs = useRef([]);
  const keyRefs = useRef([]);
  const barRefs = useRef([]);
  const tuneRef = useRef(null);
  const [radius, setRadius] = useState(240);
  const angle = (DIAL_PITCH / radius) * (180 / Math.PI); // degrees per month

  // The drum's radius follows the dial's width so its rim always spans the glass.
  useLayoutEffect(() => {
    const dial = dialRef.current;
    const measure = () => setRadius(Math.round(clamp(dial.clientWidth * 0.66, 200, 460)));
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(dial);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const plate = plateRef.current;
    const log = logRef.current;
    const ticks = tickRefs.current;
    const items = itemRefs.current;
    const keys = keyRefs.current;
    const bars = barRefs.current;
    const last = roles.length - 1;

    // Card offsets inside the log. Transforms never move them, so the curl a card
    // is given can't feed back into where the maths thinks it is.
    let offs = [];
    const measure = () => {
      offs = items.map((el) => ({ top: el.offsetTop, h: el.offsetHeight }));
    };

    // Everything a frame needs from layout, read before anything is written.
    const read = () => {
      const vh = window.innerHeight;
      const plateH = plate.offsetHeight;
      return {
        vh,
        plateH,
        view: vh - plateH,
        plateBottom: plate.getBoundingClientRect().bottom,
        logTop: log.getBoundingClientRect().top,
      };
    };

    // Where the scroll says the dial should be: -1 before the first station, then a
    // fractional station index. A station holds while its card is being read and
    // turns to the next only as that card rises the last stretch to the faceplate,
    // which is what gives the dial its detents without ever touching the scroll.
    const target = (g) => {
      let s = -1;
      for (let i = 0; i <= last; i += 1) {
        const distance = g.logTop + offs[i].top - (g.plateH + LOCK_GAP);
        const span = i === 0 ? 0.6 * g.vh : Math.min(0.6 * (offs[i].top - offs[i - 1].top), 0.42 * g.view);
        s += smooth(clamp(1 - distance / span, 0, 1));
      }
      return s;
    };

    const lens = `perspective(${radius * 3}px) translate3d(0,0,${-radius}px)`;
    const culled = [];
    const prev = { near: null, lit: null, tuned: null, curls: [] };
    const paint = (month, g) => {
      const s = stationAt(month);
      // Each tick is projected onto the drum on its own rather than inside a shared
      // preserve-3d scene, which some engines flatten; ticks past the rim are culled.
      TICKS.forEach((t, i) => {
        const el = ticks[i];
        const turn = (t.m - month) * angle;
        const hidden = Math.abs(turn) > 84;
        if (hidden !== culled[i]) {
          culled[i] = hidden;
          el.style.visibility = hidden ? 'hidden' : '';
        }
        if (!hidden) el.style.transform = `${lens} rotateY(${turn.toFixed(2)}deg) translate3d(0,0,${radius}px)`;
      });

      const near = s < -0.5 ? -1 : clamp(Math.round(s), 0, last);
      if (near !== prev.near) {
        prev.near = near;
        lightBand(dialRef.current, near);
        keys.forEach((key, i) => {
          key.classList.toggle('is-on', i === near);
          if (i === near) key.setAttribute('aria-current', 'true');
          else key.removeAttribute('aria-current');
        });
      }

      // Signal meter: discrete bars, like the LEDs on a tuner, full only on a station.
      const station = Math.max(0, Math.round(s));
      const off = Math.abs(s - station);
      const lit = Math.round(BARS.length * (1 - clamp(off * 2.4, 0, 1)));
      if (lit !== prev.lit) {
        prev.lit = lit;
        bars.forEach((bar, i) => bar.classList.toggle('is-lit', i < lit));
      }

      const tuned = off < 0.06 ? station : -1;
      if (tuned !== prev.tuned) {
        prev.tuned = tuned;
        items.forEach((el, i) => el.classList.toggle('is-tuned', i === tuned));
        plate.classList.toggle('is-locked', tuned >= 0);
      }

      items.forEach((el, i) => {
        let tilt = 0;
        if (!still) {
          const top = g.logTop + offs[i].top;
          const bottom = top + offs[i].h;
          // Angle grows linearly with distance travelled round the curve, as on a real drum.
          const enter = clamp((top - (g.vh - ENTER_BAND * g.view)) / (ENTER_BAND * g.view), 0, 1);
          const exit = clamp(1 - (bottom - g.plateBottom) / (EXIT_BAND * g.view), 0, 1);
          tilt = enter > 0 ? -ENTER_TILT * enter : EXIT_TILT * exit;
        }
        tilt = Math.round(tilt * 100) / 100;
        if (tilt === prev.curls[i]) return;
        prev.curls[i] = tilt;
        const shade = el.lastChild;
        if (!tilt) {
          el.style.transform = '';
          shade.style.opacity = '0';
          return;
        }
        // Entering, the card hinges on its top edge and its foot falls away; leaving,
        // it hinges on its foot and the top winds back under the faceplate.
        el.style.transformOrigin = tilt < 0 ? '50% 0' : '50% 100%';
        el.style.transform = `perspective(1100px) rotateX(${tilt}deg)`;
        shade.className = `xp-shade${tilt < 0 ? ' xp-shade--below' : ''}`;
        shade.style.opacity = String(tilt < 0 ? (-tilt / ENTER_TILT) * 0.3 : (tilt / EXIT_TILT) * 0.42);
      });
    };

    // Same spring as the desktop drums, integrated in fixed substeps. It acts on the
    // month under the needle, not the station index, so the drum carries its
    // momentum evenly whether the next station is one month away or twelve. The
    // loop only runs while the dial is moving: scroll wakes it, rest puts it to sleep.
    const settle = (goal) => (still ? (goal < -0.5 ? -1 : Math.round(goal)) : goal);
    let m = null; // month under the needle
    let v = 0;
    let raf = 0;
    let then = 0;
    let onScreen = true;
    let drag = null; // a finger turning the dial
    let hold = null; // a station the dial heads straight for while the page glides to it

    const frame = (now) => {
      raf = 0;
      const g = read();
      let goal = target(g);
      if (hold) {
        // Released once the scroll agrees with it, so the hand-off is seamless.
        if (Math.abs(goal - hold.station) < 0.001 || now > hold.until) hold = null;
        else goal = hold.station;
      }
      const goalMonth = pocketMonth(settle(goal));
      let dt = clamp((now - then) / 1000, 0, 1 / 20);
      then = now;
      let resting = true;
      if (drag && drag.moved) {
        m = drag.m;
        v = 0;
      } else if (m === null || still) {
        m = goalMonth;
      } else {
        while (dt > 0) {
          const h = Math.min(dt, 1 / 120);
          v += (-STIFFNESS * (m - goalMonth) - DAMPING * v) * h;
          m += v * h;
          dt -= h;
        }
        resting = Math.abs(goalMonth - m) < 0.002 && Math.abs(v) < 0.002;
        if (resting) m = goalMonth;
      }
      if (resting) v = 0;
      paint(m, g);
      if ((!resting || hold) && onScreen) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (raf || !onScreen) return;
      then = performance.now();
      raf = requestAnimationFrame(frame);
    };

    // Presets and a released dial both land here: the page glides to the card while
    // the dial swings straight to its station instead of stopping at every one between.
    tuneRef.current = (i) => {
      const top = window.scrollY + log.getBoundingClientRect().top + offs[i].top - (plate.offsetHeight + LOCK_GAP);
      hold = { station: i, until: performance.now() + 2400 };
      window.scrollTo({ top, behavior: still ? 'auto' : 'smooth' });
      wake();
    };
    // Any hand on the page takes the scroll back.
    const release = () => {
      hold = null;
    };

    // Turning the dial by hand. Vertical swipes still scroll the page (touch-action:
    // pan-y); a sideways drag spins the drum under the finger, and letting go flings
    // it on to the nearest station.
    const dial = dialRef.current;
    const onDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      hold = null;
      const m0 = clamp(m, STATIONS[last], STATIONS[0]);
      drag = { id: e.pointerId, x0: e.clientX, m0, m: m0, lx: e.clientX, lt: e.timeStamp, vx: 0, moved: false, near: Math.round(stationAt(m0)) };
    };
    const onMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      if (!drag.moved) {
        if (Math.abs(dx) < 6) return;
        drag.moved = true;
        dial.setPointerCapture(e.pointerId);
        dial.classList.add('is-turning');
      }
      const dt = e.timeStamp - drag.lt;
      if (dt > 0) drag.vx = 0.7 * ((e.clientX - drag.lx) / dt) + 0.3 * drag.vx;
      drag.lx = e.clientX;
      drag.lt = e.timeStamp;
      drag.m = clamp(drag.m0 - dx / DIAL_PITCH, STATIONS[last], STATIONS[0]);
      // A detent you can feel, where the hardware allows it.
      const at = stationAt(drag.m);
      const near = Math.round(at);
      if (near !== drag.near && Math.abs(at - near) < 0.08) {
        drag.near = near;
        const active = navigator.userActivation ? navigator.userActivation.hasBeenActive : false;
        if (active && typeof navigator.vibrate === 'function') navigator.vibrate(6);
      }
      wake();
    };
    const onUp = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const done = drag;
      drag = null;
      dial.classList.remove('is-turning');
      if (!done.moved) return;
      if (e.type === 'pointercancel') {
        wake();
        return;
      }
      // Carry the flick a little further, then settle on the station nearest the needle.
      const month = clamp(done.m - (done.vx * 160) / DIAL_PITCH, STATIONS[last], STATIONS[0]);
      let pick = 0;
      STATIONS.forEach((m, i) => {
        if (Math.abs(m - month) < Math.abs(STATIONS[pick] - month)) pick = i;
      });
      tuneRef.current(pick);
    };

    measure();
    const g = read();
    m = pocketMonth(settle(target(g)));
    paint(m, g);

    const onResize = () => {
      measure();
      wake();
    };
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('touchstart', release, { passive: true });
    dial.addEventListener('pointerdown', onDown);
    dial.addEventListener('pointermove', onMove);
    dial.addEventListener('pointerup', onUp);
    dial.addEventListener('pointercancel', onUp);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize);
    items.forEach((el) => ro && ro.observe(el));
    const stop = observe(
      root,
      (visible) => {
        onScreen = visible;
        wake();
      },
      { rootMargin: '120px 0px' },
    );

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release);
      dial.removeEventListener('pointerdown', onDown);
      dial.removeEventListener('pointermove', onMove);
      dial.removeEventListener('pointerup', onUp);
      dial.removeEventListener('pointercancel', onUp);
      if (ro) ro.disconnect();
      stop();
      tuneRef.current = null;
    };
  }, [still, radius, angle]);

  return (
    <div ref={rootRef} className="xp-pocket relative z-10">
      <div className="xp-pocket__intro">
        <Heading />
      </div>

      <div className="xp-pocket__body">
        {/* The faceplate: dial, preset keys and signal meter, docked while the log scrolls. */}
        <div ref={plateRef} className="xp-plate">
          <div className="xp-plate__inner">
            <div ref={dialRef} className="xp-dial" aria-hidden="true" style={{ '--pitch': `${DIAL_PITCH}px` }}>
              {TICKS.map((t, i) => {
                const label = dialLabel(t);
                return (
                  <span
                    key={t.m}
                    ref={(el) => {
                      tickRefs.current[i] = el;
                    }}
                    className={`xp-dtick xp-dtick--${t.kind}`}
                  >
                    <BandMarks bands={t.bands} />
                    {t.kind === 'year' && <span className="xp-dtick__year">{t.m / 12}</span>}
                    {label && <span className="xp-dtick__label">{label}</span>}
                  </span>
                );
              })}
              <svg className="xp-dial__needle" viewBox="0 0 14 28" preserveAspectRatio="none">
                {/* blade: a hair at the tip, widening toward the hub */}
                <path d="M7 0 L9.4 18 L4.6 18 Z" fill="#111" />
                <circle cx="7" cy="21" r="5.4" fill="#fbfaf7" stroke="#2563eb" strokeWidth="1.8" />
                <circle className="xp-dial__lamp" cx="7" cy="21" r="2" fill="#111" />
              </svg>
            </div>

            <div className="xp-plate__row">
              <div className="xp-plate__keys" role="group" aria-label="Jump to a role">
                {roles.map((role, i) => (
                  <button
                    key={role.id}
                    ref={(el) => {
                      keyRefs.current[i] = el;
                    }}
                    type="button"
                    className="xp-pkey"
                    onClick={() => tuneRef.current && tuneRef.current(i)}
                    aria-label={`${role.title}, ${role.employer}`}
                  >
                    {pad(i + 1)}
                  </button>
                ))}
              </div>
              <span className="xp-signal" aria-hidden="true">
                {BARS.map((b) => (
                  <i
                    key={b}
                    ref={(el) => {
                      barRefs.current[b] = el;
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        <ol ref={logRef} className="xp-log" style={{ paddingTop: LOCK_GAP }}>
          {roles.map((role, i) => (
            <li
              key={role.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="xp-log__item"
            >
              <Card role={role} index={i} />
              <span className="xp-shade" aria-hidden="true" />
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
  const litRef = useRef(null);
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
  // Bodies stretch to fill their face (the footer is pinned to its foot), so the
  // natural height is the sum of their parts: every gap inside is padding, which
  // keeps that sum exact.
  useLayoutEffect(() => {
    const bodies = bodyRefs.current.filter(Boolean);
    const natural = (b) => Array.from(b.children).reduce((h, part) => h + part.offsetHeight, 0);
    const measure = () => {
      const tallest = Math.max(...bodies.map(natural));
      if (Number.isFinite(tallest)) setFaceH(Math.ceil(tallest + CARD_CHROME));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    bodies.forEach((b) => Array.from(b.children).forEach((part) => ro.observe(part)));
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
    const tuned = s < -0.5 ? -1 : clamp(Math.round(s), 0, roles.length - 1);
    if (tuned !== litRef.current) {
      litRef.current = tuned;
      lightBand(dateDrum, tuned);
      presetRefs.current.forEach((key, i) => {
        if (!key) return;
        key.classList.toggle('is-on', i === tuned);
        if (i === tuned) key.setAttribute('aria-current', 'true');
        else key.removeAttribute('aria-current');
      });
    }
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
        <div className="xp-stage__head relative z-10">
          <Heading />
        </div>

        <div className="xp-tuner">
          <div className="xp-needle" aria-hidden="true">
            <svg viewBox="0 0 104 14" preserveAspectRatio="none">
              {/* blade: a hair at the tip, widening toward the hub */}
              <path d="M0 7 L82 4.2 L82 9.8 Z" fill="#111" />
              <circle cx="90" cy="7" r="6.2" fill="#fbfaf7" stroke="#2563eb" strokeWidth="2" />
              <circle cx="90" cy="7" r="2" fill="#111" />
            </svg>
          </div>

          {/* Date drum */}
          <div className="xp-window xp-window--dates" aria-hidden="true">
            <div ref={dateDrumRef} className="xp-drum" style={{ '--pitch': `${PITCH}px` }}>
              {TICKS.map((t) => (
                <span
                  key={t.m}
                  className={`xp-tick xp-tick--${t.kind}`}
                  style={{ transform: `rotateX(${-t.k * MONTH_ANGLE}deg) translate3d(0,0,${DATE_RADIUS}px)` }}
                >
                  <BandMarks bands={t.bands} />
                  {t.kind === 'quarter' && <span className="xp-tick__month">{MONTHS[t.m % 12]}</span>}
                </span>
              ))}
              {TICKS.filter((t) => t.kind === 'year').map((t) => (
                <span key={`y${t.m}`} className="xp-year" style={{ transform: `rotateX(${-t.k * MONTH_ANGLE}deg) translate3d(0,0,${DATE_RADIUS}px)` }}>
                  {t.m / 12}
                </span>
              ))}
            </div>
          </div>

          {/* The pointer's rail: a plain slot the needle's hub rides in. */}
          <div className="xp-presets" aria-hidden="true">
            <div className="xp-presets__track" />
          </div>

          {/* Preset keys under the dial, as on the phone faceplate. */}
          <div className="xp-bank" role="group" aria-label="Jump to a role">
            {roles.map((role, i) => (
              <button
                key={role.id}
                ref={(el) => {
                  presetRefs.current[i] = el;
                }}
                type="button"
                className="xp-pkey"
                onClick={() => goTo(i)}
                aria-label={`${role.title}, ${role.employer}`}
              >
                {pad(i + 1)}
              </button>
            ))}
          </div>

          {/* Station drum */}
          <div className="xp-window xp-window--faces" style={{ '--face-h': `${faceH}px` }}>
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
                    band={false}
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
      {roomy && !reducedMotion ? <TunerLayout /> : <PocketLayout still={reducedMotion} />}
    </section>
  );
}
