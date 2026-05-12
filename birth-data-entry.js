/**
 * BIRTH DATA ENTRY
 * /birth-data-entry.js
 *
 * Renders a fullscreen form before course content loads.
 * Collects birth name, date, time, location → calculates
 * operating architecture → stores to localStorage → shows course.
 *
 * DEPENDENCIES (must load before this file):
 *   /i18n/i18n.js + strings files
 *   /timezone-resolver.js
 *   PatternMapEngine (optional — architecture stored as null if absent)
 *
 * STORAGE KEY: 'bhave_operating_architecture'
 * Shape: { birthData, architecture, calculatedAt }
 *
 * LOAD ORDER in HTML:
 *   <script src="/i18n/i18n.js"></script>
 *   <script src="/i18n/strings.*.js"></script>
 *   <script src="/timezone-resolver.js"></script>
 *   <script src="/birth-data-entry.js"></script>  ← this file
 */

(function (window) {
  'use strict';

  var STORAGE_KEY = 'bhave_operating_architecture';
  var GEO_DEBOUNCE_MS = 600;
  var NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

  // Tracks whether the form has been successfully mounted into #bde-mount.
  // The safety timeout checks this to avoid restoring #course-content when
  // the form is intentionally showing.
  var _formMounted = false;

  // ── i18n helper ────────────────────────────────────────────────────────────

  function t(key, subs) {
    if (window.BhaveI18n && typeof window.BhaveI18n.t === 'function') {
      return window.BhaveI18n.t(key, subs);
    }
    // Bare fallback — key tail only
    return key.split('.').pop();
  }

  // ── Public entry point ─────────────────────────────────────────────────────
  //
  // Safety contract: #course-content is VISIBLE by default in the HTML.
  // We hide it only after the form has been built and inserted. On any
  // error we leave (or restore) #course-content so the user is never
  // stuck on a blank screen.

  function init() {
    console.log('[BDE] init() — readyState:', document.readyState);
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        console.log('[BDE] Existing architecture found — showing course directly.');
        showCourse();   // already completed — keep course visible, hide mount
        return;
      }
      console.log('[BDE] No existing data — rendering birth entry form.');
      renderForm();     // first visit — build form, then hide course
    } catch (err) {
      console.error('[BDE] init failed — leaving course visible:', err);
      // course-content is already visible by default; nothing to do
    }
  }

  // ── Show / hide ────────────────────────────────────────────────────────────

  function showCourse() {
    var mount  = document.getElementById('bde-mount');
    var course = document.getElementById('course-content');
    if (mount)  mount.style.display  = 'none';
    if (course) course.style.display = '';
  }

  function hideCourse() {
    _formMounted = true;  // form successfully rendered — disarm safety timeout
    var mount  = document.getElementById('bde-mount');
    var course = document.getElementById('course-content');
    if (mount)  mount.style.display  = '';      // reveal the form overlay
    if (course) course.style.display = 'none';  // hide course behind it
    console.log('[BDE] Form mounted — #course-content hidden, #bde-mount visible.');
  }

  // ── Form render ────────────────────────────────────────────────────────────

  function renderForm() {
    var mount = document.getElementById('bde-mount');
    // No mount point → leave course visible and bail
    if (!mount) return;

    // Build form HTML first, THEN hide course so there's no visual gap
    var subtitleRaw = t('form.subtitle');
    var sectionName = '<span class="bde-section-name">' + t('form.subtitleSection') + '</span>';
    var subtitle    = subtitleRaw.replace('{{section}}', sectionName);

    // ── Date dropdown option strings ──────────────────────────────────────
    var _MONTHS = ['January','February','March','April','May','June',
                   'July','August','September','October','November','December'];
    var _thisYear = new Date().getFullYear();

    var _moOpts = '<option value="">' + t('form.birthDate.monthLabel') + '</option>';
    for (var _m = 0; _m < 12; _m++) {
      var _mv = (_m < 9 ? '0' : '') + (_m + 1);
      _moOpts += '<option value="' + _mv + '">' + _MONTHS[_m] + '</option>';
    }

    var _dyOpts = '<option value="">' + t('form.birthDate.dayLabel') + '</option>';
    for (var _d = 1; _d <= 31; _d++) {
      _dyOpts += '<option value="' + _d + '">' + _d + '</option>';
    }

    var _yrOpts = '<option value="">' + t('form.birthDate.yearLabel') + '</option>';
    for (var _y = _thisYear; _y >= 1920; _y--) {
      _yrOpts += '<option value="' + _y + '">' + _y + '</option>';
    }

    try {
    mount.innerHTML =
      '<div class="bde-overlay">'
    +   '<div class="bde-inner">'
    +     '<div class="bde-tag">' + t('form.initTag') + '</div>'
    +     '<h2 class="bde-title">' + t('form.title') + '</h2>'
    +     '<p class="bde-subtitle">' + subtitle + '</p>'

    +     '<form id="bde-form" novalidate>'

    +       '<div class="bde-field">'
    +         '<label class="bde-label" for="bde-name">' + t('form.birthName.label') + '</label>'
    +         '<input type="text" id="bde-name" class="bde-input"'
    +                ' placeholder="' + t('form.birthName.placeholder') + '"'
    +                ' autocomplete="name" />'
    +         '<div class="bde-hint">' + t('form.birthName.hint') + '</div>'
    +       '</div>'

    +       '<div class="bde-field">'
    +         '<label class="bde-label">' + t('form.birthDate.label') + '</label>'
    +         '<div class="bde-date-group">'
    +           '<select id="bde-month" class="bde-select">' + _moOpts + '</select>'
    +           '<select id="bde-day"   class="bde-select">' + _dyOpts + '</select>'
    +           '<select id="bde-year"  class="bde-select">' + _yrOpts + '</select>'
    +         '</div>'
    +         '<div class="bde-hint">' + t('form.birthDate.hint') + '</div>'
    +       '</div>'

    +       '<div class="bde-field">'
    +         '<label class="bde-label" for="bde-time">'
    +           t('form.birthTime.label')
    +           + ' <span class="bde-optional">[ ' + t('form.birthTime.optionalTag') + ' ]</span>'
    +         '</label>'
    +         '<input type="time" id="bde-time" class="bde-input" />'
    +         '<div class="bde-hint">' + t('form.birthTime.hint') + '</div>'
    +       '</div>'

    +       '<div class="bde-field">'
    +         '<label class="bde-label" for="bde-location">'
    +           t('form.birthLocation.label')
    +           + ' <span class="bde-optional">[ ' + t('form.birthLocation.optionalTag') + ' ]</span>'
    +         '</label>'
    +         '<input type="text" id="bde-location" class="bde-input"'
    +                ' placeholder="' + t('form.birthLocation.placeholder') + '"'
    +                ' autocomplete="off" />'
    +         '<div class="bde-hint">' + t('form.birthLocation.hint') + '</div>'
    +         '<div class="bde-geo-status" id="bde-geo-status"></div>'
    +       '</div>'

    +       '<div class="bde-error" id="bde-error"></div>'

    +       '<button type="submit" id="bde-submit" class="bde-submit">'
    +         t('form.submit')
    +       '</button>'

    +     '</form>'
    +   '</div>'
    + '</div>';

    // Form is in the DOM — safe to hide course now
    hideCourse();
    } catch (buildErr) {
      console.error('[BDE] renderForm build failed — leaving course visible:', buildErr);
      return; // course stays visible
    }

    // Wire interactivity (form already visible; errors here are non-fatal)
    try {
      wireForm();
    } catch (wireErr) {
      console.warn('[BDE] wireForm failed (form visible but not interactive):', wireErr);
    }
  }

  // ── Wire geocoding + submission ────────────────────────────────────────────

  function wireForm() {
    var locationInput = document.getElementById('bde-location');
    var geoStatusEl   = document.getElementById('bde-geo-status');
    var errorEl       = document.getElementById('bde-error');
    var submitBtn     = document.getElementById('bde-submit');
    var form          = document.getElementById('bde-form');

    var _geoResult = null;   // { lat, lon, display }
    var _geoTimer  = null;

    // ── Geocode on location input ─────────────────────────────────────────

    locationInput.addEventListener('input', function () {
      clearTimeout(_geoTimer);
      _geoResult = null;
      var val = this.value.trim();

      if (val.length < 3) {
        setGeoStatus('', '');
        return;
      }

      setGeoStatus(t('form.geo.resolving'), 'bde-geo-resolving');

      _geoTimer = setTimeout(function () {
        geocode(val);
      }, GEO_DEBOUNCE_MS);
    });

    function geocode(query) {
      var url = NOMINATIM_URL
              + '?format=json'
              + '&q=' + encodeURIComponent(query)
              + '&limit=1';

      fetch(url, { headers: { 'Accept-Language': 'en' } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.length) {
            _geoResult = null;
            setGeoStatus(t('form.geo.notFound'), 'bde-geo-not-found');
            return;
          }
          var place = data[0];
          _geoResult = {
            lat: parseFloat(place.lat),
            lon: parseFloat(place.lon),
            display: place.display_name,
          };
          var short = place.display_name.split(',').slice(0, 2).join(', ');
          setGeoStatus(
            t('form.geo.resolved').replace('{{location}}', short),
            'bde-geo-resolved'
          );
        })
        .catch(function () {
          _geoResult = null;
          setGeoStatus(t('form.geo.error'), 'bde-geo-error');
        });
    }

    function setGeoStatus(text, cls) {
      geoStatusEl.textContent = text;
      geoStatusEl.className   = 'bde-geo-status' + (cls ? ' ' + cls : '');
    }

    // ── Form submission ───────────────────────────────────────────────────

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorEl.textContent = '';

      var name     = document.getElementById('bde-name').value.trim();
      var _month   = document.getElementById('bde-month').value;
      var _day     = document.getElementById('bde-day').value;
      var _year    = document.getElementById('bde-year').value;
      var date     = (_year && _month && _day)
                     ? _year + '-' + _month + '-' + (_day.length < 2 ? '0' + _day : _day)
                     : '';
      var time     = document.getElementById('bde-time').value.trim();
      var location = document.getElementById('bde-location').value.trim();

      if (!name) { errorEl.textContent = t('form.errors.nameRequired'); return; }
      if (!date) { errorEl.textContent = t('form.errors.dateRequired'); return; }

      submitBtn.textContent = t('form.submitting');
      submitBtn.disabled    = true;

      var hasTime = !!time;
      var hasGeo  = !!_geoResult;

      var birthData = {
        name:          name,
        birthDate:     date,
        birthTime:     hasTime     ? time              : null,
        birthLocation: location   || null,
        lat:           hasGeo      ? _geoResult.lat    : null,
        lon:           hasGeo      ? _geoResult.lon    : null,
        locationDisplay: hasGeo   ? _geoResult.display : null,
      };

      // Step 1: resolve timezone (needs time + geo)
      var tzPromise = (hasTime && hasGeo && window.TimezoneResolver)
        ? window.TimezoneResolver.resolveUTHour(
            _geoResult.lat, _geoResult.lon, date, time
          )
        : Promise.resolve(null);

      tzPromise
        .then(function (tzResult) {
          if (tzResult) {
            birthData.utHour        = tzResult.utHour;
            birthData.timezoneName  = tzResult.timezoneName;
            birthData.offsetMinutes = tzResult.offsetMinutes;
            birthData.offsetLabel   = tzResult.offsetLabel;
          }

          // Step 2: calculate pattern map
          var architecture = null;
          if (window.PatternMapEngine) {
            try {
              architecture = window.PatternMapEngine.calculate(birthData);
            } catch (err) {
              console.warn('[BDE] PatternMapEngine.calculate failed:', err);
            }
          }

          // Step 3: store + proceed
          var stored = {
            birthData:     birthData,
            architecture:  architecture,
            calculatedAt:  new Date().toISOString(),
          };

          localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
          showCourse();
        })
        .catch(function (err) {
          console.error('[BDE] Submission error:', err);
          errorEl.textContent   = t('form.errors.calcFailed');
          submitBtn.textContent = t('form.submit');
          submitBtn.disabled    = false;
        });
    });
  }

  // ── Auto-init ──────────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── Safety timeout ─────────────────────────────────────────────────────────
  // Only fires if the form was NOT successfully mounted (_formMounted === false).
  // This guards against script errors or slow network leaving the page blank.
  // When the form IS mounted, _formMounted is true and we skip this entirely —
  // avoiding the bug where the timeout would undo a correctly-mounted form.

  setTimeout(function () {
    if (_formMounted) {
      // Form rendered correctly — nothing to do.
      return;
    }
    var course = document.getElementById('course-content');
    if (course && course.style.display === 'none') {
      console.warn('[BDE] Safety timeout — form did not mount; revealing course-content as fallback.');
      showCourse();
    }
  }, 4000);

  window.BirthDataEntry = { init: init };

}(window));
