const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { packagePreviewArtifact } = require('./package-preview-artifact');
const { verifyPreviewArtifact } = require('./lib/preview-artifacts');
const { verifySiteArtifact, inventoryPayload } = require('./lib/site-artifacts');
const resolve = require('./lib/preview-run-inputs');

// Exercise the real packager with a fresh destination and small deployment payload.
test('Preview packaging preserves the Worker boundary and rejects corrupted handoffs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-artifact-'));
  const write = (file, data) => {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, data);
  };
  const identity = {
    sourceRevision: 'a'.repeat(40),
    lockfileDigest: 'b'.repeat(64),
    siteVariant: 'preview',
    crmMode: 'disabled',
    publicSettings: { NEXT_PUBLIC_SITE_VARIANT: 'preview', NEXT_PUBLIC_CRM_API_URL: '' },
    cnDomainPolicy: 'unchanged'
  };
  try {
    for (const file of ['index.html', '404.html', 'robots.txt', '_worker.js'])
      write(`out/${file}`, 'fixture');
    write('out/.assetsignore', '_worker.js\n');
    write('wrangler.json', fs.readFileSync(path.join(__dirname, '../wrangler.json')));
    write('.next/cache/site-identity.json', JSON.stringify(identity));
    const bundle = packagePreviewArtifact(root, {
      buildSeconds: 12.5,
      rscPayloadFilesRemoved: 8,
      staticExportFilesAfterCleanup: 4,
      staticAssetFileLimit: 100000
    });
    const manifestPath = path.join(bundle, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath));
    assert.deepEqual(manifest.metrics, {
      buildSeconds: 12.5,
      rscPayloadFilesRemoved: 8,
      staticExportFilesAfterCleanup: 4,
      staticAssetFileLimit: 100000,
      artifactFiles: 5,
      artifactBytes: 39,
      htmlFiles: 2,
      htmlBytes: 14
    });
    const inputs = manifest.publicationInputs;
    const options = { trustedConfigPath: path.join(root, 'wrangler.json') };
    const verify = () => verifyPreviewArtifact(bundle, inputs, options);
    assert.equal(verify().kind, 'preview');
    write('out/index.html', 'changed source');
    assert.equal(verify().kind, 'preview', 'Default packaging keeps an independent copy');
    write('out/index.html', 'fixture');
    assert.throws(() => verifySiteArtifact(bundle, inputs), /Unsupported site artifact/);
    assert.throws(() => verifyPreviewArtifact(bundle, { ...inputs, siteVariant: 'cn' }, options));
    write('.release-artifacts/site/preview-disabled/payload/out/index.html', 'tampered');
    assert.equal(fs.readFileSync(path.join(root, 'out/index.html'), 'utf8'), 'fixture');
    assert.throws(verify, /integrity/);
    write('.release-artifacts/site/preview-disabled/payload/out/index.html', 'fixture');
    const payload = path.join(bundle, 'payload');
    const reseal = () =>
      fs.writeFileSync(
        manifestPath,
        JSON.stringify({ ...manifest, inventory: inventoryPayload(payload) })
      );
    const config = JSON.parse(fs.readFileSync(path.join(payload, 'wrangler.json')));
    write(
      '.release-artifacts/site/preview-disabled/payload/wrangler.json',
      JSON.stringify({ ...config, routes: ['fastgpt.io/*'] })
    );
    reseal();
    assert.throws(verify, /trusted publication profile/);
    write('.release-artifacts/site/preview-disabled/payload/wrangler.json', JSON.stringify(config));
    fs.symlinkSync(path.join(root, 'wrangler.json'), path.join(payload, 'out/escape'));
    assert.throws(verify, /Unsupported artifact entry/);
    fs.unlinkSync(path.join(payload, 'out/escape'));
    reseal();
    const altered = JSON.parse(fs.readFileSync(manifestPath));
    altered.inventory.files[0].path = '../escape';
    fs.writeFileSync(manifestPath, JSON.stringify(altered));
    assert.throws(verify, /inventory mismatch/);
    write('.next/cache/site-identity.json', JSON.stringify({ ...identity, crmMode: 'configured' }));
    assert.throws(() => packagePreviewArtifact(root), /disabled CRM/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

function previewFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-consume-'));
  t.after(() => {
    t.mock.restoreAll();
    fs.rmSync(root, { recursive: true, force: true });
  });
  const out = path.join(root, 'out');
  fs.mkdirSync(path.join(out, 'nested'), { recursive: true });
  for (const file of [
    'index.html',
    '404.html',
    'robots.txt',
    '_worker.js',
    'nested/article.html'
  ]) {
    fs.writeFileSync(path.join(out, file), 'fixture');
  }
  fs.writeFileSync(path.join(out, '.assetsignore'), '_worker.js\n');
  fs.copyFileSync(path.join(__dirname, '../wrangler.json'), path.join(root, 'wrangler.json'));
  fs.mkdirSync(path.join(root, '.next/cache'), { recursive: true });
  fs.writeFileSync(
    path.join(root, '.next/cache/site-identity.json'),
    JSON.stringify({
      sourceRevision: 'a'.repeat(40),
      lockfileDigest: 'b'.repeat(64),
      siteVariant: 'preview',
      crmMode: 'disabled',
      publicSettings: { NEXT_PUBLIC_SITE_VARIANT: 'preview', NEXT_PUBLIC_CRM_API_URL: '' },
      cnDomainPolicy: 'unchanged'
    })
  );
  const bundle = packagePreviewArtifact(root);
  const manifest = JSON.parse(fs.readFileSync(path.join(bundle, 'manifest.json')));
  const verify = () =>
    verifyPreviewArtifact(bundle, manifest.publicationInputs, {
      trustedConfigPath: path.join(root, 'wrangler.json')
    });
  return { root, out, bundle, manifest, verify };
}

