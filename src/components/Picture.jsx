import React from 'react';

/** WebP with a universal fallback. Lazy by default; `priority` for above-the-fold images. */
export default function Picture({ webp, src, alt = '', className, width, height, priority = false, ...rest }) {
  return (
    <picture className="contents">
      {webp && <source type="image/webp" srcSet={webp} />}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        {...rest}
      />
    </picture>
  );
}
