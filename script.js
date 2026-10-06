/* =====================================================================
   BOOKING. The only place the booking link lives.

   BOOKING_URL is the Cal.com event for the free 30-minute session.
   Every "Book your free Honest Read" button on the page uses this value,
   and when it is a cal.com link the inline Cal.com calendar under the
   final CTA uses it too (calLink is derived from the path).
   To change the event, change this one line. Set INLINE_EMBED to false
   to keep the buttons only.

   Safety net: if this is ever set back to a placeholder containing
   "REPLACE-ME", the buttons fall back to the Instagram DM link and the
   embed stays hidden.
   ===================================================================== */
const BOOKING_URL = "https://cal.com/dragos-masculinepath/free-session";
const INLINE_EMBED = true;

const INSTAGRAM_DM_URL = "https://ig.me/m/masculinepath.men";

(function () {
  "use strict";

  const isPlaceholder = /REPLACE-ME/i.test(BOOKING_URL);
  let calLink = null;
  try {
    const u = new URL(BOOKING_URL);
    if (!isPlaceholder && /(^|\.)cal\.com$/i.test(u.hostname)) {
      calLink = u.pathname.replace(/^\/+|\/+$/g, "");
    }
  } catch (e) { /* malformed URL: buttons fall back below */ }

  const target = isPlaceholder ? INSTAGRAM_DM_URL : BOOKING_URL;
  document.querySelectorAll("[data-book]").forEach(function (a) {
    a.href = target;
    a.rel = "noopener";
    if (isPlaceholder) a.setAttribute("data-booking-pending", "");
  });
  if (isPlaceholder) {
    console.warn("[Masculine Path] BOOKING_URL is still a placeholder. Booking buttons point to the Instagram DM until it is set in script.js.");
  }

  /* ---------- Cal.com inline embed, loaded only when the final section is near ---------- */
  const embedEl = document.getElementById("cal-inline");
  if (INLINE_EMBED && calLink && embedEl) {
    const loadCal = function () {
      embedEl.hidden = false;
      /* Official Cal.com embed loader */
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      window.Cal("init", "free-session", { origin: "https://cal.com" });
      window.Cal.ns["free-session"]("inline", {
        elementOrSelector: "#cal-inline",
        calLink: calLink,
        config: { layout: "month_view", theme: "dark" }
      });
      window.Cal.ns["free-session"]("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: { "cal-brand": "#b87333" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); loadCal(); }
      }, { rootMargin: "600px 0px" });
      io.observe(document.getElementById("book"));
    } else {
      loadCal();
    }
  }

  /* ---------- Quiet reveal on scroll ---------- */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  document.documentElement.classList.add("reveal-on");
  const rio = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); rio.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach(function (el) { rio.observe(el); });
})();
