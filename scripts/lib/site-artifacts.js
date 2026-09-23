const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { directoryInventory, digestJson } = require('./release-readiness');
const { getPublicationInputs } = require('./site-artifact-identity');
const { verifyUrlAliasArtifactBundle } = require('./url-alias-artifacts');
const NGINX_FILES = [
  'nginx.conf',
  'nginx-security-headers.conf',
  'nginx-embeddable-security-headers.conf',
  'nginx-redirects.conf'
];

function verifyRecord(record, identity) {
  assert(
    /^[a-f0-9]{40}$/.test(identity.sourceRevision),
    'Artifact identity requires a Git revision'
  );
  assert.equal(
    record.sourceRevision,
    identity.sourceRevision,
    'Verification revision differs from artifact identity'
  );
  const variant = identity.siteVariant;
  assert(['cn', 'io', 'preview'].includes(variant), 'Invalid artifact variant');
  assert.equal(
    identity.crmMode,
    identity.publicSettings.NEXT_PUBLIC_CRM_API_URL?.trim() ? 'configured' : 'disabled',
    'Inconsistent CRM identity'
  );
  assert(
    record.variants.some(
      (entry) => entry.variant === variant && entry.outcome === 'export-verified'
    ),
    'Missing verified variant'
  );
  assert(
    !record.failures?.some((failure) => !failure.variant || failure.variant === variant),
    'Failed verification record'
  );
}

function verifyBuildRecord(record, identity) {
  verifyRecord(record, identity);
  const { getSourceExecutionOrder, getVariantExecutionOrder } = require('./release-steps');
  for (const [ids, expectedVariant] of [
    [[...getSourceExecutionOrder(), 'release.regression'], undefined],
    [getVariantExecutionOrder(identity.siteVariant), identity.siteVariant]
  ]) {
    for (const id of ids) {
      assert(
        record.commands.some(
          (step) => step.id === id && step.variant === expectedVariant && step.status === 'passed'
        ),
        `Missing successful verification: ${id}`
      );
    }
  }
}

function assertRegularFiles(directory) {
  assert(
    fs.lstatSync(directory).isDirectory(),
    `Artifact root must be a real directory: ${directory}`
  );
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    assert(entry.isFile() || entry.isDirectory(), `Unsupported artifact entry: ${entry.name}`);
    if (entry.isDirectory()) assertRegularFiles(path.join(directory, entry.name));
  }
}

function inventoryPayload(directory) {
  assertRegularFiles(directory);
  return directoryInventory(directory, {
    root: directory,
    role: 'site-artifact',
    source: 'generated'
  });
}

