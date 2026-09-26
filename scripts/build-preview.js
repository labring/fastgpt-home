#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
require('@next/env').loadEnvConfig(process.cwd(), false);

if (process.env.NEXT_PUBLIC_SITE_VARIANT !== 'preview') {
  throw new Error('Preview builds require NEXT_PUBLIC_SITE_VARIANT=preview');
}
if (process.env.NEXT_PUBLIC_CRM_API_URL?.trim()) {
  throw new Error('Preview builds require disabled CRM');
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npm, ['run', 'build:export'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
if (result.status === 0) {
  const { packagePreviewArtifact } = require('./package-preview-artifact');
  console.log(`[build-preview] packaged ${packagePreviewArtifact()}`);
}
