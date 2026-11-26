// Yume Spa – trang menu đẹp, in được khổ A4 (menu/index.html, vi/menu/index.html, en/menu/index.html).
// Nội dung lấy từ assets/js/i18n.js (cùng nguồn với bảng giá trên trang chủ), không gõ giá ở đây.
// Mỗi trang có ngôn ngữ chính và một dòng nhỏ ngôn ngữ phụ dưới tên dịch vụ:
//   JA chính + VI phụ (giống bản PDF ChatGPT 14/11/2026), VI chính + JA phụ, EN chính + JA phụ.
// Ảnh: 3 ảnh minh họa có giấy phép (assets/img/photos/CREDITS.md), luôn ghi "イメージ".
// Khi có ảnh thật tại quán: đổi PHOTOS bên dưới, chạy node tools/build.mjs rồi node tools/menu-pdf.mjs.

const PHOTOS = [
  { src: "assets/img/photos/nail-900.webp", key: "menu.nails" },
  { src: "assets/img/photos/hands-900.webp", key: "" },
  // facial-900.webp không dùng ở menu: ảnh có dụng cụ sát mũi, dễ hiểu nhầm là thủ thuật (soát 26/11/2026)
];
const SECOND = { ja: "vi", vi: "ja", en: "ja" };
const PHONE = "070-2813-6693";
const EMAIL = "booking.yumespa.takenotsuka@gmail.com";

export function menuPage(lang, { Y, t, esc, escAttr, yen, BASE, LANGS }) {
  const here = LANGS.find((l) => l.code === lang);
  const up = "../" + (here.dir ? "../" : "");
  const sub = SECOND[lang];
  const self = `${BASE}${here.dir}menu/`;

  const section = (cat) => {
    const head = `<header class="m-cat-head"><h2>${esc(t(lang, "menu." + cat.id))}</h2>` +
      `<span class="m-cat-sub" lang="${sub}">${esc(t(sub, "menu." + cat.id))}</span></header>`;
    if (cat.soon) {
      return `<section class="m-cat is-soon">${head}<p class="m-desc">${esc(t(lang, "menu." + cat.id + ".d"))}</p>` +
        `<p class="m-soon">${esc(t(lang, "menu.soon"))}</p></section>`;
    }
    const items = cat.items.filter((it) => !it.hidden).map((it) =>
      `<li><div class="m-name"><span>${esc(t(lang, "menu." + it.key))}</span>` +
      `<small lang="${sub}">${esc(t(sub, "menu." + it.key))}</small></div>` +
      `<span class="m-lead" aria-hidden="true"></span>` +
      `<span class="m-min">${esc(t(lang, "menu." + it.key + ".t") + t(lang, "menu.min"))}</span>` +
      `<span class="m-price">${yen(it.price)}</span></li>`).join("");
    const extra = "";
    return `<section class="m-cat">${head}<p class="m-desc">${esc(t(lang, "menu." + cat.id + ".d"))}</p>` +
      `<ul class="m-list">${items}</ul>${extra}</section>`;
  };
  // Cột trái: nail. Cột phải: các nhóm còn lại, nhóm "đang chuẩn bị" xuống cuối.
  const left = Y.menu.filter((c) => c.id === "nails").map(section).join("");
  const right = Y.menu.filter((c) => c.id !== "nails").sort((a, b) => (a.soon ? 1 : 0) - (b.soon ? 1 : 0)).map(section).join("");
  const cats = `<div class="m-col">${left}</div><div class="m-col">${right}<p class="m-note">${esc(t(lang, "menu.off"))}</p></div>`;

  const photos = PHOTOS.map((p) =>
    `<figure><img src="${up}${p.src}" alt="${escAttr(t(lang, "mp.photo"))}" width="900" height="1125" loading="eager"></figure>`).join("");

  const alternates = LANGS.map((l) => `  <link rel="alternate" hreflang="${l.hreflang}" href="${BASE}${l.dir}menu/">`).join("\n");
  const langNav = LANGS.map((l) => `<a href="${up}${l.dir}menu/"${l.code === lang ? ' aria-current="page"' : ""}>${{ ja: "日本語", vi: "Tiếng Việt", en: "English" }[l.code]}</a>`).join("");
  const title = `${t(lang, "mp.title")}｜Yume Spa`;

  return `<!doctype html>
<!-- Tệp này do tools/build.mjs (tools/menu-page.mjs) tạo ra. Đừng sửa tay: sửa assets/js/i18n.js rồi chạy node tools/build.mjs -->
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${escAttr(t(lang, "mp.loc") + " · " + t(lang, "mp.hours") + " · " + t(lang, "mp.open"))}">
  <meta property="og:title" content="${escAttr(title)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${BASE}assets/img/logo.png">
  <meta property="og:url" content="${self}">
  <link rel="canonical" href="${self}">
${alternates}
  <meta name="theme-color" content="#2B2434">
  <link rel="icon" href="${up}assets/img/icon-32.png" sizes="32x32">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Shippori+Mincho:wght@400;500;600&family=Noto+Sans+JP:wght@400;500&family=Noto+Sans:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${up}assets/css/menu.css">
</head>
<body class="lang-${lang}">
  <nav class="m-tools" aria-label="menu tools">
    <a href="${up}${here.dir}">${esc(t(lang, "mp.back"))}</a>
    <span class="m-langs">${langNav}</span>
    <a href="${up}assets/menu/yume-spa-menu-${lang}.pdf" download>${esc(t(lang, "mp.pdf"))}</a>
    <button type="button" onclick="window.print()">${esc(t(lang, "mp.print"))}</button>
  </nav>

  <main class="sheet">
    <header class="m-top">
      <img class="m-logo" src="${up}assets/img/logo-gold.svg" alt="" width="56" height="56">
      <p class="m-brand">Yume Spa</p>
      <p class="m-kana">${esc(t(lang, "mp.kana"))}</p>
      <p class="m-tag">${esc(t(lang, "mp.tag"))}</p>
      <p class="m-meta">${esc(t(lang, "mp.loc"))}<span>·</span>${esc(t(lang, "mp.open"))}</p>
    </header>

    <div class="m-photos">${photos}</div>
    <p class="m-photo-note">${esc(t(lang, "mp.photo"))}</p>

    <h1 class="m-title"><span>${esc(t(lang, "mp.title"))}</span></h1>
    <p class="m-price-note">${esc(t(lang, "menu.note"))}</p>

    <div class="m-cats">
${cats}
    </div>

    <footer class="m-foot">
      <div class="m-info">
        <p>${esc(t(lang, "mp.hours"))}</p>
        <p>${esc(t(lang, "mp.pay"))}</p>
        <p>${esc(t(lang, "mp.lang"))}</p>
      </div>
      <div class="m-contact">
        <p class="m-contact-h">${esc(t(lang, "mp.book"))}</p>
        <p><a href="tel:+81${PHONE.slice(1).replace(/-/g, "")}">TEL ${PHONE}</a></p>
        <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
        <p class="m-url">${BASE.replace(/^https:\/\//, "").replace(/\/$/, "")}</p>
      </div>
      <p class="m-legal">${esc(t(lang, "menu.legal"))}</p>
    </footer>
  </main>
</body>
</html>
`;
}
