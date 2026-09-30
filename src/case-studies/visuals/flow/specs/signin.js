/**
 * Sign-in and access: two ways in, one gate in the database, three outcomes.
 */

const description =
  'Sign-in and access. People sign in with Microsoft, across two company tenants, where the tenant is read from the verified sign-in; or, without a company Microsoft account, with a single-use link sent by email, which is only issued to invited addresses. Both paths reach one invitation-only check enforced in the database, where passwords are disabled. From it: people on the invitation list become active; a company sign-in that was not invited waits as pending, admins are notified, and an admin can approve it, which makes it active; anyone else is refused and no account is created. An active person signing in for the first time goes through a short setup (profile, calendar, notifications and a tour) and then reaches the hub; returning people go straight to the hub.';

const wide = {
  w: 1120,
  h: 328,
  groups: [
    { label: 'Sign in with', x: 0, y: 20 },
    { label: 'In the database', x: 336, y: 20 },
    { label: 'Result', x: 680, y: 20 },
  ],
  nodes: [
    { id: 'ms', x: 0, y: 32, w: 192, h: 64, title: 'Microsoft sign-in', sub: 'two company tenants' },
    { id: 'magic', x: 0, y: 144, w: 192, h: 64, title: 'Magic link', sub: 'invited addresses only' },
    { id: 'gate', x: 336, y: 32, w: 208, h: 288, title: 'Invitation-only', sub: ['checked in the database', 'passwords disabled'] },
    { id: 'active', x: 680, y: 32, w: 152, h: 64, title: 'Active', sub: 'a member' },
    { id: 'pending', x: 680, y: 144, w: 152, h: 64, title: 'Pending', sub: 'awaits an admin' },
    { id: 'refused', x: 680, y: 256, w: 152, h: 64, title: 'Refused', sub: 'no account created' },
    { id: 'setup', x: 936, y: 24, w: 184, h: 80, title: 'First-login setup', sub: ['profile · calendar', 'notifications · tour'] },
    { id: 'hub', x: 936, y: 176, w: 184, h: 80, title: 'Queralt Hub', sub: 'lands on Home' },
  ],
  edges: [
    { id: 'ms', from: 'ms', to: 'gate', route: ['ms.r', 'gate.l@=64'], label: ['sign-in', 'tenant verified'] },
    { id: 'magic', from: 'magic', to: 'gate', route: ['magic.r', 'gate.l@=176'], label: ['one-time link', 'single use'] },
    { id: 'active', from: 'gate', to: 'active', route: ['gate.r@=64', 'active.l'], label: ['on the list'] },
    { id: 'pending', from: 'gate', to: 'pending', route: ['gate.r@=176', 'pending.l'], label: ['company sign-in', 'not yet invited'] },
    { id: 'refused', from: 'gate', to: 'refused', route: ['gate.r@=288', 'refused.l'], label: ['anyone else'] },
    { id: 'approve', from: 'pending', to: 'active', route: ['pending.t', 'active.b'], label: ['admin approves'] },
    { id: 'first', from: 'active', to: 'setup', route: ['active.r', 'setup.l@=64'], label: ['first time'] },
    { id: 'done', from: 'setup', to: 'hub', route: ['setup.b', 'hub.t'], label: ['setup done'] },
    { id: 'returning', from: 'active', to: 'hub', route: ['active.r@16', 'x:888', 'hub.l'], label: ['returning'], seg: 1 },
  ],
};

const narrow = {
  w: 336,
  h: 832,
  groups: [{ label: 'Sign in with', x: 0, y: 14 }],
  nodes: [
    { id: 'ms', x: 0, y: 24, w: 160, h: 64, title: 'Microsoft sign-in', sub: 'company tenants' },
    { id: 'magic', x: 176, y: 24, w: 160, h: 64, title: 'Magic link', sub: 'invited addresses' },
    { id: 'gate', x: 0, y: 160, w: 336, h: 72, title: 'Invitation-only', sub: ['checked in the database', 'passwords disabled'] },
    { id: 'refused', x: 176, y: 304, w: 160, h: 56, title: 'Refused', sub: 'no account created' },
    { id: 'pending', x: 176, y: 392, w: 160, h: 56, title: 'Pending', sub: 'awaits an admin' },
    { id: 'active', x: 176, y: 496, w: 160, h: 56, title: 'Active', sub: 'a member' },
    { id: 'setup', x: 96, y: 624, w: 240, h: 72, title: 'First-login setup', sub: ['profile · calendar', 'notifications · tour'] },
    { id: 'hub', x: 96, y: 768, w: 240, h: 56, title: 'Queralt Hub', sub: 'lands on Home' },
  ],
  edges: [
    { id: 'ms', from: 'ms', to: 'gate', route: ['ms.b', 'gate.t@=80'], label: ['sign-in', 'tenant verified'] },
    { id: 'magic', from: 'magic', to: 'gate', route: ['magic.b', 'gate.t@=256'], label: ['one-time link', 'single use'] },
    { id: 'refused', from: 'gate', to: 'refused', route: ['gate.b@=16', 'refused.l'], label: ['anyone else'], seg: 1 },
    { id: 'pending', from: 'gate', to: 'pending', route: ['gate.b@=16', 'pending.l'], label: ['company sign-in', 'not yet invited'], seg: 1 },
    { id: 'active', from: 'gate', to: 'active', route: ['gate.b@=16', 'active.l'], label: ['on the list'], seg: 1 },
    { id: 'approve', from: 'pending', to: 'active', route: ['pending.b', 'active.t'], label: ['admin approves'] },
    { id: 'first', from: 'active', to: 'setup', route: ['active.b', 'setup.t@=256'], label: ['first time'] },
    { id: 'done', from: 'setup', to: 'hub', route: ['setup.b@=256', 'hub.t@=256'], label: ['setup done'] },
    { id: 'returning', from: 'active', to: 'hub', route: ['active.l@16', 'x:48', 'hub.l'], label: ['returning'], seg: 1 },
  ],
};

const signin = { id: 'signin', description, wide, narrow };
export default signin;
