import React, { useEffect, useRef, useState } from 'react';
import { compile, CHIP_METRICS } from './compile';
import { useIllumination } from './useIllumination';
import '../../../styles/flow.css';

/**
 * One diagram, drawn twice: a wide composition and a narrow, vertical one.
 * A container query shows whichever fits. Both are plain SVG computed from
 * the spec, so the pre-rendered HTML and the hydrated page are identical;
 * the illumination runs afterwards, in useIllumination. The travelling
 * pulses are decoration, so they are added in the browser after hydration
 * (and never under reduced motion), which keeps them out of the HTML.
 */

function lines(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function NodeText({ n, type, pad }) {
  const subs = lines(n.sub);
  const ts = type.title;
  const ss = type.sub;
  const subGap = 5;
  const subLead = ss * 1.42;
  const blockH = ts + (subs.length ? subGap + ss * 0.95 + (subs.length - 1) * subLead : 0);
  const top = n.y + (n.h - blockH) / 2;
  const x = n.x + pad;
  return (
    <>
      <text className="flow-node__title" x={x} y={top + ts * 0.78} fontSize={ts}>
        {n.title}
      </text>
      {subs.map((s, i) => (
        <text key={s} className="flow-node__sub" x={x} y={top + ts + subGap + ss * 0.78 + i * subLead} fontSize={ss}>
          {s}
        </text>
      ))}
    </>
  );
}

/**
 * The hub itself, drawn like its own sidebar: the display title, a line of
 * context, then each place with where its data comes from.
 */
function HubText({ n, type, pad }) {
  const row = type.row || 30;
  const titleY = n.y + pad + type.hub * 0.8;
  const subs = lines(n.sub);
  const listTop = titleY + 14 + subs.length * 16 + 8;
  const left = n.x + pad;
  const right = n.x + n.w - pad;
  const foot = lines(n.foot);
  return (
    <>
      <text className="flow-node__hub" x={left} y={titleY} fontSize={type.hub}>
        {n.title}
      </text>
      {subs.map((s, i) => (
        <text key={s} className="flow-node__sub" x={left} y={titleY + 22 + i * 16} fontSize={type.sub}>
          {s}
        </text>
      ))}
      {(n.places || []).map(([name, from], i) => {
        const y = listTop + i * row;
        return (
          <g key={name} className="flow-place">
            <line x1={left} x2={right} y1={y} y2={y} />
            <rect className="flow-bullet" x={left} y={y + row / 2 - 2} width={4} height={4} />
            <text className="flow-place__name" x={left + 13} y={y + row / 2 + 4.5} fontSize={13}>
              {name}
            </text>
            <text className="flow-place__from" x={right} y={y + row / 2 + 4} fontSize={type.sub} textAnchor="end">
              {from}
            </text>
          </g>
        );
      })}
      {foot.map((s, i) => (
        <text key={s} className="flow-node__foot" x={left} y={n.y + n.h - pad + 4 - (foot.length - 1 - i) * 16} fontSize={type.sub}>
          {s}
        </text>
      ))}
    </>
  );
}

/**
 * A band of principles. Wide: the layer's name on the left, its principles in
 * columns to the right. Narrow: the name on top, one principle per line below.
 */
function BandText({ n, type, pad }) {
  const size = 13;
  const lead = 24;
  const items = n.items || [];
  const cols = n.cols || 1;
  const rows = Math.ceil(items.length / cols);
  const side = n.itemsX !== undefined;
  const titleY = side ? n.y + n.h / 2 - 3 : n.y + pad + type.title * 0.8;
  const top = side ? n.y + (n.h - rows * lead) / 2 + lead / 2 + 4.5 : titleY + 30 + lead / 2;
  const colW = side ? (n.w - n.itemsX - pad) / cols : 0;
  return (
    <>
      <text className="flow-node__title" x={n.x + pad} y={titleY} fontSize={type.title}>
        {n.title}
      </text>
      {n.sub && (
        <text className="flow-node__sub" x={n.x + pad} y={titleY + 18} fontSize={type.sub}>
          {n.sub}
        </text>
      )}
      {items.map((it, i) => {
        const c = side ? Math.floor(i / rows) : 0;
        const r = side ? i % rows : i;
        const x = side ? n.x + n.itemsX + c * colW : n.x + pad;
        const y = top + r * lead;
        return (
          <g key={it}>
            <rect className="flow-bullet" x={x} y={y - 7} width={4} height={4} />
            <text className="flow-node__item" x={x + 13} y={y} fontSize={size}>
              {it}
            </text>
          </g>
        );
      })}
    </>
  );
}

function Layout({ id, layout, pulses }) {
  const { kind, w, h, type } = layout;
  const glow = `flow-${id}-${kind}-glow`;
  const pad = kind === 'wide' ? 16 : 12;
  const { padY, line } = CHIP_METRICS;
  return (
    <svg className={`flow__svg flow__svg--${kind}`} data-layout={kind} viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" focusable="false">
      <defs>
        <filter id={glow} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <g className="flow-groups">
        {layout.boxes.map((b) => (
          <g key={b.id} className="flow-box" data-n={b.id}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={10} />
            {b.label && (
              <text className="flow-group" x={b.x + 14} y={b.y + 20}>
                {b.label}
              </text>
            )}
          </g>
        ))}
        {layout.groups.map((g) => (
          <text key={g.label} className="flow-group" x={g.x} y={g.y} textAnchor={g.anchor || 'start'}>
            {g.label}
          </text>
        ))}
      </g>

      <g className="flow-halos" filter={`url(#${glow})`}>
        {layout.edges.map((e) => (
          <path key={e.id} className="flow-halo" data-e={e.id} d={e.d} strokeDasharray={`${e.len + 2} ${e.len + 2}`} strokeDashoffset={e.len + 2} />
        ))}
      </g>

      <g className="flow-edges">
        {layout.edges.map((e) => (
          <g key={e.id} className="flow-edge" data-e={e.id} data-seq={e.seq} data-len={e.len + 2} data-from={e.from} data-to={e.to} data-dir={e.dir}>
            <path className="flow-edge__base" d={e.d} />
            <path className="flow-edge__lit" d={e.d} strokeDasharray={`${e.len + 2} ${e.len + 2}`} strokeDashoffset={e.len + 2} />
            {pulses &&
              e.pulses.map((p, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <g key={i} className="flow-pulse" style={{ '--pdur': `${p.dur}ms`, '--pdel': `${p.delay}ms` }}>
                  <path className="flow-pulse__tail" d={p.d} strokeDasharray={p.tail.dash} strokeDashoffset={p.tail.o0} style={{ '--o0': p.tail.o0, '--o1': p.tail.o1 }} />
                  <path className="flow-pulse__head" d={p.d} strokeDasharray={p.head.dash} strokeDashoffset={p.head.o0} style={{ '--o0': p.head.o0, '--o1': p.head.o1 }} />
                </g>
              ))}
            {e.arrows.map((a) => (
              <path key={a} className="flow-arrow" d={a} />
            ))}
          </g>
        ))}
      </g>

      <g className="flow-nodes">
        {layout.nodes.map((n) => (
          <g key={n.id} className={`flow-node${n.variant ? ` flow-node--${n.variant}` : ''}`} data-n={n.id} data-with={n.litWith}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={n.variant === 'hub' ? 12 : 8} />
            {n.variant === 'hub' && <HubText n={n} type={type} pad={pad + 8} />}
            {n.variant === 'band' && <BandText n={n} type={type} pad={pad + 8} />}
            {n.variant !== 'hub' && n.variant !== 'band' && <NodeText n={n} type={type} pad={pad} />}
          </g>
        ))}
      </g>

      <g className="flow-labels">
        {layout.edges
          .filter((e) => e.label)
          .map(({ id: eid, label }) => (
            <g key={eid} className="flow-label" data-e={eid}>
              <rect x={label.x} y={label.y} width={label.w} height={label.h} rx={4} />
              {label.lines.map((l, i) => (
                <text key={l} className={i ? 'flow-label__how' : 'flow-label__what'} x={label.cx} y={label.y + padY + line * i + 10.5} fontSize={type.label} textAnchor="middle">
                  {l}
                </text>
              ))}
            </g>
          ))}
        {layout.notes.map((t) => (
          <text key={t.text} className="flow-note" x={t.x} y={t.y} textAnchor={t.anchor || 'start'} fontSize={type.label}>
            {t.text}
          </text>
        ))}
      </g>
    </svg>
  );
}

export default function FlowDiagram({ spec }) {
  const ref = useRef(null);
  const [pulses, setPulses] = useState(false);
  const { wide, narrow } = compile(spec);
  useIllumination(ref);
  useEffect(() => {
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) setPulses(true);
  }, []);
  const desc = `${spec.id}-desc`;
  return (
    <figure ref={ref} className="flow" aria-labelledby={desc}>
      <figcaption id={desc} className="sr-only">
        {spec.description}
      </figcaption>
      <div className="flow__wide">
        <Layout id={spec.id} layout={wide} pulses={pulses} />
      </div>
      <div className="flow__narrow">
        <Layout id={spec.id} layout={narrow} pulses={pulses} />
      </div>
    </figure>
  );
}
