#!/usr/bin/env node

/** Run and persist preview plus production customer migration evidence. */
const fs = require('node:fs');
const path = require('node:path');
const { runCustomerMigrationRelease } = require('./lib/customer-migration-release');

function parseArgs(argv) {
  const options = {};
  const supported = new Set([
    '--contract',
    '--output',
    '--root',
    '--artifact-directory',
    '--preview-legacy-target',
    '--preview-terminal-target',
    '--production-legacy-target',
    '--production-terminal-target'
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!supported.has(token)) throw new Error(`Unknown argument: ${token}`);
    const value = argv[++index];
    if (!value || value.startsWith('--')) throw new Error(`${token} requires a value`);
    options[token.slice(2).replaceAll('-', '')] = value;
  }
  if (!options.contract) {
    throw new Error(
      'Usage: --contract <json> [--output <json>] [--root <directory>] [--artifact-directory <directory>]'
    );
  }
  return options;
}

function applyTargetOverrides(contract, options) {
  const environments = { ...(contract.environments || {}) };
  for (const name of ['preview', 'production']) {
    const legacyTarget = options[`${name}legacytarget`];
    const terminalTarget = options[`${name}terminaltarget`];
    if (legacyTarget || terminalTarget) {
      environments[name] = {
        ...(environments[name] || {}),
        ...(legacyTarget ? { legacyTarget } : {}),
        ...(terminalTarget ? { terminalTarget } : {})
      };
    }
  }
  return { ...contract, environments };
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const rootDir = options.root ? path.resolve(options.root) : path.resolve(__dirname, '..');
  const contractPath = path.resolve(rootDir, options.contract);
  const contract = applyTargetOverrides(JSON.parse(fs.readFileSync(contractPath, 'utf8')), options);
  const outputPath = options.output ? path.resolve(rootDir, options.output) : undefined;
  const artifactDirectory = options.artifactdirectory
    ? path.resolve(rootDir, options.artifactdirectory)
    : outputPath
    ? path.join(
        path.dirname(outputPath),
        `${path.basename(outputPath, path.extname(outputPath))}-responses`
      )
    : undefined;
  const result = await runCustomerMigrationRelease({ contract, rootDir, artifactDirectory });
  const output = `${JSON.stringify(result, null, 2)}\n`;
  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, output);
  }
  process.stdout.write(output);
  process.stderr.write(
    `[verify-customer-migration-release] ${result.status}: ${result.sourceCount} sources, ${result.targetCount} terminal targets, preview=${result.environments.preview.status}, production=${result.environments.production.status}\n`
  );
  if (result.exitStatus !== 0) process.exitCode = result.exitStatus;
  return result;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`[verify-customer-migration-release] ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { applyTargetOverrides, main, parseArgs };
