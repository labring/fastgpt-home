#!/usr/bin/env node

const path = require('node:path');
const {
  INDEXNOW_KEY,
  buildIndexNowBatches,
  collectChangedSitemapUrls,
  submitIndexNow,
  verifyLocalKeyFile
} = require('./lib/indexnow');

function parseArgs(argv) {
  const options = {
    recentDays: 2,
    dryRun: false,
    skipKeyCheck: false,
    allowUnverifiedKey: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--variant') {
      options.variant = argv[++index];
    } else if (token === '--host') {
      options.host = argv[++index];
    } else if (token === '--base-ref') {
      options.baseRef = argv[++index];
    } else if (token === '--recent-days') {
      options.recentDays = Number(argv[++index]);
    } else if (token === '--urls') {
      const raw = argv[++index] || '';
      options.explicitUrls = raw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (token === '--dry-run') {
      options.dryRun = true;
    } else if (token === '--skip-key-check') {
      options.skipKeyCheck = true;
    } else if (token === '--allow-unverified-key') {
      options.allowUnverifiedKey = true;
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  return options;
}

async function main(argv = process.argv.slice(2)) {
  const repoRoot = path.resolve(__dirname, '..');
  const options = parseArgs(argv);
  const localKeyCheck = verifyLocalKeyFile(repoRoot, INDEXNOW_KEY);
  if (!localKeyCheck.ok) {
    throw new Error(localKeyCheck.reason);
  }

  const selection = collectChangedSitemapUrls({
    repoRoot,
    variant: options.variant,
    host: options.host,
    baseRef: options.baseRef,
    recentDays: options.recentDays,
    explicitUrls: options.explicitUrls
  });
  const batches = buildIndexNowBatches(selection.urls, selection.host, INDEXNOW_KEY);

  if (options.dryRun) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          host: selection.host,
          keyLocation: `https://${selection.host}/${INDEXNOW_KEY}.txt`,
          localKeyFile: 'verified',
          selectionMode: selection.mode,
          totalUrls: selection.urls.length,
          batchCount: batches.length,
          sampleUrls: selection.urls.slice(0, 10)
        },
        null,
        2
      )
    );
    return;
  }

  const result = await submitIndexNow({
    host: selection.host,
    urls: selection.urls,
    key: INDEXNOW_KEY,
    skipKeyCheck: options.skipKeyCheck,
    allowUnverifiedKey: options.allowUnverifiedKey
  });
  console.log(
    JSON.stringify(
      {
        ...result,
        selectionMode: selection.mode,
        sampleUrls: selection.urls.slice(0, 10)
      },
      null,
      2
    )
  );
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`[submit-indexnow] ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { main, parseArgs };
