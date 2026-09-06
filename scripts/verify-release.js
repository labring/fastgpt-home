#!/usr/bin/env node

/**
 * Run the complete source and static-export release gate without third-party dependencies.
 *
 * Source mode stays runnable on development volumes. Full mode requires a case-sensitive
 * filesystem because mixed-case FAQ slugs are part of the published URL contract.
 */

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const {
  verifyUrlAliasArtifactBundle,
  writeUrlAliasArtifactBundle
} = require('./lib/url-alias-artifacts');
const { siteVariants } = require('./lib/site-variant');
const {
  assertCaseSensitiveFilesystem,
  clearBuildArtifacts,
  recordVariantArtifactInventory,
  recordVariantExportRollbackInventory,
  recordVariantRollbackInventory,
  restoreGeneratedPublicFiles,
  retainFailureArtifacts,
  snapshotGeneratedPublicFiles,
  variantEnvironment,
  verifyExportCardinality
} = require('./lib/release-artifacts');
const {
  createReleaseRecord,
  finalizeReleaseRecord,
  recordStep,
  recordVariantOutcome,
  writeReleaseRecord
} = require('./lib/release-record');
const {
  extractP1SuccessMeasurement,
  getSourceNodeSteps,
  getSourceNpmSteps,
  getVariantSteps
} = require('./lib/release-steps');

const ROOT = path.resolve(__dirname, '..');
const RETAIN_DIR = path.join(ROOT, '.release-artifacts');
const P1_BASELINE_KIB = 266.9;
const P1_BUDGET_KIB = 260;

function parseArgs(argv) {
  const options = {
    sourceOnly: false,
    keepArtifacts: false,
    variant: undefined
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--source-only') options.sourceOnly = true;
    else if (token === '--keep-artifacts') options.keepArtifacts = true;
    else if (token === '--variant') {
      const variant = argv[++index];
      if (!siteVariants.includes(variant)) {
        throw new Error(`--variant requires one of: ${siteVariants.join(', ')}`);
      }
      options.variant = variant;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  return options;
}

function runStep(failures, stepId, label, command, args, env, variant, formatSuccess, record) {
  const startedAt = performance.now();
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024
  });
  const durationMs = Math.round(performance.now() - startedAt);
  const output = `${result.stdout || ''}${result.stderr || ''}`;
  if (result.error || result.status !== 0) {
    const failureOutput = result.error ? `${output}\n${result.error.message}` : output;
    recordStep(
      record,
      stepId,
      label,
      [command, ...args].join(' '),
      variant,
      'failed',
      failureOutput,
      undefined,
      durationMs
    );
    failures.push({
      id: stepId,
      label,
      command: [command, ...args].join(' '),
      output: failureOutput,
      variant
    });
    console.error(`[verify-release] ${label} failed`);
    return false;
  }
  const successEvidence = formatSuccess ? formatSuccess(output) : undefined;
  recordStep(
    record,
    stepId,
    label,
    [command, ...args].join(' '),
    variant,
    'passed',
    output,
    successEvidence,
    durationMs
  );
  console.log(`[verify-release] ${label} passed${successEvidence ? `: ${successEvidence}` : ''}`);
  return true;
}

function nodeStep(failures, stepId, label, script, args, env, variant, record, formatSuccess) {
  return runStep(
    failures,
    stepId,
    label,
    process.execPath,
    [script, ...args],
    env,
    variant,
    formatSuccess,
    record
  );
}

function npmStep(failures, stepId, label, args, env, variant, formatSuccess, record) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  return runStep(
    failures,
    stepId,
    label,
    npm,
    ['run', ...args],
    env,
    variant,
    formatSuccess,
    record
  );
}

function getSourceExecutionOrder() {
  return [
    ...getSourceNodeSteps().map(([stepId]) => stepId),
    ...getSourceNpmSteps().map(([stepId]) => stepId),
    'lint.source',
    'typescript.source',
    'guide-content.source'
  ];
}

function runSourceChecks(failures, env, record) {
  for (const [stepId, label, script, args] of getSourceNodeSteps()) {
    nodeStep(failures, stepId, label, script, args, env, undefined, record);
  }

  for (const [stepId, label, args] of getSourceNpmSteps()) {
    npmStep(failures, stepId, label, args, env, undefined, undefined, record);
  }
  npmStep(
    failures,
    'lint.source',
    'Lint source verification',
    ['lint'],
    env,
    undefined,
    undefined,
    record
  );
  runStep(
    failures,
    'typescript.source',
    'TypeScript source verification',
    'npx',
    ['--no-install', 'tsc', '--noEmit', '--incremental', 'false'],
    env,
    undefined,
    undefined,
    record
  );
}

function runGuideSourceChecks(failures, env, variant, record) {
  const suffix = variant ? ` (${variant})` : '';
  nodeStep(
    failures,
    'guide-content.source',
    `Guide content source verification${suffix}`,
    'scripts/verify-guide-content.js',
    [],
    env,
    variant,
    record
  );
}

