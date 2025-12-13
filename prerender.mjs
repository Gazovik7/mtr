import puppeteer from 'puppeteer';
import handler from 'serve-handler';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, 'dist');
const PORT = 4173;

async function prerender() {
  console.log('⚡ Starting pre-rendering...');

  // 1. Serve the production build
  const server = http.createServer((request, response) => {
    return handler(request, response, { public: BUILD_DIR });
  });

  await new Promise((resolve) => server.listen(PORT, resolve));

  // 2. Launch headless browser
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // 3. Load the page and wait for JS to execute
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
  
  // Wait for the root element to be populated
  await page.waitForSelector('#root div');

  // 4. Get the full HTML
  const html = await page.content();

  // 5. Save the prerendered HTML over the index.html
  fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), html);
  console.log('✅ HTML generated and saved to dist/index.html');

  // 6. Cleanup
  await browser.close();
  server.close();
}

prerender();