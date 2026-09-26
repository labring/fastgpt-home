const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { execFileSync, spawnSync } = require('node:child_process');
const { directoryInventory } = require('./lib/release-readiness');
const { getSourceExecutionOrder, getVariantExecutionOrder } = require('./verify-release');
const { retainVerifiedSiteArtifact, verifySiteArtifact } = require('./lib/site-artifacts');
const { digest, getPublicationInputs } = require('./lib/site-artifact-identity');

test('a complete verified publication unit rejects identity drift and corrupted handoffs', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'verified-site-'));
  const write = (file, value) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), value);
  };
  const identity = {
    sourceRevision: 'a'.repeat(40),
    lockfileDigest: digest('{}'),
    nodeVersion: 'v24.0.0',
    platform: 'linux',
    architecture: 'x64',
    siteVariant: 'preview',
    crmMode: 'disabled',
    publicSettings: { NEXT_PUBLIC_SITE_VARIANT: 'preview', NEXT_PUBLIC_CRM_API_URL: '' },
    cnDomainPolicy: 'unchanged'
  };
  try {
    write('out/index.html', '<main>Accepted body</main>');
    write('out/404.html', '<main>Page missing</main>');
    write('out/robots.txt', 'User-agent: *\nDisallow: /\n');
    write('out/_worker.js', 'export default { fetch() { return new Response("ok"); } };');
    write('out/.assetsignore', '_worker.js\n');
    write(
      'wrangler.json',
      JSON.stringify({
        name: 'fastgpt-io-worker',
        main: './out/_worker.js',
        compatibility_date: '2026-09-23',
        workers_dev: true,
        assets: {
          directory: './out',
          binding: 'ASSETS',
          run_worker_first: true,
          not_found_handling: '404-page'
        }
      })
    );
    write('.next/cache/site-identity.json', JSON.stringify(identity));
    const record = {
      sourceRevision: identity.sourceRevision,
      status: 'export-verified',
      commands: [
        ...getSourceExecutionOrder().map((id) => ({ id, status: 'passed' })),
        { id: 'release.regression', status: 'passed' },
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
    assert.equal(JSON.parse(fs.readFileSync(path.join(bundle, 'manifest.json'))).schemaVersion, 2);
    const verify = (expected = getPublicationInputs(identity)) => {
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
    // Exercise the deployment entry point from a verifier checkout without node_modules.
    for (const file of [
      'scripts/verify-preview-artifact.js',
      'package.json',
      ...[
        'site-artifacts',
        'preview-artifacts',
        'site-artifact-identity',
        'site-variant',
        'release-readiness',
        'worker-publication',
        'url-alias-artifacts',
        'url-alias-authority'
      ].map((name) => `scripts/lib/${name}.js`),
      'src/config/site-routing.json'
    ]) {
      write(`verifier/${file}`, fs.readFileSync(path.resolve(__dirname, '..', file)));
    }
    write('candidate/package-lock.json', '{}');
    const marker = path.join(root, 'candidate-executed');
    write(
      'candidate/preload.cjs',
      `require('node:fs').writeFileSync(${JSON.stringify(marker)}, 'loaded');`
    );
    for (const file of ['.env', '.env.local', '.env.production', '.env.production.local']) {
      write(
        `candidate/${file}`,
        `ENV_BOUNDARY_MARKER=candidate\nLD_PRELOAD=candidate.so\nNEXT_PUBLIC_SITE_VARIANT=cn\nNODE_OPTIONS=--require ${path.join(
          root,
          'candidate/preload.cjs'
        )}\n`
      );
    }
    write(
      'environment-probe.cjs',
      `
      const assert = require('node:assert/strict');
      const digest = () => require('node:crypto').createHash('sha256').update(JSON.stringify({...process.env})).digest('hex');
      const before = digest();
      process.on('exit', () => {
        assert.equal(digest(), before, 'Deployment changed its execution environment');
        const child = require('node:child_process').spawnSync(process.execPath,
          ['-e', 'process.stdout.write(process.env.ENV_BOUNDARY_MARKER || "clean")'], {encoding:'utf8'});
        assert.equal(child.status, 0);
        assert.equal(child.stdout, 'clean');
      });
    `
    );
    const deployCheck = spawnSync(
      process.execPath,
      [
        '--require',
        path.join(root, 'environment-probe.cjs'),
        path.join(root, 'verifier/scripts/verify-preview-artifact.js'),
        '--bundle',
        bundle,
        '--candidate',
        path.join(root, 'candidate'),
        '--revision',
        identity.sourceRevision,
        '--trusted-config',
        path.join(root, 'wrangler.json')
      ],
      { cwd: root, encoding: 'utf8', env: { PATH: process.env.PATH, ...identity.publicSettings } }
    );
    assert.equal(deployCheck.status, 0, deployCheck.stderr);
    assert(!fs.existsSync(marker), 'Candidate environment files remain inert data');
    const { verifySiteArtifact } = require('./lib/site-artifacts');
    const read = fs.readFileSync;
    const reads = new Map();
    try {
      fs.readFileSync = (file, ...args) => {
        if (String(file).startsWith(path.join(bundle, 'payload/out') + path.sep)) {
          reads.set(String(file), (reads.get(String(file)) || 0) + 1);
        }
        return read(file, ...args);
      };
      verifySiteArtifact(bundle, getPublicationInputs(identity));
    } finally {
      fs.readFileSync = read;
    }
    assert.deepEqual(
      [...reads.values()].sort((a, b) => a - b),
      [1, 1, 1, 1, 2],
      'Packaged files are read by the site and Worker artifact consumers'
    );
    const reseal = (edit) => {
      edit();
      const manifestPath = path.join(bundle, 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath));
      const payload = path.join(bundle, 'payload');
      manifest.inventory = directoryInventory(payload, {
        root: payload,
        role: 'site-artifact',
        source: 'generated'
      });
      fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    };
    const changeRecord = (edit) =>
      reseal(() => {
        const file = path.join(bundle, 'payload/verification.json');
        const data = JSON.parse(fs.readFileSync(file));
        edit(data);
        fs.writeFileSync(file, JSON.stringify(data));
      });
    changeRecord((data) => {
      data.commands = [{ id: 'renamed-internal-regression', status: 'passed' }];
    });
    assert.equal(verify().status, 0, 'Internal test names are diagnostic metadata');
    changeRecord((data) => {
      data.publicationVerification.source = 'failed';
    });
    assert.equal(verify().status, 1);
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
    reseal(() =>
      fs.appendFileSync(path.join(bundle, 'payload/out/index.html'), 'Changed after verification')
    );
    assert.equal(
      verify().status,
      1,
      'Rehashing the manifest cannot replace the verified export evidence'
    );
    retainVerifiedSiteArtifact(root, bundle, 'preview', record);
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
      const result = verify({ ...getPublicationInputs(identity), ...changed });
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
        path: '.github/workflows/preview.yml',
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
    mergeable: true,
    merge_commit_sha: merge,
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

test('preview handoff resolves fork pull requests through the head branch when the association index is empty', async () => {
  const resolve = require('./lib/preview-run-inputs');
  const base = 'a'.repeat(40),
    head = 'b'.repeat(40),
    merge = 'c'.repeat(40);
  const context = {
    repo: { owner: 'labring', repo: 'fastgpt-home' },
    payload: {
      workflow_run: {
        conclusion: 'success',
        path: '.github/workflows/preview.yml',
        repository: { full_name: 'labring/fastgpt-home' },
        event: 'pull_request',
        head_sha: head,
        head_branch: 'bing-ad',
        head_repository: { full_name: 'yangchuansheng/fastgpt-home' },
        pull_requests: []
      }
    }
  };
  const pr = {
    number: 314,
    state: 'open',
    mergeable: true,
    merge_commit_sha: merge,
    base: { sha: base, repo: { full_name: 'labring/fastgpt-home' } },
    head: { sha: head, ref: 'bing-ad' }
  };
  const github = {
    rest: {
      repos: { listPullRequestsAssociatedWithCommit: async () => ({ data: [] }) },
      pulls: {
        list: async ({ head: headFilter }) => {
          assert.equal(headFilter, 'yangchuansheng/fastgpt-home');
          return { data: [pr] };
        },
        get: async () => ({ data: pr })
      }
    }
  };
  const selection = { revision: merge, baseRevision: base, headRevision: head };
  const source = { sourceRevision: merge };
  assert.deepEqual(await resolve(github, context, selection, source), {
    revision: merge,
    number: '314',
    branch: 'pr-314'
  });
  pr.head.sha = 'd'.repeat(40);
  await assert.rejects(resolve(github, context, selection, source), /Ambiguous/);
});

test("preview deployment accepts only GitHub's ready merge tree", async () => {
  const resolve = require('./lib/preview-run-inputs');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-merge-tree-'));
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: 'Test',
        GIT_AUTHOR_EMAIL: 'test@example.invalid',
        GIT_COMMITTER_NAME: 'Test',
        GIT_COMMITTER_EMAIL: 'test@example.invalid'
      }
    }).trim();
  try {
    git('init', '-q');
    fs.writeFileSync(path.join(root, 'page.html'), 'Base');
    git('add', '.');
    git('commit', '-qm', 'Base');
    const base = git('rev-parse', 'HEAD');
    fs.writeFileSync(path.join(root, 'page.html'), 'Reviewed content');
    git('add', '.');
    git('commit', '-qm', 'Head');
    const head = git('rev-parse', 'HEAD');
    const merge = git('commit-tree', git('write-tree'), '-p', base, '-p', head, '-m', 'Merge');
    fs.writeFileSync(path.join(root, 'page.html'), 'Substituted content');
    git('add', '.');
    const substitute = git(
      'commit-tree',
      git('write-tree'),
      '-p',
      base,
      '-p',
      head,
      '-m',
      'Substitute'
    );
    assert.equal(
      git('show', '-s', '--format=%P', merge),
      git('show', '-s', '--format=%P', substitute)
    );
    assert.notEqual(
      git('show', '-s', '--format=%T', merge),
      git('show', '-s', '--format=%T', substitute)
    );
    const pr = {
      number: 303,
      state: 'open',
      mergeable: true,
      merge_commit_sha: merge,
      base: { sha: base, repo: { full_name: 'labring/fastgpt-home' } },
      head: { sha: head }
    };
    const context = {
      repo: { owner: 'labring', repo: 'fastgpt-home' },
      payload: {
        workflow_run: {
          conclusion: 'success',
          path: '.github/workflows/preview.yml',
          repository: { full_name: 'labring/fastgpt-home' },
          event: 'pull_request',
          head_sha: head,
          pull_requests: [{ number: 303 }]
        }
      }
    };
    const github = {
      rest: {
        pulls: { get: async () => ({ data: pr }) },
        git: {
          getCommit: async ({ commit_sha }) => ({
            data: {
              parents: git('show', '-s', '--format=%P', commit_sha)
                .split(' ')
                .map((sha) => ({ sha }))
            }
          })
        }
      }
    };
    const selection = { revision: merge, baseRevision: base, headRevision: head };
    assert.equal(
      (await resolve(github, context, selection, { sourceRevision: merge })).revision,
      merge
    );
    await assert.rejects(
      resolve(
        github,
        context,
        { ...selection, revision: substitute },
        { sourceRevision: substitute }
      ),
      /merge result/i
    );
    for (const mergeable of [null, false]) {
      pr.mergeable = mergeable;
      await assert.rejects(
        resolve(github, context, selection, { sourceRevision: merge }),
        /rerun/i
      );
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
