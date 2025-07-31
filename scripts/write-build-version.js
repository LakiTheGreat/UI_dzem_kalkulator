// scripts/write-build-version.js
const fs = require('fs');
const { execSync } = require('child_process');

const commitCount = execSync('git rev-list --count HEAD').toString().trim();

const content = `export const BUILD_VERSION = "${commitCount}";\n`;

fs.writeFileSync('./src/version.ts', content);

console.log('✔ Build version set to', commitCount);
