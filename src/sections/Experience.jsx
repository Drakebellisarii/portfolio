import React from 'react';
import Reveal from '../components/Reveal';
import { roles } from '../data/experience';
import '../styles/experience.css';

const pad = (n) => String(n).padStart(2, '0');

/** One role, set as an entry: its number and dates on the left, the work on the right. */
function Entry({ entry, index }) {
  return (
    <li id={`xp-${entry.id}`} className="xp-entry">
      <Reveal className="xp-entry__inner">
        <div className="xp-entry__side">
          <span className="xp-entry__n">{pad(index + 1)}</span>
          <span className="xp-entry__when">{entry.dates}</span>
          <img className="xp-entry__logo" src={entry.logo} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="xp-entry__main">
          <h3 className="xp-entry__title">{entry.title}</h3>
          <p className="xp-entry__meta">
            <span className="xp-entry__employer">{entry.employer}</span>
            <span>{entry.meta}</span>
          </p>
          <p className="xp-entry__body">{entry.body}</p>
          <ul className="xp-entry__tags" aria-label="Skills">
            {entry.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="xp">
      <div className="xp-inner">
        <Reveal>
          <h2 className="xp-heading display-heading display-heading-outline text-3xl sm:text-4xl">Work Experience</h2>
        </Reveal>
        <ol className="xp-entries">
          {roles.map((role, i) => (
            <Entry key={role.id} entry={role} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
