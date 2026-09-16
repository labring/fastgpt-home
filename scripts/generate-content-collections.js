#!/usr/bin/env node

/** Generate Content Collections types and data before standalone checks. */

const path = require('node:path');

async function main() {
  const { createBuilder } = await import('@content-collections/core');
  const builder = await createBuilder(path.join(process.cwd(), 'content-collections.ts'));
  await builder.build();
  console.log('[generate-content-collections] generated');
}

main().catch((error) => {
  console.error('[generate-content-collections] failed', error);
  process.exitCode = 1;
});
