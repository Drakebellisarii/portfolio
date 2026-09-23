import React, { useEffect, useState } from 'react';

/**
 * Types each phrase in turn — type, hold, delete, next — and stays on the last
 * one. A single-phrase array is a plain typewriter. Pass `phrases` as a
 * module-level constant so the effect does not restart on every render.
 * `onPhrase(index)` fires as each phrase starts typing; pass a stable function
 * (a state setter is ideal) for the same reason.
 * Screen readers get the final phrase only, never the intermediate keystrokes.
 */
export default function Typewriter({
  phrases,
  typeSpeed = 55,
  deleteSpeed = 32,
  holdMs = 1100,
  gapMs = 250,
  startDelay = 0,
  active = true,
  caret = true,
  className,
  style,
  onPhrase,
}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!active) return undefined;
    let cancelled = false;
    let timer;
    const wait = (ms) =>
      new Promise((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      await wait(startDelay);
      for (let p = 0; p < phrases.length; p += 1) {
        const phrase = phrases[p];
        if (onPhrase) onPhrase(p);
        for (let i = 1; i <= phrase.length; i += 1) {
          if (cancelled) return;
          setText(phrase.slice(0, i));
          await wait(typeSpeed);
        }
        if (p === phrases.length - 1) return;
        await wait(holdMs);
        for (let i = phrase.length - 1; i >= 0; i -= 1) {
          if (cancelled) return;
          setText(phrase.slice(0, i));
          await wait(deleteSpeed);
        }
        await wait(gapMs);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [phrases, typeSpeed, deleteSpeed, holdMs, gapMs, startDelay, active, onPhrase]);

  return (
    <span className={className} style={style}>
      <span className="sr-only">{phrases[phrases.length - 1]}</span>
      <span aria-hidden="true">
        {text}
        {caret && <span className="caret" />}
      </span>
    </span>
  );
}
