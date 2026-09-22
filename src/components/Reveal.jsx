import React from 'react';
import { useInView } from '../hooks/useInView';

/** Fades and lifts its content into place the first time it scrolls into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView({ once: true, rootMargin: '0px 0px -8% 0px' });
  const classes = ['reveal', inView && 'is-visible', className].filter(Boolean).join(' ');
  const styles = delay ? { ...style, '--reveal-delay': `${delay}ms` } : style;
  return (
    <Tag ref={ref} className={classes} style={styles} {...rest}>
      {children}
    </Tag>
  );
}
