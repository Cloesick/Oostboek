import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

async function removeBackground() {
  console.log('🖼️  Removing background from Oostboek logo...\n');

  const inputPath = path.join(publicDir, 'Oostboek.webp');
  const outputPath = path.join(publicDir, 'Oostboek-nobg.webp');

  // Get image data
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  
  // Extract raw pixel data
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Create new buffer with transparency
  const newData = Buffer.alloc(data.length);
  
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = info.channels === 4 ? data[i + 3] : 255;

    // Detect dark blue background (RGB roughly 20-50, 30-60, 50-90)
    // Also detect the darker edges
    const isDarkBlue = (
      r < 80 && 
      g < 90 && 
      b < 120 && 
      b > r - 20 // Blue is dominant or close
    );

    if (isDarkBlue) {
      // Make transparent
      newData[i] = r;
      newData[i + 1] = g;
      newData[i + 2] = b;
      newData[i + 3] = 0; // Fully transparent
    } else {
      // Keep original
      newData[i] = r;
      newData[i + 1] = g;
      newData[i + 2] = b;
      newData[i + 3] = a;
    }
  }

  // Save with transparency
  await sharp(newData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .webp({ quality: 95, lossless: true })
    .toFile(outputPath);

  console.log(`✅ Created ${outputPath}`);
  
  // Also create optimized version
  const optimizedPath = path.join(publicDir, 'Oostboek-clean.webp');
  await sharp(outputPath)
    .trim() // Remove empty space around the logo
    .webp({ quality: 95 })
    .toFile(optimizedPath);
  
  console.log(`✅ Created trimmed version: ${optimizedPath}`);
  console.log('\n✨ Done! Replace Oostboek.webp with Oostboek-clean.webp if it looks good.');
}

removeBackground().catch(console.error);
