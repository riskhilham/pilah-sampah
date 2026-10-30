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

// --- SPRITE DEFINITIONS (Style #2: Premium Cartoon 2D) ---
// Dark outline: #1A252F, bold 3.5px, 3-tone shading, vibrant cel shading

const SPRITES = {
  // 1. Fish Bone (Organic)
  'assets/items/item_fish_bone.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="2" flood-color="#0f171e" flood-opacity="0.3"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <!-- Main Spine -->
        <path d="M 24 64 Q 64 60 104 64" fill="none" stroke="#1A252F" stroke-width="6" stroke-linecap="round"/>
        <path d="M 24 64 Q 64 60 104 64" fill="none" stroke="#F4F6F7" stroke-width="3" stroke-linecap="round"/>
        <!-- Ribs -->
        <g stroke="#1A252F" stroke-width="5" stroke-linecap="round" fill="none">
          <line x1="42" y1="40" x2="48" y2="88"/>
          <line x1="60" y1="36" x2="66" y2="92"/>
          <line x1="78" y1="40" x2="84" y2="88"/>
          <line x1="94" y1="46" x2="98" y2="82"/>
        </g>
        <g stroke="#E0E6ED" stroke-width="2.5" stroke-linecap="round" fill="none">
          <line x1="42" y1="40" x2="48" y2="88"/>
          <line x1="60" y1="36" x2="66" y2="92"/>
          <line x1="78" y1="40" x2="84" y2="88"/>
          <line x1="94" y1="46" x2="98" y2="82"/>
        </g>
        <!-- Fish Head -->
        <path d="M 24 64 C 18 52 8 50 4 64 C 8 78 18 76 24 64 Z" fill="#E4E7EB" stroke="#1A252F" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="12" cy="61" r="3" fill="#1A252F"/>
        <!-- Fish Tail Fin -->
        <path d="M 104 64 L 122 46 C 118 58 118 70 122 82 Z" fill="#E4E7EB" stroke="#1A252F" stroke-width="4" stroke-linejoin="round"/>
        <!-- Inner Shading -->
        <path d="M 104 64 L 118 52 C 116 60 116 68 118 76 Z" fill="#CBD5E1"/>
      </g>
    </svg>`,

  // 2. Banana Peel (Organic)
  'assets/items/item_banana_peel.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Stem -->
        <path d="M 64 26 L 62 16 L 68 15 L 67 26 Z" fill="#6B5120"/>
        <!-- Back Peel -->
        <path d="M 64 26 Q 44 45 32 75 Q 38 88 56 68 Q 64 48 64 26 Z" fill="#D4AC0D"/>
        <!-- Left Peel (Open) -->
        <path d="M 64 26 Q 30 50 16 88 Q 32 94 48 80 Q 58 60 64 26 Z" fill="#F1C40F"/>
        <!-- Right Peel (Open) -->
        <path d="M 64 26 Q 98 50 112 88 Q 96 94 80 80 Q 70 60 64 26 Z" fill="#F1C40F"/>
        <!-- Center Peel -->
        <path d="M 64 26 Q 60 65 64 106 Q 74 104 76 90 Q 72 65 64 26 Z" fill="#F7DC6F"/>
      </g>
      <!-- Spots and highlights -->
      <ellipse cx="38" cy="74" rx="3" ry="5" fill="#7D6608"/>
      <ellipse cx="88" cy="72" rx="3" ry="6" fill="#7D6608"/>
      <ellipse cx="66" cy="85" rx="2" ry="4" fill="#7D6608"/>
      <!-- Inner core line -->
      <path d="M 64 28 Q 63 55 64 78" stroke="#D4AC0D" stroke-width="3" fill="none"/>
    </svg>`,

  // 3. Plastic Bottle PET (Recycle)
  'assets/items/item_plastic_bottle.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <linearGradient id="petGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#A9CCE3" stop-opacity="0.9"/>
          <stop offset="35%" stop-color="#EBF5FB" stop-opacity="0.95"/>
          <stop offset="70%" stop-color="#D4E6F1" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#7FB3D5" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <!-- Bottle Body -->
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Screw Cap -->
        <rect x="54" y="14" width="20" height="12" rx="3" fill="#2980B9"/>
        <rect x="52" y="24" width="24" height="4" rx="2" fill="#1B4F72"/>
        <!-- Neck & Bottle -->
        <path d="M 56 28 L 56 36 Q 40 44 40 60 L 40 102 Q 40 114 54 114 L 74 114 Q 88 114 88 102 L 88 60 Q 88 44 72 36 L 72 28 Z" fill="url(#petGrad)"/>
      </g>
      <!-- Recycle Label -->
      <rect x="40" y="66" width="48" height="24" fill="#3498DB" stroke="#1A252F" stroke-width="3"/>
      <!-- Recycle Symbol inside label -->
      <g fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 64 72 L 71 84 L 57 84 Z"/>
        <circle cx="64" cy="78" r="1.5" fill="#FFFFFF"/>
      </g>
      <!-- Specular Highlight Line -->
      <path d="M 46 54 L 46 104" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    </svg>`,

  // 4. Aluminum Can (Recycle)
  'assets/items/item_aluminum_can.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <linearGradient id="canMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#C0392B"/>
          <stop offset="35%" stop-color="#E74C3C"/>
          <stop offset="65%" stop-color="#F1948A"/>
          <stop offset="100%" stop-color="#922B21"/>
        </linearGradient>
      </defs>
      <!-- Main Cylinder -->
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Top Rim -->
        <ellipse cx="64" cy="24" rx="28" ry="10" fill="#BDC3C7"/>
        <ellipse cx="64" cy="23" rx="22" ry="7" fill="#7F8C8D"/>
        <!-- Pull Tab -->
        <ellipse cx="64" cy="22" rx="7" ry="4" fill="#ECF0F1"/>
        <!-- Can Body -->
        <path d="M 36 24 L 36 98 Q 36 112 64 112 Q 92 112 92 98 L 92 24 Z" fill="url(#canMetal)"/>
        <!-- Bottom Rim -->
        <ellipse cx="64" cy="98" rx="28" ry="8" fill="none" stroke="#1A252F" stroke-width="3"/>
      </g>
      <!-- Metallic Silver Wave Design -->
      <path d="M 36 50 Q 64 68 92 50 L 92 68 Q 64 86 36 68 Z" fill="#ECF0F1" stroke="#1A252F" stroke-width="3"/>
      <!-- Specular Sheen -->
      <line x1="72" y1="28" x2="72" y2="104" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

  // 5. Cardboard Box (Recycle)
  'assets/items/item_cardboard_box.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Top Left Flap -->
        <polygon points="64,20 20,42 64,56 108,42" fill="#D35400"/>
        <!-- Left Side -->
        <polygon points="20,42 64,56 64,106 20,90" fill="#B9770E"/>
        <!-- Right Side -->
        <polygon points="64,56 108,42 108,90 64,106" fill="#D68910"/>
      </g>
      <!-- Packing Tape on top -->
      <polygon points="64,20 64,56 60,55 60,21" fill="#F9E79F" stroke="#1A252F" stroke-width="2"/>
      <!-- Corrugated Arrow Logo -->
      <path d="M 40 76 L 46 68 L 52 76 Z" fill="#6E2C00"/>
      <rect x="44" y="76" width="4" height="6" fill="#6E2C00"/>
      <path d="M 80 66 Q 92 74 80 82" stroke="#6E2C00" stroke-width="3" fill="none"/>
    </svg>`,

  // 6. AA Battery (B3 Hazard)
  'assets/items/item_battery_aa.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <radialGradient id="hazardGlow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stop-color="#E74C3C" stop-opacity="0"/>
          <stop offset="100%" stop-color="#E74C3C" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <!-- Warning Aura Glow -->
      <circle cx="64" cy="64" r="54" fill="url(#hazardGlow)"/>
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Positive Terminal Nub -->
        <rect x="58" y="14" width="12" height="8" rx="2" fill="#F39C12"/>
        <!-- Battery Cylinder -->
        <rect x="42" y="22" width="44" height="90" rx="6" fill="#1C2833"/>
        <!-- Gold Top Section -->
        <rect x="42" y="22" width="44" height="30" rx="4" fill="#F1C40F"/>
        <!-- Hazard Warning Triangle Badge -->
        <polygon points="64,66 52,86 76,86" fill="#E74C3C" stroke="#1A252F" stroke-width="2.5"/>
        <text x="64" y="83" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF" text-anchor="middle">!</text>
      </g>
      <!-- Terminal markings -->
      <text x="64" y="42" font-family="Arial, sans-serif" font-weight="black" font-size="16" fill="#1A252F" text-anchor="middle">+</text>
      <!-- Specular Highlight -->
      <line x1="50" y1="28" x2="50" y2="104" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.4"/>
    </svg>`,

  // 7. Pesticide Aerosol Spray (B3 Hazard)
  'assets/items/item_spray_pesticide.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <!-- Glow -->
      <circle cx="64" cy="64" r="56" fill="#C0392B" opacity="0.2"/>
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Spray Nozzle Cap -->
        <rect x="56" y="12" width="16" height="12" rx="3" fill="#C0392B"/>
        <rect x="66" y="16" width="8" height="4" fill="#E74C3C"/>
        <!-- Can Body -->
        <rect x="40" y="24" width="48" height="90" rx="8" fill="#F1C40F"/>
        <!-- Caution Hazard Band -->
        <rect x="40" y="48" width="48" height="36" fill="#1A252F"/>
        <!-- Skull Poison Symbol inside band -->
        <circle cx="64" cy="62" r="7" fill="#E74C3C"/>
        <ellipse cx="64" cy="70" rx="5" ry="3" fill="#E74C3C"/>
        <circle cx="62" cy="61" r="1.5" fill="#FFFFFF"/>
        <circle cx="66" cy="61" r="1.5" fill="#FFFFFF"/>
      </g>
      <!-- Hazard stripes at bottom -->
      <g stroke="#C0392B" stroke-width="3">
        <line x1="44" y1="96" x2="52" y2="108"/>
        <line x1="56" y1="96" x2="64" y2="108"/>
        <line x1="68" y1="96" x2="76" y2="108"/>
        <line x1="80" y1="96" x2="84" y2="104"/>
      </g>
      <!-- Specular Line -->
      <line x1="46" y1="28" x2="46" y2="108" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

  // 8. CFL Fluorescent Lamp (B3 Hazard)
  'assets/items/item_fluorescent_lamp.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <defs>
        <radialGradient id="lampAura" cx="50%" cy="50%" r="50%">
          <stop offset="40%" stop-color="#5DADE2" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#5DADE2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="64" cy="50" r="48" fill="url(#lampAura)"/>
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Screw Base (Metal) -->
        <rect x="52" y="88" width="24" height="18" rx="2" fill="#BDC3C7"/>
        <path d="M 52 94 L 76 94 M 52 100 L 76 100" stroke="#7F8C8D" stroke-width="3"/>
        <ellipse cx="64" cy="108" rx="6" ry="3" fill="#1C2833"/>
        <!-- Plastic Ballast Housing -->
        <path d="M 46 76 L 82 76 L 76 88 L 52 88 Z" fill="#E5E8E8"/>
        <!-- Fluorescent Spiral Tubes -->
        <path d="M 50 76 Q 44 48 54 28 Q 64 16 74 28 Q 84 48 78 76" fill="#F8F9F9" stroke="#1A252F" stroke-width="4"/>
        <path d="M 56 76 Q 50 54 58 38 Q 64 30 70 38 Q 78 54 72 76" fill="#EBF5FB" stroke="#1A252F" stroke-width="3.5"/>
      </g>
      <!-- Mercury Warning Dot -->
      <circle cx="64" cy="82" r="3" fill="#E74C3C"/>
    </svg>`,

  // 9. Multilayer Coffee Sachet (Residual)
  'assets/items/item_coffee_sachet.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Crumpled Sachet Body -->
        <polygon points="34,26 86,18 96,104 28,98" fill="#78281F"/>
        <!-- Metallic Inner Foil exposed at torn corner -->
        <polygon points="34,26 50,23 38,44" fill="#D5D8DC"/>
        <!-- Crumple Folds -->
        <line x1="38" y1="44" x2="68" y2="58" stroke="#1A252F" stroke-width="3"/>
        <line x1="68" y1="58" x2="88" y2="50" stroke="#1A252F" stroke-width="3"/>
        <line x1="42" y1="76" x2="74" y2="84" stroke="#1A252F" stroke-width="3"/>
      </g>
      <!-- Coffee Bean Graphic on front -->
      <ellipse cx="64" cy="62" rx="12" ry="8" fill="#B03A2E" transform="rotate(-15 64 62)"/>
      <path d="M 56 64 Q 64 58 72 60" stroke="#F5B7B1" stroke-width="2" fill="none"/>
      <!-- Sealed Ribbed Edges -->
      <line x1="30" y1="94" x2="94" y2="100" stroke="#1A252F" stroke-width="4" stroke-dasharray="3,3"/>
    </svg>`,

  // 10. Dirty Crumpled Tissue (Residual)
  'assets/items/item_dirty_tissue.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Crumpled polygonal cluster -->
        <polygon points="42,34 66,24 88,38 98,64 82,96 52,102 30,82 24,54" fill="#EAEDED"/>
        <!-- Internal Creases & Shadow Facets -->
        <polygon points="42,34 66,24 64,56 46,62" fill="#D5D8DC"/>
        <polygon points="88,38 98,64 74,68 64,56" fill="#BDC3C7"/>
        <polygon points="82,96 52,102 60,78 74,68" fill="#A6ACAF"/>
        <polygon points="30,82 24,54 46,62 60,78" fill="#CCD1D1"/>
      </g>
      <!-- Yellow-brown Grease Stain -->
      <ellipse cx="64" cy="64" rx="10" ry="7" fill="#D4AC0D" opacity="0.6"/>
    </svg>`,

  // 11. Cigarette Butt (Residual)
  'assets/items/item_cigarette_butt.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <g stroke="#1A252F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
        <!-- Brown Filter Section -->
        <rect x="24" y="52" width="38" height="24" rx="3" fill="#D35400"/>
        <!-- White Paper Section -->
        <rect x="62" y="52" width="32" height="24" fill="#F2F4F4"/>
        <!-- Charred Ash Tip -->
        <polygon points="94,52 104,56 100,68 104,74 94,76" fill="#2C3E50"/>
      </g>
      <!-- Ash Specks -->
      <circle cx="98" cy="60" r="1.5" fill="#E74C3C"/>
      <circle cx="96" cy="66" r="1.5" fill="#E74C3C"/>
      <!-- Filter Texture Lines -->
      <line x1="36" y1="56" x2="36" y2="72" stroke="#BA4A00" stroke-width="2"/>
      <line x1="48" y1="56" x2="48" y2="72" stroke="#BA4A00" stroke-width="2"/>
    </svg>`,

  // 12. Chute: Organic (Green)
  'assets/environment/chute_organic.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="orgChute" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2ECC71"/>
          <stop offset="100%" stop-color="#1E8449"/>
        </linearGradient>
      </defs>
      <!-- Base Steel Housing -->
      <rect x="10" y="10" width="140" height="140" rx="16" fill="url(#orgChute)" stroke="#1A252F" stroke-width="5"/>
      <!-- Dark Funnel Mouth -->
      <ellipse cx="80" cy="80" rx="52" ry="34" fill="#145A32" stroke="#1A252F" stroke-width="4"/>
      <ellipse cx="80" cy="84" rx="42" ry="24" fill="#0E3A22"/>
      <!-- Organic Sprout Badge -->
      <circle cx="80" cy="30" r="14" fill="#FFFFFF" stroke="#1A252F" stroke-width="3"/>
      <path d="M 80 38 C 72 32 72 22 80 22 C 88 22 88 32 80 38 Z" fill="#27AE60"/>
      <!-- Hotkey Indicator -->
      <rect x="62" y="122" width="36" height="24" rx="4" fill="#1A252F"/>
      <text x="80" y="139" font-family="'Chakra Petch', sans-serif" font-weight="bold" font-size="16" fill="#2ECC71" text-anchor="middle">Q</text>
    </svg>`,

  // 13. Chute: Recycle (Yellow Amber)
  'assets/environment/chute_recycle.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="recChute" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F1C40F"/>
          <stop offset="100%" stop-color="#B7950B"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="140" height="140" rx="16" fill="url(#recChute)" stroke="#1A252F" stroke-width="5"/>
      <ellipse cx="80" cy="80" rx="52" ry="34" fill="#7D6608" stroke="#1A252F" stroke-width="4"/>
      <ellipse cx="80" cy="84" rx="42" ry="24" fill="#4D3F05"/>
      <!-- Recycle 3 Arrows Badge -->
      <circle cx="80" cy="30" r="14" fill="#FFFFFF" stroke="#1A252F" stroke-width="3"/>
      <g fill="none" stroke="#D68910" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 80 22 L 87 34 L 73 34 Z"/>
      </g>
      <rect x="62" y="122" width="36" height="24" rx="4" fill="#1A252F"/>
      <text x="80" y="139" font-family="'Chakra Petch', sans-serif" font-weight="bold" font-size="16" fill="#F1C40F" text-anchor="middle">W</text>
    </svg>`,

  // 14. Chute: Hazard (Crimson Red)
  'assets/environment/chute_hazard.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="hazChute" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E74C3C"/>
          <stop offset="100%" stop-color="#922B21"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="140" height="140" rx="16" fill="url(#hazChute)" stroke="#1A252F" stroke-width="5"/>
      <!-- Caution diagonal stripes on top and bottom border -->
      <g stroke="#F1C40F" stroke-width="6">
        <line x1="20" y1="12" x2="35" y2="24"/>
        <line x1="45" y1="12" x2="60" y2="24"/>
        <line x1="100" y1="12" x2="115" y2="24"/>
        <line x1="125" y1="12" x2="140" y2="24"/>
      </g>
      <ellipse cx="80" cy="80" rx="52" ry="34" fill="#641E16" stroke="#1A252F" stroke-width="4"/>
      <ellipse cx="80" cy="84" rx="42" ry="24" fill="#3E110D"/>
      <!-- Hazard Triangle Badge -->
      <polygon points="80,18 68,36 92,36" fill="#F1C40F" stroke="#1A252F" stroke-width="2.5"/>
      <text x="80" y="34" font-family="Arial, sans-serif" font-weight="black" font-size="12" fill="#1A252F" text-anchor="middle">!</text>
      <rect x="62" y="122" width="36" height="24" rx="4" fill="#1A252F"/>
      <text x="80" y="139" font-family="'Chakra Petch', sans-serif" font-weight="bold" font-size="16" fill="#E74C3C" text-anchor="middle">E</text>
    </svg>`,

  // 15. Chute: Residual (Slate Gray)
  'assets/environment/chute_residual.png': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="resChute" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#566573"/>
          <stop offset="100%" stop-color="#212F3D"/>
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="140" height="140" rx="16" fill="url(#resChute)" stroke="#1A252F" stroke-width="5"/>
      <ellipse cx="80" cy="80" rx="52" ry="34" fill="#17202A" stroke="#1A252F" stroke-width="4"/>
      <ellipse cx="80" cy="84" rx="42" ry="24" fill="#0B0F14"/>
      <!-- Residual Trash Bin Badge -->
      <circle cx="80" cy="30" r="14" fill="#FFFFFF" stroke="#1A252F" stroke-width="3"/>
      <rect x="74" y="24" width="12" height="12" rx="2" fill="#34495E"/>
      <line x1="72" y1="23" x2="88" y2="23" stroke="#34495E" stroke-width="2"/>
      <rect x="62" y="122" width="36" height="24" rx="4" fill="#1A252F"/>
      <text x="80" y="139" font-family="'Chakra Petch', sans-serif" font-weight="bold" font-size="16" fill="#BDC3C7" text-anchor="middle">R</text>
    </svg>`
};

console.log('Rendering all verified art assets to PNG...');

for (const [filePath, svg] of Object.entries(SPRITES)) {
  const isChute = filePath.includes('chute_');
  const size = isChute ? 160 : 128;
  renderSvgToPng(svg.trim(), filePath, size, size);
}

console.log('All 15 sprite assets successfully rendered to disk!');

