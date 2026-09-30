import { arrowhead, roundedPath, routePoints, trim } from './route';
import { compile } from './compile';
import calendar from './specs/calendar';
import context from './specs/context';
import crm from './specs/crm';
import outbox from './specs/outbox';
import security from './specs/security';
import signin from './specs/signin';
import slack from './specs/slack';

const nodes = {
  a: { x: 0, y: 0, w: 100, h: 40 },
  b: { x: 200, y: 120, w: 100, h: 40 },
};

test('fills in elbows so every segment is horizontal or vertical', () => {
  expect(routePoints(['a.r', 'b.l'], nodes)).toEqual([
    [100, 20],
    [152, 20],
    [152, 140],
    [200, 140],
  ]);
  expect(routePoints(['a.b', 'b.l'], nodes)).toEqual([
    [50, 40],
    [50, 140],
    [200, 140],
  ]);
  // a waypoint is a turn: after x:160 the route goes vertical, so reaching a top port takes an S-bend
  expect(routePoints(['a.r@=10', 'x:160', 'b.t@-20'], nodes)).toEqual([
    [100, 10],
    [160, 10],
    [160, 64],
    [230, 64],
    [230, 120],
  ]);
});

test('measures rounded paths exactly and trims for arrowheads', () => {
  // an L of 100 + 100 with one 8-unit corner: 200 - 16 + 4π
  const { len } = roundedPath([
    [0, 0],
    [100, 0],
    [100, 100],
  ]);
  expect(len).toBeCloseTo(200 - 16 + 4 * Math.PI, 1);
  expect(trim([[0, 0], [100, 0]], false, true)).toEqual([[0, 0], [93, 0]]);
  expect(arrowhead([0, 0], [100, 0])).toBe('M100 0 L93 3.5 L93 -3.5 Z');
});

test.each([context, signin, slack, calendar, crm, outbox, security])('$id: connections are orthogonal and labels stay inside', (spec) => {
  const compiled = compile(spec);
  ['wide', 'narrow'].forEach((kind) => {
    const layout = compiled[kind];
    const ids = new Set();
    layout.edges.forEach((e) => {
      expect(ids.has(e.id)).toBe(false);
      ids.add(e.id);
      for (let i = 1; i < e.pts.length; i += 1) {
        const [x1, y1] = e.pts[i - 1];
        const [x2, y2] = e.pts[i];
        expect(x1 === x2 || y1 === y2).toBe(true);
      }
      if (e.label) {
        expect(e.label.x).toBeGreaterThanOrEqual(0);
        expect(e.label.x + e.label.w).toBeLessThanOrEqual(layout.w);
        expect(e.label.y).toBeGreaterThanOrEqual(0);
        expect(e.label.y + e.label.h).toBeLessThanOrEqual(layout.h);
      }
    });
    layout.nodes.forEach((n) => {
      expect(n.x + n.w).toBeLessThanOrEqual(layout.w);
      expect(n.y + n.h).toBeLessThanOrEqual(layout.h);
    });
  });
});
