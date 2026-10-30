const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

function savePng(svg, outPublic, outAssets) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render().asPng();
  fs.writeFileSync(outPublic, pngData);
  if (fs.existsSync(path.dirname(outAssets))) {
    fs.writeFileSync(outAssets, pngData);
  }
}

// ========================================================
// 1. GENERATE 4 CARTOON CEL-SHADED WHEELIE BINS (240x240)
// ========================================================

function generateBins() {
  const bins = [
    {
      key: 'bin_organic',
      mainColor: '#16a34a',
      darkColor: '#15803d',
      lightColor: '#4ade80',
      lidColor: '#22c55e',
      rimGlow: '#86efac',
      title: 'ORGANIK',
      iconSvg: `
        <circle cx="120" cy="145" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <path d="M120 128 C134 133 138 147 132 158 C124 165 110 162 108 148 C106 136 114 130 120 128 Z" fill="#16a34a" stroke="#0f172a" stroke-width="3"/>
        <path d="M120 134 C120 148 116 156 114 160" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M112 148 C122 142 128 144 132 145" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      `
    },
    {
      key: 'bin_recycle',
      mainColor: '#0284c7',
      darkColor: '#0369a1',
      lightColor: '#38bdf8',
      lidColor: '#0ea5e9',
      rimGlow: '#7dd3fc',
      title: 'DAUR ULANG',
      iconSvg: `
        <circle cx="120" cy="145" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <g stroke="#0284c7" stroke-width="4" fill="none" stroke-linejoin="round" stroke-linecap="round">
          <path d="M110 130 L126 130 L120 122 M126 130 L120 138"/>
          <path d="M132 142 L124 156 L131 158 M124 156 L118 150"/>
          <path d="M114 156 L108 142 L102 146 M108 142 L116 138"/>
        </g>
      `
    },
    {
      key: 'bin_hazard',
      mainColor: '#dc2626',
      darkColor: '#b91c1c',
      lightColor: '#f87171',
      lidColor: '#ef4444',
      rimGlow: '#fca5a5',
      title: 'B3 BAHAYA',
      iconSvg: `
        <circle cx="120" cy="145" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <path d="M120 125 L140 158 L100 158 Z" fill="#facc15" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
        <circle cx="120" cy="138" r="4" fill="#0f172a"/>
        <line x1="120" y1="144" x2="120" y2="149" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
        <circle cx="120" cy="154" r="2" fill="#0f172a"/>
      `
    },
    {
      key: 'bin_residual',
      mainColor: '#334155',
      darkColor: '#1e293b',
      lightColor: '#64748b',
      lidColor: '#475569',
      rimGlow: '#94a3b8',
      title: 'RESIDU',
      iconSvg: `
        <circle cx="120" cy="145" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <path d="M116 130 C114 126 126 126 124 130 C128 132 134 136 135 146 C136 156 128 162 120 162 C112 162 104 156 105 146 C106 136 112 132 116 130 Z" fill="#334155" stroke="#0f172a" stroke-width="3"/>
        <path d="M116 133 L124 133" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>
      `
    }
  ];

  bins.forEach(b => {
    const svg = `
    <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad_shadow_${b.key}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#050a12" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#050a12" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="grad_body_${b.key}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${b.lightColor}"/>
          <stop offset="35%" stop-color="${b.mainColor}"/>
          <stop offset="100%" stop-color="${b.darkColor}"/>
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="222" rx="76" ry="14" fill="url(#grad_shadow_${b.key})"/>

      <g>
        <ellipse cx="62" cy="204" rx="14" ry="14" fill="#0f172a" stroke="#020617" stroke-width="3"/>
        <circle cx="62" cy="204" r="6" fill="#64748b"/>
        <circle cx="62" cy="204" r="2.5" fill="#e2e8f0"/>
      </g>
      <g>
        <ellipse cx="178" cy="204" rx="14" ry="14" fill="#0f172a" stroke="#020617" stroke-width="3"/>
        <circle cx="178" cy="204" r="6" fill="#64748b"/>
        <circle cx="178" cy="204" r="2.5" fill="#e2e8f0"/>
      </g>

      <path d="M68 65 L172 65 L160 206 L80 206 Z" fill="url(#grad_body_${b.key})" stroke="#0f172a" stroke-width="5" stroke-linejoin="round"/>
      <path d="M86 78 L94 196" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.35"/>
      <path d="M120 78 L120 114" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
      <path d="M154 78 L146 196" stroke="#0f172a" stroke-width="3" stroke-linecap="round" opacity="0.3"/>

      <rect x="106" y="202" width="28" height="8" rx="2" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>

      ${b.iconSvg}

      <path d="M60 54 L180 54 L174 68 L66 68 Z" fill="${b.lidColor}" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M64 57 L176 57" stroke="${b.rimGlow}" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>

      <ellipse cx="120" cy="53" rx="55" ry="12" fill="#09101d" stroke="#0f172a" stroke-width="3.5"/>
      <ellipse cx="120" cy="54" rx="46" ry="8" fill="#05080f"/>
      <ellipse cx="120" cy="54" rx="42" ry="5" fill="${b.darkColor}" opacity="0.75"/>

      <path d="M52 42 L188 42 L182 54 L58 54 Z" fill="${b.lidColor}" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
      <rect x="98" y="32" width="44" height="12" rx="4" fill="${b.darkColor}" stroke="#0f172a" stroke-width="3.5"/>
      <rect x="104" y="34" width="32" height="4" rx="2" fill="#ffffff" opacity="0.4"/>
    </svg>
    `;

    savePng(
      svg,
      `public/assets/environment/${b.key}.png`,
      `assets/environment/${b.key}.png`
    );
    console.log(`Generated bin: ${b.key}.png`);
  });
}

