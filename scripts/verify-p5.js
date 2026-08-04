#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

function run(args) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log('Phase 5 verification: build and validate the complete W2 release handoff.');
run(['scripts/phase5/build_release_handoff.mjs']);
run(['scripts/phase5/test_release_handoff.mjs']);
