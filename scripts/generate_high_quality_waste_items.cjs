const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const PUBLIC_ITEMS_DIR = path.resolve(__dirname, '../public/assets/items');
const ASSETS_ITEMS_DIR = path.resolve(__dirname, '../assets/items');

if (!fs.existsSync(PUBLIC_ITEMS_DIR)) fs.mkdirSync(PUBLIC_ITEMS_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_ITEMS_DIR)) fs.mkdirSync(ASSETS_ITEMS_DIR, { recursive: true });

function saveItemPng(key, svgString) {
  try {
    const resvg = new Resvg(svgString, {
      fitTo: { mode: 'width', value: 128 }
    });
    const pngData = resvg.render().asPng();

    const p1 = path.join(PUBLIC_ITEMS_DIR, `${key}.png`);
    const p2 = path.join(ASSETS_ITEMS_DIR, `${key}.png`);

    fs.writeFileSync(p1, pngData);
    if (fs.existsSync(path.dirname(p2))) {
      fs.writeFileSync(p2, pngData);
    }
    console.log(`✓ Rendered: ${key}.png`);
  } catch (err) {
    console.error(`✗ Error rendering ${key}:`, err);
  }
}

// =========================================================================
// 48 HIGH-DEFINITION REALISTIC CEL-SHADED WASTE ITEMS (128x128)
// Real-world iconic silhouettes, unmistakable features, rich 3-tone shading,
// bold 3.5px-4.5px outline, pure transparent background
// =========================================================================

