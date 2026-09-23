import React from 'react';
import { BookOpen, ClipboardList, Compass, FileText, HelpCircle, LayoutDashboard, Library, Lock, Presentation, Route, ShieldCheck } from 'lucide-react';
import { BrowserFrame, Scaled } from './Frames';

// Fictional partners, customers and people only.
const PARTNER_NAV = [
  ['Dashboard', LayoutDashboard],
  ['Deal registration', ClipboardList],
  ['Resources', Library],
  ['Onboarding', BookOpen],
  ['Implementation', Route],
  ['Discovery', Compass],
];

function PartnerSide({ active = 0 }) {
  return (
    <aside className="ui-side ui-side--partner">
      <div className="ui-side__brand">
        <span className="ui-side__mark" /> Partner Portal
      </div>
      <nav className="ui-side__nav">
        {PARTNER_NAV.map(([l, Icon], i) => (
          <div key={l} className={`ui-side__item${i === active ? ' is-active' : ''}`}>
            <Icon size={15} strokeWidth={1.8} className="ui-side__icon" />
            {l}
          </div>
        ))}
      </nav>
      <div className="ui-side__org">
        <span className="ui-side__orgmark">B</span>
        <div>
          <b>Brightline MSP</b>
          <span>Guest · signed in with Microsoft</span>
        </div>
      </div>
    </aside>
  );
}

