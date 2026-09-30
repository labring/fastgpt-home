#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
require('@next/env').loadEnvConfig(process.cwd(), false);

if (process.env.NEXT_PUBLIC_SITE_VARIANT !== 'preview') {
  throw new Error('Preview builds require NEXT_PUBLIC_SITE_VARIANT=preview');
}
if (process.env.NEXT_PUBLIC_CRM_API_URL?.trim()) {
  throw new Error('Preview builds require disabled CRM');
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const metricsPath = path.join(process.cwd(), '.next/cache/preview-metrics.json');
fs.rmSync(metricsPath, { force: true });
const startedAt = process.hrtime.bigint();
const result = spawnSync(npm, ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PREVIEW_METRICS_PATH: metricsPath
  }
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
if (result.status === 0) {
  const buildMetrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
  buildMetrics.buildSeconds = Number(process.hrtime.bigint() - startedAt) / 1e9;
  const { packagePreviewArtifact } = require('./package-preview-artifact');
  console.log(`[build-preview] packaged ${packagePreviewArtifact(process.cwd(), buildMetrics)}`);
}
