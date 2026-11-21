const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn, spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { logDiskUsage, runWithDiskMonitor } = require('./run-with-disk-monitor');

const helper = path.resolve(__dirname, 'run-with-disk-monitor.js');
const parseRecord = (line) => JSON.parse(line.slice('[disk-usage] '.length));

test('samples a real filesystem while a real child is running, then stops', async () => {
  const records = [];
  const result = await runWithDiskMonitor(
    process.execPath,
    ['-e', 'setTimeout(() => process.exit(0), 250)'],
    {
      intervalMs: 20,
      stdio: 'ignore',
      stage: 'test',
      logger: (line) => records.push(parseRecord(line))
    }
  );
  assert.deepEqual(result, { status: 0, signal: null });
  assert(records.some(({ stage }) => stage === 'test:running'));
  assert.equal(records.at(-1).stage, 'test:end');
  for (const record of records) {
    assert(!Number.isNaN(Date.parse(record.timestamp)));
    for (const name of ['totalBytes', 'freeBytes', 'availableBytes', 'freeInodes']) {
      assert.match(record[name], /^\d+$/);
    }
  }
  const count = records.length;
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(records.length, count, 'monitor must stop after child exit');
});

test('preserves a failed child exit status even when logging fails', async () => {
  const result = await runWithDiskMonitor(process.execPath, ['-e', 'process.exit(37)'], {
    stdio: 'ignore',
    logger() {
      throw new Error('unavailable logger');
    }
  });
  assert.deepEqual(result, { status: 37, signal: null });
});

test('rejects a missing executable and restores signal listeners', async () => {
  const before = ['SIGINT', 'SIGTERM'].map((signal) => process.listenerCount(signal));
  await assert.rejects(
    runWithDiskMonitor(path.join(os.tmpdir(), `missing-build-${process.pid}`), [], {
      stdio: 'ignore',
      intervalMs: 20,
      logger() {}
    }),
    { code: 'ENOENT' }
  );
  assert.deepEqual(
    ['SIGINT', 'SIGTERM'].map((signal) => process.listenerCount(signal)),
    before
  );
});

test('a failed snapshot only logs a warning', () => {
  const logs = [];
  assert.equal(
    logDiskUsage(path.join(os.tmpdir(), `missing-disk-${process.pid}`), 'missing', (line) =>
      logs.push(parseRecord(line))
    ),
    null
  );
  assert.match(logs[0].warning, /ENOENT/);
  assert.equal(logs[0].stage, 'missing');
});

test('inherits child stdout and stderr and does not keep the wrapper alive', () => {
  const script = `
    const { runWithDiskMonitor } = require(${JSON.stringify(helper)});
    runWithDiskMonitor(process.execPath,
      ['-e', 'console.log("child-output"); console.error("child-error"); process.exit(19)'],
      { intervalMs: 30000 }).then(({ status }) => { process.exitCode = status; });
  `;
  const result = spawnSync(process.execPath, ['-e', script], { encoding: 'utf8', timeout: 5_000 });
  assert.ifError(result.error);
  assert.equal(result.status, 19);
  assert.match(result.stdout, /child-output/);
  assert.match(result.stderr, /child-error/);
  assert.match(result.stderr, /\[disk-usage\]/);
});

test(
  'forwards cancellation to descendants and never reports a cancelled build as success',
  {
    skip: process.platform === 'win32',
    timeout: 10_000
  },
  async () => {
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'disk-monitor-signal-'));
    const marker = path.join(temporary, 'grandchild-still-running');
    // 孙进程故意忽略 TERM；npm 等价父进程退出 0 后，监控器必须清理整组。
    const grandchild = `
    process.on('SIGTERM', () => {});
    console.log('grandchild-ready');
    setTimeout(() => require('node:fs').writeFileSync(${JSON.stringify(marker)}, 'orphan'), 500);
    setInterval(() => {}, 1000);
  `;
    const build = `
    process.on('SIGTERM', () => process.exit(0));
    console.log('BUILD_PID ' + process.pid);
    require('node:child_process').spawn(process.execPath, ['-e', ${JSON.stringify(
      grandchild
    )}], { stdio: 'inherit' });
  `;
    const script = `
    require(${JSON.stringify(helper)}).runWithDiskMonitor(process.execPath,
      ['-e', ${JSON.stringify(build)}], { intervalMs: 20 }).then((result) => {
        console.log('RESULT ' + JSON.stringify(result));
        process.exitCode = result.status;
      });
  `;
    const wrapper = spawn(process.execPath, ['-e', script], { stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    let sent = false;
    let buildPid;
    const killFixtureGroup = () => {
      if (!buildPid) return;
      try {
        process.kill(-buildPid, 'SIGKILL');
      } catch (error) {
        if (error.code !== 'ESRCH') throw error;
      }
    };
    const watchdog = setTimeout(() => {
      killFixtureGroup();
      wrapper.kill('SIGKILL');
    }, 5_000);
    wrapper.stderr.resume();
    wrapper.stdout.on('data', (chunk) => {
      output += chunk;
      const pidMatch = output.match(/BUILD_PID (\d+)/);
      if (pidMatch) buildPid = Number(pidMatch[1]);
      if (!sent && output.includes('grandchild-ready')) {
        sent = true;
        wrapper.kill('SIGTERM');
      }
    });
    try {
      const status = await new Promise((resolve, reject) => {
        wrapper.once('error', reject);
        wrapper.once('close', resolve);
      });
      assert.equal(sent, true);
      assert.equal(status, 143);
      assert.match(output, /RESULT \{"status":143,"signal":"SIGTERM"\}/);
      await new Promise((resolve) => setTimeout(resolve, 600));
      assert.equal(fs.existsSync(marker), false, 'cancelled descendants must not keep writing');
    } finally {
      clearTimeout(watchdog);
      killFixtureGroup();
      if (wrapper.exitCode === null) wrapper.kill('SIGKILL');
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  }
);
