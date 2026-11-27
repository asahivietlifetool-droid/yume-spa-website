// Yume Spa – trang menu đầy đủ, mỗi ngôn ngữ một trang riêng (menu/, vi/menu/, en/menu/).
// Nguồn: assets/js/menu-data.js (bản nhân viên "新料金メニュー案", giám đốc duyệt 26/11/2026).
// Cách trình bày tham khảo trang tiệm trên Hot Pepper Beauty: クーポン (ưu đãi lần đầu) ở trên,
// rồi từng nhóm menu có ảnh mẫu, tên, thời gian, giá; ghi chú điều kiện ngay dưới nhóm.
// In: nhiều trang A4 (CSS @media print trong assets/css/menu.css).

const PHONE = "070-2813-6693";
const EMAIL = "booking.yumespa.takenotsuka@gmail.com";

export function menuPage(lang, { Y, M, t, esc, escAttr, yen, BASE, LANGS }) {
  const here = LANGS.find((l) => l.code === lang);
  const up = "../" + (here.dir ? "../" : "");
  const self = `${BASE}${here.dir}menu/`;
  const u = M.ui[lang];
  const L = (o) => (o && (o[lang] != null ? o[lang] : o.ja)) || "";
  const price = (it) => it.soon ? `<span class="m-soon">${esc(u.soon)}</span>`
    : it.free ? `<span class="m-free">${esc(u.free)}</span>`
    : `${yen(it.price)}${it.from ? `<small>${esc(u.from.trim())}</small>` : ""}`;
  const fmtPrice = (it) => lang === "ja" ? price(it)
    : it.soon || it.free ? price(it) : `${it.from ? `<small>${esc(u.from)}</small>` : ""}${yen(it.price)}`;

  const coupon = `<section class="m-coupon" id="coupon" aria-labelledby="coupon-h">
      <header class="m-sec-head"><p class="m-en">${esc(M.opening.en)}</p><h2 id="coupon-h">${esc(L(M.opening.t))}</h2></header>
      <ul class="m-coupons">${M.opening.items.map((it) =>
        `<li><span class="m-tag">${esc(u.coupon)}</span><span class="m-cn">${esc(L(it.n))}</span><span class="m-cp">${yen(it.price)}</span></li>`).join("")}</ul>
      <p class="m-cond">${esc(L(M.opening.cond))}</p>
    </section>`;

  const toc = `<nav class="m-toc" aria-label="${escAttr(u.toc)}">${M.cats.map((c) =>
    `<a href="#${c.id}"><b>${c.no}</b>${esc(L(c.t))}</a>`).join("")}<a href="#sets"><b>${M.sets.no}</b>${esc(L(M.sets.t))}</a></nav>`;

  const cats = M.cats.map((c) => {
    const photos = (c.photos || []).map(([img, cap]) =>
      `<figure><img src="${up}assets/img/menu/${img}-360.webp" srcset="${up}assets/img/menu/${img}-360.webp 360w, ${up}assets/img/menu/${img}-720.webp 720w" sizes="(max-width: 640px) 42vw, 170px" width="360" height="450" loading="lazy" decoding="async" alt="${escAttr(L(cap))}"><figcaption>${esc(L(cap))}</figcaption></figure>`).join("");
    const rows = c.items.map((it) =>
      `<tr${it.star ? ' class="is-star"' : ""}><th scope="row">${esc(L(it.n))}${it.star ? ` <span class="m-star">${esc(u.star)}</span>` : ""}${it.d ? `<small>${esc(L(it.d))}</small>` : ""}</th>` +
      (c.time ? `<td class="m-min">${it.min ? esc(it.min + u.min) : "—"}</td>` : "") +
      `<td class="m-price">${fmtPrice(it)}</td></tr>`).join("");
    const side = c.photos && c.photos.length <= 2;
    return `<section class="m-cat${c.compact ? " is-compact" : ""}${side ? " is-side" : ""}" id="${c.id}" aria-labelledby="${c.id}-h">
      <header class="m-sec-head"><p class="m-en"><b>${c.no}</b> ${esc(c.en)}</p><h2 id="${c.id}-h">${esc(L(c.t))}</h2></header>
      ${photos ? `<div class="m-photos">${photos}</div>` : ""}
      <div class="m-body"><table class="m-table"><thead><tr><th scope="col"></th>${c.time ? `<th scope="col">${esc(u.time)}</th>` : ""}<th scope="col">${esc(u.price)}</th></tr></thead><tbody>${rows}</tbody></table>
      ${c.note ? `<p class="m-note">${esc(L(c.note))}</p>` : ""}</div>
    </section>`;
  }).join("\n");

  const sets = `<section class="m-cat m-sets" id="sets" aria-labelledby="sets-h">
      <header class="m-sec-head"><p class="m-en"><b>${M.sets.no}</b> ${esc(M.sets.en)}</p><h2 id="sets-h">${esc(L(M.sets.t))}</h2></header>
      <p class="m-lead2">${esc(L(M.sets.note))}</p>
      <ul class="m-setlist">${M.sets.items.map((it) =>
        `<li><p class="m-sn">${esc(L(it.n))}</p><p class="m-sd">${esc(L(it.d))}</p><p class="m-sp"><span class="m-sum">${esc(u.sum)} ${yen(it.sum)}</span><span class="m-setp">${esc(u.setp)} <b>${yen(it.price)}</b></span></p></li>`).join("")}</ul>
    </section>`;

  const alternates = LANGS.map((l) => `  <link rel="alternate" hreflang="${l.hreflang}" href="${BASE}${l.dir}menu/">`).join("\n");
  const langNav = LANGS.map((l) => `<a href="${up}${l.dir}menu/"${l.code === lang ? ' aria-current="page"' : ""}>${{ ja: "日本語", vi: "Tiếng Việt", en: "English" }[l.code]}</a>`).join("");
  const title = `${u.title}｜Yume Beauty Spa & Nail`;

  return `<!doctype html>
<!-- Tệp này do tools/build.mjs (tools/menu-page.mjs) tạo ra. Đừng sửa tay: sửa assets/js/menu-data.js rồi chạy node tools/build.mjs -->
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${escAttr(t(lang, "mp.loc") + " · " + t(lang, "mp.hours") + " · " + u.lead)}">
  <meta property="og:title" content="${escAttr(title)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${BASE}assets/img/menu/trend-720.webp">
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
  <nav class="m-tools" aria-label="tools">
    <a href="${up}${here.dir}">${esc(t(lang, "mp.back"))}</a>
    <span class="m-langs">${langNav}</span>
    <a href="${up}assets/menu/yume-spa-menu-${lang}.pdf" download>${esc(t(lang, "mp.pdf"))}</a>
    <button type="button" onclick="window.print()">${esc(t(lang, "mp.print"))}</button>
  </nav>

  <main class="sheet">
    <header class="m-top">
      <img class="m-logo" src="${up}assets/img/logo-gold.svg" alt="" width="56" height="62">
      <p class="m-brand">Yume Beauty Spa &amp; Nail</p>
      <p class="m-kana">${esc(t(lang, "mp.kana"))}</p>
      <h1 class="m-title"><span>${esc(u.title)}</span></h1>
      <p class="m-meta">${esc(t(lang, "mp.loc"))}<span>·</span>${esc(t(lang, "mp.open"))}</p>
      <p class="m-meta">${esc(t(lang, "mp.hours"))}<span>·</span>${esc(t(lang, "mp.pay"))}</p>
      <p class="m-price-note">${esc(u.lead)}</p>
    </header>

    ${coupon}
    ${toc}
    <p class="m-photo-note">${esc(u.photo)}</p>

    <div class="m-cats">
${cats}
${sets}
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
