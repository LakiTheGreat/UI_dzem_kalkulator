const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get version from package.json
const pkg = require('../package.json');
const baseVersion = pkg.version;

// Get number of commits in the Git repository
let commitCount = 'dev';
try {
  commitCount = execSync('git rev-list --count HEAD').toString().trim();
} catch (err) {
  console.warn('⚠️ Could not get Git commit count. Falling back to "dev".');
}

// Generate final version string
const versionString = `${baseVersion}.${commitCount}`;

// Write to src/version.ts
const versionTsPath = path.join(__dirname, '../src/version.ts');
fs.writeFileSync(
  versionTsPath,
  `export const APP_VERSION = "${versionString}";\n`,
  'utf8'
);

console.log(`✅ Generated APP_VERSION = ${versionString}`);
