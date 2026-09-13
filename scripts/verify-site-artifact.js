#!/usr/bin/env node

const fs = require('node:fs');
const { verifySiteArtifact } = require('./lib/site-artifacts');

try {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== '--bundle' || args[2] !== '--identity') {
    throw new Error('Usage: verify-site-artifact --bundle <directory> --identity <expected-inputs.json>');
  }
  const manifest = verifySiteArtifact(args[1], JSON.parse(fs.readFileSync(args[3], 'utf8')));
  console.log(`Verified ${manifest.identity.siteVariant} artifact: ${manifest.inventory.sha256}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
