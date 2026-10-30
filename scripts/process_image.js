import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

export async function processItemImage(srcPath, destPath, options = {}) {
  const threshold = options.threshold || 240; // white threshold
  const targetSize = options.size || 128;

  const image = await Jimp.read(srcPath);
  
  // Resize to target size with bicubic interpolation
  image.resize(targetSize, targetSize);

  // Scan and remove white background
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // Check if pixel is near-white (background)
    if (r >= threshold && g >= threshold && b >= threshold) {
      this.bitmap.data[idx + 3] = 0; // Transparent
    } else {
      // Smooth feathering on edges near threshold
      if (r >= threshold - 15 && g >= threshold - 15 && b >= threshold - 15) {
        const factor = (255 - ((r + g + b) / 3)) / 15;
        this.bitmap.data[idx + 3] = Math.min(255, Math.max(0, Math.floor(factor * 255)));
      }
    }
  });

  // Ensure destination directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  await image.writeAsync(destPath);
  console.log(`Saved transparent PNG: ${destPath}`);
}

// Test with apple core if called directly
const src = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\c74621eb-6c59-4e3a-bd2a-5a4b9c768b66\\item_apple_core_1793286732833.jpg';
const dest = 'c:\\laragon\\www\\mpi\\game2\\assets\\items\\item_apple_core.png';

if (fs.existsSync(src)) {
  processItemImage(src, dest)
    .then(() => console.log('Successfully processed apple core!'))
    .catch(err => console.error('Error:', err));
}

