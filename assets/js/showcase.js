/* Showcase: three states on one character. Tabs switch state (user-triggered); auto-cycles slowly while visible; 3D tilt + layer parallax on desktop. */
(function () {
  var stage = document.getElementById("figure-stage"); if (!stage) return;
  var svg = stage.querySelector(".figure");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".state-tabs button"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var hasGsap = !!window.gsap;
  var L = {
    hand: svg.querySelector(".fg-hand"), care: svg.querySelector(".fg-carehands"),
    mask: svg.querySelector(".fg-mask"), dots: svg.querySelector(".fg-maskdots"),
    hair: svg.querySelector(".fg-hair"), face: svg.querySelector(".fg-face"), sparks: svg.querySelector(".fg-sparks"), bg: svg.querySelector(".fg-bg")
  };
  var current = "nail";

  function set(el, props, dur) {
    if (hasGsap && !reduce) gsap.to(el, Object.assign({ duration: dur || .8, ease: "power2.out", overwrite: "auto" }, props));
    else { if (props.opacity != null) el.style.opacity = props.opacity; el.style.transform = "translate(" + (props.x || 0) + "px," + (props.y || 0) + "px) scale(" + (props.scale == null ? 1 : props.scale) + ")"; }
  }
  function go(state) {
    current = state;
    tabs.forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-state") === state ? "true" : "false"); });
    if (state === "nail") {
      set(L.hand, { opacity: 1, y: 0, x: 0, scale: 1 }); set(L.care, { opacity: 0, y: -14 }); set(L.mask, { opacity: 0 }); set(L.dots, { opacity: 0 }); set(L.bg, { scale: 1 });
    } else if (state === "head") {
      set(L.hand, { opacity: 0, y: 60, x: 20, scale: .96 }); set(L.care, { opacity: 1, y: 0 }, 1); set(L.mask, { opacity: 0 }); set(L.dots, { opacity: 0 }); set(L.bg, { scale: 1.04 });
    } else {
      set(L.hand, { opacity: 0, y: 60, x: 20, scale: .96 }); set(L.care, { opacity: 0, y: -14 }); set(L.mask, { opacity: 1 }, 1.1); set(L.dots, { opacity: 1 }, 1.4); set(L.bg, { scale: 1.08 });
    }
  }
  tabs.forEach(function (b) { b.addEventListener("click", function () { go(b.getAttribute("data-state")); pauseUntil = Date.now() + 12000; }); });

  /* auto-cycle while visible, pauses after a click or while hovered */
  var order = ["nail", "head", "facial"], visible = false, hover = false, pauseUntil = 0;
  if (!reduce) {
    var io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: .35 });
    io.observe(stage);
    stage.addEventListener("mouseenter", function () { hover = true; }); stage.addEventListener("mouseleave", function () { hover = false; });
    setInterval(function () { if (!visible || hover || Date.now() < pauseUntil) return; go(order[(order.indexOf(current) + 1) % order.length]); }, 4500);
  }

  /* 3D tilt + depth parallax (desktop) */
  if (fine && !reduce) {
    var depth = { 0: -6, 1: -10, 2: 0, 3: 6, 4: 14, 5: 22 };
    stage.addEventListener("mousemove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      stage.style.transform = "rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 7) + "deg)";
      svg.querySelectorAll("[data-fdepth]").forEach(function (el) {
        var d = depth[el.getAttribute("data-fdepth")] || 0;
        if (hasGsap) gsap.to(el, { x: x * d, y: y * d * .6, duration: .6, overwrite: "auto" }); else el.style.transform = "translate(" + (x * d) + "px," + (y * d * .6) + "px)";
      });
    });
    stage.addEventListener("mouseleave", function () {
      stage.style.transform = "";
      svg.querySelectorAll("[data-fdepth]").forEach(function (el) { if (hasGsap) gsap.to(el, { x: 0, y: 0, duration: .8 }); else el.style.transform = ""; });
      go(current);
    });
  }
  go("nail");
})();
