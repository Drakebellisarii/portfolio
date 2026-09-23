import React, { useSyncExternalStore } from 'react';

/**
 * A deliberately small History API router: the site has a handful of routes,
 * so a routing library would cost more than it saves.
 */
const listeners = new Set();
const notify = () => listeners.forEach((l) => l());
if (typeof window !== 'undefined') window.addEventListener('popstate', notify);

const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const snapshot = () => window.location.pathname;

export function usePath() {
  // Prerendered pages hydrate, so the "server" snapshot is the real path.
  return useSyncExternalStore(subscribe, snapshot, () => (typeof window !== 'undefined' ? window.location.pathname : '/'));
}

/** Scrolls to a hash target once the new route has rendered, otherwise to the top. */
function settle(hash) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = hash ? document.getElementById(hash.slice(1)) : null;
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      // 'instant' overrides the site's CSS smooth scrolling: a new page opens at its top.
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }),
  );
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  if (url.pathname === window.location.pathname && url.hash) {
    window.history.pushState({}, '', url);
    settle(url.hash);
    return;
  }
  window.history.pushState({}, '', url);
  notify();
  settle(url.hash);
}

/** An anchor that routes in-app on a plain click and behaves normally otherwise (new tab, copy link). */
export function Link({ to, onClick, children, ...rest }) {
  const handle = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
