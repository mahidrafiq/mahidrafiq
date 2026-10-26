/* ==========================================================================
   MAHID RAFIQ PORTFOLIO — APP
   Renders everything from window.PORTFOLIO (js/data.js).
   Structure: helpers > components > pages > router > shell (nav, theme, palette)
   ========================================================================== */
(function () {
"use strict";
var D = window.PORTFOLIO, P = D.profile;
var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
var hoverOK = matchMedia("(hover:hover)").matches;

/* ---------------------------------------------------------------- helpers */
function $(id) { return document.getElementById(id); }
function add(el, c) {
  if (c == null || c === false) return;
  if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
  el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
}
function h(tag, props) {
  var el = document.createElement(tag); props = props || {};
  for (var k in props) {
    var v = props[k]; if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k === "dataset") { for (var d in v) el.dataset[d] = v[d]; }
    else if (k === "style" && typeof v === "object") { for (var s in v) el.style.setProperty(s, v[s]); }
    else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, v);
  }
  for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
  return el;
}
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function frag(list) { var f = document.createDocumentFragment(); list.forEach(function (x) { if (x) f.appendChild(x); }); return f; }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
var mem = {};
var store = {
  get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? (k in mem ? mem[k] : d) : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } },
  set: function (k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
var inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2, minimumFractionDigits: 0 });
function money(n) { return inr.format(Math.round(n * 100) / 100); }
var toastT;
function toast(m) { var t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("on"); }, 2200); }
function copy(text, msg) {
  function fb() {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, ta.value.length);
      var ok = document.execCommand("copy"); ta.remove();
      if (ok) { toast(msg); return; }
    } catch (e) {}
    toast("Copy blocked here. Select and copy manually.");
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { toast(msg); }, fb);
  } else fb();
}
function byKind(k) { return D.timeline.filter(function (e) { return e.kind === k; }); }
function nowYear() { var d = new Date(); return d.getFullYear() + d.getMonth() / 12; }
function dataset(el, name) { return el.dataset[name]; }

/* ---------------------------------------------------------------- reveal */
var revealIO = null;
function rv(el, variant, i) {
  el.classList.add("rv"); if (variant) el.dataset.rv = variant; if (i != null) el.style.setProperty("--i", i); return el;
}
function resetReveals() { if (revealIO) { revealIO.disconnect(); revealIO = null; } }
/* Observes any not-yet-revealed elements under root. Safe to call again for content added later. */
function observeReveals(root) {
  var els = $$(".rv,.rv-head", root);
  if (!document.documentElement.classList.contains("js") || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("vis"); }); return; }
  if (!revealIO) {
    revealIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("vis"); revealIO.unobserve(e.target);
        setTimeout(function () { e.target.classList.add("done"); }, 1300);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
  }
  els.forEach(function (e) { if (!e.classList.contains("vis")) revealIO.observe(e); });
}


/* ------------------------------------------------------------ brand marks */
var SVGNS = "http://www.w3.org/2000/svg";
function MarkSvg(fill, cls) {
  var s = document.createElementNS(SVGNS, "svg"); s.setAttribute("viewBox", D.brand.mark.viewBox);
  s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false"); s.setAttribute("class", "mk " + (cls || ""));
  var p = document.createElementNS(SVGNS, "path"); p.setAttribute("d", D.brand.mark.d); p.setAttribute("fill", fill); p.setAttribute("fill-rule", "evenodd");
  s.appendChild(p); return s;
}
/* Silver mark on dark theme, dark mark on light theme (switched by CSS tokens) */
function ThemedMark() { return h("span", { class: "mkw" }, MarkSvg("url(#mr-metal)", "mk-d"), MarkSvg("#0B0F12", "mk-l")); }
function NameText() { var n = P.name.split(" "); return h("span", { class: "nm-t" }, h("span", { class: "n1" }, n[0] + " "), h("b", null, n.slice(1).join(" "))); }
function BrandLink() { return [ThemedMark(), h("span", { class: "brand-word" }, NameText(), h("small", null, D.brand.tagline.toUpperCase()))]; }
function Orbit() {
  var d = h("div", { class: "orbit", "aria-hidden": "true" });
  var dot = reduce ? '<circle cx="420" cy="220" r="8" fill="var(--lime)"/>' : '<circle r="8" fill="var(--lime)"><animateMotion dur="16s" repeatCount="indefinite" path="M20,220 a200,72 0 1,0 400,0 a200,72 0 1,0 -400,0"/></circle>';
  d.innerHTML = '<svg viewBox="0 0 440 440"><g transform="rotate(-27 220 220)"><ellipse cx="220" cy="220" rx="200" ry="72" fill="none" stroke="var(--lime)" stroke-width="2.2" opacity=".85"/>' + dot + '</g></svg>';
  return d;
}

/* ------------------------------------------------------- small components */
function Chip(text, cls) { return h("span", { class: cls || "" }, text); }
function SectionHead(o) {
  var left = h("div", { class: "rv-head" },
    h("div", { class: "kicker" }, o.kicker),
    h("h2", null, o.lines.map(function (t, i) { return h("span", { class: "ln" }, h("span", { class: "lni" + (i ? " soft" : ""), style: { "--i": i } }, t)); }))
  );
  return h("div", { class: "sh" }, left, o.intro ? rv(h("p", null, o.intro), "up", 2) : null);
}
function Section(id, cls) { return h("section", { class: "section shell " + (cls || ""), id: id }); }
function arrow(t) { return h("b", null, t); }
function LinkRow(label, href, ext, onclick) {
  var a = h("a", { class: "lk", href: href, onclick: onclick }, label, arrow(ext ? "↗" : "↓"));
  if (ext) { a.target = "_blank"; a.rel = "noopener"; }
  return a;
}

/* -------------------------------------------------- project artwork (data-keyed) */
var ART = {
  dashboard: '<div class="mock"><div class="mbar"><i></i><i></i><i></i><span>rafiq-innovations / orders</span></div><div class="mbody"><div class="mm"><div><small>ACTIVE FLOW</small><strong>Orders</strong><em>● Ready</em></div><div><small>PRODUCTS</small><strong>Catalog</strong><em>↗ Lookup</em></div><div><small>STORAGE</small><strong>SQLite</strong><em>● Local</em></div></div><div class="bars"><i style="--h:40%;--d:0s"></i><i style="--h:62%;--d:.3s"></i><i style="--h:48%;--d:.6s"></i><i style="--h:80%;--d:.9s"></i><i style="--h:58%;--d:1.2s"></i><i style="--h:92%;--d:1.5s"></i></div></div></div>',
  receipt: '<div class="receipt"><strong>ORDER SUMMARY</strong><i></i><i style="width:70%"></i><i style="width:84%"></i><div class="t"><span>TOTAL</span><b>₹ —</b></div></div>',
  gate: '<svg class="art" viewBox="0 0 220 150" aria-hidden="true"><g fill="none" stroke="var(--line2)" stroke-width="1.5"><rect x="26" y="26" width="168" height="108" rx="3"/><path d="M110 26v108"/><path d="M26 134h168" stroke="var(--silver)" stroke-width="2"/></g><g fill="var(--panel2)" stroke="var(--line2)" stroke-width="1.5"><path d="M36 134V70a30 30 0 0 1 60 0v64z"/><path d="M124 134V70a30 30 0 0 1 60 0v64z"/></g><g stroke="var(--lime)" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M66 134V50M36 100h60M66 76c-14 0-20 12-20 24M66 76c14 0 20 12 20 24"/><path d="M154 134V50M124 100h60M154 76c-14 0-20 12-20 24M154 76c14 0 20 12 20 24"/></g></svg>',
  press: '<svg class="art" viewBox="0 0 220 150" aria-hidden="true"><g fill="var(--panel2)" stroke="var(--line2)" stroke-width="1.5"><rect x="40" y="70" width="140" height="34" rx="4"/><rect x="92" y="108" width="36" height="34" rx="3"/></g><g class="punch"><rect x="92" y="8" width="36" height="40" rx="3" fill="var(--panel2)" stroke="var(--line2)" stroke-width="1.5"/><rect x="100" y="48" width="20" height="18" fill="var(--lime)"/></g><rect x="100" y="70" width="20" height="8" rx="2" fill="var(--silver)"/><g stroke="var(--line2)" stroke-dasharray="3 4"><path d="M20 87h18M182 87h18"/></g></svg>',
  orchard: '<svg class="art" viewBox="0 0 240 150" aria-hidden="true"><g stroke="var(--line2)" stroke-width="2"><path d="M50 128v-34M120 128v-44M190 128v-34"/></g><g class="sway"><circle cx="50" cy="76" r="26" fill="color-mix(in srgb,var(--lime) 30%,transparent)" stroke="var(--lime)"/><circle cx="120" cy="64" r="32" fill="color-mix(in srgb,var(--silver) 26%,transparent)" stroke="var(--silver)"/><circle cx="190" cy="76" r="26" fill="color-mix(in srgb,var(--lime) 30%,transparent)" stroke="var(--lime)"/></g><g fill="var(--lime)"><circle cx="40" cy="80" r="3"/><circle cx="58" cy="70" r="3"/><circle cx="112" cy="70" r="3"/><circle cx="130" cy="58" r="3"/><circle cx="182" cy="82" r="3"/><circle cx="198" cy="70" r="3"/></g><path d="M20 130h200" stroke="var(--line2)"/></svg>',
  site: '<div class="mock"><div class="mbar"><i></i><i></i><i></i><span>mahidrafiq.github.io</span></div><div class="mbody"><div class="siteblk"><i style="width:62%"></i><i style="width:40%"></i></div><div class="mm"><div><small>DATA</small><strong>1 file</strong></div><div><small>ROUTES</small><strong>2 pages</strong></div><div><small>THEMES</small><strong>Light, dark</strong></div></div></div></div>'
};
function Art(key) { var d = h("div", { class: "artwrap" }); d.innerHTML = ART[key] || ""; return d; }

