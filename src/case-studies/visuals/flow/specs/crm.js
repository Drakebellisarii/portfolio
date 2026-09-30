/**
 * Portals → hub → CRM: records arrive through the integration API, people are
 * filed under companies by email domain, and logos are fetched safely.
 */

const description =
  'Portals to hub to CRM. The Channel Sales Portal sends deals and contacts, and the Pilot Support Portal sends pilot organizations, people and events, each through the hub’s integration API with its own scoped API key; the API checks the key’s hash and scope, and an idempotency key makes a repeated event apply once. Events become notifications, tasks and feed items. People and companies are upserted into Contacts, merged on the portal’s own ID, then by email for people and by name or domain for companies. Outside attendees of members’ Outlook meetings are added too, skipping private items. Domain filing places people who have no company under the company that owns their email’s domain, never by a personal email provider, and a company someone chose by hand always wins. A daily logo job fetches icons from each company’s own website through an SSRF-protected fetcher and stores them re-encoded as PNG. Staff are never added as contacts, and nothing is ever sent to a contact.';

const wide = {
  w: 1120,
  h: 592,
  groups: [
    { label: 'Sources', x: 0, y: 20 },
    { label: 'In the hub', x: 776, y: 20 },
  ],
  nodes: [
    { id: 'cs', x: 0, y: 32, w: 184, h: 64, title: 'Channel Sales', sub: 'partners · deals' },
    { id: 'ps', x: 0, y: 136, w: 184, h: 64, title: 'Pilot Support', sub: 'pilot orgs · users' },
    { id: 'outlook', x: 0, y: 240, w: 184, h: 64, title: 'Outlook meetings', sub: 'members’ calendars' },
    { id: 'api', x: 384, y: 32, w: 192, h: 168, title: 'Integration API', sub: ['key hash · scope check', 'idempotency key'] },
    { id: 'feed', x: 776, y: 32, w: 344, h: 64, title: 'Notifications · tasks · feed', sub: 'from portal events' },
    { id: 'crm', x: 776, y: 136, w: 344, h: 168, title: 'Contacts & companies', sub: ['merged on portal ID, then email or domain', 'one timeline per company'] },
    { id: 'filing', x: 776, y: 376, w: 160, h: 72, title: 'Domain filing', sub: ['no company yet', 'never personal mail'] },
    { id: 'logo', x: 952, y: 376, w: 168, h: 64, title: 'Logo job', sub: 'daily' },
    { id: 'web', x: 952, y: 512, w: 168, h: 64, title: 'Company websites', sub: 'their own homepage' },
  ],
  edges: [
    { id: 'cs', from: 'cs', to: 'api', route: ['cs.r', 'api.l@=64'], label: ['deals · contacts', 'scoped API key'] },
    { id: 'ps', from: 'ps', to: 'api', route: ['ps.r', 'api.l@=168'], label: ['pilots · people · events', 'scoped API key'] },
    { id: 'events', from: 'api', to: 'feed', route: ['api.r@=64', 'feed.l'], label: ['events', 'idempotency key: once'] },
    { id: 'records', from: 'api', to: 'crm', route: ['api.r@=168', 'crm.l@=168'], label: ['people · companies', 'upsert on portal ID'] },
    { id: 'meetings', from: 'outlook', to: 'crm', route: ['outlook.r', 'crm.l@=272'], label: ['outside attendees', 'private items skipped'], at: [480, 272] },
    { id: 'filed', from: 'filing', to: 'crm', route: ['filing.t', 'crm.b@=856'], label: ['filed by email domain', 'a manual choice wins'] },
    { id: 'logo', from: 'logo', to: 'crm', route: ['logo.t', 'crm.b@=1036'], label: ['logo', 're-encoded PNG'] },
    { id: 'fetch', from: 'web', to: 'logo', route: ['web.t', 'logo.b'], label: ['homepage icons', 'SSRF-protected fetch'] },
  ],
  notes: [{ x: 0, y: 580, text: 'Staff are never added as contacts, and nothing is ever sent to a contact.' }],
};

const narrow = {
  w: 336,
  h: 832,
  groups: [{ label: 'Sources', x: 0, y: 14 }],
  nodes: [
    { id: 'cs', x: 0, y: 24, w: 160, h: 56, title: 'Channel Sales', sub: 'partners · deals' },
    { id: 'ps', x: 176, y: 24, w: 160, h: 56, title: 'Pilot Support', sub: 'pilot orgs · users' },
    { id: 'api', x: 0, y: 152, w: 336, h: 72, title: 'Integration API', sub: ['key hash · scope check', 'idempotency key'] },
    { id: 'outlook', x: 0, y: 336, w: 152, h: 56, title: 'Outlook meetings', sub: 'members’ calendars' },
    { id: 'feed', x: 184, y: 336, w: 152, h: 56, title: 'Notifications', sub: 'tasks · feed' },
    { id: 'crm', x: 0, y: 464, w: 336, h: 72, title: 'Contacts & companies', sub: ['merged on portal ID, then email or domain', 'one timeline per company'] },
    { id: 'filing', x: 0, y: 608, w: 160, h: 64, title: 'Domain filing', sub: ['no company yet', 'never personal mail'] },
    { id: 'logo', x: 176, y: 616, w: 160, h: 56, title: 'Logo job', sub: 'daily' },
    { id: 'web', x: 176, y: 752, w: 160, h: 56, title: 'Company websites', sub: 'their homepage' },
  ],
  edges: [
    { id: 'cs', from: 'cs', to: 'api', route: ['cs.b', 'api.t@=80'], label: ['deals · contacts', 'scoped API key'] },
    { id: 'ps', from: 'ps', to: 'api', route: ['ps.b', 'api.t@=256'], label: ['pilots · people', 'scoped API key'] },
    { id: 'events', from: 'api', to: 'feed', route: ['api.b@=260', 'feed.t@=260'], label: ['events', 'idempotency key'], at: [260, 300] },
    { id: 'records', from: 'api', to: 'crm', route: ['api.b@=168', 'crm.t@=168'], label: ['people · companies', 'upsert on portal ID'], at: [168, 246] },
    { id: 'meetings', from: 'outlook', to: 'crm', route: ['outlook.b@=76', 'crm.t@=76'], label: ['outside attendees', 'private ones skipped'], at: [84, 428] },
    { id: 'filed', from: 'filing', to: 'crm', route: ['filing.t', 'crm.b@=80'], label: ['filed by domain', 'a manual choice wins'] },
    { id: 'logo', from: 'logo', to: 'crm', route: ['logo.t', 'crm.b@=256'], label: ['logo', 're-encoded PNG'] },
    { id: 'fetch', from: 'web', to: 'logo', route: ['web.t', 'logo.b'], label: ['homepage icons', 'SSRF-protected fetch'] },
  ],
  notes: [
    { x: 0, y: 764, text: 'Staff are never added' },
    { x: 0, y: 782, text: 'as contacts; nothing is' },
    { x: 0, y: 800, text: 'ever sent to a contact.' },
  ],
};

const crm = { id: 'crm', description, wide, narrow };
export default crm;
