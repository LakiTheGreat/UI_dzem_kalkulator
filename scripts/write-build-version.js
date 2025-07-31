const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');
const versionFilePath = path.join(__dirname, '../src/version.ts');

// Read and parse package.json
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Increment buildVersion
pkg.buildVersion =
  typeof pkg.buildVersion === 'number' ? pkg.buildVersion + 1 : 1;

// Write updated buildVersion back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');

// Create or overwrite src/version.ts
const content = `export const APP_VERSION = "${pkg.version}.${pkg.buildVersion}";\n`;
fs.writeFileSync(versionFilePath, content, 'utf8');

console.log(`✅ APP_VERSION set to: ${pkg.version}.${pkg.buildVersion}`);
