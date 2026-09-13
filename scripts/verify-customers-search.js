#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const sourcePath = path.resolve(__dirname, '..', 'src/customers/lib/solution-search.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020
  },
  fileName: sourcePath
}).outputText;
const moduleRecord = { exports: {} };
new Function('require', 'module', 'exports', transpiled)(
  require,
  moduleRecord,
  moduleRecord.exports
);

const { filterPublicSolutions, matchesSolutionSearch } = moduleRecord.exports;

assert.equal(matchesSolutionSearch('AI Travel Planner', 'Route automation', ''), true);
assert.equal(matchesSolutionSearch('AI Travel Planner', 'Route automation', 'AI planner'), true);
assert.equal(matchesSolutionSearch('AI Travel Planner', 'Route automation', 'AI finance'), false);

const solutions = [
  {
    id: 'travel',
    title: 'AI Travel Planner',
    description: 'Route automation',
    categorySlug: 'business',
    categoryName: 'Business',
    createdAt: '2026-01-01'
  },
  {
    id: 'finance',
    title: 'AI Finance Planner',
    description: 'Report automation',
    categorySlug: 'finance',
    categoryName: 'Finance',
    createdAt: '2026-02-01'
  }
];

assert.deepEqual(
  filterPublicSolutions(solutions, 'business', 'AI travel').map((solution) => solution.id),
  ['travel']
);

console.log('Customer search verification passed');
