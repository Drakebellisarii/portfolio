import React from 'react';

/**
 * The channel portal's two diagrams, drawn with HTML on a fixed metric grid
 * (see the fx-* rules in case-study.css). Container queries switch each one
 * between its wide and narrow composition. Colours come from --dg-* variables
 * so each works on paper and night. The hub's architecture diagrams are SVG
 * and live in ./flow.
 */

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
