import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import prettier from 'prettier';

if (process.env.PLAYWRIGHT_SKIP_PRERENDER === '1' || process.env.SKIP_PRERENDER === '1') {
  console.log('[prerender] Skipping prerender (SKIP_PRERENDER=1)');
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const DIST_INDEX_HTML = path.join(DIST_DIR, 'index.html');
const SSR_OUT_DIR = path.join(__dirname, 'dist-ssr');
const SSR_ENTRY = path.join(__dirname, 'src', 'entry-server.tsx');
const SSR_BUNDLE = path.join(SSR_OUT_DIR, 'entry-server.js');

const spawnResult = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });

async function buildSsrBundle() {
  console.log('[prerender] Building SSR bundle...');
  if (process.platform === 'win32') {
    await spawnResult('npx', [
      'vite',
      'build',
      '--ssr',
      SSR_ENTRY,
      '--outDir',
      SSR_OUT_DIR,
      '--emptyOutDir',
    ]);
    return;
  }

  await spawnResult('npx', [
    'vite',
    'build',
    '--ssr',
    SSR_ENTRY,
    '--outDir',
    SSR_OUT_DIR,
    '--emptyOutDir',
  ]);
}

async function prerender() {
  await buildSsrBundle();

  console.log('[prerender] Rendering via ReactDOMServer...');
  const entry = await import(pathToFileURL(SSR_BUNDLE).href);
  if (typeof entry?.render !== 'function') {
    throw new Error('SSR bundle does not export a render() function');
  }

  const appHtml = entry.render();

  console.log('[prerender] Injecting rendered HTML into dist/index.html...');
  const template = await readFile(DIST_INDEX_HTML, 'utf8');
  const next = template.replace(/<div id="root">\s*<\/div>/, `<div id="root">${appHtml}</div>`);
  if (next === template) {
    throw new Error('Could not find <div id="root"></div> in dist/index.html');
  }

  let formatted = next;
  try {
    formatted = await prettier.format(next, { parser: 'html' });
  } catch (error) {
    console.warn('[prerender] Prettier format skipped:', error?.message || error);
  }

  await writeFile(DIST_INDEX_HTML, formatted, 'utf8');
  console.log('[prerender] Done: dist/index.html now contains rendered content.');
}

prerender().catch((error) => {
  console.error('[prerender] Failed:', error);
  process.exit(1);
});
