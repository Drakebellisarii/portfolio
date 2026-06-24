import React, { useState } from 'react';
import { Award, Trophy, Dumbbell, ChevronRight } from 'lucide-react';

const disciplines = [
  {
    label: 'Core CS',
    courses: [
      { id: 'ds-algos', name: 'Data Structures + Algorithms', detail: 'Fundamental algorithms and data structure implementations with run-time optimization and problem-solving strategies.' },
      { id: 'analysis', name: 'Analysis of Algorithms',       detail: 'Formal complexity analysis using Big-O, Big-Θ, and Big-Ω notation. Divide-and-conquer, dynamic programming, greedy design, and NP-completeness.' },
      { id: 'systems', name: 'Computer Systems',              detail: 'Computer architecture and system-level programming including memory management and process control.' },
      { id: 'python',  name: 'Python Fundamentals',           detail: 'Core Python syntax, object-oriented principles, data manipulation, and algorithmic implementations.' },
    ],
  },
  {
    label: 'Mathematics',
    courses: [
      { id: 'discrete', name: 'Discrete Mathematics', detail: 'Logic, set theory, proof techniques, combinatorics, and probability fundamentals.' },
      { id: 'calculus', name: 'Calculus 1 & 2',       detail: 'Differential and integral calculus with real-world applications.' },
      { id: 'linear',   name: 'Linear Algebra',       detail: 'Vector spaces, matrices, linear transformations, eigenvalues, and applications in CS.' },
    ],
  },
  {
    label: 'Electives',
    courses: [
      { id: 'ai',       name: 'Artificial Intelligence',  detail: 'Search algorithms, constraint satisfaction, adversarial game trees, ML fundamentals, and Bayesian inference.' },
      { id: 'sensitive',name: 'Sensitive Information',    detail: 'Privacy law, PII handling and classification, breach response, and regulatory compliance frameworks.' },
      { id: 'cloud',    name: 'Cloud Native Development', detail: 'Microservices, containerization, cloud platform deployment, and scaling strategies.' },
      { id: 'swdesign', name: 'Software Design',          detail: 'Design patterns, software architecture principles, and interface design methodologies.' },
      { id: 'security', name: 'Computer Security',        detail: 'Cryptography, secure communication protocols, and vulnerability assessment.' },
    ],
  },
];

const achievements = [
  { Icon: Award,    label: 'Graduated with Honors' },
  { Icon: Trophy,   label: 'Experiential Certificate in Cybersecurity' },
  { Icon: Dumbbell, label: '4 Year Varsity Athlete' },
];

export default function Education() {
  const [activeTab, setActiveTab] = useState('Core CS');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const activeCourses = disciplines.find(d => d.label === activeTab)?.courses || [];
  const toggle = (id) => setExpandedCourse(prev => prev === id ? null : id);

  return (
    <section id="education" className="relative overflow-hidden" style={{ paddingTop: 130, paddingBottom: 140 }}>

      {/* Background: campus photo, heavily darkened */}
      <div className="absolute inset-0" style={{
        backgroundImage: "url('/Trin.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        filter: 'blur(3px) brightness(0.22) saturate(0.12)',
      }} />
      {/* Vignette — darker edges, slightly open center */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 110% 80% at 50% 55%, rgba(5,9,20,0.2) 0%, rgba(5,9,20,0.78) 100%)',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">


        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-24 lg:items-center">

          {/* LEFT: Institution identity */}
          <div>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: 12.5, color: 'rgba(148,163,184,0.55)', marginBottom: 18 }}>
              Hartford, Connecticut
            </p>

            <h2 style={{
              fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif",
              fontSize: 'clamp(42px, 6vw, 76px)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.025em',
              color: 'oklch(97% 0.004 245)',
              marginBottom: 26,
            }}>
              Trinity<br />College
            </h2>

            {/* Blue accent rule */}
            <div style={{ width: 34, height: 2, background: '#3b82f6', borderRadius: 1, marginBottom: 26 }} />

            {/* Degree */}
            <p style={{ fontFamily: "'Georgia', serif", fontSize: 15, lineHeight: 1.65, color: 'oklch(80% 0.01 245)', marginBottom: 10, whiteSpace: 'nowrap' }}>
              B.S. <span style={{ fontStyle: 'italic' }}>Computer Science</span>
            </p>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: 14, color: 'oklch(62% 0.012 245)', marginBottom: 36 }}>
              Graduated May 2026
            </p>

            {/* Thin divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 30 }} />

            {/* Achievements — stacked, no cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {achievements.map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'rgba(59,130,246,0.11)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <Icon size={12} style={{ color: '#60a5fa' }} />
                  </div>
                  <span style={{ fontFamily: "'Georgia', serif", fontSize: 13.5, lineHeight: 1.55, color: 'oklch(74% 0.01 245)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Coursework, tab-filtered */}
          <div>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: 13, color: 'rgba(148,163,184,0.6)', marginBottom: 22 }}>
              Select a discipline to explore the coursework.
            </p>

            {/* Tab bar — underline style, no pill or box */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 2 }}>
              {disciplines.map(d => (
                <button
                  key={d.label}
                  onClick={() => { setActiveTab(d.label); setExpandedCourse(null); }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    paddingTop: 8, paddingBottom: 10, paddingLeft: 0, paddingRight: 20,
                    fontFamily: "'Georgia', serif",
                    fontSize: 13.5,
                    fontWeight: activeTab === d.label ? 600 : 400,
                    color: activeTab === d.label ? 'oklch(95% 0.005 245)' : 'rgba(255,255,255,0.3)',
                    borderBottom: activeTab === d.label ? '2px solid #3b82f6' : '2px solid transparent',
                    marginBottom: -1,
                    transition: 'color 0.17s, border-color 0.17s',
                    letterSpacing: '0.01em',
                    flexShrink: 0,
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Course list — numbered editorial rows, zero box */}
            <div>
              {activeCourses.map((course, i) => (
                <div key={course.id}>
                  <button
                    onClick={() => toggle(course.id)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 18,
                      padding: '17px 0',
                      borderBottom: expandedCourse === course.id ? 'none' : '1px solid rgba(255,255,255,0.055)',
                      textAlign: 'left',
                    }}
                  >
                    {/* Index number */}
                    <span style={{
                      fontFamily: 'monospace', fontSize: 10, fontWeight: 600,
                      color: 'rgba(100,130,180,0.45)', flexShrink: 0,
                      minWidth: 20, lineHeight: 1, userSelect: 'none',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Course name */}
                    <span style={{
                      flex: 1, fontFamily: "'Georgia', serif", fontSize: 14.5,
                      color: 'oklch(87% 0.007 245)', lineHeight: 1.35,
                    }}>
                      {course.name}
                    </span>
                    {/* Chevron */}
                    <ChevronRight size={12} style={{
                      flexShrink: 0, color: 'rgba(148,163,184,0.3)',
                      transform: expandedCourse === course.id ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.17s ease',
                    }} />
                  </button>

                  {/* Expanded detail — italic, indented, no background */}
                  {expandedCourse === course.id && (
                    <div style={{ paddingLeft: 38, paddingBottom: 18, paddingTop: 2, borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                      <p style={{
                        fontFamily: "'Georgia', serif", fontSize: 13, fontStyle: 'italic',
                        color: 'rgba(148,163,184,0.68)', lineHeight: 1.8,
                      }}>
                        {course.detail}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
