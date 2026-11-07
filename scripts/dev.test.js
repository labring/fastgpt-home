const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

test('dev generates content collections before starting Next', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const source = fs.readFileSync(path.join(root, 'scripts/dev.js'), 'utf8');

  assert.equal(packageJson.scripts.dev, 'node scripts/dev.js');
  assert.match(source, /generate-content-collections\.js/);
  assert.match(source, /\[nextBin, 'dev', '--webpack'/);
  assert.match(source, /contentRoot, 'blogs'/);
  assert.match(source, /contentRoot, 'authors'/);
});
