import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Skip prerendering only when explicitly requested
if (process.env.PLAYWRIGHT_SKIP_PRERENDER === '1') {
  console.log('[prerender] Skipping prerender (PLAYWRIGHT_SKIP_PRERENDER=1)');
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const PORT = 4173;
const URL = `http://localhost:${PORT}/`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(url, processHandle, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (processHandle.exitCode !== null) {
      throw new Error(`Preview server exited (code ${processHandle.exitCode}).`);
    }
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for preview server at ${url}`);
}

async function terminate(processHandle) {
  if (!processHandle || processHandle.killed) return;
  processHandle.kill('SIGTERM');

  const exited = new Promise((resolve) => processHandle.once('exit', resolve));
  const timeout = sleep(5000).then(() => null);
  const result = await Promise.race([exited, timeout]);
  if (result !== null) return;

  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(processHandle.pid), '/t', '/f'], { stdio: 'ignore' });
  } else {
    processHandle.kill('SIGKILL');
  }
}

async function prerender() {
  console.log('[prerender] Starting `vite preview`...');
  const previewProcess =
    process.platform === 'win32'
      ? spawn(`npx vite preview --port ${PORT} --strictPort`, { stdio: 'inherit', shell: true })
      : spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
          stdio: 'inherit',
        });

  try {
    await waitForServer(URL, previewProcess);

    console.log('[prerender] Rendering in headless browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      return !!root && !!root.textContent && root.textContent.trim().length > 0;
    });

    const html = await page.content();
    await writeFile(INDEX_HTML_PATH, html, 'utf8');

    await browser.close();
    console.log('[prerender] Done: dist/index.html now contains rendered content.');
  } finally {
    await terminate(previewProcess);
  }
}

prerender().catch((error) => {
  console.error('[prerender] Failed:', error);
  process.exit(1);
});
