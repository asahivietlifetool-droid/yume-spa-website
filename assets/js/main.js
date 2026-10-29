(function () {
  var Y = window.YUME;
  var current = "ja";

  function t(key) {
    var d = Y.t[current];
    return (d && d[key] != null) ? d[key] : (Y.t.ja[key] != null ? Y.t.ja[key] : "");
  }

  function yen(n) { return "¥" + n.toLocaleString("ja-JP"); }

  function renderMenu() {
    var grid = document.getElementById("menu-grid");
    if (!grid) return;
    grid.innerHTML = "";
    Y.menu.forEach(function (cat) {
      var card = document.createElement("div");
      card.className = "menu-card " + cat.id;
      var h = document.createElement("h3");
      h.innerHTML = "<i aria-hidden='true'></i>" + t("menu." + cat.id);
      var d = document.createElement("p");
      d.className = "d";
      d.textContent = t("menu." + cat.id + ".d");
      var ul = document.createElement("ul");
      ul.className = "price-list";
      cat.items.forEach(function (it) {
        var li = document.createElement("li");
        var n = document.createElement("span"); n.className = "n"; n.textContent = t("menu." + it.key);
        var tm = document.createElement("span"); tm.className = "t"; tm.textContent = t("menu." + it.key + ".t") + t("menu.min");
        var p = document.createElement("span"); p.className = "p";
        p.innerHTML = (it.from ? "<small>" + t("menu.from") + "</small>" : "") + yen(it.price);
        li.appendChild(n); li.appendChild(p); li.appendChild(tm);
        ul.appendChild(li);
      });
      card.appendChild(h); card.appendChild(d); card.appendChild(ul);
      grid.appendChild(card);
    });
  }

  function applyLang(lang) {
    current = Y.t[lang] ? lang : "ja";
    document.documentElement.lang = current;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === current ? "true" : "false");
    });
    renderMenu();
    try { localStorage.setItem("yume-lang", current); } catch (e) {}
  }

  function wireLinks() {
    var line = document.getElementById("line-link");
    var cta = document.getElementById("cta-line");
    var fb = document.getElementById("fb-link");
    var openingBtn = document.querySelector(".opening-card .btn");
    if (Y.links.line && Y.links.line.indexOf("XXXX") === -1) {
      line.href = Y.links.line;
      if (openingBtn) { openingBtn.href = Y.links.line; openingBtn.target = "_blank"; openingBtn.rel = "noopener"; }
    } else {
      line.href = "tel:+817027944770";
      line.removeAttribute("target");
    }
    if (Y.links.facebook) fb.href = Y.links.facebook;
    if (Y.links.map) {
      var map = document.getElementById("map");
      map.innerHTML = "<iframe loading='lazy' referrerpolicy='no-referrer-when-downgrade' src='" + Y.links.map + "' title='Map'></iframe>";
    }
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  var saved = null;
  try { saved = localStorage.getItem("yume-lang"); } catch (e) {}
  if (!saved) {
    var nav = (navigator.language || "ja").toLowerCase();
    saved = nav.indexOf("vi") === 0 ? "vi" : (nav.indexOf("en") === 0 ? "en" : "ja");
  }
  applyLang(saved);
  wireLinks();
})();
