/**
 * Geometry for the flow diagrams. Everything here is pure and deterministic,
 * so the server and the browser draw exactly the same picture.
 *
 * A route is a list of tokens:
 *   'node.side'        a port at the middle of that side (l, r, t, b)
 *   'node.side@-16'    the same side, 16 units from the middle
 *   'node.side@=304'   the same side, at an absolute x (t, b) or y (l, r)
 *   'p:8,512'          a bare point (a junction on a bus)
 *   'x:320' / 'y:480'  move along that axis to the value, then turn
 * The first and last tokens are the ends; anything between is a waypoint.
 * Missing elbows are filled in so every segment is horizontal or vertical.
 */

export const CORNER = 8;
export const ARROW = { length: 7, half: 3.5 };

const AXIS = { l: 'h', r: 'h', t: 'v', b: 'v' };

export function portOf(token, nodes) {
  if (token.startsWith('p:')) {
    const [x, y] = token.slice(2).split(',').map(Number);
    return { x, y, side: null };
  }
  const m = /^([\w-]+)\.([lrtb])(?:@(=?)(-?\d+(?:\.\d+)?))?$/.exec(token);
  if (!m) throw new Error(`flow: bad port "${token}"`);
  const [, id, side, abs, num] = m;
  const n = nodes[id];
  if (!n) throw new Error(`flow: unknown node "${id}"`);
  const off = num === undefined ? 0 : Number(num);
  if (side === 'l' || side === 'r') {
    return { x: side === 'l' ? n.x : n.x + n.w, y: abs ? off : n.y + n.h / 2 + off, side };
  }
  return { x: abs ? off : n.x + n.w / 2 + off, y: side === 't' ? n.y : n.y + n.h, side };
}

/** The corner points of an orthogonal route, first to last. */
export function routePoints(route, nodes) {
  const a = portOf(route[0], nodes);
  const z = portOf(route[route.length - 1], nodes);
  const pts = [[a.x, a.y]];
  const mids = route.slice(1, -1);
  for (const tok of mids) {
    const [k, v] = tok.split(':');
    const [px, py] = pts[pts.length - 1];
    if (k === 'x') pts.push([Number(v), py]);
    else if (k === 'y') pts.push([px, Number(v)]);
    else throw new Error(`flow: bad waypoint "${tok}"`);
  }
  const [px, py] = pts[pts.length - 1];
  if (px !== z.x && py !== z.y) {
    // The axis we would leave on, and the axis we must arrive on.
    const lastMid = mids[mids.length - 1];
    const leave = lastMid ? (lastMid.startsWith('x') ? 'v' : 'h') : AXIS[a.side] || (AXIS[z.side] === 'h' ? 'v' : 'h');
    const arrive = AXIS[z.side] || (leave === 'h' ? 'v' : 'h');
    if (leave === arrive) {
      if (leave === 'h') {
        const mx = Math.round((px + z.x) / 16) * 8;
        pts.push([mx, py], [mx, z.y]);
      } else {
        const my = Math.round((py + z.y) / 16) * 8;
        pts.push([px, my], [z.x, my]);
      }
    } else if (leave === 'h') pts.push([z.x, py]);
    else pts.push([px, z.y]);
  }
  pts.push([z.x, z.y]);
  return pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
}

const unit = ([x1, y1], [x2, y2]) => {
  const l = Math.hypot(x2 - x1, y2 - y1) || 1;
  return [(x2 - x1) / l, (y2 - y1) / l];
};
const r2 = (n) => Math.round(n * 100) / 100;

/** Shortens the first and/or last segment, for arrowheads. */
export function trim(pts, atStart, atEnd, by = ARROW.length) {
  const out = pts.map((p) => [...p]);
  if (atStart) {
    const [ux, uy] = unit(out[0], out[1]);
    out[0] = [out[0][0] + ux * by, out[0][1] + uy * by];
  }
  if (atEnd) {
    const n = out.length - 1;
    const [ux, uy] = unit(out[n - 1], out[n]);
    out[n] = [out[n][0] - ux * by, out[n][1] - uy * by];
  }
  return out;
}

/** An SVG path through the points with rounded elbows, and its exact length. */
export function roundedPath(pts, radius = CORNER) {
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  let len = 0;
  for (let i = 1; i < pts.length; i += 1) {
    len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  for (let i = 1; i < pts.length - 1; i += 1) {
    const [p, c, n] = [pts[i - 1], pts[i], pts[i + 1]];
    const la = Math.hypot(c[0] - p[0], c[1] - p[1]);
    const lb = Math.hypot(n[0] - c[0], n[1] - c[1]);
    const r = Math.min(radius, la / 2, lb / 2);
    const [ax, ay] = unit(p, c);
    const [bx, by] = unit(c, n);
    const sweep = ax * by - ay * bx > 0 ? 1 : 0;
    d += ` L${r2(c[0] - ax * r)} ${r2(c[1] - ay * r)} A${r2(r)} ${r2(r)} 0 0 ${sweep} ${r2(c[0] + bx * r)} ${r2(c[1] + by * r)}`;
    len += r * (Math.PI / 2 - 2);
  }
  const z = pts[pts.length - 1];
  d += ` L${r2(z[0])} ${r2(z[1])}`;
  return { d, len: r2(len) };
}

/** A filled arrowhead whose tip touches `tip`, pointing along the segment from `from`. */
export function arrowhead(from, tip) {
  const [ux, uy] = unit(from, tip);
  const bx = tip[0] - ux * ARROW.length;
  const by = tip[1] - uy * ARROW.length;
  const [nx, ny] = [-uy * ARROW.half, ux * ARROW.half];
  return `M${r2(tip[0])} ${r2(tip[1])} L${r2(bx + nx)} ${r2(by + ny)} L${r2(bx - nx)} ${r2(by - ny)} Z`;
}

/** Centre of the longest segment: the default place for a label. */
export function labelAnchor(pts, seg) {
  let best = seg;
  if (best === undefined) {
    let max = -1;
    for (let i = 1; i < pts.length; i += 1) {
      const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (l > max) {
        max = l;
        best = i - 1;
      }
    }
  }
  const [a, b] = [pts[best], pts[best + 1]];
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

/** A small, stable number in [0, 1) from a string, so timing varies per edge but never between renders. */
export function hash01(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}
