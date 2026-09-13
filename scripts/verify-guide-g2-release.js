#!/usr/bin/env node

/** Verify the isolated Week06 G2 SOE Guide release evidence. */

const path = require('node:path');
const { verifyGuideG2Release } = require('./lib/guide-g2-release');

function parseArgs(argv = process.argv.slice(2)) {
  if (!argv.length) return { rootDir: process.cwd() };
  if (argv.length !== 2 || argv[0] !== '--root' || !argv[1] || argv[1].startsWith('--')) {
    throw new Error('Usage: node scripts/verify-guide-g2-release.js [--root <directory>]');
  }
  return { rootDir: path.resolve(argv[1]) };
}

function main(argv = process.argv.slice(2)) {
  const result = verifyGuideG2Release(parseArgs(argv));
  console.log(
    `[verify-guide-g2-release] SOE G2 release evidence verified: ${result.g2IdentityCount} identity, ${result.ownerPages.cn} cn owner page, ${result.ownerPages.io} io owner page, ${result.sourceDocumentCount} source documents`
  );
  console.log(`GUIDE_G2_RESULT=${JSON.stringify(result)}`);
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

module.exports = { main, parseArgs, verifyGuideG2Release };
