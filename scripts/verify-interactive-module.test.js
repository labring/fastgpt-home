const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const typescript = require('typescript');

const root = path.resolve(__dirname, '..');
const interactiveDirectory = path.join(root, 'src/content/tech-center/interactive');

// Both modules import nothing, so transpiling them keeps this check on the repo's Node floor.
const transpiledDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-interactive-module-'));

function loadTypeScriptModule(relativePath) {
  const target = path.join(transpiledDirectory, `${path.basename(relativePath, '.ts')}.cjs`);
  fs.writeFileSync(
    target,
    typescript.transpileModule(fs.readFileSync(path.join(root, relativePath), 'utf8'), {
      compilerOptions: {
        module: typescript.ModuleKind.CommonJS,
        target: typescript.ScriptTarget.ES2020
      }
    }).outputText
  );
  return require(target);
}

test.after(() => fs.rmSync(transpiledDirectory, { recursive: true, force: true }));

const {
  buildEnvChecklist,
  envFeatureScopes,
  INTERACTIVE_DATA_FILES,
  lookupErrorCodes,
  PAYLOAD_RELEASES,
  resolveChunkIndexSettings
} = loadTypeScriptModule('src/lib/techInteractive.ts');
const { parseMarkdown } = loadTypeScriptModule('src/lib/markdownParser.ts');

function readPayload(name) {
  return JSON.parse(fs.readFileSync(path.join(interactiveDirectory, name), 'utf8'));
}

const chunkPayload = readPayload('a2-chunk-index-settings.json');
const codePayload = readPayload('b3-error-code-lookup.json');
const variablePayload = readPayload('b4-env-variable-checklist.json');

const baseSelection = {
  trainingType: 'chunk',
  settingMode: 'auto',
  chunkSplitMode: 'paragraph',
  chunkSize: 1000,
  indexSize: 512,
  fileCount: 10,
  avgChars: 3000
};

function resolveSelection(selection) {
  const settings = resolveChunkIndexSettings(chunkPayload, { ...baseSelection, ...selection });
  return {
    settings,
    values: Object.fromEntries(settings.values.map((value) => [value.parameter, value]))
  };
}

test('chunk settings: automatic mode reports every parameter the interface overrides', () => {
  const { settings, values } = resolveSelection({});

  for (const parameter of [
    'chunkSplitMode',
    'paragraphChunkAIMode',
    'paragraphChunkDeep',
    'paragraphChunkMinSize',
    'chunkSize',
    'chunkSplitter'
  ]) {
    assert.equal(values[parameter].status, 'rewritten', `${parameter} should report a rewrite`);
  }
  assert.equal(values.chunkSplitMode.value, chunkPayload.autoModeForced.chunkSplitMode);
  assert.equal(values.paragraphChunkAIMode.value, chunkPayload.autoModeForced.paragraphChunkAIMode);
  assert.equal(values.paragraphChunkDeep.value, chunkPayload.autoModeForced.paragraphChunkDeep);
  assert.equal(
    values.paragraphChunkMinSize.value,
    chunkPayload.autoModeForced.paragraphChunkMinSize
  );
  assert.equal(values.chunkSize.value, chunkPayload.autoChunkSize);
  assert.equal(values.chunkSplitter.value, chunkPayload.autoModeForced.chunkSplitter);
  assert.equal(values.minChunkSize.status, 'fixed');
  assert.equal(values.minChunkSize.value, chunkPayload.minChunkSize);
  assert.equal(settings.estimates.chunkCount, Math.ceil((10 * 3000) / chunkPayload.autoChunkSize));
});

test('chunk settings: custom mode keeps the reader values and reports the payload rules', () => {
  const paragraph = resolveSelection({ settingMode: 'custom' });
  assert.equal(paragraph.values.chunkSize.status, 'set');
  assert.equal(paragraph.values.chunkSize.value, baseSelection.chunkSize);
  assert.equal(paragraph.values.chunkSize.rule, chunkPayload.customModeRules.chunkSizeCappedBy);
  assert.equal(paragraph.values.paragraphChunkAIMode.status, 'set');
  assert.equal(paragraph.values.paragraphChunkDeep.status, 'set');
  assert.equal(paragraph.values.indexSize.status, 'set');
  assert.equal(paragraph.values.indexSize.value, baseSelection.indexSize);
  assert.equal(
    paragraph.settings.estimates.chunkCount,
    Math.ceil((baseSelection.fileCount * baseSelection.avgChars) / baseSelection.chunkSize)
  );

  const byLength = resolveSelection({ settingMode: 'custom', chunkSplitMode: 'length' });
  assert.equal(byLength.values.paragraphChunkDeep.status, 'rewritten');
  assert.equal(byLength.values.paragraphChunkDeep.value, 0);
  assert.equal(
    byLength.values.paragraphChunkDeep.rule,
    String(chunkPayload.customModeRules.paragraphChunkDeepZeroUnlessParagraph)
  );
});

