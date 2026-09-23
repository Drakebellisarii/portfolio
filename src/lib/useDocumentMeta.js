import { useEffect } from 'react';

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

/** Keeps the tab title and share metadata in step with client-side navigation. */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (!title) return undefined;
    const previous = document.title;
    document.title = title;
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }
    setMeta('property', 'og:title', title);
    return () => {
      document.title = previous;
    };
  }, [title, description]);
}
