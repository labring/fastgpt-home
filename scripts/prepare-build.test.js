const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

test('build preparation preserves compatible compilation data and removes stale rendered output', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'site-build-cache-'));
  const write = (file, content = 'fixture') => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), content);
  };
  const run = (settings = {}) => {
    const result = spawnSync(process.execPath, [path.resolve(__dirname, 'prepare-build.js')], {
      cwd: root,
      encoding: 'utf8',
      env: { PATH: process.env.PATH, NEXT_PUBLIC_SITE_VARIANT: 'preview', ...settings }
    });
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  };
  try {
    execFileSync('git', ['init', '-q'], { cwd: root });
    write('package-lock.json', '{}');
    execFileSync('git', ['add', '.'], { cwd: root });
    execFileSync(
      'git',
      ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'Test'],
      { cwd: root }
    );
    const cold = run();
    write('.next/cache/compiler-data');
    write('.next/server/removed.html');
    write('out/renamed.html');
    const warm = run();
    assert.equal(warm.cacheKey, cold.cacheKey);
    assert.equal(warm.cacheRestored, true);
    assert(fs.existsSync(path.join(root, '.next/cache/compiler-data')));
    assert(!fs.existsSync(path.join(root, '.next/server')));
    assert(!fs.existsSync(path.join(root, 'out')));
    for (const setting of [
      { NEXT_PUBLIC_CRM_API_URL: 'https://crm-preview.invalid' },
      { NEXT_PUBLIC_SITE_VARIANT: 'cn' },
      { NEXT_PUBLIC_FILING_ADDRESS: 'Changed public copy' }
    ]) {
      const changed = run(setting);
      assert.notEqual(changed.cacheKey, cold.cacheKey);
      assert.equal(changed.cacheRestored, false);
    }
    write('.env.production', 'NEXT_PUBLIC_CRM_API_URL=https://crm-from-file.invalid\n');
    assert.notEqual(run().cacheKey, cold.cacheKey);
    fs.rmSync(path.join(root, '.next'), { recursive: true });
    assert.equal(run().cacheRestored, false);
    write('package-lock.json', '{"changed":true}');
    assert.notEqual(run().cacheKey, cold.cacheKey);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
