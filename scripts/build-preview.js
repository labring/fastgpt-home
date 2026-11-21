#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { runWithDiskMonitor, logDiskUsage } = require('./lib/run-with-disk-monitor');

async function main() {
  require('@next/env').loadEnvConfig(process.cwd(), false);
  if (process.env.NEXT_PUBLIC_SITE_VARIANT !== 'preview') {
    throw new Error('Preview builds require NEXT_PUBLIC_SITE_VARIANT=preview');
  }
  if (process.env.NEXT_PUBLIC_CRM_API_URL?.trim()) {
    throw new Error('Preview builds require disabled CRM');
  }

  const root = process.cwd();
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const metricsPath = path.join(root, '.next/cache/preview-metrics.json');
  fs.rmSync(metricsPath, { force: true });
  const startedAt = process.hrtime.bigint();
  // 异步等待构建，才能在 Next 生成大量页面时持续记录磁盘余量。
  const result = await runWithDiskMonitor(npm, ['run', 'build'], {
    cwd: root,
    stage: 'static-export',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PREVIEW_METRICS_PATH: metricsPath
    }
  });
  process.exitCode = result.status ?? 1;
  if (result.status !== 0) return;

  logDiskUsage(root, 'package:start');
  try {
    const buildMetrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
    buildMetrics.buildSeconds = Number(process.hrtime.bigint() - startedAt) / 1e9;
    const { packagePreviewArtifact } = require('./package-preview-artifact');
    // 后续 CI 直接上传已封装的产物，不再需要根目录的 out 副本。
    const bundle = packagePreviewArtifact(root, buildMetrics, { consumeExport: true });
    logDiskUsage(root, 'package:end');
    console.log(`[build-preview] packaged ${bundle}`);
  } catch (error) {
    logDiskUsage(root, 'package:failed');
    throw error;
  }
}

main().catch((error) => {
  console.error(`[build-preview] ${error.stack || error.message}`);
  process.exitCode = 1;
});
