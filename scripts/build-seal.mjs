#!/usr/bin/env node
// Renders the Trinity seal for the Education section as a single-colour "blind
// emboss", the way a seal is pressed into a diploma: the navy of the original
// becomes solid ivory, its gold a half-tone of the same ivory, and white falls
// away, so the whole crest reads as one engraved plate over the painting.
//
// The source is an auto-traced vector (~200KB); this bakes it into a ~14KB WebP at
// 3x its on-screen size. Chromium does the rasterizing, so run it with
// Playwright available:
//
//   npx -y -p playwright node scripts/build-seal.mjs
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const SRC = 'public/Trinity-seal.svg';
const OUT_DIR = 'public/media/education';
const OUT = `${OUT_DIR}/trinity-seal.webp`;
const HEIGHT = 288; // px: 96px on screen at 3x
const IVORY = [243, 237, 225];

const svg = readFileSync(SRC, 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage();
const png = await page.evaluate(
  async ({ svg, height, ivory }) => {
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
    await img.decode();
    const width = Math.round((height * img.naturalWidth) / img.naturalHeight);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height);
    const px = data.data;
    for (let i = 0; i < px.length; i += 4) {
      const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      // navy (dark) -> 1, gold (mid) -> 0.45, white (light) -> 0, with soft steps between.
      let tone;
      if (lum < 0.25) tone = 1;
      else if (lum < 0.55) tone = 1 - ((lum - 0.25) / 0.3) * 0.55;
      else if (lum < 0.82) tone = 0.45;
      else if (lum < 0.95) tone = (0.45 * (0.95 - lum)) / 0.13;
      else tone = 0;
      [px[i], px[i + 1], px[i + 2]] = ivory;
      px[i + 3] = Math.round(px[i + 3] * tone);
    }
    ctx.putImageData(data, 0, 0);
    return canvas.toDataURL('image/png').split(',')[1];
  },
  { svg, height: HEIGHT, ivory: IVORY },
);
await browser.close();

mkdirSync(OUT_DIR, { recursive: true });
const tmp = `${OUT_DIR}/.seal.png`;
writeFileSync(tmp, Buffer.from(png, 'base64'));
execFileSync('cwebp', ['-quiet', '-q', '88', '-alpha_q', '90', '-m', '6', tmp, '-o', OUT]);
rmSync(tmp);
console.log(`wrote ${OUT}`);
