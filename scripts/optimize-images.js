const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
    const imageDir = path.join(__dirname, '../images');
    const outputDir = path.join(__dirname, '../public/images');
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    const files = await fs.readdir(imageDir);
    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    const sizes = [320, 640, 960, 1280, 1920];
    
    for (const file of imageFiles) {
        const inputPath = path.join(imageDir, file);
        const filename = path.parse(file).name;
        
        // Process each size
        for (const width of sizes) {
            // WebP version
            await sharp(inputPath)
                .resize(width)
                .webp({ quality: 80 })
                .toFile(path.join(outputDir, `${filename}-${width}.webp`));
                
            // JPEG version
            await sharp(inputPath)
                .resize(width)
                .jpeg({ quality: 80, progressive: true })
                .toFile(path.join(outputDir, `${filename}-${width}.jpg`));
        }
        
        // Create placeholder blur
        await sharp(inputPath)
            .resize(20)
            .blur(10)
            .toFile(path.join(outputDir, `${filename}-placeholder.jpg`));
    }
}

optimizeImages().catch(console.error); 