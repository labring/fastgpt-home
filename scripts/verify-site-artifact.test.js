const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { spawnSync } = require('node:child_process');
const { directoryInventory } = require('./lib/release-readiness');
const { getSourceExecutionOrder, getVariantExecutionOrder } = require('./verify-release');
const { retainVerifiedSiteArtifact } = require('./lib/site-artifacts');

test('a complete verified publication unit rejects identity drift and corrupted handoffs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'verified-site-'));
  const write = (file, value) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), value);
  };
  const identity = {
    sourceRevision: 'a'.repeat(40),
    lockfileDigest: 'b'.repeat(64),
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    siteVariant: 'preview',
    crmMode: 'disabled',
    publicSettings: { NEXT_PUBLIC_SITE_VARIANT: 'preview', NEXT_PUBLIC_CRM_API_URL: '' }
  };
  try {
    write('out/index.html', '<main>Accepted body</main>');
    write('out/404.html', '<main>Page missing</main>');
    write('out/robots.txt', 'User-agent: *\nDisallow: /\n');
    write('.next/cache/site-identity.json', JSON.stringify(identity));
    const record = {
      sourceRevision: identity.sourceRevision,
      commands: [
        ...getSourceExecutionOrder().map((id) => ({ id, status: 'passed' })),
        ...getVariantExecutionOrder('preview').map((id) => ({
          id,
          variant: 'preview',
          status: 'passed'
        }))
      ],
      variants: [{ variant: 'preview', outcome: 'export-verified' }],
      artifacts: [
        {
          variant: 'preview',
          ...directoryInventory(path.join(root, 'out'), {
            root,
            role: 'static-export',
            source: 'generated'
          })
        }
      ],
      failures: []
    };
    const bundle = path.join(root, 'retained');
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
    const verify = (expected = identity) => {
      write('expected.json', JSON.stringify(expected));
      return spawnSync(
        process.execPath,
        [
          path.resolve(__dirname, 'verify-site-artifact.js'),
          '--bundle',
          bundle,
          '--identity',
          path.join(root, 'expected.json')
        ],
        { encoding: 'utf8' }
      );
    };
    assert.equal(verify().status, 0);
    for (const changed of [
      { sourceRevision: 'c'.repeat(40) },
      { lockfileDigest: 'd'.repeat(64) },
      { siteVariant: 'cn' },
      { crmMode: 'configured' },
      {
        publicSettings: {
          NEXT_PUBLIC_SITE_VARIANT: 'preview',
          NEXT_PUBLIC_CRM_API_URL: 'https://crm.invalid'
        }
      }
    ]) {
      const result = verify({ ...identity, ...changed });
      assert.equal(result.status, 1, result.stdout);
      assert.match(result.stderr, /identity/i);
    }
    fs.appendFileSync(path.join(bundle, 'payload/out/index.html'), 'Corrupted');
    assert.equal(verify().status, 1);
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
    write('retained/payload/out/extra.html', 'Unverified addition');
    assert.equal(verify().status, 1);
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
    fs.unlinkSync(path.join(bundle, 'payload/out/404.html'));
    assert.equal(verify().status, 1);
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
    fs.symlinkSync(path.join(root, 'expected.json'), path.join(bundle, 'payload/out/link'));
    assert.equal(verify().status, 1);
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
    fs.renameSync(path.join(bundle, 'payload'), path.join(root, 'outside-payload'));
    fs.symlinkSync(path.join(root, 'outside-payload'), path.join(bundle, 'payload'));
    assert.equal(verify().status, 1);
    fs.unlinkSync(path.join(bundle, 'payload'));
    fs.renameSync(path.join(root, 'outside-payload'), path.join(bundle, 'payload'));
    const previousManifest = fs.readFileSync(path.join(bundle, 'manifest.json'));
    const copy = fs.cpSync;
    try {
      fs.cpSync = () => {
        throw new Error('Injected copy failure');
      };
      assert.throws(() => retainVerifiedSiteArtifact(root, bundle, 'preview', record), /Injected/);
    } finally {
      fs.cpSync = copy;
    }
    assert.deepEqual(fs.readFileSync(path.join(bundle, 'manifest.json')), previousManifest);
    assert.equal(verify().status, 0, 'A failed replacement preserves the previous release unit');
    record.commands.find((step) => step.id === 'variant.build').status = 'failed';
    assert.throws(
      () => retainVerifiedSiteArtifact(root, bundle, 'preview', record),
      /verification/i
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('preview handoff resolves the completed merge result and rejects stale or substituted candidates', async () => {
  const resolve = require('./lib/preview-run-inputs');
  const base = 'a'.repeat(40),
    head = 'b'.repeat(40),
    merge = 'c'.repeat(40);
  const context = {
    repo: { owner: 'labring', repo: 'fastgpt-home' },
    payload: {
      workflow_run: {
        conclusion: 'success',
        repository: { full_name: 'labring/fastgpt-home' },
        event: 'pull_request',
        head_sha: head,
        pull_requests: [{ number: 303 }]
      }
    }
  };
  const pr = {
    number: 303,
    state: 'open',
    base: { sha: base, repo: { full_name: 'labring/fastgpt-home' } },
    head: { sha: head }
  };
  const github = {
    rest: {
      pulls: { get: async () => ({ data: pr }) },
      git: { getCommit: async () => ({ data: { parents: [{ sha: base }, { sha: head }] } }) }
    }
  };
  const selection = { revision: merge, baseRevision: base, headRevision: head };
  const source = { sourceRevision: merge };
  assert.deepEqual(await resolve(github, context, selection, source), {
    revision: merge,
    number: '303',
    branch: 'pr-303'
  });
  await assert.rejects(resolve(github, context, { ...selection, revision: head }, source));
  await assert.rejects(
    resolve(github, context, { ...selection, baseRevision: 'd'.repeat(40) }, source)
  );
  pr.head.sha = 'd'.repeat(40);
  await assert.rejects(resolve(github, context, selection, source));
  context.payload.workflow_run = {
    ...context.payload.workflow_run,
    event: 'workflow_dispatch',
    head_sha: merge,
    id: 42
  };
  assert.equal((await resolve(github, context, selection, source)).branch, 'manual-42');
  await assert.rejects(resolve(github, context, selection, { sourceRevision: head }));
});

test('PR source consumers wait for the shared gate and surface producer failures', async () => {
  const { waitForPreviewSource } = require('./lib/preview-run-inputs');
  const context = {
    sha: 'c'.repeat(40),
    repo: { owner: 'labring', repo: 'fastgpt-home' },
    payload: { pull_request: { number: 303, head: { sha: 'a'.repeat(40) } } }
  };
  let ready = false,
    waits = 0;
  const run = { display_title: `Preview 303 / ${'c'.repeat(40)}`, id: 42, head_sha: 'a'.repeat(40), event: 'pull_request', conclusion: null };
  const github = {
    rest: {
      actions: {
        listWorkflowRuns: async () => ({ data: { workflow_runs: [
          { ...run, id: 43, display_title: `Preview 999 / ${'c'.repeat(40)}` },
          { ...run, id: 44, display_title: `Preview 303 / ${'d'.repeat(40)}` },
          ...(waits ? [run] : [])
        ] } }),
        listWorkflowRunArtifacts: async () => ({
          data: { artifacts: ready ? [{ name: 'verified-source', expired: false }] : [] }
        })
      }
    }
  };
  assert.equal(
    await waitForPreviewSource(github, context, async () => {
      waits += 1;
      ready = true;
    }),
    42
  );
  assert.equal(waits, 1);
  ready = false;
  run.conclusion = 'failure';
  await assert.rejects(
    waitForPreviewSource(github, context, async () => {}),
    /producer failed/
  );
});