function getVariantExecutionOrder(variant) {
  return [
    'variant.build',
    ...getVariantSteps(variant).map((step) => step.id),
    'faq.export-cardinality',
    'guide.export'
  ];
}

function runVariantChecks(failures, variant, env, record) {
  const commandStart = record?.commands.length || 0;
  const buildPassed = npmStep(
    failures,
    'variant.build',
    `build ${variant}`,
    ['build'],
    env,
    variant,
    undefined,
    record
  );
  if (!buildPassed) {
    recordVariantOutcome(record, variant, failures, commandStart);
    return false;
  }

  for (const step of getVariantSteps(variant)) {
    if (step.runner === 'node') {
      nodeStep(
        failures,
        step.id,
        step.label,
        step.command,
        step.args,
        env,
        variant,
        record,
        step.formatSuccess
      );
      continue;
    }
    npmStep(failures, step.id, step.label, step.args, env, variant, step.formatSuccess, record);
  }

  try {
    verifyExportCardinality(variant);
    recordStep(
      record,
      'faq.export-cardinality',
      `export cardinality (${variant})`,
      'in-process static export cardinality check',
      variant,
      'passed',
      'FAQ HTML and sitemap cardinality matched the release contract'
    );
    console.log(`[verify-release] export cardinality (${variant}) passed`);
  } catch (error) {
    failures.push({
      id: 'faq.export-cardinality',
      label: `export cardinality (${variant})`,
      variant,
      command: 'in-process static export cardinality check',
      output: error.message
    });
    recordStep(
      record,
      'faq.export-cardinality',
      `export cardinality (${variant})`,
      'in-process static export cardinality check',
      variant,
      'failed',
      error.message
    );
    console.error(`[verify-release] export cardinality (${variant}) failed`);
  }

  if (variant === 'preview') {
    nodeStep(
      failures,
      'guide.export',
      `Guide export artifact verification (${variant})`,
      'scripts/verify-guide-preview.js',
      ['--out-dir', 'out'],
      env,
      variant,
      record
    );
  } else {
    nodeStep(
      failures,
      'guide.export',
      `Guide export artifact verification (${variant})`,
      'scripts/verify-guide-export.js',
      ['--out-dir', 'out', '--variant', variant],
      env,
      variant,
      record,
      (output) => {
        const match = output.match(
          /Guide HTML verified: (\d+) pages, (\d+) sitemap URLs \(tracer=([^)]+)\)/
        );
        return match ? `tracer=${match[3]} pages=${match[1]} sitemapUrls=${match[2]}` : undefined;
      }
    );
  }
  recordVariantOutcome(record, variant, failures, commandStart);
  return true;
}

function appendP1HistoricalBaselineAdvisories(failures, startIndex, advisories) {
  for (const failure of failures.slice(startIndex)) {
    const budgetMatch = failure.output.match(
      /Initial JavaScript is ([0-9.]+) KiB gzip, budget is 260 KiB/
    );
    if (failure.id !== 'p1.export' || !budgetMatch) continue;
    const currentKib = Number.parseFloat(budgetMatch[1]);
    const deltaKib = currentKib - P1_BASELINE_KIB;
    advisories.push({
      ...failure,
      label: 'P1 historical baseline comparison',
      output:
        `current=${currentKib.toFixed(1)} KiB gzip; c77cf48 APFS baseline=${P1_BASELINE_KIB.toFixed(
          1
        )} KiB gzip; ` +
        `delta=${deltaKib >= 0 ? '+' : ''}${deltaKib.toFixed(
          1
        )} KiB; budget=${P1_BUDGET_KIB} KiB; ` +
        `command=${failure.command}; variant=${failure.variant}`
    });
  }
}

function reportFailures(failures, advisories, retainedPaths) {
  if (!failures.length && !advisories.length) return;
  if (failures.length) console.error(`\n[verify-release] failed with ${failures.length} check(s)`);
  for (const failure of failures) {
    console.error(`\n- ${failure.label}${failure.variant ? ` [variant=${failure.variant}]` : ''}`);
    console.error(`  command: ${failure.command}`);
    console.error(`  evidence:\n${failure.output}`);
  }
  if (advisories.length) {
    console.warn(`\n[verify-release] known advisory checks (${advisories.length})`);
    for (const advisory of advisories) {
      console.warn(
        `\n- ${advisory.label}${advisory.variant ? ` [variant=${advisory.variant}]` : ''}`
      );
      console.warn(`  command: ${advisory.command}`);
      console.warn(`  evidence: ${advisory.output}`);
    }
  }
  if (failures.length) {
    if (retainedPaths.length) {
      console.error(`\n[verify-release] retained failure artifacts: ${retainedPaths.join(', ')}`);
    } else {
      console.error(
        '[verify-release] rerun with --keep-artifacts to retain failing .next/out evidence'
      );
    }
  }
}

