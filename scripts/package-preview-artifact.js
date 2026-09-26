#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { inventoryPayload } = require('./lib/site-artifacts');
const { getPublicationInputs } = require('./lib/site-artifact-identity');

function readSource(revision) {
  let event = {};
  if (process.env.GITHUB_EVENT_PATH && fs.existsSync(process.env.GITHUB_EVENT_PATH)) {
    event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  }
  const pullRequest = event.pull_request;
  return {
    event: process.env.GITHUB_EVENT_NAME || 'unknown',
    runId: process.env.GITHUB_RUN_ID || '',
    runAttempt: process.env.GITHUB_RUN_ATTEMPT || '',
    revision,
    baseRevision: pullRequest?.base?.sha || '',
    headRevision: pullRequest?.head?.sha || ''
  };
}

function packagePreviewArtifact(root = process.cwd()) {
  const destination = path.join(root, '.release-artifacts/site/preview-disabled');
  const identity = JSON.parse(
    fs.readFileSync(path.join(root, '.next/cache/site-identity.json'), 'utf8')
  );
  assert.equal(identity.siteVariant, 'preview', 'Preview artifact requires Preview settings');
  assert.equal(identity.crmMode, 'disabled', 'Preview artifact requires disabled CRM');
  const out = path.join(root, 'out');
  assert(fs.lstatSync(out).isDirectory(), 'Preview export must be a real directory');
  for (const file of ['index.html', '404.html', 'robots.txt']) {
    assert(fs.statSync(path.join(out, file)).isFile(), `Missing preview artifact: ${file}`);
  }

  const publicationInputs = getPublicationInputs(identity);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const staging = fs.mkdtempSync(`${destination}.staging-`);
  try {
    const payload = path.join(staging, 'payload');
    fs.mkdirSync(payload, { recursive: true });
    fs.cpSync(out, path.join(payload, 'out'), { recursive: true });
    fs.copyFileSync(path.join(root, 'wrangler.json'), path.join(payload, 'wrangler.json'));
    const manifest = {
      kind: 'preview',
      schemaVersion: 1,
      source: readSource(identity.sourceRevision),
      publicationInputs,
      inventory: inventoryPayload(payload)
    };
    fs.writeFileSync(path.join(staging, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    fs.rmSync(destination, { recursive: true, force: true });
    fs.renameSync(staging, destination);
    return destination;
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    console.log(`[package-preview-artifact] wrote ${packagePreviewArtifact()}`);
  } catch (error) {
    console.error(`[package-preview-artifact] ${error.message}`);
    process.exitCode = 1;
  }
}
module.exports = { packagePreviewArtifact };
