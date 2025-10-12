#!/usr/bin/env node

/**
 * Manage FAQ Routes Based on Environment Variable
 *
 * This script conditionally enables/disables FAQ routes by renaming directories:
 * - When NEXT_PUBLIC_FAQ !== 'true': Rename faq/ → _faq/ (Next.js ignores underscore-prefixed routes)
 * - When NEXT_PUBLIC_FAQ === 'true': Rename _faq/ → faq/ (restore active routes)
 *
 * This solves the Next.js static export issue where all route files must have
 * valid generateStaticParams() even when feature is disabled.
 */

const fs = require('fs');
const path = require('path');

/**
 * Safely rename directory (works across filesystems in Docker)
 * Uses copy + delete instead of rename to avoid EXDEV errors
 */
function safeRenameSync(oldPath, newPath) {
  if (!fs.existsSync(oldPath)) {
    return;
  }

  try {
    // Try native rename first (faster if on same filesystem)
    fs.renameSync(oldPath, newPath);
  } catch (err) {
    if (err.code === 'EXDEV') {
      // Cross-device error - use copy + delete approach
      copyDirSync(oldPath, newPath);
      fs.rmSync(oldPath, { recursive: true, force: true });
    } else {
      throw err;
    }
  }
}

/**
 * Recursively copy directory
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

const faqEnabled = process.env.NEXT_PUBLIC_FAQ === 'true';
const langDirs = fs.readdirSync(path.join(__dirname, '..', 'src', 'app'))
  .filter(name => name.startsWith('[') && name.includes('lang'));

console.log(`FAQ feature: ${faqEnabled ? 'ENABLED' : 'DISABLED'}`);

langDirs.forEach(langDir => {
  const basePath = path.join(__dirname, '..', 'src', 'app', langDir);
  const faqPath = path.join(basePath, 'faq');
  const disabledFaqPath = path.join(basePath, '_faq');

  if (faqEnabled) {
    // FAQ is enabled - ensure route is active (faq/ not _faq/)
    if (fs.existsSync(disabledFaqPath)) {
      console.log(`  Enabling FAQ routes: ${langDir}/_faq → ${langDir}/faq`);
      safeRenameSync(disabledFaqPath, faqPath);
    } else if (fs.existsSync(faqPath)) {
      console.log(`  FAQ routes already enabled: ${langDir}/faq`);
    }
  } else {
    // FAQ is disabled - ensure route is inactive (faq/ → _faq/)
    if (fs.existsSync(faqPath)) {
      console.log(`  Disabling FAQ routes: ${langDir}/faq → ${langDir}/_faq`);
      safeRenameSync(faqPath, disabledFaqPath);
    } else if (fs.existsSync(disabledFaqPath)) {
      console.log(`  FAQ routes already disabled: ${langDir}/_faq`);
    }
  }
});

console.log('FAQ route management complete\n');