test('consuming a Preview export moves files without changing the publication contract', (t) => {
  const { root, out, bundle, manifest, verify } = previewFixture(t);
  const before = fs.statSync(path.join(out, 'nested/article.html'));
  const copy = fs.cpSync;
  t.mock.method(fs, 'cpSync', (source, ...args) => {
    assert.notEqual(source, out, 'Consuming the export must not copy its tree');
    return copy(source, ...args);
  });
  assert.equal(
    packagePreviewArtifact(root, { buildSeconds: 12.5 }, { consumeExport: true }),
    bundle
  );
  assert.equal(fs.existsSync(out), false);
  const after = fs.statSync(path.join(bundle, 'payload/out/nested/article.html'));
  assert.equal(after.dev, before.dev);
  assert.equal(after.ino, before.ino, 'The file is moved, not copied or reconstructed');
  const consumedManifest = verify();
  assert.equal(consumedManifest.inventory.sha256, manifest.inventory.sha256);
  assert.deepEqual(consumedManifest.publicationInputs, manifest.publicationInputs);
  assert.deepEqual(consumedManifest.metrics, {
    buildSeconds: 12.5,
    artifactFiles: 6,
    artifactBytes: 46,
    htmlFiles: 3,
    htmlBytes: 21
  });
  assert.equal(
    fs.readFileSync(path.join(bundle, 'payload/out/.assetsignore'), 'utf8'),
    '_worker.js\n'
  );
  assert.deepEqual(fs.readdirSync(path.dirname(bundle)), ['preview-disabled']);
});

test('a packaging failure restores the consumed export and leaves the previous Preview intact', (t) => {
  const { root, out, bundle, manifest, verify } = previewFixture(t);
  fs.writeFileSync(path.join(out, 'index.html'), 'new export');
  const copy = fs.copyFileSync;
  t.mock.method(fs, 'copyFileSync', (source, ...args) => {
    if (source === path.join(root, 'wrangler.json')) throw new Error('Injected metadata failure');
    return copy(source, ...args);
  });
  assert.throws(
    () => packagePreviewArtifact(root, undefined, { consumeExport: true }),
    /metadata failure/
  );
  assert.equal(fs.readFileSync(path.join(out, 'index.html'), 'utf8'), 'new export');
  assert.deepEqual(verify().inventory, manifest.inventory);
  assert.deepEqual(fs.readdirSync(path.dirname(bundle)), ['preview-disabled']);
});

test('a final rename failure restores both the export and the previous Preview', (t) => {
  const { root, out, bundle, manifest, verify } = previewFixture(t);
  fs.writeFileSync(path.join(out, 'index.html'), 'replacement');
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (source, destination) => {
    if (destination === bundle && !source.endsWith('.previous')) {
      throw new Error('Injected installation failure');
    }
    return rename(source, destination);
  });
  assert.throws(
    () => packagePreviewArtifact(root, undefined, { consumeExport: true }),
    /installation failure/
  );
  assert.equal(fs.readFileSync(path.join(out, 'index.html'), 'utf8'), 'replacement');
  assert.deepEqual(verify().inventory, manifest.inventory);
  assert.deepEqual(fs.readdirSync(path.dirname(bundle)), ['preview-disabled']);
});

test('cross-filesystem consumption fails without copying or changing either export', (t) => {
  const { root, out, bundle, manifest, verify } = previewFixture(t);
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (source, destination) => {
    if (source === out) throw Object.assign(new Error('Cross-device link'), { code: 'EXDEV' });
    return rename(source, destination);
  });
  t.mock.method(fs, 'cpSync', () => assert.fail('Must not fall back to a full export copy'));
  assert.throws(() => packagePreviewArtifact(root, undefined, { consumeExport: true }), {
    code: 'EXDEV',
    message: /same filesystem/
  });
  assert.equal(fs.readFileSync(path.join(out, 'index.html'), 'utf8'), 'fixture');
  assert.deepEqual(verify().inventory, manifest.inventory);
  assert.deepEqual(fs.readdirSync(path.dirname(bundle)), ['preview-disabled']);
});

