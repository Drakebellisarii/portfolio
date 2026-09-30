/**
 * System context: the hub at the centre of everything it talks to.
 * Arrows point the way data moves; two-way arrows only where it truly moves
 * both ways (Slack, Pilot Support, Microsoft Graph calendars). "Runs on"
 * links to the platform are plain lines.
 */

const PLACES = [
  ['Messages', 'hub + Slack'],
  ['Calendar', 'Outlook · Google · links'],
  ['Tasks', 'projects · check-ins'],
  ['Library', 'Google Drive'],
  ['People', 'Entra directory'],
  ['Contacts', 'the CRM'],
  ['Pilots', 'pilot tracker'],
  ['Goals', 'vision · scorecard'],
  ['Assistant', 'optional'],
];

const description =
  'System context of Queralt Hub. Identity: Microsoft Entra ID, across two company tenants, signs people in (the tenant is verified from the sign-in itself), and a one-time email link serves invited people without a company Microsoft account; both go to Supabase Auth, which gives the hub a verified session. Connected portals, on the left: the Channel Sales Portal sends deal events and contacts to the hub with a scoped API key; Pilot Support and the hub exchange data both ways, pilot events in with an API key and signed calls from the hub to read and update the pilot tracker; the Investor Portal sends events with a scoped API key. Integrations, on the right: Slack and the hub exchange messages and reactions both ways, through events plus a polling backup; Microsoft Graph carries calendars both ways, mail out and profile photos in; Google sends the document library and calendars into the hub, mirrored every 15 minutes; the hub sends questions with context scoped to the asker to the Anthropic API. Delivery, bottom right: the hub records delivery rows in an outbox, and a scheduled job sends them as email, web push and webhooks, with retries. The hub runs on Supabase (Postgres with row-level security, Auth, Realtime, Storage) and Vercel (hosting and scheduled jobs).';

