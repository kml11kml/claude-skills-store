/* Priced Pain Finder — client-side behaviour.
   Search + category filter run on the cards already in the DOM.
   products.json is fetched as the data file: any product it lists that is
   not already rendered (e.g. a skill appended later by the daily routine)
   is added as a card, and any new category becomes a filter pill. */
(function () {
  "use strict";

  var WALLET = "TJ55nFLqS6uJ8hxE41QP4ZqEKzWJP51gez";

  /* ---- copy buttons (wallet address, terminal commands) ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var text = btn.getAttribute("data-copy");
    var done = function () {
      var old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(function () { btn.textContent = old; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (err) { /* ignore */ }
    document.body.removeChild(ta);
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      q.parentElement.classList.toggle("open");
    });
  });

  /* ---- count-up on real numbers only ---- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || !isFinite(target)) { el.textContent = target; return; }
    var start = null, dur = 800;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  } else { counters.forEach(animateCount); }

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); rio.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { rio.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add("visible"); }); }

  /* ---- search + category filter (home grid) ---- */
  var grid = document.getElementById("skill-grid");
  var search = document.getElementById("skill-search");
  var pills = document.querySelectorAll(".pill");
  var empty = document.getElementById("no-results");
  var activeCat = "all";
  if (grid) {
    var resultCount = document.getElementById("result-count");
    var categoryLabel = {
      "cost-guard": "Cost guard", "billing": "Billing",
      "migration": "Migration", "setup": "Setup"
    };
    function applyFilter() {
      var q = search ? search.value.trim().toLowerCase() : "";
      var visible = 0;
      grid.querySelectorAll(".card").forEach(function (card) {
        var cat = card.getAttribute("data-category") || "";
        var text = (card.textContent || "").toLowerCase();
        var ok = (activeCat === "all" || cat === activeCat) && (!q || text.indexOf(q) !== -1);
        card.style.display = ok ? "" : "none";
        if (ok) visible++;
      });
      if (empty) empty.classList.toggle("show", visible === 0);
      if (resultCount) resultCount.textContent = visible + (visible === 1 ? " skill" : " skills");
    }
    if (search) search.addEventListener("input", applyFilter);
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");
        activeCat = pill.getAttribute("data-filter") || "all";
        applyFilter();
      });
    });

    /* ---- merge products.json: add cards the static HTML does not have yet ---- */
    fetch("products.json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !Array.isArray(data.products)) return;
        var known = {};
        grid.querySelectorAll(".card").forEach(function (c) { known[c.getAttribute("data-slug")] = true; });
        var pillsWrap = document.querySelector(".pills");
        data.products.forEach(function (p) {
          if (!p || !p.slug || known[p.slug]) return;
          var card = document.createElement("article");
          card.className = "card reveal visible";
          card.setAttribute("data-category", p.category || "");
          card.setAttribute("data-slug", p.slug);
          var label = categoryLabel[p.category] || p.category || "";
          var href = "product/" + p.slug + "/";
          card.innerHTML =
            '<div class="card-meta"><span class="tag">Claude Code</span>' +
            (label ? '<span class="tag tag-cat">' + escapeHtml(label) + "</span>" : "") + "</div>" +
            "<h3><a href=\"" + href + "\">" + escapeHtml(p.name || p.slug) + "</a></h3>" +
            "<p class=\"problem\">" + escapeHtml(p.tagline || "") + "</p>" +
            '<div class="price-row"><span class="price">$' + (p.price_usd || 9) + '</span><span class="price-note">one-time · USDT</span></div>' +
            '<a class="btn btn-sm" href="' + href + '">View skill</a>';
          grid.appendChild(card);
          /* add a pill for a category the static HTML did not know */
          if (p.category && !document.querySelector('.pill[data-filter="' + p.category + '"]') && pillsWrap) {
            var pill = document.createElement("button");
            pill.className = "pill"; pill.type = "button";
            pill.setAttribute("data-filter", p.category);
            pill.textContent = label + " ";
            var n = document.createElement("span"); n.className = "count"; n.textContent = "(1)";
            pill.appendChild(n);
            pill.addEventListener("click", function () {
              pillsWrap.querySelectorAll(".pill").forEach(function (x) { x.classList.remove("active"); });
              pill.classList.add("active");
              activeCat = p.category; applyFilter();
            });
            pillsWrap.appendChild(pill);
          }
        });
        applyFilter();
      })
      .catch(function () { /* static cards already render; nothing to merge */ });

    applyFilter();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
