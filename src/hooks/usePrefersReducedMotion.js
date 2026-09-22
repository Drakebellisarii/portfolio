import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const mediaQuery = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY)
    : null;

/** True when the OS asks for reduced motion. Updates live if the setting changes. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => mediaQuery()?.matches ?? false);

  useEffect(() => {
    const mq = mediaQuery();
    if (!mq) return undefined;
    const onChange = (event) => setReduced(event.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}
