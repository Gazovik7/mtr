import chokidar from 'chokidar';
import { exec } from 'child_process';

const debounceMs = 1500;
let queued = false;
let running = false;

const runCommand = (cmd) =>
  new Promise((resolve, reject) => {
    exec(cmd, { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr || stdout || error.message));
      }
      resolve(stdout);
    });
  });

const sync = async () => {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  try {
    const status = await runCommand('git status --porcelain');
    if (!status.trim()) {
      return;
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await runCommand('git add -A');
    await runCommand(`git commit -m "auto-sync: ${timestamp}"`);
    await runCommand('git push');
    console.log(`[auto-sync] Pushed at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('[auto-sync] Failed:', err.message);
  } finally {
    running = false;
    if (queued) {
      queued = false;
      sync();
    }
  }
};

const watcher = chokidar.watch(['src/**/*', 'public/**/*', 'index.html', 'package.json', 'vite.config.ts'], {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: debounceMs,
    pollInterval: 200,
  },
});

console.log('[auto-sync] Watching for changes... (Ctrl+C to stop)');

watcher.on('all', () => {
  sync();
});
