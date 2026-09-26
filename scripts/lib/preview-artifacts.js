const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { digestJson } = require('./release-readiness');
const { inventoryPayload } = require('./site-artifacts');
const { verifyWorkerArtifact } = require('./worker-publication');

// Preview acceptance is independent of the production release verification contract.
function verifyPreviewArtifact(bundle, expectedInputs, { trustedConfigPath } = {}) {
  assert(fs.lstatSync(bundle).isDirectory(), 'Artifact bundle must be a real directory');
  const manifestPath = path.join(bundle, 'manifest.json');
  assert(fs.lstatSync(manifestPath).isFile(), 'Manifest must be a regular file');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.kind, 'preview');
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(
    digestJson(manifest.publicationInputs),
    digestJson(expectedInputs),
    'Preview identity mismatch'
  );
  assert.equal(expectedInputs.siteVariant, 'preview');
  assert.equal(expectedInputs.crmMode, 'disabled');
  assert.equal(expectedInputs.publicSettings.NEXT_PUBLIC_CRM_API_URL?.trim() || '', '');
  assert(/^[a-f0-9]{40}$/.test(manifest.source?.revision), 'Invalid Preview revision');
  assert.equal(manifest.source.revision, expectedInputs.sourceRevision);
  const payload = path.join(bundle, 'payload');
  const inventory = inventoryPayload(payload);
  assert.equal(inventory.sha256, manifest.inventory.sha256, 'Preview artifact integrity mismatch');
  assert.equal(
    inventory.sha256,
    digestJson(manifest.inventory.files.map(({ capturedAt, ...entry }) => entry)),
    'Preview inventory mismatch'
  );
  assert(
    inventory.files.every(({ path: file }) => file.startsWith('out/') || file === 'wrangler.json'),
    'Unexpected Preview payload file'
  );
  assert(trustedConfigPath, 'Preview requires a trusted Worker configuration');
  verifyWorkerArtifact({
    outDir: path.join(payload, 'out'),
    configPath: path.join(payload, 'wrangler.json'),
    trustedConfigPath,
    wranglerVersion: require('../../package.json').devDependencies.wrangler,
    requireSitemap: false,
    inventory: inventory.files
      .filter(({ path: file }) => file.startsWith('out/'))
      .map((entry) => ({ ...entry, path: entry.path.slice(4) }))
  });
  return manifest;
}

module.exports = { verifyPreviewArtifact };
