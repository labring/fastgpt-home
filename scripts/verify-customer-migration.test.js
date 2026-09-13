const assert = require('node:assert/strict');
const test = require('node:test');
const path = require('node:path');
const {
  buildCustomerMigrationProjection,
  readCustomerMigrationAuthority,
  readCustomerMigrationProjection,
  stableJson,
  validateMigrationRecords
} = require('./lib/customer-migration');

const ROOT = path.resolve(__dirname, '..');

function record(sourcePath, targetPath, sourceHost = 'example.test', targetHost = sourceHost) {
  return {
    disposition: 'accepted',
    sourceHost,
    sourcePath,
    targetHost,
    targetPath,
    sourceClass: 'fixture',
    reason: 'fixture'
  };
}

function validateFixture(records, options = {}) {
  return validateMigrationRecords(records, {
    sourceHost: 'example.test',
    targetHost: 'example.test',
    ...options
  });
}

test('rejects duplicate, source-to-many, self, chain, cycle, and outside-authority mappings', () => {
  assert.throws(
    () => validateFixture([record('/old', '/new'), record('/old', '/new')]),
    /duplicate source mapping/
  );
  assert.throws(
    () => validateFixture([record('/old', '/new'), record('/old', '/other')]),
    /source-to-many mapping/
  );
  assert.throws(() => validateFixture([record('/same', '/same')]), /self redirect/);
  assert.throws(
    () => validateFixture([record('/old', '/middle'), record('/middle', '/new')]),
    /redirect chain/
  );
  assert.throws(
    () => validateFixture([record('/old', '/middle'), record('/middle', '/old')]),
    /redirect cycle/
  );
  assert.throws(
    () => validateFixture([record('/old', '/outside')], { allowedTargetPaths: ['/new'] }),
    /outside customer authority/
  );
});

test('committed customer migration projection is deterministic and matches authority', () => {
  const authority = readCustomerMigrationAuthority(ROOT);
  const first = buildCustomerMigrationProjection(authority);
  const second = buildCustomerMigrationProjection(authority);
  const committed = readCustomerMigrationProjection(ROOT, authority);

  assert.equal(first.digest, second.digest);
  assert.equal(stableJson(first), stableJson(second));
  assert.equal(stableJson(first), stableJson(committed));
  assert.equal(first.entries.length, 230);
  assert.equal(
    first.entries.some((entry) => entry.sourcePath === '/customers/manifest.webmanifest'),
    false
  );
  assert.equal(first.targetCount, 107);
});