/* ------------------------------------------------------------------ HERO */
function Hero() {
  var sec = h("section", { class: "hero shell", id: "top", "aria-labelledby": "hero-title" });
  var lines = P.headline.map(function (t, i) {
    return h("span", { class: "line ln" }, h("span", { class: "lni " + (i === 1 ? "stroke" : i === 2 ? "grad" : ""), style: { "--i": i } }, t));
  });
  var swapWords = P.exploring.map(function (w, i) { return h("span", { class: i ? "" : "on" }, w); });
  var av = D.availability;
  var left = h("div", null,
    h("div", { class: "pill" }, h("span", { class: "dot" }), h("span", null, av.status), h("span", { class: "clk" }, "· ", h("span", { id: "clock" }, "IST --:--"))),
    h("h1", { id: "hero-title" }, lines),
    h("p", { class: "hero-desc" }, P.lede),
    av.lookingFor ? h("p", { class: "seek" }, h("b", null, "Looking for: "), av.lookingFor.replace(/^A /, "a ").replace(/^a /, "a ")) : null,
    P.now ? h("p", { class: "seek" }, h("b", null, "Now: "), P.now) : null,
    h("div", { class: "now" }, h("span", { class: "lbl" }, "Exploring"), h("span", { class: "swap", id: "swap" }, swapWords)),
    h("div", { class: "hero-actions" },
      h("a", { class: "btn btn-primary", href: "#lab" }, "Try the live demos ↘"),
      h("a", { class: "btn", href: "#work" }, "Explore my work"),
      P.cv ? h("a", { class: "btn", href: P.cv, download: "", target: "_blank", rel: "noopener" }, "Download CV ↓") : null)
  );
  var portrait = h("div", { class: "portrait", id: "portrait" },
    h("img", { src: P.portrait, alt: P.portraitAlt, width: "1113", height: "1484", fetchpriority: "high" }),
    h("div", { class: "pcap" }, h("div", null, h("strong", null, P.name), h("small", null, "B.PHARM · DEVELOPER")), h("span", { class: "go" }, "↗"))
  );
  var edu = D.timeline.filter(function (e) { return e.kind === "education" && e.current; })[0];
  var visual = h("div", { class: "visual", id: "visual" },
    h("div", { class: "visual-aura" }), Orbit(), portrait,
    edu ? h("div", { class: "chip one" }, h("small", null, "Studying"), h("strong", null, edu.short + ", " + (edu.stat || "").toLowerCase() )) : null,
    h("div", { class: "chip two" }, h("small", null, "Based in"), h("strong", null, P.location.split(",")[0] + (P.origin ? " · from J&K" : "")))
  );
  sec.appendChild(h("div", { class: "hero-grid" }, left, visual));

  sec.appendChild(h("div", { class: "idn" }, D.identity.map(function (d, i) {
    return rv(h("div", null, h("span", { class: "mono" }, "0" + (i + 1)), h("strong", null, d.name), h("p", null, d.note)), "up", i);
  })));

  var stats = [];
  stats.push({ n: D.projects.length, l: "Projects" });
  var ach = byKind("achievement").length; if (ach) stats.push({ n: ach, l: "Achievements" });
  var langs = D.skills.filter(function (s) { return s.kind === "language"; }).length; if (langs) stats.push({ n: langs, l: "Languages used" });
  if (edu && edu.stat) stats.push({ t: edu.stat, l: "B.Pharm · " + edu.label.replace(" (expected)", "") });
  sec.appendChild(h("div", { class: "stats" }, stats.map(function (s, i) {
    var b = h("b", s.n != null ? { dataset: { count: s.n } } : null, s.n != null ? String(s.n) : s.t);
    return rv(h("div", null, b, h("span", { class: "mono" }, s.l)), "up", i);
  })));
  return sec;
}

/* ------------------------------------------------------------------ WORK */
var labApi = null;
function WorkSection() {
  var sec = Section("work");
  sec.appendChild(SectionHead({
    kicker: "Selected work", lines: ["Made to solve.", "Built to improve."],
    intro: "Software projects and innovation work. Cards are generated from the project list, so adding a project means adding one entry to the data file."
  }));

  var state = { cat: "All", tech: null };
  var cats = ["All"]; D.projects.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
  var techCount = {}; D.projects.forEach(function (p) { p.tech.forEach(function (t) { techCount[t] = (techCount[t] || 0) + 1; }); });
  var techs = Object.keys(techCount).sort(function (a, b) { return techCount[b] - techCount[a] || a.localeCompare(b); });

  var count = h("span", { class: "mono", "aria-live": "polite" });
  var catRow = h("div", { class: "fgroup", role: "group", "aria-label": "Filter by category" });
  var techRow = h("div", { class: "fgroup", role: "group", "aria-label": "Filter by technology" });
  var grid = h("div", { class: "pgrid" });
  var cards = D.projects.map(function (p, i) { var c = ProjectCard(p, i); grid.appendChild(c); return c; });

  function apply() {
    var shown = 0;
    cards.forEach(function (c, i) {
      var p = D.projects[i];
      var ok = (state.cat === "All" || p.category === state.cat) && (!state.tech || p.tech.indexOf(state.tech) > -1);
      if (ok) shown++;
      if (ok && c.hidden) { c.hidden = false; requestAnimationFrame(function () { c.classList.remove("out"); }); }
      else if (!ok && !c.hidden) { c.classList.add("out"); setTimeout(function () { if (c.classList.contains("out")) c.hidden = true; }, reduce ? 0 : 220); }
    });
    count.textContent = "Showing " + shown + " of " + D.projects.length;
    $$("button", catRow).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === state.cat)); });
    $$("button", techRow).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === state.tech)); });
    empty.hidden = shown > 0;
  }
  function setTech(t) { state.tech = state.tech === t ? null : t; apply(); }
  cats.forEach(function (c) { catRow.appendChild(h("button", { class: "f", type: "button", dataset: { v: c }, onclick: function () { state.cat = c; apply(); } }, c)); });
  techs.forEach(function (t) { techRow.appendChild(h("button", { class: "f t", type: "button", dataset: { v: t }, onclick: function () { setTech(t); } }, t)); });
  var empty = h("div", { class: "empty", hidden: true }, "No projects match both filters. Clear a filter to see more.");

  sec.appendChild(rv(h("div", { class: "filters" },
    h("div", null, h("span", { class: "mono fl" }, "Category"), catRow),
    h("div", null, h("span", { class: "mono fl" }, "Technology"), techRow),
    count), "up", 0));
  sec.appendChild(grid); sec.appendChild(empty);
  sec.appendChild(Footprint(techs, techCount, function (t) { state.tech = t; apply(); document.getElementById("work").scrollIntoView(); }));
  apply();
  sec.appendChild(h("p", { class: "hint", style: { "margin-top": "18px" } }, "Descriptions reflect the public repositories and my CV. No usage metrics or outcomes are claimed."));
  return sec;
}

function ProjectCard(p, i) {
  var id = "pd-" + p.id;
  var card = h("article", { class: "card pc rv" + (p.featured ? " feat" : ""), id: "project-" + p.id, dataset: { spot: "", rv: "up" }, style: { "--i": i % 3 } });
  var visual = h("div", { class: "pv" }, p.image ? h("img", { class: "pimg", src: p.image, alt: p.name, loading: "lazy" }) : Art(p.visual), h("span", { class: "mono idx" }, "Project " + String(i + 1).padStart(2, "0")));
  var btn = h("button", { class: "more", type: "button", "aria-expanded": "false", "aria-controls": id },
    h("span", { class: "t" }, "Details"), h("b", null, "+"));
  var w = p.writeup;
  var detailInner = h("div", { class: "pd" },
    w ? h("div", { class: "wu" }, [["Problem", w.problem], ["What I built", w.built], ["What went wrong", w.hurdles], ["What I would change", w.next]].filter(function (x) { return x[1]; }).map(function (x) { return h("div", null, h("div", { class: "mono" }, x[0]), h("p", null, x[1])); })) : null,
    h("div", { class: "mono" }, "Key features"),
    h("ul", { class: "feat-list" }, p.features.map(function (f) { return h("li", null, f); })),
    p.tech.length ? h("div", { class: "mono" }, "Technologies") : null,
    p.tech.length ? h("div", { class: "tags" }, p.tech.map(function (t) { return h("span", null, t); })) : null,
    h("div", { class: "links" },
      p.lab ? LinkRow("Run it in the lab", "#lab", false, function () { labApi && labApi.show(p.lab); }) : null,
      p.links.github ? LinkRow("Explore repository", p.links.github, true) : null,
      p.links.demo ? LinkRow("Open the live site", p.links.demo, true) : null)
  );
  var panel = h("div", { class: "pdwrap", id: id, role: "region", "aria-label": p.name + " details" }, detailInner);
  var body = h("div", { class: "pb" },
    h("div", { class: "pm" }, h("span", { class: "mono" }, p.category), h("span", { class: "lab" + (p.category === "Innovation" ? " v" : "") }, p.status)),
    h("h3", null, p.name), h("p", null, p.summary),
    p.tech.length ? h("div", { class: "tags" }, p.tech.slice(0, 4).map(function (t) { return h("span", null, t); }).concat(p.tech.length > 4 ? [h("span", null, "+" + (p.tech.length - 4))] : [])) : null,
    btn, panel);
  btn.addEventListener("click", function () { toggle(card, btn); });
  card.appendChild(visual); card.appendChild(body);
  return card;
}
function toggle(card, btn, force) {
  var open = force != null ? force : !card.classList.contains("open");
  card.classList.toggle("open", open);
  var b = btn || card.querySelector(".more");
  b.setAttribute("aria-expanded", String(open));
  b.querySelector("b").textContent = open ? "−" : "+";
}

