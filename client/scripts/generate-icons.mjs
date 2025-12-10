import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

async function generateIcons() {
  console.log('🖼️  Generating required icons...\n');

  const faviconSource = path.join(publicDir, 'favicon.webp');

  // Generate favicon.png (32x32 for browser tab)
  await sharp(faviconSource)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('✅ favicon.png (32x32)');

  // Generate favicon.ico alternative (16x16)
  await sharp(faviconSource)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16.png'));
  console.log('✅ favicon-16.png (16x16)');

  // Generate apple-touch-icon (180x180)
  await sharp(faviconSource)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png (180x180)');

  // Generate PWA icons
  await sharp(faviconSource)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✅ pwa-192x192.png');

  await sharp(faviconSource)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✅ pwa-512x512.png');

  // Optimize Oostboek logo (resize to reasonable size)
  const logoSource = path.join(publicDir, 'Oostboek.webp');
  await sharp(logoSource)
    .resize(200, null, { withoutEnlargement: true }) // max 200px width
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'logo.webp'));
  console.log('✅ logo.webp (optimized)');

  console.log('\n✨ All icons generated!');
}

generateIcons().catch(console.error);
