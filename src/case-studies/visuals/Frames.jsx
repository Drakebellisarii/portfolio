import React, { useLayoutEffect, useRef, useState } from 'react';

/** Below this container width a recreation re-lays itself out for the space instead of shrinking. */
const COMPACT_BELOW = 760;
const COMPACT_MIN = 340;

/**
 * Presents a UI recreation like a product shot.
 *  - Wide containers: the recreation renders at its design size and scales
 *    down only if it has to, centred in the space.
 *  - Narrow containers (phones, small tablets): the same components re-lay
 *    themselves out at the container's own width (`ui-compact`), so text stays
 *    legible and nothing ever scrolls sideways.
 * The recreation is one image with a text alternative; its inner text is
 * hidden from assistive technology.
 */
export function Scaled({ width, height, label, className = '', children }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const [box, setBox] = useState({ compact: false, w: width, scale: 1, h: height, left: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return undefined;
    const measure = () => {
      const cw = el.clientWidth;
      if (!cw) return;
      // Thumbnails (e.g. the series index) opt out of the compact layout.
      if (cw < COMPACT_BELOW && !el.closest('[data-no-compact]')) {
        const w = Math.max(COMPACT_MIN, cw);
        const scale = Math.min(1, cw / w);
        setBox((b) => {
          const next = { compact: true, w, scale, h: inner.offsetHeight || b.h, left: 0 };
          return b.compact === next.compact && b.w === next.w && b.scale === next.scale && b.h === next.h ? b : next;
        });
      } else {
        const scale = Math.min(1, cw / width);
        const left = Math.max(0, (cw - width * scale) / 2);
        setBox((b) => (!b.compact && b.scale === scale && b.left === left ? b : { compact: false, w: width, scale, h: height, left }));
      }
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [width, height]);

  const { compact, w, scale, h, left } = box;
  return (
    <div ref={ref} className={`cs-scaled ${className}`.trim()} role="img" aria-label={label} data-w={width} data-h={height} style={{ height: h * scale }}>
      <div
        ref={innerRef}
        className={`cs-scaled__inner${compact ? ' ui-compact' : ''}`}
        aria-hidden="true"
        style={{ width: w, height: compact ? 'auto' : height, left, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/** A quiet browser window: traffic lights and a title, no address (nothing real to show). */
export function BrowserFrame({ title, children, dark = false }) {
  return (
    <div className={`ui-browser${dark ? ' ui-browser--dark' : ''}`}>
      <div className="ui-browser__bar">
        <span className="ui-dot" style={{ background: '#ff5f56' }} />
        <span className="ui-dot" style={{ background: '#ffbd2e' }} />
        <span className="ui-dot" style={{ background: '#27c93f' }} />
        <span className="ui-browser__title">{title}</span>
      </div>
      <div className="ui-browser__body">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }) {
  return (
    <div className="ui-phone">
      <div className="ui-phone__notch" />
      <div className="ui-phone__screen">{children}</div>
    </div>
  );
}
