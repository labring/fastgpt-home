#!/usr/bin/env node

/** Run the external documentation host owner-routing contract and persist HTTP evidence. */

const fs = require('node:fs');
const path = require('node:path');
const { runDocumentationHostContract } = require('./lib/documentation-host');

function parseArgs(argv) {
  const options = {};
  const names = new Map([
    ['--cn-target', 'cnTarget'],
    ['--io-target', 'ioTarget'],
    ['--cn-origin', 'cnTarget'],
    ['--io-origin', 'ioTarget'],
    ['--cn', 'cnTarget'],
    ['--io', 'ioTarget'],
    ['--target-cn', 'cnTarget'],
    ['--target-io', 'ioTarget'],
    ['--contract', 'contractPath'],
    ['--output', 'outputPath'],
    ['--rollback-input', 'rollbackPath'],
    ['--rollback-file', 'rollbackPath'],
    ['--rollback', 'rollbackPath']
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const name = names.get(token);
    if (!name) throw new Error(`Unknown argument: ${token}`);
    const value = argv[++index];
    if (!value || value.startsWith('--')) throw new Error(`${token} requires a value`);
    options[name] = value;
  }
  if (!options.cnTarget || !options.ioTarget || !options.contractPath) {
    throw new Error(
      'Usage: --cn-target <https-url> --io-target <https-url> --contract <json> [--rollback-input <json>] [--output <json>]'
    );
  }
  return options;
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read ${label}: ${error.message}`);
  }
}

/** Execute the external docs contract with targets supplied by the release operator. */
async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const contractPath = path.resolve(options.contractPath);
  const contract = readJson(contractPath, 'documentation host contract');
  const rollback = options.rollbackPath
    ? readJson(path.resolve(options.rollbackPath), 'documentation host rollback input')
    : undefined;
  const outputPath = options.outputPath ? path.resolve(options.outputPath) : undefined;
  const result = await runDocumentationHostContract({
    cnTarget: options.cnTarget,
    ioTarget: options.ioTarget,
    contract,
    rollback: rollback?.rollback || rollback,
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
      `[verify-documentation-host] passed: ${result.checks.length} checks, ${result.englishSampleCount} English sample paths\n`
    );
  }
  if (result.status !== 'passed') process.exitCode = 1;
  return result;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`[verify-documentation-host] ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { main, parseArgs };
