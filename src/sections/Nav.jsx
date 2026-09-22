import React, { useEffect, useState } from 'react';
import { scrollToSection } from '../lib/scroll';
import '../styles/nav.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('about');

  // Whichever section currently crosses the 40% line of the viewport is active.
  // Runs entirely off the main render path: no scroll listeners, no re-renders
  // of anything but this component.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const crossing = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        });
        const current = sections.map((s) => s.id).filter((id) => crossing.has(id)).pop();
        if (current) setActive(current);
      },
      { rootMargin: '-40% 0px -59% 0px', threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  const visible = active === 'about';

  return (
    <nav className={`nav${visible ? ' is-visible' : ''}`} aria-label="Sections" aria-hidden={!visible}>
      {LINKS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollToSection(id)}
          className={`nav__link${active === id ? ' is-active' : ''}`}
          aria-current={active === id ? 'true' : undefined}
          tabIndex={visible ? 0 : -1}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
