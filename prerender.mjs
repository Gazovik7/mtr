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
  
  const server = http.createServer((request, response) => {
    return handler(request, response, { public: BUILD_DIR });
  });

  await new Promise((resolve) => server.listen(PORT, () => resolve(null)));

  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox'] // Safer for CI/Docker environments
    });
    const page = await browser.newPage();

    // 'domcontentloaded' is faster than 'networkidle0' for pages with external images
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Ensure the React app has actually mounted
    await page.waitForSelector('#root div', { timeout: 10000 });

    const html = await page.content();
    fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), html);
    
    console.log('✅ SSG Complete: dist/index.html now contains full SEO content.');
    await browser.close();
  } catch (error) {
    console.error('❌ Prerender failed:', error);
    process.exit(1);
  } finally {
    server.close();
  }
}

prerender();