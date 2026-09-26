#!/usr/bin/env node

// Run from the trusted verifier checkout. Candidate files are read only as data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { digest, getPublicationInputs } = require('./lib/site-artifact-identity');
const { verifySiteArtifact } = require('./lib/site-artifacts');
const { verifyPreviewArtifact } = require('./lib/preview-artifacts');

try {
  const args = process.argv.slice(2);
  assert(
    args.length === 8 &&
      args[0] === '--bundle' &&
      args[2] === '--candidate' &&
      args[4] === '--revision' &&
      args[6] === '--trusted-config',
    'Usage: verify-preview-artifact --bundle DIRECTORY --candidate DIRECTORY --revision SHA --trusted-config FILE'
  );
  assert(/^[a-f0-9]{40}$/.test(args[5]), 'Invalid verified Preview revision');
  assert(fs.lstatSync(args[3]).isDirectory(), 'Candidate must be a real directory');
  const lockfile = path.join(args[3], 'package-lock.json');
  assert(fs.lstatSync(lockfile).isFile(), 'Candidate lockfile must be a regular file');
  const inputs = getPublicationInputs({
    sourceRevision: args[5],
    lockfileDigest: digest(fs.readFileSync(lockfile)),
    publicSettings: process.env
  });
  assert.equal(inputs.siteVariant, 'preview', 'Preview deployment requires Preview settings');
  assert.equal(inputs.crmMode, 'disabled', 'Preview deployment requires disabled CRM');
  const kind = JSON.parse(fs.readFileSync(path.join(args[1], 'manifest.json'), 'utf8')).kind;
  const verify = kind === 'preview' ? verifyPreviewArtifact : verifySiteArtifact;
  const manifest = verify(args[1], inputs, { trustedConfigPath: args[7] });
  console.log(`Verified Preview publication: ${manifest.inventory.sha256}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
