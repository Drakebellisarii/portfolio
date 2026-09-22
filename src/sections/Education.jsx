import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import { disciplines, achievements } from '../data/education';

const serif = "'Georgia', 'Cambria', 'Times New Roman', serif";

function CourseRow({ course, index, open, onToggle }) {
  const detailId = `course-${course.id}`;
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailId}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 18,
          padding: '17px 0', textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace', fontSize: 10, fontWeight: 600,
            color: 'rgba(100,130,180,0.45)', flexShrink: 0,
            minWidth: 20, lineHeight: 1, userSelect: 'none',
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ flex: 1, fontFamily: serif, fontSize: 14.5, color: 'oklch(87% 0.007 245)', lineHeight: 1.35 }}>
          {course.name}
        </span>
        <ChevronRight
          size={12}
          aria-hidden="true"
          style={{
            flexShrink: 0, color: 'rgba(148,163,184,0.3)',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s var(--ease-out)',
          }}
        />
      </button>

      <div id={detailId} className={`course-detail${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="course-detail__inner">
          <p
            style={{
              margin: 0, paddingLeft: 38, paddingBottom: 18, paddingTop: 2,
              fontFamily: serif, fontSize: 13, fontStyle: 'italic',
              color: 'rgba(148,163,184,0.68)', lineHeight: 1.8,
            }}
          >
            {course.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [activeTab, setActiveTab] = useState(disciplines[0].label);
  const [expanded, setExpanded] = useState(null);

  const courses = disciplines.find((d) => d.label === activeTab)?.courses ?? [];
  const selectTab = (label) => {
    setActiveTab(label);
    setExpanded(null);
  };

  return (
    <section id="education" className="relative overflow-hidden" style={{ paddingTop: 130, paddingBottom: 140 }}>
      {/* Campus photo, darkened and blurred at build time rather than with CSS filters */}
      <div className="absolute inset-0" aria-hidden="true">
        <Picture
          webp="/media/backgrounds/trinity.webp"
          src="/media/backgrounds/trinity.jpg"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 110% 80% at 50% 55%, rgba(5,9,20,0.2) 0%, rgba(5,9,20,0.78) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-24 lg:items-center">
          {/* Institution */}
          <Reveal>
            <p style={{ fontFamily: serif, fontSize: 12.5, color: 'rgba(148,163,184,0.55)', marginBottom: 18 }}>
              Hartford, Connecticut
            </p>

            <h2
              style={{
                fontFamily: serif,
                fontSize: 'clamp(42px, 6vw, 76px)',
                fontWeight: 700,
                lineHeight: 0.88,
                letterSpacing: '-0.025em',
                color: 'oklch(97% 0.004 245)',
                marginBottom: 26,
              }}
            >
              Trinity<br />College
            </h2>

            <div style={{ width: 34, height: 2, background: '#3b82f6', borderRadius: 1, marginBottom: 26 }} aria-hidden="true" />

            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.65, color: 'oklch(80% 0.01 245)', marginBottom: 10, whiteSpace: 'nowrap' }}>
              B.S. <span style={{ fontStyle: 'italic' }}>Computer Science</span>
            </p>
            <p style={{ fontFamily: serif, fontSize: 14, color: 'oklch(62% 0.012 245)', marginBottom: 36 }}>
              Graduated May 2026
            </p>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 30 }} aria-hidden="true" />

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {achievements.map(({ Icon, label }) => (
                <li key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <span
                    style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: 'rgba(59,130,246,0.11)',
                      border: '1px solid rgba(59,130,246,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={12} style={{ color: '#60a5fa' }} />
                  </span>
                  <span style={{ fontFamily: serif, fontSize: 13.5, lineHeight: 1.55, color: 'oklch(74% 0.01 245)' }}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Coursework */}
          <Reveal delay={120}>
            <p style={{ fontFamily: serif, fontSize: 13, color: 'rgba(148,163,184,0.6)', marginBottom: 22 }}>
              Select a discipline to explore the coursework.
            </p>

            <div role="tablist" aria-label="Disciplines" style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 2 }}>
              {disciplines.map((d) => {
                const selected = activeTab === d.label;
                return (
                  <button
                    key={d.label}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectTab(d.label)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      paddingTop: 8, paddingBottom: 10, paddingLeft: 0, paddingRight: 20,
                      fontFamily: serif, fontSize: 13.5,
                      fontWeight: selected ? 600 : 400,
                      color: selected ? 'oklch(95% 0.005 245)' : 'rgba(255,255,255,0.3)',
                      borderBottom: selected ? '2px solid #3b82f6' : '2px solid transparent',
                      marginBottom: -1,
                      transition: 'color 0.17s, border-color 0.17s',
                      letterSpacing: '0.01em',
                      flexShrink: 0,
                    }}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>

            {/* Keyed by tab so switching disciplines crossfades the list in */}
            <div key={activeTab} className="panel-in" role="tabpanel">
              {courses.map((course, i) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  index={i}
                  open={expanded === course.id}
                  onToggle={() => setExpanded((prev) => (prev === course.id ? null : course.id))}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