function retainVerifiedSiteArtifact(root, destination, variant, record) {
  const identity = JSON.parse(
    fs.readFileSync(path.join(root, '.next/cache/site-identity.json'), 'utf8')
  );
  assert.equal(identity.siteVariant, variant, 'Artifact variant differs from built identity');
  verifyBuildRecord(record, identity);
  const publicationInputs = getPublicationInputs(identity);
  const { nodeVersion, platform, architecture } = identity;
  const provenance = { nodeVersion, platform, architecture };
  const out = path.join(root, 'out');
  assertRegularFiles(out);
  const verifiedInventory = record.artifacts.find(
    (entry) => entry.variant === variant && entry.role === 'static-export'
  );
  assert.equal(
    directoryInventory(out, { root, role: 'static-export', source: 'generated' }).sha256,
    verifiedInventory?.sha256,
    'Export changed after verification'
  );
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const staging = fs.mkdtempSync(`${destination}.staging-`);
  const payload = path.join(staging, 'payload');
  try {
    fs.mkdirSync(payload, { recursive: true });
    fs.cpSync(out, path.join(payload, 'out'), { recursive: true });
    if (variant !== 'preview') {
      const aliases = path.join(root, '.release-artifacts/url-alias', variant);
      assertRegularFiles(aliases);
      fs.cpSync(aliases, path.join(payload, 'url-alias', variant), { recursive: true });
    }
    if (variant === 'io' || variant === 'preview') {
      fs.copyFileSync(path.join(root, 'wrangler.json'), path.join(payload, 'wrangler.json'));
    }
    if (variant === 'cn') {
      fs.mkdirSync(path.join(payload, 'runtime'));
      for (const file of NGINX_FILES) {
        fs.copyFileSync(
          path.join(root, file === 'nginx-redirects.conf' ? '.next' : '.', file),
          path.join(payload, 'runtime', file)
        );
      }
    }
    fs.writeFileSync(
      path.join(payload, 'verification.json'),
      `${JSON.stringify(
        {
          ...record,
          publicationInputs,
          provenance,
          publicationVerification: { version: 1, source: 'passed', export: 'passed', variant }
        },
        null,
        2
      )}\n`
    );
    const manifest = {
      schemaVersion: 2,
      publicationInputs,
      provenance,
      inventory: inventoryPayload(payload)
    };
    fs.writeFileSync(path.join(staging, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    verifySiteArtifact(staging, publicationInputs);
    // Seal the replacement before touching an existing rollback unit.
    const previous = `${staging}.previous`;
    if (fs.existsSync(destination)) fs.renameSync(destination, previous);
    try {
      fs.renameSync(staging, destination);
    } catch (error) {
      if (fs.existsSync(previous)) fs.renameSync(previous, destination);
      throw error;
    }
    fs.rmSync(previous, { recursive: true, force: true });
    return destination;
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}

function verifySiteArtifact(bundle, expectedInputs) {
  assert(fs.lstatSync(bundle).isDirectory(), 'Artifact bundle must be a real directory');
  assert(
    fs.lstatSync(path.join(bundle, 'manifest.json')).isFile(),
    'Manifest must be a regular file'
  );
  const manifest = JSON.parse(fs.readFileSync(path.join(bundle, 'manifest.json'), 'utf8'));
  assert.equal(
    manifest.schemaVersion,
    2,
    'Unsupported site artifact manifest; rebuild the publication'
  );
  assert.equal(
    digestJson(manifest.publicationInputs),
    digestJson(expectedInputs),
    'Site artifact identity mismatch'
  );
  const payload = path.join(bundle, 'payload');
  const inventory = inventoryPayload(payload);
  assert.equal(inventory.sha256, manifest.inventory.sha256, 'Site artifact integrity mismatch');
  const record = JSON.parse(fs.readFileSync(path.join(payload, 'verification.json'), 'utf8'));
  verifyRecord(record, manifest.publicationInputs);
  const variant = manifest.publicationInputs.siteVariant;
  assert.deepEqual(
    record.publicationVerification,
    {
      version: 1,
      source: 'passed',
      export: 'passed',
      variant
    },
    'Missing successful publication verification contract'
  );
  assert.deepEqual(
    record.publicationInputs,
    manifest.publicationInputs,
    'Publication evidence input mismatch'
  );
  assert.deepEqual(record.provenance, manifest.provenance, 'Publication provenance mismatch');
  for (const field of ['nodeVersion', 'platform', 'architecture']) {
    assert(
      typeof record.provenance?.[field] === 'string' && record.provenance[field].length > 0,
      `Missing build provenance: ${field}`
    );
  }
  const verifiedInventory = record.artifacts.find(
    (entry) => entry.variant === variant && entry.role === 'static-export'
  );
  assert.equal(
    digestJson(
      inventory.files
        .filter((entry) => entry.path.startsWith('out/'))
        .map(({ capturedAt, ...entry }) => ({ ...entry, role: 'static-export' }))
    ),
    verifiedInventory?.sha256,
    'Export differs from verification evidence'
  );
  for (const file of ['out/index.html', 'out/404.html', 'out/robots.txt']) {
    assert(fs.statSync(path.join(payload, file)).isFile(), `Missing publication artifact: ${file}`);
  }
  if (variant !== 'preview')
    verifyUrlAliasArtifactBundle(path.join(payload, 'url-alias'), [variant]);
  if (variant === 'io' || variant === 'preview') {
    const { verifyWorkerArtifact } = require('./worker-publication');
    const wranglerVersion = require('../../package.json').devDependencies.wrangler;
    verifyWorkerArtifact({
      outDir: path.join(payload, 'out'),
      configPath: path.join(payload, 'wrangler.json'),
      wranglerVersion,
      requireSitemap: variant !== 'preview'
    });
  }
  if (variant === 'cn') {
    for (const file of NGINX_FILES) {
      assert(
        fs.statSync(path.join(payload, 'runtime', file)).isFile(),
        `Missing runtime artifact: ${file}`
      );
    }
    assert.deepEqual(
      fs.readFileSync(path.join(payload, 'runtime/nginx-redirects.conf')),
      fs.readFileSync(path.join(payload, 'url-alias/cn/release/nginx-redirects.conf')),
      'Runtime and alias redirects differ'
    );
  }
  return manifest;
}

module.exports = { retainVerifiedSiteArtifact, verifySiteArtifact };