/* Technology/category chart, generated from the project list */
function Footprint(techs, techCount, onTech) {
  var catCount = {}; D.projects.forEach(function (p) { catCount[p.category] = (catCount[p.category] || 0) + 1; });
  var cats = Object.keys(catCount);
  var colors = ["var(--d1)", "var(--d2)", "var(--d3)", "var(--good)"];
  var total = D.projects.length, max = techs.length ? techCount[techs[0]] : 1;
  var stack = h("div", { class: "stack", role: "img", "aria-label": cats.map(function (c) { return catCount[c] + " " + c; }).join(", ") },
    cats.map(function (c, i) { return h("i", { style: { width: (catCount[c] / total * 100) + "%", background: colors[i % colors.length] } }); }));
  var legend = h("div", { class: "legend mono" }, cats.map(function (c, i) { return h("span", { style: { "--c": colors[i % colors.length] } }, c + " · " + catCount[c]); }));
  var bars = techs.map(function (t) {
    var n = techCount[t];
    return h("button", { class: "fpbar", type: "button", onclick: function () { onTech(t); }, "aria-label": t + ": used in " + n + " of " + total + " projects. Filter projects." },
      h("span", null, t), h("span", { class: "fptrack" }, h("i", { style: { width: (n / max * 100) + "%" } })), h("b", null, n + " / " + total));
  });
  return rv(h("div", { class: "fp card" },
    h("div", null, h("div", { class: "mono" }, "Project mix"), h("h3", null, "What I build, by type"), stack, legend,
      h("p", { class: "hint" }, "Innovation projects are concept and exploration work, so they list no technologies.")),
    h("div", null, h("div", { class: "mono" }, "Technology usage"), h("h3", null, "Where each tool shows up"), h("div", { class: "fpbars" }, bars),
      h("p", { class: "hint" }, "Counts come from the project list above. Select a bar to filter."))
  ), "up", 0);
}