// ========================================================
// 2. GENERATE 16 NEW 2D CEL-SHADED WASTE ITEMS (128x128)
// ========================================================

function generateItems() {
  const items = [
    // --- ORGANIK (4 Baru) ---
    {
      key: 'item_bread_crust',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="40" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M36 40 C34 26 50 24 64 24 C78 24 94 26 92 40 L96 90 C96 98 88 104 64 104 C40 104 32 98 32 90 Z" fill="#b45309" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M42 42 C40 32 52 30 64 30 C76 30 88 32 86 42 L89 86 C89 92 82 96 64 96 C46 96 39 92 39 86 Z" fill="#fef3c7" stroke="#0f172a" stroke-width="3"/>
        <circle cx="52" cy="54" r="7" fill="#15803d" stroke="#0f172a" stroke-width="2"/>
        <circle cx="50" cy="52" r="2.5" fill="#86efac"/>
        <circle cx="74" cy="72" r="8" fill="#16a34a" stroke="#0f172a" stroke-width="2"/>
        <circle cx="72" cy="70" r="3" fill="#86efac"/>
        <circle cx="58" cy="80" r="5" fill="#15803d" stroke="#0f172a" stroke-width="1.5"/>
      </svg>
      `
    },
    {
      key: 'item_corn_cob',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="114" rx="44" ry="7" fill="#0f172a" opacity="0.25"/>
        <g transform="rotate(-30 64 64)">
          <path d="M25 80 C20 100 40 105 50 95 C45 80 35 75 25 80 Z" fill="#65a30d" stroke="#0f172a" stroke-width="3.5"/>
          <path d="M45 95 C55 110 75 105 70 85" fill="#4d7c0f" stroke="#0f172a" stroke-width="3.5"/>
          <rect x="35" y="25" width="30" height="70" rx="14" fill="#eab308" stroke="#0f172a" stroke-width="4"/>
          <line x1="45" y1="28" x2="45" y2="92" stroke="#ca8a04" stroke-width="2"/>
          <line x1="55" y1="28" x2="55" y2="92" stroke="#ca8a04" stroke-width="2"/>
          <line x1="36" y1="42" x2="64" y2="42" stroke="#ca8a04" stroke-width="2"/>
          <line x1="36" y1="56" x2="64" y2="56" stroke="#ca8a04" stroke-width="2"/>
          <line x1="36" y1="70" x2="64" y2="70" stroke="#ca8a04" stroke-width="2"/>
          <line x1="36" y1="84" x2="64" y2="84" stroke="#ca8a04" stroke-width="2"/>
          <circle cx="40" cy="36" r="2.5" fill="#fef08a"/>
          <circle cx="50" cy="50" r="2.5" fill="#fef08a"/>
          <circle cx="40" cy="64" r="2.5" fill="#fef08a"/>
        </g>
      </svg>
      `
    },
    {
      key: 'item_tea_bag',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="36" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M64 45 C64 25 80 18 90 28" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="85" y="24" width="22" height="16" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" transform="rotate(15 96 32)"/>
        <path d="M92 32 C96 28 100 32 98 36" fill="#16a34a"/>
        <path d="M46 45 L82 45 L90 102 L38 102 Z" fill="#d97706" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M50 48 L78 48 L84 98 L44 98 Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
        <rect x="58" y="42" width="12" height="5" rx="1.5" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="56" cy="74" r="8" fill="#78350f" opacity="0.8"/>
        <circle cx="72" cy="84" r="10" fill="#451a03" opacity="0.8"/>
        <circle cx="68" cy="65" r="6" fill="#451a03" opacity="0.7"/>
      </svg>
      `
    },
    {
      key: 'item_coffee_grounds',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="110" rx="42" ry="9" fill="#0f172a" opacity="0.25"/>
        <path d="M30 46 L98 46 L82 98 L46 98 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M36 46 C45 42 83 42 92 46 L78 92 L50 92 Z" fill="#3e2723" stroke="#0f172a" stroke-width="2.5"/>
        <ellipse cx="64" cy="46" rx="28" ry="8" fill="#4e342e" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="56" cy="45" r="2.5" fill="#1b0000"/>
        <circle cx="68" cy="47" r="3" fill="#1b0000"/>
        <circle cx="62" cy="44" r="2" fill="#795548"/>
        <circle cx="74" cy="45" r="2" fill="#795548"/>
        <path d="M64 100 C62 104 62 108 64 110 C66 108 66 104 64 100 Z" fill="#3e2723"/>
      </svg>
      `
    },

    // --- DAUR ULANG (4 Baru) ---
    {
      key: 'item_glass_jar',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="38" ry="8" fill="#0f172a" opacity="0.25"/>
        <rect x="42" y="24" width="44" height="14" rx="3" fill="#f59e0b" stroke="#0f172a" stroke-width="4"/>
        <line x1="48" y1="31" x2="80" y2="31" stroke="#fef3c7" stroke-width="2"/>
        <path d="M46 38 L82 38 C94 38 96 46 96 54 L96 96 C96 104 88 108 64 108 C40 108 32 104 32 96 L32 54 C32 46 34 38 46 38 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M40 54 L40 96 C40 100 44 102 50 102" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
        <line x1="48" y1="52" x2="48" y2="84" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="68" cy="74" r="14" fill="#38bdf8" opacity="0.3"/>
        <path d="M64 68 L72 68 L68 64 M72 74 L68 80 L64 76" stroke="#0284c7" stroke-width="2" fill="none"/>
      </svg>
      `
    },
    {
      key: 'item_metal_can_food',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="40" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M38 44 L90 44 L90 98 C90 106 80 110 64 110 C48 110 38 106 38 98 Z" fill="#94a3b8" stroke="#0f172a" stroke-width="4.5"/>
        <path d="M38 44 L90 44 L90 98 C90 106 80 110 64 110 C48 110 38 106 38 98 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="4.5"/>
        <ellipse cx="64" cy="44" rx="26" ry="10" fill="#e2e8f0" stroke="#0f172a" stroke-width="4"/>
        <ellipse cx="64" cy="44" rx="20" ry="7" fill="#64748b" stroke="#0f172a" stroke-width="2"/>
        <circle cx="64" cy="44" r="5" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
        <path d="M39 64 C50 67 78 67 89 64" stroke="#64748b" stroke-width="3" fill="none"/>
        <path d="M39 80 C50 83 78 83 89 80" stroke="#64748b" stroke-width="3" fill="none"/>
        <line x1="44" y1="46" x2="44" y2="102" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      </svg>
      `
    },
    {
      key: 'item_cardboard_cup',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="36" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M40 32 L88 32 C92 32 94 36 92 40 L90 44 L38 44 L36 40 C34 36 36 32 40 32 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
        <rect x="58" y="27" width="12" height="6" rx="2" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
        <path d="M40 44 L88 44 L78 106 L50 106 Z" fill="#d97706" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M43 60 L85 60 L81 88 L47 88 Z" fill="#16a34a" stroke="#0f172a" stroke-width="3.5"/>
        <circle cx="64" cy="74" r="8" fill="#ffffff"/>
        <path d="M64 68 C68 70 70 75 67 78 C63 80 60 76 64 68 Z" fill="#16a34a"/>
        <line x1="46" y1="46" x2="52" y2="102" stroke="#ffffff" stroke-width="2.5" opacity="0.5"/>
      </svg>
      `
    },
    {
      key: 'item_shampoo_bottle',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="114" rx="38" ry="8" fill="#0f172a" opacity="0.25"/>
        <rect x="61" y="20" width="6" height="12" fill="#0284c7" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M50 20 L78 20 C78 16 74 14 64 14 L48 14 Z" fill="#38bdf8" stroke="#0f172a" stroke-width="3"/>
        <rect x="56" y="28" width="16" height="8" rx="2" fill="#0284c7" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M48 36 L80 36 C92 36 94 48 94 62 L94 98 C94 106 86 110 64 110 C42 110 34 106 34 98 L34 62 C34 48 36 36 48 36 Z" fill="#06b6d4" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <rect x="44" y="58" width="40" height="32" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <text x="64" y="78" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#0891b2" text-anchor="middle">HDPE</text>
        <line x1="42" y1="44" x2="42" y2="100" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
      `
    },

    // --- B3 BAHAYA (4 Baru) ---
    {
      key: 'item_broken_glass',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="42" ry="8" fill="#0f172a" opacity="0.25"/>
        <polygon points="28,96 50,30 76,82 60,104" fill="#bae6fd" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <polygon points="34,92 50,38 70,80 58,98" fill="#e0f2fe" opacity="0.8"/>
        <polygon points="72,106 82,46 106,78 96,102" fill="#7dd3fc" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="56,110 66,94 74,108" fill="#38bdf8" stroke="#0f172a" stroke-width="3"/>
        <path d="M50 30 L52 22 L54 30 L62 32 L54 34 L52 42 L50 34 L42 32 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="94" cy="38" r="14" fill="#ef4444" stroke="#0f172a" stroke-width="3"/>
        <line x1="88" y1="38" x2="100" y2="38" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      </svg>
      `
    },
    {
      key: 'item_electronics_mouse',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="38" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M64 42 C64 26 80 18 84 10" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <circle cx="84" cy="10" r="3" fill="#ef4444"/>
        <path d="M42 50 C42 36 86 36 86 50 L88 88 C88 104 40 104 40 88 Z" fill="#64748b" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <line x1="64" y1="40" x2="64" y2="66" stroke="#0f172a" stroke-width="3"/>
        <rect x="60" y="46" width="8" height="14" rx="3" fill="#0f172a"/>
        <path d="M44 76 L54 84 L46 90 L52 94" fill="none" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
        <line x1="48" y1="52" x2="48" y2="94" stroke="#ffffff" stroke-width="2.5" opacity="0.4"/>
      </svg>
      `
    },
    {
      key: 'item_paint_can',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="42" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M30 60 C30 20 98 20 98 60" fill="none" stroke="#475569" stroke-width="3.5"/>
        <path d="M34 46 L94 46 L92 102 C92 108 80 112 64 112 C48 112 36 108 36 102 Z" fill="#94a3b8" stroke="#0f172a" stroke-width="4.5"/>
        <ellipse cx="64" cy="46" rx="30" ry="8" fill="#cbd5e1" stroke="#0f172a" stroke-width="3.5"/>
        <path d="M46 46 L46 76 C46 82 54 82 54 74 L54 46" fill="#eab308" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M68 46 L68 84 C68 90 76 90 76 80 L76 46" fill="#eab308" stroke="#0f172a" stroke-width="2.5"/>
        <rect x="56" y="66" width="16" height="16" fill="#dc2626" stroke="#0f172a" stroke-width="2" transform="rotate(45 64 74)"/>
        <path d="M64 68 C67 72 68 76 64 78 C61 76 62 72 64 68 Z" fill="#facc15"/>
      </svg>
      `
    },
    {
      key: 'item_syringe',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="38" ry="8" fill="#0f172a" opacity="0.25"/>
        <g transform="rotate(-40 64 64)">
          <rect x="60" y="8" width="8" height="30" fill="#94a3b8" stroke="#0f172a" stroke-width="2.5"/>
          <rect x="50" y="6" width="28" height="6" rx="2" fill="#0284c7" stroke="#0f172a" stroke-width="2.5"/>
          <rect x="52" y="36" width="24" height="52" rx="3" fill="#e0f2fe" stroke="#0f172a" stroke-width="4"/>
          <rect x="44" y="34" width="40" height="6" rx="2" fill="#0284c7" stroke="#0f172a" stroke-width="2.5"/>
          <line x1="52" y1="46" x2="60" y2="46" stroke="#0284c7" stroke-width="2"/>
          <line x1="52" y1="56" x2="64" y2="56" stroke="#0284c7" stroke-width="2"/>
          <line x1="52" y1="66" x2="60" y2="66" stroke="#0284c7" stroke-width="2"/>
          <line x1="52" y1="76" x2="64" y2="76" stroke="#0284c7" stroke-width="2"/>
          <rect x="60" y="88" width="8" height="8" fill="#f97316" stroke="#0f172a" stroke-width="2"/>
          <line x1="64" y1="96" x2="64" y2="120" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        </g>
      </svg>
      `
    },

    // --- RESIDU (4 Baru) ---
    {
      key: 'item_bubble_wrap',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="42" ry="8" fill="#0f172a" opacity="0.25"/>
        <path d="M28 42 L94 34 L104 94 L34 102 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M34 46 L90 40 L98 90 L40 96 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
        <circle cx="48" cy="54" r="7" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="46" cy="52" r="2.5" fill="#38bdf8"/>
        <circle cx="68" cy="52" r="7" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="66" cy="50" r="2.5" fill="#38bdf8"/>
        <circle cx="86" cy="50" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="56" cy="70" r="7" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="54" cy="68" r="2.5" fill="#38bdf8"/>
        <circle cx="78" cy="68" r="7" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="76" cy="66" r="2.5" fill="#38bdf8"/>
        <circle cx="48" cy="86" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="68" cy="84" r="7" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="66" cy="82" r="2.5" fill="#38bdf8"/>
      </svg>
      `
    },
    {
      key: 'item_broken_ceramic',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="42" ry="8" fill="#0f172a" opacity="0.25"/>
        <polygon points="32,98 56,26 98,64 88,104" fill="#ffffff" stroke="#0f172a" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M50 42 C56 50 54 62 60 72 C64 78 74 82 82 86" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round"/>
        <circle cx="56" cy="52" r="4" fill="#2563eb"/>
        <circle cx="66" cy="74" r="3.5" fill="#2563eb"/>
        <line x1="88" y1="104" x2="32" y2="98" stroke="#cbd5e1" stroke-width="3.5"/>
        <path d="M60 72 L70 66" stroke="#1d4ed8" stroke-width="2.5"/>
      </svg>
      `
    },
    {
      key: 'item_mika_plastic',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="44" ry="8" fill="#0f172a" opacity="0.25"/>
        <polygon points="26,62 46,38 98,38 104,62 94,98 32,98" fill="#f8fafc" stroke="#0f172a" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="32,64 48,44 92,44 98,64 90,92 38,92" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
        <line x1="38" y1="64" x2="94" y2="64" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="64" cy="76" rx="16" ry="8" fill="#ea580c" opacity="0.45"/>
        <ellipse cx="58" cy="74" rx="8" ry="4" fill="#f97316" opacity="0.5"/>
        <rect x="28" y="58" width="8" height="3" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>
      </svg>
      `
    },
    {
      key: 'item_sanitary_pad',
      svg: `
      <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="112" rx="38" ry="8" fill="#0f172a" opacity="0.25"/>
        <rect x="36" y="44" width="56" height="58" rx="8" fill="#f8fafc" stroke="#0f172a" stroke-width="4.5"/>
        <line x1="36" y1="62" x2="92" y2="62" stroke="#cbd5e1" stroke-width="3"/>
        <line x1="36" y1="80" x2="92" y2="80" stroke="#cbd5e1" stroke-width="3"/>
        <rect x="52" y="56" width="24" height="14" rx="2" fill="#ec4899" stroke="#0f172a" stroke-width="2"/>
        <path d="M58 63 L70 63" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <circle cx="82" cy="50" r="4" fill="#64748b"/>
      </svg>
      `
    }
  ];

  items.forEach(item => {
    savePng(
      item.svg,
      `public/assets/items/${item.key}.png`,
      `assets/items/${item.key}.png`
    );
    console.log(`Generated item: ${item.key}.png`);
  });
}

generateBins();
generateItems();
