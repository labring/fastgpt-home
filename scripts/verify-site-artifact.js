#!/usr/bin/env node

const fs = require('node:fs');
const { verifySiteArtifact } = require('./lib/site-artifacts');

try {
  const args = process.argv.slice(2);
  if (
    ![4, 6].includes(args.length) ||
    args[0] !== '--bundle' ||
    args[2] !== '--identity' ||
    (args.length === 6 && args[4] !== '--trusted-config')
  ) {
    throw new Error(
      'Usage: verify-site-artifact --bundle <directory> --identity <expected-inputs.json> [--trusted-config <file>]'
    );
  }
  const manifest = verifySiteArtifact(
    args[1],
    JSON.parse(fs.readFileSync(args[3], 'utf8')),
    args.length === 6 ? { trustedConfigPath: args[5] } : undefined
  );
  console.log(
    `Verified ${manifest.publicationInputs.siteVariant} artifact: ${manifest.inventory.sha256}`
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
