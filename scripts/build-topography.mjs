#!/usr/bin/env node
// Generates the Projects section's background: a seamless survey drawing.
//
// A periodic height field (tileable in x and y) is traced into contour lines
// with marching squares, the way survey software draws a site plan. Every fifth
// contour is an index contour, set a touch heavier and labelled with its
// elevation in a break in the line, and a faint survey grid of crosshairs runs
// underneath. The output is a single SVG tile
// drawn at 1:1 CSS pixels, so hairlines stay hairlines; it repeats seamlessly.
//
//   node scripts/build-topography.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = process.env.TOPO_OUT || 'public/media/backgrounds/topography.svg';

// ── Parameters ────────────────────────────────────────────────────────────────
const TILE_W = 1600; // px; wider than the content column, so the repeat never shows side by side
const TILE_H = 2400; // px; taller than the section on desktop, and seamless below that on phones
const CELL = 800; // px per lattice cell of the broadest octave (TILE_W and TILE_H are multiples)
const STEP = 4; // px between height samples
const LEVELS = 44; // contour intervals across the whole height range
const INDEX_EVERY = 5; // every fifth contour is an index contour
const BASE_ELEV = 40; // metres at the lowest contour, for the labels
const SEED = Number(process.env.TOPO_SEED) || 7; // chosen from a contact sheet: an open valley down the middle, slopes framing the edges

const INK = '#2b2a27';
const STYLE = {
  minor: { width: 0.55, opacity: 0.12 },
  index: { width: 0.9, opacity: 0.22 },
  label: { size: 8.5, opacity: 0.4 },
  grid: { every: 200, arm: 4, width: 0.6, opacity: 0.2 },
};

// ── Periodic gradient noise ───────────────────────────────────────────────────
// Lattice coordinates wrap per octave, so every octave tiles exactly over the tile.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(SEED);
const PERM = Array.from({ length: 512 }, (_, i) => i);
for (let i = 511; i > 0; i -= 1) {
  const j = Math.floor(rand() * (i + 1));
  [PERM[i], PERM[j]] = [PERM[j], PERM[i]];
}
const GRAD = Array.from({ length: 512 }, () => {
  const a = rand() * Math.PI * 2;
  return [Math.cos(a), Math.sin(a)];
});
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const mod = (a, n) => ((a % n) + n) % n;

function perlin(x, y, cx, cy, salt) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const g = (ix, iy) => GRAD[PERM[(PERM[(mod(ix, cx) + salt) & 511] + mod(iy, cy)) & 511]];
  const dot = (gr, dx, dy) => gr[0] * dx + gr[1] * dy;
  const n00 = dot(g(xi, yi), xf, yf);
  const n10 = dot(g(xi + 1, yi), xf - 1, yf);
  const n01 = dot(g(xi, yi + 1), xf, yf - 1);
  const n11 = dot(g(xi + 1, yi + 1), xf - 1, yf - 1);
  const u = fade(xf);
  const v = fade(yf);
  return n00 + u * (n10 - n00) + v * (n01 + u * (n11 - n01) - n00 - u * (n10 - n00));
}

/** Fractal noise at tile point (px, py); `scale` divides CELL for the broadest octave. */
function fbm(px, py, scale, octaves, salt, gain = 0.5) {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  for (let o = 0; o < octaves; o += 1) {
    const f = scale << o;
    const cx = (TILE_W / CELL) * f;
    const cy = (TILE_H / CELL) * f;
    sum += amp * perlin((px / TILE_W) * cx, (py / TILE_H) * cy, cx, cy, salt + o * 31);
    norm += amp;
    amp *= gain;
  }
  return sum / norm;
}

// Domain-warped terrain: broad landforms whose ridges meander instead of
// following the lattice. Few octaves and a low gain keep the lines calm.
const WARP = 170;
function height(px, py) {
  const wx = fbm(px, py, 1, 2, 101) * WARP;
  const wy = fbm(px, py, 1, 2, 211) * WARP;
  return fbm(px + wx, py + wy, 1, 3, 7, 0.36);
}

// ── Height field ──────────────────────────────────────────────────────────────
const NX = TILE_W / STEP; // samples across; index NX wraps to 0
const NY = TILE_H / STEP;
const H = new Float64Array(NX * NY);
for (let j = 0; j < NY; j += 1) for (let i = 0; i < NX; i += 1) H[j * NX + i] = height(i * STEP, j * STEP);

