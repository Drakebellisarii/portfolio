import React, { useCallback, useEffect, useRef, useState } from 'react';
import { scrollToSection } from '../lib/scroll';
import '../styles/nav.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

/** How far below the nav's top edge it reads the page: the middle of its first line of type. */
const PROBE_OFFSET = 16;
/** Phones: the running head steps aside while reading down and returns on the way up. */
const NARROW = '(max-width: 640px)';
const SCROLL_SLOP = 8;

/**
 * Section names set in the top-right corner, nothing else.
 *
 * Over the hero the full list stands in the hero name's voice, large and
 * tightly stacked: the current section at full strength, the rest set back.
 * Past the hero it reduces to a running head, the current section's name
 * alone, and the list returns on hover, keyboard focus or a tap. The words
 * are drawn with mix-blend-mode: difference, so they invert against whatever
 * passes beneath them: white over dark sections, ink over light ones.
 */
export default function Nav() {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [keyFocus, setKeyFocus] = useState(false);
  const [away, setAway] = useState(false);
  const swallowClick = useRef(false);
  const openRef = useRef(false);
  openRef.current = open;

  const folded = current > 0 && !open && !hover && !keyFocus;

  // Which section has crossed the reading line, and (phones) which way the
  // reader is scrolling. rAF-throttled; React only re-renders on a change.
  useEffect(() => {
    const narrow = typeof window.matchMedia === 'function' ? window.matchMedia(NARROW) : null;
    let raf = 0;
    let last = -1;
    let lastY = window.scrollY;
    let lastAway = false;
    const measure = () => {
      raf = 0;
      // The current section is the one physically behind the nav: it changes
      // the moment a section's top edge passes under the running head, the
      // same moment the blended type inverts against it.
      const nav = ref.current;
      const probe = (nav ? parseFloat(getComputedStyle(nav).top) || 0 : 0) + PROBE_OFFSET;
      const tops = LINKS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top : Infinity;
      });
      let idx = 0;
      tops.forEach((top, i) => {
        if (top <= probe) idx = i;
      });
      // At the very bottom of the page, a final section too short to reach the
      // nav is still the one being read.
      const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        for (let i = LINKS.length - 1; i > idx; i -= 1) {
          if (tops[i] < window.innerHeight) {
            idx = i;
            break;
          }
        }
      }
      if (idx !== last) {
        last = idx;
        setCurrent(idx);
      }

      const y = window.scrollY;
      let nextAway = lastAway;
      if (!narrow || !narrow.matches || idx === 0 || openRef.current) nextAway = false;
      else if (y - lastY > SCROLL_SLOP) nextAway = true;
      else if (lastY - y > SCROLL_SLOP) nextAway = false;
      if (Math.abs(y - lastY) > SCROLL_SLOP) lastY = y;
      if (nextAway !== lastAway) {
        lastAway = nextAway;
        setAway(nextAway);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Opened by a tap: close on a tap elsewhere. Escape closes in every case.
  useEffect(() => {
    const onDown = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== 'Escape' || !ref.current) return;
      setOpen(false);
      setKeyFocus(false);
      if (ref.current.contains(document.activeElement)) document.activeElement.blur();
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Touch: the first tap on the running head opens the list rather than following it.
  const onPointerDown = useCallback(
    (e) => {
      swallowClick.current = folded && e.pointerType !== 'mouse';
      if (swallowClick.current) setOpen(true);
    },
    [folded],
  );
  const onClickCapture = useCallback((e) => {
    if (swallowClick.current) {
      swallowClick.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      {/* Opened by a tap: the page dims so the names read on a quiet field. */}
      <div className="nav-scrim" data-show={open ? '' : undefined} aria-hidden="true" />
      <nav
        ref={ref}
        className="nav"
        aria-label="Sections"
        data-folded={folded ? '' : undefined}
        data-past={current > 0 ? '' : undefined}
        data-away={away && !open ? '' : undefined}
        data-open={open ? '' : undefined}
        onPointerDown={onPointerDown}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
        onFocus={(e) => typeof e.target.matches === 'function' && e.target.matches(':focus-visible') && setKeyFocus(true)}
        onBlur={(e) => (!ref.current || !ref.current.contains(e.relatedTarget)) && setKeyFocus(false)}
        onClickCapture={onClickCapture}
      >
        <ol className="nav__list">
          {LINKS.map(({ id, label }, i) => (
            <li key={id} className={`nav__item${i === current ? ' is-current' : ''}`}>
              <a className="nav__link" href={`#${id}`} onClick={(e) => go(e, id)} aria-current={i === current ? 'location' : undefined}>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
