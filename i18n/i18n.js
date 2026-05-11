/**
 * BHAVÉ I18N — CORE LOADER
 * /i18n/i18n.js
 *
 * LOAD ORDER IN HTML:
 *   <script src="/i18n/i18n.js"></script>
 *   <script src="/i18n/strings.en.js"></script>
 *   <script src="/i18n/strings.es.js"></script>
 *   <script src="/i18n/strings.pt.js"></script>
 *   <script src="/i18n/strings.fr.js"></script>
 *   <script src="/timezone-resolver.js"></script>
 *
 * USAGE:
 *   BhaveI18n.t('form.birthName.label')       → string in active language
 *   BhaveI18n.t('numerology.lifePath.1')      → numerology description
 *   BhaveI18n.set('es')                        → switch to Spanish
 *   BhaveI18n.current()                        → 'en'
 *   BhaveI18n.available()                      → ['en','es','pt','fr']
 *
 * FALLBACK CHAIN: requested language → English → key itself
 * Nothing breaks if a language file is missing or a key doesn't exist yet.
 *
 * DOES NOT TOUCH: pattern-map-engine.js, existing HTML, existing CSS.
 * IS NOT TOUCHED BY: adding new language files.
 */

(function(window) {
  'use strict';

  var STORAGE_KEY = 'bhave_language';
  var DEFAULT_LANG = 'en';

  // Registry — language files self-register here when loaded
  var registry = {};

  // Active language
  var active = DEFAULT_LANG;

  /**
   * Called by each strings.XX.js file to register itself.
   * Pattern: BhaveI18n.register('es', { … })
   */
  function register(langCode, strings) {
    registry[langCode] = strings;
  }

  /**
   * Detect language preference:
   * 1. localStorage (user has previously set)
   * 2. Browser navigator.language (e.g. 'es-MX' → 'es')
   * 3. Default: 'en'
   */
  function detect() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.length === 2) return stored;
    var browser = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
    return browser;
  }

  /**
   * Set active language. Persists to localStorage.
   * Falls back to 'en' if requested language not registered.
   * Dispatches 'bhave:languageChanged' event.
   */
  function set(langCode) {
    var code = langCode.slice(0, 2).toLowerCase();
    active = registry[code] ? code : DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, active);
    document.dispatchEvent(new CustomEvent('bhave:languageChanged', {
      detail: { language: active }
    }));
    // Update html[lang] attribute
    document.documentElement.setAttribute('lang', active);
    return active;
  }

  /**
   * Resolve a dot-notation key against a strings object.
   * 'form.birthName.label' → strings.form.birthName.label
   */
  function resolve(obj, key) {
    return key.split('.').reduce(function(o, k) {
      return (o && o[k] !== undefined) ? o[k] : undefined;
    }, obj);
  }

  /**
   * Translate a key. Substitutions: t('key', { name: 'Bhavé' }) → replaces {{name}}
   * Falls back: active → en → key
   */
  function t(key, subs) {
    var str;

    // Try active language
    if (registry[active]) str = resolve(registry[active], key);

    // Fallback to English
    if (str === undefined && active !== DEFAULT_LANG && registry[DEFAULT_LANG]) {
      str = resolve(registry[DEFAULT_LANG], key);
    }

    // Last resort: return the key itself (nothing breaks, obvious in UI)
    if (str === undefined) str = key;

    // Substitutions: replace {{key}} with values
    if (subs && typeof str === 'string') {
      str = str.replace(/\{\{(\w+)\}\}/g, function(_, k) {
        return subs[k] !== undefined ? subs[k] : '{{' + k + '}}';
      });
    }

    return str;
  }

  /**
   * Initialize: detect language, set it.
   * Called automatically on script load.
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        set(detect());
      });
    } else {
      set(detect());
    }
  }

  var BhaveI18n = {
    register: register,
    set: set,
    t: t,
    current: function() { return active; },
    available: function() { return Object.keys(registry); },
    init: init,
  };

  // Expose globally
  window.BhaveI18n = BhaveI18n;

  // Auto-init
  init();

}(window));
