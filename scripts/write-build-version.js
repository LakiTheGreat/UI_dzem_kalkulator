const fs = require('fs');
const path = require('path');

const version = new Date().toISOString(); // or use package.json version if you prefer
const filePath = path.join(__dirname, '../src/version.ts');

const content = `export const APP_VERSION = "${version}";\n`;

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ APP_VERSION written to version.ts: ${version}`);
