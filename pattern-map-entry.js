/**
 * PATTERN MAP ENTRY
 * /pattern-map-entry.js
 *
 * Reads the stored Operating Architecture from localStorage and exposes:
 *   PatternMapEntry.inject(selector)   — renders the full map into a DOM element
 *   PatternMapEntry.getEmailBlock()    — returns an HTML string for email preview
 *
 * If PatternMapEngine was absent when birth data was collected (architecture === null),
 * numerology is computed here from the stored birthData as a fallback.
 * Astrology is skipped if not present in the stored architecture.
 *
 * DEPENDENCIES: /i18n/i18n.js + strings files (loaded before this file)
 *
 * STORAGE KEY: 'bhave_operating_architecture'
 * Shape: { birthData, architecture, calculatedAt }
 *   architecture: {
 *     numerology: { lifePath, expression, soulUrge, personality, birthDay,
 *                   personalYear, personalYearYear },
 *     astrology:  { sun, moon, moonCusp, rising }
 *   }
 */

(function (window) {
  'use strict';

  var STORAGE_KEY = 'bhave_operating_architecture';
  var MASTERS     = [11, 22, 33];
  var VOWELS_RE   = /^[aeiou]$/;

  // ── i18n helper ──────────────────────────────────────────────────────────────

  function t(key) {
    if (window.BhaveI18n && typeof window.BhaveI18n.t === 'function') {
      return window.BhaveI18n.t(key);
    }
    return key.split('.').pop();
  }

  // ── localStorage ─────────────────────────────────────────────────────────────

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  // ── Numerology fallback calculator ───────────────────────────────────────────

  var PYTH = {
    a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
    j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
    s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
  };

  function digitSum(n) {
    var s = 0, x = Math.abs(Math.floor(n));
    while (x > 0) { s += x % 10; x = Math.floor(x / 10); }
    return s;
  }

  function reduce(n, master) {
    if (master && MASTERS.indexOf(n) !== -1) return n;
    if (n < 10) return n;
    return reduce(digitSum(n), master);
  }

  function letterVal(str, filter) {
    return str.toLowerCase().replace(/[^a-z]/g, '').split('')
      .filter(filter || function () { return true; })
      .reduce(function (acc, c) { return acc + (PYTH[c] || 0); }, 0);
  }

  function calcNumerology(bd) {
    var date  = ((bd && bd.birthDate) || '1970-01-01').split('-');
    var y     = parseInt(date[0], 10) || 1970;
    var m     = parseInt(date[1], 10) || 1;
    var d     = parseInt(date[2], 10) || 1;
    var name  = ((bd && bd.name) || '').replace(/\s+/g, ' ').trim();
    var curYr = new Date().getFullYear();
    var mR    = reduce(m, true);
    var dR    = reduce(d, true);
    var yR    = reduce(digitSum(y), true);
    var pyYR  = reduce(digitSum(curYr), true);
    return {
      lifePath:         reduce(mR + dR + yR,     true),
      expression:       reduce(letterVal(name),   true),
      soulUrge:         reduce(letterVal(name, function (c) { return  VOWELS_RE.test(c); }), true),
      personality:      reduce(letterVal(name, function (c) { return !VOWELS_RE.test(c); }), true),
      birthDay:         reduce(d, true),
      personalYear:     reduce(mR + dR + pyYR,   true),
      personalYearYear: curYr,
    };
  }

  // ── Resolve stored data ───────────────────────────────────────────────────────

  function resolve(stored) {
    var arch = stored.architecture || {};
    return {
      num:  arch.numerology || calcNumerology(stored.birthData || {}),
      astr: arch.astrology  || null,
    };
  }

  // ── Description helpers ───────────────────────────────────────────────────────

  function numDesc(type, n) { return t('numerology.' + type + '.' + n); }
  function astrDesc(sign)   { return t('astrology.signs.' + sign); }

  // ── CSS (inject once) ─────────────────────────────────────────────────────────

  var CSS_ID = 'pme-css';

  function injectCSS() {
    if (document.getElementById(CSS_ID)) return;
    var s = document.createElement('style');
    s.id = CSS_ID;
    s.textContent = [
      '.pme{max-width:780px;padding:0 48px 80px;margin:0 auto;}',
      '.pme-tag{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#c9a96e;opacity:.7;margin-bottom:18px;}',
      '.pme-title{font-family:"Cormorant Garamond",serif;font-size:clamp(26px,3.8vw,38px);font-weight:300;color:#f5f3ef;margin-bottom:40px;letter-spacing:-.01em;}',
      '.pme-sec{font-family:"Space Mono",monospace;font-size:8.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(201,169,110,.48);margin-bottom:14px;}',
      '.pme-row{display:grid;grid-template-columns:148px 52px 1fr;gap:10px 20px;align-items:start;padding:12px 0;border-bottom:1px solid rgba(201,169,110,.07);}',
      '.pme-row:last-child{border-bottom:none;}',
      '.pme-key{font-family:"Space Mono",monospace;font-size:9px;letter-spacing:.1em;color:#555;padding-top:4px;}',
      '.pme-num{font-family:"Cormorant Garamond",serif;font-size:22px;font-weight:300;color:#c9a96e;line-height:1;}',
      '.pme-sign{font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:300;color:#c9a96e;line-height:1.25;}',
      '.pme-sign.pme-missing{color:rgba(245,243,239,.18);}',
      '.pme-badge{font-family:"Space Mono",monospace;font-size:6px;letter-spacing:.14em;background:#c9a96e;color:#080808;padding:2px 4px;vertical-align:middle;margin-left:5px;position:relative;top:-2px;}',
      '.pme-cycle{font-family:"Space Mono",monospace;font-size:7px;letter-spacing:.14em;color:rgba(201,169,110,.42);display:block;margin-top:3px;}',
      '.pme-desc{font-family:"Cormorant Garamond",serif;font-size:clamp(13px,1.7vw,15px);font-style:italic;color:rgba(245,243,239,.38);line-height:1.6;}',
      '.pme-miss-desc{font-family:"Cormorant Garamond",serif;font-size:13px;font-style:italic;color:rgba(245,243,239,.18);line-height:1.5;}',
      '.pme-cusp{font-family:"Space Mono",monospace;font-size:7px;letter-spacing:.1em;color:rgba(201,169,110,.38);display:block;margin-top:3px;}',
      '.pme-divider{width:40px;height:1px;background:rgba(201,169,110,.18);margin:32px 0;}',
      '.pme-footer{font-family:"Cormorant Garamond",serif;font-size:clamp(13px,1.7vw,15px);font-style:italic;color:rgba(245,243,239,.22);line-height:1.9;margin-top:32px;}',
      '.pme-restart{font-family:"Space Mono",monospace;font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(201,169,110,.28);background:none;border:none;cursor:pointer;padding:0;margin-top:18px;display:block;transition:color .2s;}',
      '.pme-restart:hover{color:#c9a96e;}',
      '@media(max-width:600px){.pme{padding:0 20px 60px;}.pme-row{grid-template-columns:110px 44px 1fr;gap:8px 12px;}}',
    ].join('');
    document.head.appendChild(s);
  }

  // ── Row builders ──────────────────────────────────────────────────────────────

  function numRow(key, n, descType, cycle) {
    var isMaster = MASTERS.indexOf(n) !== -1;
    var badge = isMaster ? '<span class="pme-badge">' + t('patternMap.masterBadge') + '</span>' : '';
    var cyc   = cycle    ? '<span class="pme-cycle">' + cycle + '</span>'               : '';
    var desc  = (n && descType) ? '<span class="pme-desc">' + numDesc(descType, n) + '</span>' : '';
    return '<div class="pme-row">'
      + '<span class="pme-key">' + key              + '</span>'
      + '<span class="pme-num">' + (n || '—') + badge + cyc + '</span>'
      + '<span>'                 + desc             + '</span>'
      + '</div>';
  }

  function astrRow(key, sign, cusp) {
    if (!sign) {
      return '<div class="pme-row">'
        + '<span class="pme-key">'                              + key                          + '</span>'
        + '<span class="pme-sign pme-missing">—</span>'
        + '<span class="pme-miss-desc">'                        + t('patternMap.risingMissing') + '</span>'
        + '</div>';
    }
    var cuspFlag = cusp ? t('patternMap.cuspFlag') : '';
    var cuspNote = cusp ? '<span class="pme-cusp">' + t('patternMap.moonCuspNote') + '</span>' : '';
    return '<div class="pme-row">'
      + '<span class="pme-key">'  + key                                                      + '</span>'
      + '<span class="pme-sign">' + cuspFlag + sign                                          + '</span>'
      + '<span><span class="pme-desc">' + astrDesc(sign) + '</span>' + cuspNote + '</span>'
      + '</div>';
  }

  // ── Block HTML ────────────────────────────────────────────────────────────────

  function blockHTML(resolved) {
    var num  = resolved.num;
    var astr = resolved.astr;
    var cycleStr = t('patternMap.personalYearCycle').replace('{{year}}', num.personalYearYear || new Date().getFullYear());
    var html = '';

    html += '<div class="pme-tag">'  + t('patternMap.tag')   + '</div>';
    html += '<h2 class="pme-title">' + t('patternMap.title') + '</h2>';

    html += '<p class="pme-sec">' + t('patternMap.sectionNumerology') + '</p>';
    html += numRow(t('patternMap.keys.lifePath'),    num.lifePath,    'lifePath',    null);
    html += numRow(t('patternMap.keys.expression'),  num.expression,  'expression',  null);
    html += numRow(t('patternMap.keys.soulUrge'),    num.soulUrge,    'soulUrge',    null);
    html += numRow(t('patternMap.keys.personality'), num.personality, 'personality', null);
    html += numRow(t('patternMap.keys.birthDay'),    num.birthDay,    null,          null);
    html += numRow(t('patternMap.keys.personalYear'), num.personalYear, 'lifePath', cycleStr);

    if (astr) {
      html += '<div class="pme-divider"></div>';
      html += '<p class="pme-sec">' + t('patternMap.sectionAstrology') + '</p>';
      html += astrRow(t('patternMap.keys.sun'),    astr.sun,    false);
      html += astrRow(t('patternMap.keys.moon'),   astr.moon,   astr.moonCusp);
      html += astrRow(t('patternMap.keys.rising'), astr.rising, false);
    }

    html += '<div class="pme-divider"></div>';
    html += '<p class="pme-footer">' + t('patternMap.footer').replace(/\n/g, '<br>') + '</p>';
    html += '<button class="pme-restart" data-pme-restart>' + t('patternMap.restart') + '</button>';

    return html;
  }

  // ── inject ────────────────────────────────────────────────────────────────────

  function inject(selector) {
    function run() {
      var stored = load();
      if (!stored) return;
      var el = document.querySelector(selector);
      if (!el) return;

      injectCSS();
      var resolved = resolve(stored);

      function render() {
        var wrap = el.querySelector('.pme');
        if (!wrap) {
          wrap = document.createElement('div');
          wrap.className = 'pme';
          el.appendChild(wrap);
        }
        wrap.innerHTML = blockHTML(resolved);
        var btn = wrap.querySelector('[data-pme-restart]');
        if (btn) {
          btn.addEventListener('click', function () {
            if (!window.confirm('Clear your stored data and recalculate?')) return;
            localStorage.removeItem(STORAGE_KEY);
            el.innerHTML = '';
          });
        }
      }

      render();
      document.addEventListener('bhave:languageChanged', render);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }

  // ── getEmailBlock ─────────────────────────────────────────────────────────────

  function getEmailBlock() {
    var stored = load();
    if (!stored) return '';

    var resolved = resolve(stored);
    var num  = resolved.num;
    var astr = resolved.astr;

    var RS  = 'display:grid;grid-template-columns:130px 50px 1fr;gap:8px 16px;padding:10px 0;border-bottom:1px solid rgba(201,169,110,.07);align-items:start;';
    var KS  = 'font-family:"Space Mono",monospace;font-size:9px;letter-spacing:.1em;color:#555;padding-top:3px;';
    var NS  = 'font-family:"Cormorant Garamond",serif;font-size:20px;font-weight:300;color:#c9a96e;line-height:1;';
    var SS  = 'font-family:"Cormorant Garamond",serif;font-size:17px;font-weight:300;color:#c9a96e;line-height:1.25;';
    var DS  = 'font-family:"Cormorant Garamond",serif;font-size:13px;font-style:italic;color:rgba(245,243,239,.36);line-height:1.55;';
    var BS  = 'font-family:"Space Mono",monospace;font-size:6px;letter-spacing:.12em;background:#c9a96e;color:#080808;padding:1px 4px;margin-left:4px;vertical-align:middle;';
    var CS  = 'font-family:"Space Mono",monospace;font-size:7px;letter-spacing:.12em;color:rgba(201,169,110,.4);display:block;margin-top:2px;';

    function eNumRow(key, n, descType, cycle) {
      var badge = (MASTERS.indexOf(n) !== -1) ? '<span style="' + BS + '">' + t('email.masterLabel') + '</span>' : '';
      var cyc   = cycle ? '<div style="' + CS + '">' + cycle + '</div>' : '';
      var desc  = (n && descType) ? numDesc(descType, n) : '';
      return '<div style="' + RS + '">'
        + '<span style="' + KS + '">' + key + '</span>'
        + '<span style="' + NS + '">' + (n || '—') + badge + cyc + '</span>'
        + '<span style="' + DS + '">' + desc + '</span>'
        + '</div>';
    }

    function eAstrRow(key, sign, cusp) {
      if (!sign) {
        return '<div style="' + RS + '">'
          + '<span style="' + KS + '">' + key + '</span>'
          + '<span style="' + SS + 'color:rgba(245,243,239,.18);">—</span>'
          + '<span style="' + DS + 'color:rgba(245,243,239,.18);">' + t('email.risingMissing') + '</span>'
          + '</div>';
      }
      var cuspW = cusp ? '<div style="font-family:&quot;Space Mono&quot;,monospace;font-size:7px;letter-spacing:.1em;color:rgba(201,169,110,.35);margin-top:2px;">' + t('email.cuspWarning') + '</div>' : '';
      return '<div style="' + RS + '">'
        + '<span style="' + KS + '">'  + key + '</span>'
        + '<span style="' + SS + '">'  + sign + cuspW + '</span>'
        + '<span style="' + DS + '">'  + astrDesc(sign) + '</span>'
        + '</div>';
    }

    var cycStr = t('email.cycleLabel').replace('{{year}}', num.personalYearYear || new Date().getFullYear());
    var HECS   = 'font-family:"Space Mono",monospace;font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:rgba(201,169,110,.45);margin-bottom:12px;';

    var html = '<div style="background:#0d0d0d;border:1px solid rgba(201,169,110,.12);padding:40px 44px;">';
    html += '<div style="font-family:&quot;Space Mono&quot;,monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#c9a96e;opacity:.7;margin-bottom:30px;">' + t('email.header') + '</div>';

    html += '<div style="' + HECS + '">' + t('email.sectionNumerology') + '</div>';
    html += eNumRow(t('patternMap.keys.lifePath'),     num.lifePath,    'lifePath');
    html += eNumRow(t('patternMap.keys.expression'),   num.expression,  'expression');
    html += eNumRow(t('patternMap.keys.soulUrge'),     num.soulUrge,    'soulUrge');
    html += eNumRow(t('patternMap.keys.personality'),  num.personality, 'personality');
    html += eNumRow(t('patternMap.keys.birthDay'),     num.birthDay,    null);
    html += eNumRow(t('patternMap.keys.personalYear'), num.personalYear, 'lifePath', cycStr);

    if (astr) {
      html += '<div style="height:24px;"></div>';
      html += '<div style="' + HECS + '">' + t('email.sectionAstrology') + '</div>';
      html += eAstrRow(t('patternMap.keys.sun'),    astr.sun,    false);
      html += eAstrRow(t('patternMap.keys.moon'),   astr.moon,   astr.moonCusp);
      html += eAstrRow(t('patternMap.keys.rising'), astr.rising, false);
    }

    html += '<div style="height:1px;background:rgba(201,169,110,.1);margin:26px 0;"></div>';
    html += '<div style="font-family:&quot;Cormorant Garamond&quot;,serif;font-size:13px;font-style:italic;color:rgba(245,243,239,.22);line-height:1.9;">' + t('email.footer').replace(/\n/g, '<br>') + '</div>';
    html += '</div>';

    return html;
  }

  // ── Export ────────────────────────────────────────────────────────────────────

  window.PatternMapEntry = {
    inject:        inject,
    getEmailBlock: getEmailBlock,
  };

}(window));
