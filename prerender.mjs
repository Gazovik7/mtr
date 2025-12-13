import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const SSR_DIR = path.join(__dirname, 'dist-ssr');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

async function prerender() {
  console.log('[prerender] Rendering with React SSR (no browser)...');

  const template = await readFile(INDEX_HTML_PATH, 'utf8');
  const ssrEntryUrl = pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href;
  const { render } = await import(ssrEntryUrl);

  const appHtml = await render();

  const rendered = template.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${appHtml}</div>`,
  );

  if (rendered === template) {
    throw new Error('Failed to inject prerendered HTML into index.html');
  }

  await writeFile(INDEX_HTML_PATH, rendered, 'utf8');

  console.log('[prerender] Done: `dist/index.html` now contains real content.');
}

prerender().catch((error) => {
  console.error('[prerender] Failed:', error);
  process.exit(1);
});
