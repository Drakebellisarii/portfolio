/**
 * Thin wrapper around IntersectionObserver that degrades gracefully where it is
 * unavailable (very old browsers, jsdom): the callback fires once as "visible".
 * Returns a function that stops observing.
 */
export function observe(element, onChange, options) {
  if (!element) return () => {};
  if (typeof IntersectionObserver === 'undefined') {
    onChange(true, null);
    return () => {};
  }
  const io = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting, entry), options);
  io.observe(element);
  return () => io.disconnect();
}
