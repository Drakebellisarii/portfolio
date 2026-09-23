import React, { useLayoutEffect, useRef, useState } from 'react';

const MIN_SCALE = 0.5;

/**
 * Renders a UI recreation at a fixed design size and scales it to fit its
 * container, like a product shot: the layout never reflows, it just gets
 * smaller. The recreation is presented as one image with a text alternative;
 * its inner text is hidden from assistive technology.
 */
export function Scaled({ width, height, label, className = '', children }) {
  const ref = useRef(null);
  const [box, setBox] = useState({ scale: 1, overflow: false });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const fit = el.clientWidth / width;
      // Below ~half size the UI text stops being legible; hold a floor and let
      // the shot pan sideways instead, like a gallery on a phone.
      const scale = Math.min(1, Math.max(fit, MIN_SCALE));
      setBox({ scale, overflow: fit < MIN_SCALE });
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const { scale, overflow } = box;
  return (
    <div
      ref={ref}
      className={`cs-scaled${overflow ? ' cs-scaled--pan' : ''} ${className}`}
      role="img"
      aria-label={label}
      tabIndex={overflow ? 0 : undefined}
      data-w={width}
      data-h={height}
      style={{ height: height * scale + (overflow ? 10 : 0) }}
    >
      <div className="cs-scaled__track" style={{ width: width * scale, height: height * scale }}>
        <div className="cs-scaled__inner" aria-hidden="true" style={{ width, height, transform: `scale(${scale})` }}>
          {children}
        </div>
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