const ITEMS = {
  // -----------------------------------------------------------------------
  // KATEGORI 1: ORGANIK (12 ITEMS)
  // -----------------------------------------------------------------------
  
  // 1. Sisa Apel (Apple Core)
  item_apple_core: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Stem & Fresh Green Leaf -->
    <path d="M64 24 C64 12 70 8 72 6" stroke="#451a03" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M68 14 C78 10 90 12 92 18 C92 24 82 24 70 20 Z" fill="#22c55e" stroke="#0f172a" stroke-width="3"/>
    <path d="M72 16 L84 18" stroke="#86efac" stroke-width="2"/>
    <!-- Top Red Apple Cap with Calyx Dip -->
    <path d="M34 38 C38 22 88 22 92 38 C84 46 44 46 34 38 Z" fill="#ef4444" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M44 30 C54 26 74 26 84 30" stroke="#fca5a5" stroke-width="3" stroke-linecap="round" fill="none"/>
    <!-- Bottom Red Apple Base -->
    <path d="M40 92 C46 108 82 108 88 92 C80 82 48 82 40 92 Z" fill="#dc2626" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Pale Fibrous Core with Bite Curves -->
    <path d="M40 40 C58 54 58 76 44 90 C56 94 72 94 84 90 C70 76 70 54 88 40 C76 42 52 42 40 40 Z" 
          fill="#fef08a" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Fibrous Grain Shading -->
    <path d="M52 46 C60 58 60 72 52 84" stroke="#fde047" stroke-width="3" fill="none"/>
    <!-- Apple Seeds inside core -->
    <ellipse cx="64" cy="56" rx="4.5" ry="7.5" fill="#451a03" stroke="#0f172a" stroke-width="2.5"/>
    <ellipse cx="64" cy="74" rx="4.5" ry="7.5" fill="#451a03" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="62" cy="54" r="1.5" fill="#ffffff" opacity="0.8"/>
  </svg>`,

  // 2. Daun Kering Halaman (Dry Leaves)
  item_dry_leaves: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Back Russet Leaf -->
    <g transform="rotate(-28 54 66)">
      <path d="M54 18 C78 34 88 66 54 96 C22 66 32 34 54 18 Z" fill="#b45309" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
      <path d="M54 22 L54 96" stroke="#78350f" stroke-width="3"/>
    </g>
    <!-- Front Golden Oak / Maple Leaf -->
    <g transform="rotate(16 66 64)">
      <path d="M64 14 C84 26 100 48 94 74 C90 94 74 106 64 114 C54 106 38 94 34 74 C28 48 44 26 64 14 Z" 
            fill="#d97706" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M64 20 L64 112" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Detailed Leaf Veins -->
      <path d="M64 42 L82 32 M64 58 L86 50 M64 76 L82 70 M64 92 L76 88" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 42 L46 32 M64 58 L42 50 M64 76 L46 70 M64 92 L52 88" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      <path d="M68 28 C78 45 78 72 70 98" stroke="#fcd34d" stroke-width="3" fill="none" opacity="0.6"/>
    </g>
  </svg>`,

  // 3. Sisa Semangka Kantin (Watermelon Slice)
  item_snack_fruit: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Green Striped Rind Base -->
    <path d="M14 44 C38 106 90 106 114 44 C76 56 52 56 14 44 Z" fill="#15803d" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M22 48 C44 96 84 96 106 48" stroke="#86efac" stroke-width="4" fill="none"/>
    <!-- Deep Red Juicy Pulp -->
    <path d="M24 46 C44 90 84 90 104 46 C72 36 56 36 24 46 Z" fill="#ef4444" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Shadow & High-contrast Seeds -->
    <path d="M30 48 C50 80 78 80 98 48" stroke="#b91c1c" stroke-width="3" fill="none"/>
    <g fill="#0f172a">
      <ellipse cx="44" cy="54" rx="4" ry="6" transform="rotate(-15 44 54)"/>
      <ellipse cx="64" cy="62" rx="4" ry="6"/>
      <ellipse cx="84" cy="54" rx="4" ry="6" transform="rotate(15 84 54)"/>
      <ellipse cx="54" cy="72" rx="3.5" ry="5.5" transform="rotate(-10 54 72)"/>
      <ellipse cx="74" cy="72" rx="3.5" ry="5.5" transform="rotate(10 74 72)"/>
    </g>
    <!-- Seed Highlights -->
    <circle cx="43" cy="52" r="1.2" fill="#ffffff"/>
    <circle cx="63" cy="60" r="1.2" fill="#ffffff"/>
    <circle cx="83" cy="52" r="1.2" fill="#ffffff"/>
  </svg>`,

  // 4. Kulit Jeruk (Orange Peel)
  item_orange_peel: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Coiled Spiral Ribbon of Orange Peel -->
    <path d="M22 68 C16 40 42 18 68 18 C94 18 110 40 108 68 C106 96 82 108 56 108 C34 108 26 92 34 78 C40 66 56 62 68 68 C78 72 80 84 72 88 C62 92 56 86 58 78" 
          stroke="#0f172a" stroke-width="15" stroke-linecap="round" fill="none"/>
    <path d="M22 68 C16 40 42 18 68 18 C94 18 110 40 108 68 C106 96 82 108 56 108 C34 108 26 92 34 78 C40 66 56 62 68 68 C78 72 80 84 72 88 C62 92 56 86 58 78" 
          stroke="#ea580c" stroke-width="10" stroke-linecap="round" fill="none"/>
    <!-- Inner White Spongy Pith Rim -->
    <path d="M24 68 C18 42 44 22 68 22 C90 22 104 42 102 68 C100 92 78 102 56 102" 
          stroke="#ffedd5" stroke-width="3" stroke-linecap="round" fill="none"/>
    <!-- Natural Citrus Pores -->
    <circle cx="68" cy="28" r="1.8" fill="#9a3412"/>
    <circle cx="88" cy="42" r="1.8" fill="#9a3412"/>
    <circle cx="98" cy="65" r="1.8" fill="#9a3412"/>
    <circle cx="84" cy="88" r="1.8" fill="#9a3412"/>
    <circle cx="48" cy="98" r="1.8" fill="#9a3412"/>
  </svg>`,

  // 5. Tulang Ikan (Fish Bone Skeleton)
  item_fish_bone: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Spine Line -->
    <line x1="22" y1="64" x2="106" y2="64" stroke="#0f172a" stroke-width="6.5" stroke-linecap="round"/>
    <line x1="22" y1="64" x2="106" y2="64" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Curved Rib Bones -->
    <g stroke="#0f172a" stroke-width="5" stroke-linecap="round" fill="none">
      <path d="M42 38 L48 88"/>
      <path d="M60 34 L66 92"/>
      <path d="M78 38 L84 88"/>
      <path d="M94 44 L98 84"/>
    </g>
    <g stroke="#f1f5f9" stroke-width="2.5" stroke-linecap="round" fill="none">
      <path d="M42 38 L48 88"/>
      <path d="M60 34 L66 92"/>
      <path d="M78 38 L84 88"/>
      <path d="M94 44 L98 84"/>
    </g>
    <!-- Fish Skull Head with Hollow Eye -->
    <path d="M26 64 C20 46 8 44 4 64 C8 84 20 82 26 64 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <circle cx="12" cy="60" r="4" fill="#0f172a"/>
    <!-- Two-lobed Tail Fin -->
    <path d="M106 64 L126 42 C120 54 120 74 126 86 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
  </svg>`,

  // 6. Tulang Ayam (Chicken Drumstick Bone)
  item_chicken_bone: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- White Knobby Bone with Dual Joint Condyles -->
    <path d="M28 38 C20 34 14 44 20 52 C14 60 24 70 32 64 L88 88 C84 96 94 106 102 100 C110 106 118 96 112 88 C118 80 108 70 100 76 L44 52 C48 44 38 34 28 38 Z" 
          fill="#f8fafc" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Cooked Crispy Meat Remnants in Middle -->
    <path d="M48 54 C54 44 76 52 82 66 C86 76 74 84 64 80 C52 76 44 64 48 54 Z" 
          fill="#b45309" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M52 56 C58 50 68 56 74 64" stroke="#d97706" stroke-width="3" fill="none"/>
    <!-- Bone Shading & Highlight -->
    <path d="M26 48 C32 52 34 60 28 64" stroke="#cbd5e1" stroke-width="3" fill="none"/>
    <path d="M106 88 C102 92 100 98 104 102" stroke="#cbd5e1" stroke-width="3" fill="none"/>
  </svg>`,

  // 7. Kulit Pisang (Banana Peel)
  item_banana_peel: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Brown Stem -->
    <path d="M64 26 L60 12 L68 12 L66 26 Z" fill="#78350f" stroke="#0f172a" stroke-width="3.5"/>
    <!-- 3 Splayed Banana Peel Petals -->
    <g stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
      <!-- Back Peel -->
      <path d="M64 26 Q44 45 34 78 Q42 90 56 70 Q64 48 64 26 Z" fill="#ca8a04"/>
      <!-- Left Peel (Drooping Out) -->
      <path d="M64 26 Q30 50 14 90 Q32 96 50 82 Q60 58 64 26 Z" fill="#eab308"/>
      <!-- Right Peel (Drooping Out) -->
      <path d="M64 26 Q98 50 114 90 Q96 96 78 82 Q68 58 64 26 Z" fill="#eab308"/>
      <!-- Center Main Peel -->
      <path d="M64 26 Q58 66 64 110 Q74 106 78 92 Q72 65 64 26 Z" fill="#facc15"/>
    </g>
    <!-- Bruised Dark Tip & Sugar Spots -->
    <path d="M61 102 L64 110 L67 102 Z" fill="#78350f"/>
    <ellipse cx="38" cy="74" rx="3" ry="5" fill="#78350f"/>
    <ellipse cx="90" cy="74" rx="3" ry="5" fill="#78350f"/>
    <ellipse cx="66" cy="85" rx="2.5" ry="4" fill="#78350f"/>
    <!-- Shiny Longitudinal Ridge Highlight -->
    <path d="M64 30 Q62 55 64 80" stroke="#fef08a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  </svg>`,

  // 8. Kulit Telur (Egg Shell)
  item_egg_shell: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Bottom Jagged Cracked Eggshell -->
    <path d="M26 66 L38 58 L50 68 L64 56 L78 70 L90 58 L102 68 C106 96 88 112 64 112 C40 112 22 96 26 66 Z" 
          fill="#fef3c7" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Top Jagged Eggshell Cap (Tilted) -->
    <path d="M42 50 L52 42 L64 48 L76 36 L88 48 L96 38 C100 20 80 12 62 12 C44 12 36 24 42 50 Z" 
          fill="#fef3c7" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Golden Egg Yolk Droplet inside -->
    <ellipse cx="64" cy="82" rx="18" ry="14" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
    <ellipse cx="60" cy="78" rx="6" ry="3.5" fill="#fef08a"/>
    <!-- Fracture Crack Lines -->
    <path d="M64 56 L64 70" stroke="#0f172a" stroke-width="3"/>
    <path d="M78 70 L80 84" stroke="#0f172a" stroke-width="3"/>
    <path d="M34 86 C46 102 78 102 94 86" stroke="#fde68a" stroke-width="3.5" fill="none"/>
  </svg>`,

  // 9. Roti Berjamur Kantin (Moldy Bread Crust)
  item_bread_crust: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Thick Baked Bread Crust (Square Slice with Mounded Top) -->
    <path d="M28 42 C28 24 50 18 64 20 C78 18 100 24 100 42 C104 60 102 96 96 106 C88 110 40 110 32 106 C26 96 24 60 28 42 Z" 
          fill="#92400e" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Soft Porous Bread Crumb Interior -->
    <path d="M34 44 C34 30 50 26 64 27 C78 26 94 30 94 44 C98 60 96 94 90 100 C82 104 46 104 38 100 C32 94 30 60 34 44 Z" 
          fill="#fef3c7" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Bread Pores -->
    <ellipse cx="46" cy="50" rx="3.5" ry="2.5" fill="#fde68a"/>
    <ellipse cx="78" cy="46" rx="4.5" ry="3" fill="#fde68a"/>
    <ellipse cx="64" cy="68" rx="4" ry="3" fill="#fde68a"/>
    <!-- Unmistakable Fuzzy Green Mold Colonies -->
    <path d="M40 66 C48 64 54 70 50 78 C44 84 36 82 38 72 Z" fill="#15803d" stroke="#0f172a" stroke-width="3"/>
    <circle cx="48" cy="72" r="3.5" fill="#86efac"/>
    <path d="M76 80 C84 76 90 82 88 90 C84 96 76 94 76 84 Z" fill="#15803d" stroke="#0f172a" stroke-width="3"/>
    <circle cx="82" cy="85" r="3" fill="#86efac"/>
    <!-- Mold Spore Dots -->
    <circle cx="56" cy="86" r="2" fill="#16a34a"/>
    <circle cx="70" cy="78" r="2.5" fill="#16a34a"/>
  </svg>`,

  // 10. Tongkol Jagung Rebus (Corn on the Cob - Real Natural Shape)
  item_corn_cob: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Green Peeling Husk Leaves at Base -->
    <path d="M64 96 C36 104 22 86 18 70 C30 82 48 90 64 94 Z" fill="#16a34a" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M64 96 C92 104 106 86 110 70 C98 82 80 90 64 94 Z" fill="#15803d" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Tapered Ear of Sweet Corn -->
    <path d="M46 36 C46 16 82 16 82 36 L84 94 C84 102 44 102 44 94 Z" fill="#facc15" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Chewed Middle Section (Inner Pale White Cob Core) -->
    <path d="M48 52 C58 56 70 56 80 52 L78 74 C68 78 58 78 50 74 Z" fill="#fef08a" stroke="#0f172a" stroke-width="3.5"/>
    <path d="M52 58 C60 62 68 62 76 58 L74 68 C66 72 60 72 54 68 Z" fill="#e2e8f0"/>
    <!-- Distinct Rounded Yellow Kernel Rows -->
    <g fill="#f59e0b" stroke="#0f172a" stroke-width="2">
      <!-- Top Rows -->
      <rect x="50" y="24" width="8" height="8" rx="3"/>
      <rect x="60" y="22" width="8" height="8" rx="3"/>
      <rect x="70" y="24" width="8" height="8" rx="3"/>
      <rect x="48" y="34" width="9" height="8" rx="3"/>
      <rect x="59" y="33" width="10" height="9" rx="3"/>
      <rect x="71" y="34" width="9" height="8" rx="3"/>
      <rect x="48" y="44" width="9" height="8" rx="3"/>
      <rect x="59" y="44" width="10" height="8" rx="3"/>
      <rect x="71" y="44" width="9" height="8" rx="3"/>
      <!-- Bottom Rows -->
      <rect x="48" y="78" width="9" height="8" rx="3"/>
      <rect x="59" y="78" width="10" height="8" rx="3"/>
      <rect x="71" y="78" width="9" height="8" rx="3"/>
      <rect x="50" y="88" width="9" height="8" rx="3"/>
      <rect x="61" y="88" width="9" height="8" rx="3"/>
      <rect x="71" y="88" width="8" height="8" rx="3"/>
    </g>
  </svg>`,

  // 11. Kantong Teh Ampas Daun (Tea Bag - Instantly Recognizable with String & "TEA" Tag)
  item_tea_bag: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Hanging String -->
    <path d="M64 42 C64 22 86 16 94 30 C98 38 96 52 96 60" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M64 42 C64 22 86 16 94 30 C98 38 96 52 96 60" stroke="#f8fafc" stroke-width="1.8" fill="none"/>
    <!-- Branded "TEA" Tag Hanging at Right -->
    <g transform="rotate(14 96 68)">
      <rect x="84" y="58" width="24" height="28" rx="3" fill="#ef4444" stroke="#0f172a" stroke-width="3"/>
      <rect x="88" y="64" width="16" height="8" fill="#facc15"/>
      <text x="96" y="71" font-family="'Chakra Petch', sans-serif" font-size="6.5" font-weight="bold" fill="#0f172a" text-anchor="middle">TEA</text>
      <circle cx="96" cy="80" r="2.5" fill="#ffffff"/>
    </g>
    <!-- Paper Tea Bag Pouch (Tapered Gable Top) -->
    <path d="M36 50 L50 36 L78 36 L92 50 L88 106 C88 110 84 112 80 112 L48 112 C44 112 40 110 40 106 Z" 
          fill="#f8fafc" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Folded Top with Silver Staple -->
    <path d="M50 36 L64 44 L78 36 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/>
    <rect x="60" y="42" width="8" height="3.5" rx="1" fill="#64748b"/>
    <!-- Steeped Dark Tea Leaves (Wet Dark Brown Interior) -->
    <path d="M44 60 C52 58 76 58 84 60 L82 104 C82 108 78 109 76 109 L52 109 C50 109 46 108 46 104 Z" 
          fill="#78350f" stroke="#0f172a" stroke-width="3.5" opacity="0.9"/>
    <!-- Tea Flecks & Wet Stain Gradient -->
    <circle cx="54" cy="74" r="2.5" fill="#451a03"/>
    <circle cx="66" cy="70" r="3" fill="#451a03"/>
    <circle cx="74" cy="84" r="2.5" fill="#451a03"/>
    <circle cx="58" cy="94" r="3" fill="#451a03"/>
    <circle cx="70" cy="98" r="2.5" fill="#451a03"/>
  </svg>`,

  // 12. Ampas Kopi Hitam (Coffee Grounds - Real Mug + Dark Granular Grounds + Coffee Beans)
  item_coffee_grounds: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- White Coffee Mug Body -->
    <rect x="30" y="44" width="60" height="60" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Mug Side Handle -->
    <path d="M90 54 C104 54 104 84 90 84" stroke="#0f172a" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M90 54 C104 54 104 84 90 84" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round"/>
    <!-- Oval Rim of Mug -->
    <ellipse cx="60" cy="44" rx="30" ry="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Rich Dark Roasted Coffee Grounds Mound Piled in Mug -->
    <ellipse cx="60" cy="44" rx="26" ry="9" fill="#271106" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M38 44 C44 32 76 32 82 44 Z" fill="#451a03"/>
    <!-- Granular Texture Specks -->
    <circle cx="48" cy="42" r="2" fill="#78350f"/>
    <circle cx="60" cy="38" r="2.5" fill="#78350f"/>
    <circle cx="72" cy="42" r="2" fill="#78350f"/>
    <circle cx="56" cy="46" r="2" fill="#78350f"/>
    <circle cx="66" cy="46" r="2" fill="#78350f"/>
    <!-- 2 Roasted Coffee Beans in Foreground for 100% Instant Recognition -->
    <g transform="translate(18, 90) rotate(-20)">
      <ellipse cx="10" cy="10" rx="9" ry="13" fill="#451a03" stroke="#0f172a" stroke-width="3"/>
      <path d="M10 2 C7 7 13 13 10 18" stroke="#0f172a" stroke-width="2.5" fill="none"/>
    </g>
    <g transform="translate(74, 94) rotate(25)">
      <ellipse cx="10" cy="10" rx="8" ry="11" fill="#58240c" stroke="#0f172a" stroke-width="3"/>
      <path d="M10 3 C7 7 13 13 10 17" stroke="#0f172a" stroke-width="2.5" fill="none"/>
    </g>
  </svg>`,

  // -----------------------------------------------------------------------
  // KATEGORI 2: DAUR ULANG (12 ITEMS)
  // -----------------------------------------------------------------------

  // 13. Kertas Buku Tulis Bekas (School Paper)
  item_school_paper: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Notebook Paper Sheet -->
    <path d="M28 16 L84 16 L102 34 L102 112 L28 112 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Dog-eared Folded Corner -->
    <path d="M84 16 L84 34 L102 34 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Red Vertical Margin Line -->
    <line x1="44" y1="16" x2="44" y2="112" stroke="#ef4444" stroke-width="2.5"/>
    <!-- Blue Horizontal Ruled Lines -->
    <g stroke="#38bdf8" stroke-width="2">
      <line x1="48" y1="36" x2="96" y2="36"/>
      <line x1="48" y1="48" x2="96" y2="48"/>
      <line x1="48" y1="60" x2="96" y2="60"/>
      <line x1="48" y1="72" x2="96" y2="72"/>
      <line x1="48" y1="84" x2="96" y2="84"/>
      <line x1="48" y1="96" x2="96" y2="96"/>
    </g>
    <!-- Math Formula / Pencil Scribble -->
    <text x="56" y="66" font-family="'Fredoka', sans-serif" font-size="11" font-weight="bold" fill="#334155">A + B = C</text>
  </svg>`,

  // 14. Kotak Susu UHT Kantin (Milk Carton with Straw Attached)
  item_milk_carton: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Carton Body -->
    <rect x="36" y="46" width="56" height="66" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Gable Roof Peak -->
    <path d="M36 46 L50 24 L78 24 L92 46 Z" fill="#0284c7" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <rect x="50" y="16" width="28" height="8" fill="#0369a1" stroke="#0f172a" stroke-width="3.5"/>
    <!-- Foil Straw Punch Hole -->
    <circle cx="58" cy="38" r="4.5" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
    <circle cx="58" cy="38" r="2.5" fill="#f1f5f9"/>
    <!-- Blue Milk Waves Graphic -->
    <path d="M37 78 C48 72 64 84 76 76 C84 70 89 74 91 76 L91 111 L37 111 Z" fill="#0ea5e9"/>
    <!-- Cow Silhouette / Milk Splash -->
    <ellipse cx="64" cy="62" rx="10" ry="8" fill="#38bdf8"/>
    <!-- Attached Bendy Straw on the Side in Cellophane Sleeve -->
    <g transform="translate(14, 0)">
      <rect x="76" y="48" width="10" height="58" rx="2" fill="#e0f2fe" opacity="0.6"/>
      <path d="M81 50 L81 104" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M81 50 L81 104" stroke="#ffffff" stroke-width="1.8" stroke-dasharray="4,4" stroke-linecap="round"/>
    </g>
  </svg>`,

  // 15. Botol Plastik PET (Clear Plastic Bottle)
  item_plastic_bottle: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Blue Screw Cap -->
    <rect x="56" y="14" width="16" height="12" rx="2" fill="#0284c7" stroke="#0f172a" stroke-width="3.5"/>
    <!-- Translucent Clear Bottle Body with Grip Ridges -->
    <path d="M58 26 L70 26 L74 36 L54 36 Z" fill="#bae6fd" stroke="#0f172a" stroke-width="3.5"/>
    <path d="M42 42 C42 36 50 36 54 36 L74 36 C78 36 86 36 86 42 L86 64 C82 66 82 72 86 74 L86 104 C86 110 80 114 74 114 L54 114 C48 114 42 110 42 104 L42 74 C46 72 46 66 42 64 Z" 
          fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Vertical Shiny Reflection -->
    <path d="M48 46 L48 106" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    <!-- Green 3-Arrow Recycling Loop -->
    <path d="M60 74 L68 74 L64 68 M68 78 L64 84 L60 80" stroke="#16a34a" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // 16. Gelas Plastik Bening (Plastic Cup)
  item_plastic_cup: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Rolled Rim -->
    <ellipse cx="64" cy="30" rx="36" ry="8" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Clear Ribbed Cup -->
    <path d="M28 30 L40 106 C42 110 48 112 64 112 C80 112 86 110 88 106 L100 30" 
          fill="#f0f9ff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Horizontal Ridges -->
    <path d="M33 54 C44 58 84 58 95 54" stroke="#7dd3fc" stroke-width="3" fill="none"/>
    <path d="M36 72 C46 76 82 76 92 72" stroke="#7dd3fc" stroke-width="3" fill="none"/>
    <path d="M38 90 C48 94 80 94 90 90" stroke="#7dd3fc" stroke-width="3" fill="none"/>
    <path d="M44 38 L50 102" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  // 17. Kaleng Minuman Aluminium (Crushed Soda Can with Dent & Pull Tab)
  item_aluminum_can: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Shiny Red Soda Can Body with Realistic Crushed Waist Dent -->
    <path d="M40 32 L88 32 L88 56 C82 62 84 72 88 78 L88 100 C88 108 80 112 64 112 C48 112 40 108 40 100 L40 76 C46 72 44 60 40 56 Z" 
          fill="#ef4444" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Realistic Crushed Crease Shadows -->
    <path d="M40 56 C52 64 74 58 88 56" stroke="#991b1b" stroke-width="3.5" fill="none"/>
    <path d="M40 76 C56 72 74 80 88 78" stroke="#991b1b" stroke-width="3.5" fill="none"/>
    <!-- Top & Bottom Silver Chimes -->
    <ellipse cx="64" cy="32" rx="24" ry="8" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/>
    <ellipse cx="64" cy="32" rx="18" ry="5" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
    <!-- Open Pull-Tab with Drinking Hole -->
    <ellipse cx="58" cy="32" rx="5" ry="3" fill="#0f172a"/>
    <ellipse cx="68" cy="32" rx="7" ry="3.5" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
    <!-- Metallic Specular Flare -->
    <line x1="48" y1="36" x2="48" y2="104" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  </svg>`,

  // 18. Kardus Karton Bersih (Cardboard Box)
  item_cardboard_box: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- 3D Isometric Cardboard Box -->
    <polygon points="20,54 64,74 64,112 20,88" fill="#b45309" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <polygon points="64,74 108,54 108,88 64,112" fill="#92400e" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <polygon points="20,54 64,34 64,74 20,74" fill="#d97706" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <polygon points="64,34 108,54 108,74 64,74" fill="#b45309" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Sealing Tape -->
    <polygon points="61,35 67,32 67,76 61,76" fill="#fef08a" stroke="#0f172a" stroke-width="2"/>
    <rect x="30" y="66" width="22" height="14" fill="#ffffff" stroke="#0f172a" stroke-width="2" transform="skewY(24)"/>
  </svg>`,

  // 19. Koran Bekas (Newspaper)
  item_newspaper: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Folded Newspaper -->
    <path d="M22 36 L94 24 L106 88 L34 102 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M22 36 L34 102 L98 90 L88 28 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Bold Headline -->
    <rect x="30" y="40" width="52" height="8" rx="2" fill="#0f172a" transform="rotate(-6 30 40)"/>
    <!-- Photo Box & Columns -->
    <rect x="32" y="54" width="22" height="18" fill="#94a3b8" stroke="#0f172a" stroke-width="2" transform="rotate(-6 32 54)"/>
    <g stroke="#64748b" stroke-width="2" transform="rotate(-6 30 40)">
      <line x1="32" y1="48" x2="80" y2="48"/>
      <line x1="58" y1="56" x2="82" y2="56"/>
      <line x1="58" y1="62" x2="82" y2="62"/>
      <line x1="58" y1="68" x2="82" y2="68"/>
    </g>
  </svg>`,

  // 20. Botol Kaca Sirup (Glass Bottle)
  item_glass_bottle: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect x="56" y="14" width="16" height="8" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/>
    <path d="M58 22 L70 22 L72 44 L56 44 Z" fill="#86efac" stroke="#0f172a" stroke-width="3.5"/>
    <path d="M42 54 C42 44 54 44 56 44 L72 44 C74 44 86 44 86 54 L86 104 C86 112 80 114 64 114 C48 114 42 112 42 104 Z" 
          fill="#4ade80" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M48 56 L48 106" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  // 21. Toples Kaca Selai (Glass Jam Jar)
  item_glass_jar: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Golden Metallic Screw Lid -->
    <rect x="42" y="22" width="44" height="14" rx="3" fill="#f59e0b" stroke="#0f172a" stroke-width="4.5"/>
    <line x1="48" y1="29" x2="80" y2="29" stroke="#fef3c7" stroke-width="2.5"/>
    <!-- Clear Glass Jar Body -->
    <path d="M44 36 L84 36 C96 36 98 44 98 52 L98 98 C98 106 90 110 64 110 C38 110 30 106 30 98 L30 52 C30 44 32 36 44 36 Z" 
          fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Jam Label -->
    <rect x="40" y="54" width="48" height="34" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    <circle cx="64" cy="71" r="10" fill="#ef4444"/>
    <path d="M64 64 L64 62 M62 63 L66 63" stroke="#15803d" stroke-width="2"/>
    <path d="M38 50 L38 98 C38 103 44 105 50 105" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
  </svg>`,

  // 22. Kaleng Sarden Logam (Metal Food Can)
  item_metal_can_food: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Cylindrical Steel Can -->
    <path d="M36 44 L92 44 L92 100 C92 108 82 112 64 112 C46 112 36 108 36 100 Z" 
          fill="#94a3b8" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Peeled-Back Lid with Pull Ring -->
    <ellipse cx="64" cy="44" rx="28" ry="11" fill="#e2e8f0" stroke="#0f172a" stroke-width="4"/>
    <ellipse cx="64" cy="44" rx="22" ry="7" fill="#64748b" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M37 66 C48 70 80 70 91 66" stroke="#64748b" stroke-width="3" fill="none"/>
    <path d="M37 84 C48 88 80 88 91 84" stroke="#64748b" stroke-width="3" fill="none"/>
    <line x1="44" y1="48" x2="44" y2="104" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  // 23. Cup Kertas Kopi (Paper Coffee Cup)
  item_cardboard_cup: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Sip Lid -->
    <path d="M32 30 L96 30 C98 30 100 24 96 22 L32 22 C28 24 30 30 32 30 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Cup Body -->
    <path d="M34 30 L44 106 C46 110 52 112 64 112 C76 112 82 110 84 106 L94 30" 
          fill="#fef3c7" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Corrugated Kraft Sleeve -->
    <path d="M38 52 L42 86 C44 90 52 92 64 92 C76 92 84 90 86 86 L90 52 C78 55 50 55 38 52 Z" 
          fill="#d97706" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
    <line x1="52" y1="54" x2="54" y2="90" stroke="#b45309" stroke-width="2.5"/>
    <line x1="64" y1="54" x2="64" y2="91" stroke="#b45309" stroke-width="2.5"/>
    <line x1="76" y1="54" x2="74" y2="90" stroke="#b45309" stroke-width="2.5"/>
  </svg>`,

  // 24. Botol Sampo HDPE (Shampoo Bottle)
  item_shampoo_bottle: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Pump Dispenser -->
    <path d="M54 22 L74 22 L74 16 L48 16 L48 20 Z" fill="#0f172a" stroke="#0f172a" stroke-width="2"/>
    <rect x="58" y="22" width="12" height="10" fill="#94a3b8" stroke="#0f172a" stroke-width="3"/>
    <!-- Bottle Body -->
    <path d="M40 46 C40 38 52 40 56 40 L72 40 C76 40 88 38 88 46 L86 104 C86 110 80 114 64 114 C48 114 42 110 42 104 Z" 
          fill="#06b6d4" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M43 64 C56 58 72 74 85 68 L85 92 C72 98 56 82 43 88 Z" fill="#a855f7"/>
    <line x1="48" y1="46" x2="48" y2="106" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  // -----------------------------------------------------------------------
  // KATEGORI 3: B3 BAHAYA (12 ITEMS)
  // -----------------------------------------------------------------------

  // 25. Spidol Whiteboard Habis (Dry-Erase Marker with Pocket Clip & Chisel Tip)
  item_whiteboard_marker: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-35 64 64)">
      <!-- Angled Chisel Felt Tip (Frayed and dry at tip) -->
      <polygon points="59,10 69,14 66,24 61,24" fill="#0284c7" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="60" y1="12" x2="63" y2="20" stroke="#bae6fd" stroke-width="1.5"/>
      <!-- Cone Collar -->
      <polygon points="57,24 71,24 73,36 55,36" fill="#0f172a" stroke="#0f172a" stroke-width="3"/>
      <!-- Marker Barrel -->
      <rect x="53" y="36" width="22" height="66" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="4.5"/>
      <!-- Blue Band & Logo -->
      <rect x="54" y="52" width="20" height="24" fill="#0284c7"/>
      <rect x="58" y="60" width="12" height="4" fill="#ffffff"/>
      <!-- Pocket Clip Attached on Cap Posted on Back -->
      <rect x="55" y="102" width="18" height="12" rx="3" fill="#0284c7" stroke="#0f172a" stroke-width="3.5"/>
      <path d="M73 98 L77 98 L77 114 L73 114" stroke="#0f172a" stroke-width="3" fill="#64748b"/>
    </g>
  </svg>`,

  // 26. Botol Antiseptik UKS (Antiseptic Bottle - Real Dropper Cap)
  item_antiseptic_bottle: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Characteristic Yellow Ribbed Dropper Tip Cap -->
    <path d="M60 14 L68 14 L70 28 L58 28 Z" fill="#facc15" stroke="#0f172a" stroke-width="3.5"/>
    <rect x="54" y="28" width="20" height="10" rx="2" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    <!-- Amber Brown Iodine Bottle Body -->
    <rect x="38" y="38" width="52" height="74" rx="8" fill="#b45309" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Medical Label with Red Cross -->
    <rect x="42" y="52" width="44" height="44" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    <rect x="60" y="60" width="8" height="28" fill="#dc2626"/>
    <rect x="50" y="70" width="28" height="8" fill="#dc2626"/>
    <line x1="46" y1="44" x2="46" y2="106" stroke="#fde68a" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  // 27. Baterai Bekas (AA Battery - Real Brushed Metal + Leaking Acid Crust)
  item_battery_aa: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-20 64 64)">
      <!-- Raised Positive Brass Terminal Nub -->
      <rect x="58" y="12" width="12" height="10" rx="2" fill="#f59e0b" stroke="#0f172a" stroke-width="3.5"/>
      <line x1="60" y1="15" x2="68" y2="15" stroke="#fef08a" stroke-width="2"/>
      <!-- Cylindrical Black Body -->
      <rect x="46" y="22" width="36" height="88" rx="5" fill="#0f172a" stroke="#0f172a" stroke-width="4.5"/>
      <!-- Gold Top Collar -->
      <rect x="47" y="23" width="34" height="28" fill="#d97706"/>
      <rect x="47" y="23" width="34" height="6" fill="#f59e0b"/>
      <!-- Polarity Signs -->
      <text x="64" y="44" font-family="'Chakra Petch', sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
      <text x="64" y="96" font-family="'Chakra Petch', sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">-</text>
      <!-- Metallic Light Reflection -->
      <line x1="52" y1="24" x2="52" y2="108" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>
      <!-- Subtle Leaking Battery Acid Crust at Bottom Rim (Proving it is a dead, toxic B3 battery) -->
      <path d="M44 104 C46 112 56 112 56 108" stroke="#86efac" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M72 106 C74 112 84 112 84 106" stroke="#fef08a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,

  // 28. Botol Karbol Pembersih (Bleach Jug with Hollow Grip Handle)
  item_bleach_bottle: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Childproof Safety Push-Turn Red Cap -->
    <rect x="40" y="14" width="24" height="12" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="3.5"/>
    <line x1="44" y1="19" x2="60" y2="19" stroke="#fca5a5" stroke-width="2"/>
    <!-- Jug Body with Side Pour Spout & Hollow Handle -->
    <path d="M42 26 L64 26 C78 32 90 44 90 60 L90 104 C90 110 82 114 64 114 C46 114 36 110 36 104 L36 44 C36 34 40 26 42 26 Z" 
          fill="#f8fafc" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Ergonomic Hollow Grip Cutout -->
    <path d="M70 52 C76 52 80 58 80 66 C80 74 76 80 70 80 C66 80 66 52 70 52 Z" fill="#090d16" stroke="#0f172a" stroke-width="3.5"/>
    <!-- Yellow Corrosive Hazard Warning Diamond -->
    <g transform="translate(54, 84) rotate(45)">
      <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#facc15" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="0" y1="-7" x2="0" y2="2" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="7" r="1.8" fill="#0f172a"/>
    </g>
  </svg>`,

  // 29. Kaleng Semprot Pestisida (Aerosol Insect Spray Can)
  item_spray_pesticide: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Red Spray Actuator Button -->
    <rect x="58" y="12" width="12" height="12" rx="2" fill="#ef4444" stroke="#0f172a" stroke-width="3"/>
    <circle cx="61" cy="17" r="2" fill="#0f172a"/>
    <!-- Dome Shoulder & Crimped Seam -->
    <path d="M44 34 C44 24 84 24 84 34 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/>
    <rect x="42" y="34" width="44" height="76" rx="4" fill="#0284c7" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Yellow Caution Stripe with Insect/Skull Icon -->
    <rect x="43" y="58" width="42" height="30" fill="#facc15" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="64" cy="70" r="7" fill="#0f172a"/>
    <circle cx="61.5" cy="69" r="1.8" fill="#facc15"/>
    <circle cx="66.5" cy="69" r="1.8" fill="#facc15"/>
    <rect x="62" y="76" width="4" height="4" fill="#0f172a"/>
    <!-- Metallic Specular Line -->
    <line x1="48" y1="36" x2="48" y2="108" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>
  </svg>`,

  // 30. Termometer Air Raksa (Clinical Mercury Thermometer)
  item_thermometer: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-40 64 64)">
      <!-- Prismatic Triangular Glass Stem -->
      <rect x="58" y="10" width="12" height="86" rx="6" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5"/>
      <!-- Silver Mercury Bulb -->
      <circle cx="64" cy="100" r="14" fill="#94a3b8" stroke="#0f172a" stroke-width="4.5"/>
      <circle cx="60" cy="96" r="4.5" fill="#f1f5f9"/>
      <!-- Red Mercury Liquid Column -->
      <rect x="62" y="44" width="4" height="46" rx="2" fill="#dc2626"/>
      <!-- Degree Markings & Numerical Calibration -->
      <g stroke="#0f172a" stroke-width="2">
        <line x1="60" y1="24" x2="52" y2="24"/>
        <line x1="60" y1="34" x2="55" y2="34"/>
        <line x1="60" y1="44" x2="52" y2="44"/>
        <line x1="60" y1="54" x2="55" y2="54"/>
        <line x1="60" y1="64" x2="52" y2="64"/>
      </g>
      <text x="48" y="47" font-family="'Chakra Petch', monospace" font-size="7" font-weight="bold" fill="#0f172a">37°</text>
    </g>
  </svg>`,

  // 31. Lampu Neon / CFL (CFL Spiral Bulb)
  item_fluorescent_lamp: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Spiral Glass Tube Loops -->
    <path d="M48 24 C48 16 80 16 80 24 C80 32 48 34 48 44 C48 54 80 56 80 66 C80 74 48 74 48 74" 
          stroke="#0f172a" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M48 24 C48 16 80 16 80 24 C80 32 48 34 48 44 C48 54 80 56 80 66 C80 74 48 74 48 74" 
          stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none"/>
    <rect x="46" y="74" width="36" height="18" rx="4" fill="#f1f5f9" stroke="#0f172a" stroke-width="4"/>
    <path d="M50 92 L78 92 L74 110 C74 114 54 114 54 110 Z" fill="#94a3b8" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
    <line x1="51" y1="97" x2="77" y2="97" stroke="#475569" stroke-width="2"/>
    <line x1="52" y1="103" x2="76" y2="103" stroke="#475569" stroke-width="2"/>
    <circle cx="64" cy="83" r="3" fill="#facc15"/>
  </svg>`,

  // 32. Obat Kedaluwarsa (Amber Bottle + 2 Two-Tone Capsules, Pure Transparent Background)
  item_expired_medicine: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect x="46" y="16" width="36" height="14" rx="3" fill="#dc2626" stroke="#0f172a" stroke-width="4"/>
    <line x1="52" y1="20" x2="52" y2="26" stroke="#ffffff" stroke-width="2"/>
    <line x1="64" y1="20" x2="64" y2="26" stroke="#ffffff" stroke-width="2"/>
    <line x1="76" y1="20" x2="76" y2="26" stroke="#ffffff" stroke-width="2"/>
    <rect x="34" y="30" width="60" height="78" rx="10" fill="#d97706" stroke="#0f172a" stroke-width="4.5"/>
    <rect x="35" y="48" width="58" height="42" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
    <rect x="58" y="56" width="12" height="26" fill="#dc2626"/>
    <rect x="51" y="63" width="26" height="12" fill="#dc2626"/>
    <line x1="40" y1="36" x2="40" y2="102" stroke="#fef3c7" stroke-width="4" stroke-linecap="round"/>
    <!-- Two Two-Tone Red & Yellow Capsules Spilled at Right -->
    <g transform="rotate(35 98 94)">
      <rect x="90" y="86" width="22" height="12" rx="6" fill="#ef4444" stroke="#0f172a" stroke-width="2.5"/>
      <rect x="101" y="86" width="11" height="12" rx="6" fill="#facc15" stroke="#0f172a" stroke-width="2.5"/>
    </g>
  </svg>`,

  // 33. Pecahan Kaca Beling Tajam (Sharp Prismatic Crystal Glass Shards)
  item_broken_glass: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Big Sharp Glass Shard with Bevel -->
    <polygon points="24,16 78,32 54,108 16,84" fill="#a5f3fc" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <polygon points="30,24 72,36 52,98 22,80" fill="#cffafe"/>
    <!-- Shard 2 -->
    <polygon points="68,44 112,24 106,84 74,70" fill="#67e8f9" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Shard 3 (Bottom Needle Shard) -->
    <polygon points="56,88 100,78 88,114 46,112" fill="#22d3ee" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Prismatic Caustic Glare Highlights -->
    <line x1="34" y1="26" x2="50" y2="92" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="82" y1="38" x2="100" y2="74" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // 34. Mouse Komputer Rusak E-Waste (Ergonomic Mouse with Exposed Copper Strands)
  item_electronics_mouse: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Broken Chewed Cord with Exposed Copper Wires -->
    <path d="M64 24 C64 12 78 8 82 14 C86 20 94 16 98 12" stroke="#0f172a" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <!-- Copper Core Strands -->
    <line x1="98" y1="12" x2="106" y2="8" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="98" y1="12" x2="104" y2="16" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
    <!-- Mouse Ergonomic Matte Body -->
    <path d="M40 44 C40 26 88 26 88 44 L88 88 C88 106 40 106 40 88 Z" 
          fill="#334155" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Left / Right Click Split Seam -->
    <line x1="64" y1="26" x2="64" y2="60" stroke="#0f172a" stroke-width="3"/>
    <line x1="42" y1="58" x2="86" y2="58" stroke="#0f172a" stroke-width="3"/>
    <!-- Rubber Scroll Wheel with Ribs -->
    <rect x="60" y="34" width="8" height="16" rx="3" fill="#0f172a"/>
    <line x1="60" y1="38" x2="68" y2="38" stroke="#94a3b8" stroke-width="2"/>
    <line x1="60" y1="44" x2="68" y2="44" stroke="#94a3b8" stroke-width="2"/>
    <!-- Red Optical Sensor Glow underneath -->
    <ellipse cx="64" cy="84" rx="10" ry="7" fill="#ef4444" opacity="0.6"/>
  </svg>`,

  // 35. Kaleng Cat Minyak / Thinner (Paint Can with Viscous Drips & Wire Handle)
  item_paint_can: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Wire Bail Handle with Grip -->
    <path d="M30 52 C30 18 98 18 98 52" stroke="#0f172a" stroke-width="3.5" fill="none"/>
    <rect x="58" y="22" width="12" height="6" rx="2" fill="#0f172a"/>
    <!-- Steel Can Body -->
    <path d="M32 46 L96 46 L94 102 C94 108 86 112 64 112 C42 112 34 108 34 102 Z" 
          fill="#94a3b8" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Recessed Top Rim with Wet Cobalt Blue Paint -->
    <ellipse cx="64" cy="46" rx="32" ry="11" fill="#cbd5e1" stroke="#0f172a" stroke-width="4"/>
    <ellipse cx="64" cy="46" rx="26" ry="8" fill="#2563eb" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Thick Dripping Paint Running Down the Tin -->
    <path d="M44 54 L44 84 C44 88 50 88 50 84 L50 56" fill="#2563eb" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M72 54 L72 76 C72 80 78 80 78 76 L78 56" fill="#2563eb" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="47" cy="85" r="3.5" fill="#3b82f6"/>
    <!-- Solvent Caution Label -->
    <rect x="52" y="86" width="24" height="18" fill="#facc15" stroke="#0f172a" stroke-width="2"/>
    <line x1="64" y1="89" x2="64" y2="97" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="64" cy="101" r="1.5" fill="#0f172a"/>
  </svg>`,

  // 36. Jarum Suntik Medis (Medical Syringe)
  item_syringe: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(45 64 64)">
      <!-- Stainless Steel Needle -->
      <line x1="64" y1="8" x2="64" y2="34" stroke="#0f172a" stroke-width="3"/>
      <!-- Needle Collar -->
      <polygon points="60,34 68,34 66,40 62,40" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
      <!-- Clear Barrel Cylinder -->
      <rect x="54" y="40" width="20" height="52" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5"/>
      <!-- Calibrated Measurement Ticks -->
      <g stroke="#0284c7" stroke-width="2">
        <line x1="56" y1="48" x2="64" y2="48"/>
        <line x1="56" y1="58" x2="62" y2="58"/>
        <line x1="56" y1="68" x2="64" y2="68"/>
        <line x1="56" y1="78" x2="62" y2="78"/>
      </g>
      <!-- Black Rubber Plunger Head -->
      <rect x="55" y="70" width="18" height="10" rx="2" fill="#0f172a"/>
      <rect x="62" y="80" width="4" height="26" fill="#64748b" stroke="#0f172a" stroke-width="2"/>
      <rect x="50" y="106" width="28" height="6" rx="2" fill="#0f172a"/>
      <rect x="46" y="92" width="36" height="6" rx="2" fill="#0f172a"/>
    </g>
  </svg>`,

  // -----------------------------------------------------------------------
  // KATEGORI 4: RESIDU (12 ITEMS) - REALISTIC CEL-SHADED OVERHAUL
  // -----------------------------------------------------------------------

  // 37. Bungkus Ciki / Snack Plastik (Crinkled Metallic Foil Potato Chips Bag)
  item_snack_wrapper: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-6 64 64)">
      <!-- Drop Shadow -->
      <path d="M30 26 L98 22 L92 108 L22 104 Z" fill="#090d16" opacity="0.35"/>
      <!-- Main Puffed Foil Bag Body (Golden Yellow with Gradient Volume) -->
      <path d="M28 26 L96 22 L90 106 L22 102 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M32 30 L92 26 L86 102 L26 98 Z" fill="#fbbf24"/>
      <!-- Top Crimped Heat-Seal Strip with Zigzag Edge -->
      <path d="M28 26 L33 18 L38 26 L43 18 L48 26 L53 18 L58 26 L63 18 L68 26 L73 18 L78 26 L83 18 L88 26 L93 18 L96 22 L92 32 L26 36 Z" 
            fill="#d97706" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
      <!-- Bottom Crimped Heat-Seal Strip with Zigzag Edge -->
      <path d="M22 102 L26 112 L31 102 L36 112 L41 102 L46 112 L51 102 L56 112 L61 102 L66 112 L71 102 L76 112 L81 102 L86 112 L90 106 L86 96 L24 94 Z" 
            fill="#d97706" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
      <!-- Torn Top-Right Corner Exposing Shiny Silver Aluminum Foil Interior -->
      <polygon points="84,24 96,22 92,38 82,34" fill="#0f172a"/>
      <polygon points="86,26 94,24 90,36 84,33" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Red Starburst Snack Badge -->
      <ellipse cx="58" cy="64" rx="20" ry="18" fill="#ef4444" stroke="#0f172a" stroke-width="3"/>
      <!-- 2 Crispy Golden Potato Chips Illustrated on Front -->
      <ellipse cx="54" cy="62" rx="9" ry="6" fill="#fde047" stroke="#b45309" stroke-width="2" transform="rotate(-15 54 62)"/>
      <ellipse cx="62" cy="66" rx="8" ry="5.5" fill="#facc15" stroke="#b45309" stroke-width="2" transform="rotate(20 62 66)"/>
      <!-- Comic "CHIP" Sub-banner -->
      <rect x="42" y="76" width="32" height="10" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
      <text x="58" y="84" font-family="'Chakra Petch', sans-serif" font-size="7.5" font-weight="bold" fill="#fef08a" text-anchor="middle">SNACK</text>
      <!-- Metallic Foil Crinkle Gleam Lines (Volume Reflection) -->
      <path d="M36 34 L32 94" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.8"/>
      <path d="M42 42 L38 88" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <path d="M78 40 L82 86" stroke="#b45309" stroke-width="3.5" stroke-linecap="round" opacity="0.5"/>
    </g>
  </svg>`,

  // 38. Sedotan Plastik Kantin (Takeaway Plastic Cup with Domed Lid & Striped Bendy Straw)
  item_plastic_straw: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Crumpled Second Bendy Straw lying across bottom -->
    <path d="M18 108 L48 98 L56 106 L108 94" stroke="#0f172a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 108 L48 98 L56 106 L108 94" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M48 98 L56 106" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
    
    <!-- Clear Disposable Plastic Cup Body -->
    <path d="M34 52 L94 52 L84 104 C84 110 44 110 44 104 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Crushed Dent in Cup Wall -->
    <path d="M38 68 C48 74 48 84 40 92" stroke="#38bdf8" stroke-width="3" fill="none"/>
    <path d="M34 52 L44 104" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
    
    <!-- Transparent Domed Lid -->
    <path d="M30 52 C30 36 98 36 98 52 Z" fill="#bae6fd" stroke="#0f172a" stroke-width="4.5"/>
    <ellipse cx="64" cy="52" rx="34" ry="7" fill="#e0f2fe" stroke="#0f172a" stroke-width="3.5"/>
    <circle cx="64" cy="40" r="5" fill="#0f172a"/>
    
    <!-- Tall Spiral-Striped Red & White Bendy Straw sticking out -->
    <!-- Lower Straw Shaft inside cup -->
    <line x1="64" y1="40" x2="72" y2="92" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
    <line x1="64" y1="40" x2="72" y2="92" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Upper Straw angled up and bent horizontally -->
    <path d="M64 40 L60 22 C60 16 68 12 74 12 L102 12" stroke="#0f172a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M64 40 L60 22 C60 16 68 12 74 12 L102 12" stroke="#ef4444" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Accordion Bend Ribs on Straw -->
    <g stroke="#ffffff" stroke-width="2.5">
      <line x1="61" y1="20" x2="67" y2="21"/>
      <line x1="63" y1="16" x2="69" y2="18"/>
      <line x1="68" y1="13" x2="72" y2="17"/>
      <!-- Diagonal White Candy Stripes -->
      <line x1="78" y1="10" x2="82" y2="15"/>
      <line x1="88" y1="10" x2="92" y2="15"/>
      <line x1="96" y1="10" x2="100" y2="15"/>
      <line x1="61" y1="28" x2="65" y2="32"/>
      <line x1="62" y1="35" x2="66" y2="39"/>
    </g>
    <!-- Hollow Straw Opening -->
    <ellipse cx="102" cy="12" rx="2" ry="3.5" fill="#991b1b"/>
  </svg>`,

  // 39. Bungkus Sachet Kopi (Indonesian 3-in-1 Coffee Foil Sachet with Powder Leak & Steaming Mug)
  item_coffee_sachet: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(18 64 64)">
      <!-- Drop Shadow -->
      <rect x="42" y="16" width="46" height="96" rx="4" fill="#090d16" opacity="0.3"/>
      <!-- Foil Sachet Body (Rich Roasted Brown) -->
      <rect x="38" y="14" width="48" height="96" rx="4" fill="#451a03" stroke="#0f172a" stroke-width="4.5"/>
      <!-- Heat-Seal Crimped Top Band -->
      <rect x="38" y="14" width="48" height="12" fill="#d97706" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="42" y1="20" x2="82" y2="20" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Heat-Seal Crimped Bottom Band -->
      <rect x="38" y="98" width="48" height="12" fill="#d97706" stroke="#0f172a" stroke-width="2.5"/>
      <line x1="42" y1="104" x2="82" y2="104" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Torn Top Corner (Easy-Tear Notch) -->
      <polygon points="38,20 48,26 38,32" fill="#0f172a"/>
      <!-- Shiny Silver Foil Exposed at Tear Edge -->
      <polygon points="40,22 46,26 40,30" fill="#e2e8f0"/>
      <!-- Coffee Powder Granules leaking out of tear -->
      <circle cx="34" cy="24" r="1.8" fill="#271106"/>
      <circle cx="32" cy="30" r="1.5" fill="#271106"/>
      <circle cx="30" cy="36" r="2" fill="#451a03"/>
      <!-- Coffee Cup Graphic on Pack -->
      <rect x="52" y="52" width="20" height="16" rx="3" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
      <path d="M72 55 C77 55 77 65 72 65" stroke="#0f172a" stroke-width="2.5" fill="none"/>
      <!-- Steam Wisps -->
      <path d="M57 48 Q55 44 57 40 M63 48 Q65 44 63 40" stroke="#fef08a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- Bold "KOPI 3-in-1" Label -->
      <rect x="42" y="74" width="40" height="14" rx="2" fill="#d97706" stroke="#0f172a" stroke-width="2"/>
      <text x="62" y="84" font-family="'Chakra Petch', sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">KOPI 3in1</text>
      <!-- Golden Coffee Bean Emblem -->
      <ellipse cx="62" cy="36" rx="6" ry="4" fill="#ca8a04" stroke="#fef08a" stroke-width="1.5"/>
      <path d="M58 36 Q62 38 66 36" stroke="#451a03" stroke-width="1.5" fill="none"/>
      <!-- Vertical Metallic Reflection Strip -->
      <line x1="46" y1="28" x2="46" y2="96" stroke="#ffffff" stroke-width="3" opacity="0.6" stroke-linecap="round"/>
    </g>
  </svg>`,

  // 40. Kantong Kresek Tipis (Red & White Crinkled Shopping Bag with Tied Loop Handles)
  item_plastic_bag: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Tied Knot at Top -->
    <ellipse cx="64" cy="32" rx="10" ry="7" fill="#ef4444" stroke="#0f172a" stroke-width="4"/>
    <!-- Two Flopping Loop Handles Tied Together -->
    <path d="M56 32 C46 22 36 28 44 38 L48 50 M72 32 C82 22 92 28 84 38 L80 50" 
          stroke="#0f172a" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M56 32 C46 22 36 28 44 38 L48 50 M72 32 C82 22 92 28 84 38 L80 50" 
          stroke="#f87171" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Crumpled Plastic Bag Body with Thin Semi-Translucent Folds -->
    <path d="M46 48 C30 50 18 64 16 86 C14 104 32 114 64 114 C96 114 114 104 112 86 C110 64 98 50 82 48 C74 48 68 54 64 54 C60 54 54 48 46 48 Z" 
          fill="#ef4444" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Inner Volume Shadow & Contrasting White Grocery Stripe -->
    <path d="M26 84 C38 96 90 96 102 84 C100 102 84 108 64 108 C44 108 28 102 26 84 Z" fill="#dc2626"/>
    <!-- White Supermarket Stripe Print -->
    <path d="M22 74 C44 80 84 80 106 74 L104 82 C84 88 44 88 24 82 Z" fill="#ffffff" opacity="0.9"/>
    <!-- Fine Plastic Wrinkle / Stretch Lines -->
    <path d="M34 58 C44 70 52 66 64 74 C76 66 84 70 94 58" stroke="#fca5a5" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M40 88 C52 94 76 94 88 88" stroke="#b91c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M30 68 C36 84 46 86 52 86" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.8"/>
  </svg>`,

  // 41. Popok Bayi Bekas (Rolled Baby Diaper with Hourglass Contour, Blue Grip Tabs & Wetness Line)
  item_diaper: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Drop Shadow -->
    <ellipse cx="64" cy="74" rx="38" ry="34" fill="#090d16" opacity="0.25"/>
    <!-- Main Diaper Contour (Folded Curved Hourglass) -->
    <path d="M28 42 C28 32 100 32 100 42 L94 86 C94 102 80 110 64 110 C48 110 34 102 34 86 Z" 
          fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Pastel Blue Patterned Waistband Band -->
    <rect x="29" y="40" width="70" height="18" rx="4" fill="#e0f2fe" stroke="#0f172a" stroke-width="3"/>
    <!-- Cute Printed Pastel Stars on Waistband -->
    <circle cx="48" cy="49" r="2.5" fill="#38bdf8"/>
    <circle cx="64" cy="49" r="3" fill="#fbbf24"/>
    <circle cx="80" cy="49" r="2.5" fill="#38bdf8"/>
    <!-- 2 Bright Blue Refastenable Adhesive Tabs Folded In -->
    <rect x="26" y="43" width="14" height="14" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="88" y="43" width="14" height="14" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Elastic Ruffled Leg Gathers (Ruched Anti-Leak Cuffs) -->
    <path d="M34 58 C30 72 38 90 48 98 M94 58 C98 72 90 90 80 98" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none"/>
    <!-- Yellow/Blue Wetness Indicator Line in Center -->
    <line x1="64" y1="58" x2="64" y2="84" stroke="#eab308" stroke-width="4" stroke-linecap="round"/>
    <line x1="64" y1="84" x2="64" y2="106" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
    <!-- Soft Quilted Absorbent Pad Shading -->
    <path d="M42 66 C52 74 76 74 86 66" stroke="#e2e8f0" stroke-width="3" fill="none"/>
  </svg>`,

  // 42. Tisu Kotor Bekas Pakai (Crumpled Stained Tissue Wad with 3D Fibrous Folds & Sauce Spot)
  item_dirty_tissue: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Multi-faceted Crumpled Paper Ball / Wad -->
    <path d="M32 46 C20 56 22 78 32 94 C44 110 76 112 94 98 C108 86 110 58 98 42 C86 28 58 26 42 34 Z" 
          fill="#f8fafc" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Angular Fold Creases & Shadow Facets -->
    <polygon points="42,34 64,48 48,68 32,46" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/>
    <polygon points="64,48 92,38 98,64 74,68" fill="#cbd5e1" stroke="#0f172a" stroke-width="3"/>
    <polygon points="48,68 74,68 62,98 38,92" fill="#e2e8f0" stroke="#0f172a" stroke-width="3"/>
    <polygon points="74,68 98,64 94,98 62,98" fill="#94a3b8" stroke="#0f172a" stroke-width="3"/>
    <!-- Distinctive Oily Yellow/Brown Sauce Stain Puddled in Crease -->
    <path d="M52 60 C64 52 76 58 72 72 C68 84 56 82 50 74 Z" fill="#ca8a04" stroke="#0f172a" stroke-width="2"/>
    <circle cx="58" cy="66" r="4.5" fill="#a16207"/>
    <circle cx="68" cy="72" r="3" fill="#a16207"/>
    <!-- Fine Paper Tear & Fiber Highlight Peaks -->
    <line x1="36" y1="44" x2="48" y2="56" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <line x1="82" y1="42" x2="90" y2="54" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // 43. Puntung Rokok (Stubbed Cigarette with Mottled Cork Filter, Squashed Paper & Glowing Ash)
  item_cigarette_butt: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(28 64 64)">
      <!-- Orange-Tan Cork Filter Cylinder -->
      <rect x="46" y="20" width="36" height="40" rx="4" fill="#f59e0b" stroke="#0f172a" stroke-width="4.5"/>
      <!-- Oval Mouthpiece Rim -->
      <ellipse cx="64" cy="20" rx="18" ry="7" fill="#d97706" stroke="#0f172a" stroke-width="3"/>
      <!-- Cork Texture Flecks -->
      <circle cx="54" cy="30" r="1.8" fill="#b45309"/>
      <circle cx="72" cy="34" r="1.8" fill="#b45309"/>
      <circle cx="60" cy="46" r="1.8" fill="#b45309"/>
      <circle cx="74" cy="52" r="1.8" fill="#b45309"/>
      <!-- Gold Foil Boundary Line between filter & paper -->
      <line x1="46" y1="60" x2="82" y2="60" stroke="#78350f" stroke-width="3"/>
      <!-- Squashed, Crumpled White Tobacco Paper Cylinder -->
      <path d="M48 60 L80 60 L74 94 C74 100 50 102 48 94 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
      <!-- Paper Crinkle Lines & Crease -->
      <path d="M48 74 L78 78" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
      <path d="M52 86 L74 88" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Stubbed Black Charred Ash End with Grey Flakes -->
      <path d="M48 94 C50 106 72 106 74 94 Z" fill="#1e293b" stroke="#0f172a" stroke-width="3.5"/>
      <circle cx="56" cy="98" r="3" fill="#64748b"/>
      <circle cx="68" cy="97" r="2.5" fill="#94a3b8"/>
      <!-- Tiny Red-Orange Ember Spark Glow -->
      <circle cx="62" cy="100" r="2.5" fill="#ef4444"/>
      <circle cx="61" cy="99" r="1.2" fill="#fbbf24"/>
    </g>
  </svg>`,

  // 44. Styrofoam Berminyak (Open Takeaway Clamshell Box with Sambal Splatters & Oil Pools)
  item_dirty_styrofoam: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Open Hinged Top Lid angled upward in perspective -->
    <polygon points="28,48 100,34 92,16 20,28" fill="#e2e8f0" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Deep Bottom Tray Food Reservoir -->
    <polygon points="24,48 104,34 110,84 22,96" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Beveled Front Wall of Tray -->
    <polygon points="22,96 110,84 102,112 28,114" fill="#cbd5e1" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
    <!-- Front Locking Tab -->
    <rect x="60" y="86" width="12" height="8" rx="2" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
    <!-- Beaded Foam Texture Dots -->
    <circle cx="36" cy="62" r="2" fill="#e2e8f0"/>
    <circle cx="86" cy="52" r="2" fill="#e2e8f0"/>
    <circle cx="48" cy="104" r="2" fill="#94a3b8"/>
    <!-- Large Yellow-Orange Cooking Oil Puddle inside Bottom Tray -->
    <ellipse cx="64" cy="68" rx="28" ry="14" fill="#f97316" stroke="#ea580c" stroke-width="2.5" transform="rotate(-7 64 68)"/>
    <!-- Spicy Red Sambal Splatters and Seeds -->
    <circle cx="56" cy="66" r="4.5" fill="#dc2626"/>
    <circle cx="74" cy="70" r="3.5" fill="#dc2626"/>
    <circle cx="66" cy="62" r="2.5" fill="#ef4444"/>
    <circle cx="58" cy="65" r="1.5" fill="#fef08a"/>
    <circle cx="73" cy="71" r="1.5" fill="#fef08a"/>
  </svg>`,

  // 45. Plastik Gelembung Paket Olshop (Bubble Wrap Sheet with 3D Domed Cells & Popped Crease)
  item_bubble_wrap: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Translucent Clear Blue Packaging Film Base -->
    <rect x="18" y="18" width="92" height="92" rx="10" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Folded Dog-Eared Bottom Corner -->
    <polygon points="86,110 110,86 86,86" fill="#bae6fd" stroke="#0f172a" stroke-width="3.5"/>
    
    <!-- 3x3 Grid of 3D Air Bubble Domes -->
    <g fill="#ffffff" stroke="#0f172a" stroke-width="3">
      <!-- Row 1 -->
      <circle cx="36" cy="36" r="11"/>
      <circle cx="64" cy="36" r="11"/>
      <circle cx="92" cy="36" r="11"/>
      <!-- Row 2 -->
      <circle cx="36" cy="64" r="11"/>
      <circle cx="64" cy="64" r="11"/>
      <circle cx="92" cy="64" r="11"/>
      <!-- Row 3 -->
      <circle cx="36" cy="92" r="11"/>
      <circle cx="64" cy="92" r="11"/>
    </g>
    
    <!-- Popped / Deflated Wrinkled Bubble at (92, 92) -->
    <path d="M84 90 C86 86 98 86 100 90 C102 96 86 98 84 90 Z" fill="#bae6fd" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="86" y1="92" x2="98" y2="92" stroke="#0284c7" stroke-width="2"/>
    
    <!-- 3D Specular Arc Reflections on every intact bubble -->
    <g stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round">
      <path d="M30 33 A6 6 0 0 1 38 29"/>
      <path d="M58 33 A6 6 0 0 1 66 29"/>
      <path d="M86 33 A6 6 0 0 1 94 29"/>
      <path d="M30 61 A6 6 0 0 1 38 57"/>
      <path d="M58 61 A6 6 0 0 1 66 57"/>
      <path d="M86 61 A6 6 0 0 1 94 57"/>
      <path d="M30 89 A6 6 0 0 1 38 85"/>
      <path d="M58 89 A6 6 0 0 1 66 85"/>
    </g>
    <!-- Plastic Film Gleam Lines -->
    <line x1="22" y1="24" x2="48" y2="24" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // 46. Pecahan Piring Keramik (Broken Ceramic Porcelain Plate Shard with Blue Floral Rim)
  item_broken_ceramic: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Main Porcelain Plate Shard with Jagged Fracture Edges -->
    <path d="M22 68 C22 34 50 16 88 16 L66 66 L108 82 L78 112 C52 110 32 94 22 68 Z" 
          fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
    <!-- Glazed Plate Rim Contour -->
    <path d="M26 62 C26 38 48 24 82 22" stroke="#cbd5e1" stroke-width="6" fill="none"/>
    <!-- Traditional Cobalt Blue Decorative Floral / Rim Motif -->
    <path d="M30 60 C30 42 50 28 80 26" stroke="#1d4ed8" stroke-width="4.5" fill="none"/>
    <circle cx="42" cy="46" r="3" fill="#1d4ed8"/>
    <circle cx="58" cy="35" r="3" fill="#1d4ed8"/>
    <!-- Unglazed Bisque Clay Fracture Plane along broken edges (Porous Tan Thickness) -->
    <path d="M88 16 L66 66 L108 82" stroke="#d97706" stroke-width="4" fill="none" stroke-linejoin="round"/>
    <path d="M108 82 L78 112" stroke="#d97706" stroke-width="4" fill="none"/>
    <!-- Sharp Radial Crack Lines Branching from Center Break -->
    <line x1="66" y1="66" x2="46" y2="76" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="66" y1="66" x2="58" y2="92" stroke="#0f172a" stroke-width="2"/>
    <!-- Glossy Porcelain Surface Glare -->
    <path d="M38 72 C44 92 60 102 70 104" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
  </svg>`,

  // 47. Mika Plastik Jajanan Pasar (Rigid Clear Mika Food Box with Stepped Ribs & Snap Closure)
  item_mika_plastic: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Drop Shadow -->
    <rect x="24" y="26" width="84" height="76" rx="8" fill="#090d16" opacity="0.3"/>
    <!-- Clear Mika Base Food Tray (Stepped Rim) -->
    <rect x="20" y="24" width="88" height="80" rx="8" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5"/>
    <rect x="28" y="32" width="72" height="64" rx="4" fill="#f0f9ff" stroke="#0f172a" stroke-width="3"/>
    <!-- Stepped Horizontal Reinforcement Ribs along walls -->
    <g stroke="#38bdf8" stroke-width="2.5">
      <line x1="30" y1="42" x2="98" y2="42"/>
      <line x1="30" y1="52" x2="98" y2="52"/>
      <line x1="30" y1="64" x2="98" y2="64"/>
      <line x1="30" y1="76" x2="98" y2="76"/>
    </g>
    <!-- Snap-Button Locking Dimples on Lip -->
    <circle cx="34" cy="28" r="3.5" fill="#0284c7" stroke="#0f172a" stroke-width="2"/>
    <circle cx="94" cy="28" r="3.5" fill="#0284c7" stroke="#0f172a" stroke-width="2"/>
    <!-- Droplets of Brown Palm Sugar / Oil Residue Inside -->
    <ellipse cx="50" cy="58" rx="6" ry="4" fill="#78350f" stroke="#0f172a" stroke-width="1.5"/>
    <ellipse cx="76" cy="68" rx="5" ry="3.5" fill="#92400e" stroke="#0f172a" stroke-width="1.5"/>
    <circle cx="64" cy="62" r="2.5" fill="#ca8a04"/>
    <!-- Plastic Glare Reflections -->
    <line x1="26" y1="36" x2="90" y2="36" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="26" y1="88" x2="60" y2="88" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // 48. Pembalut Sanitasi Bekas Pakai (Wrapped Sanitary Pad with Side Wings & Adhesive Seal)
  item_sanitary_pad: `
  <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <!-- Folded Protective Wrapper Pouch (Soft Pink) -->
    <rect x="26" y="32" width="76" height="64" rx="10" fill="#fbcfe8" stroke="#0f172a" stroke-width="4.5"/>
    <!-- Flapped Closure Fold with Seal Tape -->
    <path d="M26 56 L64 74 L102 56" stroke="#0f172a" stroke-width="3.5" fill="none"/>
    <path d="M26 32 L64 54 L102 32 Z" fill="#f472b6" stroke="#0f172a" stroke-width="3"/>
    <!-- Easy-Open Blue Adhesive Tape Strip in Center -->
    <rect x="54" y="48" width="20" height="26" rx="3" fill="#2563eb" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="56" y1="60" x2="72" y2="60" stroke="#93c5fd" stroke-width="2"/>
    <!-- Wrapped Side Wings protruding slightly -->
    <path d="M18 52 C18 44 26 44 26 52 L26 76 C26 84 18 84 18 76 Z" fill="#f9a8d4" stroke="#0f172a" stroke-width="3.5"/>
    <path d="M110 52 C110 44 102 44 102 52 L102 76 C102 84 110 84 110 76 Z" fill="#f9a8d4" stroke="#0f172a" stroke-width="3.5"/>
    <!-- Embossed Pad Quilting Texture Lines -->
    <line x1="36" y1="42" x2="92" y2="42" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    <line x1="36" y1="84" x2="92" y2="84" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="4,4"/>
  </svg>`
};

console.log(`Starting generation of ${Object.keys(ITEMS).length} realistic cel-shaded waste item sprites...`);
let count = 0;
for (const [key, svg] of Object.entries(ITEMS)) {
  saveItemPng(key, svg.trim());
  count++;
}
console.log(`Finished generating all ${count} realistic waste item assets successfully!`);
