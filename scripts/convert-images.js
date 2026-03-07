const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = './public/images';
const extensions = ['.png', '.jpg', '.jpeg'];

async function convertImages(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await convertImages(filePath);
      continue;
    }
    
    const ext = path.extname(file).toLowerCase();
    if (!extensions.includes(ext)) continue;
    
    const baseName = path.basename(file, ext);
    const webpPath = path.join(dir, `${baseName}.webp`);
    const avifPath = path.join(dir, `${baseName}.avif`);
    
    try {
      // 转换为 WebP
      if (!fs.existsSync(webpPath)) {
        await sharp(filePath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        console.log(`✅ Created: ${webpPath}`);
      }
      
      // 转换为 AVIF
      if (!fs.existsSync(avifPath)) {
        await sharp(filePath)
          .avif({ quality: 80 })
          .toFile(avifPath);
        console.log(`✅ Created: ${avifPath}`);
      }
    } catch (error) {
      console.error(`❌ Error converting ${filePath}:`, error.message);
    }
  }
}

console.log('🚀 Starting image conversion...');
convertImages(imageDir).then(() => {
  console.log('✅ All images converted!');
}).catch(error => {
  console.error('❌ Conversion failed:', error);
  process.exit(1);
});
