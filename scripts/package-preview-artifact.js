#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { inventoryPayload } = require('./lib/site-artifacts');
const { getPublicationInputs } = require('./lib/site-artifact-identity');

function readSource(revision) {
  let event = {};
  if (process.env.GITHUB_EVENT_PATH && fs.existsSync(process.env.GITHUB_EVENT_PATH)) {
    event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  }
  const pullRequest = event.pull_request;
  return {
    event: process.env.GITHUB_EVENT_NAME || 'unknown',
    runId: process.env.GITHUB_RUN_ID || '',
    runAttempt: process.env.GITHUB_RUN_ATTEMPT || '',
    revision,
    baseRevision: pullRequest?.base?.sha || '',
    headRevision: pullRequest?.head?.sha || ''
  };
}

function packagePreviewArtifact(
  root = process.cwd(),
  buildMetrics,
  { consumeExport = false } = {}
) {
  const destination = path.join(root, '.release-artifacts/site/preview-disabled');
  const identity = JSON.parse(
    fs.readFileSync(path.join(root, '.next/cache/site-identity.json'), 'utf8')
  );
  assert.equal(identity.siteVariant, 'preview', 'Preview artifact requires Preview settings');
  assert.equal(identity.crmMode, 'disabled', 'Preview artifact requires disabled CRM');
  const out = path.join(root, 'out');
  assert(fs.lstatSync(out).isDirectory(), 'Preview export must be a real directory');
  for (const file of ['index.html', '404.html', 'robots.txt']) {
    assert(fs.statSync(path.join(out, file)).isFile(), `Missing preview artifact: ${file}`);
  }

  const publicationInputs = getPublicationInputs(identity);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const staging = fs.mkdtempSync(`${destination}.staging-`);
  const payload = path.join(staging, 'payload');
  const stagedOut = path.join(payload, 'out');
  const previous = `${staging}.previous`;
  let exportMoved = false;
  let previousMoved = false;
  let preserveStaging = false;

  // 清理失败只报告残留位置，不能撤销已完成的发布或覆盖原始错误。
  const cleanTemporaryDirectory = (directory) => {
    try {
      fs.rmSync(directory, { recursive: true, force: true });
    } catch (error) {
      console.warn(
        `[package-preview-artifact] cleanup failed; retained ${directory}: ${error.message}`
      );
    }
  };

  try {
    fs.mkdirSync(payload, { recursive: true });
    if (consumeExport) {
      // CI 后续只使用 bundle；同盘移动避免保留两份完整静态输出。
      try {
        fs.renameSync(out, stagedOut);
      } catch (error) {
        if (error.code === 'EXDEV') {
          throw Object.assign(
            new Error(
              'Consuming the preview export requires out and the artifact on the same filesystem',
              {
                cause: error
              }
            ),
            { code: 'EXDEV' }
          );
        }
        throw error;
      }
      exportMoved = true;
    } else {
      fs.cpSync(out, stagedOut, { recursive: true });
    }
    fs.copyFileSync(path.join(root, 'wrangler.json'), path.join(payload, 'wrangler.json'));
    const inventory = inventoryPayload(payload);
    const exportedFiles = inventory.files.filter(({ path: file }) => file.startsWith('out/'));
    const htmlFiles = exportedFiles.filter(({ path: file }) => file.endsWith('.html'));
    const metrics = buildMetrics
      ? {
          ...buildMetrics,
          artifactFiles: exportedFiles.length,
          artifactBytes: exportedFiles.reduce((total, file) => total + file.bytes, 0),
          htmlFiles: htmlFiles.length,
          htmlBytes: htmlFiles.reduce((total, file) => total + file.bytes, 0)
        }
      : undefined;
    const manifest = {
      kind: 'preview',
      schemaVersion: 1,
      source: readSource(identity.sourceRevision),
      publicationInputs,
      ...(metrics ? { metrics } : {}),
      inventory
    };
    fs.writeFileSync(path.join(staging, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    // 新产物准备完成后才替换旧包；替换失败仍能恢复上一份产物。
    if (fs.existsSync(destination)) {
      fs.renameSync(destination, previous);
      previousMoved = true;
    }
    fs.renameSync(staging, destination);
  } catch (error) {
    const recoveryErrors = [];
    if (exportMoved) {
      try {
        assert(!fs.existsSync(out), `Cannot restore the export over an existing path: ${out}`);
        fs.renameSync(stagedOut, out);
      } catch (recoveryError) {
        // 恢复失败时保留唯一输出副本，禁止 finally 把它当临时文件删除。
        preserveStaging = true;
        recoveryErrors.push(
          new Error(`Preview export retained at ${stagedOut}: ${recoveryError.message}`)
        );
      }
    }
    if (previousMoved) {
      try {
        assert(
          !fs.existsSync(destination),
          `Cannot restore over an existing artifact: ${destination}`
        );
        fs.renameSync(previous, destination);
      } catch (recoveryError) {
        recoveryErrors.push(
          new Error(`Previous artifact retained at ${previous}: ${recoveryError.message}`)
        );
      }
    }
    if (recoveryErrors.length) {
      throw new AggregateError(
        [error, ...recoveryErrors],
        `${error.message}; ${recoveryErrors.map((failure) => failure.message).join('; ')}`,
        { cause: error }
      );
    }
    throw error;
  } finally {
    if (!preserveStaging) cleanTemporaryDirectory(staging);
  }
  if (previousMoved) cleanTemporaryDirectory(previous);
  return destination;
}

if (require.main === module) {
  try {
    console.log(`[package-preview-artifact] wrote ${packagePreviewArtifact()}`);
  } catch (error) {
    console.error(`[package-preview-artifact] ${error.message}`);
    process.exitCode = 1;
  }
}
module.exports = { packagePreviewArtifact };
