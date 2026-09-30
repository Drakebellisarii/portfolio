import { useEffect } from 'react';

/**
 * Scroll-linked, latched illumination for a flow diagram.
 *
 * Progress comes from where the figure sits in the viewport: it starts as the
 * figure's top passes 90% of the viewport height and completes when its centre
 * reaches 58%. It never goes back. A damped follower chases that target, with a
 * speed limit, so a fast scroll still shows the connections light one after
 * another. Each edge draws in data-flow order (its `seq`), starting when the one
 * before it is about 45% drawn; a node brightens when the first edge reaches it
 * (a pure source, when its first edge leaves). Only stroke-dashoffset and data
 * attributes are written, once per frame, and the scroll listener detaches when
 * the diagram is complete. Pulses (CSS) pause while the figure is off screen.
 * Reduced motion, or no IntersectionObserver: everything is lit at once.
 */

const OVERLAP = 0.45;
const TAU = 0.16; // seconds
const MAX_RATE = 0.8; // progress per second
const MIN_RATE = 0.06;

function plan(svg) {
  const edges = [...svg.querySelectorAll('.flow-edge')].map((g) => {
    const id = g.dataset.e;
    return {
      id,
      seq: Number(g.dataset.seq),
      len: Number(g.dataset.len),
      from: g.dataset.from,
      to: g.dataset.to,
      g,
      lit: g.querySelector('.flow-edge__lit'),
      halo: svg.querySelector(`.flow-halo[data-e="${id}"]`),
      label: svg.querySelector(`.flow-label[data-e="${id}"]`),
      l: 0,
      on: false,
    };
  });
  const seqs = [...new Set(edges.map((e) => e.seq))].sort((a, b) => a - b);
  const dur = 1 / (OVERLAP * Math.max(0, seqs.length - 1) + 1);
  edges.forEach((e) => {
    e.s = seqs.indexOf(e.seq) * OVERLAP * dur;
    e.dur = dur;
  });
  const incoming = new Map();
  const outgoing = new Map();
  edges.forEach((e) => {
    incoming.set(e.to, Math.min(incoming.get(e.to) ?? Infinity, e.s + e.dur));
    outgoing.set(e.from, Math.min(outgoing.get(e.from) ?? Infinity, e.s));
  });
  const nodes = [...svg.querySelectorAll('[data-n]')].map((el) => {
    const id = el.dataset.with || el.dataset.n;
    const at = incoming.has(id) ? incoming.get(id) : outgoing.has(id) ? outgoing.get(id) : 1;
    return { el, at, on: false };
  });
  return { edges, nodes };
}

function paint(layout, p) {
  layout.edges.forEach((e) => {
    const l = Math.min(1, Math.max(0, (p - e.s) / e.dur));
    if (l === e.l) return;
    e.l = l;
    const off = String(Math.round(e.len * (1 - l) * 100) / 100);
    e.lit.style.strokeDashoffset = off;
    if (e.halo) e.halo.style.strokeDashoffset = off;
    if (l >= 1 && !e.on) {
      e.on = true;
      e.g.setAttribute('data-lit', '');
      if (e.label) e.label.setAttribute('data-lit', '');
    }
  });
  layout.nodes.forEach((n) => {
    if (!n.on && p >= n.at) {
      n.on = true;
      n.el.setAttribute('data-lit', '');
    }
  });
}

export function useIllumination(ref) {
  useEffect(() => {
    const fig = ref.current;
    if (!fig) return undefined;
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      fig.setAttribute('data-all', '');
      return undefined;
    }

    const layouts = [...fig.querySelectorAll('svg[data-layout]')].map(plan);
    let target = 0;
    let shown = 0;
    let last = 0;
    let raf = 0;
    let listening = false;
    let complete = false;

    const measure = () => {
      const r = fig.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.9;
      const end = vh * 0.58 - r.height / 2;
      const t = (start - r.top) / Math.max(1, start - end);
      target = Math.max(target, Math.min(1, Math.max(0, t)));
    };

    // Detaches the scroll listener; a follow-up already in flight finishes on its own.
    const stop = (cancel = false) => {
      if (listening) window.removeEventListener('scroll', onScroll);
      listening = false;
      if (cancel && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const tick = (now) => {
      raf = 0;
      measure();
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const gap = target - shown;
      if (gap > 0) {
        const eased = gap * (1 - Math.exp(-dt / TAU));
        shown += Math.min(gap, MAX_RATE * dt, Math.max(eased, MIN_RATE * dt));
        layouts.forEach((l) => paint(l, shown));
      }
      if (shown >= 0.9999) {
        complete = true;
        // A little past 1, so the last edge and its node land despite rounding in the timings.
        layouts.forEach((l) => paint(l, 1.001));
        fig.setAttribute('data-done', '');
        stop();
        return;
      }
      if (target - shown > 1e-4) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fig.removeAttribute('data-offscreen');
          if (!complete && !listening) {
            window.addEventListener('scroll', onScroll, { passive: true });
            listening = true;
            onScroll();
          }
        } else {
          fig.setAttribute('data-offscreen', '');
          stop();
        }
      },
      { rootMargin: '0px 0px 10% 0px' },
    );
    io.observe(fig);

    return () => {
      io.disconnect();
      stop(true);
    };
  }, [ref]);
}
