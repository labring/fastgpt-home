#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log('Phase 3 verification: build with telemetry disabled, audit exact static routes, then inspect JSON reports before publishing.');
run(process.execPath, ['scripts/phase3/test_competitor_manifest.mjs']);
run(process.execPath, ['scripts/phase3/test_competitor_build.mjs']);
