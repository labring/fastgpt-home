const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '../..');
const EXPECTED_FAQ_COUNTS = { io: 1400, cn: 1490, preview: 1400 };

function createReleaseRecord(options) {
  return {
    startedAt: new Date().toISOString(),
    sourceRevision: process.env.GITHUB_SHA,
    options,
    commands: [],
    variants: [],
    artifacts: [],
    rollback: { inventory: [] }
  };
}

function recordStep(record, id, label, command, variant, status, output, evidence, durationMs) {
  if (!record) return;
  record.commands.push({
    id,
    label,
    command,
    variant,
    status,
    durationMs,
    evidence,
    output: output.trim().slice(status === 'failed' ? -4000 : -1200)
  });
}

function recordVariantOutcome(record, variant, failures, commandStart) {
  if (!record) return;
  const commands = record.commands.slice(commandStart);
  record.variants.push({
    variant,
    outcome: failures.some((failure) => failure.variant === variant) ? 'failed' : 'export-verified',
    buildDurationMs: commands.find((step) => step.id === 'variant.build')?.durationMs
  });
}

function finalizeReleaseRecord(record, failures, options) {
  record.finishedAt = new Date().toISOString();
  record.failures = failures;
  record.status = failures.length
    ? 'failed'
    : options.sourceOnly
    ? 'source-verified'
    : 'export-verified';
  for (const variant of record.variants) {
    if (failures.some((failure) => failure.variant === variant.variant)) variant.outcome = 'failed';
  }
  return record;
}

function writeReleaseRecord(record) {
  const recordPath = path.join(ROOT, '.release-artifacts/release-verification.json');
  fs.mkdirSync(path.dirname(recordPath), { recursive: true });
  fs.writeFileSync(recordPath, `${JSON.stringify(record, null, 2)}\n`);
  return recordPath;
}

module.exports = {
  EXPECTED_FAQ_COUNTS,
  createReleaseRecord,
  finalizeReleaseRecord,
  recordStep,
  recordVariantOutcome,
  writeReleaseRecord
};