test('chunk settings: QA split reports the model limit and withholds the counts', () => {
  const qaAuto = resolveSelection({ trainingType: 'qa' });
  assert.equal(qaAuto.values.chunkSize.value, chunkPayload.qaDefaultMaxChunkSize);
  assert.equal(qaAuto.values.chunkSize.qualifier, 'upper-bound');
  assert.equal(qaAuto.values.indexSize.status, 'rewritten');
  assert.equal(qaAuto.values.indexSize.value, null);
  assert.equal(qaAuto.values.indexSize.qualifier, 'model-limit');

  const qaCustom = resolveSelection({
    trainingType: 'qa',
    settingMode: 'custom',
    chunkSize: 4096,
    indexSize: 4096
  });
  assert.equal(qaCustom.values.indexSize.status, 'rewritten');
  assert.equal(qaCustom.values.indexSize.value, null);
  assert.equal(qaCustom.settings.estimates.chunkCount, null);
  assert.equal(qaCustom.settings.estimates.indexCount, null);
  assert.equal(qaCustom.settings.estimates.chunkSize, 4096);

  const image = resolveSelection({ trainingType: 'image' });
  assert.equal(image.settings.estimates.chunkCount, null);
  assert.equal(image.settings.estimates.chunkSize, chunkPayload.autoChunkSize);
});

test('chunk settings: an empty input reports nothing in place of a zero', () => {
  const noFiles = resolveSelection({ fileCount: 0, avgChars: 0 });
  assert.equal(noFiles.settings.estimates.chunkCount, null);
  assert.equal(noFiles.settings.estimates.indexCount, null);

  const noChunkSize = resolveSelection({ settingMode: 'custom', chunkSize: 0 });
  assert.equal(noChunkSize.settings.estimates.chunkSize, null);
  assert.equal(noChunkSize.settings.estimates.chunkCount, null);
});

test('error codes: a shared code lists every module that defines it', () => {
  const sharedCodes = Object.keys(codePayload.ambiguousCodes);
  assert.ok(sharedCodes.length > 0, 'payload should still carry shared codes');

  for (const code of sharedCodes) {
    const expected = codePayload.ambiguousCodes[code].map((entry) => entry.module).sort();
    const result = lookupErrorCodes(codePayload, { code, module: 'all', keyword: '' });
    assert.equal(result.ambiguous.code, code);
    assert.deepEqual(result.ambiguous.options.map((option) => option.module).sort(), expected);
    assert.deepEqual(result.matches.map((entry) => entry.module).sort(), expected);
  }
});

test('error codes: the code, module and keyword filters narrow the result', () => {
  const all = lookupErrorCodes(codePayload, { code: '', module: 'all', keyword: '' });
  assert.equal(all.matches.length, codePayload.codes.length);
  assert.equal(all.total, codePayload.totalCodes);
  assert.equal(all.module, null);
  assert.equal(all.ambiguous, null);

  const team = lookupErrorCodes(codePayload, { code: '', module: 'team', keyword: '' });
  assert.equal(team.matches.length, codePayload.modules.team.count);
  assert.ok(team.matches.every((entry) => entry.module === 'team'));
  assert.equal(team.module.base, codePayload.modules.team.base);

  const sample = codePayload.codes[0];
  const byCode = lookupErrorCodes(codePayload, { code: String(sample.code), module: 'all', keyword: '' });
  assert.ok(byCode.matches.some((entry) => entry.code === sample.code));

  const byKeyword = lookupErrorCodes(codePayload, {
    code: '',
    module: 'all',
    keyword: sample.enum.toLowerCase()
  });
  assert.ok(byKeyword.matches.some((entry) => entry.code === sample.code));
});

test('error codes: the out-of-range code keeps its own base', () => {
  const outlier = codePayload.outliers[0];
  assert.ok(outlier, 'payload should still carry the out-of-range code');

  const result = lookupErrorCodes(codePayload, { code: String(outlier.code), module: 'all', keyword: '' });
  assert.equal(result.outlier.module, outlier.module);
  assert.equal(result.outlier.base, outlier.base);
  assert.equal(result.outlier.base, codePayload.modules[outlier.module].base);

  // The payload flags a listed code whose value sits far away from its own module base.
  const entry = codePayload.codes.find((candidate) => candidate.code === outlier.code);
  assert.ok(entry, 'the out-of-range code should still be listed');
  assert.equal(entry.module, outlier.module);
  assert.equal(entry.statusText, outlier.statusText);
  assert.notEqual(outlier.code, outlier.base);
});

test('env checklist: the default single-host selection lists the default-on variables', () => {
  const single = buildEnvChecklist(variablePayload, {
    deployMode: 'single',
    features: [],
    requiredOnly: false,
    includeDisabled: false
  });
  const onByDefault = variablePayload.variables.filter((variable) => variable.enabledByDefault);

  assert.equal(variablePayload.variables.length, variablePayload.total);
  assert.equal(
    variablePayload.noDefault.length,
    variablePayload.variables.filter((variable) => variable.default === '').length
  );
  assert.equal(
    variablePayload.offByDefault.length,
    variablePayload.variables.filter((variable) => !variable.enabledByDefault).length
  );
  assert.equal(single.stats.listed, onByDefault.length);
  assert.equal(
    single.stats.required,
    onByDefault.filter((variable) => variable.default === '').length
  );
  assert.equal(single.stats.disabled, 0);
});