// Partial histogram equalisation: raw noise bunches contours into cliffs and
// leaves dead-flat plains. Blending each height with its rank evens the rhythm
// of the lines, the way a gently graded site reads on a plan.
{
  const sorted = Float64Array.from(H).sort();
  const lo0 = sorted[0];
  const span = sorted[sorted.length - 1] - lo0;
  const rank = (v) => {
    let a = 0;
    let b = sorted.length - 1;
    while (a < b) {
      const m = (a + b) >> 1;
      if (sorted[m] < v) a = m + 1; else b = m;
    }
    return a / (sorted.length - 1);
  };
  for (let n = 0; n < H.length; n += 1) H[n] = 0.4 * rank(H[n]) + 0.6 * ((H[n] - lo0) / span);
}
let lo = Infinity;
let hi = -Infinity;
for (const v of H) {
  if (v < lo) lo = v;
  if (v > hi) hi = v;
}
const at = (i, j) => H[mod(j, NY) * NX + mod(i, NX)];
const dz = (hi - lo) / LEVELS;

// ── Marching squares ──────────────────────────────────────────────────────────
// Cells do not wrap: a contour that leaves one edge of the tile ends there and
// carries on from the opposite edge of the next tile, where the values match.
function traceLevel(z) {
  const segs = [];
  const ek = (a, b) => `${a}|${b}`;
  const lerp = (a, b) => (z - a) / (b - a);
  for (let j = 0; j < NY; j += 1) {
    for (let i = 0; i < NX; i += 1) {
      const a = at(i, j); // top-left
      const b = at(i + 1, j); // top-right
      const c = at(i + 1, j + 1); // bottom-right
      const d = at(i, j + 1); // bottom-left
      const code = (a > z ? 8 : 0) | (b > z ? 4 : 0) | (c > z ? 2 : 0) | (d > z ? 1 : 0);
      if (code === 0 || code === 15) continue;
      const x0 = i * STEP;
      const y0 = j * STEP;
      const top = { k: ek(`h${i}`, j), p: [x0 + lerp(a, b) * STEP, y0] };
      const right = { k: ek(`v${i + 1}`, j), p: [x0 + STEP, y0 + lerp(b, c) * STEP] };
      const bottom = { k: ek(`h${i}`, j + 1), p: [x0 + lerp(d, c) * STEP, y0 + STEP] };
      const left = { k: ek(`v${i}`, j), p: [x0, y0 + lerp(a, d) * STEP] };
      const center = (a + b + c + d) / 4 > z;
      switch (code) {
        case 1: case 14: segs.push([left, bottom]); break;
        case 2: case 13: segs.push([bottom, right]); break;
        case 3: case 12: segs.push([left, right]); break;
        case 4: case 11: segs.push([top, right]); break;
        case 6: case 9: segs.push([top, bottom]); break;
        case 7: case 8: segs.push([left, top]); break;
        case 5:
          if (center) { segs.push([left, top]); segs.push([bottom, right]); } else { segs.push([left, bottom]); segs.push([top, right]); }
          break;
        case 10:
          if (center) { segs.push([top, right]); segs.push([left, bottom]); } else { segs.push([left, top]); segs.push([bottom, right]); }
          break;
        default:
      }
    }
  }
  // Join segments that share an edge crossing into polylines.
  const byKey = new Map();
  segs.forEach((s, idx) => {
    for (const end of s) {
      if (!byKey.has(end.k)) byKey.set(end.k, []);
      byKey.get(end.k).push(idx);
    }
  });
  const used = new Uint8Array(segs.length);
  const lines = [];
  for (let s0 = 0; s0 < segs.length; s0 += 1) {
    if (used[s0]) continue;
    used[s0] = 1;
    const chain = [segs[s0][0], segs[s0][1]];
    const grow = (atEnd) => {
      for (;;) {
        const tip = atEnd ? chain[chain.length - 1] : chain[0];
        const next = (byKey.get(tip.k) || []).find((n) => !used[n]);
        if (next === undefined) return;
        used[next] = 1;
        const [p, q] = segs[next];
        const add = p.k === tip.k ? q : p;
        if (atEnd) chain.push(add); else chain.unshift(add);
      }
    };
    grow(true);
    grow(false);
    const closed = chain.length > 3 && chain[0].k === chain[chain.length - 1].k;
    lines.push({ pts: chain.map((e) => e.p), closed });
  }
  return lines;
}

