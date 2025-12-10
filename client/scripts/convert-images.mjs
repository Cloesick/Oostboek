import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

async function convertToWebP() {
  console.log('🖼️  Converting PNG images to WebP...\n');

  const files = await readdir(publicDir);
  const pngFiles = files.filter(f => f.endsWith('.png') && !f.startsWith('pwa-'));

  for (const file of pngFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.png', '.webp'));
    
    try {
      const info = await sharp(inputPath)
        .webp({ quality: 90, lossless: false })
        .toFile(outputPath);
      
      console.log(`✅ ${file} → ${file.replace('.png', '.webp')} (${Math.round(info.size / 1024)}KB)`);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }

  console.log('\n✨ Conversion complete!');
}

convertToWebP();
