#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Read version from package.json
const packageJsonPath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Read README.md
const readmePath = join(process.cwd(), 'README.md');
let readme = readFileSync(readmePath, 'utf8');

// Check if badges already exist
const badgesRegex = /!\[npm version\].*!\[GitHub release\]/;

if (!badgesRegex.test(readme)) {
  // Find the title line and add version badge
  const titleRegex = /^(# @asafarim\/progress-bars)$/m;
  const replacement = `$1\n\n![npm version](https://img.shields.io/npm/v/@asafarim/progress-bars) ![GitHub release](https://img.shields.io/github/release/alisafari-it/progress-bars)`;

  if (titleRegex.test(readme)) {
    readme = readme.replace(titleRegex, replacement);
    
    // Write back to README.md
    writeFileSync(readmePath, readme);
    console.log(`✅ Added version badges for v${version} to README.md`);
  } else {
    console.log('❌ Could not find title in README.md');
  }
} else {
  console.log(`✅ Version badges already exist in README.md`);
}
