// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// jsdom does not implement media playback; the site only ever calls these
// behind feature checks, so a quiet no-op keeps test output clean.
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', { configurable: true, value: () => Promise.resolve() });
Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', { configurable: true, value: () => {} });
