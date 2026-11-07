#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(
  path.join(root, 'src/app/videos/page.tsx'),
  'utf8'
);
const modules = new Map();

function loadTypeScriptModule(file) {
  if (modules.has(file)) return modules.get(file).exports;

  const module = { exports: {} };
  modules.set(file, module);
  const transpiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    },
    fileName: file
  }).outputText;
  const wrapper = vm.runInThisContext(
    `(function (exports, require, module, __filename, __dirname) {${transpiled}\n})`,
    { filename: file }
  );
  wrapper(
    module.exports,
    (specifier) => {
      if (!specifier.startsWith('.')) throw new Error(`Unexpected dependency: ${specifier}`);
      return loadTypeScriptModule(path.resolve(path.dirname(file), `${specifier}.ts`));
    },
    module,
    file,
    path.dirname(file)
  );
  return module.exports;
}

const { staticVideos } = loadTypeScriptModule(
  path.join(root, 'src/components/learning-center/videos.ts')
);
const { buildVideoObjectItems } = loadTypeScriptModule(
  path.join(root, 'src/components/learning-center/videoSchema.ts')
);
const items = buildVideoObjectItems();
const expectedVideos = staticVideos.filter((video) =>
  /bilibili\.com\/video\/BV[a-zA-Z0-9]+/.test(video.url)
);

assert.match(
  source,
  /import \{ buildVideoObjectItems \} from '@\/components\/learning-center\/videoSchema';/,
  'videos page must use the shared server-safe schema builder'
);
assert.match(source, /'@type': 'ItemList'/, 'videos page must emit an ItemList');
assert.equal(items.length, 45, `expected 45 VideoObject items, found ${items.length}`);
assert.equal(expectedVideos.length, items.length, 'schema/video source mismatch');

for (const [index, item] of items.entries()) {
  const video = expectedVideos[index];
  const bvid = video.url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/)?.[1];
  assert.equal(item['@type'], 'VideoObject');
  assert.equal(item.name, video.title);
  assert.equal(item.description, video.desc);
  assert.match(item.thumbnailUrl, /^https:\/\//);
  assert.match(item.uploadDate, /^\d{4}-\d{2}-\d{2}T/);
  assert.match(item.duration, /^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/);
  assert.equal(item.embedUrl, `https://player.bilibili.com/player.html?bvid=${bvid}`);
  assert.equal('contentUrl' in item, false, `contentUrl must be absent for ${bvid}`);
}

console.log('Video schema verification passed');
