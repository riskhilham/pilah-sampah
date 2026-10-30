import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'c:/laragon/www/mpi/game2/assets/items';
const PUBLIC_DIR = 'c:/laragon/www/mpi/game2/public/assets/items';

function renderSvgToPng(svgString, filename) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: 128 }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const dest1 = path.join(ASSETS_DIR, filename);
  const dest2 = path.join(PUBLIC_DIR, filename);

  fs.writeFileSync(dest1, pngBuffer);
  fs.writeFileSync(dest2, pngBuffer);
  console.log(`Rendered: ${filename} (128x128)`);
}

// 8 School-Contextual Waste Items (Kurikulum Merdeka P5)
// Style: Premium 2D Cartoon, bold outline (#1A252F, stroke 3.5-4px), 3-tone cel shading, vibrant colors
const SPRITES = {
  // 1. Daun Kering Halaman Sekolah (Organik)
  'item_dry_leaves.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="dryLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#D97706"/>
          <stop offset="60%" stop-color="#B45309"/>
          <stop offset="100%" stop-color="#92400E"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back crinkled small leaf -->
        <path d="M 60 70 C 40 40 60 20 85 24 C 95 45 85 75 60 70 Z" 
              fill="#92400E" stroke-width="3.5"/>
        <!-- Main dry autumn/yard leaf -->
        <path d="M 32 94 C 22 60 48 30 96 32 C 98 75 70 102 32 94 Z" 
              fill="url(#dryLeaf)" stroke-width="4"/>
        <!-- Stem -->
        <path d="M 32 94 Q 22 106 14 112" fill="none" stroke="#78350F" stroke-width="4.5"/>
        <!-- Leaf Veins -->
        <path d="M 32 94 Q 60 66 94 34" fill="none" stroke="#78350F" stroke-width="3"/>
        <path d="M 46 80 Q 56 74 62 78" fill="none" stroke="#78350F" stroke-width="2.5"/>
        <path d="M 58 68 Q 70 60 78 66" fill="none" stroke="#78350F" stroke-width="2.5"/>
        <path d="M 72 54 Q 84 46 90 52" fill="none" stroke="#78350F" stroke-width="2.5"/>
        <!-- Dried curled tip highlight -->
        <path d="M 40 50 Q 64 36 86 36" fill="none" stroke="#FDE68A" stroke-width="2.5" opacity="0.8"/>
      </g>
    </svg>
  `,

  // 2. Sisa Semangka Kantin (Organik)
  'item_snack_fruit.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="watermelonRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="80%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#FCA5A5"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Green Rind Arc (Outer) -->
        <path d="M 18 84 C 36 112 92 112 110 84 L 102 76 C 88 100 40 100 26 76 Z" 
              fill="#16A34A" stroke-width="4"/>
        <!-- White Inner Rind -->
        <path d="M 26 76 C 40 100 88 100 102 76 L 98 70 C 84 92 44 92 30 70 Z" 
              fill="#DCFCE7" stroke-width="3"/>
        <!-- Red Eaten Flesh with Bite marks -->
        <path d="M 30 70 C 44 92 84 92 98 70 L 64 24 Z" 
              fill="url(#watermelonRed)" stroke-width="4"/>
        <!-- Bite mark indents at top -->
        <path d="M 64 24 Q 56 36 64 48 Q 72 36 64 24 Z" fill="#DC2626" opacity="0.3"/>
        <!-- Black Watermelon Seeds -->
        <ellipse cx="50" cy="62" rx="2.5" ry="4" transform="rotate(-15 50 62)" fill="#1E293B"/>
        <ellipse cx="78" cy="62" rx="2.5" ry="4" transform="rotate(15 78 62)" fill="#1E293B"/>
        <ellipse cx="64" cy="50" rx="2.5" ry="4" fill="#1E293B"/>
        <ellipse cx="64" cy="74" rx="2.5" ry="4" fill="#1E293B"/>
        <!-- Highlight -->
        <path d="M 38 66 L 56 38" fill="none" stroke="#FEE2E2" stroke-width="2.5" opacity="0.8"/>
      </g>
    </svg>
  `,

  // 3. Kertas Buku Tulis Bekas (Daur Ulang)
  'item_school_paper.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back Crumpled Page -->
        <path d="M 28 32 L 86 24 L 102 96 L 42 106 Z" 
              fill="#E2E8F0" stroke-width="3.5"/>
        <!-- Front Lined Paper Sheet with folded corner -->
        <path d="M 34 26 L 82 26 L 96 40 L 96 104 L 34 104 Z" 
              fill="#FFFFFF" stroke-width="4"/>
        <!-- Folded Dog-ear Corner -->
        <path d="M 82 26 L 82 40 L 96 40 Z" fill="#CBD5E1" stroke-width="3"/>
        <!-- Blue Notebook Lines -->
        <g stroke="#93C5FD" stroke-width="2" fill="none">
          <line x1="42" y1="48" x2="88" y2="48"/>
          <line x1="42" y1="60" x2="88" y2="60"/>
          <line x1="42" y1="72" x2="88" y2="72"/>
          <line x1="42" y1="84" x2="88" y2="84"/>
          <line x1="42" y1="96" x2="74" y2="96"/>
        </g>
        <!-- Red Margin Line -->
        <line x1="48" y1="28" x2="48" y2="102" stroke="#F87171" stroke-width="1.8"/>
        <!-- Hand-drawn scribbles / math doodle -->
        <path d="M 54 58 Q 62 56 68 62" fill="none" stroke="#475569" stroke-width="2"/>
        <path d="M 54 70 L 60 74 L 68 68" fill="none" stroke="#475569" stroke-width="2"/>
      </g>
    </svg>
  `,

  // 4. Kotak Susu UHT Kantin (Daur Ulang)
  'item_milk_carton.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="cartonBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Main Carton Body -->
        <rect x="42" y="44" width="44" height="66" rx="4" fill="#FFFFFF" stroke-width="4"/>
        <!-- Bottom Colored Print Band -->
        <path d="M 42 74 L 86 74 L 86 106 C 86 108 84 110 82 110 L 46 110 C 44 110 42 108 42 106 Z" 
              fill="url(#cartonBlue)" stroke-width="4"/>
        <!-- Gabled Carton Top -->
        <path d="M 42 44 L 54 26 L 74 26 L 86 44 Z" fill="#F1F5F9" stroke-width="4"/>
        <line x1="64" y1="26" x2="64" y2="44" stroke="#CBD5E1" stroke-width="2.5"/>
        <!-- Straw Hole (Foil seal) -->
        <circle cx="56" cy="36" r="4.5" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>
        <circle cx="56" cy="36" r="2.5" fill="#94A3B8"/>
        <!-- Cow / Milk Splash Graphic on carton -->
        <path d="M 52 86 Q 64 78 76 86 Q 64 94 52 86 Z" fill="#FFFFFF" stroke-width="2"/>
        <text x="64" y="102" font-family="'Fredoka', sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle" stroke="none">SUSU UHT</text>
        <!-- Highlight Strip -->
        <line x1="46" y1="48" x2="46" y2="102" stroke="#FFFFFF" stroke-width="3" opacity="0.8"/>
      </g>
    </svg>
  `,

  // 5. Spidol Whiteboard Habis (B3 - Bahaya)
  'item_whiteboard_marker.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="markerBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#E2E8F0"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cylindrical Barrel (Diagonal 45 deg) -->
        <g transform="rotate(-40 64 64)">
          <!-- Marker Barrel -->
          <rect x="36" y="52" width="60" height="24" rx="4" fill="url(#markerBody)" stroke-width="4"/>
          <!-- Red/Hazard Collar Band -->
          <rect x="88" y="52" width="8" height="24" fill="#DC2626" stroke-width="3"/>
          <!-- Nib Tip -->
          <path d="M 96 56 L 110 64 L 96 72 Z" fill="#1E293B" stroke-width="3"/>
          <!-- Back Plug -->
          <path d="M 36 54 L 30 57 L 30 71 L 36 74 Z" fill="#DC2626" stroke-width="3"/>
          <!-- Label with Hazard Triangle -->
          <rect x="46" y="58" width="36" height="12" rx="2" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5"/>
          <text x="64" y="67" font-family="'Chakra Petch', sans-serif" font-size="7" font-weight="bold" fill="#DC2626" text-anchor="middle" stroke="none">B3 TOXIC</text>
        </g>
        <!-- Dry vapor fumes indicator -->
        <path d="M 84 28 Q 92 20 88 14" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 3"/>
        <path d="M 94 36 Q 102 28 98 22" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="3 3"/>
      </g>
    </svg>
  `,

  // 6. Botol Antiseptik UKS (B3 - Bahaya)
  'item_antiseptic_bottle.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="amberBottle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#B45309"/>
          <stop offset="70%" stop-color="#78350F"/>
          <stop offset="100%" stop-color="#451A03"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Amber Glass Bottle Body -->
        <rect x="42" y="48" width="44" height="62" rx="8" fill="url(#amberBottle)" stroke-width="4"/>
        <!-- Bottle Neck -->
        <rect x="52" y="32" width="24" height="16" fill="#78350F" stroke-width="3.5"/>
        <!-- Screw Cap (White/Ribbed) -->
        <rect x="50" y="22" width="28" height="12" rx="3" fill="#F8FAFC" stroke-width="3.5"/>
        <line x1="56" y1="24" x2="56" y2="32" stroke="#94A3B8" stroke-width="2"/>
        <line x1="64" y1="24" x2="64" y2="32" stroke="#94A3B8" stroke-width="2"/>
        <line x1="72" y1="24" x2="72" y2="32" stroke="#94A3B8" stroke-width="2"/>
        <!-- Red Cross UKS / Medical Label -->
        <rect x="46" y="58" width="36" height="38" rx="4" fill="#FFFFFF" stroke-width="2.5"/>
        <!-- Red Medical Cross -->
        <rect x="60" y="66" width="8" height="22" fill="#DC2626" stroke="none"/>
        <rect x="53" y="73" width="22" height="8" fill="#DC2626" stroke="none"/>
        <text x="64" y="93" font-family="'Chakra Petch', sans-serif" font-size="6" font-weight="bold" fill="#78350F" text-anchor="middle" stroke="none">ALKOHOL 70%</text>
        <!-- Highlight -->
        <line x1="46" y1="52" x2="46" y2="104" stroke="#FDE68A" stroke-width="2.5" opacity="0.7"/>
      </g>
    </svg>
  `,

  // 7. Bungkus Snack / Ciki Kantin (Residu)
  'item_snack_wrapper.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="snackPouch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="50%" stop-color="#EA580C"/>
          <stop offset="100%" stop-color="#C2410C"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Pillow Pouch Body (Slightly crumpled) -->
        <path d="M 38 34 Q 30 64 36 94 Q 64 98 92 94 Q 98 64 90 34 Q 64 30 38 34 Z" 
              fill="url(#snackPouch)" stroke-width="4"/>
        <!-- Top Zigzag Seal -->
        <path d="M 38 34 L 44 26 L 50 34 L 56 26 L 62 34 L 68 26 L 74 34 L 80 26 L 86 34 L 90 34" 
              fill="#D97706" stroke-width="2.5"/>
        <!-- Bottom Zigzag Seal -->
        <path d="M 36 94 L 42 102 L 48 94 L 54 102 L 60 94 L 66 102 L 72 94 L 78 102 L 84 94 L 92 94" 
              fill="#D97706" stroke-width="2.5"/>
        <!-- Metallic Foil Crinkle Lines -->
        <path d="M 44 48 Q 62 60 48 80" fill="none" stroke="#9A3412" stroke-width="2.5"/>
        <path d="M 82 46 Q 66 64 80 82" fill="none" stroke="#9A3412" stroke-width="2.5"/>
        <!-- Starburst / Snack Graphic -->
        <circle cx="64" cy="62" r="14" fill="#FEF08A" stroke="#1A252F" stroke-width="2"/>
        <text x="64" y="66" font-family="'Fredoka', sans-serif" font-size="9" font-weight="bold" fill="#EA580C" text-anchor="middle" stroke="none">CIKI!</text>
        <!-- Specular Highlight -->
        <path d="M 44 42 Q 64 38 84 42" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.8"/>
      </g>
    </svg>
  `,

  // 8. Sedotan Plastik Kantin (Residu)
  'item_plastic_straw.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="strawRed" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F87171"/>
          <stop offset="100%" stop-color="#EF4444"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" stroke="#1A252F" stroke-linecap="round" stroke-linejoin="round">
        <!-- Long Straight Shaft -->
        <path d="M 28 104 L 72 44" fill="none" stroke-width="12"/>
        <path d="M 28 104 L 72 44" fill="none" stroke="#FFFFFF" stroke-width="8"/>
        <!-- Flexible Accordion Bending Joint -->
        <path d="M 72 44 L 78 36 L 86 36 L 90 28" fill="none" stroke-width="12"/>
        <path d="M 72 44 L 78 36 L 86 36 L 90 28" fill="none" stroke="#F87171" stroke-width="8"/>
        <!-- Bent Top Shaft -->
        <path d="M 90 28 L 106 32" fill="none" stroke-width="12"/>
        <path d="M 90 28 L 106 32" fill="none" stroke="#FFFFFF" stroke-width="8"/>
        <!-- Spiral Red Stripes on straw -->
        <g stroke="#EF4444" stroke-width="3" fill="none">
          <line x1="32" y1="102" x2="38" y2="92"/>
          <line x1="44" y1="86" x2="50" y2="76"/>
          <line x1="56" y1="70" x2="62" y2="60"/>
          <line x1="68" y1="54" x2="74" y2="44"/>
        </g>
        <!-- Beveled Opening Cut -->
        <ellipse cx="26" cy="106" rx="4" ry="3" fill="#1A252F"/>
      </g>
    </svg>
  `
};

for (const [filename, svg] of Object.entries(SPRITES)) {
  renderSvgToPng(svg, filename);
}
console.log('All 8 school items generated successfully!');