/* ------------------------------------------------------------------- LAB */
function LabSection() {
  var L = D.lab;
  var sec = Section("lab");
  sec.appendChild(SectionHead({
    kicker: "The lab", lines: ["Don’t just read it.", "Run it."],
    intro: "Browser versions of the core logic in two of my projects, the order workflow and the restaurant POS. Everything runs on your device. Products, prices and rates are sample data."
  }));
  var tabOrder = h("button", { class: "tab", role: "tab", id: "tab-order", type: "button", "aria-selected": "true", "aria-controls": "pane-order" }, "Order management");
  var tabPos = h("button", { class: "tab", role: "tab", id: "tab-pos", type: "button", "aria-selected": "false", "aria-controls": "pane-pos" }, "POS billing");

  /* order form */
  var sel = h("select", { class: "in", id: "o-product" }); L.products.forEach(function (p) { sel.appendChild(h("option", { value: p.id }, p.name + " · " + money(p.price))); });
  var nm = h("input", { class: "in", id: "o-name", type: "text", autocomplete: "off", placeholder: "e.g. Ayesha Khan", maxlength: "40" });
  var qt = h("input", { class: "in", id: "o-qty", type: "number", inputmode: "numeric", min: "1", max: "99", value: "1" });
  var tot = h("b", { id: "o-total" }, "₹0"), err = h("div", { class: "err", id: "o-err", role: "alert", "aria-live": "polite" });
  var oform = h("form", { class: "pane", novalidate: true },
    h("div", { class: "fld" }, h("label", { for: "o-product" }, "Product"), sel),
    h("div", { class: "row2" }, h("div", { class: "fld" }, h("label", { for: "o-name" }, "Customer name"), nm), h("div", { class: "fld" }, h("label", { for: "o-qty" }, "Quantity"), qt)),
    h("div", { class: "calc" }, h("span", { class: "mono" }, "Order total"), tot), err,
    h("button", { class: "btn btn-primary", type: "submit", style: { "justify-self": "start" } }, "Place order →"));
  var paneOrder = h("div", { class: "pane", id: "pane-order", role: "tabpanel", "aria-labelledby": "tab-order" }, oform,
    h("p", { class: "hint" }, "Validates the name and quantity, calculates the total, issues a unique order ID and saves the order, like the Python and SQLite app does. Here it is stored in your browser."));

  /* pos */
  var posItems = h("div", { class: "pos-items" });
  var tax = h("input", { class: "in", id: "p-tax", type: "number", min: "0", max: "40", step: "0.5", value: String(L.taxPercent), inputmode: "decimal" });
  var svc = h("input", { class: "in", id: "p-svc", type: "number", min: "0", max: "25", step: "0.5", value: String(L.servicePercent), inputmode: "decimal" });
  var paneP = h("div", { class: "pane", id: "pane-pos", role: "tabpanel", "aria-labelledby": "tab-pos", hidden: true }, posItems,
    h("div", { class: "row2" }, h("div", { class: "fld" }, h("label", { for: "p-tax" }, "Tax %"), tax), h("div", { class: "fld" }, h("label", { for: "p-svc" }, "Service charge %"), svc)),
    h("p", { class: "hint" }, "Sample menu and rates. Change them to see the totals recalculate."));

  /* right side */
  var olist = h("div", { class: "olist", "aria-live": "polite" }), sCount = h("b", null, "0"), sSum = h("b", null, "₹0");
  var clear = h("button", { class: "btn sm", type: "button" }, "Clear all");
  var sideOrder = h("div", { class: "pane" }, h("div", { class: "lhead" }, h("span", { class: "mono" }, "Saved orders"), clear),
    h("div", { class: "lstat" }, h("div", null, h("span", { class: "mono" }, "Orders"), sCount), h("div", null, h("span", { class: "mono" }, "Value"), sSum)), olist);
  var bill = h("div", { class: "bill" }), plist = h("div", { class: "olist", "aria-live": "polite" });
  var reset = h("button", { class: "btn sm", type: "button" }, "Reset"), save = h("button", { class: "btn btn-primary", type: "button", style: { "justify-self": "start" } }, "Save bill");
  var sideP = h("div", { class: "pane", hidden: true }, h("div", { class: "lhead" }, h("span", { class: "mono" }, "Bill preview"), reset), bill, save, plist);

  var card = h("div", { class: "card lab-card" },
    h("div", { class: "lab-l" }, h("div", { class: "tabs", role: "tablist", "aria-label": "Demo selector" }, tabOrder, tabPos), paneOrder, paneP),
    h("div", { class: "lab-r" }, sideOrder, sideP));
  sec.appendChild(rv(card, "up", 0));

  function show(k) {
    var o = k === "order";
    tabOrder.setAttribute("aria-selected", String(o)); tabPos.setAttribute("aria-selected", String(!o));
    paneOrder.hidden = !o; sideOrder.hidden = !o; paneP.hidden = o; sideP.hidden = o;
  }
  labApi = { show: show };
  tabOrder.onclick = function () { show("order"); }; tabPos.onclick = function () { show("pos"); };
  function prod(id) { for (var i = 0; i < L.products.length; i++) if (L.products[i].id === id) return L.products[i]; return L.products[0]; }

  /* order logic */
  var orders = store.get("mr-orders", null);
  if (!orders) { orders = [{ id: "RI-1001", name: "Sample customer", pid: "rack", qty: 2, total: 9000, ex: true }, { id: "RI-1002", name: "Sample customer", pid: "grill", qty: 1, total: 3200, ex: true }]; store.set("mr-orders", orders); }
  var next = store.get("mr-next", 1003);
  function calc() { var q = parseInt(qt.value, 10); tot.textContent = money((q > 0 && q < 100 ? q : 0) * prod(sel.value).price); }
  function renderOrders() {
    olist.innerHTML = "";
    if (!orders.length) olist.appendChild(h("div", { class: "empty" }, "No orders yet. Place one on the left and it appears here."));
    orders.slice().reverse().forEach(function (o) {
      var b = h("b", null, o.name); if (o.ex) b.appendChild(h("span", { class: "badge" }, "EXAMPLE"));
      var x = h("button", { class: "x", type: "button", "aria-label": "Delete order " + o.id }, "×");
      x.onclick = function () { orders = orders.filter(function (z) { return z !== o; }); store.set("mr-orders", orders); renderOrders(); toast("Order " + o.id + " deleted"); };
      olist.appendChild(h("div", { class: "orow" }, h("span", { class: "id" }, o.id), h("div", { class: "nm" }, b, h("span", null, prod(o.pid).name + " × " + o.qty)), h("span", { class: "tt" }, money(o.total)), x));
    });
    sCount.textContent = orders.length; sSum.textContent = money(orders.reduce(function (a, o) { return a + o.total; }, 0));
  }
  function fail(el, msg) { err.textContent = msg; [nm, qt].forEach(function (i) { i.setAttribute("aria-invalid", "false"); }); el.setAttribute("aria-invalid", "true"); el.focus(); }
  oform.addEventListener("submit", function (e) {
    e.preventDefault(); err.textContent = ""; [nm, qt].forEach(function (i) { i.setAttribute("aria-invalid", "false"); });
    var n = nm.value.trim().replace(/\s+/g, " "), q = Number(qt.value);
    if (n.length < 2) return fail(nm, "Enter the customer's name (at least 2 characters).");
    if (!/^[A-Za-z][A-Za-z .'\-]*$/.test(n)) return fail(nm, "Names can contain letters, spaces, dots, hyphens and apostrophes only.");
    if (!Number.isInteger(q) || q < 1 || q > 99) return fail(qt, "Quantity must be a whole number from 1 to 99.");
    var p = prod(sel.value), o = { id: "RI-" + next, name: n, pid: p.id, qty: q, total: p.price * q };
    next++; orders.push(o); store.set("mr-orders", orders); store.set("mr-next", next); renderOrders();
    nm.value = ""; qt.value = 1; calc(); toast("Order " + o.id + " saved · " + money(o.total));
  });
  clear.onclick = function () { orders = []; store.set("mr-orders", orders); renderOrders(); toast("All orders cleared"); };
  sel.onchange = calc; qt.oninput = calc; calc(); renderOrders();

  /* pos logic */
  var qty = L.menu.map(function () { return 0; }), outs = [], hist = store.get("mr-bills", []);
  L.menu.forEach(function (m, i) {
    var o = h("output", null, "0");
    var mi = h("button", { type: "button", "aria-label": "Remove one " + m.name }, "−"), pl = h("button", { type: "button", "aria-label": "Add one " + m.name }, "+");
    mi.onclick = function () { if (qty[i] > 0) { qty[i]--; upd(); } }; pl.onclick = function () { if (qty[i] < 20) { qty[i]++; upd(); } };
    outs.push(o); posItems.appendChild(h("div", { class: "pi" }, h("b", null, m.name), h("span", null, money(m.price)), h("div", { class: "step" }, mi, o, pl)));
  });
  function pct(el, max) { var v = parseFloat(el.value); return isFinite(v) ? Math.min(max, Math.max(0, v)) : 0; }
  function totals() { var s = 0; L.menu.forEach(function (m, i) { s += m.price * qty[i]; }); var t = s * pct(tax, 40) / 100, c = s * pct(svc, 25) / 100; return { s: s, t: t, c: c, g: s + t + c }; }
  function row(l, v, c) { return h("div", { class: c || "" }, h("span", null, l), h("b", null, v)); }
  function upd() {
    outs.forEach(function (o, i) { o.textContent = qty[i]; }); var x = totals(); bill.innerHTML = "";
    bill.appendChild(row("Subtotal", money(x.s))); bill.appendChild(row("Tax (" + pct(tax, 40) + "%)", money(x.t))); bill.appendChild(row("Service (" + pct(svc, 25) + "%)", money(x.c))); bill.appendChild(row("Total", money(x.g), "tot"));
  }
  function renderHist() {
    plist.innerHTML = "";
    if (!hist.length) { plist.appendChild(h("div", { class: "empty" }, "Saved bills appear here.")); return; }
    hist.slice().reverse().slice(0, 6).forEach(function (b) {
      plist.appendChild(h("div", { class: "orow three" }, h("span", { class: "id" }, "BILL-" + b.n), h("div", { class: "nm" }, h("b", null, b.items + " item" + (b.items > 1 ? "s" : "")), h("span", null, "incl. tax and service")), h("span", { class: "tt" }, money(b.g))));
    });
  }
  tax.oninput = svc.oninput = upd;
  reset.onclick = function () { qty = L.menu.map(function () { return 0; }); upd(); };
  save.onclick = function () {
    var n = qty.reduce(function (a, b) { return a + b; }, 0); if (!n) { toast("Add at least one item first"); return; }
    var x = totals(); hist.push({ n: 101 + hist.length, items: n, g: x.g }); store.set("mr-bills", hist);
    qty = L.menu.map(function () { return 0; }); upd(); renderHist(); toast("Bill saved · " + money(x.g));
  };
  qty[0] = 2; qty[3] = 2; upd(); renderHist();
  return sec;
}

/* ---------------------------------------------------------------- GITHUB */
function GithubSection() {
  var G = D.github, sec = Section("github");
  sec.appendChild(SectionHead({
    kicker: "Live from GitHub", lines: ["Always up to date.", "Pulled live."],
    intro: "Live stats for my project repositories, fetched from GitHub each time this page loads: language, stars and when each was last updated."
  }));
  var dot = h("span", { class: "dot" }), src = h("span", null, "Connecting to GitHub…");
  var grid = h("div", { class: "gh-grid" }, h("div", { class: "skel" }), h("div", { class: "skel" }), h("div", { class: "skel" }));
  var langs = h("div");
  sec.appendChild(rv(h("div", { class: "gh-head" }, h("span", { class: "mono src" }, dot, src), h("a", { class: "btn sm", href: P.links.github, target: "_blank", rel: "noopener" }, "Open profile ↗")), "up", 0));
  sec.appendChild(grid); sec.appendChild(langs);

  var COL = { Python: "#3572A5", JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#a998ff", R: "#198ce7", TypeScript: "#3178c6", Mixed: "#7d8591" };
  var featured = D.projects.map(function (p) { return p.links.github ? p.links.github.split("/").pop().toLowerCase() : null; }).filter(Boolean);
  function allowed(name) {
    var n = name.toLowerCase();
    if ((G.hide || []).map(function (x) { return x.toLowerCase(); }).indexOf(n) > -1) return false;
    return G.mode === "all" ? true : featured.indexOf(n) > -1;
  }
  function when(d) { try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return ""; } }
  function render(list, live) {
    grid.innerHTML = "";
    list.forEach(function (r, i) {
      var l = h("span", { style: { "--c": COL[r.language || "Mixed"] || "#7d8591" } }, r.language || "Mixed");
      var m = h("div", { class: "m" }, l, live ? h("span", null, "★ " + r.stargazers_count) : null, live ? h("span", null, "Updated " + when(r.pushed_at)) : null);
      grid.appendChild(rv(h("a", { class: "card repo", href: r.html_url, target: "_blank", rel: "noopener", dataset: { spot: "" } }, h("h3", null, r.name), h("p", null, r.description || "No description yet."), m), "up", i % 3));
    });
    observeReveals(grid);
  }
  function fallback() {
    dot.style.background = "var(--dim)"; dot.style.animation = "none";
    src.textContent = "Showing featured repositories · live feed unavailable here";
    var list = D.projects.filter(function (p) { return p.links.github; }).map(function (p) {
      return { name: p.links.github.split("/").pop(), description: p.summary, language: p.tech[0], html_url: p.links.github };
    });
    render(list, false);
  }
  var done = false, t = setTimeout(function () { if (!done) { done = true; fallback(); } }, 6000);
  try {
    fetch("https://api.github.com/users/" + G.user + "/repos?sort=pushed&per_page=20").then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (list) {
      if (done) return; done = true; clearTimeout(t);
      list = list.filter(function (r) { return !r.fork && allowed(r.name); });
      if (!list.length) return fallback();
      src.textContent = "Live · " + list.length + " project repositor" + (list.length === 1 ? "y" : "ies");
      render(list.slice(0, G.max || 6), true);
      var cnt = {}, tot = 0; list.forEach(function (r) { if (r.language) { cnt[r.language] = (cnt[r.language] || 0) + 1; tot++; } });
      var keys = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; });
      if (keys.length) {
        var bar = h("div", { class: "langs", role: "img", "aria-label": "Languages across repositories" }), lg = h("div", { class: "legend mono" });
        keys.forEach(function (k) { bar.appendChild(h("i", { style: { width: (cnt[k] / tot * 100) + "%", background: COL[k] || "#7d8591" } })); lg.appendChild(h("span", { style: { "--c": COL[k] || "#7d8591" } }, k + " · " + cnt[k])); });
        langs.appendChild(bar); langs.appendChild(lg);
      }
    }).catch(function () { if (!done) { done = true; clearTimeout(t); fallback(); } });
  } catch (e) { done = true; clearTimeout(t); fallback(); }
  return sec;
}

/* ---------------------------------------------------- SKILLS + VENN MAP */
var ORDER = ["pharmacy", "tech", "research"];
function regionKey(domains) { return ORDER.filter(function (d) { return domains.indexOf(d) > -1; }).join("+"); }
function domName(id) { for (var i = 0; i < D.domains.length; i++) if (D.domains[i].id === id) return D.domains[i].name; return id; }
function regionName(key) { return key.split("+").map(domName).join(" + "); }

