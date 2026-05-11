/**
 * TIMEZONE RESOLVER
 * /timezone-resolver.js
 *
 * Resolves the correct UTC offset for a birth time at a specific
 * geographic location and historical date.
 *
 * WHY THIS EXISTS:
 *   "7:30 AM in Chicago on July 4 1985" is CDT (UTC-5), not CST (UTC-6).
 *   DST boundaries have moved over time. Getting this wrong shifts Rising
 *   sign by ~45° — likely a wrong sign entirely.
 *
 * HOW IT WORKS:
 *   1. Geocode gives us lat/lon (already done in birth-data-entry)
 *   2. TimeAPI.io (free, no key) gives us IANA timezone name from lat/lon
 *   3. Browser Intl.DateTimeFormat resolves the UTC offset for ANY historical
 *      date — handles DST transitions natively. No API. Offline after step 2.
 *
 * LOAD ORDER:
 *   <script src="/i18n/i18n.js"></script>
 *   <script src="/i18n/strings.XX.js"></script>
 *   <script src="/timezone-resolver.js"></script>
 *
 * DOES NOT TOUCH pattern-map-engine.js or any existing file.
 *
 * USAGE:
 *   TimezoneResolver.resolve(lat, lon)
 *     .then(tz => {
 *       const offsetMinutes = TimezoneResolver.getOffsetForDate(tz.name, '1985-07-04', '07:30');
 *       const hourUT = TimezoneResolver.localToUT('07:30', offsetMinutes);
 *       // Pass hourUT to PatternMapEngine.calculate()
 *     });
 */

(function(window) {
  'use strict';

  // Cache: key = "lat,lon" → { name, fetchedAt }
  // Prevents repeat API calls for same location within session
  var _cache = {};

  /**
   * Fetch IANA timezone name from coordinates.
   * Uses timeapi.io — free, no API key, ~100ms response.
   *
   * @param {number} lat  Decimal degrees (N positive)
   * @param {number} lon  Decimal degrees (E positive)
   * @returns {Promise<{ name: string, rawResponse: object }>}
   */
  function resolve(lat, lon) {
    var cacheKey = lat.toFixed(4) + ',' + lon.toFixed(4);
    if (_cache[cacheKey]) {
      return Promise.resolve(_cache[cacheKey]);
    }

    var url = 'https://timeapi.io/api/TimeZone/coordinate'
            + '?latitude=' + lat
            + '&longitude=' + lon;

    return fetch(url)
      .then(function(r) {
        if (!r.ok) throw new Error('TimeAPI returned ' + r.status);
        return r.json();
      })
      .then(function(data) {
        // TimeAPI returns { timeZone: "America/Chicago", ... }
        var tzName = data.timeZone;
        if (!tzName) throw new Error('No timezone in response');

        // Validate the name is recognized by browser Intl
        try {
          Intl.DateTimeFormat('en', { timeZone: tzName });
        } catch(e) {
          throw new Error('Browser does not recognize timezone: ' + tzName);
        }

        var result = { name: tzName, rawResponse: data };
        _cache[cacheKey] = result;
        return result;
      });
  }

  /**
   * Get UTC offset in minutes for a specific IANA timezone on a specific date and time.
   *
   * Uses browser Intl — handles historical DST transitions correctly.
   * Works fully offline after timezone name is known.
   *
   * @param {string} timezoneName  IANA timezone name e.g. "America/Chicago"
   * @param {string} dateStr       ISO date string e.g. "1985-07-04"
   * @param {string} timeStr       Local time e.g. "07:30"
   * @returns {number} UTC offset in minutes. Negative = west of UTC.
   *                   e.g. CDT = -300 (UTC-5), IST = +330 (UTC+5:30)
   */
  function getOffsetForDate(timezoneName, dateStr, timeStr) {
    var dateParts = dateStr.split('-').map(Number);
    var yr = dateParts[0], mo = dateParts[1], dy = dateParts[2];
    var timeParts = (timeStr || '12:00').split(':').map(Number);
    var hr = timeParts[0], mn = timeParts[1] || 0;

    // Construct a "naive" UTC timestamp for the birth date at the given local time
    var naiveUTC = Date.UTC(yr, mo - 1, dy, hr, mn, 0);
    var naiveDate = new Date(naiveUTC);

    // Format what that UTC moment looks like in the target timezone
    var formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezoneName,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });

    var parts = formatter.formatToParts(naiveDate).reduce(function(acc, p) {
      acc[p.type] = p.value;
      return acc;
    }, {});

    // Parse local datetime in timezone
    var localInTZ = Date.UTC(
      parseInt(parts.year),
      parseInt(parts.month) - 1,
      parseInt(parts.day),
      parseInt(parts.hour === '24' ? '0' : parts.hour),
      parseInt(parts.minute),
      parseInt(parts.second)
    );

    // Offset = UTC - local representation (in minutes)
    // Negative = timezone is west (behind UTC), Positive = east
    var offsetMs = naiveUTC - localInTZ;
    return Math.round(offsetMs / 60000);
  }

  /**
   * Convert a local time string to a decimal UT hour, given offset in minutes.
   *
   * @param {string} localTimeStr  "HH:MM" in local time
   * @param {number} offsetMinutes UTC offset in minutes (e.g. -300 for CDT)
   * @returns {number} Decimal UT hour (may be < 0 or > 24 — engine handles wrap)
   */
  function localToUT(localTimeStr, offsetMinutes) {
    var parts = localTimeStr.split(':').map(Number);
    var h = parts[0], m = parts[1] || 0;
    var localMinutes = h * 60 + m;
    var utMinutes = localMinutes - offsetMinutes; // subtract offset to get UT
    return utMinutes / 60;
  }

  /**
   * Full convenience method: resolve timezone from lat/lon,
   * then return the UT hour for a given local time and birth date.
   *
   * @param {number} lat
   * @param {number} lon
   * @param {string} birthDate  "YYYY-MM-DD"
   * @param {string} birthTime  "HH:MM" local
   * @returns {Promise<{ utHour: number, timezoneName: string, offsetMinutes: number, offsetLabel: string }>}
   */
  function resolveUTHour(lat, lon, birthDate, birthTime) {
    return resolve(lat, lon).then(function(tz) {
      var offset = getOffsetForDate(tz.name, birthDate, birthTime);
      var utHour = localToUT(birthTime, offset);
      return {
        utHour: utHour,
        timezoneName: tz.name,
        offsetMinutes: offset,
        // Human-readable offset string e.g. "UTC-5" or "UTC+5:30"
        offsetLabel: formatOffset(offset),
      };
    });
  }

  /**
   * Format offset minutes as human-readable string.
   * -300 → "UTC−5:00"  |  +330 → "UTC+5:30"
   */
  function formatOffset(offsetMinutes) {
    // Reversed: negative offset = west = behind UTC, shown as UTC+X is wrong
    // UTC-5 means 5 hours behind — offsetMinutes is -300
    var sign = offsetMinutes <= 0 ? '+' : '−'; // + for west (negative), − for east (positive)
    var absMin = Math.abs(offsetMinutes);
    var h = Math.floor(absMin / 60);
    var m = absMin % 60;
    return 'UTC' + sign + h + (m ? ':' + String(m).padStart(2, '0') : '');
  }

  window.TimezoneResolver = {
    resolve: resolve,
    getOffsetForDate: getOffsetForDate,
    localToUT: localToUT,
    resolveUTHour: resolveUTHour,
    formatOffset: formatOffset,
  };

}(window));
