import React, { useEffect, useRef, useState } from 'react';
import Picture from './Picture';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const wantsLessData = () =>
  typeof navigator !== 'undefined' && navigator.connection?.saveData === true;

/**
 * A looping, muted background video that behaves well on the open web:
 *  - the poster paints instantly and the stream crossfades in once frames are
 *    actually rendering, so there is never a black box while it buffers
 *  - it only plays while on screen, and with `preload="none"` it does not
 *    download at all until it is near the screen
 *  - reduced-motion and data-saver users keep the still poster
 */
export default function SmartVideo({
  sources,
  poster,
  posterWebp,
  className = '',
  preload = 'metadata',
  priority = false,
  rootMargin = '200px 0px',
}) {
  const [ref, inView] = useInView({ rootMargin });
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const enabled = !reducedMotion && !wantsLessData();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;
    if (inView) {
      video.muted = true; // belt and braces for autoplay policies
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } else if (!video.paused) {
      video.pause();
    }
  }, [inView, enabled]);

  return (
    <div ref={ref} className={`smart-video ${className}`.trim()}>
      <Picture
        webp={posterWebp}
        src={poster}
        alt=""
        className="smart-video__poster"
        priority={priority}
        aria-hidden="true"
      />
      {enabled && (
        <video
          ref={videoRef}
          className={`smart-video__video${playing ? ' is-playing' : ''}`}
          muted
          playsInline
          loop
          preload={preload}
          poster={poster}
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          aria-hidden="true"
          tabIndex={-1}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      )}
    </div>
  );
}