const wide = {
  w: 1120,
  h: 912,
  groups: [
    { label: 'Identity', x: 232, y: 14 },
    { label: 'Connected portals', x: 0, y: 260 },
    { label: 'Integrations', x: 904, y: 236 },
    { label: 'Delivery', x: 904, y: 596 },
    { label: 'Platform', x: 296, y: 716 },
  ],
  boxes: [{ id: 'channels', x: 904, y: 712, w: 216, h: 192 }],
  nodes: [
    { id: 'entra', x: 232, y: 24, w: 208, h: 56, title: 'Microsoft Entra ID', sub: 'two company tenants' },
    { id: 'magic', x: 664, y: 24, w: 208, h: 56, title: 'Magic link', sub: 'invited addresses only' },
    { id: 'auth', x: 472, y: 120, w: 160, h: 56, title: 'Supabase Auth', sub: 'sessions' },
    {
      id: 'hub',
      variant: 'hub',
      x: 400,
      y: 232,
      w: 304,
      h: 424,
      title: 'Queralt Hub',
      sub: 'Next.js · desktop and phone',
      places: PLACES,
      foot: ['rendered on the server', 'live updates via Realtime'],
    },
    { id: 'cs', x: 0, y: 272, w: 208, h: 64, title: 'Channel Sales Portal', sub: 'partners · deals' },
    { id: 'ps', x: 0, y: 376, w: 208, h: 64, title: 'Pilot Support Portal', sub: 'pilots · tracker' },
    { id: 'inv', x: 0, y: 480, w: 208, h: 64, title: 'Investor Portal', sub: 'updates · materials' },
    { id: 'slack', x: 904, y: 248, w: 216, h: 64, title: 'Slack', sub: 'workspace mirror' },
    { id: 'graph', x: 904, y: 336, w: 216, h: 64, title: 'Microsoft Graph', sub: 'Microsoft 365' },
    { id: 'google', x: 904, y: 424, w: 216, h: 64, title: 'Google', sub: 'Drive · Calendar' },
    { id: 'ai', x: 904, y: 512, w: 216, h: 64, title: 'Anthropic API', sub: 'assistant, optional' },
    { id: 'outbox', x: 904, y: 608, w: 216, h: 64, title: 'Outbox', sub: 'delivery rows' },
    { id: 'email', litWith: 'channels', x: 920, y: 728, w: 184, h: 48, title: 'Email', sub: 'via Microsoft Graph' },
    { id: 'push', litWith: 'channels', x: 920, y: 784, w: 184, h: 48, title: 'Web push', sub: 'per browser' },
    { id: 'hooks', litWith: 'channels', x: 920, y: 840, w: 184, h: 48, title: 'Webhooks', sub: 'HMAC-signed' },
    { id: 'supa', x: 296, y: 728, w: 256, h: 72, title: 'Supabase', sub: ['Postgres + RLS · Auth', 'Realtime · Storage'] },
    { id: 'vercel', x: 568, y: 728, w: 176, h: 72, title: 'Vercel', sub: ['hosting', 'scheduled jobs'] },
  ],
  edges: [
    { id: 'entra', from: 'entra', to: 'auth', route: ['entra.b', 'auth.l'], label: ['sign-in', 'tenant verified'], seg: 0 },
    { id: 'magic', from: 'magic', to: 'auth', route: ['magic.b', 'auth.r'], label: ['one-time link', 'by email'], seg: 0 },
    { id: 'auth', from: 'auth', to: 'hub', route: ['auth.b', 'hub.t'], label: ['verified session'] },
    { id: 'cs', from: 'cs', to: 'hub', route: ['cs.r', 'hub.l@=304'], label: ['deal events · contacts', 'scoped API key'] },
    { id: 'ps', from: 'ps', to: 'hub', dir: 'both', route: ['ps.r', 'hub.l@=408'], label: ['pilot events · API key', 'tracker · signed calls'] },
    { id: 'inv', from: 'inv', to: 'hub', route: ['inv.r', 'hub.l@=512'], label: ['events', 'scoped API key'] },
    { id: 'slack', from: 'slack', to: 'hub', dir: 'both', route: ['slack.l', 'hub.r@=280'], label: ['messages · reactions', 'events + polling'] },
    { id: 'graph', from: 'graph', to: 'hub', dir: 'both', route: ['graph.l', 'hub.r@=368'], label: ['calendars both ways', 'mail out · photos in'] },
    { id: 'google', from: 'google', to: 'hub', route: ['google.l', 'hub.r@=456'], label: ['library · calendars', 'mirrored every 15 min'] },
    { id: 'ai', from: 'hub', to: 'ai', route: ['hub.r@=544', 'ai.l'], label: ['question + context', 'scoped to the asker'] },
    { id: 'outbox', from: 'hub', to: 'outbox', route: ['hub.r@=640', 'outbox.l'], label: ['delivery rows', 'recorded first'] },
    { id: 'channels', from: 'outbox', to: 'channels', route: ['outbox.b', 'channels.t'], label: ['scheduled job · retried'] },
    { id: 'supa', from: 'hub', to: 'supa', dir: 'none', route: ['hub.b@=424', 'supa.t'], label: ['runs on'] },
    { id: 'vercel', from: 'hub', to: 'vercel', dir: 'none', route: ['hub.b@=656', 'vercel.t'], label: ['runs on'] },
  ],
};

