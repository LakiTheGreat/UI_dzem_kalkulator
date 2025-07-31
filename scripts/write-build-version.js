const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let version = 'dev';
try {
  version = execSync('git rev-list --count HEAD').toString().trim();
} catch {
  // fallback remains 'dev'
}

const versionFile = path.resolve(__dirname, '../src/version.ts');

fs.writeFileSync(
  versionFile,
  `export const APP_VERSION = "${version}";\n`,
  'utf8'
);

console.log(`✅ APP_VERSION set to: ${version}`);
