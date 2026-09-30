import { arrowhead, hash01, labelAnchor, roundedPath, routePoints, trim } from './route';

/**
 * Turns a hand-placed layout into everything the SVG needs: resolved paths,
 * lengths, arrowheads, label chips and pulse timing. Coordinates are in the
 * layout's own units (the viewBox), on an 8-unit grid.
 */

const TYPE = {
  wide: { title: 15, sub: 11.5, label: 11, hub: 30, row: 30 },
  narrow: { title: 14, sub: 11, label: 11, hub: 26, row: 28 },
};
/** Mono advance is 0.6em in SF Mono and Menlo; a little extra keeps chips roomy everywhere. */
const MONO = 0.61;
const CHIP = { padX: 7, padY: 4, line: 14 };
const PULSE = { speed: 64, head: 2.5, tail: 22 };

export function chipSize(lines, size) {
  const longest = Math.max(...lines.map((l) => l.length));
  return { w: Math.ceil(longest * size * MONO + CHIP.padX * 2), h: lines.length * CHIP.line + CHIP.padY * 2 };
}

function pulse(id, len, offset = 0) {
  const travel = len + PULSE.tail;
  const rest = (2.8 + hash01(id) * 2.8) * PULSE.speed;
  const period = (travel + rest) / PULSE.speed;
  const gap = travel + rest + PULSE.tail + 8;
  const delay = 0.5 + hash01(`${id}:d`) * 1.4 + offset * period;
  return {
    tail: { dash: `${PULSE.tail} ${gap}`, o0: PULSE.tail + 2, o1: PULSE.tail + 2 - travel - rest },
    head: { dash: `${PULSE.head} ${gap}`, o0: PULSE.head + 2, o1: PULSE.head + 2 - travel - rest },
    dur: Math.round(period * 1000),
    delay: Math.round(delay * 1000),
  };
}

export function compileLayout(layout, kind) {
  const type = { ...TYPE[kind], ...layout.type };
  const nodes = {};
  (layout.boxes || []).forEach((b) => {
    nodes[b.id] = b;
  });
  layout.nodes.forEach((n) => {
    nodes[n.id] = n;
  });

  const edges = layout.edges.map((e, i) => {
    const dir = e.dir || 'fwd';
    const pts = routePoints(e.route, nodes);
    const atStart = dir === 'both';
    const atEnd = dir !== 'none';
    const cut = trim(pts, atStart, atEnd);
    const { d, len } = roundedPath(cut);
    const reverse = dir === 'both' ? roundedPath([...cut].reverse()).d : null;
    const arrows = [];
    if (atEnd) arrows.push(arrowhead(pts[pts.length - 2], pts[pts.length - 1]));
    if (atStart) arrows.push(arrowhead(pts[1], pts[0]));
    let label = null;
    if (e.label) {
      const lines = Array.isArray(e.label) ? e.label : [e.label];
      const [cx, cy] = e.at || labelAnchor(pts, e.seg);
      const { w, h } = chipSize(lines, type.label);
      label = { lines, x: cx - w / 2, y: cy - h / 2, w, h, cx, cy };
    }
    const pulses = dir === 'none' ? [] : dir === 'both' ? [{ d, ...pulse(e.id, len) }, { d: reverse, ...pulse(`${e.id}:r`, len, 0.5) }] : [{ d, ...pulse(e.id, len) }];
    return { ...e, dir, seq: e.seq ?? i, pts, d, len, arrows, label, pulses };
  });

  return { ...layout, kind, type, nodes: layout.nodes, boxes: layout.boxes || [], groups: layout.groups || [], notes: layout.notes || [], edges };
}

const cache = new WeakMap();
export function compile(spec) {
  if (!cache.has(spec)) cache.set(spec, { wide: compileLayout(spec.wide, 'wide'), narrow: compileLayout(spec.narrow, 'narrow') });
  return cache.get(spec);
}

export const CHIP_METRICS = CHIP;
