#!/usr/bin/env node
// Yume Spa – dựng trang tĩnh cho từng ngôn ngữ để Google và trợ lý AI đọc được cả ba bản.
//
//   node tools/build.mjs           dựng index.html (tiếng Nhật), vi/index.html, en/index.html, sitemap.xml
//   node tools/build.mjs --check   chỉ kiểm tra: mã thoát 1 nếu trang tĩnh đang lệch so với i18n.js / template
//
// Nguồn: src/template.html (khung trang) + assets/js/i18n.js (chữ, bảng giá, link).
// Sửa chữ hoặc giá xong PHẢI chạy lại lệnh này rồi mới commit, nếu không Google sẽ đọc bản cũ.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Địa chỉ gốc của website. Đổi tên miền thì sửa đúng một dòng này rồi dựng lại.
// 14/11/2026: tên miền chính thức https://yumespaadachi.com/ CHƯA chạy (Tenten đang khóa DNS),
// nên tạm dùng địa chỉ GitHub Pages. Khi tên miền mở được: đổi dòng dưới thành
//   const BASE = "https://yumespaadachi.com/";
// rồi chạy node tools/build.mjs và commit.
const BASE = "https://asahivietlifetool-droid.github.io/yume-spa-website/";
const LANGS = [
  { code: "ja", dir: "", hreflang: "ja" },
  { code: "en", dir: "en/", hreflang: "en" },
  { code: "vi", dir: "vi/", hreflang: "vi" },
];
const CHECK = process.argv.includes("--check");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/i18n.js"), "utf8"), sandbox);
const Y = sandbox.window.YUME;
const template = fs.readFileSync(path.join(ROOT, "src/template.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
const yen = (n) => "¥" + n.toLocaleString("ja-JP");

function t(lang, key) {
  const d = Y.t[lang] || {};
  return d[key] != null ? d[key] : (Y.t.ja[key] != null ? Y.t.ja[key] : "");
}

// Giống hệt renderMenu() trong assets/js/main.js, để bảng giá nằm sẵn trong HTML.
function menuHtml(lang) {
  return Y.menu.map((cat) => {
    if (cat.soon) {
      return `<div class="menu-card ${cat.id} is-soon"><h3><i aria-hidden="true"></i>${esc(t(lang, "menu." + cat.id))}</h3>` +
        `<p class="d">${esc(t(lang, "menu." + cat.id + ".d"))}</p><p class="soon">${esc(t(lang, "menu.soon"))}</p></div>`;
    }
    const items = cat.items.filter((it) => !it.hidden).map((it) =>
      `<li><span class="n">${esc(t(lang, "menu." + it.key))}</span>` +
      `<span class="p">${it.from ? "<small>" + esc(t(lang, "menu.from")) + "</small>" : ""}${yen(it.price)}</span>` +
      `<span class="t">${esc(t(lang, "menu." + it.key + ".t") + t(lang, "menu.min"))}</span></li>`).join("");
    return `<div class="menu-card ${cat.id}"><h3><i aria-hidden="true"></i>${esc(t(lang, "menu." + cat.id))}</h3>` +
      `<p class="d">${esc(t(lang, "menu." + cat.id + ".d"))}</p><ul class="price-list">${items}</ul></div>`;
  }).join("");
}

function faqJsonLd(lang) {
  const entities = [];
  for (let i = 1; t(lang, "faq.q" + i); i++) {
    entities.push({ "@type": "Question", name: t(lang, "faq.q" + i),
      acceptedAnswer: { "@type": "Answer", text: t(lang, "faq.a" + i) } });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: lang, mainEntity: entities }, null, 2);
}

function page(lang) {
  const here = LANGS.find((l) => l.code === lang);
  const up = here.dir ? "../" : "";
  let html = template;

  // 1. Chữ của mọi phần tử có data-i18n
  html = html.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g,
    (whole, open, _tag, key, _inner, close) => {
      const value = t(lang, key);
      return value ? open + esc(value) + close : whole;
    });

  // 1b. Chữ thay thế (alt) của ảnh có data-i18n-alt
  html = html.replace(/<img\b[^>]*\bdata-i18n-alt="([^"]+)"[^>]*>/g, (tag, key) => {
    const value = t(lang, key);
    return value ? tag.replace(/\balt="[^"]*"/, `alt="${escAttr(value)}"`) : tag;
  });

  // 2. Bảng giá nằm sẵn trong HTML
  html = html.replace('<div class="menu-grid" id="menu-grid"></div>',
    `<div class="menu-grid" id="menu-grid">${menuHtml(lang)}</div>`);

  // 3. Ngôn ngữ của trang, tiêu đề, mô tả
  html = html.replace('<html lang="ja">', `<html lang="${lang}" data-page-lang="${lang}" data-base="${up}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(t(lang, "meta.title"))}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(">)/, `$1${escAttr(t(lang, "meta.desc"))}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${escAttr(t(lang, "meta.title"))}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${escAttr(t(lang, "meta.og"))}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(">)/, `$1${BASE}assets/img/logo.png$2`);

  html = html.replace('"url": "__BASE__"', `"url": "${BASE}${here.dir}"`);

  // 4. Địa chỉ chuẩn và liên kết giữa ba bản ngôn ngữ
  const alternates = LANGS.map((l) => `  <link rel="alternate" hreflang="${l.hreflang}" href="${BASE}${l.dir}">`).join("\n");
  const headExtra = `  <link rel="canonical" href="${BASE}${here.dir}">\n${alternates}\n` +
    `  <link rel="alternate" hreflang="x-default" href="${BASE}">\n` +
    `  <meta property="og:url" content="${BASE}${here.dir}">\n` +
    `  <script type="application/ld+json">\n${faqJsonLd(lang)}\n  </script>\n`;
  html = html.replace("</head>", headExtra + "</head>");

  // 5. Nút đổi ngôn ngữ dẫn sang trang của ngôn ngữ đó
  html = html.replace(/<button type="button" data-lang="(ja|vi|en)" aria-pressed="(?:true|false)">/g,
    (_whole, code) => {
      const target = LANGS.find((l) => l.code === code);
      return `<button type="button" data-lang="${code}" data-href="${up}${target.dir}" aria-pressed="${code === lang}">`;
    });

  // 6. Đường dẫn tới assets từ thư mục con
  if (up) {
    html = html.replace(/((?:href|src)=")assets\//g, `$1${up}assets/`);
    html = html.replace(/(srcset=")([^"]+)(")/g, (_whole, open, list, close) =>
      open + list.split(",").map((part) => part.trim().replace(/^assets\//, up + "assets/")).join(", ") + close);
  }

  const note = "<!-- Tệp này do tools/build.mjs tạo ra. Đừng sửa tay: sửa src/template.html hoặc assets/js/i18n.js rồi chạy node tools/build.mjs -->";
  return html.replace(/^(<!doctype html>\n)/i, "$1" + note + "\n");
}

function sitemap() {
  const urls = LANGS.map((l) => {
    const links = LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${BASE}${a.dir}"/>`).join("\n");
    return `  <url>\n    <loc>${BASE}${l.dir}</loc>\n${links}\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

const outputs = new Map(LANGS.map((l) => [l.dir + "index.html", page(l.code)]));
outputs.set("sitemap.xml", sitemap());
outputs.set("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);
// Trang 404 có thể hiện ở bất kỳ độ sâu thư mục nào, nên mọi đường dẫn trong đó là địa chỉ đầy đủ theo BASE.
outputs.set("404.html", fs.readFileSync(path.join(ROOT, "src/404.html"), "utf8").replaceAll("__BASE__", BASE));

let stale = 0;
for (const [file, content] of outputs) {
  const target = path.join(ROOT, file);
  if (CHECK) {
    const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : null;
    if (current !== content) { stale++; console.log("LỆCH: " + file); }
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
    console.log("Đã dựng " + file);
  }
}
if (CHECK) {
  console.log(stale ? `${stale} tệp cần dựng lại: chạy node tools/build.mjs` : "Trang tĩnh khớp với i18n.js và template.");
  process.exit(stale ? 1 : 0);
}