function runReleaseRegressionChecks(failures, env, record) {
  npmStep(
    failures,
    'release.regression',
    'release coordinator regression',
    ['verify:release-regression'],
    env,
    undefined,
    undefined,
    record
  );
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const failures = [];
  const advisories = [];
  const retainedPaths = [];
  const record = createReleaseRecord(options);
  // Source-only checks run inside release regressions; preserve any full release record they inspect.
  if (!options.keepArtifacts && !options.sourceOnly) {
    fs.rmSync(RETAIN_DIR, { recursive: true, force: true });
  }
  const snapshot = snapshotGeneratedPublicFiles();
  const sourceEnv = {
    ...process.env,
    CI: process.env.CI || '1',
    NEXT_PUBLIC_SITE_VARIANT: process.env.NEXT_PUBLIC_SITE_VARIANT || 'io',
    NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io',
    NEXT_PUBLIC_CN_HOME_URL: process.env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn',
    NEXT_PUBLIC_IO_HOME_URL: process.env.NEXT_PUBLIC_IO_HOME_URL || 'https://fastgpt.io'
  };

  try {
    runSourceChecks(failures, sourceEnv, record);
    runGuideSourceChecks(failures, sourceEnv, undefined, record);
    if (failures.length || options.sourceOnly) {
      reportFailures(failures, advisories, retainedPaths);
      if (!failures.length) {
        console.log(
          '[verify-release] source-only checks passed; full mode requires a case-sensitive filesystem'
        );
      }
      process.exitCode = failures.length ? 1 : 0;
      return;
    }

    runReleaseRegressionChecks(failures, sourceEnv, record);
    if (failures.length) {
      reportFailures(failures, advisories, retainedPaths);
      process.exitCode = 1;
      return;
    }

    try {
      assertCaseSensitiveFilesystem();
      recordStep(
        record,
        'filesystem.case-sensitive',
        'case-sensitive filesystem policy',
        'in-process case-sensitive filesystem probe',
        undefined,
        'passed',
        'Published route collision probe passed'
      );
      console.log('[verify-release] case-sensitive filesystem probe passed');
    } catch (error) {
      recordStep(
        record,
        'filesystem.case-sensitive',
        'case-sensitive filesystem policy',
        'in-process case-sensitive filesystem probe',
        undefined,
        'failed',
        error.message
      );
      failures.push({
        id: 'filesystem.case-sensitive',
        label: 'case-sensitive filesystem policy',
        command: 'in-process case-sensitive filesystem probe',
        output: error.message
      });
      clearBuildArtifacts();
      reportFailures(failures, advisories, retainedPaths);
      process.exitCode = 1;
      return;
    }

    const variants = options.variant ? [options.variant] : siteVariants;
    for (const variant of variants) {
      clearBuildArtifacts();
      const env = variantEnvironment(variant);
      const beforeFailures = failures.length;
      runGuideSourceChecks(failures, env, variant, record);
      runVariantChecks(failures, variant, env, record);
      recordVariantArtifactInventory(record, variant);
      appendP1HistoricalBaselineAdvisories(failures, beforeFailures, advisories);
      const variantFailed = failures.length > beforeFailures;
      if (!variantFailed && ['cn', 'io'].includes(variant)) {
        try {
          writeUrlAliasArtifactBundle(ROOT, RETAIN_DIR, variant);
          verifyUrlAliasArtifactBundle(path.join(RETAIN_DIR, 'url-alias'), [variant]);
          recordVariantRollbackInventory(record, variant);
          console.log(`[verify-release] URL Alias ${variant} release/rollback artifacts passed`);
        } catch (error) {
          failures.push({
            id: 'url-alias.artifacts',
            label: `URL Alias release artifacts (${variant})`,
            variant,
            command: 'in-process URL Alias release artifact generation',
            output: error.message
          });
        }
      }
      if (!variantFailed) recordVariantExportRollbackInventory(record, variant);
      if (variantFailed && options.keepArtifacts) {
        try {
          retainedPaths.push(retainFailureArtifacts(variant));
        } catch (error) {
          failures.push({
            id: 'artifacts.retain-failure',
            label: `failure artifact retention (${variant})`,
            variant,
            command: 'in-process failure artifact copy',
            output: error.message
          });
        }
      }
      clearBuildArtifacts();
    }

    reportFailures(failures, advisories, retainedPaths);
    if (!failures.length) console.log('[verify-release] source and export checks passed');
    process.exitCode = failures.length ? 1 : 0;
  } catch (error) {
    failures.push({
      id: 'release.unexpected',
      label: 'Unexpected verification error',
      output: error.message
    });
    throw error;
  } finally {
    finalizeReleaseRecord(record, failures, options);
    if (!options.sourceOnly) {
      const recordPath = writeReleaseRecord(record);
      console.log(`[verify-release] verification record: ${recordPath}`);
    }
    restoreGeneratedPublicFiles(snapshot);
    if (!failures.length || !options.keepArtifacts) {
      clearBuildArtifacts();
    }
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`[verify-release] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  appendP1HistoricalBaselineAdvisories,
  createReleaseRecord,
  extractP1SuccessMeasurement,
  finalizeReleaseRecord,
  getSourceNodeSteps,
  getSourceNpmSteps,
  getSourceExecutionOrder,
  getVariantExecutionOrder,
  getVariantSteps,
  parseArgs
};