function Venn() {
  var regions = {}; D.skills.forEach(function (s) { var k = regionKey(s.domains); (regions[k] = regions[k] || []).push(s); });
  var AN = { "pharmacy": [95, 105], "tech": [305, 105], "research": [200, 292], "pharmacy+tech": [200, 100], "pharmacy+research": [150, 200], "tech+research": [250, 200], "pharmacy+tech+research": [200, 168] };
  var COLS = {}; D.domains.forEach(function (d) { COLS[d.id] = d.color; });
  var circ = [["pharmacy", 150, 140], ["tech", 250, 140], ["research", 200, 225]];
  var svg = '<svg viewBox="0 0 400 345" role="group" aria-label="Skills map: three overlapping domains">';
  circ.forEach(function (c) { svg += '<circle cx="' + c[1] + '" cy="' + c[2] + '" r="100" style="--c:' + COLS[c[0]] + '" class="vc"/>'; });
  svg += '<text x="14" y="26" class="vl">' + esc(domName("pharmacy")) + '</text><text x="386" y="26" class="vl" text-anchor="end">' + esc(domName("tech")) + '</text><text x="200" y="340" class="vl" text-anchor="middle">' + esc(domName("research")) + '</text>';
  Object.keys(regions).forEach(function (k) {
    var a = AN[k]; if (!a) return; var n = regions[k].length;
    svg += '<g class="rg" tabindex="0" role="button" data-k="' + k + '" aria-label="' + esc(regionName(k)) + ': ' + n + ' item' + (n > 1 ? 's' : '') + '"><circle cx="' + a[0] + '" cy="' + a[1] + '" r="17"/><text x="' + a[0] + '" y="' + (a[1] + 5) + '" text-anchor="middle">' + n + '</text></g>';
  });
  svg += "</svg>";
  var holder = h("div", { class: "venn" }); holder.innerHTML = svg;
  var title = h("h3", null), chips = h("div", { class: "chips" }), meta = h("div", { class: "mono" });
  var panel = h("div", { class: "vpanel" }, meta, title, chips,
    h("p", { class: "hint" }, "Placement is my own grouping of the skills and interests on this page, not a proficiency rating. Select a bubble to see what sits in each overlap."));
  var cur = null;
  function select(k) {
    if (!regions[k]) return; cur = k;
    $$(".rg", holder).forEach(function (g) { g.classList.toggle("on", g.dataset.k === k); });
    meta.textContent = k.indexOf("+") > -1 ? "Overlap of " + k.split("+").length + " domains" : "Single domain";
    title.textContent = regionName(k); chips.innerHTML = "";
    regions[k].forEach(function (s) { chips.appendChild(h("span", { class: "p" }, s.name)); });
  }
  function hover(k) { $$(".rg", holder).forEach(function (g) { g.classList.toggle("hl", !!k && g.dataset.k === k); }); }
  holder.addEventListener("click", function (e) { var g = e.target.closest(".rg"); if (g) select(g.dataset.k); });
  holder.addEventListener("keydown", function (e) { var g = e.target.closest && e.target.closest(".rg"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(g.dataset.k); } });
  var first = ["pharmacy+tech+research", "pharmacy+tech", "pharmacy+research", "tech+research", "pharmacy", "tech", "research"].filter(function (k) { return regions[k]; })[0];
  select(first);
  return { el: h("div", { class: "venn-wrap card" }, holder, panel), select: select, hover: hover };
}

function SkillsSection() {
  var sec = Section("skills");
  sec.appendChild(SectionHead({
    kicker: "Skills & focus", lines: ["Tools for the", "work ahead."],
    intro: "Skill groups and the skills map are generated from the skills list. I don't rate myself with percentages. This shows what I work with and where it overlaps. The grouping on the map is my own reading of how these skills relate."
  }));
  var vn = Venn();
  var groups = D.skillGroups.map(function (g, i) {
    var items = D.skills.filter(function (s) { return s.group === g.id; });
    if (!items.length) return null;
    var chips = h("div", { class: "chips" }, items.map(function (s) {
      var k = regionKey(s.domains);
      return h("button", { type: "button", class: i === 0 ? "p" : "", onclick: function () { vn.select(k); }, onmouseenter: function () { vn.hover(k); }, onmouseleave: function () { vn.hover(null); }, onfocus: function () { vn.hover(k); }, onblur: function () { vn.hover(null); } }, s.name);
    }));
    return rv(h("div", { class: "card tgc", dataset: { spot: "" } },
      h("div", { class: "tgh" }, h("span", { class: "ico sm" }, g.icon), h("div", null, h("h3", null, g.title), h("small", null, g.hint.toUpperCase()))), chips), "up", i % 2);
  });
  sec.appendChild(h("div", { class: "tg" }, groups));
  sec.appendChild(h("div", { style: { "margin-top": "18px" } }, rv(h("div", { class: "venn-head" }, h("div", { class: "mono" }, "Skills map"), h("h3", null, "Where pharmacy, technology and research overlap")), "up", 0), rv(vn.el, "up", 1)));
  return sec;
}

/* ------------------------------------------- ACHIEVEMENTS (any kind-based) */
function RecognitionSection() {
  var kinds = ["achievement", "certification", "publication"];
  var list = D.timeline.filter(function (e) { return kinds.indexOf(e.kind) > -1; }).sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
  if (!list.length) return null;
  var sec = Section("achievements");
  sec.appendChild(SectionHead({ kicker: "Achievements", lines: ["Prizes and", "selections."], intro: "From my CV. New achievements, certifications and publications appear here automatically when they are added to the data file." }));
  sec.appendChild(h("div", { class: "ach" }, list.map(function (e, i) {
    return rv(h("article", { class: "card ac", dataset: { spot: "" } },
      h("div", { class: "pm" }, h("span", { class: "lab" }, D.kinds[e.kind].label), h("span", { class: "yr" }, e.label || "")),
      h("h3", null, e.title), e.org || e.place ? h("p", { class: "mono" }, [e.org, e.place].filter(Boolean).join(" · ")) : null, h("p", null, e.summary)), "up", i);
  })));
  return sec;
}

/* ------------------------------------------------------------ ABOUT TEASER */
function AboutTeaser() {
  var sec = Section("intro");
  var card = h("div", { class: "card about" },
    h("div", null, h("div", { class: "kicker" }, "The person behind the builds"),
      h("h2", null, "More than one field.", h("span", null, "One curiosity.")),
      h("div", { class: "stamp" }, h("div", null, h("strong", null, "MR / 01"), "LEARN BY DOING", h("br"), "ALWAYS ITERATE"))),
    h("div", null, h("p", { class: "lead" }, D.story[0]), h("p", null, D.story[1]),
      h("div", { class: "pr" }, D.principles.map(function (p, i) { return rv(h("div", null, h("span", { class: "mono" }, "0" + (i + 1) + " / " + p.label), h("strong", null, p.text)), "up", i); })),
      h("a", { class: "btn btn-primary", href: "#about", style: { "margin-top": "26px" } }, "Read the full story →")));
  sec.appendChild(rv(card, "up", 0));
  return sec;
}

