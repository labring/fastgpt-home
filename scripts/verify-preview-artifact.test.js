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
    const bundle = packagePreviewArtifact(root);
    const manifestPath = path.join(bundle, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath));
    const inputs = manifest.publicationInputs;
    const options = { trustedConfigPath: path.join(root, 'wrangler.json') };
    const verify = () => verifyPreviewArtifact(bundle, inputs, options);
    assert.equal(verify().kind, 'preview');
    assert.throws(() => verifySiteArtifact(bundle, inputs), /Unsupported site artifact/);
    assert.throws(() => verifyPreviewArtifact(bundle, { ...inputs, siteVariant: 'cn' }, options));
    write('.release-artifacts/site/preview-disabled/payload/out/index.html', 'tampered');
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
