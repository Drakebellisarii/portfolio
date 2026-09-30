/**
 * Security by design: the layers a request passes through, and what each one
 * guarantees. Principles only; no mechanism is spelled out.
 */

const description =
  'Security layers, as a request moves from the browser to the database. Browser: a strict Content Security Policy with a new nonce on every request; uploaded files never run as hub pages; secrets and provider tokens are never sent to it. Each request, carrying a page or action request: the session is refreshed and checked; rate limits are counted in the database; redirect targets are validated. Server, reached with a verified session: integration data is written only by the server; API keys are stored hashed, scoped and rotatable; webhooks are signed with HMAC and a timestamp; tokens are encrypted at rest and admin actions are audited. Database, queried as the signed-in person: invitation-only, so uninvited accounts are refused; passwords are disabled entirely; the tenant is trusted only from a verified Microsoft sign-in; row-level security is on every table; anonymous access is revoked.';

const wide = {
  w: 1120,
  h: 600,
  nodes: [
    {
      id: 'browser',
      variant: 'band',
      x: 0,
      y: 0,
      w: 1120,
      h: 96,
      title: 'Browser',
      sub: 'what runs in the page',
      itemsX: 280,
      cols: 2,
      items: ['Strict Content Security Policy, a nonce per request', 'Uploaded files never run as hub pages', 'Secrets and provider tokens never sent to it'],
    },
    {
      id: 'request',
      variant: 'band',
      x: 0,
      y: 160,
      w: 1120,
      h: 96,
      title: 'Each request',
      sub: 'before any page renders',
      itemsX: 280,
      cols: 2,
      items: ['Session refreshed and checked', 'Rate limits counted in the database', 'Redirect targets validated'],
    },
    {
      id: 'server',
      variant: 'band',
      x: 0,
      y: 320,
      w: 1120,
      h: 96,
      title: 'Server',
      sub: 'Next.js on Vercel',
      itemsX: 280,
      cols: 2,
      items: ['Integration data written only by the server', 'API keys hashed, scoped and rotatable', 'Webhooks signed with HMAC and a timestamp', 'Tokens encrypted at rest; admin actions audited'],
    },
    {
      id: 'db',
      variant: 'band',
      x: 0,
      y: 480,
      w: 1120,
      h: 120,
      title: 'Database',
      sub: 'Postgres on Supabase',
      itemsX: 280,
      cols: 2,
      items: [
        'Invitation-only: uninvited accounts are refused',
        'Passwords disabled entirely',
        'Tenant trusted only from a verified Microsoft sign-in',
        'Row-level security on every table',
        'Anonymous access revoked',
      ],
    },
  ],
  edges: [
    { id: 'request', from: 'browser', to: 'request', route: ['browser.b@=128', 'request.t@=128'], label: ['page and action requests'] },
    { id: 'session', from: 'request', to: 'server', route: ['request.b@=128', 'server.t@=128'], label: ['with a verified session'] },
    { id: 'query', from: 'server', to: 'db', route: ['server.b@=128', 'db.t@=128'], label: ['queries as the person'] },
  ],
};

const narrow = {
  w: 336,
  h: 920,
  nodes: [
    {
      id: 'browser',
      variant: 'band',
      x: 0,
      y: 0,
      w: 336,
      h: 152,
      title: 'Browser',
      sub: 'what runs in the page',
      items: ['Strict CSP, a nonce per request', 'Uploads never run as hub pages', 'No secrets or provider tokens'],
    },
    {
      id: 'request',
      variant: 'band',
      x: 0,
      y: 224,
      w: 336,
      h: 152,
      title: 'Each request',
      sub: 'before any page renders',
      items: ['Session refreshed and checked', 'Rate limits counted in the database', 'Redirect targets validated'],
    },
    {
      id: 'server',
      variant: 'band',
      x: 0,
      y: 448,
      w: 336,
      h: 200,
      title: 'Server',
      sub: 'Next.js on Vercel',
      items: ['Integration data: server writes only', 'API keys hashed, scoped, rotatable', 'Webhooks signed with HMAC', 'Tokens encrypted at rest', 'Admin actions audited'],
    },
    {
      id: 'db',
      variant: 'band',
      x: 0,
      y: 720,
      w: 336,
      h: 200,
      title: 'Database',
      sub: 'Postgres on Supabase',
      items: ['Invitation-only; others refused', 'Passwords disabled entirely', 'Tenant only from a verified sign-in', 'Row-level security on every table', 'Anonymous access revoked'],
    },
  ],
  edges: [
    { id: 'request', from: 'browser', to: 'request', route: ['browser.b', 'request.t'], label: ['page and action requests'] },
    { id: 'session', from: 'request', to: 'server', route: ['request.b', 'server.t'], label: ['with a verified session'] },
    { id: 'query', from: 'server', to: 'db', route: ['server.b', 'db.t'], label: ['queries as the person'] },
  ],
};

const security = { id: 'security', description, wide, narrow };
export default security;
