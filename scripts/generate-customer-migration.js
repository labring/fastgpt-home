#!/usr/bin/env node

/** Normalize the Week06 customer migration CSVs into the committed release authority. */

const path = require('node:path');
const {
  AUTHORITY_RELATIVE_PATH,
  PROJECTION_RELATIVE_PATH,
  buildAuthorityFromCsv,
  writeCustomerMigrationFiles
} = require('./lib/customer-migration');

function parseArgs(argv) {
  const options = {
    inputDir: process.env.FASTGPT_DATA_WEEK06_MIGRATION_DIR,
    rootDir: path.resolve(__dirname, '..')
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--input-dir') options.inputDir = path.resolve(argv[++index]);
    else if (token === '--root') options.rootDir = path.resolve(argv[++index]);
    else throw new Error(`Unknown argument: ${token}`);
  }
  if (!options.inputDir) {
    throw new Error('--input-dir or FASTGPT_DATA_WEEK06_MIGRATION_DIR is required');
  }
  return options;
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const authority = buildAuthorityFromCsv(options.inputDir, options.rootDir);
  writeCustomerMigrationFiles(options.rootDir, authority);
  console.log(
    `[generate-customer-migration] authority=${path.join(
      options.rootDir,
      AUTHORITY_RELATIVE_PATH
    )} projection=${path.join(options.rootDir, PROJECTION_RELATIVE_PATH)}`
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`[generate-customer-migration] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { main, parseArgs };
