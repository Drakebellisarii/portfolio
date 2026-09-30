/**
 * Slack, both ways: live events, a polling backup, and writes made as the person.
 */

const description =
  'Slack pipeline. Live path: the Slack workspace sends each change as a signed event over HTTPS; the hub checks the signature and acknowledges within three seconds, then processes the event after replying; an event log lets only the first delivery of each event through and skips retries; the change is written on the server as one row per message and broadcast on a private topic to open hub windows. Backup: a polling job re-reads recent history with connected people’s own Slack tokens, every one to two minutes for active conversations, every twelve minutes for quiet ones and whenever someone opens a conversation. Channels shared with other companies are read only through connected people’s own access; the bot never joins them. The backup writes missed messages, thread replies and edits, and mirrors deletions as reversible hides, only after a complete, error-free read. Outbound: when someone sends, edits, reacts or pins in the hub, the hub does it in Slack as that person, with their own token, and then stores what Slack accepted. Per-person Slack tokens are encrypted at rest.';

const wide = {
  w: 1120,
  h: 488,
  groups: [
    { label: 'Slack', x: 0, y: 132 },
    { label: 'Live', x: 320, y: 132 },
    { label: 'Backup', x: 320, y: 228 },
  ],
  nodes: [
    { id: 'composer', x: 320, y: 32, w: 192, h: 64, title: 'Hub composer', sub: 'writes as each person' },
    { id: 'workspace', x: 0, y: 144, w: 184, h: 64, title: 'Slack workspace', sub: 'channels · DMs' },
    { id: 'shared', x: 0, y: 376, w: 184, h: 64, title: 'Shared channels', sub: 'with other companies' },
    { id: 'sig', x: 320, y: 144, w: 192, h: 64, title: 'Signature check', sub: 'acknowledged in < 3 s' },
    { id: 'log', x: 648, y: 144, w: 168, h: 64, title: 'Event log', sub: 'each event once' },
    { id: 'write', x: 952, y: 144, w: 168, h: 176, title: 'Server write', sub: ['Postgres', 'one row per message'] },
    { id: 'poll', x: 320, y: 240, w: 192, h: 96, title: 'Polling backup', sub: ['active: every 1–2 min', 'quiet: every 12 min', 'and on open'] },
    { id: 'windows', x: 952, y: 376, w: 168, h: 64, title: 'Open hub windows', sub: 'live updates' },
  ],
  edges: [
    { id: 'live', from: 'workspace', to: 'sig', route: ['workspace.r', 'sig.l'], label: ['signed event', 'HTTPS'] },
    { id: 'ack', from: 'sig', to: 'log', route: ['sig.r', 'log.l'], label: ['acknowledged', 'then processed'] },
    { id: 'once', from: 'log', to: 'write', route: ['log.r', 'write.l@=176'], label: ['first delivery', 'retries skipped'] },
    { id: 'broadcast', from: 'write', to: 'windows', route: ['write.b', 'windows.t'], label: ['broadcast', 'private topic'] },
    { id: 'history', from: 'workspace', to: 'poll', route: ['workspace.b', 'poll.l'], label: ['recent history', 'per-person tokens'], seg: 1 },
    { id: 'shared', from: 'shared', to: 'poll', route: ['shared.r', 'poll.b'], label: ['people’s own access', 'bot never joins'], seg: 0 },
    { id: 'missed', from: 'poll', to: 'write', route: ['poll.r@=272', 'write.l@=272'], label: ['missed messages', 'replies · edits'], at: [600, 272] },
    { id: 'hide', from: 'poll', to: 'write', route: ['poll.r@=304', 'write.l@=304'], label: ['deletions: reversible hide', 'after a complete, error-free read'], at: [808, 304] },
    { id: 'outbound', from: 'composer', to: 'workspace', route: ['composer.l', 'workspace.t'], label: ['as the person', 'their own token'], seg: 0 },
    { id: 'accepted', from: 'composer', to: 'write', route: ['composer.r', 'write.t'], label: ['what Slack accepted', 'stored once Slack confirms'] },
  ],
  notes: [{ x: 0, y: 480, text: 'Per-person Slack tokens are encrypted at rest.' }],
};

