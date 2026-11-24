#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const {
  GIT_SHA_PATTERN,
  ZERO_SHA,
  diffSitemapSnapshots,
  fetchLiveSitemapSnapshot,
  filterAndPrioritizeUrls,
  loadLocalSitemapEntries,
  mapGitChangedFilesToCoreUrls,
  resolveIndexNowConfig,
  selectBackfillUrls,
  submitToIndexNow,
  verifyLiveKeyFile
} = require('./lib/indexnow');

const VALID_MODES = ['diff', 'recent', 'content', 'urls', 'all'];

function parseArgs(argv) {
  const options = {
    snapshotLive: false,
    fromLive: false,
    dryRun: false,
    verifyLiveKey: false,
    softFail: false,
    mode: undefined,
    variant: undefined,
    out: undefined,
    outDir: undefined,
    beforeSnapshot: undefined,
    gitBase: undefined,
    gitHead: 'HEAD',
    sinceDays: 45,
    sinceDate: undefined,
    urls: undefined,
    urlsFile: undefined,
    maxUrls: undefined,
    chunkSize: undefined,
    receiptOut: undefined
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const nextValue = () => {
      const value = argv[++index];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(`${token} requires a value`);
      }
      return value;
    };

    if (token === '--snapshot-live') options.snapshotLive = true;
    else if (token === '--from-live') options.fromLive = true;
    else if (token === '--dry-run') options.dryRun = true;
    else if (token === '--verify-live-key') options.verifyLiveKey = true;
    else if (token === '--soft-fail') options.softFail = true;
    else if (token === '--mode') options.mode = nextValue();
    else if (token === '--variant') options.variant = nextValue();
    else if (token === '--out') options.out = nextValue();
    else if (token === '--out-dir') options.outDir = nextValue();
    else if (token === '--before-snapshot') options.beforeSnapshot = nextValue();
    else if (token === '--git-base') options.gitBase = nextValue();
    else if (token === '--git-head') options.gitHead = nextValue();
    else if (token === '--since-days') options.sinceDays = Number(nextValue());
    else if (token === '--since-date') options.sinceDate = nextValue();
    else if (token === '--urls') options.urls = nextValue();
    else if (token === '--urls-file') options.urlsFile = nextValue();
    else if (token === '--max-urls') options.maxUrls = Number(nextValue());
    else if (token === '--chunk-size') options.chunkSize = Number(nextValue());
    else if (token === '--receipt-out') options.receiptOut = nextValue();
    else throw new Error(`Unknown argument: ${token}`);
  }

  return options;
}

function writeJsonFile(filePath, data) {
  const resolved = path.resolve(filePath);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function appendStepSummary(markdown) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;
  try {
    fs.appendFileSync(summaryPath, `${markdown}\n`, 'utf8');
  } catch (error) {
    console.warn(`[indexnow] Unable to append GITHUB_STEP_SUMMARY: ${error.message}`);
  }
}

