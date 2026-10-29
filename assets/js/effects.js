/* Yume Spa – 2.5D effects: parallax (scroll + mouse), title reveal, word lighting, card cascade, tilt cards, lightbox.
   Everything degrades gracefully: no GSAP → static page; reduced motion → static page. */
(function () {
  var G = window.YUME_GALLERY || { slots: 3, space: [], nails: [], guests: [] };

  /* ---- gallery render (always, no GSAP needed) ---- */
  function t(key) { var l = document.documentElement.lang || "ja"; var d = (window.YUME.t[l] || window.YUME.t.ja); return d[key] || window.YUME.t.ja[key] || ""; }
  function renderGallery() {
    var root = document.getElementById("gallery-groups"); if (!root) return;
    root.innerHTML = "";
    ["space", "nails", "guests"].forEach(function (g) {
      var wrap = document.createElement("div"); wrap.className = "gallery-group";
      var h = document.createElement("h3"); h.innerHTML = "<i aria-hidden='true'></i>" + t("gallery." + g);
      var grid = document.createElement("div"); grid.className = "tilt-grid";
      var items = G[g] || [];
      var n = Math.max(items.length, G.slots || 3);
      for (var i = 0; i < n; i++) {
        var it = items[i];
        if (it) {
          var b = document.createElement("button"); b.type = "button"; b.className = "tilt"; b.setAttribute("data-full", it.src);
          b.innerHTML = "<img loading='lazy' src='" + it.src + "' alt='" + (it.alt || "") + "' width='800' height='1000'><span class='shine' aria-hidden='true'></span>" + (it.alt ? "<span class='cap'>" + it.alt + "</span>" : "");
          grid.appendChild(b);
        } else {
          var d = document.createElement("div"); d.className = "tilt placeholder"; d.setAttribute("aria-hidden", "true");
          d.innerHTML = "<img src='assets/img/icon-gold.svg' alt=''><span>" + t("gallery.soon") + "</span>";
          grid.appendChild(d);
        }
      }
      wrap.appendChild(h); wrap.appendChild(grid); root.appendChild(wrap);
    });
  }
  renderGallery();
  document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setTimeout(renderGallery, 0); }); });

  /* ---- lightbox ---- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".tilt[data-full]");
      if (card) { lbImg.src = card.getAttribute("data-full"); lbImg.alt = card.querySelector("img").alt; lb.hidden = false; lb.querySelector(".lightbox-close").focus(); }
      else if (e.target === lb || e.target.closest(".lightbox-close")) { lb.hidden = true; lbImg.src = ""; }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) { lb.hidden = true; lbImg.src = ""; } });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* ---- tilt cards (desktop only) ---- */
  if (fine && !reduce) {
    document.addEventListener("mousemove", function (e) {
      var card = e.target.closest(".tilt"); if (!card) return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "rotateX(" + (-y * 10) + "deg) rotateY(" + (x * 12) + "deg) translateZ(6px)";
      card.style.boxShadow = "0 24px 48px rgba(43,36,52,.22)";
    });
    document.addEventListener("mouseout", function (e) {
      var card = e.target.closest(".tilt"); if (!card) return;
      if (e.relatedTarget && card.contains(e.relatedTarget)) return;
      card.style.transform = ""; card.style.boxShadow = "";
    });
  }

  /* ---- GSAP scroll effects ---- */
  if (!window.gsap || !window.ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();
  mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(pointer: fine)" }, function (ctx) {
    if (!ctx.conditions.motion) return;
    var isFine = ctx.conditions.fine;
    var factors = { 0: 0.1, 1: 0.25, 2: 0.5, 3: 0.8, 4: 1, 5: 1.2 };

    // 1. multi-layer parallax inside the hero scene
    gsap.utils.toArray(".scene [data-depth]").forEach(function (el) {
      var f = factors[el.getAttribute("data-depth")] || 1;
      gsap.to(el, { yPercent: -18 * f * (isFine ? 1 : 0.5), ease: "none",
        scrollTrigger: { trigger: el.closest(".scene"), start: "top top", end: "bottom top", scrub: true } });
    });

    // 2. title reveal on load (clip from bottom) + lead fade
    gsap.fromTo(".reveal-title", { clipPath: "inset(0 0 100% 0)", y: 24 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.1, ease: "power3.out", delay: .15 });
    gsap.from(".hero-lead, .hero-open, .hero-actions", { opacity: 0, y: 18, duration: .9, stagger: .12, delay: .5, ease: "power2.out" });

    // 3. mouse parallax (desktop)
    if (isFine) {
      var hero = document.querySelector('.scene[data-scene="hero"]');
      hero.addEventListener("mousemove", function (e) {
        var x = (e.clientX / innerWidth - 0.5) * 2, y = (e.clientY / innerHeight - 0.5) * 2;
        gsap.to('.scene [data-depth="2"]', { x: x * 22, y: y * 12, duration: .8, overwrite: "auto" });
        gsap.to('.scene .hero-butterfly', { x: x * 10, y: y * 6, duration: .8, overwrite: "auto" });
        gsap.to('.scene [data-depth="5"]', { x: x * -14, y: y * -8, duration: .8, overwrite: "auto" });
      }, { passive: true });
    }

    // 4. word-by-word lighting on the concept lead (JA by character, VI/EN by word)
    document.querySelectorAll('[data-animate="words"]').forEach(function (p) {
      var text = p.textContent.trim();
      var cjk = /[぀-ヿ㐀-鿿]/.test(text);
      var parts = cjk ? Array.from(text) : text.split(/\s+/);
      p.setAttribute("aria-label", text); p.textContent = "";
      parts.forEach(function (w, i) { var s = document.createElement("span"); s.className = "w"; s.setAttribute("aria-hidden", "true"); s.textContent = w; if (i && !cjk) p.append(" "); p.append(s); });
      gsap.fromTo(p.querySelectorAll(".w"), { opacity: .18 }, { opacity: 1, stagger: .04, ease: "none",
        scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 45%", scrub: true } });
    });

    // 5. cascade for menu cards, gallery cards, steps
    gsap.utils.toArray(".menu-card, .gallery-group, .steps li, .opening-card").forEach(function (el, i) {
      gsap.from(el, { y: 36, opacity: 0, duration: .8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });

    // 6. section title underline draws in
    gsap.utils.toArray(".col-title h2, .menu-head h2").forEach(function (h) {
      gsap.from(h, { x: -16, opacity: 0, duration: .7, ease: "power2.out", scrollTrigger: { trigger: h, start: "top 85%", once: true } });
    });
  });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  // re-render language switch may change text metrics
  document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { setTimeout(function () { ScrollTrigger.refresh(); }, 50); }); });
})();
