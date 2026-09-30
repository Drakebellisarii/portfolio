import React from 'react';

/**
 * WebP with a universal fallback. Lazy by default; `priority` for above-the-fold images.
 * `sources` adds art-directed <source>s ahead of the defaults ({ srcSet, media?, type? }),
 * so a phone can be served a different image and never download the desktop one.
 */
export default function Picture({ webp, src, sources = [], alt = '', className, width, height, priority = false, ...rest }) {
  return (
    <picture className="contents">
      {sources.map((source) => (
        <source key={source.srcSet} {...source} />
      ))}
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
