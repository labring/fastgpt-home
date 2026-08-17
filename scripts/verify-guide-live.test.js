const assert = require('node:assert/strict');
const test = require('node:test');
const { buildExpectedMatrix, validateProviderReceipt, parseArgs } = require('./verify-guide-live.js');

test('live matrix contains nine Guide routes per owned variant', () => {
  const matrix = buildExpectedMatrix();
  assert.equal(matrix.cn.routes.length, 9);
  assert.equal(matrix.io.routes.length, 9);
  assert.equal(matrix.cn.host, 'https://fastgpt.cn');
});

test('provider receipts require actual immutable provider revisions', () => {
  const manifest = { variant: 'cn', releaseRevision: 'revision', artifactDigest: 'tree', treeDigest: 'tree', rollbackTarget: 'previous' };
  assert.throws(() => validateProviderReceipt({}, manifest), /provider receipt/i);
  assert.throws(() => validateProviderReceipt({ schemaVersion: 1, variant: 'cn', releaseRevision: 'revision', artifactDigest: 'tree', treeDigest: 'tree', archiveDigest: 'archive', rollbackTarget: 'previous', provider: {} }, manifest), /image digest/i);
});

test('CLI only accepts baseline mode as an explicit flag', () => {
  assert.equal(parseArgs(['--allow-blocked-baseline']).allowBlockedBaseline, true);
  assert.throws(() => parseArgs(['--unknown']), /unknown/i);
});
