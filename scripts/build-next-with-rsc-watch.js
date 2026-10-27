#!/usr/bin/env node

/**
 * Prune disposable RSC build artifacts while preserving exported HTML.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const rootDir = path.join(__dirname, '..');
const RSC_STABLE_MS = 5000;
const RSC_SCAN_INTERVAL_MS = 10000;
const SKIP_STATIC_RSC_EXPORT = 'FASTGPT_SKIP_STATIC_RSC_EXPORT';

function isWithin(parent, child) {
  return child.startsWith(`${parent}${path.sep}`);
}

function installStaticRscCopyFilter(buildRoot = rootDir) {
  const appDir = path.resolve(buildRoot, '.next', 'server', 'app');
  const outDir = path.resolve(buildRoot, 'out');
  const originalCopyFile = fs.promises.copyFile;

  const filteredCopyFile = function (source, destination, ...args) {
    if (typeof source === 'string' && typeof destination === 'string') {
      const sourcePath = path.resolve(source);
      const destinationPath = path.resolve(destination);
      if (
        sourcePath.endsWith('.rsc') &&
        destinationPath.endsWith('.txt') &&
        isWithin(appDir, sourcePath) &&
        isWithin(outDir, destinationPath)
      ) {
        return Promise.resolve();
      }
    }

    return originalCopyFile.call(fs.promises, source, destination, ...args);
  };

  // shortcut: Next 16 copies disposable RSC through copyFile; revisit if export changes.
  fs.promises.copyFile = filteredCopyFile;
  return () => {
    if (fs.promises.copyFile === filteredCopyFile) {
      fs.promises.copyFile = originalCopyFile;
    }
  };
}

if (process.env[SKIP_STATIC_RSC_EXPORT] === '1') {
  installStaticRscCopyFilter();
}

function getRouteHtmlPath(dir, filename, appDir) {
  let currentDir = dir;
  while (currentDir !== appDir && isWithin(appDir, currentDir)) {
    if (path.basename(currentDir).endsWith('.segments')) {
      return `${currentDir.slice(0, -'.segments'.length)}.html`;
    }
    currentDir = path.dirname(currentDir);
  }
  return path.join(dir, `${filename.slice(0, -'.rsc'.length)}.html`);
}

function cleanAgedRscFiles(dir, now = Date.now(), buildStartedAt = 0, force = false, appDir = dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return 0;
    throw error;
  }

  let removed = 0;
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removed += cleanAgedRscFiles(fullPath, now, buildStartedAt, force, appDir);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.rsc')) continue;

    try {
      const { mtimeMs } = fs.statSync(fullPath);
      if (mtimeMs < buildStartedAt || (!force && mtimeMs + RSC_STABLE_MS > now)) continue;
      if (!fs.existsSync(getRouteHtmlPath(dir, entry.name, appDir))) {
        continue;
      }
      fs.unlinkSync(fullPath);
      removed++;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }

  return removed;
}

function startRscWatcher(watchRoot = rootDir) {
  const appDir = path.join(watchRoot, '.next', 'server', 'app');
  const buildStartedAt = Date.now();
  let removed = 0;
  let timer;
  let stopped = false;
  let disabled = false;

  function stopRscWatcher(finalScan = false) {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    if (finalScan) {
      try {
        removed += cleanAgedRscFiles(appDir, Date.now(), buildStartedAt, true);
      } catch (error) {
        console.warn(`[rsc-watch] final scan failed: ${error.message}`);
      }
    }
    console.log(`[rsc-watch] removed=${removed}`);
  }

  function scan() {
    if (stopped || disabled) return;
    try {
      removed += cleanAgedRscFiles(appDir, Date.now(), buildStartedAt);
    } catch (error) {
      disabled = true;
      console.warn(
        `[rsc-watch] disabled: ${error.message}; build continues without background cleanup`
      );
      return;
    }
    timer = setTimeout(scan, RSC_SCAN_INTERVAL_MS);
  }

  timer = setTimeout(scan, RSC_SCAN_INTERVAL_MS);
  return stopRscWatcher;
}

function runNextBuild() {
  const nextCli = require.resolve('next/dist/bin/next');
  const stopRscWatcher = startRscWatcher();
  const child = spawn(process.execPath, ['--require', __filename, nextCli, 'build', '--webpack'], {
    cwd: rootDir,
    env: { ...process.env, [SKIP_STATIC_RSC_EXPORT]: '1' },
    stdio: 'inherit'
  });
  let interrupted = false;
  let finished = false;

  function forwardSignal(signal) {
    interrupted = true;
    child.kill(signal);
  }

  function finish(code) {
    if (finished) return;
    finished = true;
    process.off('SIGINT', onSigint);
    process.off('SIGTERM', onSigterm);
    stopRscWatcher(true);
    process.exitCode = code;
  }

  function onSigint() {
    forwardSignal('SIGINT');
  }

  function onSigterm() {
    forwardSignal('SIGTERM');
  }

  process.on('SIGINT', onSigint);
  process.on('SIGTERM', onSigterm);
  child.once('error', (error) => {
    console.error(`[build-next-with-rsc-watch] ${error.message}`);
    finish(1);
  });
  child.once('close', (code) => finish(interrupted ? 1 : code ?? 1));
}

if (require.main === module) runNextBuild();

module.exports = { cleanAgedRscFiles, installStaticRscCopyFilter, startRscWatcher };