// ── Line conditioning ─────────────────────────────────────────────────────────
function chaikin(pts, closed, iterations) {
  let out = pts;
  for (let n = 0; n < iterations; n += 1) {
    const next = [];
    const count = closed ? out.length - 1 : out.length - 1;
    if (!closed) next.push(out[0]);
    for (let i = 0; i < count; i += 1) {
      const [x0, y0] = out[i];
      const [x1, y1] = out[i + 1];
      next.push([x0 * 0.75 + x1 * 0.25, y0 * 0.75 + y1 * 0.25]);
      next.push([x0 * 0.25 + x1 * 0.75, y0 * 0.25 + y1 * 0.75]);
    }
    if (closed) next.push(next[0]);
    else next.push(out[out.length - 1]);
    out = next;
  }
  return out;
}

function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  // A closed ring starts and ends on the same point, which leaves no chord to
  // measure against: simplify it as two halves split at its farthest point.
  const [fx, fy] = pts[0];
  const [lx, ly] = pts[pts.length - 1];
  if (Math.hypot(lx - fx, ly - fy) < 1e-6) {
    let k = 1;
    let far = 0;
    for (let i = 1; i < pts.length - 1; i += 1) {
      const d = Math.hypot(pts[i][0] - fx, pts[i][1] - fy);
      if (d > far) { far = d; k = i; }
    }
    return [...rdp(pts.slice(0, k + 1), eps), ...rdp(pts.slice(k), eps).slice(1)];
  }
  const keep = new Uint8Array(pts.length);
  keep[0] = 1;
  keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    const [ax, ay] = pts[s];
    const [bx, by] = pts[e];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1e-9;
    let best = -1;
    let bestD = eps;
    for (let i = s + 1; i < e; i += 1) {
      const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / len;
      if (d > bestD) { bestD = d; best = i; }
    }
    if (best > 0) {
      keep[best] = 1;
      stack.push([s, best], [best, e]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

const lengthOf = (pts) => pts.reduce((sum, p, i) => (i ? sum + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);
const f1 = (v) => (Math.round(v * 10) / 10).toString();
// Relative coordinates on a 0.1 px lattice: identical rendering, about half the bytes.
const num = (v) => {
  const t = f1(v);
  return t.replace(/^(-?)0\./, '$1.');
};
function toPath(pts) {
  let x = Math.round(pts[0][0] * 10);
  let y = Math.round(pts[0][1] * 10);
  let d = `M${num(x / 10)} ${num(y / 10)}l`;
  let prev = '';
  for (let i = 1; i < pts.length; i += 1) {
    const nx = Math.round(pts[i][0] * 10);
    const ny = Math.round(pts[i][1] * 10);
    if (nx === x && ny === y) continue;
    const pair = `${num((nx - x) / 10)}${ny - y < 0 ? '' : ' '}${num((ny - y) / 10)}`;
    d += (prev && !pair.startsWith('-') ? ' ' : '') + pair;
    prev = pair;
    x = nx;
    y = ny;
  }
  return prev ? d : ''; // a path with no segments would be a parse error that stops the whole drawing
}

// ── Index contour labels ──────────────────────────────────────────────────────
// A label sits where the line runs straight enough to read, clear of the tile
// edges and of other labels; the line is broken around it, as on a survey sheet.
const LABEL_GAP = 5;
const labels = [];
const MIN_LABEL_SPACING = 400;
const EDGE = 36;
function placeLabel(pts, text) {
  const width = text.length * STYLE.label.size * 0.62 + LABEL_GAP * 2;
  const cum = [0];
  for (let i = 1; i < pts.length; i += 1) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = cum[cum.length - 1];
  if (total < 260) return null;
  const pointAt = (s) => {
    let i = 1;
    while (i < cum.length - 1 && cum[i] < s) i += 1;
    const t = (s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
    return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
  };
  let best = null;
  for (let s = width; s < total - width; s += 12) {
    const a = pointAt(s - width / 2);
    const b = pointAt(s + width / 2);
    const m = pointAt(s);
    if (m[0] < EDGE || m[0] > TILE_W - EDGE || m[1] < EDGE || m[1] > TILE_H - EDGE) continue;
    const chord = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const straightness = chord / width; // 1 = perfectly straight
    if (straightness < 0.97) continue;
    if (labels.some((l) => Math.hypot(l.x - m[0], l.y - m[1]) < MIN_LABEL_SPACING)) continue;
    let angle = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    if (angle > 90) angle -= 180;
    if (angle < -90) angle += 180;
    if (Math.abs(angle) > 55) continue; // keep numbers comfortably readable
    const score = straightness - Math.abs(angle) / 400;
    if (!best || score > best.score) best = { s, x: m[0], y: m[1], angle, score };
  }
  if (!best) return null;
  labels.push({ x: best.x, y: best.y, angle: best.angle, text });
  // Split the polyline around the label.
  const cut0 = best.s - width / 2;
  const cut1 = best.s + width / 2;
  const before = [];
  const after = [];
  for (let i = 0; i < pts.length; i += 1) {
    if (cum[i] < cut0) before.push(pts[i]);
    else if (cum[i] > cut1) after.push(pts[i]);
  }
  before.push(pointAt(cut0));
  after.unshift(pointAt(cut1));
  return [before, after];
}

// ── Build ─────────────────────────────────────────────────────────────────────
const minor = [];
const index = [];
for (let k = 1; k < LEVELS; k += 1) {
  const z = lo + k * dz;
  const isIndex = k % INDEX_EVERY === 0;
  for (const line of traceLevel(z)) {
    let pts = chaikin(line.pts, line.closed, 3);
    // Drop specks, and the small knoll rings that make contour art look like clip art.
    const len = lengthOf(pts);
    if (len < (line.closed ? 150 : 40)) continue;
    pts = rdp(pts, 0.32);
    if (!isIndex) {
      minor.push(toPath(pts));
      continue;
    }
    const split = placeLabel(pts, String(BASE_ELEV + k));
    if (split) split.forEach((part) => part.length > 1 && index.push(toPath(part)));
    else index.push(toPath(pts));
  }
}

// Survey grid: small crosshairs on a regular module.
const crosses = [];
for (let y = STYLE.grid.every / 2; y < TILE_H; y += STYLE.grid.every) {
  for (let x = STYLE.grid.every / 2; x < TILE_W; x += STYLE.grid.every) {
    const a = STYLE.grid.arm;
    crosses.push(`M${x - a} ${y}H${x + a}M${x} ${y - a}V${y + a}`);
  }
}

const font = "font-family='Helvetica Neue,Helvetica,Arial,sans-serif'";
const svg = [
  `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_W}' height='${TILE_H}' viewBox='0 0 ${TILE_W} ${TILE_H}'>`,
  `<g fill='none' stroke='${INK}' stroke-linecap='round' stroke-linejoin='round'>`,
  `<path stroke-width='${STYLE.grid.width}' stroke-opacity='${STYLE.grid.opacity}' d='${crosses.join('')}'/>`,
  `<path stroke-width='${STYLE.minor.width}' stroke-opacity='${STYLE.minor.opacity}' d='${minor.filter(Boolean).join('')}'/>`,
  `<path stroke-width='${STYLE.index.width}' stroke-opacity='${STYLE.index.opacity}' d='${index.filter(Boolean).join('')}'/>`,
  `</g>`,
  `<g fill='${INK}' fill-opacity='${STYLE.label.opacity}' ${font} font-size='${STYLE.label.size}' letter-spacing='0.6' text-anchor='middle' dominant-baseline='central'>`,
  ...labels.map((l) => `<text transform='translate(${f1(l.x)} ${f1(l.y)}) rotate(${f1(l.angle)})'>${l.text}</text>`),
  `</g>`,
  `</svg>`,
].join('');

mkdirSync('public/media/backgrounds', { recursive: true });
writeFileSync(OUT, svg);
console.log(`${OUT}: ${(svg.length / 1024).toFixed(1)} KB · ${minor.length} minor, ${index.length} index paths · ${labels.length} labels`);