test('failed export recovery retains its only copy and reports the recovery location', (t) => {
  const { root, out, bundle, manifest, verify } = previewFixture(t);
  fs.writeFileSync(path.join(out, 'index.html'), 'only new copy');
  let retainedOut;
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (source, destination) => {
    if (source === out) retainedOut = destination;
    if (destination === out) throw new Error('Injected recovery failure');
    return rename(source, destination);
  });
  t.mock.method(fs, 'copyFileSync', () => {
    throw new Error('Injected metadata failure');
  });
  assert.throws(
    () => packagePreviewArtifact(root, undefined, { consumeExport: true }),
    (error) => {
      assert(error instanceof AggregateError);
      assert(error.message.includes(retainedOut));
      assert.match(error.message, /metadata failure/);
      assert.match(error.message, /recovery failure/);
      return true;
    }
  );
  assert.equal(fs.existsSync(out), false);
  assert.equal(fs.readFileSync(path.join(retainedOut, 'index.html'), 'utf8'), 'only new copy');
  assert.deepEqual(verify().inventory, manifest.inventory);
  assert(fs.existsSync(bundle));
});

test('failed rollback of the previous Preview preserves its recoverable directory', (t) => {
  const { root, out, bundle, manifest } = previewFixture(t);
  const rename = fs.renameSync;
  let previous;
  t.mock.method(fs, 'renameSync', (source, destination) => {
    if (source === bundle) previous = destination;
    if (destination === bundle) throw new Error('Injected installation and rollback failure');
    return rename(source, destination);
  });
  assert.throws(
    () => packagePreviewArtifact(root, undefined, { consumeExport: true }),
    (error) => {
      assert(error instanceof AggregateError);
      assert(error.message.includes(previous));
      return true;
    }
  );
  assert.equal(fs.readFileSync(path.join(out, 'index.html'), 'utf8'), 'fixture');
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(previous, 'manifest.json'))), manifest);
  assert.equal(fs.existsSync(bundle), false);
});

test('failure to remove the old backup cannot undo an installed Preview', (t) => {
  const { root, out, bundle, verify } = previewFixture(t);
  fs.writeFileSync(path.join(out, 'index.html'), 'accepted replacement');
  const remove = fs.rmSync;
  let previous;
  const warnings = [];
  t.mock.method(console, 'warn', (message) => warnings.push(message));
  t.mock.method(fs, 'rmSync', (directory, ...args) => {
    if (directory.endsWith('.previous')) {
      previous = directory;
      throw new Error('Injected backup cleanup failure');
    }
    return remove(directory, ...args);
  });
  assert.equal(packagePreviewArtifact(root, undefined, { consumeExport: true }), bundle);
  assert.equal(fs.existsSync(out), false);
  assert.equal(verify().kind, 'preview');
  assert.equal(
    fs.readFileSync(path.join(bundle, 'payload/out/index.html'), 'utf8'),
    'accepted replacement'
  );
  assert.equal(fs.readFileSync(path.join(previous, 'payload/out/index.html'), 'utf8'), 'fixture');
  assert(warnings.some((message) => message.includes(previous)));
});

test('new Preview provenance binds automatic and manual deployments to the selected run', async () => {
  const revision = 'a'.repeat(40),
    base = 'b'.repeat(40),
    head = 'c'.repeat(40);
  const run = {
    id: 42,
    run_attempt: 2,
    path: '.github/workflows/preview.yml',
    event: 'pull_request',
    conclusion: 'success',
    repository: { full_name: 'labring/fastgpt-home' },
    head_sha: head,
    pull_requests: [{ number: 330 }]
  };
  const pr = {
    number: 330,
    state: 'open',
    mergeable: true,
    merge_commit_sha: revision,
    base: { sha: base, repo: run.repository },
    head: { sha: head }
  };
  const github = { rest: { pulls: { get: async () => ({ data: pr }) } } };
  const context = {
    repo: { owner: 'labring', repo: 'fastgpt-home' },
    payload: { workflow_run: run }
  };
  const manifest = {
    kind: 'preview',
    schemaVersion: 1,
    publicationInputs: { sourceRevision: revision },
    source: {
      revision,
      baseRevision: base,
      headRevision: head,
      runId: '42',
      runAttempt: '2',
      event: run.event
    }
  };
  assert.equal((await resolve(github, context, manifest)).number, '330');
  for (const changes of [
    { runId: '43' },
    { runAttempt: '1' },
    { event: 'workflow_dispatch' },
    { baseRevision: head },
    { revision: head }
  ]) {
    await assert.rejects(
      resolve(github, context, { ...manifest, source: { ...manifest.source, ...changes } })
    );
  }
  run.path = '.github/workflows/other.yml';
  await assert.rejects(resolve(github, context, manifest), /workflow/);
  run.path = '.github/workflows/preview.yml';
  run.event = manifest.source.event = 'workflow_dispatch';
  run.head_sha = revision;
  assert.equal((await resolve(github, context, manifest)).branch, 'manual-42');
});
