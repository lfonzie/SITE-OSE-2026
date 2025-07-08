import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export interface ImageOptimizationOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  format: 'webp' | 'jpeg' | 'png';
  progressive?: boolean;
}

export class ImageOptimizer {
  private static readonly DEFAULT_OPTIONS: ImageOptimizationOptions = {
    quality: 85,
    maxWidth: 1920,
    maxHeight: 1080,
    format: 'webp',
    progressive: true
  };

  static async optimizeImage(
    inputPath: string,
    outputPath: string,
    options: Partial<ImageOptimizationOptions> = {}
  ): Promise<void> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };

    try {
      let transformer = sharp(inputPath)
        .resize(opts.maxWidth, opts.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });

      switch (opts.format) {
        case 'webp':
          transformer = transformer.webp({
            quality: opts.quality,
            effort: 6 // Higher effort for better compression
          });
          break;
        case 'jpeg':
          transformer = transformer.jpeg({
            quality: opts.quality,
            progressive: opts.progressive,
            mozjpeg: true
          });
          break;
        case 'png':
          transformer = transformer.png({
            quality: opts.quality,
            compressionLevel: 9,
            progressive: opts.progressive
          });
          break;
      }

      await transformer.toFile(outputPath);
    } catch (error) {
      console.error('Error optimizing image:', error);
      throw error;
    }
  }

  static async generateResponsiveImages(
    inputPath: string,
    outputDir: string,
    baseName: string
  ): Promise<string[]> {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    const formats = ['webp', 'jpeg'];
    const generatedFiles: string[] = [];

    for (const size of sizes) {
      for (const format of formats) {
        const outputPath = path.join(outputDir, `${baseName}_${size}w.${format}`);
        
        try {
          await this.optimizeImage(inputPath, outputPath, {
            maxWidth: size,
            maxHeight: Math.round(size * 0.75), // 4:3 aspect ratio
            format: format as 'webp' | 'jpeg',
            quality: format === 'webp' ? 85 : 80
          });
          
          generatedFiles.push(outputPath);
        } catch (error) {
          console.error(`Failed to generate ${format} image at ${size}w:`, error);
        }
      }
    }

    return generatedFiles;
  }

  static async optimizeExistingImages(directory: string): Promise<void> {
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    
    try {
      const files = fs.readdirSync(directory);
      
      for (const file of files) {
        const filePath = path.join(directory, file);
        const ext = path.extname(file).toLowerCase();
        
        if (imageExtensions.includes(ext)) {
          const baseName = path.basename(file, ext);
          const webpPath = path.join(directory, `${baseName}.webp`);
          
          // Only create WebP if it doesn't exist
          if (!fs.existsSync(webpPath)) {
            try {
              await this.optimizeImage(filePath, webpPath, {
                format: 'webp',
                quality: 85
              });
              console.log(`✅ Created WebP version: ${baseName}.webp`);
            } catch (error) {
              console.error(`❌ Failed to create WebP for ${file}:`, error);
            }
          }
          
          // Generate responsive versions if the original is large
          const stats = fs.statSync(filePath);
          if (stats.size > 500 * 1024) { // 500KB threshold
            try {
              await this.generateResponsiveImages(filePath, directory, baseName);
              console.log(`✅ Generated responsive images for: ${file}`);
            } catch (error) {
              console.error(`❌ Failed to generate responsive images for ${file}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error optimizing existing images:', error);
    }
  }

  static async compressLargeImages(directory: string, maxSizeKB: number = 1000): Promise<void> {
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    
    try {
      const files = fs.readdirSync(directory);
      
      for (const file of files) {
        const filePath = path.join(directory, file);
        const ext = path.extname(file).toLowerCase();
        
        if (imageExtensions.includes(ext)) {
          const stats = fs.statSync(filePath);
          const sizeKB = stats.size / 1024;
          
          if (sizeKB > maxSizeKB) {
            const backupPath = filePath.replace(ext, `_original${ext}`);
            
            // Create backup if it doesn't exist
            if (!fs.existsSync(backupPath)) {
              fs.copyFileSync(filePath, backupPath);
            }
            
            // Compress the original
            try {
              await this.optimizeImage(backupPath, filePath, {
                format: ext.includes('png') ? 'png' : 'jpeg',
                quality: 75,
                maxWidth: 1920,
                maxHeight: 1080
              });
              
              const newStats = fs.statSync(filePath);
              const newSizeKB = newStats.size / 1024;
              const reduction = ((sizeKB - newSizeKB) / sizeKB * 100).toFixed(1);
              
              console.log(`✅ Compressed ${file}: ${sizeKB.toFixed(1)}KB → ${newSizeKB.toFixed(1)}KB (${reduction}% reduction)`);
            } catch (error) {
              console.error(`❌ Failed to compress ${file}:`, error);
              // Restore from backup if compression failed
              if (fs.existsSync(backupPath)) {
                fs.copyFileSync(backupPath, filePath);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error compressing large images:', error);
    }
  }
}