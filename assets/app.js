/* ==========================================================================
   Renders the page from content.js, members.js and config.js.
   You should not need to edit this file to change copy, people or the form.
   No personal data is read, stored or sent from this page.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  var CFG = window.SITE_CONFIG || {};
  var MEMBERS = window.SITE_MEMBERS || [];

  if (!C) {
    if (window.console) console.error("content.js did not load, so the page cannot be built.");
    return;
  }

  /* ---------- tiny DOM helper (text is always inserted as text) ---------- */

  function append(el, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(el, c); }); return; }
    el.appendChild(typeof child === "object" ? child : document.createTextNode(String(child)));
  }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var val = attrs[key];
        if (val === null || val === undefined || val === false) return;
        if (key === "class") el.className = val;
        else el.setAttribute(key, val === true ? "" : val);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }

  function arrow(glyph) { return h("span", { class: "arrow", "aria-hidden": "true" }, glyph || "→"); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function $(sel) { return document.querySelector(sel); }
  function mount(sel, nodes) { var el = $(sel); if (el) append(el, nodes); }

  /* ---------- Airtable form resolution ---------- */

  /* Accepts a shared link, an embed URL, or pasted <iframe> code.
     Returns { embedUrl, linkUrl } or null when nothing usable is set. */
  function resolveForm(raw) {
    if (!raw || typeof raw !== "string") return null;
    var value = raw.trim();
    if (!value) return null;

    var iframe = value.match(/<iframe[^>]*\ssrc\s*=\s*["']([^"']+)["']/i);
    if (iframe) value = iframe[1];

    var url;
    try { url = new URL(value); } catch (e) { url = null; }
    if (!url || url.protocol !== "https:") {
      if (window.console) console.warn("config.js: airtableForm must be an https:// link or iframe code. Showing the placeholder instead.");
      return null;
    }

    var embed = new URL(url.href);
    var link = new URL(url.href);
    if (/(^|\.)airtable\.com$/i.test(url.hostname)) {
      if (/^\/embed\//i.test(url.pathname)) {
        link.pathname = url.pathname.replace(/^\/embed/i, "");
      } else {
        embed.pathname = "/embed" + url.pathname;
      }
    }
    return { embedUrl: embed.href, linkUrl: link.href };
  }

  /* ---------- Header ---------- */

  function wordmark() {
    var w = C.wordmark;
    var label = w.line1 + " " + w.line2;
    if (w.logoSrc) {
      return h("a", { class: "wordmark", href: "#top", "aria-label": label + ", back to top" },
        h("img", { class: "wordmark__img", src: w.logoSrc, alt: label }));
    }
    return h("a", { class: "wordmark", href: "#top", "aria-label": label + ", back to top" },
      h("span", { class: "wordmark__text" },
        h("span", { class: "wordmark__l1" }, w.line1),
        h("span", { class: "wordmark__l2" }, w.line2)));
  }

  function renderHeader() {
    var toggle = h("button", {
      class: "nav-toggle", type: "button", "aria-expanded": "false", "aria-controls": "primary-nav"
    },
      h("span", { class: "nav-toggle__icon", "aria-hidden": "true" }, h("i"), h("i"), h("i")),
      h("span", null, "Menu"));

    var items = C.nav.map(function (n) {
      return h("li", null, h("a", { class: "nav__link", href: n.href }, n.label));
    });
    items.push(h("li", { class: "nav__cta" },
      h("a", { class: "btn btn--accent", href: C.navCta.href }, C.navCta.label)));

    var nav = h("nav", { class: "nav", id: "primary-nav", "aria-label": "Primary" },
      h("ul", { class: "nav__list" }, items));

    mount(".site-header", h("div", { class: "wrap header__bar" }, wordmark(), toggle, nav));

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) setOpen(false);
    });
  }

  /* ---------- Hero ---------- */

  function seeded(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function timeline(hero) {
    var COUNT = 96;
    var rand = seeded(11);
    var cueIdx = {};
    hero.cues.forEach(function (c) { cueIdx[Math.round((c.at / 100) * (COUNT - 1))] = true; });

    var bars = [];
    for (var i = 0; i < COUNT; i++) {
      var v = 0.5 + 0.28 * Math.sin(i * 0.33) + 0.14 * Math.sin(i * 0.11 + 1.4) + (rand() - 0.5) * 0.34;
      var height = cueIdx[i] ? 0.98 : Math.max(0.1, Math.min(0.9, v));
      bars.push(h("span", { class: "bar" + (cueIdx[i] ? " bar--cue" : ""), style: "--h:" + Math.round(height * 100) + "%" }));
    }

    var ruler = ["00:00:00", "00:00:15", "00:00:30", "00:00:45", "00:01:00"].map(function (t) {
      return h("span", null, t);
    });

    var cues = hero.cues.map(function (c, idx) {
      return h("div", { class: "cue", style: "left:" + c.at + "%" },
        h("b", null, "Cue " + pad2(idx + 1)), c.label);
    });

    return h("div", { class: "wrap" },
      h("div", { class: "timeline", "aria-hidden": "true" },
        h("div", { class: "timeline__ruler" }, ruler),
        h("div", { class: "timeline__stage" },
          h("div", { class: "timeline__wave" }, bars),
          h("div", { class: "timeline__play" })),
        h("div", { class: "timeline__cues" }, cues)));
  }

  function renderHero() {
    var hero = C.hero;
    mount("#hero", [
      h("div", { class: "wrap" },
        h("p", { class: "hero__meta" }, hero.meta.map(function (m) { return h("span", null, m); })),
        h("h1", { class: "hero__title", id: "hero-title" }, hero.headline),
        h("div", { class: "hero__lower" },
          h("div", { class: "hero__text" },
            hero.paragraphs.map(function (p) { return h("p", null, p); })),
          h("div", { class: "hero__side" },
            h("div", { class: "hero__status" },
              h("p", null, hero.status)),
            h("div", { class: "hero__actions" },
              h("a", { class: "btn btn--primary", href: hero.primaryCta.href }, hero.primaryCta.label, arrow()),
              h("a", { class: "btn btn--ghost", href: hero.secondaryCta.href }, hero.secondaryCta.label, arrow("↓")))))),
      timeline(hero)
    ]);
  }

  /* ---------- What is music supervision ---------- */

  function renderWhat() {
    var w = C.what;
    var rows = w.items.map(function (item, i) {
      return h("li", { class: "cue-row reveal" },
        h("span", { class: "cue-row__num" }, pad2(i + 1)),
        h("h4", { class: "cue-row__title" }, item.title),
        h("p", { class: "cue-row__text" }, item.text));
    });

    mount("#what-is-music-supervision", h("div", { class: "wrap" },
      h("div", { class: "what__top" },
        h("div", { class: "what__head reveal" },
          h("p", { class: "eyebrow" }, w.eyebrow),
          h("h2", { class: "h2", id: "what-title" }, w.title)),
        h("div", { class: "what__intro reveal" },
          h("p", { class: "lead" }, w.intro))),
      h("ul", { class: "triad reveal" }, w.triad.map(function (t) {
        return h("li", { class: "triad__item" },
          h("p", { class: "triad__label" }, t.label),
          h("p", { class: "triad__text" }, t.text));
      })),
      h("div", { class: "cuesheet" },
        h("h3", { class: "cuesheet__title reveal" }, w.listTitle),
        h("ol", { class: "cuesheet__list" }, rows)),
      h("p", { class: "what__note reveal" }, w.note)));
  }

  /* ---------- Focus areas ---------- */

  function renderFocus() {
    var f = C.focus;
    var cells = f.items.map(function (item) {
      /* Keywords are optional. Empty or missing lists show nothing at all. */
      var keys = (item.keywords || []).filter(function (k) { return k && String(k).trim(); });
      return h("li", { class: "focus-cell reveal" },
        h("h3", { class: "focus-cell__title" }, item.title),
        h("p", { class: "focus-cell__text" }, item.text),
        keys.length ? h("ul", { class: "focus-cell__keys" }, keys.map(function (k) { return h("li", null, k); })) : null);
    });

    mount("#focus-areas", h("div", { class: "wrap" },
      h("div", { class: "section__head reveal" },
        h("p", { class: "eyebrow" }, f.eyebrow),
        h("h2", { class: "h2", id: "focus-title" }, f.title),
        h("p", { class: "focus__intro" }, f.intro)),
      h("ul", { class: "focus__grid" }, cells)));
  }

  /* ---------- Members ---------- */

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join("");
  }

  function profileLink(href, label, name) {
    if (!href) return null;
    return h("a", {
      href: href, target: "_blank", rel: "noopener noreferrer",
      "aria-label": name + " on " + label + " (opens in a new tab)"
    }, label + " ↗");
  }

  function personCard(p) {
    var photo = p.photo
      ? h("img", { src: p.photo, alt: "Portrait of " + p.name, loading: "lazy", width: "480", height: "600" })
      : h("span", { class: "person__initials", "aria-hidden": "true" }, initials(p.name));
    var links = [
      profileLink(p.imdb, "IMDb", p.name),
      profileLink(p.linkedin, "LinkedIn", p.name),
      profileLink(p.website, "Website", p.name)
    ].filter(Boolean);

    return h("li", { class: "person reveal" },
      h("div", { class: "person__photo" }, photo),
      h("h3", { class: "person__name" }, p.name),
      p.designation ? h("p", { class: "person__role" }, p.designation) : null,
      links.length ? h("p", { class: "person__links" }, links) : null);
  }

  function placeholderCard(n) {
    return h("li", { class: "person person--placeholder reveal" },
      h("div", { class: "person__photo", "aria-hidden": "true" }, h("span", { class: "person__initials" }, "Photo")),
      h("p", { class: "person__flag" }, "Placeholder " + pad2(n)),
      h("h3", { class: "person__name" }, "Name"),
      h("p", { class: "person__role" }, "Professional designation"));
  }

  function renderMembers() {
    var m = C.members;
    var real = MEMBERS.filter(function (p) { return p && p.name; });
    var cards = real.length
      ? real.map(personCard)
      : Array.apply(null, Array(m.placeholderCount)).map(function (_, i) { return placeholderCard(i + 1); });

    mount("#members", h("div", { class: "wrap" },
      h("div", { class: "members__head reveal" },
        h("p", { class: "eyebrow" }, m.eyebrow),
        h("div", null,
          h("h2", { class: "h2", id: "members-title" }, m.title),
          h("p", { class: "members__sub" }, m.subtitle)),
        m.intro ? h("p", { class: "members__intro" }, m.intro) : null),
      h("ul", { class: "members__grid" }, cards),
      real.length ? null : h("p", { class: "members__note" }, m.placeholderNote)));
  }

  /* ---------- Get involved + form ---------- */

  function renderForm() {
    var f = C.form;
    var form = resolveForm(CFG.airtableForm);
    var mode = CFG.airtableMode === "link" ? "link" : "embed";
    var body;
    var alt = null;

    if (form && mode === "embed") {
      body = h("iframe", {
        class: "form-embed",
        src: form.embedUrl,
        title: f.embedTitle,
        loading: "lazy",
        height: String(CFG.airtableEmbedHeight || 960),
        style: "height:" + (parseInt(CFG.airtableEmbedHeight, 10) || 960) + "px"
      });
      alt = h("p", { class: "form-panel__alt" }, f.embedFallback + " ",
        h("a", { href: form.linkUrl, target: "_blank", rel: "noopener noreferrer" }, f.linkLabel));
    } else if (form && mode === "link") {
      body = h("p", null,
        h("a", { class: "btn btn--primary", href: form.linkUrl, target: "_blank", rel: "noopener noreferrer" },
          f.title, arrow("↗")));
    } else {
      var email = CFG.contactEmail;
      body = h("div", { class: "pending" },
        h("div", null,
          h("span", { class: "pending__badge" }, f.pendingBadge),
          h("p", { class: "pending__text" }, f.pendingText),
          email ? h("p", { class: "pending__mail" }, "In the meantime: ", h("a", { href: "mailto:" + email }, email)) : null),
        h("div", null,
          h("p", { class: "spec__title" }, f.specTitle),
          h("ul", { class: "spec" }, f.fields.map(function (field) {
            return h("li", null,
              h("span", { class: "spec__label" }, field.label),
              h("span", { class: "spec__meta" }, field.meta),
              field.options
                ? h("ul", { class: "spec__opts" }, field.options.map(function (o) { return h("li", null, o); }))
                : null);
          }))));
    }

    var embedded = form && mode === "embed";
    var attrs = { class: "form-panel reveal" + (embedded ? " form-panel--embed" : ""), id: "express-interest", tabindex: "-1" };
    if (embedded) attrs["aria-label"] = f.title; else attrs["aria-labelledby"] = "form-title";
    return h("div", attrs,
      embedded ? null : h("div", { class: "form-panel__head" },
        h("h3", { class: "form-panel__title", id: "form-title" }, f.title),
        alt),
      body,
      embedded ? alt : null);
  }

  function renderInvolve() {
    var g = C.involve;
    mount("#get-involved", h("div", { class: "wrap" },
      h("div", { class: "involve__head reveal" },
        h("p", { class: "eyebrow" }, g.eyebrow),
        h("h2", { class: "h2", id: "involve-title" }, g.title),
        h("p", { class: "involve__intro" }, g.intro)),
      renderForm()));
  }

  /* ---------- Footer ---------- */

  function renderFooter() {
    var f = C.footer;
    var socials = [];
    if (CFG.linkedin) socials.push(h("a", { href: CFG.linkedin, target: "_blank", rel: "noopener noreferrer" }, "LinkedIn ↗"));
    if (CFG.instagram) socials.push(h("a", { href: CFG.instagram, target: "_blank", rel: "noopener noreferrer" }, "Instagram ↗"));

    mount(".site-footer", h("div", { class: "wrap" },
      h("div", { class: "footer__inner" },
        h("div", null,
          h("p", { class: "footer__name" }, C.wordmark.line1 + " " + C.wordmark.line2),
          h("p", { class: "footer__desc" }, f.description)),
        h("div", { class: "footer__col" },
          h("p", { class: "footer__label" }, f.emailLabel),
          CFG.contactEmail
            ? h("a", { href: "mailto:" + CFG.contactEmail }, CFG.contactEmail)
            : h("span", { class: "footer__placeholder" }, f.emailPlaceholder),
          socials),
        h("div", { class: "footer__col" },
          h("a", { class: "btn btn--accent footer__cta", href: "#express-interest", style: "border-bottom:1.5px solid var(--accent)" }, f.cta, arrow()))),
      h("p", { class: "footer__legal" }, "© " + new Date().getFullYear() + " " + f.copyright)));
  }

  /* ---------- Behaviour: active nav link + reveal on scroll ---------- */

  function enhance() {
    var reveals = [].slice.call(document.querySelectorAll(".reveal"));
    var links = [].slice.call(document.querySelectorAll(".nav__link"));
    var sections = links
      .map(function (a) { return $(a.getAttribute("href")); })
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { revealIO.observe(el); });

    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- Go ---------- */

  renderHeader();
  renderHero();
  renderWhat();
  renderFocus();
  renderMembers();
  renderInvolve();
  renderFooter();
  enhance();
})();
