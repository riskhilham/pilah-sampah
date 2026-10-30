import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

function renderSvgToPng(svgString, outputPath, width = 128, height = 128) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: width }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`Generated: ${outputPath} (${width}x${height})`);
}

const NEW_SPRITES = {
  // 1. Kulit Telur (Organik)
  'assets/items/item_egg_shell.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Broken bottom half eggshell -->
        <path d="M 28 66 L 38 52 L 48 64 L 62 48 L 74 62 L 86 50 L 98 66 C 104 90 92 110 64 110 C 36 110 22 90 28 66 Z" fill="#F5EEF8"/>
        <!-- Inner shadow membrane -->
        <path d="M 38 52 L 48 64 L 62 48 L 74 62 L 86 50 L 94 62 C 90 76 80 84 64 84 C 48 84 38 76 38 52 Z" fill="#E8DAEF"/>
        <!-- Broken top half eggshell piece nearby -->
        <path d="M 44 26 L 56 38 L 70 24 L 80 36 L 86 24 C 82 14 74 12 64 12 C 54 12 46 16 44 26 Z" fill="#F5EEF8"/>
      </g>
      <!-- Tiny brown specks for organic texture -->
      <circle cx="50" cy="85" r="2" fill="#D2B4DE"/>
      <circle cx="72" cy="92" r="2" fill="#D2B4DE"/>
      <circle cx="60" cy="98" r="1.5" fill="#D2B4DE"/>
      <!-- Specular Highlight -->
      <path d="M 36 78 Q 42 100 64 102" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.8"/>
    </svg>`,

  // 2. Botol Kaca Sirup / Saus (Anorganik Daur Ulang)
  'assets/items/item_glass_bottle.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#A2D9CE" stop-opacity="0.85"/>
          <stop offset="30%" stop-color="#E8F8F5" stop-opacity="0.95"/>
          <stop offset="70%" stop-color="#D1F2EB" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#73C6B6" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Gold Metal Crown Cap -->
        <rect x="54" y="14" width="20" height="10" rx="2" fill="#F39C12"/>
        <line x1="56" y1="24" x2="72" y2="24" stroke="#D68910" stroke-width="3"/>
        <!-- Bottle Neck & Shoulder -->
        <path d="M 58 24 L 58 38 Q 42 46 42 66 L 42 104 Q 42 114 64 114 Q 86 114 86 104 L 86 66 Q 86 46 70 38 L 70 24 Z" fill="url(#glassGrad)"/>
      </g>
      <!-- Recycle Glass Embossed Stamp -->
      <circle cx="64" cy="80" r="14" fill="none" stroke="#16A085" stroke-width="2.5" stroke-dasharray="4,3"/>
      <polygon points="64,72 70,82 58,82" fill="#16A085"/>
      <!-- Glass Specular Reflection Streak -->
      <line x1="48" y1="52" x2="48" y2="104" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
      <line x1="53" y1="56" x2="53" y2="92" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

  // 3. Obat Kadaluwarsa / Botol Sirup Kimia (B3 Hazard)
  'assets/items/item_expired_medicine.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <radialGradient id="medHazardGlow" cx="50%" cy="50%" r="50%">
          <stop offset="50%" stop-color="#E74C3C" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#E74C3C" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Hazard Aura Glow -->
      <circle cx="64" cy="64" r="54" fill="url(#medHazardGlow)"/>
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Childproof Cap -->
        <rect x="52" y="16" width="24" height="14" rx="3" fill="#C0392B"/>
        <line x1="56" y1="20" x2="56" y2="28" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="64" y1="20" x2="64" y2="28" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="72" y1="20" x2="72" y2="28" stroke="#FFFFFF" stroke-width="2"/>
        <!-- Medicine Amber Bottle -->
        <rect x="38" y="30" width="52" height="82" rx="10" fill="#D35400"/>
        <!-- White Prescription Label -->
        <rect x="38" y="52" width="52" height="42" fill="#FDFEFE"/>
        <!-- Red Cross with Warning Circle -->
        <circle cx="64" cy="72" r="14" fill="#E74C3C"/>
        <!-- Skull or Hazard Cross -->
        <rect x="61" y="64" width="6" height="16" fill="#FFFFFF"/>
        <rect x="56" y="69" width="16" height="6" fill="#FFFFFF"/>
        <!-- EXP Date Warning Bar -->
        <rect x="42" y="88" width="44" height="4" fill="#C0392B"/>
      </g>
      <!-- Specular Highlight -->
      <line x1="44" y1="36" x2="44" y2="106" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

  // 4. Styrofoam Makanan Berminyak (Residu)
  'assets/items/item_dirty_styrofoam.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Broken Clamshell Takeout Box -->
        <polygon points="26,38 98,28 106,78 22,86" fill="#EAEDED"/>
        <!-- Hinged Lid open -->
        <polygon points="26,38 98,28 88,14 20,22" fill="#D5D8DC"/>
        <!-- Base depth -->
        <polygon points="22,86 106,78 102,106 28,110" fill="#BDC3C7"/>
      </g>
      <!-- Nasty Yellow Grease & Gravy Stains (Making it unrecyclable) -->
      <path d="M 40 50 Q 56 62 76 54 Q 84 66 66 74 Q 48 76 38 62 Z" fill="#D4AC0D" opacity="0.85"/>
      <ellipse cx="78" cy="88" rx="8" ry="4" fill="#B7950B" opacity="0.75"/>
      <!-- Crushed fracture lines in foam -->
      <line x1="68" y1="42" x2="80" y2="58" stroke="#1A252F" stroke-width="2.5"/>
      <line x1="80" y1="58" x2="72" y2="76" stroke="#1A252F" stroke-width="2.5"/>
      <!-- Unrecyclable cross badge -->
      <circle cx="86" cy="38" r="8" fill="#E74C3C"/>
      <line x1="82" y1="34" x2="90" y2="42" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="90" y1="34" x2="82" y2="42" stroke="#FFFFFF" stroke-width="2"/>
    </svg>`
};

console.log('Rendering 4 new items to PNG...');

for (const [filePath, svg] of Object.entries(NEW_SPRITES)) {
  renderSvgToPng(svg.trim(), filePath, 128, 128);
  // Also copy to public/assets
  const publicDest = path.join('public', filePath);
  renderSvgToPng(svg.trim(), publicDest, 128, 128);
}

console.log('All 4 new sprites successfully created and synced!');

