import Jimp from 'jimp';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

const BRAIN_DIR = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\c74621eb-6c59-4e3a-bd2a-5a4b9c768b66';
const ASSETS_DIR = 'c:\\laragon\\www\\mpi\\game2\\assets\\items';
const PUBLIC_DIR = 'c:\\laragon\\www\\mpi\\game2\\public\\assets\\items';

async function processAiItem(jpgName, baseName) {
  const srcPath = path.join(BRAIN_DIR, jpgName);
  if (!fs.existsSync(srcPath)) {
    console.error(`Not found: ${srcPath}`);
    return;
  }

  const threshold = 238;
  const targetSize = 128;
  const image = await Jimp.read(srcPath);

  image.resize(targetSize, targetSize);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    if (r >= threshold && g >= threshold && b >= threshold) {
      this.bitmap.data[idx + 3] = 0;
    } else if (r >= threshold - 16 && g >= threshold - 16 && b >= threshold - 16) {
      const factor = (255 - ((r + g + b) / 3)) / 16;
      this.bitmap.data[idx + 3] = Math.min(255, Math.max(0, Math.floor(factor * 255)));
    }
  });

  const dest1 = path.join(ASSETS_DIR, `${baseName}.png`);
  const dest2 = path.join(PUBLIC_DIR, `${baseName}.png`);

  await image.writeAsync(dest1);
  await image.writeAsync(dest2);
  console.log(`Processed: ${baseName}.png -> assets & public`);
}

function renderSvgItem(svgString, baseName) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: 128 }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const dest1 = path.join(ASSETS_DIR, `${baseName}.png`);
  const dest2 = path.join(PUBLIC_DIR, `${baseName}.png`);

  fs.writeFileSync(dest1, pngBuffer);
  fs.writeFileSync(dest2, pngBuffer);
  console.log(`Rendered SVG: ${baseName}.png -> assets & public`);
}

async function run() {
  // 1. Process the 7 AI generated items
  await processAiItem('item_orange_peel_1793320337397.jpg', 'item_orange_peel');
  await processAiItem('item_chicken_bone_1793320355509.jpg', 'item_chicken_bone');
  await processAiItem('item_newspaper_1793320372568.jpg', 'item_newspaper');
  await processAiItem('item_plastic_cup_1793320390776.jpg', 'item_plastic_cup');
  await processAiItem('item_bleach_bottle_1793320407877.jpg', 'item_bleach_bottle');
  await processAiItem('item_thermometer_1793320426912.jpg', 'item_thermometer');
  await processAiItem('item_diaper_1793320444702.jpg', 'item_diaper');

  // 2. Render item_plastic_bag (Kantong Kresek Merah-Putih Kusut) via Resvg
  const plasticBagSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="bagRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="60%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#B91C1C"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Bag Handles -->
        <path d="M 40 48 C 34 22 48 14 54 36" fill="none" stroke-width="7"/>
        <path d="M 40 48 C 34 22 48 14 54 36" fill="none" stroke="#DC2626" stroke-width="4"/>

        <path d="M 74 36 C 80 14 94 22 88 48" fill="none" stroke-width="7"/>
        <path d="M 74 36 C 80 14 94 22 88 48" fill="none" stroke="#DC2626" stroke-width="4"/>

        <!-- Crumpled Body -->
        <path d="M 32 52 Q 24 74 30 102 C 34 114 94 116 98 102 Q 104 74 96 52 Q 80 58 64 54 Q 48 58 32 52 Z" 
              fill="url(#bagRed)" stroke-width="4.5"/>

        <!-- Crinkled Folds / Creases (Dark) -->
        <g stroke="#991B1B" stroke-width="3" fill="none">
          <path d="M 36 68 Q 50 82 46 98"/>
          <path d="M 64 58 Q 62 82 66 106"/>
          <path d="M 90 68 Q 78 86 82 98"/>
          <path d="M 42 86 Q 64 92 86 86"/>
        </g>

        <!-- Specular Crinkle Highlights -->
        <g stroke="#FCA5A5" stroke-width="2" fill="none" opacity="0.85">
          <path d="M 34 58 Q 42 70 38 82"/>
          <path d="M 54 62 Q 58 76 54 88"/>
          <path d="M 74 62 Q 72 78 76 90"/>
          <path d="M 92 60 Q 86 72 90 82"/>
        </g>

        <!-- White Plastic Stripe / Label Print in center -->
        <path d="M 44 76 Q 64 80 84 76" stroke="#FFFFFF" stroke-width="3.5" fill="none" opacity="0.9"/>
      </g>
    </svg>
  `;
  renderSvgItem(plasticBagSvg, 'item_plastic_bag');

  console.log('All 8 items successfully generated and synchronized!');
}

run().catch(console.error);

