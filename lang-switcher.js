/**
 * LANG SWITCHER
 * /lang-switcher.js
 *
 * Injects a fixed language toggle into every page.
 * Cycles through registered languages, stores choice to localStorage,
 * fires BhaveI18n.set() which dispatches 'bhave:languageChanged' so
 * each page's __i18nPatch() listener re-applies translated strings.
 *
 * Depends on /i18n/i18n.js being loaded first.
 */

(function (window) {
  'use strict';

  var LANGS  = ['en', 'es', 'pt', 'fr'];
  var LABELS = { en: 'EN', es: 'ES', pt: 'PT', fr: 'FR' };

  var CSS = [
    '#lang-switcher{',
      'position:fixed;bottom:1.25rem;right:1.25rem;',
      'z-index:9998;',
      'display:flex;gap:0.35rem;',
      'font-family:"Share Tech Mono",monospace;',
    '}',
    '#lang-switcher .ls-btn{',
      'background:transparent;',
      'border:1px solid rgba(184,149,42,0.2);',
      'color:rgba(184,149,42,0.4);',
      'font-family:inherit;font-size:0.55rem;',
      'letter-spacing:0.14em;',
      'padding:0.35rem 0.55rem;',
      'cursor:pointer;',
      'transition:color 0.2s,border-color 0.2s;',
    '}',
    '#lang-switcher .ls-btn:hover{',
      'color:#b8952a;border-color:rgba(184,149,42,0.55);',
    '}',
    '#lang-switcher .ls-btn.active{',
      'color:#b8952a;border-color:rgba(184,149,42,0.55);',
    '}',
  ].join('');

  function currentLang() {
    return document.documentElement.lang || 'en';
  }

  function build() {
    // Inject CSS once
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var switcher = document.createElement('div');
    switcher.id = 'lang-switcher';

    function refresh() {
      var cur = currentLang();
      switcher.querySelectorAll('.ls-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.lang === cur);
      });
    }

    LANGS.forEach(function (lang) {
      var btn = document.createElement('button');
      btn.className  = 'ls-btn';
      btn.dataset.lang = lang;
      btn.textContent  = LABELS[lang];
      btn.addEventListener('click', function () {
        if (window.BhaveI18n) window.BhaveI18n.set(lang);
        refresh();
      });
      switcher.appendChild(btn);
    });

    document.body.appendChild(switcher);
    refresh();

    // Keep active state in sync when language changes via other means
    document.addEventListener('bhave:languageChanged', refresh);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

}(window));
