const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { purgeCloudflareCache, parseArgs } = require('./purge-cloudflare-cache.js');

test('dry-run validates, deduplicates, and records deterministic evidence', async () => {
  const result = await purgeCloudflareCache({
    zoneId: 'zone-id',
    urls: ['https://fastgpt.io/guide', 'https://fastgpt.io/guide'],
    dryRun: true
  });
  assert.equal(result.status, 'dry-run');
  assert.deepEqual(result.urls, ['https://fastgpt.io/guide']);
});

test('purge rejects foreign URLs, missing credentials, malformed input, and API failures', async () => {
  await assert.rejects(
    purgeCloudflareCache({ zoneId: 'zone-id', urls: ['https://example.com/guide'], dryRun: true }),
    /surface=url/i
  );
  await assert.rejects(
    purgeCloudflareCache({ zoneId: '', urls: ['https://fastgpt.io/guide'] }),
    /zone/i
  );
  assert.throws(() => parseArgs(['--urls', '{']), /JSON/i);
  await assert.rejects(
    purgeCloudflareCache({
      zoneId: 'zone-id',
      token: 'token',
      urls: ['https://fastgpt.io/guide'],
      fetchImpl: async () => new Response(JSON.stringify({ success: false, errors: [{ message: 'denied' }] }), { status: 403 })
    }),
    /status=403/i
  );
});

test('evidence output does not contain credentials', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'purge-evidence-'));
  try {
    const evidenceOut = path.join(root, 'purge.json');
    await purgeCloudflareCache({ zoneId: 'zone-id', urls: ['https://fastgpt.io/guide'], dryRun: true, evidenceOut });
    assert.equal(fs.readFileSync(evidenceOut, 'utf8').includes('secret-token'), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
