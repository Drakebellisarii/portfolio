import React from 'react';
import { BrowserFrame, Scaled } from './Frames';

// Fictional partners, customers and people only.
const PARTNER_NAV = ['Dashboard', 'Deal registration', 'Resources', 'Onboarding', 'Implementation', 'Discovery', 'Help', 'Settings'];

function PartnerSide({ active = 0 }) {
  return (
    <aside className="ui-side ui-side--partner">
      <div className="ui-side__brand">
        <span className="ui-side__mark" /> Partner Portal
      </div>
      <nav>
        {PARTNER_NAV.slice(0, 6).map((l, i) => (
          <div key={l} className={`ui-side__item${i === active ? ' is-active' : ''}`}>
            <span className="ui-side__icon" />
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
  <Scaled width={1080} height={660} label="Recreation of the partner dashboard for a fictional partner, Brightline MSP: deals by stage, recent registrations and messages from the Queralt team.">
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
            ].map(([s, n]) => (
              <div key={s} className="ui-stage">
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
              {['Crestview: can you share seat count?', 'New battlecard in Resources', 'Onboarding step 3 unlocked'].map((m) => (
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
  <Scaled width={1000} height={520} label="The three kinds of channel partner: resellers, managed service providers and integrators, with fictional example partners.">
    <div className="ui-types">
      {[
        ['Resellers', 'Sell the product to their own customers.', 'Northwind Security'],
        ['MSPs', 'Run it for customers as a managed service.', 'Brightline MSP'],
        ['Integrators', 'Build it into the systems customers already use.', 'Halcyon IT'],
      ].map(([t, d, ex], i) => (
        <div key={t} className="ui-type" style={{ transform: `translateY(${[0, 36, 12][i]}px)` }}>
          <p className="ui-type__n">0{i + 1}</p>
          <p className="ui-type__t">{t}</p>
          <p className="ui-type__d">{d}</p>
          <p className="ui-type__ex">e.g. {ex}</p>
        </div>
      ))}
    </div>
  </Scaled>
);

export const FigmaBoard = () => (
  <Scaled width={1080} height={660} label="The eight-page product concept designed in Figma: dashboard, deal registration, resource library, onboarding, implementation tracker, customer discovery, help and settings.">
    <div className="ui-figma">
      <div className="ui-figma__bar">
        <span>Partner Portal · Concept</span>
        <span>8 pages</span>
      </div>
      <div className="ui-figma__grid">
        {['Dashboard', 'Deal registration', 'Resource library', 'Onboarding', 'Implementation tracker', 'Customer discovery', 'Help', 'Settings'].map((p, i) => (
          <div key={p} className="ui-board">
            <p className="ui-board__label">{p}</p>
            <div className={`ui-board__art ui-board__art--${i % 4}`}>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        ))}
      </div>
    </div>
  </Scaled>
);

export const DealRegistration = () => (
  <Scaled width={1000} height={620} label="Recreation of the deal registration form, filled in for a fictional customer.">
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
  <Scaled width={1000} height={620} label="Recreation of a deal with its message thread between a partner and the Queralt team. Fictional data.">
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
            ['team', 'Theo · Queralt', 'Approved for review. Implementation guide is in Resources.'],
          ].map(([side, who, text]) => (
            <div key={text} className={`ui-bubble ui-bubble--${side}`}>
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
  <Scaled width={1000} height={600} label="Recreation of the partner asset library: sales collateral organized by type. Fictional data.">
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
            ['Product overview', 'Deck'],
            ['Implementation guide', 'Guide'],
            ['Competitive battlecard', 'Battlecard'],
            ['Discovery questions', 'Guide'],
            ['Customer one-pager', 'Deck'],
            ['Onboarding checklist', 'Guide'],
          ].map(([t, k], i) => (
            <div key={t} className="ui-asset">
              <div className={`ui-asset__cover ui-asset__cover--${i % 3}`} />
              <p className="ui-asset__t">{t}</p>
              <p className="ui-asset__k">{k}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const InvestorSignIn = () => (
  <Scaled width={1000} height={600} label="Recreation of the original investor portal sign-in, with its session held in an HTTP-only cookie.">
    <div className="ui-investor">
      <div className="ui-card ui-card--signin">
        <p className="ui-kicker">Investor access</p>
        <h4 className="ui-h2">Sign in to view updates</h4>
        <label className="ui-field">
          <span>Email</span>
          <span className="ui-input">investor@example.com</span>
        </label>
        <label className="ui-field">
          <span>Password</span>
          <span className="ui-input">••••••••••••</span>
        </label>
        <span className="ui-btn ui-btn--block">Sign in</span>
      </div>
      <div className="ui-cookie">
        <p className="ui-cookie__k">Set-Cookie</p>
        <p>
          session=<i>…</i>; <b>HttpOnly</b>; <b>Secure</b>; <b>SameSite</b>
        </p>
        <p className="ui-cookie__note">Unreadable by page scripts</p>
      </div>
    </div>
  </Scaled>
);
