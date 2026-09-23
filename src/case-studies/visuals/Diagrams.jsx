import React from 'react';

/**
 * Diagrams are built from HTML rather than fixed-size SVG so that labels can
 * never collide with lines or spill out of boxes, and so each diagram reflows
 * into a vertical sequence on phones. One visual system throughout: hairline
 * boxes, mono labels on connectors, the accent reserved for the path the
 * chapter is about. Colours come from --dg-* variables so the same diagram
 * works on paper and night chapters.
 */

const Node = ({ title, sub, variant = '', className = '' }) => (
  <div className={`fx-node${variant ? ` fx-node--${variant}` : ''} ${className}`.trim()}>
    <span className="fx-node__title">{title}</span>
    {sub && <span className="fx-node__sub">{sub}</span>}
  </div>
);

/** A connector with its label. `dir` is the direction on wide screens; on phones every connector points down. */
const Arrow = ({ label, dir = 'right', accent = false, className = '' }) => (
  <div className={`fx-arrow fx-arrow--${dir}${accent ? ' fx-arrow--accent' : ''} ${className}`.trim()} aria-hidden="true">
    {label && <span className="fx-arrow__label">{label}</span>}
    <span className="fx-arrow__line" />
  </div>
);

export function EcosystemDiagram() {
  return (
    <figure className="fx fx-eco" aria-labelledby="eco-cap">
      <figcaption id="eco-cap" className="sr-only">
        Architecture: the Channel Sales Portal, Pilot Support Portal and Investor Portal each connect to Queralt Hub with their own API key and send webhooks that become
        notifications. Microsoft Entra ID provides sign-in and directory sync to the hub. The hub records email and webhook deliveries in an outbox, and Vercel Cron jobs send
        them. The hub runs on Vercel with Supabase for Postgres, Auth and Realtime.
      </figcaption>
      <div aria-hidden="true" className="fx-eco__grid">
        <Node className="fx-eco__id" title="Microsoft Entra ID" sub="identity provider" />
        <Arrow className="fx-eco__a-id" dir="down" label="sign-in · directory sync" />

        <div className="fx-eco__portals">
          <p className="fx-group">Connected portals</p>
          <Node title="Channel Sales Portal" sub="partner deals" />
          <Node title="Pilot Support Portal" sub="tickets & feedback" />
          <Node title="Investor Portal" sub="updates & materials" />
        </div>
        <Arrow className="fx-eco__a-portals" dir="right" accent label="API key + webhooks" />

        <div className="fx-node fx-node--hub fx-eco__hub">
          <span className="fx-node__title">Queralt Hub</span>
          <ul className="fx-chips">
            {['Chat', 'Projects & tasks', 'Goals', 'Directory', 'Documents', 'Assistant'].map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <Arrow className="fx-eco__a-out" dir="right" label="writes deliveries" />

        <div className="fx-eco__delivery">
          <p className="fx-group">Delivery</p>
          <Node title="Outbox" sub="deliveries recorded first" />
          <Arrow dir="down" label="Vercel Cron job" className="fx-arrow--short" />
          <Node title="Email · webhooks" sub="sent by the job" />
        </div>

        <Arrow className="fx-eco__a-platform" dir="down" label="runs on" />
        <div className="fx-eco__platform">
          <p className="fx-group fx-eco__platform-label">Runs on</p>
          <Node title="Supabase" sub="Postgres · Auth · Realtime" />
          <Node title="Vercel" sub="hosting · cron" />
        </div>
      </div>
    </figure>
  );
}

export function SignInFlow() {
  return (
    <figure className="fx fx-signin" aria-labelledby="sif-cap">
      <figcaption id="sif-cap" className="sr-only">
        Sign-in: with a company Microsoft account, a person signs in with Microsoft through Entra ID and Supabase Auth's Azure provider. Without one, they use a magic link sent
        by email. Both paths are checked against an allowlist; people on it reach the hub and everyone else is refused.
      </figcaption>
      <div aria-hidden="true" className="fx-signin__grid">
        <div className="fx-lane fx-lane--main">
          <p className="fx-group">Has a company Microsoft account</p>
          <div className="fx-lane__row">
            <Node title="Sign in with Microsoft" variant="accent" />
            <Arrow dir="right" accent />
            <Node title="Entra ID" sub="via Supabase Auth, Azure provider" />
          </div>
        </div>
        <div className="fx-lane">
          <p className="fx-group">No company Microsoft account</p>
          <div className="fx-lane__row">
            <Node title="Magic link" sub="one-time link by email" />
          </div>
        </div>
        <Arrow className="fx-signin__merge" dir="right" accent label="both paths" />
        <div className="fx-signin__gate">
          <Node title="Allowlist check" variant="strong" />
          <p className="fx-note">Not on the allowlist: no access</p>
        </div>
        <Arrow className="fx-signin__to-hub" dir="right" accent />
        <Node className="fx-signin__hub" title="Queralt Hub" variant="strong" />
      </div>
    </figure>
  );
}

const DEALS = [
  ['Northwind Security', 'Crestview Health'],
  ['Brightline MSP', 'Oakridge Schools'],
  ['Northwind Security', 'Harbor & Pine Legal'],
  ['Halcyon IT', 'Summit Freight'],
  ['Brightline MSP', 'Lakeside Clinic'],
];

function DealTable({ rows, highlight }) {
  return (
    <ul className="fx-table">
      {rows.map(([partner, customer]) => (
        <li key={customer} className={partner === highlight ? 'is-mine' : ''}>
          <span>{partner}</span>
          <span className="fx-table__muted">{customer}</span>
        </li>
      ))}
    </ul>
  );
}

export function IsolationDiagram() {
  return (
    <figure className="fx fx-iso" aria-labelledby="iso-cap">
      <figcaption id="iso-cap" className="sr-only">
        Per-partner isolation: the deals table holds every partner's deals. A row-level security policy in Postgres filters each query by the signed-in account. A partner
        account, here the fictional Northwind Security, receives only its own two deals; an internal admin account receives all five.
      </figcaption>
      <div aria-hidden="true" className="fx-iso__grid">
        <div className="fx-panel fx-panel--accent">
          <p className="fx-group">Signed in as a partner · Northwind Security</p>
          <DealTable rows={DEALS.filter(([p]) => p === 'Northwind Security')} highlight="Northwind Security" />
          <p className="fx-note">Other partners’ rows are never returned.</p>
        </div>
        <div className="fx-iso__policy">
          <span>Postgres</span>
          <b>row-level security</b>
          <span>same table, same query</span>
        </div>
        <div className="fx-panel">
          <p className="fx-group">Signed in as an internal admin</p>
          <DealTable rows={DEALS} />
          <p className="fx-note">Every partner’s rows.</p>
        </div>
      </div>
    </figure>
  );
}

export function B2BFlow() {
  const steps = [
    ['Partner', 'their own company Microsoft account'],
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
      <ol aria-hidden="true" className="fx-b2b__steps">
        {steps.map(([t, s], i) => (
          <li key={t} className={i === 0 ? 'is-accent' : i === steps.length - 1 ? 'is-strong' : ''}>
            <span className="fx-b2b__n">{String(i + 1).padStart(2, '0')}</span>
            <span className="fx-node__title">{t}</span>
            <span className="fx-node__sub">{s}</span>
          </li>
        ))}
      </ol>
      <p className="fx-note fx-b2b__foot" aria-hidden="true">
        Identity comes from the partner’s own organization. Isolation is enforced in the database.
      </p>
    </figure>
  );
}
