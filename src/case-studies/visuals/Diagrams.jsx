import React from 'react';

/**
 * Diagrams are drawn with HTML on a fixed metric grid (see the fx-* rules in
 * case-study.css): every box has a set height, and every connector is sized so
 * it starts and ends exactly on a box edge. Wide screens get the full
 * left-to-right composition; narrow screens get a purpose-built vertical one.
 * Colours come from --dg-* variables so each diagram works on paper and night.
 */

const Node = ({ title, sub, variant = '', className = '', style }) => (
  <div className={`fx-node${variant ? ` fx-node--${variant}` : ''} ${className}`.trim()} style={style}>
    <span className="fx-node__title">{title}</span>
    {sub && <span className="fx-node__sub">{sub}</span>}
  </div>
);

/** Vertical connector for the stacked layouts. `up` points the arrowhead upward. */
const VLink = ({ label, accent = false, up = false, plain = false }) => (
  <div className={`fx-vlink${accent ? ' is-accent' : ''}${up ? ' is-up' : ''}${plain ? ' is-plain' : ''}`}>
    <span className="fx-vlink__line fx-draw" />
    {label && <span className="fx-vlink__label">{label}</span>}
  </div>
);

/* ── Architecture ─────────────────────────────────────────────────────────── */

const PORTALS = [
  ['Channel Sales Portal', 'partner deals'],
  ['Pilot Support Portal', 'tickets & feedback'],
  ['Investor Portal', 'updates & materials'],
];
const MODULES = ['Chat', 'Projects & tasks', 'Goals', 'Directory', 'Documents', 'Assistant'];

