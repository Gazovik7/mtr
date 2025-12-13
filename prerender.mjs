import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function canConnect(host, port, timeoutMs = 250) {
  return await new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const done = (result) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(timeoutMs);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
  });
}

async function assertPortFree(port) {
  const inUse =
    (await canConnect('127.0.0.1', port)) || (await canConnect('::1', port));

  if (inUse) {
    throw new Error(
      `Port ${port} is already in use. Stop the running server and retry.`,
    );
  }
}

async function waitForServer(url, processHandle, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (processHandle.exitCode !== null) {
      throw new Error(`Preview server exited (code ${processHandle.exitCode}).`);
    }
    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.ok) return;
    } catch {
      // server not ready yet
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for preview server at ${url}`);
}

async function terminateProcess(processHandle) {
  if (!processHandle || processHandle.killed) return;

  processHandle.kill('SIGTERM');

  const exited = new Promise((resolve) =>
    processHandle.once('exit', (code, signal) => resolve({ code, signal })),
  );
  const timeout = sleep(5000).then(() => null);

  const result = await Promise.race([exited, timeout]);
  if (result) return;

  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/pid', String(processHandle.pid), '/t', '/f'], {
      stdio: 'ignore',
    });
    await new Promise((resolve) => killer.once('exit', resolve));
  } else {
    processHandle.kill('SIGKILL');
  }
}

async function prerender() {
  console.log('[prerender] Starting `vite preview`...');

  await assertPortFree(PORT);

  const previewProcess =
    process.platform === 'win32'
      ? spawn(`npx vite preview --port ${PORT} --strictPort`, { stdio: 'inherit', shell: true })
      : spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
          stdio: 'inherit',
        });

  try {
    await waitForServer(URL, previewProcess);

    console.log('[prerender] Rendering in headless browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      return !!root && !!root.textContent && root.textContent.trim().length > 0;
    }, null, { timeout: 60_000 });

    let html = await page.content();
    if (!html.trimStart().toLowerCase().startsWith('<!doctype html')) {
      html = `<!DOCTYPE html>\n${html}`;
    }

    await writeFile(INDEX_HTML_PATH, html, 'utf8');
    await browser.close();

    console.log('[prerender] Done: `dist/index.html` now contains real content.');
  } finally {
    await terminateProcess(previewProcess);
  }
}

prerender().catch((error) => {
  console.error('[prerender] Failed:', error);
  process.exit(1);
});
