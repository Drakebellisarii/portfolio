const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scrolls a section to the top of the viewport and makes sure it lands there.
 *
 * A smooth scroll computes its destination once, when it starts. If the page
 * grows above the target while it runs (lazy images decoding, sections
 * settling), it stops short. So when the scroll ends, the target's position is
 * checked and any remaining distance is closed, up to a few times.
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const instant = prefersReducedMotion();
  el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
  if (instant) return;

  let tries = 0;
  let timer = 0;
  const settle = () => {
    window.removeEventListener('scrollend', onEnd);
    clearTimeout(timer);
    const off = el.getBoundingClientRect().top;
    const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
    if (Math.abs(off) <= 2 || atBottom || tries >= 3) return;
    tries += 1;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    arm();
  };
  const onEnd = () => settle();
  const arm = () => {
    window.addEventListener('scrollend', onEnd, { once: true });
    // Browsers without scrollend: check after a smooth scroll has certainly finished.
    timer = window.setTimeout(settle, 1400);
  };
  arm();
}
