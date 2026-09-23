import React, { useCallback, useState } from 'react';
import { ExternalLink, Smartphone, Lock, Play } from 'lucide-react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import SmartVideo from '../components/SmartVideo';
import TrinNavModal from './TrinNavModal';
import { Link } from '../lib/router';
import { projects } from '../data/projects';

function getDomain(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

const MEDIA_HOVER = 'transition-transform duration-500 group-hover:scale-[1.04]';

/** One real app screen in an iPhone frame. Every dimension is a percentage of the stage, so it scales with the card. */
function Phone({ screen, alt, className }) {
  return (
    <div className={`app-phone ${className}`}>
      <div className="app-phone__screen">
        <Picture webp={screen.webp} src={screen.src} alt={alt} className="app-phone__img" />
      </div>
    </div>
  );
}

/** Mobile app: an app bar in place of browser chrome, and two real screens rising out of the card. */
function AppVisual({ project }) {
  const [front, back] = project.screens;
  return (
    <div className="relative rounded-t-lg overflow-hidden border border-b-0 border-gray-800 bg-[#0d1117]">
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#161b22] border-b border-gray-800">
        <span className="app-icon" aria-hidden="true">T</span>
        <span className="text-[11px] font-semibold text-gray-200 tracking-wide">{project.title}</span>
        <div className="flex-1 flex justify-end min-w-0">
          <div className="flex items-center gap-1.5 bg-black/30 rounded-full px-3 py-[3px] text-[10.5px] text-gray-400 font-mono">
            <Smartphone size={9} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">iOS app &middot; SwiftUI</span>
          </div>
        </div>
      </div>

      <div className="app-stage relative aspect-[2/1] overflow-hidden">
        <Picture webp={project.backdrop.webp} src={project.backdrop.src} className="absolute inset-0 w-full h-full object-cover" />
        <div className="app-stage__glow" aria-hidden="true" />
        <Phone screen={back} alt={`${project.title} 360° campus view`} className="app-phone--back" />
        <Phone screen={front} alt={`${project.title} route map`} className="app-phone--front" />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
            View project <Play size={11} fill="currentColor" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ project }) {
  if (project.screens) return <AppVisual project={project} />;

  // Live website: browser chrome mockup
  const domain = getDomain(project.link);
  return (
    <div className="relative rounded-t-lg overflow-hidden border border-b-0 border-gray-800 bg-[#0d1117]">
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#161b22] border-b border-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" aria-hidden="true" />
        <div className="flex-1 flex justify-center min-w-0">
          <div className="flex items-center gap-1.5 bg-black/30 rounded-full px-3 py-[3px] text-[10.5px] text-gray-400 font-mono max-w-[70%]">
            <Lock size={9} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{domain}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[2/1] overflow-hidden bg-[#0d1117]">
        {project.video ? (
          <SmartVideo
            className={`smart-video--top ${MEDIA_HOVER}`}
            sources={project.video.sources}
            poster={project.video.poster}
            posterWebp={project.video.posterWebp}
            preload="none"
          />
        ) : project.image ? (
          <Picture
            webp={project.image.webp}
            src={project.image.src}
            alt={`${project.title} preview`}
            className={`absolute inset-0 w-full h-full object-cover object-top ${MEDIA_HOVER}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-[#0d1117] px-6">
            <span
              className="font-black uppercase tracking-tight text-transparent select-none text-center leading-tight"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.16)', fontSize: 'clamp(18px, 3vw, 28px)' }}
            >
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-[opacity,transform] duration-300">
            Visit site <ExternalLink size={12} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}

const CARD_CLASS =
  'group block h-full w-full text-left bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col items-stretch cursor-pointer ' +
  'transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:border-blue-300 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2';

/** Links render as real anchors (middle-click, copy link, screen readers all work); the modal project is a button. */
function ProjectCard({ project, onOpenModal }) {
  const body = (
    <>
      <ProjectVisual project={project} />

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h4 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {project.title}
          </h4>
          {project.modal ? (
            <Play size={13} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
          ) : (
            <ExternalLink size={13} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 list-none m-0 p-0" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[11px] border border-gray-200 group-hover:border-blue-200 transition-colors duration-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (project.modal) {
    return (
      <button type="button" onClick={onOpenModal} className={CARD_CLASS}>
        {body}
      </button>
    );
  }
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className={CARD_CLASS}>
      {body}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}


// The three platforms, each shown by its own home screen: windows captured from
// the case study recreations and drawn at one shared UI scale (0.6x), so type
// reads the same size across the row.
const SERIES_STUDIES = [
  {
    name: 'Queralt Hub',
    kind: 'Company intranet',
    meta: 'All employees · 2026',
    to: '/work/queralt/hub',
    shot: 'queralt-hub',
    width: 648,
    focusX: 118, // phones crop past the sidebar to the part that names the product
  },
  {
    name: 'Channel Sales Portal',
    kind: 'Partner relationship portal',
    meta: 'Resellers and partners · 2026',
    to: '/work/queralt/channel-portal',
    shot: 'queralt-channel',
    width: 648,
    focusX: 118,
  },
  {
    name: 'Investor Portal',
    kind: 'Private investor updates',
    meta: 'Investors · 2025',
    to: '/work/queralt/investor-portal',
    shot: 'queralt-investor',
    width: 301,
    focusX: 0,
  },
];

/** The Queralt case study series, set in Queralt's own brand: navy type, a gold hairline, Rubik, lots of white. */
function CaseStudySeries() {
  return (
    <article className="qx-card">
      <img className="qx-card__logo" src="/queralt-logo.svg" alt="Queralt Solutions" width="864" height="289" loading="lazy" decoding="async" />
      <div className="qx-card__intro">
        <h4 className="qx-card__title">
          <Link to="/work/queralt" className="qx-card__title-link">
            Queralt inc. Case Studies
          </Link>
        </h4>
        <p className="qx-card__text">Three internal platforms I designed and built as lead engineer.</p>
      </div>
      <Link to="/work/queralt" className="qx-card__cta">
        Read the case studies <span aria-hidden="true">→</span>
      </Link>
      <ul className="qx-card__products" aria-label="Platforms">
        {SERIES_STUDIES.map((s) => (
          <li key={s.to}>
            <Link to={s.to} className="qx-product">
              <span className="qx-product__tray">
                <Picture
                  webp={`/media/projects/${s.shot}.webp`}
                  src={`/media/projects/${s.shot}.jpg`}
                  alt={`${s.name} home screen`}
                  className="qx-product__shot"
                  style={{ width: s.width, '--focus-x': `${-s.focusX}px` }}
                />
              </span>
              <span className="qx-product__name">{s.name}</span>
              <span className="qx-product__kind">{s.kind}</span>
              <span className="qx-product__meta">{s.meta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** One half of the section: a numbered header and a rule, then its work. */
function ProjectGroup({ id, index, title, note, children }) {
  return (
    <section className="proj-group" aria-labelledby={id}>
      <Reveal>
        <header className="proj-group__head">
          <span className="proj-group__n" aria-hidden="true">{index}</span>
          <h3 id={id} className="proj-group__title">{title}</h3>
          <p className="proj-group__note">{note}</p>
        </header>
      </Reveal>
      {children}
    </section>
  );
}

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <section id="projects" className="proj-surface py-12 sm:py-20">
      {/* Survey drawing under the work; generated by scripts/build-topography.mjs */}
      <div className="proj-topo" style={{ '--topo': 'url(/media/backgrounds/topography.svg)' }} aria-hidden="true" />
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="proj-title display-heading display-heading-outline text-3xl sm:text-4xl lg:text-5xl mx-auto mb-8 sm:mb-12 text-center text-gray-800">
            Featured Projects
          </h2>
        </Reveal>

        <ProjectGroup id="projects-enterprise" title="Enterprise Software" >
          <Reveal>
            <CaseStudySeries />
          </Reveal>
        </ProjectGroup>

        <ProjectGroup id="projects-independent" title="Personal Projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={(index % 3) * 90}>
                <ProjectCard project={project} onOpenModal={openModal} />
              </Reveal>
            ))}
          </div>
        </ProjectGroup>

        <Reveal className="mt-8 sm:mt-12">
          <a
            href="https://github.com/DrakeBellisarii"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span className="font-medium">More on GitHub</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

      {modalOpen && <TrinNavModal onClose={closeModal} />}
    </section>
  );
}
