#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { isReplaceableRscPayload } = require('./clean-faq-rsc');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const DELETE_DELAY_MS = 5000;

function startRscWatcher(watchRoot = rootDir) {
  const watchedOutDir = path.join(watchRoot, 'out');
  const pendingDirectories = new Map();
  let rootWatcher;
  let outWatcher;
  let outIdentity;
  let timer;
  let refreshTimer;
  let timerDue = Infinity;
  let removed = 0;
  let disabled = false;
  let stopped = false;

  function disable(error) {
    if (disabled) return;
    disabled = true;
    clearTimeout(timer);
    clearTimeout(refreshTimer);
    rootWatcher?.close();
    outWatcher?.close();
    console.warn(
      `[rsc-watch] disabled: ${error.message}; final cleanup will handle remaining payloads`
    );
  }

  function removeAgedPayloads(dir, now) {
    let retryAt = Infinity;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (error) {
      if (error.code === 'ENOENT') return retryAt;
      throw error;
    }

    for (const entry of entries) {
      if (!entry.isFile() || !isReplaceableRscPayload(dir, entry.name)) continue;

      const filePath = path.join(dir, entry.name);
      try {
        const readyAt = fs.statSync(filePath).mtimeMs + DELETE_DELAY_MS;
        if (readyAt > now) {
          retryAt = Math.min(retryAt, readyAt);
          continue;
        }
        fs.unlinkSync(filePath);
        removed++;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    return retryAt;
  }

  function scheduleAt(dueAt) {
    if (disabled || stopped || (timer && dueAt >= timerDue)) return;
    clearTimeout(timer);
    timerDue = dueAt;
    timer = setTimeout(runPending, Math.max(0, dueAt - Date.now()));
  }

  function queueDirectory(dir) {
    if (disabled || stopped || pendingDirectories.has(dir)) return;
    const dueAt = Date.now() + DELETE_DELAY_MS;
    pendingDirectories.set(dir, dueAt);
    scheduleAt(dueAt);
  }

  function runPending() {
    timer = null;
    timerDue = Infinity;
    const now = Date.now();

    for (const [dir, dueAt] of pendingDirectories) {
      if (dueAt > now) continue;
      pendingDirectories.delete(dir);
      try {
        const retryAt = removeAgedPayloads(dir, now);
        if (Number.isFinite(retryAt)) {
          const nextAttempt = Math.max(retryAt, Date.now() + 250);
          pendingDirectories.set(dir, nextAttempt);
        }
      } catch (error) {
        disable(error);
        return;
      }
    }

    for (const dueAt of pendingDirectories.values()) scheduleAt(dueAt);
  }

  function onOutputEvent(_eventType, filename) {
    if (filename == null) return;
    const relativePath = filename.toString();
    if (!relativePath.endsWith('.txt')) return;
    queueDirectory(path.dirname(path.join(watchedOutDir, relativePath)));
  }

  function scheduleOutputWatcherRefresh() {
    if (disabled || stopped || refreshTimer) return;
    refreshTimer = setTimeout(() => {
      refreshTimer = undefined;
      attachOutputWatcher();
    }, 100);
  }

  function attachOutputWatcher() {
    if (disabled) return;

    let stats;
    try {
      stats = fs.statSync(watchedOutDir);
    } catch (error) {
      if (error.code !== 'ENOENT') disable(error);
      outWatcher?.close();
      outWatcher = undefined;
      outIdentity = undefined;
      return;
    }

    if (!stats.isDirectory()) return;
    const identity = `${stats.dev}:${stats.ino}`;
    if (outWatcher && identity === outIdentity) return;

    outWatcher?.close();
    outWatcher = undefined;
    try {
      const watcher = fs.watch(watchedOutDir, { recursive: true }, onOutputEvent);
      outWatcher = watcher;
      outIdentity = identity;
      watcher.on('error', (error) => {
        watcher.close();
        if (outWatcher === watcher) {
          outWatcher = undefined;
          outIdentity = undefined;
        }
        if (error.code === 'ENOENT') scheduleOutputWatcherRefresh();
        else disable(error);
      });
    } catch (error) {
      disable(error);
    }
  }

  try {
    rootWatcher = fs.watch(watchRoot, (_eventType, filename) => {
      if (filename?.toString() !== 'out') return;
      scheduleOutputWatcherRefresh();
    });
    rootWatcher.on('error', disable);
    attachOutputWatcher();
  } catch (error) {
    disable(error);
  }

  return function stopRscWatcher() {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    clearTimeout(refreshTimer);
    rootWatcher?.close();
    outWatcher?.close();
    console.log(`[rsc-watch] removed=${removed}; pendingDirectories=${pendingDirectories.size}`);
  };
}

function runNextBuild() {
  const nextCli = require.resolve('next/dist/bin/next');
  const stopRscWatcher = startRscWatcher();
  const child = spawn(process.execPath, [nextCli, 'build', '--webpack'], {
    cwd: rootDir,
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
    stopRscWatcher();
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

module.exports = { startRscWatcher };
