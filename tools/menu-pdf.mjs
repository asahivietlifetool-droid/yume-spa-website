#!/usr/bin/env node
// Xuất menu A4 ra PDF và ảnh PNG từ menu/index.html, vi/menu/, en/menu/ (chạy sau node tools/build.mjs).
//   node tools/menu-pdf.mjs
// Kết quả: assets/menu/yume-spa-menu-{ja,vi,en}.pdf và .png (PNG dùng cho Google Maps, Instagram, in nhanh).
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets/menu");
fs.mkdirSync(OUT, { recursive: true });

const pages = [["ja", "menu/index.html"], ["vi", "vi/menu/index.html"], ["en", "en/menu/index.html"]];
const browser = await chromium.launch();
for (const [lang, file] of pages) {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.join(ROOT, file)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  const overflow = await page.evaluate(() => { const s = document.querySelector(".sheet"); return s.scrollHeight - s.clientHeight; });
  if (overflow > 2) console.log(`CẢNH BÁO ${lang}: nội dung dài hơn A4 ${overflow}px`);
  await page.pdf({ path: path.join(OUT, `yume-spa-menu-${lang}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.locator(".sheet").screenshot({ path: path.join(OUT, `yume-spa-menu-${lang}.png`) });
  console.log("Đã xuất " + lang);
  await page.close();
}
await browser.close();
