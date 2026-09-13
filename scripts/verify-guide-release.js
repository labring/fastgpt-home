#!/usr/bin/env node

/** Verify the independently releasable Week06 G1 Guide slice and its rollback unit. */

const path = require('node:path');
const { verifyGuideG1Release } = require('./lib/guide-release');

function parseArgs(argv = process.argv.slice(2)) {
  if (!argv.length) return { rootDir: process.cwd() };
  if (argv.length !== 2 || argv[0] !== '--root' || !argv[1] || argv[1].startsWith('--')) {
    throw new Error('Usage: node scripts/verify-guide-release.js [--root <repository-root>]');
  }
  return { rootDir: path.resolve(argv[1]) };
}

function main(argv = process.argv.slice(2)) {
  const result = verifyGuideG1Release(parseArgs(argv));
  console.log(`GUIDE_G1_RESULT=${JSON.stringify(result)}`);
  console.log(
    `[verify-guide-release] G1 Guide release evidence verified: ${
      result.g1IdentityCount
    } identities, ${result.sourceDocumentCount} source documents, owner pages cn=${
      result.ownerPages.cn
    } io=${result.ownerPages.io} (G2 excluded=${result.g2ExcludedSlugs.join(',')})`
  );
  return result;
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { main, parseArgs, verifyGuideG1Release };