function Hub() {
  return (
    <div className="fx-node fx-node--hub">
      <span className="fx-node__title">Queralt Hub</span>
      <ul className="fx-chips">
        {MODULES.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export function EcosystemDiagram() {
  return (
    <figure className="fx fx-eco" aria-labelledby="eco-cap">
      <figcaption id="eco-cap" className="sr-only">
        Architecture: the Channel Sales Portal, Pilot Support Portal and Investor Portal each connect to Queralt Hub with their own API key and send webhooks that become
        notifications. Microsoft Entra ID provides sign-in and directory sync to the hub. The hub writes email and webhook deliveries to an outbox, and a Vercel Cron job sends
        them. The hub runs on Vercel and Supabase (Postgres, Auth, Realtime).
      </figcaption>

      {/* Wide composition */}
      <div className="fx-eco__wide" aria-hidden="true">
        <div className="fx-eco__id">
          <Node title="Microsoft Entra ID" sub="identity provider" />
        </div>
        <div className="fx-eco__v1">
          <span className="fx-line fx-line--v fx-arrowhead-down fx-draw" />
          <span className="fx-label fx-label--right">sign-in · directory sync</span>
        </div>

        <div className="fx-eco__portals">
          <p className="fx-group fx-group--float">Connected portals</p>
          {PORTALS.map(([t, s]) => (
            <Node key={t} title={t} sub={s} className="fx-stub-right" />
          ))}
        </div>
        <div className="fx-eco__c1">
          <span className="fx-spine fx-draw" />
          <span className="fx-line fx-line--h fx-arrowhead-right fx-accent fx-draw fx-eco__c1-arrow" />
          <span className="fx-label fx-label--above fx-eco__c1-label">API key + webhooks</span>
        </div>

        <div className="fx-eco__hub">
          <Hub />
        </div>

        <div className="fx-eco__c2">
          <span className="fx-line fx-line--h fx-arrowhead-right fx-draw fx-eco__c2-arrow" />
          <span className="fx-label fx-label--above fx-eco__c2-label">writes</span>
        </div>
        <div className="fx-eco__delivery">
          <p className="fx-group fx-group--float">Delivery</p>
          <Node title="Outbox" sub="deliveries recorded first" />
          <div className="fx-eco__cron">
            <span className="fx-line fx-line--v fx-arrowhead-down fx-draw" />
            <span className="fx-label fx-label--right">Vercel Cron</span>
          </div>
          <Node title="Email · webhooks" sub="sent by the job" />
        </div>

        <div className="fx-eco__v2">
          <span className="fx-line fx-line--v fx-draw" />
          <span className="fx-label fx-label--right">runs on</span>
        </div>
        <div className="fx-eco__platform">
          <Node title="Supabase" sub="Postgres · Auth · Realtime" className="fx-stub-up" />
          <Node title="Vercel" sub="hosting · cron" className="fx-stub-up" />
        </div>
      </div>

      {/* Narrow composition */}
      <div className="fx-eco__narrow" aria-hidden="true">
        <Node title="Microsoft Entra ID" sub="identity provider" />
        <VLink label="sign-in · directory sync" />
        <Hub />
        <VLink label="API key + webhooks" accent up />
        <div className="fx-box">
          <p className="fx-group">Connected portals</p>
          {PORTALS.map(([t, s]) => (
            <Node key={t} title={t} sub={s} />
          ))}
        </div>
        <div className="fx-section">
          <p className="fx-group">The hub writes deliveries to</p>
          <Node title="Outbox" sub="deliveries recorded first" />
          <VLink label="Vercel Cron" />
          <Node title="Email · webhooks" sub="sent by the job" />
        </div>
        <div className="fx-section">
          <p className="fx-group">Runs on</p>
          <div className="fx-pair">
            <Node title="Supabase" sub="Postgres · Auth · Realtime" />
            <Node title="Vercel" sub="hosting · cron" />
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ── Sign-in ──────────────────────────────────────────────────────────────── */

const LANES = [
  { label: 'Company Microsoft account', main: true, nodes: [['Sign in with Microsoft', null, 'accent'], ['Entra ID', 'Supabase Auth, Azure provider']] },
  { label: 'No company Microsoft account', nodes: [['Request a magic link'], ['One-time link', 'sent by email']] },
];

export function SignInFlow() {
  return (
    <figure className="fx fx-signin" aria-labelledby="sif-cap">
      <figcaption id="sif-cap" className="sr-only">
        Sign-in: with a company Microsoft account, a person signs in with Microsoft through Entra ID and Supabase Auth's Azure provider. Without one, they request a magic link
        and sign in with the one-time link sent by email. Both paths are checked against an allowlist; people on it reach the hub, and everyone else is refused.
      </figcaption>

      <div className="fx-signin__wide" aria-hidden="true">
        <div className="fx-signin__lanes">
          {LANES.map((lane) => (
            <div key={lane.label} className={`fx-lane${lane.main ? ' fx-lane--main' : ''}`}>
              <p className="fx-group fx-lane__label">{lane.label}</p>
              <div className="fx-lane__row">
                <Node title={lane.nodes[0][0]} sub={lane.nodes[0][1]} variant={lane.nodes[0][2]} />
                <span className={`fx-line fx-line--h fx-arrowhead-right fx-draw${lane.main ? ' fx-accent' : ''}`} />
                <Node title={lane.nodes[1][0]} sub={lane.nodes[1][1]} className="fx-stub-right" />
              </div>
            </div>
          ))}
        </div>
        <div className="fx-signin__merge">
          <span className="fx-spine fx-draw" />
          <span className="fx-line fx-line--h fx-arrowhead-right fx-accent fx-draw fx-signin__merge-arrow" />
        </div>
        <div className="fx-signin__gate">
          <Node title="Allowlist check" variant="strong" />
          <p className="fx-note">Not on the allowlist: access refused</p>
        </div>
        <div className="fx-signin__link">
          <span className="fx-line fx-line--h fx-arrowhead-right fx-accent fx-draw" />
        </div>
        <div className="fx-signin__hub">
          <Node title="Queralt Hub" variant="strong" />
        </div>
      </div>

      <div className="fx-signin__narrow" aria-hidden="true">
        {LANES.map((lane) => (
          <div key={lane.label} className={`fx-box${lane.main ? ' fx-box--accent' : ''}`}>
            <p className="fx-group">{lane.label}</p>
            <Node title={lane.nodes[0][0]} sub={lane.nodes[0][1]} variant={lane.nodes[0][2]} />
            <VLink accent={lane.main} />
            <Node title={lane.nodes[1][0]} sub={lane.nodes[1][1]} />
          </div>
        ))}
        <VLink label="both paths" accent />
        <Node title="Allowlist check" variant="strong" />
        <p className="fx-note fx-note--center">Not on the allowlist: access refused</p>
        <VLink accent />
        <Node title="Queralt Hub" variant="strong" />
      </div>
    </figure>
  );
}

/* ── Data isolation ───────────────────────────────────────────────────────── */

const DEALS = [
  ['Northwind Security', 'Crestview Health'],
  ['Brightline MSP', 'Oakridge Schools'],
  ['Northwind Security', 'Harbor & Pine Legal'],
  ['Halcyon IT', 'Summit Freight'],
  ['Brightline MSP', 'Lakeside Clinic'],
];

function DealRows({ viewer }) {
  return (
    <ul className="fx-table">
      {DEALS.map(([partner, customer]) => {
        const visible = !viewer || partner === viewer;
        return (
          <li key={customer} className={visible ? (viewer ? 'is-mine' : '') : 'is-filtered'}>
            {visible ? (
              <>
                <span>{partner}</span>
                <span className="fx-table__muted">{customer}</span>
              </>
            ) : (
              <span className="fx-table__filtered">Filtered by policy</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function IsolationDiagram() {
  return (
    <figure className="fx fx-iso" aria-labelledby="iso-cap">
      <figcaption id="iso-cap" className="sr-only">
        Per-partner isolation: the same query runs against the same deals table for two accounts. A Postgres row-level security policy filters rows by the signed-in account.
        The partner account, here the fictional Northwind Security, receives its own two deals, and the other three rows are filtered out. The internal admin account receives
        all five.
      </figcaption>
      <div className="fx-iso__grid" aria-hidden="true">
        <div className="fx-panel fx-panel--accent">
          <p className="fx-group">Partner account · Northwind Security</p>
          <DealRows viewer="Northwind Security" />
          <p className="fx-note">2 of 5 rows returned</p>
        </div>
        <div className="fx-iso__policy">
          <span className="fx-iso__arrow fx-iso__arrow--left fx-draw" />
          <div className="fx-iso__box">
            <span>Postgres</span>
            <b>Row-level security</b>
            <span>same table · same query</span>
          </div>
          <span className="fx-iso__arrow fx-iso__arrow--right fx-draw" />
        </div>
        <div className="fx-panel">
          <p className="fx-group">Internal admin account</p>
          <DealRows />
          <p className="fx-note">5 of 5 rows returned</p>
        </div>
      </div>
    </figure>
  );
}

/* ── Partner sign-in ──────────────────────────────────────────────────────── */

export function B2BFlow() {
  const steps = [
    ['Partner', 'own company Microsoft account'],
    ['Entra ID B2B', 'guest authentication'],
    ['NextAuth v5', 'portal session'],
    ['Supabase Postgres', 'row-level security per partner'],
  ];
  return (
    <figure className="fx fx-b2b" aria-labelledby="b2b-cap">
      <figcaption id="b2b-cap" className="sr-only">
        Partner sign-in and data access: a partner signs in with their own company Microsoft account as an Entra ID B2B guest, NextAuth v5 creates the portal session, and
        every data request passes through Postgres row-level security scoped to that partner.
      </figcaption>
      <ol className="fx-b2b__steps" aria-hidden="true">
        {steps.map(([t, s], i) => (
          <li key={t} className={`fx-node${i === 0 ? ' fx-node--accent' : i === steps.length - 1 ? ' fx-node--strong' : ''}`}>
            <span className="fx-b2b__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="fx-node__title">{t}</span>
            <span className="fx-node__sub">{s}</span>
            {i < steps.length - 1 && <span className="fx-b2b__link fx-draw" />}
          </li>
        ))}
      </ol>
      <p className="fx-note fx-note--center" aria-hidden="true">
        Identity comes from the partner’s own organization. Isolation is enforced in the database.
      </p>
    </figure>
  );
}
