#!/usr/bin/env node

/** Generate content collections before Next starts, without recursively watching 87k industry drafts. */

const { spawn } = require('node:child_process');
const path = require('node:path');
const chokidar = require('chokidar');

const root = path.resolve(__dirname, '..');
const contentRoot = path.join(root, 'content');
const nextBin = require.resolve('next/dist/bin/next');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(command)} exited with ${code ?? signal}`));
    });
  });
}

async function main() {
  await run(process.execPath, [path.join(root, 'scripts/generate-content-collections.js')]);

  const next = spawn(process.execPath, [nextBin, 'dev', '--webpack', ...process.argv.slice(2)], {
    cwd: root,
    stdio: 'inherit'
  });

  let generating = false;
  let pending = false;
  const regenerate = async () => {
    if (generating) {
      pending = true;
      return;
    }
    generating = true;
    try {
      await run(process.execPath, [path.join(root, 'scripts/generate-content-collections.js')]);
    } catch (error) {
      console.error('[dev] content collections regeneration failed:', error.message);
    } finally {
      generating = false;
      if (pending) {
        pending = false;
        void regenerate();
      }
    }
  };

  const watcher = chokidar.watch(
    [path.join(contentRoot, 'blogs'), path.join(contentRoot, 'authors')],
    {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 }
    }
  );
  watcher.on('all', () => void regenerate());

  const shutdown = () => {
    void watcher.close();
    next.kill('SIGTERM');
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  next.on('exit', (code, signal) => {
    void watcher.close();
    process.exitCode = code ?? (signal ? 1 : 0);
  });
}

main().catch((error) => {
  console.error('[dev]', error);
  process.exitCode = 1;
});