// Narrow: the same connections as three short vertical flows, each ending in the server write.
const narrow = {
  w: 336,
  h: 1344,
  groups: [
    { label: 'Live', x: 0, y: 14 },
    { label: 'Backup', x: 0, y: 644 },
    { label: 'Written from the hub', x: 0, y: 1092 },
  ],
  nodes: [
    { id: 'ws1', x: 0, y: 24, w: 336, h: 56, title: 'Slack workspace', sub: 'channels · DMs' },
    { id: 'sig', x: 0, y: 152, w: 336, h: 56, title: 'Signature check', sub: 'acknowledged in < 3 s' },
    { id: 'log', x: 0, y: 280, w: 336, h: 56, title: 'Event log', sub: 'each event once' },
    { id: 'write1', x: 0, y: 408, w: 336, h: 56, title: 'Server write', sub: 'one row per message' },
    { id: 'windows', x: 0, y: 536, w: 336, h: 56, title: 'Open hub windows', sub: 'live updates' },
    { id: 'ws2', x: 0, y: 656, w: 160, h: 56, title: 'Slack workspace', sub: 'channels · DMs' },
    { id: 'shared', x: 176, y: 656, w: 160, h: 56, title: 'Shared channels', sub: 'other companies' },
    { id: 'poll', x: 0, y: 784, w: 336, h: 72, title: 'Polling backup', sub: ['active: every 1–2 min', 'quiet: every 12 min · on open'] },
    { id: 'write2', x: 0, y: 976, w: 336, h: 56, title: 'Server write', sub: 'the same write as above' },
    { id: 'composer', x: 0, y: 1104, w: 336, h: 56, title: 'Hub composer', sub: 'writes as each person' },
    { id: 'ws3', x: 0, y: 1232, w: 160, h: 56, title: 'Slack workspace', sub: 'channels · DMs' },
    { id: 'write3', x: 176, y: 1232, w: 160, h: 56, title: 'Server write', sub: 'after Slack' },
  ],
  edges: [
    { id: 'live', from: 'ws1', to: 'sig', route: ['ws1.b', 'sig.t'], label: ['signed event', 'HTTPS'] },
    { id: 'ack', from: 'sig', to: 'log', route: ['sig.b', 'log.t'], label: ['acknowledged', 'then processed'] },
    { id: 'once', from: 'log', to: 'write1', route: ['log.b', 'write1.t'], label: ['first delivery', 'retries skipped'] },
    { id: 'broadcast', from: 'write1', to: 'windows', route: ['write1.b', 'windows.t'], label: ['broadcast', 'private topic'] },
    { id: 'history', from: 'ws2', to: 'poll', route: ['ws2.b', 'poll.t@=80'], label: ['recent history', 'per-person tokens'] },
    { id: 'shared', from: 'shared', to: 'poll', route: ['shared.b', 'poll.t@=256'], label: ['people’s own access', 'bot never joins'] },
    { id: 'missed', from: 'poll', to: 'write2', route: ['poll.b@=64', 'write2.t@=64'], label: ['missed messages', 'replies · edits'], at: [64, 888] },
    { id: 'hide', from: 'poll', to: 'write2', route: ['poll.b@=232', 'write2.t@=232'], label: ['reversible hide', 'after a complete,', 'error-free read'], at: [232, 940] },
    { id: 'outbound', from: 'composer', to: 'ws3', route: ['composer.b@=80', 'ws3.t'], label: ['as the person', 'their own token'] },
    { id: 'accepted', from: 'composer', to: 'write3', route: ['composer.b@=256', 'write3.t'], label: ['what Slack accepted'] },
  ],
  notes: [{ x: 0, y: 1336, text: 'Per-person tokens are encrypted at rest.' }],
};

const slack = { id: 'slack', description, wide, narrow };
export default slack;
