/**
 * Delivery through an outbox: recorded first, sent right after the response,
 * with a scheduled job as the catch-all and retries for webhooks.
 */

const description =
  'Outbox delivery. A hub action, or a trigger in the database, records delivery rows in an outbox before anything is sent. A delivery run starts right after the response, and a scheduled job every five minutes starts one as a catch-all for anything missed; the run reads the pending rows. It sends email grouped per person through Microsoft Graph, web push notifications to each subscribed browser, and webhooks signed with HMAC and a timestamp, never back to the app that sent the event. A failed webhook delivery goes back to the outbox and is retried with quadratic back-off, up to six attempts.';

const wide = {
  w: 1120,
  h: 368,
  nodes: [
    { id: 'action', x: 0, y: 64, w: 200, h: 64, title: 'Hub action', sub: 'or a database trigger' },
    { id: 'outbox', x: 344, y: 64, w: 200, h: 64, title: 'Outbox', sub: 'mail and webhook rows' },
    { id: 'run', x: 344, y: 176, w: 200, h: 64, title: 'Delivery run', sub: 'sends what is pending' },
    { id: 'job', x: 0, y: 288, w: 200, h: 64, title: 'Scheduled job', sub: 'every 5 minutes' },
    { id: 'email', x: 800, y: 64, w: 200, h: 64, title: 'Email', sub: 'grouped per person' },
    { id: 'push', x: 800, y: 176, w: 200, h: 64, title: 'Web push', sub: 'each subscribed browser' },
    { id: 'hooks', x: 800, y: 288, w: 200, h: 64, title: 'Webhooks', sub: 'never back to the sender' },
  ],
  edges: [
    { id: 'rows', from: 'action', to: 'outbox', route: ['action.r', 'outbox.l'], label: ['delivery rows', 'recorded first'] },
    { id: 'after', from: 'action', to: 'run', route: ['action.b', 'run.l'], label: ['right after', 'the response'], seg: 1 },
    { id: 'pending', from: 'outbox', to: 'run', route: ['outbox.b', 'run.t'], label: ['pending rows'] },
    { id: 'cron', from: 'job', to: 'run', route: ['job.r', 'run.b'], label: ['every 5 min', 'catch-all'], seg: 0 },
    { id: 'email', from: 'run', to: 'email', route: ['run.r@-16', 'x:640', 'email.l'], label: ['emails', 'Microsoft Graph'], seg: 2 },
    { id: 'push', from: 'run', to: 'push', route: ['run.r', 'push.l'], label: ['fresh notifications', 'not yet pushed'], at: [720, 208] },
    { id: 'hooks', from: 'run', to: 'hooks', route: ['run.r@16', 'x:640', 'hooks.l'], label: ['signed payload', 'HMAC + timestamp'], seg: 2 },
    { id: 'retry', from: 'hooks', to: 'outbox', route: ['hooks.r', 'x:1064', 'y:24', 'outbox.t'], label: ['failed delivery', 'quadratic back-off, 6 attempts'], seg: 2, at: [720, 24] },
  ],
};

const narrow = {
  w: 336,
  h: 544,
  nodes: [
    { id: 'action', x: 16, y: 24, w: 144, h: 56, title: 'Hub action', sub: 'or a trigger' },
    { id: 'job', x: 176, y: 24, w: 160, h: 56, title: 'Scheduled job', sub: 'every 5 minutes' },
    { id: 'outbox', x: 32, y: 160, w: 112, h: 56, title: 'Outbox', sub: 'mail · hooks' },
    { id: 'run', x: 32, y: 296, w: 304, h: 56, title: 'Delivery run', sub: 'sends what is pending' },
    { id: 'email', x: 32, y: 432, w: 96, h: 48, title: 'Email' },
    { id: 'push', x: 136, y: 432, w: 96, h: 48, title: 'Web push' },
    { id: 'hooks', x: 240, y: 432, w: 96, h: 48, title: 'Webhooks' },
  ],
  edges: [
    { id: 'rows', from: 'action', to: 'outbox', route: ['action.b@=88', 'outbox.t@=88'], label: ['delivery rows', 'recorded first'] },
    { id: 'after', from: 'action', to: 'run', route: ['action.b@=152', 'run.t@=152'], label: ['right after', 'the response'], at: [152, 272] },
    { id: 'pending', from: 'outbox', to: 'run', route: ['outbox.b@=88', 'run.t@=88'], label: ['pending rows'], at: [88, 236] },
    { id: 'cron', from: 'job', to: 'run', route: ['job.b', 'run.t@=256'], label: ['every 5 min', 'catch-all'] },
    { id: 'email', from: 'run', to: 'email', route: ['run.b@=80', 'email.t'], label: ['via Graph'] },
    { id: 'push', from: 'run', to: 'push', route: ['run.b@=184', 'push.t'], label: ['notifications'] },
    { id: 'hooks', from: 'run', to: 'hooks', route: ['run.b@=288', 'hooks.t'], label: ['signed'] },
    { id: 'retry', from: 'hooks', to: 'outbox', route: ['hooks.b', 'y:520', 'x:8', 'outbox.l'], label: ['failed: retried', 'back-off, 6 attempts'], at: [148, 520] },
  ],
};

const outbox = { id: 'outbox', description, wide, narrow };
export default outbox;