function getGitChangedFiles(baseSha, headSha, cwd = process.cwd()) {
  if (!baseSha || ZERO_SHA.test(baseSha) || !GIT_SHA_PATTERN.test(baseSha)) {
    return { files: [], warning: 'git base SHA missing or all-zero; skipping git core-route diff' };
  }
  const resolvedHead = headSha || 'HEAD';
  try {
    const output = execFileSync('git', ['diff', '--name-only', `${baseSha}..${resolvedHead}`], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    const files = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    return { files, warning: null };
  } catch (error) {
    return {
      files: [],
      warning: `git diff ${baseSha}..${resolvedHead} unavailable (${error.message.split('\n')[0]})`
    };
  }
}

function readExplicitUrls(options) {
  const parts = [];
  if (options.urls) parts.push(options.urls);
  if (options.urlsFile) {
    const resolved = path.resolve(options.urlsFile);
    parts.push(fs.readFileSync(resolved, 'utf8'));
  }
  return parts.join('\n');
}

function formatReceiptSummary(receipt) {
  const sampleLines = receipt.sampleUrls.length
    ? receipt.sampleUrls.map((url) => `- \`${url}\``).join('\n')
    : '- _(none)_';
  const batchLines = receipt.batches.length
    ? receipt.batches
        .map(
          (batch) =>
            `| ${batch.index} | ${batch.count} | ${batch.status ?? 'dry-run'} | ${batch.attempts} | ${batch.ok ? 'ok' : batch.error || 'failed'} |`
        )
        .join('\n')
    : '| - | 0 | - | 0 | skipped |';

  return [
    `### IndexNow (${receipt.variant} / ${receipt.mode})`,
    '',
    `- **Host**: \`${receipt.host}\``,
    `- **Outcome**: \`${receipt.outcome}\`${receipt.dryRun ? ' (dry-run)' : ''}`,
    `- **Key Verified**: \`${receipt.keyVerified === null ? 'skipped' : receipt.keyVerified}\``,
    `- **Candidates**: ${receipt.selection?.totalCandidates ?? receipt.counts.planned} (planned: ${receipt.counts.planned}, submitted: ${receipt.counts.submitted}, truncated: ${receipt.selection?.truncatedCount ?? 0})`,
    ...(receipt.warnings?.length
      ? ['', '**Warnings**:', ...receipt.warnings.map((warning) => `- ${warning}`)]
      : []),
    '',
    '| Batch | URLs | HTTP Status | Attempts | Result |',
    '| --- | ---: | ---: | ---: | --- |',
    batchLines,
    '',
    '<details><summary>Sample URLs (up to 20)</summary>',
    '',
    sampleLines,
    '',
    '</details>',
    ''
  ].join('\n');
}

async function runSnapshotMode(options, config) {
  if (!options.out) {
    throw new Error('--snapshot-live requires --out <file>');
  }

  const snapshot = await fetchLiveSitemapSnapshot(config.baseUrl);
  writeJsonFile(options.out, snapshot);

  if (!snapshot.ok) {
    const message = `[indexnow] Failed to snapshot live sitemap for ${config.baseUrl}: ${snapshot.error}`;
    if (options.softFail) {
      console.warn(`::warning::${message}`);
      return 0;
    }
    console.error(message);
    return 1;
  }

  console.log(
    `[indexnow] Snapshot saved: ${options.out} (${Object.keys(snapshot.urls).length} URLs across ${snapshot.shardCount} shards)`
  );
  return 0;
}

async function loadAfterEntries(options, config) {
  if (options.outDir) {
    const local = loadLocalSitemapEntries(path.resolve(options.outDir), config.baseUrl);
    return { entries: local.entries, source: 'out-dir', shardCount: local.shardCount };
  }
  if (options.fromLive) {
    const live = await fetchLiveSitemapSnapshot(config.baseUrl);
    if (!live.ok) {
      throw new Error(`Unable to fetch live sitemap from ${config.baseUrl}: ${live.error}`);
    }
    return { entries: live.urls, source: 'live-sitemap', shardCount: live.shardCount };
  }
  if (options.mode === 'urls') {
    return { entries: {}, source: 'explicit-urls', shardCount: 0 };
  }
  throw new Error(`--mode ${options.mode} requires either --out-dir <dir> or --from-live`);
}

async function runSubmitMode(options, config) {
  if (!VALID_MODES.includes(options.mode)) {
    throw new Error(`--mode is required and must be one of: ${VALID_MODES.join(', ')}`);
  }

  const warnings = [];
  const defaultMax = options.mode === 'diff' ? config.defaultAutoLimit : 0;
  const maxUrls =
    options.maxUrls !== undefined && !Number.isNaN(options.maxUrls) ? options.maxUrls : defaultMax;

  const { entries: afterEntries, source: sitemapSource, shardCount } = await loadAfterEntries(
    options,
    config
  );

  let selected;
  let diffCounts = null;
  let gitCoreCount = 0;

  if (options.mode === 'diff') {
    let diff = { added: [], modified: [], removed: [] };
    let beforeSnapshotOk = false;

    if (options.beforeSnapshot && fs.existsSync(path.resolve(options.beforeSnapshot))) {
      try {
        const before = JSON.parse(fs.readFileSync(path.resolve(options.beforeSnapshot), 'utf8'));
        if (before?.ok && before.urls && typeof before.urls === 'object') {
          diff = diffSitemapSnapshots(before.urls, afterEntries);
          beforeSnapshotOk = true;
        } else {
          warnings.push(
            `Pre-deploy live sitemap snapshot unusable (${before?.error || 'ok=false'}); falling back to git diff core URLs only`
          );
        }
      } catch (error) {
        warnings.push(
          `Unable to parse pre-deploy snapshot (${error.message}); falling back to git diff core URLs only`
        );
      }
    } else {
      warnings.push(
        'Pre-deploy live sitemap snapshot missing; falling back to git diff core URLs only'
      );
    }

    const gitDiff = getGitChangedFiles(options.gitBase, options.gitHead);
    if (gitDiff.warning) warnings.push(gitDiff.warning);

    const gitCoreUrls = mapGitChangedFilesToCoreUrls(
      gitDiff.files,
      config.variant,
      config.baseUrl,
      afterEntries
    );
    gitCoreCount = gitCoreUrls.length;
    diffCounts = {
      beforeSnapshotOk,
      added: diff.added.length,
      modified: diff.modified.length,
      removed: diff.removed.length,
      gitCore: gitCoreUrls.length
    };

    selected = filterAndPrioritizeUrls({
      added: diff.added,
      modified: diff.modified,
      removed: diff.removed,
      gitCoreUrls,
      afterEntries,
      host: config.host,
      maxUrls
    });
  } else {
    selected = selectBackfillUrls({
      mode: options.mode,
      afterEntries,
      host: config.host,
      sinceDays: options.sinceDays,
      sinceDate: options.sinceDate,
      explicitUrls: readExplicitUrls(options),
      maxUrls
    });
  }

  if (selected.truncatedCount > 0) {
    warnings.push(
      `Candidate URL count (${selected.totalCandidates}) exceeded maxUrls=${maxUrls}; truncated ${selected.truncatedCount} lower-priority URL(s). Use indexnow-backfill workflow to push the remainder.`
    );
  }

  let keyVerified = null;
  let keyVerification = null;
  let submissionReceipt;

  const shouldVerifyKey =
    options.verifyLiveKey || (!options.dryRun && selected.urls.length > 0);

  if (shouldVerifyKey) {
    keyVerification = await verifyLiveKeyFile(config);
    keyVerified = keyVerification.ok;
    if (!keyVerification.ok && !options.dryRun && selected.urls.length > 0) {
      warnings.push(
        `Live IndexNow key file verification failed at ${config.keyLocation}: ${keyVerification.error}`
      );
      submissionReceipt = {
        schemaVersion: 1,
        timestamp: new Date().toISOString(),
        variant: config.variant,
        host: config.host,
        mode: options.mode,
        endpoint: config.endpoint,
        keyLocation: config.keyLocation,
        dryRun: false,
        counts: {
          submitted: 0,
          planned: selected.urls.length,
          batches: 0
        },
        batches: [],
        sampleUrls: selected.urls.slice(0, 20),
        outcome: 'failed'
      };
    }
  }

  if (!submissionReceipt) {
    submissionReceipt = await submitToIndexNow({
      config,
      urls: selected.urls,
      mode: options.mode,
      dryRun: options.dryRun,
      chunkSize: options.chunkSize
    });
  }

  const receipt = {
    ...submissionReceipt,
    sitemapSource,
    shardCount,
    keyVerified,
    keyVerification,
    selection: {
      totalCandidates: selected.totalCandidates,
      truncatedCount: selected.truncatedCount,
      cutoffDate: selected.cutoffDate ?? null,
      diffCounts,
      gitCoreCount
    },
    warnings
  };

  if (options.receiptOut) {
    writeJsonFile(options.receiptOut, receipt);
  }

  for (const warning of warnings) {
    const prefix = options.softFail ? '::warning::' : '[indexnow] warning: ';
    console.warn(`${prefix}${warning}`);
  }

  appendStepSummary(formatReceiptSummary(receipt));

  console.log(
    `[indexnow] variant=${receipt.variant} mode=${receipt.mode} outcome=${receipt.outcome} planned=${receipt.counts.planned} submitted=${receipt.counts.submitted} truncated=${receipt.selection.truncatedCount}`
  );

  if (receipt.outcome === 'failed') {
    const errorMessage = `[indexnow] Submission failed for ${config.host}`;
    if (options.softFail) {
      console.warn(`::warning::${errorMessage}`);
      return 0;
    }
    console.error(errorMessage);
    return 1;
  }

  return 0;
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const config = resolveIndexNowConfig(options.variant);
  if (!config) {
    throw new Error(
      `--variant must be a production site variant (cn or io); received "${options.variant || ''}"`
    );
  }

  if (options.snapshotLive) {
    return runSnapshotMode(options, config);
  }
  return runSubmitMode(options, config);
}

if (require.main === module) {
  main()
    .then((code) => {
      process.exitCode = code;
    })
    .catch((error) => {
      const softFail = process.argv.includes('--soft-fail');
      if (softFail) {
        console.warn(`::warning::[indexnow] ${error.message}`);
        process.exitCode = 0;
      } else {
        console.error(`[indexnow] ${error.message}`);
        process.exitCode = 1;
      }
    });
}

module.exports = {
  getGitChangedFiles,
  main,
  parseArgs
};
