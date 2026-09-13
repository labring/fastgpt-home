#!/usr/bin/env node
/** Run the owner-supplied two-origin customer migration HTTP contract. */
const fs = require('node:fs');
const path = require('node:path');
const { runCustomerMigrationHttpContract } = require('./lib/customer-migration-http');

function parseArgs(argv) {
  const options = {};
  const supported = new Set([
    '--legacy-target',
    '--terminal-target',
    '--approved-legacy-target',
    '--approved-terminal-target',
    '--contract',
    '--output',
    '--root'
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!supported.has(token)) throw new Error(`Unknown argument: ${token}`);
    const value = argv[++index];
    if (!value || value.startsWith('--')) throw new Error(`${token} requires a value`);
    options[token.slice(2).replaceAll('-', '')] = value;
  }
  if (!options.legacytarget || !options.terminaltarget || !options.contract) {
    throw new Error(
      'Usage: --legacy-target <https-url> --terminal-target <https-url> --contract <json> [--approved-legacy-target <https-url>] [--approved-terminal-target <https-url>] [--output <json>]'
    );
  }
  return options;
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const contractPath = path.resolve(options.contract);
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const rootDir = options.root ? path.resolve(options.root) : path.resolve(__dirname, '..');
  const outputPath = options.output ? path.resolve(options.output) : undefined;
  const result = await runCustomerMigrationHttpContract({
    legacyTarget: options.legacytarget,
    terminalTarget: options.terminaltarget,
    approvedLegacyTarget: options.approvedlegacytarget,
    approvedTerminalTarget: options.approvedterminaltarget,
    contract,
    rootDir,
    artifactDirectory: outputPath
      ? path.join(
          path.dirname(outputPath),
          `${path.basename(outputPath, path.extname(outputPath))}-responses`
        )
      : undefined
  });
  const output = `${JSON.stringify(result, null, 2)}\n`;
  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, output);
  }
  process.stdout.write(output);
  if (result.status === 'passed') {
    process.stderr.write(
      `[verify-customer-migration-http] passed: ${result.sourceCount} sources, ${result.targetCount} terminal targets, ${result.responses.length} HTTP responses\n`
    );
  }
  if (result.status !== 'passed') process.exitCode = 1;
  return result;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`[verify-customer-migration-http] ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { main, parseArgs };