/* ------------------------------------------------------------- NEWSLETTER */
var Newsletter = {
  /* Swap this adapter to connect any service. Must return a Promise. */
  subscribe: function (email) {
    var N = D.newsletter;
    if (!N.endpoint) return new Promise(function (r) { setTimeout(function () { r({ ok: true, preview: true }); }, 600); });
    return fetch(N.endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ email: email, source: "portfolio" }) })
      .then(function (r) { if (!r.ok) throw new Error("status " + r.status); return { ok: true }; });
  }
};
function NewsletterSection() {
  var N = D.newsletter, sec = Section("newsletter");
  var input = h("input", { class: "in", id: "nl-email", name: "email", type: "email", autocomplete: "email", placeholder: "you@example.com", required: true, "aria-describedby": "nl-msg" });
  var trap = h("input", { class: "trap", name: "website", tabindex: "-1", autocomplete: "off", "aria-hidden": "true" });
  var btn = h("button", { class: "btn btn-primary", type: "submit" }, "Subscribe →");
  var msg = h("div", { class: "nl-msg", id: "nl-msg", role: "status", "aria-live": "polite" });
  var form = h("form", { class: "nlform", novalidate: true },
    h("label", { class: "vh", for: "nl-email" }, "Email address"),
    h("div", { class: "nlrow" }, input, btn), trap, msg);
  function say(state, text) { msg.dataset.s = state; msg.textContent = text; }
  form.addEventListener("submit", function (e) {
    e.preventDefault(); input.setAttribute("aria-invalid", "false");
    var v = input.value.trim();
    if (trap.value) { say("success", "You're on the list."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { input.setAttribute("aria-invalid", "true"); say("error", "Enter a valid email address, for example name@domain.com."); input.focus(); return; }
    btn.disabled = true; btn.textContent = "Subscribing…"; say("", "");
    Newsletter.subscribe(v).then(function (res) {
      input.value = ""; form.classList.add("done");
      say("success", res.preview ? "Preview mode: this form is not connected to a mailing service yet, so your email was not stored." : "You're on the list. Thank you.");
    }).catch(function () {
      say("error", "Couldn't subscribe right now. Please try again in a moment, or reach out on LinkedIn.");
    }).then(function () { btn.disabled = false; btn.textContent = "Subscribe →"; });
  });
  var left = h("div", null, h("div", { class: "kicker" }, "Newsletter"),
    h("h2", { class: "nl-title" }, N.heading, h("span", null, ".")),
    h("p", { class: "nl-tag" }, N.tagline),
    h("ul", { class: "nl-list" }, N.topics.map(function (t) { return h("li", null, t); })),
    h("p", { class: "mono" }, N.cadence));
  var right = h("div", { class: "nl-card" }, h("div", { class: "mono" }, "Join the list"), h("h3", null, "One email, when there is something to say."), form);
  sec.appendChild(rv(h("div", { class: "card nl" }, left, right), "up", 0));
  return sec;
}


/* ------------------------------------------------------------ TESTIMONIALS */
function VoicesSection() {
  var sec = Section("voices");
  sec.appendChild(SectionHead({ kicker: "Kind words", lines: ["What people", "say."], intro: "Quotes shared with permission." }));
  sec.appendChild(h("div", { class: "voices" }, D.testimonials.map(function (t, i) {
    return rv(h("figure", { class: "card vq" }, h("blockquote", null, t.quote), h("figcaption", null, h("strong", null, t.name), t.role ? h("span", { class: "mono" }, t.role) : null)), "up", i % 3);
  })));
  return sec;
}

/* ---------------------------------------------------------------- CONTACT */
function ContactSection() {
  var av = D.availability, sec = h("section", { class: "cta shell", id: "contact" });
  var actions = h("div", { class: "cta-actions" },
    P.email ? h("a", { class: "cl", href: "mailto:" + P.email }, "Email me", h("b", null, "@")) : null,
    h("a", { class: P.email ? "cl ghost" : "cl", href: P.links.linkedin, target: "_blank", rel: "noopener" }, "Connect on LinkedIn", h("b", null, "↗")),
    P.cv ? h("a", { class: "cl ghost", href: P.cv, download: "", target: "_blank", rel: "noopener" }, "Download CV", h("b", null, "↓")) : null,
    h("a", { class: "cl ghost", href: P.links.github, target: "_blank", rel: "noopener" }, "Explore my GitHub", h("b", null, "↗")),
    h("button", { class: "cl ghost", type: "button", onclick: function () { copy("Hi Mahid, I came across your portfolio and would like to talk about a project or opportunity around " + av.help[0].toLowerCase() + " or " + av.help[2].toLowerCase() + ". When are you free for a short chat?", "Starter message copied"); } }, "Copy a starter message", h("b", null, "⧉")),
    h("button", { class: "cl ghost", type: "button", onclick: function () { copy(P.siteUrl, "Link copied"); } }, "Copy portfolio link", h("b", null, "⧉")),
    null);
  var panel = h("div", { class: "cta-panel" }, h("span", { class: "wm-mark", "aria-hidden": "true" }, ThemedMark()),
    h("div", { class: "cta-grid" },
      h("div", null, h("div", { class: "kicker", style: { margin: "0" } }, "Open to " + av.types.join(", ").toLowerCase()),
        h("h2", null, "Have a problem", h("br"), "worth ", h("em", null, "solving?")),
        h("p", null, av.seeking || ("I'm looking for " + av.mode.toLowerCase() + ".")),
        h("p", { class: "mono" }, P.email ? "" : "Public email not displayed · LinkedIn is the best way to reach me")),
      actions));
  sec.appendChild(rv(panel, "up", 0));
  return sec;
}

/* ------------------------------------------------------------------ ABOUT */
function Timeline(entries) {
  var kinds = Object.keys(D.kinds).filter(function (k) { return entries.some(function (e) { return e.kind === k; }); });
  var state = "all", list = h("div", { class: "tl" }), row = h("div", { class: "fgroup", role: "group", "aria-label": "Filter timeline" });
  function sortVal(e) { return e.current ? 9999 : (e.year || e.end || e.start || 0); }
  var sorted = entries.slice().sort(function (a, b) { return sortVal(b) - sortVal(a); });
  var nodes = sorted.map(function (e, i) {
    var proj = e.project ? h("a", { class: "lk inline", href: "#project-" + e.project }, "See the project", arrow("→")) : null;
    return rv(h("article", { class: "tle", dataset: { kind: e.kind } },
      h("div", { class: "when mono" }, e.label || ""),
      h("div", { class: "rail" }, h("i", { class: e.current ? "now" : "" })),
      h("div", { class: "tbox card" },
        h("div", { class: "pm" }, h("span", { class: "lab" + (e.kind === "experience" ? " v" : "") }, D.kinds[e.kind].label), e.current ? h("span", { class: "mono now" }, "Current") : null),
        h("h3", null, e.title),
        e.org || e.place ? h("p", { class: "mono" }, [e.org, e.place].filter(Boolean).join(" · ")) : null,
        e.summary ? h("p", null, e.summary) : null,
        e.coursework ? h("div", { class: "chips" }, e.coursework.map(function (c) { return h("span", null, c); })) : null,
        proj)), "up", Math.min(i, 3));
  });
  nodes.forEach(function (n) { list.appendChild(n); });
  function apply() {
    nodes.forEach(function (n) { n.hidden = state !== "all" && n.dataset.kind !== state; });
    $$("button", row).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === state)); });
  }
  ["all"].concat(kinds).forEach(function (k) {
    row.appendChild(h("button", { class: "f", type: "button", dataset: { v: k }, onclick: function () { state = k; apply(); } }, k === "all" ? "All" : D.kinds[k].plural));
  });
  apply();
  return h("div", null, row, list);
}

function MilestoneAxis(entries) {
  var dated = entries.filter(function (e) { return e.year || e.start; });
  if (!dated.length) return null;
  var ys = []; dated.forEach(function (e) { ys.push(e.year || e.start); if (e.end) ys.push(e.end); });
  var now = nowYear(), min = Math.floor(Math.min.apply(null, ys)) - 1, max = Math.ceil(Math.max(Math.max.apply(null, ys), now)) + 1;
  function pct(y) { return (y - min) / (max - min) * 100; }
  var step = (max - min) > 10 ? 2 : 1, ticks = h("div", { class: "ticks" });
  for (var y = min; y <= max; y += step) ticks.appendChild(h("span", { style: { left: pct(y) + "%" } }, String(y)));
  var lanes = Object.keys(D.kinds).map(function (k) {
    var es = dated.filter(function (e) { return e.kind === k; }); if (!es.length) return null;
    var track = h("div", { class: "atrack" + (es.filter(function (z) { return !(z.start && z.end); }).length > 1 ? " stag" : "") }), pi = 0;
    es.forEach(function (e) {
      if (e.start && e.end) {
        var l = pct(e.start), r = pct(e.end), nw = Math.min(Math.max(pct(now), l), r);
        track.appendChild(h("i", { class: "range", style: { left: l + "%", width: (nw - l) + "%" } }));
        if (r > nw) track.appendChild(h("i", { class: "range exp", style: { left: nw + "%", width: (r - nw) + "%" } }));
        track.appendChild(h("span", { class: "ev", style: { left: ((l + r) / 2) + "%" } }, e.short || e.title, h("br"), e.label));
      } else {
        var p = pct(e.year);
        track.appendChild(h("i", { class: "dpt", style: { left: p + "%" } }));
        track.appendChild(h("span", { class: "ev" + (p < 14 ? " al" : p > 86 ? " ar" : "") + (pi++ % 2 ? " lo" : ""), style: { left: p + "%" } }, e.short || e.title, h("br"), e.label));
      }
    });
    return h("div", { class: "lane" }, h("span", { class: "mono" }, D.kinds[k].plural), track);
  });
  var nowLine = h("i", { class: "nowline", style: { left: "calc(var(--ap) + var(--lw) + (100% - 2 * var(--ap) - var(--lw)) * " + (pct(now) / 100) + ")" } }, h("span", { class: "mono" }, "Today"));
  return h("div", { class: "axis card", role: "img", "aria-label": "Milestones on a time axis: " + dated.map(function (e) { return (e.short || e.title) + ", " + e.label; }).join("; ") },
    nowLine, lanes, h("div", { class: "lane tk" }, h("span"), ticks),
    h("p", { class: "hint" }, "Placed by real dates from the timeline data. The hatched part of a bar is the expected remainder."));
}


