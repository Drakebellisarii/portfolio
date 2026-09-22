import { useEffect, useRef, useState } from 'react';
import { observe } from '../lib/observe';

/**
 * Tracks whether the referenced element is inside the viewport.
 * With `once`, the value latches to true the first time the element appears.
 */
export function useInView({ rootMargin = '0px', threshold = 0, once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let stop = () => {};
    stop = observe(
      ref.current,
      (visible) => {
        if (visible) {
          setInView(true);
          if (once) stop();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    return () => stop();
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}
