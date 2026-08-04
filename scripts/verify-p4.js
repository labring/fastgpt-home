#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

function run(args, allowedStatuses = [0]) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env });
  if (!allowedStatuses.includes(result.status)) process.exit(result.status || 1);
}

console.log('Phase 4 verification: validate Meta mapping and the fail-closed legacy batch contract.');
run(['scripts/phase4/meta_overlay.mjs']);
run(['scripts/phase4/legacy_batch.mjs'], [2]);
run(['scripts/phase4/test_meta_overlay.mjs']);
run(['scripts/phase4/test_legacy_batch.mjs']);
run(['scripts/phase4/test_phase4_build.mjs']);
