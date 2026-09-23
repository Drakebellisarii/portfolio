import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import './styles/components.css';
import App from './App';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Case study routes ship as prerendered HTML (scripts/prerender-meta.js):
// adopt that markup instead of replacing it. Every other route renders here.
if (container.hasChildNodes()) ReactDOM.hydrateRoot(container, app);
else ReactDOM.createRoot(container).render(app);