export const PartnerDashboard = () => (
  <Scaled width={1080} height={640} label="Recreation of the partner dashboard for a fictional partner, Brightline MSP: deals by stage, recent registrations and messages from the Queralt team.">
    <BrowserFrame title="Partner Portal · Dashboard">
      <div className="ui-app">
        <PartnerSide />
        <main className="ui-main">
          <div className="ui-main__top">
            <div>
              <p className="ui-kicker">Brightline MSP</p>
              <h4 className="ui-h1">Welcome back, Jordan</h4>
            </div>
            <span className="ui-btn">Register a deal</span>
          </div>
          <div className="ui-stages">
            {[
              ['Registered', 4],
              ['In review', 2],
              ['Approved', 3],
              ['Won', 1],
            ].map(([s, n], i) => (
              <div key={s} className="ui-stage ui-anim-rise" style={{ '--d': `${i * 70}ms` }}>
                <span>{s}</span>
                <b>{n}</b>
              </div>
            ))}
          </div>
          <div className="ui-grid2">
            <section className="ui-panel">
              <p className="ui-panel__title">Recent deals</p>
              {[
                ['Crestview Health', 'In review'],
                ['Harbor & Pine Legal', 'Approved'],
                ['Oakridge Schools', 'Registered'],
              ].map(([c, s]) => (
                <div key={c} className="ui-row">
                  <span className="ui-row__title">{c}</span>
                  <span className={`ui-chip${s === 'Approved' ? ' ui-chip--ok' : ''}`}>{s}</span>
                </div>
              ))}
            </section>
            <section className="ui-panel">
              <p className="ui-panel__title">From the Queralt team</p>
              {['Crestview: can you share the seat count?', 'New battlecard in Resources', 'Onboarding step 3 unlocked'].map((m) => (
                <div key={m} className="ui-row">
                  <span className="ui-dotmark" />
                  <span className="ui-row__title">{m}</span>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const PartnerTypes = () => (
  <Scaled width={1000} height={440} label="The three kinds of channel partner: resellers, managed service providers and integrators, with fictional example partners.">
    <div className="ui-types">
      {[
        ['Resellers', 'Sell the product to their own customers.', 'Northwind Security'],
        ['MSPs', 'Run it for customers as a managed service.', 'Brightline MSP'],
        ['Integrators', 'Build it into the systems customers already use.', 'Halcyon IT'],
      ].map(([t, d, ex], i) => (
        <div key={t} className="ui-type ui-anim-rise" style={{ '--d': `${i * 110}ms` }}>
          <p className="ui-type__n">0{i + 1}</p>
          <p className="ui-type__t">{t}</p>
          <p className="ui-type__d">{d}</p>
          <p className="ui-type__ex">Example partner · {ex}</p>
        </div>
      ))}
    </div>
  </Scaled>
);

/** Each Figma artboard is a miniature of its page, with real content rather than grey boxes. */
const BOARDS = [
  {
    name: 'Dashboard',
    body: (
      <>
        <div className="ab-stats">
          <span>
            <b>4</b>Registered
          </span>
          <span>
            <b>2</b>In review
          </span>
          <span>
            <b>3</b>Approved
          </span>
        </div>
        <p className="ab-row">Crestview Health · In review</p>
        <p className="ab-row">Harbor &amp; Pine Legal · Approved</p>
      </>
    ),
  },
  {
    name: 'Deal registration',
    body: (
      <>
        {['Customer', 'Seats', 'Expected close', 'Use case'].map((f) => (
          <p key={f} className="ab-field">
            <span>{f}</span>
          </p>
        ))}
        <p className="ab-btn">Submit for review</p>
      </>
    ),
  },
  {
    name: 'Resource library',
    body: (
      <div className="ab-tiles">
        {['Overview deck', 'Battlecard', 'One-pager', 'Setup guide'].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    ),
  },
  {
    name: 'Onboarding',
    body: (
      <>
        {[
          ['Sign partner agreement', true],
          ['Complete product training', true],
          ['Register a first deal', false],
          ['Book a kickoff call', false],
        ].map(([t, done]) => (
          <p key={t} className={`ab-check${done ? ' is-done' : ''}`}>
            {t}
          </p>
        ))}
      </>
    ),
  },
  {
    name: 'Implementation tracker',
    body: (
      <>
        {['Kickoff', 'Configuration', 'Pilot', 'Go-live'].map((s, i) => (
          <p key={s} className={`ab-step${i < 2 ? ' is-done' : i === 2 ? ' is-now' : ''}`}>
            {s}
          </p>
        ))}
      </>
    ),
  },
  {
    name: 'Customer discovery',
    body: (
      <>
        {['How do users sign in today?', 'Which systems must it work with?', 'Who approves security changes?'].map((q) => (
          <p key={q} className="ab-row">
            {q}
          </p>
        ))}
      </>
    ),
  },
  {
    name: 'Help',
    body: (
      <>
        {['How do I register a deal?', 'Where are the sales decks?', 'Who is my partner manager?'].map((q) => (
          <p key={q} className="ab-faq">
            {q}
          </p>
        ))}
      </>
    ),
  },
  {
    name: 'Settings',
    body: (
      <>
        {[
          ['Email notifications', true],
          ['Weekly summary', true],
          ['Share deals with team', false],
        ].map(([t, on]) => (
          <p key={t} className="ab-toggle">
            {t}
            <i className={on ? 'is-on' : ''} />
          </p>
        ))}
      </>
    ),
  },
];

export const FigmaBoard = () => (
  <Scaled width={1080} height={640} label="The eight-page product concept designed in Figma: dashboard, deal registration, resource library, onboarding, implementation tracker, customer discovery, help and settings.">
    <div className="ui-figma">
      <div className="ui-figma__bar">
        <span>Partner Portal · Concept</span>
        <span>8 pages</span>
      </div>
      <div className="ui-figma__grid">
        {BOARDS.map((b, i) => (
          <div key={b.name} className="ui-board ui-anim-rise" style={{ '--d': `${i * 50}ms` }}>
            <p className="ui-board__label">{b.name}</p>
            <div className="ui-board__art">
              <p className="ab-title">{b.name}</p>
              {b.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Scaled>
);

export const DealRegistration = () => (
  <Scaled width={1000} height={520} label="Recreation of the deal registration form, filled in for a fictional customer.">
    <BrowserFrame title="Partner Portal · Register a deal">
      <div className="ui-form">
        <p className="ui-kicker">Step 2 of 3</p>
        <h4 className="ui-h1">Register a deal</h4>
        <div className="ui-form__grid">
          {[
            ['Customer', 'Crestview Health'],
            ['Primary contact', 'Dana Whitfield'],
            ['Seats', '250'],
            ['Expected close', 'Next quarter'],
          ].map(([l, v]) => (
            <label key={l} className="ui-field">
              <span>{l}</span>
              <span className="ui-input">{v}</span>
            </label>
          ))}
          <label className="ui-field ui-field--wide">
            <span>Use case</span>
            <span className="ui-input ui-input--area">Rolling out to staff across three sites, starting with one.</span>
          </label>
        </div>
        <div className="ui-form__foot">
          <span className="ui-btn ui-btn--ghost">Save draft</span>
          <span className="ui-btn">Submit for review</span>
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const DealThread = () => (
  <Scaled width={1000} height={510} label="Recreation of a deal with its message thread between a partner and the Queralt team. Fictional data.">
    <BrowserFrame title="Partner Portal · Crestview Health">
      <div className="ui-thread">
        <div className="ui-thread__deal">
          <p className="ui-kicker">Deal</p>
          <h4 className="ui-h1">Crestview Health</h4>
          {[
            ['Partner', 'Brightline MSP'],
            ['Seats', '250'],
            ['Stage', 'In review'],
          ].map(([k, v]) => (
            <p key={k} className="ui-kv">
              <span>{k}</span>
              <b>{v}</b>
            </p>
          ))}
        </div>
        <div className="ui-thread__msgs">
          {[
            ['partner', 'Jordan · Brightline MSP', 'Registered. They want to start with one site.'],
            ['team', 'Theo · Queralt', 'Great. Can you confirm the seat count for that site?'],
            ['partner', 'Jordan · Brightline MSP', 'About 90 to start, 250 across all three.'],
            ['team', 'Theo · Queralt', 'Approved for review. The implementation guide is in Resources.'],
          ].map(([side, who, text], i) => (
            <div key={text} className={`ui-bubble ui-bubble--${side} ui-anim-rise`} style={{ '--d': `${i * 130}ms` }}>
              <p className="ui-bubble__who">{who}</p>
              <p>{text}</p>
            </div>
          ))}
          <div className="ui-composer">Reply to the Queralt team…</div>
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const AssetLibrary = () => (
  <Scaled width={1000} height={580} label="Recreation of the partner asset library: sales collateral organized by type. Fictional data.">
    <BrowserFrame title="Partner Portal · Resources">
      <div className="ui-assets">
        <div className="ui-pilot__head">
          <h4 className="ui-h1">Resources</h4>
          <div className="ui-pilot__tools">
            {['All', 'Decks', 'Guides', 'Battlecards'].map((f, i) => (
              <span key={f} className={`ui-filter${i === 0 ? ' is-on' : ''}`}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="ui-assets__grid">
          {[
            ['Product overview', 'Deck', 'Updated this month', Presentation],
            ['Implementation guide', 'Guide', 'v2.1', BookOpen],
            ['Competitive battlecard', 'Battlecard', 'Updated this week', ShieldCheck],
            ['Discovery questions', 'Guide', '12 questions', HelpCircle],
            ['Customer one-pager', 'Deck', '1 page', FileText],
            ['Onboarding checklist', 'Guide', '8 steps', ClipboardList],
          ].map(([t, k, meta, Icon], i) => (
            <div key={t} className="ui-asset ui-anim-rise" style={{ '--d': `${i * 60}ms` }}>
              <div className={`ui-asset__cover ui-asset__cover--${k.toLowerCase()}`}>
                <Icon size={20} strokeWidth={1.6} />
                <span>{t}</span>
              </div>
              <p className="ui-asset__t">{t}</p>
              <p className="ui-asset__k">
                {k} · {meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const InvestorSignIn = () => (
  <Scaled width={1000} height={540} label="Recreation of the original investor portal: a signed-in investor's list of updates and materials, with the session held in an HTTP-only cookie. Fictional data.">
    <div className="ui-investor">
      <BrowserFrame title="Investor Portal · Updates">
        <div className="ui-inv">
          <div className="ui-inv__head">
            <div>
              <p className="ui-kicker">Signed in</p>
              <h4 className="ui-h2">Alex Morgan</h4>
            </div>
            <span className="ui-inv__lock">
              <Lock size={13} strokeWidth={2} /> Private
            </span>
          </div>
          {[
            ['Quarterly update', 'Update', 'Oct'],
            ['Product roadmap summary', 'Material', 'Sep'],
            ['Pilot program overview', 'Material', 'Aug'],
            ['Quarterly update', 'Update', 'Jul'],
          ].map(([t, k, m], i) => (
            <div key={t + m} className="ui-inv__row ui-anim-rise" style={{ '--d': `${i * 80}ms` }}>
              <FileText size={16} strokeWidth={1.6} />
              <span className="ui-inv__t">{t}</span>
              <span className="ui-chip">{k}</span>
              <span className="ui-inv__m">{m}</span>
            </div>
          ))}
        </div>
      </BrowserFrame>
      <div className="ui-cookie">
        <p className="ui-cookie__k">Set-Cookie</p>
        <p>
          session=<i>…</i>;
        </p>
        <p>
          <b>HttpOnly</b>; <b>Secure</b>; <b>SameSite</b>
        </p>
        <p className="ui-cookie__note">The session token cannot be read by page scripts.</p>
      </div>
    </div>
  </Scaled>
);

