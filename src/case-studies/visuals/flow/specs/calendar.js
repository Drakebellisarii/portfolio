/**
 * One calendar for the whole team: four sources, a per-viewer pass on the
 * server, and a time grid in the browser. The order follows the hub's own
 * calendar code: the privacy check comes first, so busy-only rows are reduced
 * to owner and time before anything is merged.
 */

const description =
  'Calendar merge. Sources: each person’s Outlook calendar through Microsoft Graph, mirrored every 15 minutes; Google Calendar, read-only, every 15 minutes; any other calendar by its published link, stored encrypted and read every 15 minutes and at once when added; and meetings made in the hub, which are also sent to Outlook with a Teams link. On the server, for each viewer: a privacy check decides what that person may see, and busy-only rows keep only their owner and time; meeting IDs are normalized so series and occurrence IDs line up; copies of one meeting on several teammates’ calendars are merged into one card, matched by the meeting’s calendar ID with title, start and end as the fallback; a teammate’s busy-only copy of a meeting is folded into it, so they appear as an attendee; remaining busy time is reduced by the meetings each person attends, and what is left stays per person, never merged across people. Only what the viewer may see is sent to the browser, so private titles never arrive there, and the browser filters it (mine, the team, chosen people) and lays out a time grid with overlapping meetings side by side and busy time in its own lane.';

const STAGES = [
  ['privacy', 'Privacy check', ['decided for each viewer', 'busy-only rows keep owner + time']],
  ['normalize', 'Normalize meeting IDs', ['series and occurrence IDs', 'made to line up']],
  ['merge', 'Merge copies', ['matched by calendar ID', 'title + start + end as fallback']],
  ['fold', 'Fold busy copies', ['a teammate’s busy copy', 'joins as an attendee']],
  ['subtract', 'Subtract busy time', ['minus meetings they attend', 'the rest stays per person']],
];
const CHAIN = [
  ['rows', 'rows this viewer may see'],
  ['ids', 'shared meeting IDs'],
  ['cards', 'one card per meeting'],
  ['busy', 'remaining busy time'],
];

function stages(x, y0, w, pitch) {
  return STAGES.map(([id, title, sub], i) => ({ id, x, y: y0 + i * pitch, w, h: 72, title, sub }));
}
function chain() {
  return CHAIN.map(([id, text], i) => ({ id, from: STAGES[i][0], to: STAGES[i + 1][0], route: [`${STAGES[i][0]}.b`, `${STAGES[i + 1][0]}.t`], label: [text] }));
}

const wide = {
  w: 1120,
  h: 600,
  groups: [
    { label: 'Sources', x: 0, y: 44 },
    { label: 'In the browser', x: 912, y: 488 },
  ],
  boxes: [{ id: 'server', x: 384, y: 8, w: 344, h: 588, label: 'On the server, per viewer' }],
  nodes: [
    { id: 'outlook', x: 0, y: 56, w: 200, h: 64, title: 'Outlook', sub: 'via Microsoft Graph' },
    { id: 'hubev', x: 0, y: 168, w: 200, h: 64, title: 'Hub events', sub: 'made in the hub' },
    { id: 'google', x: 0, y: 280, w: 200, h: 64, title: 'Google Calendar', sub: 'read-only' },
    { id: 'links', x: 0, y: 392, w: 200, h: 64, title: 'Linked calendars', sub: 'any published link' },
    ...stages(400, 52, 312, 112),
    { id: 'grid', x: 912, y: 492, w: 208, h: 88, title: 'Time grid', sub: ['Mine / Team filters', 'overlaps side by side', 'busy in its own lane'] },
  ],
  edges: [
    { id: 'outlook', from: 'outlook', to: 'privacy', route: ['outlook.r', 'privacy.l'], label: ['mirrored', 'every 15 min'], at: [272, 88] },
    { id: 'hubev', from: 'hubev', to: 'privacy', route: ['hubev.r', 'x:344', 'privacy.l'], label: ['hub meetings'], seg: 0 },
    { id: 'google', from: 'google', to: 'privacy', route: ['google.r', 'x:344', 'privacy.l'], label: ['read-only', 'every 15 min'], seg: 0 },
    { id: 'links', from: 'links', to: 'privacy', route: ['links.r', 'x:344', 'privacy.l'], label: ['encrypted links', 'every 15 min'], seg: 0 },
    { id: 'toOutlook', from: 'hubev', to: 'outlook', route: ['hubev.t', 'outlook.b'], label: ['sent to Outlook', 'with a Teams link'] },
    ...chain(),
    { id: 'send', from: 'subtract', to: 'grid', route: ['subtract.r', 'grid.l'], label: ['only what they may see', 'private titles never sent'] },
  ],
};

const narrow = {
  w: 336,
  h: 1056,
  groups: [{ label: 'In the browser', x: 0, y: 964 }],
  boxes: [
    { id: 'sources', x: 0, y: 24, w: 336, h: 240, label: 'Sources' },
    { id: 'server', x: 0, y: 312, w: 336, h: 568, label: 'On the server' },
  ],
  nodes: [
    { id: 'outlook', litWith: 'sources', x: 16, y: 56, w: 144, h: 56, title: 'Outlook', sub: 'via Graph' },
    { id: 'hubev', litWith: 'sources', x: 16, y: 184, w: 144, h: 56, title: 'Hub events', sub: 'made in the hub' },
    { id: 'google', litWith: 'sources', x: 176, y: 56, w: 144, h: 56, title: 'Google Calendar', sub: 'read-only' },
    { id: 'links', litWith: 'sources', x: 176, y: 184, w: 144, h: 56, title: 'Calendar links', sub: 'published links' },
    ...stages(16, 344, 304, 112),
    { id: 'grid', x: 0, y: 976, w: 336, h: 80, title: 'Time grid', sub: ['Mine / Team filters', 'overlaps side by side', 'busy in its own lane'] },
  ],
  edges: [
    { id: 'toOutlook', from: 'hubev', to: 'outlook', route: ['hubev.t', 'outlook.b'], label: ['sent to Outlook', 'with a Teams link'] },
    { id: 'sources', from: 'sources', to: 'privacy', route: ['sources.b', 'privacy.t'], label: ['mirrored every 15 min', 'links also when added'], at: [168, 290] },
    ...chain(),
    { id: 'send', from: 'subtract', to: 'grid', route: ['subtract.b', 'grid.t'], label: ['only what they may see', 'private titles never sent'], at: [168, 916] },
  ],
};

const calendar = { id: 'calendar', description, wide, narrow };
export default calendar;
