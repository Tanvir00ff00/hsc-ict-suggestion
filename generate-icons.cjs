const fs = require('fs');
const path = require('path');

// Create different sized icons from the logo
const sizes = [16, 32, 48, 72, 96, 144, 192, 512];

// For now, we'll create placeholder files
// In a real scenario, you would use ImageMagick or similar to resize the logo
const publicDir = path.join(__dirname, 'client', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create placeholder icon files
sizes.forEach(size => {
  const iconPath = path.join(publicDir, `icon-${size}x${size}.png`);
  
  // Create a simple placeholder file (in real scenario, resize the actual logo)
  if (!fs.existsSync(iconPath)) {
    // Copy the original logo as placeholder
    const logoPath = path.join(__dirname, 'logo.png');
    if (fs.existsSync(logoPath)) {
      fs.copyFileSync(logoPath, iconPath);
      console.log(`Created icon-${size}x${size}.png`);
    }
  }
});

// Create favicon.ico (copy from 32x32)
const faviconPath = path.join(publicDir, 'favicon.ico');
const icon32Path = path.join(publicDir, 'icon-32x32.png');
if (fs.existsSync(icon32Path) && !fs.existsSync(faviconPath)) {
  fs.copyFileSync(icon32Path, faviconPath);
  console.log('Created favicon.ico');
}

console.log('Icon generation completed!');