/* ------------------------------------------------------------ BRAND (About) */
function Lockup(theme) {
  var dark = theme === "dark", B = D.brand, n = P.name.split(" ");
  return h("div", { class: "lockup " + theme },
    MarkSvg(dark ? "url(#mr-metal)" : "#0B0F12", ""),
    h("span", { class: "lk-rule" }),
    h("div", { class: "lk-text" },
      h("div", { class: "lk-name" }, h("span", null, n[0] + " "), h("b", null, n.slice(1).join(" "))),
      h("div", { class: "lk-tag" }, B.tagline.toUpperCase()), h("i", { class: "lk-bar" })));
}
function BrandSection() {
  var B = D.brand, sec = Section("brand");
  sec.appendChild(h("div", { class: "lockups" },
    rv(h("figure", { class: "lkf" }, Lockup("dark"), h("figcaption", { class: "mono" }, "Primary horizontal · on dark")), "up", 0),
    rv(h("figure", { class: "lkf" }, Lockup("light"), h("figcaption", { class: "mono" }, "Primary horizontal · on light")), "up", 1)));
  sec.appendChild(h("div", { class: "bsub mono" }, "Palette · select a swatch to copy its hex"));
  sec.appendChild(h("div", { class: "swatches" }, B.palette.map(function (c, i) {
    return rv(h("button", { class: "sw", type: "button", "aria-label": "Copy " + c.name + " " + c.hex, onclick: function () { copy(c.hex, c.name + " " + c.hex + " copied"); } },
      h("span", { class: "sw-c", style: { background: c.hex } }), h("strong", null, c.name), h("span", { class: "mono" }, c.hex), h("small", null, c.role)), "up", i % 3);
  })));
  sec.appendChild(h("div", { class: "bsub mono" }, "Typography"));
  sec.appendChild(h("div", { class: "tyg" }, B.type.map(function (t, i) {
    return rv(h("div", { class: "card tyc" }, h("div", { class: "aa", style: { "font-family": t.family } }, "Aa"), h("strong", null, t.name), h("span", { class: "mono" }, t.role), h("p", { class: "sample", style: { "font-family": t.family } }, t.sample)), "up", i);
  })));
  sec.appendChild(h("div", { class: "bsub mono" }, "Usage"));
  sec.appendChild(rv(h("ul", { class: "feat-list rules" }, B.rules.map(function (r) { return h("li", null, r); })), "up", 0));
  sec.appendChild(h("div", { class: "bsub mono" }, "Files"));
  sec.appendChild(h("div", { class: "dl" }, B.downloads.map(function (d, i) {
    return rv(h("div", { class: "card dlc" }, h("strong", null, d.label), h("div", { class: "row" }, d.files.map(function (f) {
      return h("a", { class: "btn sm", href: f.href, download: "", target: "_blank", rel: "noopener" }, f.type + " ↓");
    }))), "up", i % 3);
  })));
  return sec;
}

function BrandPage() {
  var B = D.brand, f = document.createDocumentFragment();
  f.appendChild(h("section", { class: "shell ap" },
    h("a", { class: "back", href: "#top" }, h("b", null, "←"), "Back to portfolio"),
    h("div", { class: "kicker" }, "Brand"),
    h("h1", { id: "page-title", tabindex: "-1" }, h("span", { class: "ln" }, h("span", { class: "lni", style: { "--i": 0 } }, "Engineer")), h("span", { class: "ln" }, h("span", { class: "lni grad", style: { "--i": 1 } }, "the Essential."))),
    h("p", { class: "lead" }, "My identity system: the MR orbital mark, the " + B.system + " palette and two typefaces. Generated from the brand data, so it stays in step with the site.")));
  f.appendChild(BrandSection());
  return f;
}

function AboutPage() {
  var f = document.createDocumentFragment(), av = D.availability;
  var edu = D.timeline.filter(function (e) { return e.kind === "education"; })[0];
  var top = h("section", { class: "shell ap" },
    h("a", { class: "back", href: "#top" }, h("b", null, "←"), "Back to portfolio"),
    h("div", { class: "ap-head" },
      h("div", null, h("div", { class: "kicker" }, "About"),
        h("h1", { id: "page-title", tabindex: "-1" }, h("span", { class: "ln" }, h("span", { class: "lni", style: { "--i": 0 } }, "A student,")), h("span", { class: "ln" }, h("span", { class: "lni grad", style: { "--i": 1 } }, "a builder."))),
        h("p", { class: "lead" }, D.story[0]),
        D.story.slice(1).map(function (p) { return h("p", { class: "ap-p" }, p); })),
      h("div", { class: "ap-side" },
        h("div", { class: "ap-photo" }, h("img", { src: P.portrait, alt: P.portraitAlt, width: "1113", height: "1484" })),
        h("dl", { class: "facts card" },
          h("div", null, h("dt", { class: "mono" }, "Based in"), h("dd", null, P.location, P.origin ? h("small", null, P.origin) : null)),
          edu ? h("div", null, h("dt", { class: "mono" }, "Studying"), h("dd", null, edu.title, h("small", null, edu.org + " · " + edu.summary.replace(/\.$/, "")))) : null,
          h("div", null, h("dt", { class: "mono" }, "Role"), h("dd", null, P.role.replace(/ · /g, ", ")))))));
  f.appendChild(top);

  var tl = Section("journey");
  tl.appendChild(SectionHead({ kicker: "Journey", lines: ["Education, projects", "and recognition."], intro: "A single timeline generated from the data file. Filter by type. Add an entry there and it shows up here and on the chart below." }));
  tl.appendChild(Timeline(D.timeline));
  f.appendChild(tl);

  var ax = MilestoneAxis(D.timeline);
  if (ax) {
    var s = Section("milestones");
    s.appendChild(SectionHead({ kicker: "Milestones", lines: ["When things", "happened."], intro: "The same entries, placed on a real time axis. Entries without a date, such as ongoing projects, are left off." }));
    s.appendChild(rv(ax, "up", 0)); f.appendChild(s);
  }

  var edus = D.timeline.filter(function (e) { return e.coursework; });
  var interests = D.skills.filter(function (s) { return s.group === "interest"; });
  var s2 = Section("focus");
  s2.appendChild(SectionHead({ kicker: "Focus", lines: ["What I study,", "what I'm after."], intro: "Pulled from the education entry, the interest list and my availability." }));
  s2.appendChild(h("div", { class: "ap-grid" },
    edus.length ? rv(h("div", { class: "card tgc" }, h("h3", null, "Coursework"), h("div", { class: "chips" }, edus[0].coursework.map(function (c) { return h("span", { class: "p" }, c); }))), "up", 0) : null,
    interests.length ? rv(h("div", { class: "card tgc" }, h("h3", null, "Areas of interest"), h("div", { class: "chips" }, interests.map(function (c) { return h("span", null, c.name); }))), "up", 1) : null,
    rv(h("div", { class: "card tgc avail" }, h("h3", null, av.status), h("p", null, av.mode + "."),
      h("div", { class: "chips" }, av.types.map(function (t) { return h("span", { class: "p" }, t); })),
      h("div", { class: "mono" }, "Where I can help"), h("ul", { class: "feat-list" }, av.help.map(function (x) { return h("li", null, x); }))), "up", 2)));
  f.appendChild(s2);

  var end = h("section", { class: "cta shell" }, rv(h("div", { class: "cta-panel" },
    h("div", { class: "cta-grid" },
      h("div", null, h("h2", null, "See the", h("br"), h("em", null, "work."))),
      h("div", { class: "cta-actions" },
        h("a", { class: "cl", href: "#work" }, "Back to projects", h("b", null, "↑")),
        h("a", { class: "cl ghost", href: "#contact" }, "Get in touch", h("b", null, "→"))))), "up", 0));
  f.appendChild(end);
  return f;
}

function HomePage() {
  return frag([Hero(), WorkSection(), LabSection(), GithubSection(), SkillsSection(), RecognitionSection(), AboutTeaser(), D.newsletter && D.newsletter.enabled ? NewsletterSection() : null, D.testimonials && D.testimonials.length ? VoicesSection() : null, ContactSection()]);
}

/* ----------------------------------------------------------------- ROUTER */
var PAGES = { home: { build: HomePage, title: "Mahid Rafiq | Pharmacy × Technology × Research" }, about: { build: AboutPage, title: "About | Mahid Rafiq" }, brand: { build: BrandPage, title: "Brand | Mahid Rafiq" } };
var ABOUT_SECS = ["journey", "milestones", "focus"];
var current = null, token = 0, spy = null;
function parse() {
  var hs = location.hash.replace(/^#/, ""); try { hs = decodeURIComponent(hs); } catch (e) {}
  if (hs === "about") return { page: "about" };
  if (hs === "brand") return { page: "brand" };
  if (ABOUT_SECS.indexOf(hs) > -1) return { page: "about", sec: hs };
  return { page: "home", sec: hs && hs !== "home" ? hs : null };
}
function topNow() { window.scrollTo({ top: 0, behavior: "instant" }); }
function goSec(id, instant) {
  if (!id || id === "top") { window.scrollTo({ top: 0, behavior: instant ? "instant" : "smooth" }); return; }
  var el = document.getElementById(id); if (!el) { return; }
  if (id.indexOf("project-") === 0) { var b = el.querySelector(".more"); if (b) toggle(el, b, true); }
  el.scrollIntoView({ behavior: instant ? "instant" : "smooth", block: "start" });
}
function markNav(page) {
  $$("#navlinks a, #mpanel a").forEach(function (a) { if (a.dataset.route) a.setAttribute("aria-current", String(page === a.dataset.route)); else if (page !== "home") a.setAttribute("aria-current", "false"); });
}
function setupSpy(view) {
  if (spy) { spy.disconnect(); spy = null; }
  if (!("IntersectionObserver" in window)) return;
  var links = $$("#navlinks a[data-target]");
  spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.setAttribute("aria-current", String(a.dataset.target === e.target.id)); }); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]", view).forEach(function (s) { spy.observe(s); });
}
function mount(page) {
  var view = $("view"); resetReveals(); view.innerHTML = ""; view.appendChild(PAGES[page].build());
  current = page; document.title = PAGES[page].title; markNav(page); if (page === "home") setupSpy(view); else if (spy) { spy.disconnect(); spy = null; }
  startClock(); startSwap();
  requestAnimationFrame(function () { view.classList.add("ready"); observeReveals(view); runCounters(view); $$(".hero,.ap", view).forEach(function (e) { e.classList.add("vis"); }); });
}
function afterMount(r, instant) {
  if (r.sec) goSec(r.sec, true); else topNow();
  var t = $("view").querySelector("h1"); if (t) { t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
  $("live").textContent = PAGES[r.page].title;
}
function navigate(first) {
  var r = parse(), my = ++token, view = $("view");
  if (r.page === current && !first) { goSec(r.sec, false); return; }
  if (first || reduce || !current) { mount(r.page); setTimeout(function () { afterMount(r); }, first ? 40 : 0); return; }
  view.classList.add("leaving");
  setTimeout(function () {
    if (my !== token) return;
    view.classList.remove("ready"); mount(r.page); view.classList.remove("leaving"); view.classList.add("entering");
    afterMount(r); setTimeout(function () { view.classList.remove("entering"); }, 520);
  }, 200);
}

/* -------------------------------------------------------------- SHELL UI */
var clockT = null;
function startClock() {
  var el = $("clock"); if (!el) return; if (clockT) clearInterval(clockT);
  function t() { try { el.textContent = "IST " + new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }); } catch (e) { el.textContent = "IST"; } }
  t(); clockT = setInterval(t, 15000);
}
var swapT = null;
function startSwap() {
  if (swapT) clearInterval(swapT); var w = $$("#swap span"), i = 0; if (reduce || w.length < 2) return;
  swapT = setInterval(function () { w[i].classList.remove("on"); i = (i + 1) % w.length; w[i].classList.add("on"); }, 2600);
}
function runCounters(root) {
  if (reduce || !("IntersectionObserver" in window)) return;
  var co = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; co.unobserve(e.target); var end = +e.target.dataset.count, t0 = performance.now();
      (function f(t) { var k = Math.min(1, (t - t0) / 900); e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
    });
  }, { threshold: 0.6 });
  $$("[data-count]", root).forEach(function (c) { co.observe(c); });
}

