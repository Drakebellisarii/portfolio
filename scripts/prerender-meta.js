#!/usr/bin/env node
/**
 * The site is a client-rendered SPA. After `react-scripts build`, this writes
 * a static index.html for each case study route that:
 *  - carries that page's own title, description and Open Graph tags, so link
 *    unfurlers (Slack, LinkedIn, iMessage) show the right preview;
 *  - preloads the lazy case study chunk and its CSS;
 *  - contains the whole page, rendered with React's server renderer, so it
 *    paints straight from the HTML and the client hydrates it in place
 *    (src/index.js) instead of rebuilding it.
 * Vercel serves these static files before the SPA rewrite in vercel.json.
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const root = path.join(__dirname, '..');
const build = path.join(root, 'build');
const meta = require('../src/case-studies/meta.json');


// Render the case study pages at build time with the app's own components.
process.env.BABEL_ENV = process.env.BABEL_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
// A minimal require hook: compile files under src/ with the same preset CRA uses.
const Module = require('module');
const srcDir = path.join(root, 'src');
for (const ext of ['.js', '.jsx']) {
  const original = Module._extensions[ext] || Module._extensions['.js'];
  Module._extensions[ext] = (mod, filename) => {
    if (!filename.startsWith(srcDir)) return original(mod, filename);
    const { code } = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
      filename,
      babelrc: false,
      configFile: false,
      presets: [[require.resolve('babel-preset-react-app'), { runtime: 'automatic' }]],
      plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
    });
    mod._compile(code, filename);
  };
}
require.extensions['.css'] = () => {};
const React = require('react');
const { renderToString } = require('react-dom/server');
const CaseStudiesRoute = require('../src/case-studies/CaseStudiesRoute.jsx').default;
// Same tree the client renders for /work/* (App.jsx): a Suspense boundary
// around the lazy route, so the client hydrates this markup instead of
// replacing it.
const renderRoute = (route) =>
  renderToString(
    React.createElement(React.Suspense, { fallback: React.createElement('div', { className: 'cs-loading', 'aria-busy': 'true' }) }, React.createElement(CaseStudiesRoute, { path: route })),
  );

// Sizes every scaled recreation for this screen before first paint, with the
// same rule as <Scaled>, so React's later render changes nothing visible.
const SIZE_SCRIPT = `<script>(function(){var M=0.5;document.querySelectorAll('#root .cs-scaled[data-w]').forEach(function(el){var w=+el.dataset.w,h=+el.dataset.h,f=el.clientWidth/w,s=Math.min(1,Math.max(f,M)),o=f<M;el.style.height=(h*s+(o?10:0))+'px';if(o){el.classList.add('cs-scaled--pan');el.tabIndex=0;}var t=el.firstElementChild;t.style.width=w*s+'px';t.style.height=h*s+'px';t.firstElementChild.style.transform='scale('+s+')';});})();</script>`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const html = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const manifest = require(path.join(build, 'asset-manifest.json')).files;
const preload = Object.entries(manifest)
  .filter(([name]) => /^case-studies\.(js|css)$/.test(name))
  .map(([name, url]) => (name.endsWith('.css') ? `<link rel="stylesheet" href="${url}">` : `<link rel="preload" as="script" href="${url}">`))
  .join('');

for (const [route, { title, description }] of Object.entries(meta)) {
  const shell = renderRoute(route);
  const page = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    // the home hero's poster is not on these pages
    .replace(/<link rel="preload" href="[^"]*poster\.jpg"[^>]*>/, '')
    .replace('</head>', `${preload}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${shell}</div>${SIZE_SCRIPT}`);
  if (!page.includes('class="cs-root"')) throw new Error(`prerender: could not inject shell for ${route}`);
  const dir = path.join(build, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page);
  console.log(`prerendered ${route}`);
}
