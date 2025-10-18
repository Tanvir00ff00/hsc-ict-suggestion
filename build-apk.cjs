const https = require('https');
const fs = require('fs');
const path = require('path');

// PWA Builder API endpoint
const pwaBuilderUrl = 'https://pwabuilder-api.azurewebsites.net/api/generate';

// Your website URL
const websiteUrl = 'https://hsc-ict.vercel.app';

// App configuration
const appConfig = {
  url: websiteUrl,
  platform: 'android',
  packageId: 'com.tanvir.hscict2026',
  name: 'HSC ICT 2026',
  shortName: 'ICT 2026',
  description: 'HSC 2026 ICT Suggestion - A comprehensive study platform for HSC ICT students',
  backgroundColor: '#ffffff',
  themeColor: '#3b82f6',
  display: 'standalone',
  orientation: 'portrait-primary',
  startUrl: '/',
  scope: '/',
  lang: 'bn',
  dir: 'ltr'
};

// Function to make API request
function generateAPK() {
  const postData = JSON.stringify(appConfig);
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('🚀 Generating APK using PWA Builder API...');
  console.log('📱 App Name:', appConfig.name);
  console.log('🌐 Website URL:', appConfig.url);
  console.log('📦 Package ID:', appConfig.packageId);

  const req = https.request(pwaBuilderUrl, options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.downloadUrl) {
          console.log('✅ APK generated successfully!');
          console.log('📥 Download URL:', response.downloadUrl);
          console.log('📱 APK Size:', response.size || 'Unknown');
          
          // Save download info to file
          const downloadInfo = {
            downloadUrl: response.downloadUrl,
            appName: appConfig.name,
            packageId: appConfig.packageId,
            generatedAt: new Date().toISOString(),
            size: response.size
          };
          
          fs.writeFileSync('apk-download-info.json', JSON.stringify(downloadInfo, null, 2));
          console.log('💾 Download info saved to apk-download-info.json');
          
        } else {
          console.log('❌ APK generation failed');
          console.log('Response:', response);
        }
      } catch (error) {
        console.log('❌ Error parsing response:', error.message);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Request failed:', error.message);
  });

  req.write(postData);
  req.end();
}

// Alternative: Create a simple download script
function createDownloadScript() {
  const downloadScript = `
# HSC ICT 2026 APK Download Script

## Manual APK Generation Steps:

1. **Visit PWA Builder**: https://www.pwabuilder.com/
2. **Enter your website URL**: ${websiteUrl}
3. **Click "Start"**
4. **Select Android platform**
5. **Configure app settings**:
   - App Name: ${appConfig.name}
   - Package ID: ${appConfig.packageId}
   - Short Name: ${appConfig.shortName}
   - Description: ${appConfig.description}
   - Background Color: ${appConfig.backgroundColor}
   - Theme Color: ${appConfig.themeColor}
6. **Click "Generate"**
7. **Download the APK file**

## App Configuration:
- **App Name**: ${appConfig.name}
- **Package ID**: ${appConfig.packageId}
- **Website URL**: ${appConfig.url}
- **Description**: ${appConfig.description}
- **Theme**: Blue gradient with Bengali language support

## Features:
- ✅ Offline functionality
- ✅ Push notifications
- ✅ App shortcuts
- ✅ Bengali language support
- ✅ Dark/Light theme
- ✅ Global search
- ✅ Interactive questions
- ✅ Responsive design

## Installation:
1. Download the APK file
2. Enable "Install from unknown sources" in Android settings
3. Install the APK file
4. Launch "HSC ICT 2026" app

Generated on: ${new Date().toLocaleString()}
`;

  fs.writeFileSync('APK-Generation-Guide.md', downloadScript);
  console.log('📝 Created APK generation guide: APK-Generation-Guide.md');
}

// Run the script
console.log('🎯 HSC ICT 2026 APK Generation');
console.log('================================');

// Try API first, then create manual guide
generateAPK();

// Also create manual guide as backup
setTimeout(() => {
  createDownloadScript();
}, 2000);