function buildChrome() {
  var navEl = $("navlinks"), mp = $("mpanel");
  D.nav.forEach(function (n, i) {
    var href = n.route ? "#" + n.route : "#" + n.target;
    var ds = n.route ? { route: n.route } : { target: n.target };
    navEl.appendChild(h("a", { href: href, dataset: ds }, n.label));
    mp.appendChild(h("a", { href: href, dataset: ds }, n.label, h("span", null, String(i + 1).padStart(2, "0"))));
  });
  add($("brand-link"), BrandLink());
  $("footer").appendChild(h("div", { class: "shell foot" },
    h("a", { class: "brand", href: "#top", "aria-label": "Home" }, BrandLink()),
    h("div", { class: "fc" }, "© " + new Date().getFullYear() + " " + P.name),
    h("div", { class: "foot-links fc" }, h("a", { href: "#about" }, "About"), h("a", { href: "#brand" }, "Brand"), h("a", { href: "#top" }, "Back to top ↑"))));
}

function initUI() {
  var mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent); $("kbd").textContent = mac ? "⌘ K" : "Ctrl K";
  /* theme */
  var r = document.documentElement, saved = store.get("mr-theme", null); if (saved) r.setAttribute("data-theme", saved);
  function sysLight() { return matchMedia("(prefers-color-scheme: light)").matches; }
  function sync() { var l = (r.getAttribute("data-theme") || (sysLight() ? "light" : "dark")) === "light", m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = l ? "#F5F7F2" : "#0B0F12"; }
  function toggleTheme() { var cur = r.getAttribute("data-theme") || (sysLight() ? "light" : "dark"), nx = cur === "dark" ? "light" : "dark"; r.setAttribute("data-theme", nx); store.set("mr-theme", nx); sync(); toast(nx === "dark" ? "Dark theme" : "Light theme"); }
  $("theme").onclick = toggleTheme; sync();
  /* progress */
  var bar = $("bar");
  function u() { var hh = document.documentElement.scrollHeight - innerHeight; bar.style.width = (hh > 0 ? scrollY / hh * 100 : 0) + "%"; }
  addEventListener("scroll", u, { passive: true }); u();
  /* pointer effects (delegated, work for any rendered content) */
  if (hoverOK && !reduce) {
    var sp = $("spot");
    addEventListener("pointermove", function (e) {
      sp.style.opacity = 1; sp.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      var c = e.target.closest && e.target.closest("[data-spot]");
      if (c) { var b = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - b.left) + "px"); c.style.setProperty("--my", (e.clientY - b.top) + "px"); }
      var v = e.target.closest && e.target.closest("#visual"), p = $("portrait");
      if (v && p) { var vb = v.getBoundingClientRect(); p.style.setProperty("--ry", (((e.clientX - vb.left) / vb.width - .5) * 9) + "deg"); p.style.setProperty("--rx", (-((e.clientY - vb.top) / vb.height - .5) * 7) + "deg"); }
      else if (p) { p.style.setProperty("--ry", "0deg"); p.style.setProperty("--rx", "0deg"); }
    }, { passive: true });
  }
  /* mobile menu */
  var mb = $("menubtn"), mp = $("mpanel");
  function setMenu(o) {
    mp.classList.toggle("open", o);
    mb.setAttribute("aria-expanded", String(o));
    mb.setAttribute("aria-label", o ? "Close navigation" : "Open navigation");
    document.body.style.overflow = o ? "hidden" : "";
  }
  /* Skip link: move focus to the page without touching the hash, so it never triggers a route change */
  $$(".skip").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var m = $("view"); m.setAttribute("tabindex", "-1"); m.focus(); }); });
  mb.onclick = function () { setMenu(!mp.classList.contains("open")); };
  mp.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  addEventListener("resize", function () { if (innerWidth > 1180) setMenu(false); });
  addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  /* palette (commands generated from the nav data) */
  var pal = $("pal"), inp = $("pal-in"), ul = $("pal-list"), sel = 0, items = [], last = null;
  function ext(u) { return function () { var a = document.createElement("a"); a.href = u; a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); }; }
  var CMD = D.nav.map(function (n) { return { t: (n.route ? "Open " : "Go to ") + n.label, k: n.route ? "Page" : "Section", f: function () { location.hash = n.route || n.target; } }; });
  CMD.push({ t: "Open the Lab: order management", k: "Demo", f: function () { location.hash = "lab"; setTimeout(function () { labApi && labApi.show("order"); }, 80); } });
  CMD.push({ t: "Open the Lab: POS billing", k: "Demo", f: function () { location.hash = "lab"; setTimeout(function () { labApi && labApi.show("pos"); }, 80); } });
  CMD.push({ t: "Open the brand kit", k: "Page", f: function () { location.hash = "brand"; } });
  CMD.push({ t: "Toggle light / dark theme", k: "Action", f: toggleTheme });
  CMD.push({ t: "Open LinkedIn", k: "Link", f: ext(P.links.linkedin) }, { t: "Open GitHub", k: "Link", f: ext(P.links.github) });
  CMD.push({ t: "Copy portfolio link", k: "Action", f: function () { copy(P.siteUrl, "Link copied"); } });
  function draw() {
    var q = inp.value.trim().toLowerCase(); items = CMD.filter(function (c) { return !q || c.t.toLowerCase().indexOf(q) > -1 || c.k.toLowerCase().indexOf(q) > -1; });
    if (sel >= items.length) sel = 0; ul.innerHTML = "";
    if (!items.length) { var li = h("li", { style: { cursor: "default" } }, "No matching command"); ul.appendChild(li); return; }
    items.forEach(function (c, i) {
      var li = h("li", { role: "option", "aria-selected": String(i === sel) }, c.t, h("span", null, c.k));
      li.onpointermove = function () { if (sel !== i) { sel = i; $$("li", ul).forEach(function (x, j) { x.setAttribute("aria-selected", String(j === i)); }); } };
      li.onclick = function () { run(i); }; ul.appendChild(li);
    });
  }
  function open() { last = document.activeElement; pal.hidden = false; $("palbtn").setAttribute("aria-expanded", "true"); inp.value = ""; sel = 0; draw(); inp.focus(); }
  function close() { pal.hidden = true; $("palbtn").setAttribute("aria-expanded", "false"); if (last && last.focus) last.focus(); }
  function run(i) { var c = items[i]; if (!c) return; close(); setTimeout(c.f, 40); }
  $("palbtn").onclick = open;
  pal.addEventListener("pointerdown", function (e) { if (e.target === pal) close(); });
  inp.oninput = function () { sel = 0; draw(); };
  addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? open() : close(); return; }
    if (pal.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, items.length); draw(); var s = ul.children[sel]; if (s && s.scrollIntoView) s.scrollIntoView({ block: "nearest" }); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + items.length) % Math.max(1, items.length); draw(); var s2 = ul.children[sel]; if (s2 && s2.scrollIntoView) s2.scrollIntoView({ block: "nearest" }); }
    else if (e.key === "Enter") { e.preventDefault(); run(sel); }
  });
}

/* ------------------------------------------------------------------- boot */
if (!reduce && "IntersectionObserver" in window) document.documentElement.classList.add("js");
try { history.scrollRestoration = "manual"; } catch (e) {}
buildChrome(); initUI();
addEventListener("hashchange", function () { navigate(false); });
navigate(true);
})();