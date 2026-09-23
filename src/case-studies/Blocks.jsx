import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { Link } from '../lib/router';
import { VISUALS } from './visuals';

export function Visual({ name, priority = false }) {
  const entry = VISUALS[name];
  if (!entry) return null;
  const { C, recreation } = entry;
  return (
    <figure className={`cs-visual${priority ? ' cs-visual--hero' : ''}`}>
      <C />
      {recreation && (
        <figcaption className="cs-caption">
          Recreated in code with fictional data<span className="cs-caption__swipe"> · swipe to explore</span>
        </figcaption>
      )}
    </figure>
  );
}

const Eyebrow = ({ number, children }) => (
  <p className="cs-eyebrow">
    {number && <span className="cs-eyebrow__n">{number}</span>}
    {children}
  </p>
);

export function Chapter({ block }) {
  const { number, eyebrow, title, body, visual, tone = 'paper', flip, wide, aside, closing } = block;
  const layout = !visual ? 'cs-chapter--text' : wide ? 'cs-chapter--wide' : flip ? 'cs-chapter--flip' : '';
  return (
    <section className={`cs-chapter cs-tone-${tone} ${layout}${closing ? ' cs-chapter--closing' : ''}`} aria-labelledby={`ch-${number}`}>
      <div className="cs-wrap cs-chapter__grid">
        <Reveal className="cs-chapter__text">
          <Eyebrow number={number}>{eyebrow}</Eyebrow>
          <h2 id={`ch-${number}`} className="cs-h2">
            {title}
          </h2>
          <div className="cs-chapter__copy">
            {body.map((p) => (
              <p key={p.slice(0, 24)} className="cs-body">
                {p}
              </p>
            ))}
            {aside && (
              <div className="cs-aside">
                <p className="cs-aside__label">{aside.label}</p>
                <p className="cs-aside__text">{aside.text}</p>
              </div>
            )}
          </div>
        </Reveal>
        {visual && (
          <Reveal className="cs-chapter__visual" delay={120}>
            <Visual name={visual} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function Pull({ block }) {
  return (
    <section className={`cs-pull cs-tone-${block.tone ?? 'paper'}`}>
      <Reveal className="cs-wrap">
        <p className="cs-pull__text">{block.text}</p>
      </Reveal>
    </section>
  );
}

/**
 * Apple-style sticky storytelling: steps scroll past a pinned visual that
 * crossfades to match. Below 1024px each step carries its own visual inline.
 */
export function StickySequence({ block }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.step));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cs-sticky cs-tone-paper" aria-labelledby={`ch-${block.number}`}>
      <div className="cs-wrap">
        <Reveal className="cs-sticky__head">
          <Eyebrow number={block.number}>{block.eyebrow}</Eyebrow>
          <h2 id={`ch-${block.number}`} className="cs-h2">
            {block.title}
          </h2>
          {block.intro && <p className="cs-lede">{block.intro}</p>}
        </Reveal>
        <div className="cs-sticky__grid">
          <ol className="cs-sticky__steps">
            {block.steps.map((s, i) => (
              <li
                key={s.label}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
                className={`cs-step${i === active ? ' is-active' : ''}`}
              >
                <p className="cs-step__label">{s.label}</p>
                <h3 className="cs-h3">{s.title}</h3>
                <p className="cs-body">{s.body}</p>
                <div className="cs-step__inline">
                  <Visual name={s.visual} />
                </div>
              </li>
            ))}
          </ol>
          <div className="cs-sticky__stage" aria-hidden="true">
            <div className="cs-sticky__frame">
              <div className="cs-sticky__tabs">
                {block.steps.map((s, i) => (
                  <span key={s.label} className={i === active ? 'is-on' : ''}>
                    {s.label}
                  </span>
                ))}
              </div>
              <div className="cs-sticky__layers">
                {block.steps.map((s, i) => (
                  <div key={s.label} className={`cs-sticky__layer${i === active ? ' is-on' : ''}`}>
                    <Visual name={s.visual} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Numbers({ block }) {
  return (
    <section className="cs-numbers cs-tone-night" aria-label="By the numbers">
      <div className="cs-wrap">
        <p className="cs-eyebrow">By the numbers</p>
        <div className="cs-numbers__grid">
          {block.items.map((n, i) => (
            <Reveal key={n.label} className="cs-number" delay={i * 90}>
              <p className="cs-number__value">{n.value}</p>
              <p className="cs-number__label">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Decisions({ block }) {
  return (
    <section className="cs-decisions cs-tone-paper" aria-labelledby={`ch-${block.number}`}>
      <div className="cs-wrap">
        <Reveal>
          <Eyebrow number={block.number}>Challenges &amp; decisions</Eyebrow>
          <h2 id={`ch-${block.number}`} className="cs-h2">
            {block.title}
          </h2>
        </Reveal>
        <div className="cs-decisions__grid">
          {block.items.map((d, i) => (
            <Reveal key={d.title} className="cs-decision" delay={i * 90}>
              <h3 className="cs-h3">{d.title}</h3>
              <p className="cs-decision__k">Decision</p>
              <p className="cs-body">{d.choice}</p>
              <p className="cs-decision__k">Trade-off</p>
              <p className="cs-body">{d.tradeoff}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roadmap({ block }) {
  return (
    <section className="cs-roadmap cs-tone-paper" aria-labelledby={`ch-${block.number}`}>
      <div className="cs-wrap">
        <Reveal>
          <Eyebrow number={block.number}>
            <span className="cs-live">In progress · not yet shipped</span>
          </Eyebrow>
          <h2 id={`ch-${block.number}`} className="cs-h2">
            {block.title}
          </h2>
          <p className="cs-lede">{block.intro}</p>
        </Reveal>
        <ul className="cs-roadmap__list">
          {block.items.map((r, i) => (
            <Reveal as="li" key={r.title} className="cs-roadmap__item" delay={i * 90}>
              <h3 className="cs-h3">{r.title}</h3>
              <p className="cs-body">{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Spec({ block }) {
  return (
    <section className="cs-spec cs-tone-paper" aria-labelledby="spec-title">
      <div className="cs-wrap">
        <h2 id="spec-title" className="cs-h2">
          Tech specs
        </h2>
        <dl className="cs-spec__table">
          {block.rows.map(([k, v]) => (
            <div key={k} className="cs-spec__row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function NextStory({ to, kicker, name, line }) {
  return (
    <nav className="cs-next cs-tone-night" aria-label="Next story">
      <Link to={to} className="cs-next__link">
        <span className="cs-eyebrow">{kicker}</span>
        <span className="cs-next__name">
          {name}
          <span className="cs-next__arrow" aria-hidden="true">
            →
          </span>
        </span>
        {line && <span className="cs-next__line">{line}</span>}
      </Link>
    </nav>
  );
}

export const BLOCKS = { chapter: Chapter, pull: Pull, sticky: StickySequence, numbers: Numbers, decisions: Decisions, roadmap: Roadmap, spec: Spec };
