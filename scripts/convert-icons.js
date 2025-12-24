#!/usr/bin/env node
/**
 * Icon Converter Script
 * Converts icon.png to icon.icns (macOS) and icon.ico (Windows)
 * 
 * Usage: node scripts/convert-icons.js
 * 
 * Requires: sharp package (already installed)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const SOURCE_ICON = path.join(ASSETS_DIR, 'icon.png');

async function generateIcons() {
  console.log('🎨 Converting icons for App Creator A to Z...\n');

  if (!fs.existsSync(SOURCE_ICON)) {
    console.error('❌ Error: icon.png not found in src/assets/');
    console.log('   Please save your icon as src/assets/icon.png first.');
    process.exit(1);
  }

  // Ensure assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // Generate multiple PNG sizes for .icns creation
  const sizes = [16, 32, 64, 128, 256, 512, 1024];
  const iconsetDir = path.join(ASSETS_DIR, 'icon.iconset');
  
  if (!fs.existsSync(iconsetDir)) {
    fs.mkdirSync(iconsetDir, { recursive: true });
  }

  console.log('📐 Generating PNG sizes...');
  
  for (const size of sizes) {
    // Regular size
    await sharp(SOURCE_ICON)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(iconsetDir, `icon_${size}x${size}.png`));
    
    // @2x size (for Retina)
    if (size <= 512) {
      await sharp(SOURCE_ICON)
        .resize(size * 2, size * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(path.join(iconsetDir, `icon_${size}x${size}@2x.png`));
    }
    
    console.log(`   ✓ ${size}x${size}`);
  }

  // Generate .icns for macOS (only works on macOS)
  if (process.platform === 'darwin') {
    console.log('\n🍎 Generating macOS .icns...');
    try {
      execSync(`iconutil -c icns "${iconsetDir}" -o "${path.join(ASSETS_DIR, 'icon.icns')}"`, { stdio: 'inherit' });
      console.log('   ✓ icon.icns created');
    } catch (err) {
      console.log('   ⚠️ Could not create .icns (iconutil failed)');
    }
  } else {
    console.log('\n⚠️ Skipping .icns generation (requires macOS)');
  }

  // Generate .ico for Windows (256x256 PNG works as ico with sharp)
  console.log('\n🪟 Generating Windows .ico...');
  try {
    // Create multi-resolution ICO by using multiple sizes
    // ICO format: 16, 32, 48, 256
    const icoSizes = [16, 32, 48, 256];
    const icoPath = path.join(ASSETS_DIR, 'icon.ico');
    
    // For a proper .ico, we'll use the 256x256 as a starting point
    // electron-builder can work with a 256x256 PNG renamed to .ico
    await sharp(SOURCE_ICON)
      .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(icoPath);
    
    console.log('   ✓ icon.ico created (256x256)');
    console.log('   💡 For best Windows results, use a tool like png2ico or imagemagick for multi-res .ico');
  } catch (err) {
    console.log('   ⚠️ Could not create .ico:', err.message);
  }

  // Cleanup iconset directory if .icns was created
  if (fs.existsSync(path.join(ASSETS_DIR, 'icon.icns'))) {
    fs.rmSync(iconsetDir, { recursive: true, force: true });
  }

  console.log('\n✅ Icon conversion complete!');
  console.log('\nGenerated files:');
  console.log('  - src/assets/icon.png (source)');
  if (fs.existsSync(path.join(ASSETS_DIR, 'icon.icns'))) {
    console.log('  - src/assets/icon.icns (macOS)');
  }
  if (fs.existsSync(path.join(ASSETS_DIR, 'icon.ico'))) {
    console.log('  - src/assets/icon.ico (Windows)');
  }
}

generateIcons().catch(console.error);