// Narrow: identity flows down into the hub; every other connection joins the
// hub's bus (the line down the left edge) on its own labelled branch.
const B = 640; // bottom of the hub; the rows below are placed from here
const narrow = {
  w: 336,
  h: B + 1168,
  groups: [
    { label: 'Identity', x: 0, y: 14 },
    { label: 'Connected portals', x: 184, y: B + 52 },
    { label: 'Integrations', x: 184, y: B + 316 },
    { label: 'Delivery', x: 184, y: B + 652 },
    { label: 'Platform', x: 120, y: B + 1004 },
  ],
  boxes: [{ id: 'channels', x: 184, y: B + 760, w: 152, h: 192 }],
  nodes: [
    { id: 'entra', x: 0, y: 24, w: 160, h: 64, title: 'Microsoft Entra ID', sub: 'two company tenants' },
    { id: 'magic', x: 176, y: 24, w: 160, h: 64, title: 'Magic link', sub: 'invited addresses' },
    { id: 'auth', x: 48, y: 160, w: 240, h: 56, title: 'Supabase Auth', sub: 'sessions' },
    { id: 'hub', variant: 'hub', x: 0, y: 288, w: 336, h: B - 288, title: 'Queralt Hub', sub: 'Next.js · desktop and phone', places: PLACES },
    { id: 'cs', x: 184, y: B + 64, w: 152, h: 56, title: 'Channel Sales', sub: 'partners · deals' },
    { id: 'ps', x: 184, y: B + 136, w: 152, h: 56, title: 'Pilot Support', sub: 'pilots · tracker' },
    { id: 'inv', x: 184, y: B + 208, w: 152, h: 56, title: 'Investor', sub: 'updates' },
    { id: 'slack', x: 184, y: B + 328, w: 152, h: 56, title: 'Slack', sub: 'workspace mirror' },
    { id: 'graph', x: 184, y: B + 400, w: 152, h: 56, title: 'Microsoft Graph', sub: 'Microsoft 365' },
    { id: 'google', x: 184, y: B + 472, w: 152, h: 56, title: 'Google', sub: 'Drive · Calendar' },
    { id: 'ai', x: 184, y: B + 544, w: 152, h: 56, title: 'Anthropic API', sub: 'assistant, optional' },
    { id: 'outbox', x: 184, y: B + 664, w: 152, h: 56, title: 'Outbox', sub: 'delivery rows' },
    { id: 'email', litWith: 'channels', x: 196, y: B + 776, w: 128, h: 48, title: 'Email', sub: 'via Graph' },
    { id: 'push', litWith: 'channels', x: 196, y: B + 832, w: 128, h: 48, title: 'Web push', sub: 'per browser' },
    { id: 'hooks', litWith: 'channels', x: 196, y: B + 888, w: 128, h: 48, title: 'Webhooks', sub: 'HMAC-signed' },
    { id: 'supa', x: 120, y: B + 1016, w: 216, h: 72, title: 'Supabase', sub: ['Postgres + RLS · Auth', 'Realtime · Storage'] },
    { id: 'vercel', x: 120, y: B + 1104, w: 216, h: 56, title: 'Vercel', sub: 'hosting · scheduled jobs' },
  ],
  edges: [
    { id: 'entra', from: 'entra', to: 'auth', route: ['entra.b', 'auth.t@=80'], label: ['sign-in', 'tenant verified'] },
    { id: 'magic', from: 'magic', to: 'auth', route: ['magic.b', 'auth.t@=256'], label: ['one-time link', 'by email'] },
    { id: 'auth', from: 'auth', to: 'hub', route: ['auth.b', 'hub.t@=168'], label: ['verified session'] },
    { id: 'bus', from: 'hub', to: 'bus', dir: 'none', route: ['hub.b@=8', `p:8,${B + 1132}`] },
    { id: 'cs', from: 'cs', to: 'hub', route: ['cs.l', `p:8,${B + 92}`], label: ['deals · contacts', 'scoped API key'] },
    { id: 'ps', from: 'ps', to: 'hub', dir: 'both', route: ['ps.l', `p:8,${B + 164}`], label: ['events · API key', 'signed tracker calls'] },
    { id: 'inv', from: 'inv', to: 'hub', route: ['inv.l', `p:8,${B + 236}`], label: ['events', 'scoped API key'] },
    { id: 'slack', from: 'slack', to: 'hub', dir: 'both', route: ['slack.l', `p:8,${B + 356}`], label: ['messages · reactions', 'events + polling'] },
    { id: 'graph', from: 'graph', to: 'hub', dir: 'both', route: ['graph.l', `p:8,${B + 428}`], label: ['calendars both ways', 'mail out · photos in'] },
    { id: 'google', from: 'google', to: 'hub', route: ['google.l', `p:8,${B + 500}`], label: ['library · calendars', 'every 15 minutes'] },
    { id: 'ai', from: 'hub', to: 'ai', route: [`p:8,${B + 572}`, 'ai.l'], label: ['question + context', 'scoped to the asker'] },
    { id: 'outbox', from: 'hub', to: 'outbox', route: [`p:8,${B + 692}`, 'outbox.l'], label: ['delivery rows', 'recorded first'] },
    { id: 'channels', from: 'outbox', to: 'channels', route: ['outbox.b', 'channels.t'], label: ['scheduled · retried'] },
    { id: 'supa', from: 'hub', to: 'supa', dir: 'none', route: [`p:8,${B + 1052}`, 'supa.l'], label: ['runs on'] },
    { id: 'vercel', from: 'hub', to: 'vercel', dir: 'none', route: [`p:8,${B + 1132}`, 'vercel.l'], label: ['runs on'] },
  ],
};

const context = { id: 'context', description, wide, narrow };
export default context;
