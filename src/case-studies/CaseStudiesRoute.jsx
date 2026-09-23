import React, { useEffect, useRef } from 'react';
import Reveal from '../components/Reveal';
import { Link } from '../lib/router';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { BLOCKS, NextStory, Visual } from './Blocks';
import { EcosystemDiagram } from './visuals/Diagrams';
import { SERIES, STUDIES } from './content';
import META from './meta.json';
import '../styles/case-study.css';

const BY_PATH = Object.fromEntries(Object.values(STUDIES).map((s) => [s.path, s]));

/** Reading progress as one hairline, written straight to the DOM once per frame. */
function Progress() {
  const bar = useRef(null);
  useEffect(() => {
    let queued = false;
    const paint = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    paint();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <span ref={bar} className="cs-progress" aria-hidden="true" />;
}

function TopBar({ current }) {
  return (
    <header className="cs-top">
      <div className="cs-top__inner">
        <Link to="/#projects" className="cs-top__back">
          <span aria-hidden="true">←</span> Drake Bellisari
        </Link>
        <Link to={SERIES.path} className="cs-top__series" aria-current={current === 'series' ? 'page' : undefined}>
          Queralt <span>· case study series</span>
        </Link>
        <nav className="cs-top__studies" aria-label="Case studies in this series">
          {SERIES.studies.map((key) => {
            const s = STUDIES[key];
            return (
              <Link key={key} to={s.path} aria-current={current === key ? 'page' : undefined} title={s.name}>
                {s.index}
                <span className="sr-only"> {s.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <Progress />
    </header>
  );
}

function Shell({ current, children }) {
  return (
    <div className="cs-root">
      <a href="#cs-main" className="cs-skip">
        Skip to content
      </a>
      <TopBar current={current} />
      <main id="cs-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

function Hero({ study }) {
  return (
    <section className="cs-hero cs-tone-night" aria-labelledby="cs-title">
      <div className="cs-wrap">
        <p className="cs-eyebrow cs-hero__kicker">
          <span className="cs-eyebrow__n">{study.index}</span>Queralt · {study.kind}
        </p>
        <h1 id="cs-title" className="cs-hero__title">
          {study.name}
        </h1>
        <p className="cs-hero__lede">{study.oneLiner}</p>
        {study.meta && (
          <dl className="cs-hero__meta">
            {study.meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="cs-wrap cs-hero__visual">
        <Visual name={study.hero} priority />
      </div>
    </section>
  );
}

function nextFor(study) {
  if (study.next === 'series') return { to: SERIES.path, kicker: 'Back to the series', name: `${SERIES.name}: ${SERIES.title.toLowerCase()}`, line: SERIES.throughline };
  const n = STUDIES[study.next];
  return { to: n.path, kicker: `Next case study · ${n.index}`, name: n.name, line: n.oneLiner };
}

function StudyPage({ study }) {
  useDocumentMeta(META[study.path]);
  return (
    <Shell current={study.slug}>
      <Hero study={study} />
      {study.blocks.map((block, i) => {
        const B = BLOCKS[block.kind];
        // eslint-disable-next-line react/no-array-index-key
        return B ? <B key={`${block.kind}-${i}`} block={block} /> : null;
      })}
      <NextStory {...nextFor(study)} />
    </Shell>
  );
}

function ShortPage({ study }) {
  useDocumentMeta(META[study.path]);
  return (
    <Shell current={study.slug}>
      <Hero study={study} />
      <section className="cs-beats cs-tone-paper" aria-label="The story">
        <div className="cs-wrap">
          <ol className="cs-beats__list">
            {study.beats.map((b, i) => (
              <Reveal as="li" key={b.title} className="cs-beat" delay={i * 90}>
                <p className="cs-eyebrow">
                  <span className="cs-eyebrow__n">{String(i + 1).padStart(2, '0')}</span>
                </p>
                <h2 className="cs-h3">{b.title}</h2>
                <p className="cs-body">{b.body}</p>
              </Reveal>
            ))}
          </ol>
          <p className="cs-stackline">
            <span>Stack</span>
            {study.stack}
          </p>
        </div>
      </section>
      <NextStory {...nextFor(study)} />
    </Shell>
  );
}

function SeriesPage() {
  useDocumentMeta(META[SERIES.path]);
  return (
    <Shell current="series">
      <section className="cs-hero cs-hero--series cs-tone-night" aria-labelledby="cs-title">
        <div className="cs-wrap">
          <p className="cs-eyebrow cs-hero__kicker">{SERIES.kicker}</p>
          <h1 id="cs-title" className="cs-hero__title">
            {SERIES.name}
            <span className="cs-hero__title-2">{SERIES.title}</span>
          </h1>
          <p className="cs-hero__lede">{SERIES.lede}</p>
          {SERIES.body.map((p) => (
            <p key={p.slice(0, 20)} className="cs-body cs-body--night">
              {p}
            </p>
          ))}
        </div>
      </section>
      <section className="cs-pull cs-tone-paper">
        <Reveal className="cs-wrap">
          <p className="cs-eyebrow">Common thread</p>
          <p className="cs-pull__text">{SERIES.throughline}</p>
        </Reveal>
      </section>
      <section className="cs-index cs-tone-paper" aria-labelledby="series-studies">
        <div className="cs-wrap">
          <h2 id="series-studies" className="cs-h2">
            The studies
          </h2>
          <ol className="cs-index__list">
            {SERIES.studies.map((key, i) => {
              const s = STUDIES[key];
              return (
                <Reveal as="li" key={key} className="cs-index__item" delay={i * 80}>
                  <Link to={s.path} className="cs-index__link">
                    <span className="cs-index__n">{s.index}</span>
                    <span className="cs-index__text">
                      <span className="cs-index__kind">{s.kind}</span>
                      <span className="cs-index__name">{s.name}</span>
                      <span className="cs-index__line">{s.oneLiner}</span>
                    </span>
                    <span className="cs-index__visual" data-no-compact="">
                      <Visual name={s.hero} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>
      <section className="cs-chapter cs-chapter--wide cs-tone-night" aria-labelledby="series-map">
        <div className="cs-wrap cs-chapter__grid">
          <Reveal className="cs-chapter__text">
            <p className="cs-eyebrow">Architecture</p>
            <h2 id="series-map" className="cs-h2">
              How the systems connect
            </h2>
            <div className="cs-chapter__copy">
              <p className="cs-body">The hub is at the centre. The channel sales, pilot support and investor portals each connect to it with their own API key and send webhooks, which appear in the hub as notifications. Microsoft Entra ID provides sign-in and the company directory for the hub.</p>
            </div>
          </Reveal>
          <Reveal className="cs-chapter__visual" delay={120}>
            <EcosystemDiagram />
          </Reveal>
        </div>
      </section>
      <NextStory to={STUDIES.hub.path} kicker="Start with case study 01" name={STUDIES.hub.name} line={STUDIES.hub.oneLiner} />
    </Shell>
  );
}

function NotFound() {
  useDocumentMeta({ title: 'Not found · Drake Bellisari' });
  return (
    <Shell current="">
      <section className="cs-hero cs-tone-night">
        <div className="cs-wrap">
          <h1 className="cs-hero__title">Not here.</h1>
          <p className="cs-hero__lede">
            That page does not exist. <Link to={SERIES.path}>See the Queralt case studies</Link> or <Link to="/">go home</Link>.
          </p>
        </div>
      </section>
    </Shell>
  );
}

export default function CaseStudiesRoute({ path }) {
  const clean = path.replace(/\/+$/, '') || '/';
  if (clean === SERIES.path) return <SeriesPage />;
  const study = BY_PATH[clean];
  if (!study) return <NotFound />;
  return study.short ? <ShortPage study={study} /> : <StudyPage study={study} />;
}
