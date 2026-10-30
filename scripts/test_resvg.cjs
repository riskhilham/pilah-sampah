const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const svg = '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#22c55e"/></svg>';
const resvg = new Resvg(svg);
const pngData = resvg.render();
fs.writeFileSync('scripts/test.png', pngData.asPng());
console.log('Saved scripts/test.png successfully!');

