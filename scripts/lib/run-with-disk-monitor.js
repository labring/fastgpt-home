const fs = require('node:fs');
const { spawn } = require('node:child_process');
const { constants } = require('node:os');

function writeLog(logger, record) {
  try {
    logger(`[disk-usage] ${JSON.stringify(record)}`);
  } catch {
    // 观测失败不能覆盖真实构建结果。 Telemetry must not change the build result.
  }
}

function diskRecord(stats, stage) {
  return {
    timestamp: new Date().toISOString(),
    stage,
    totalBytes: String(stats.blocks * stats.bsize),
    freeBytes: String(stats.bfree * stats.bsize),
    availableBytes: String(stats.bavail * stats.bsize),
    totalInodes: String(stats.files),
    freeInodes: String(stats.ffree)
  };
}

function warn(logger, stage, error) {
  writeLog(logger, { timestamp: new Date().toISOString(), stage, warning: error.message });
}

function logDiskUsage(root, stage, logger = console.error) {
  try {
    const record = diskRecord(fs.statfsSync(root, { bigint: true }), stage);
    writeLog(logger, record);
    return record;
  } catch (error) {
    warn(logger, stage, error);
    return null;
  }
}

function runWithDiskMonitor(command, args, options = {}) {
  const {
    cwd = process.cwd(),
    env = process.env,
    stdio = 'inherit',
    intervalMs = 30_000,
    stage = 'build',
    logger = console.error
  } = options;
  if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
    return Promise.reject(new RangeError('intervalMs must be a positive number'));
  }

  return new Promise((resolve, reject) => {
    // 独立进程组让取消信号同时到达 npm 和 Next；不 unref，父进程仍等待构建。
    const grouped = process.platform !== 'win32';
    const child = spawn(command, args, { cwd, env, stdio, detached: grouped });
    let finished = false;
    let sampling = false;
    let cancelledSignal = null;
    let killTimer;

    const sample = (sampleStage) => {
      if (finished || sampling) return;
      sampling = true;
      // 只读取文件系统计数，不遍历目录，也不阻塞构建输出。
      fs.statfs(cwd, { bigint: true }, (error, stats) => {
        sampling = false;
        if (finished) return;
        if (error) warn(logger, sampleStage, error);
        else writeLog(logger, diskRecord(stats, sampleStage));
      });
    };

    const sendSignal = (signal) => {
      if (!child.pid) return;
      try {
        if (grouped) process.kill(-child.pid, signal);
        else child.kill(signal);
      } catch (error) {
        if (error.code !== 'ESRCH') warn(logger, `${stage}:signal`, error);
      }
    };
    const cancel = (signal) => {
      if (cancelledSignal) {
        sendSignal('SIGKILL');
        return;
      }
      cancelledSignal = signal;
      sendSignal(signal);
      killTimer = setTimeout(() => sendSignal('SIGKILL'), 5_000);
      killTimer.unref();
    };
    const onInterrupt = () => cancel('SIGINT');
    const onTerminate = () => cancel('SIGTERM');
    process.on('SIGINT', onInterrupt);
    process.on('SIGTERM', onTerminate);

    sample(`${stage}:start`);
    const timer = setInterval(() => sample(`${stage}:running`), intervalMs);
    timer.unref();

    const finish = () => {
      if (finished) return false;
      finished = true;
      clearInterval(timer);
      clearTimeout(killTimer);
      process.removeListener('SIGINT', onInterrupt);
      process.removeListener('SIGTERM', onTerminate);
      // npm 可能先退出；取消时收尾整个组，避免留下仍在写文件的孙进程。
      if (cancelledSignal) sendSignal('SIGKILL');
      logDiskUsage(cwd, `${stage}:end`, logger);
      return true;
    };
    child.once('error', (error) => {
      if (finish()) reject(error);
    });
    child.once('close', (status, signal) => {
      if (!finish()) return;
      resolve({
        status: cancelledSignal ? 128 + constants.signals[cancelledSignal] : status,
        signal: cancelledSignal || signal
      });
    });
  });
}

module.exports = { logDiskUsage, runWithDiskMonitor };