test('env checklist: a cluster deployment pulls the database group in', () => {
  const databaseGroup = '数据库与缓存';
  assert.ok(variablePayload.groups[databaseGroup], 'payload should still carry the database group');

  const single = buildEnvChecklist(variablePayload, {
    deployMode: 'single',
    features: [],
    requiredOnly: false,
    includeDisabled: false
  });
  const cluster = buildEnvChecklist(variablePayload, {
    deployMode: 'cluster',
    features: [],
    requiredOnly: false,
    includeDisabled: false
  });
  const databaseOff = variablePayload.variables.filter(
    (variable) => variable.group === databaseGroup && !variable.enabledByDefault
  );

  assert.ok(databaseOff.length > 0, 'database group should still hold off-by-default variables');
  assert.equal(cluster.stats.listed, single.stats.listed + databaseOff.length);
  assert.equal(cluster.stats.disabled, databaseOff.length);
});

test('env checklist: capabilities pull their groups and prefixes in', () => {
  const scopes = envFeatureScopes();
  for (const [feature, scope] of Object.entries(scopes)) {
    for (const group of scope.groups) {
      assert.ok(variablePayload.groups[group], `${feature} references missing group ${group}`);
    }
  }

  const commercial = buildEnvChecklist(variablePayload, {
    deployMode: 'single',
    features: ['commercial'],
    requiredOnly: false,
    includeDisabled: false
  });
  const prefixed = /^(PRO_|CRM_)/;
  assert.ok(variablePayload.variables.some((variable) => prefixed.test(variable.name)));
  assert.ok(
    commercial.groups.some((group) =>
      group.variables.some((variable) => prefixed.test(variable.name))
    )
  );

  const everything = buildEnvChecklist(variablePayload, {
    deployMode: 'single',
    features: Object.keys(scopes),
    requiredOnly: false,
    includeDisabled: true
  });
  assert.equal(everything.stats.listed, variablePayload.total);
  assert.equal(everything.stats.disabled, variablePayload.offByDefault.length);
  assert.equal(everything.groups.length, Object.keys(variablePayload.groups).length);
});

test('env checklist: required-only keeps the variables that have no default', () => {
  const requiredOnly = buildEnvChecklist(variablePayload, {
    deployMode: 'external',
    features: Object.keys(envFeatureScopes()),
    requiredOnly: true,
    includeDisabled: true
  });

  assert.ok(requiredOnly.groups.length > 0);
  for (const group of requiredOnly.groups) {
    assert.ok(group.variables.every((variable) => variable.default === ''));
  }
  assert.equal(
    requiredOnly.groups.reduce((total, group) => total + group.variables.length, 0),
    requiredOnly.stats.required
  );
});

test('payload registry: every shipped data file carries a release label', () => {
  assert.deepEqual([...INTERACTIVE_DATA_FILES].sort(), Object.keys(PAYLOAD_RELEASES).sort());

  for (const name of INTERACTIVE_DATA_FILES) {
    assert.ok(fs.existsSync(path.join(interactiveDirectory, name)), `missing payload ${name}`);
    assert.match(PAYLOAD_RELEASES[name].version, /^v\d+\.\d+\.\d+$/);
    assert.match(PAYLOAD_RELEASES[name].verified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('interactive pages: the marker hides its control table and keeps the fallback', () => {
  const contentDirectory = path.join(root, 'src/content/tech-center');
  const markerPattern = /fastgpt-interactive:\s*[\w-]+\s*\|\s*data:/;
  const pages = fs
    .readdirSync(contentDirectory, { recursive: true })
    .filter((name) => name.endsWith('.md'))
    .filter((name) =>
      markerPattern.test(fs.readFileSync(path.join(contentDirectory, name), 'utf8'))
    );

  assert.ok(pages.length > 0, 'no page carries an interactive marker');

  for (const page of pages) {
    const markdown = fs.readFileSync(path.join(contentDirectory, page), 'utf8');
    const blocks = parseMarkdown(markdown.replace(/^---\n[\s\S]*?\n---\n/, ''), 'title');
    const markers = blocks.filter((block) => block.type === 'interactive');

    assert.equal(markers.length, 1, `${page} should carry exactly one interactive marker`);
    const marker = markers[0];
    assert.ok(
      INTERACTIVE_DATA_FILES.includes(marker.data),
      `${page} points at an unregistered payload: ${marker.data}`
    );
    assert.equal(
      marker.module,
      marker.data.startsWith('a2-') ? 'parameter-simulator' : 'lookup',
      `${page} module type should match its payload`
    );

    const position = blocks.indexOf(marker);
    assert.equal(
      blocks[position + 1]?.type,
      'table',
      `${page} control table should follow the marker`
    );
    assert.ok(
      blocks.filter((block) => block.type === 'table').length >= 2,
      `${page} should keep the static fallback table`
    );
  }
});
