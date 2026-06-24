import React from 'react';

const links = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education'   },
  { id: 'projects',   label: 'Projects'    },
];

export default function Nav({ activeSection, scrollToSection, onContact }) {
  return (
    <nav className="nav-stack">
      {links.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`nav-stack-link${activeSection === id ? ' active' : ''}`}
        >
          {label}
        </button>
      ))}
      <button onClick={onContact} className="nav-stack-link">
        Contact
      </button>
    </nav>
  );
}
