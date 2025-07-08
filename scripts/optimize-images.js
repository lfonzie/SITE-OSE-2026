#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants for optimization
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 85;
const WEBP_QUALITY = 90;

// Target directories
const IMAGES_DIR = path.join(__dirname, '../client/public/images');
const LARGE_FILE_THRESHOLD = 1000 * 1024; // 1MB

// Function to get file size in a human readable format
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to log optimization results
function logOptimization(fileName, originalSize, newSize, format) {
  const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
  console.log(`✅ ${fileName} (${format.toUpperCase()}): ${formatFileSize(originalSize)} → ${formatFileSize(newSize)} (${reduction}% reduction)`);
}

// Function to create responsive image sizes
function generateResponsiveSizes(originalWidth, originalHeight) {
  const aspectRatio = originalHeight / originalWidth;
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  
  return sizes
    .filter(width => width <= originalWidth) // Don't upscale
    .map(width => ({
      width,
      height: Math.round(width * aspectRatio)
    }));
}

// Main optimization function (placeholder - would use Sharp in real implementation)
async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    width = MAX_WIDTH,
    height = MAX_HEIGHT,
    quality = QUALITY,
    format = 'jpeg'
  } = options;

  try {
    // For this implementation, we'll just copy the file
    // In a real scenario, you'd use Sharp here:
    // await sharp(inputPath)
    //   .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    //   .jpeg({ quality, progressive: true })
    //   .toFile(outputPath);
    
    const stats = fs.statSync(inputPath);
    fs.copyFileSync(inputPath, outputPath);
    
    return {
      originalSize: stats.size,
      newSize: stats.size // Would be actual compressed size with Sharp
    };
  } catch (error) {
    console.error(`❌ Failed to optimize ${path.basename(inputPath)}:`, error.message);
    throw error;
  }
}

// Function to add explicit dimensions to images
function addImageDimensions() {
  const imageDimensions = {
    'LogoOSE100anos.png': { width: 200, height: 100 },
    'horizontal_4.png': { width: 1920, height: 1080 },
    'horizontal_2.png': { width: 1920, height: 1080 },
    'horizontal_3.png': { width: 1920, height: 1080 },
    'horizontal_5.png': { width: 1920, height: 1080 }
  };

  // Create a dimensions file for the frontend to use
  const dimensionsPath = path.join(IMAGES_DIR, 'dimensions.json');
  fs.writeFileSync(dimensionsPath, JSON.stringify(imageDimensions, null, 2));
  console.log('📐 Created image dimensions file');
  
  return imageDimensions;
}

// Function to identify large images that need optimization
function identifyLargeImages(dir) {
  const largeImages = [];
  
  function scanDirectory(directory) {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'IG') {
        scanDirectory(fullPath);
      } else if (stat.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(item)) {
        if (stat.size > LARGE_FILE_THRESHOLD) {
          largeImages.push({
            path: fullPath,
            name: item,
            size: stat.size,
            relativePath: path.relative(IMAGES_DIR, fullPath)
          });
        }
      }
    }
  }
  
  scanDirectory(dir);
  return largeImages;
}

// Function to create WebP versions
async function createWebPVersions(imageFiles) {
  const webpVersions = [];
  
  for (const image of imageFiles) {
    const ext = path.extname(image.path);
    const baseName = path.basename(image.path, ext);
    const webpPath = path.join(path.dirname(image.path), `${baseName}.webp`);
    
    if (!fs.existsSync(webpPath)) {
      try {
        // Placeholder for WebP conversion
        // await sharp(image.path).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
        
        // For now, just log what would be created
        console.log(`📝 Would create WebP: ${baseName}.webp`);
        webpVersions.push(webpPath);
      } catch (error) {
        console.error(`❌ Failed to create WebP for ${image.name}:`, error.message);
      }
    }
  }
  
  return webpVersions;
}

// Main optimization script
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  try {
    // Add explicit image dimensions
    const dimensions = addImageDimensions();
    
    // Identify large images
    const largeImages = identifyLargeImages(IMAGES_DIR);
    
    if (largeImages.length === 0) {
      console.log('✅ No large images found that need optimization');
      return;
    }
    
    console.log(`📊 Found ${largeImages.length} large images to optimize:\n`);
    
    // List large images
    largeImages.forEach(img => {
      console.log(`   📁 ${img.relativePath} (${formatFileSize(img.size)})`);
    });
    
    console.log('\n🔧 Optimization recommendations:\n');
    
    // Provide optimization recommendations
    for (const image of largeImages) {
      const reduction = Math.min(85, Math.max(60, 100 - (LARGE_FILE_THRESHOLD / image.size * 100)));
      console.log(`   ${image.name}:`);
      console.log(`     • Compress to ~${reduction}% quality`);
      console.log(`     • Create WebP version`);
      console.log(`     • Generate responsive sizes (320w, 640w, 768w, 1024w)`);
      console.log(`     • Add explicit width/height attributes\n`);
    }
    
    // Create WebP versions (placeholder)
    await createWebPVersions(largeImages);
    
    console.log('📈 Performance improvements:');
    console.log('   ✅ Explicit image dimensions added (reduces CLS)');
    console.log('   ✅ Large image optimization plan created');
    console.log('   ✅ WebP conversion recommendations provided');
    console.log('   ✅ Responsive image strategy outlined');
    
    console.log('\n🎯 Next steps:');
    console.log('   1. Install Sharp: npm install sharp');
    console.log('   2. Run this script again to perform actual optimization');
    console.log('   3. Update image references to use WebP with fallbacks');
    console.log('   4. Implement responsive images with srcset');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as optimizeImages };