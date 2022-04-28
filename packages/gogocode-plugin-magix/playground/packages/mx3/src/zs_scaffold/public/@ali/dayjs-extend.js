var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

var MS = 'millisecond';
var S = 'second';
var MIN = 'minute';
var H = 'hour';
var D = 'day';
var W = 'week';
var M = 'month';
var Q = 'quarter';
var Y = 'year';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

var advancedFormat = (function (o, c, d) {
  // locale needed later
  var proto = c.prototype;
  var oldFormat = proto.format;

  d.en.ordinal = function (number) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = number % 100;
    return "[" + number + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }; // extend en locale here


  proto.format = function (formatStr) {
    var _this = this;

    var locale = this.$locale();
    var utils = this.$utils();
    var str = formatStr || FORMAT_DEFAULT;
    var result = str.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function (match) {
      switch (match) {
        case 'Q':
          return Math.ceil((_this.$M + 1) / 3);

        case 'Do':
          return locale.ordinal(_this.$D);

        case 'gggg':
          return _this.weekYear();

        case 'GGGG':
          return _this.isoWeekYear();

        case 'wo':
          return locale.ordinal(_this.week(), 'W');
        // W for week

        case 'w':
        case 'ww':
          return utils.s(_this.week(), match === 'w' ? 1 : 2, '0');

        case 'W':
        case 'WW':
          return utils.s(_this.isoWeek(), match === 'W' ? 1 : 2, '0');

        case 'k':
        case 'kk':
          return utils.s(String(_this.$H === 0 ? 24 : _this.$H), match === 'k' ? 1 : 2, '0');

        case 'X':
          return Math.floor(_this.$d.getTime() / 1000);

        case 'x':
          return _this.$d.getTime();

        case 'z':
          return "[" + _this.offsetName() + "]";

        case 'zzz':
          return "[" + _this.offsetName('long') + "]";

        default:
          return match;
      }
    });
    return oldFormat.bind(this)(result);
  };
});

var arraySupport = (function (o, c, dayjs) {
  var proto = c.prototype;

  var parseDate = function parseDate(cfg) {
    var date = cfg.date,
        utc = cfg.utc;

    if (Array.isArray(date)) {
      if (utc) {
        if (!date.length) {
          return new Date();
        }

        return new Date(Date.UTC.apply(null, date));
      }

      if (date.length === 1) {
        return dayjs(String(date[0])).toDate();
      }

      return new (Function.prototype.bind.apply(Date, [null].concat(date)))();
    }

    return date;
  };

  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    cfg.date = parseDate.bind(this)(cfg);
    oldParse.bind(this)(cfg);
  };
});

var badMutable = (function (o, c) {
  // locale needed later
  var proto = c.prototype;

  proto.$g = function (input, get, set) {
    if (this.$utils().u(input)) return this[get];
    return this.$set(set, input);
  };

  proto.set = function (string, _int) {
    return this.$set(string, _int);
  };

  var oldStartOf = proto.startOf;

  proto.startOf = function (units, startOf) {
    this.$d = oldStartOf.bind(this)(units, startOf).toDate();
    this.init();
    return this;
  };

  var oldAdd = proto.add;

  proto.add = function (number, units) {
    this.$d = oldAdd.bind(this)(number, units).toDate();
    this.init();
    return this;
  };

  var oldLocale = proto.locale;

  proto.locale = function (preset, object) {
    if (!preset) return this.$L;
    this.$L = oldLocale.bind(this)(preset, object).$L;
    return this;
  };

  var oldDaysInMonth = proto.daysInMonth;

  proto.daysInMonth = function () {
    return oldDaysInMonth.bind(this.clone())();
  };

  var oldIsSame = proto.isSame;

  proto.isSame = function (that, units) {
    return oldIsSame.bind(this.clone())(that, units);
  };

  var oldIsBefore = proto.isBefore;

  proto.isBefore = function (that, units) {
    return oldIsBefore.bind(this.clone())(that, units);
  };

  var oldIsAfter = proto.isAfter;

  proto.isAfter = function (that, units) {
    return oldIsAfter.bind(this.clone())(that, units);
  };
});

var buddhistEra = (function (o, c) {
  // locale needed later
  var proto = c.prototype;
  var oldFormat = proto.format; // extend en locale here

  proto.format = function (formatStr) {
    var _this = this;

    var yearBias = 543;
    var str = formatStr || FORMAT_DEFAULT;
    var result = str.replace(/(\[[^\]]+])|BBBB|BB/g, function (match, a) {
      var _this$$utils;

      var year = String(_this.$y + yearBias);
      var args = match === 'BB' ? [year.slice(-2), 2] : [year, 4];
      return a || (_this$$utils = _this.$utils()).s.apply(_this$$utils, args.concat(['0']));
    });
    return oldFormat.bind(this)(result);
  };
});

var calendar = (function (o, c, d) {
  var LT = 'h:mm A';
  var L = 'MM/DD/YYYY';
  var calendarFormat = {
    lastDay: "[Yesterday at] " + LT,
    sameDay: "[Today at] " + LT,
    nextDay: "[Tomorrow at] " + LT,
    nextWeek: "dddd [at] " + LT,
    lastWeek: "[Last] dddd [at] " + LT,
    sameElse: L
  };
  var proto = c.prototype;

  proto.calendar = function (referenceTime, formats) {
    var format = formats || this.$locale().calendar || calendarFormat;
    var referenceStartOfDay = d(referenceTime || undefined).startOf('d');
    var diff = this.diff(referenceStartOfDay, 'd', true);
    var sameElse = 'sameElse';
    /* eslint-disable no-nested-ternary */

    var retVal = diff < -6 ? sameElse : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : sameElse;
    /* eslint-enable no-nested-ternary */

    var currentFormat = format[retVal] || calendarFormat[retVal];

    if (typeof currentFormat === 'function') {
      return currentFormat.call(this, d());
    }

    return this.format(currentFormat);
  };
});

// eslint-disable-next-line import/prefer-default-export
var t = function t(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
    return a || b.slice(1);
  });
};
var englishFormats = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
var u = function u(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
    var B = b && b.toUpperCase();
    return a || formats[b] || englishFormats[b] || t(formats[B]);
  });
};

var formattingTokens = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchSigned = /[+-]?\d+/; // -inf - inf

var matchOffset = /[+-]\d\d:?(\d\d)?|Z/; // +00:00 -00:00 +0000 or -0000 +00 or Z

var matchWord = /\d*[^\s\d-_:/()]+/; // Word

var locale = {};

var parseTwoDigitYear = function parseTwoDigitYear(input) {
  input = +input;
  return input + (input > 68 ? 1900 : 2000);
};

function offsetFromString(string) {
  if (!string) return 0;
  if (string === 'Z') return 0;
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + (+parts[2] || 0);
  return minutes === 0 ? 0 : parts[0] === '+' ? -minutes : minutes; // eslint-disable-line no-nested-ternary
}

var addInput = function addInput(property) {
  return function (input) {
    this[property] = +input;
  };
};

var zoneExpressions = [matchOffset, function (input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
}];

var getLocalePart = function getLocalePart(name) {
  var part = locale[name];
  return part && (part.indexOf ? part : part.s.concat(part.f));
};

var meridiemMatch = function meridiemMatch(input, isLowerCase) {
  var isAfternoon;
  var _locale = locale,
      meridiem = _locale.meridiem;

  if (!meridiem) {
    isAfternoon = input === (isLowerCase ? 'pm' : 'PM');
  } else {
    for (var i = 1; i <= 24; i += 1) {
      // todo: fix input === meridiem(i, 0, isLowerCase)
      if (input.indexOf(meridiem(i, 0, isLowerCase)) > -1) {
        isAfternoon = i > 12;
        break;
      }
    }
  }

  return isAfternoon;
};

var expressions = {
  A: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, false);
  }],
  a: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, true);
  }],
  S: [match1, function (input) {
    this.milliseconds = +input * 100;
  }],
  SS: [match2, function (input) {
    this.milliseconds = +input * 10;
  }],
  SSS: [match3, function (input) {
    this.milliseconds = +input;
  }],
  s: [match1to2, addInput('seconds')],
  ss: [match1to2, addInput('seconds')],
  m: [match1to2, addInput('minutes')],
  mm: [match1to2, addInput('minutes')],
  H: [match1to2, addInput('hours')],
  h: [match1to2, addInput('hours')],
  HH: [match1to2, addInput('hours')],
  hh: [match1to2, addInput('hours')],
  D: [match1to2, addInput('day')],
  DD: [match2, addInput('day')],
  Do: [matchWord, function (input) {
    var _locale2 = locale,
        ordinal = _locale2.ordinal;

    var _input$match = input.match(/\d+/);

    this.day = _input$match[0];
    if (!ordinal) return;

    for (var i = 1; i <= 31; i += 1) {
      if (ordinal(i).replace(/\[|\]/g, '') === input) {
        this.day = i;
      }
    }
  }],
  M: [match1to2, addInput('month')],
  MM: [match2, addInput('month')],
  MMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var monthsShort = getLocalePart('monthsShort');
    var matchIndex = (monthsShort || months.map(function (_) {
      return _.substr(0, 3);
    })).indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  MMMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var matchIndex = months.indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  Y: [matchSigned, addInput('year')],
  YY: [match2, function (input) {
    this.year = parseTwoDigitYear(input);
  }],
  YYYY: [match4, addInput('year')],
  Z: zoneExpressions,
  ZZ: zoneExpressions
};

function correctHours(time) {
  var afternoon = time.afternoon;

  if (afternoon !== undefined) {
    var hours = time.hours;

    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else if (hours === 12) {
      time.hours = 0;
    }

    delete time.afternoon;
  }
}

function makeParser(format) {
  format = u(format, locale && locale.formats);
  var array = format.match(formattingTokens);
  var length = array.length;

  for (var i = 0; i < length; i += 1) {
    var token = array[i];
    var parseTo = expressions[token];
    var regex = parseTo && parseTo[0];
    var parser = parseTo && parseTo[1];

    if (parser) {
      array[i] = {
        regex: regex,
        parser: parser
      };
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }

  return function (input) {
    var time = {};

    for (var _i = 0, start = 0; _i < length; _i += 1) {
      var _token = array[_i];

      if (typeof _token === 'string') {
        start += _token.length;
      } else {
        var _regex = _token.regex,
            _parser = _token.parser;
        var part = input.substr(start);

        var match = _regex.exec(part);

        var value = match[0];

        _parser.call(time, value);

        input = input.replace(value, '');
      }
    }

    correctHours(time);
    return time;
  };
}

var parseFormattedInput = function parseFormattedInput(input, format, utc) {
  try {
    if (['x', 'X'].indexOf(format) > -1) return new Date((format === 'X' ? 1000 : 1) * input);
    var parser = makeParser(format);

    var _parser2 = parser(input),
        year = _parser2.year,
        month = _parser2.month,
        day = _parser2.day,
        hours = _parser2.hours,
        minutes = _parser2.minutes,
        seconds = _parser2.seconds,
        milliseconds = _parser2.milliseconds,
        zone = _parser2.zone;

    var now = new Date();
    var d = day || (!year && !month ? now.getDate() : 1);
    var y = year || now.getFullYear();
    var M = 0;

    if (!(year && !month)) {
      M = month > 0 ? month - 1 : now.getMonth();
    }

    var h = hours || 0;
    var m = minutes || 0;
    var s = seconds || 0;
    var ms = milliseconds || 0;

    if (zone) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms + zone.offset * 60 * 1000));
    }

    if (utc) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms));
    }

    return new Date(y, M, d, h, m, s, ms);
  } catch (e) {
    return new Date(''); // Invalid Date
  }
};

var customParseFormat = (function (o, C, d) {
  d.p.customParseFormat = true;

  if (o && o.parseTwoDigitYear) {
    parseTwoDigitYear = o.parseTwoDigitYear;
  }

  var proto = C.prototype;
  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    var date = cfg.date,
        utc = cfg.utc,
        args = cfg.args;
    this.$u = utc;
    var format = args[1];

    if (typeof format === 'string') {
      var isStrictWithoutLocale = args[2] === true;
      var isStrictWithLocale = args[3] === true;
      var isStrict = isStrictWithoutLocale || isStrictWithLocale;
      var pl = args[2];

      if (isStrictWithLocale) {
        pl = args[2];
      }

      locale = this.$locale();

      if (!isStrictWithoutLocale && pl) {
        locale = d.Ls[pl];
      }

      this.$d = parseFormattedInput(date, format, utc);
      this.init();
      if (pl && pl !== true) this.$L = this.locale(pl).$L;

      if (isStrict && date !== this.format(format)) {
        this.$d = new Date('');
      } // reset global locale to make parallel unit test


      locale = {};
    } else if (format instanceof Array) {
      var len = format.length;

      for (var i = 1; i <= len; i += 1) {
        args[1] = format[i - 1];
        var result = d.apply(this, args);

        if (result.isValid()) {
          this.$d = result.$d;
          this.$L = result.$L;
          this.init();
          break;
        }

        if (i === len) this.$d = new Date('');
      }
    } else {
      oldParse.call(this, cfg);
    }
  };
});

var dayOfYear = (function (o, c, d) {
  var proto = c.prototype;

  proto.dayOfYear = function (input) {
    // d(this) is for badMutable
    var dayOfYear = Math.round((d(this).startOf('day') - d(this).startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'day');
  };
});

var MILLISECONDS_A_YEAR = MILLISECONDS_A_DAY * 365;
var MILLISECONDS_A_MONTH = MILLISECONDS_A_DAY * 30;
var durationRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
var unitToMS = {
  years: MILLISECONDS_A_YEAR,
  months: MILLISECONDS_A_MONTH,
  days: MILLISECONDS_A_DAY,
  hours: MILLISECONDS_A_HOUR,
  minutes: MILLISECONDS_A_MINUTE,
  seconds: MILLISECONDS_A_SECOND,
  milliseconds: 1,
  weeks: MILLISECONDS_A_WEEK
};

var isDuration = function isDuration(d) {
  return d instanceof Duration;
}; // eslint-disable-line no-use-before-define


var $d;
var $u;

var wrapper = function wrapper(input, instance, unit) {
  return new Duration(input, unit, instance.$l);
}; // eslint-disable-line no-use-before-define


var prettyUnit = function prettyUnit(unit) {
  return $u.p(unit) + "s";
};

var isNegative = function isNegative(number) {
  return number < 0;
};

var roundNumber = function roundNumber(number) {
  return isNegative(number) ? Math.ceil(number) : Math.floor(number);
};

var absolute = function absolute(number) {
  return Math.abs(number);
};

var getNumberUnitFormat = function getNumberUnitFormat(number, unit) {
  if (!number) {
    return {
      negative: false,
      format: ''
    };
  }

  if (isNegative(number)) {
    return {
      negative: true,
      format: "" + absolute(number) + unit
    };
  }

  return {
    negative: false,
    format: "" + number + unit
  };
};

var Duration = /*#__PURE__*/function () {
  function Duration(input, unit, locale) {
    var _this = this;

    this.$d = {};
    this.$l = locale;

    if (input === undefined) {
      this.$ms = 0;
      this.parseFromMilliseconds();
    }

    if (unit) {
      return wrapper(input * unitToMS[prettyUnit(unit)], this);
    }

    if (typeof input === 'number') {
      this.$ms = input;
      this.parseFromMilliseconds();
      return this;
    }

    if (typeof input === 'object') {
      Object.keys(input).forEach(function (k) {
        _this.$d[prettyUnit(k)] = input[k];
      });
      this.calMilliseconds();
      return this;
    }

    if (typeof input === 'string') {
      var d = input.match(durationRegex);

      if (d) {
        var properties = d.slice(2);
        var numberD = properties.map(function (value) {
          return Number(value);
        });
        this.$d.years = numberD[0];
        this.$d.months = numberD[1];
        this.$d.weeks = numberD[2];
        this.$d.days = numberD[3];
        this.$d.hours = numberD[4];
        this.$d.minutes = numberD[5];
        this.$d.seconds = numberD[6];
        this.calMilliseconds();
        return this;
      }
    }

    return this;
  }

  var _proto = Duration.prototype;

  _proto.calMilliseconds = function calMilliseconds() {
    var _this2 = this;

    this.$ms = Object.keys(this.$d).reduce(function (total, unit) {
      return total + (_this2.$d[unit] || 0) * unitToMS[unit];
    }, 0);
  };

  _proto.parseFromMilliseconds = function parseFromMilliseconds() {
    var $ms = this.$ms;
    this.$d.years = roundNumber($ms / MILLISECONDS_A_YEAR);
    $ms %= MILLISECONDS_A_YEAR;
    this.$d.months = roundNumber($ms / MILLISECONDS_A_MONTH);
    $ms %= MILLISECONDS_A_MONTH;
    this.$d.days = roundNumber($ms / MILLISECONDS_A_DAY);
    $ms %= MILLISECONDS_A_DAY;
    this.$d.hours = roundNumber($ms / MILLISECONDS_A_HOUR);
    $ms %= MILLISECONDS_A_HOUR;
    this.$d.minutes = roundNumber($ms / MILLISECONDS_A_MINUTE);
    $ms %= MILLISECONDS_A_MINUTE;
    this.$d.seconds = roundNumber($ms / MILLISECONDS_A_SECOND);
    $ms %= MILLISECONDS_A_SECOND;
    this.$d.milliseconds = $ms;
  };

  _proto.toISOString = function toISOString() {
    var Y = getNumberUnitFormat(this.$d.years, 'Y');
    var M = getNumberUnitFormat(this.$d.months, 'M');
    var days = +this.$d.days || 0;

    if (this.$d.weeks) {
      days += this.$d.weeks * 7;
    }

    var D = getNumberUnitFormat(days, 'D');
    var H = getNumberUnitFormat(this.$d.hours, 'H');
    var m = getNumberUnitFormat(this.$d.minutes, 'M');
    var seconds = this.$d.seconds || 0;

    if (this.$d.milliseconds) {
      seconds += this.$d.milliseconds / 1000;
    }

    var S = getNumberUnitFormat(seconds, 'S');
    var negativeMode = Y.negative || M.negative || D.negative || H.negative || m.negative || S.negative;
    var T = H.format || m.format || S.format ? 'T' : '';
    var P = negativeMode ? '-' : '';
    var result = P + "P" + Y.format + M.format + D.format + T + H.format + m.format + S.format;
    return result === 'P' || result === '-P' ? 'P0D' : result;
  };

  _proto.toJSON = function toJSON() {
    return this.toISOString();
  };

  _proto.format = function format(formatStr) {
    var str = formatStr || 'YYYY-MM-DDTHH:mm:ss';
    var matches = {
      Y: this.$d.years,
      YY: $u.s(this.$d.years, 2, '0'),
      YYYY: $u.s(this.$d.years, 4, '0'),
      M: this.$d.months,
      MM: $u.s(this.$d.months, 2, '0'),
      D: this.$d.days,
      DD: $u.s(this.$d.days, 2, '0'),
      H: this.$d.hours,
      HH: $u.s(this.$d.hours, 2, '0'),
      m: this.$d.minutes,
      mm: $u.s(this.$d.minutes, 2, '0'),
      s: this.$d.seconds,
      ss: $u.s(this.$d.seconds, 2, '0'),
      SSS: $u.s(this.$d.milliseconds, 3, '0')
    };
    return str.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || String(matches[match]);
    });
  };

  _proto.as = function as(unit) {
    return this.$ms / unitToMS[prettyUnit(unit)];
  };

  _proto.get = function get(unit) {
    var base = this.$ms;
    var pUnit = prettyUnit(unit);

    if (pUnit === 'milliseconds') {
      base %= 1000;
    } else if (pUnit === 'weeks') {
      base = roundNumber(base / unitToMS[pUnit]);
    } else {
      base = this.$d[pUnit];
    }

    return base === 0 ? 0 : base; // a === 0 will be true on both 0 and -0
  };

  _proto.add = function add(input, unit, isSubtract) {
    var another;

    if (unit) {
      another = input * unitToMS[prettyUnit(unit)];
    } else if (isDuration(input)) {
      another = input.$ms;
    } else {
      another = wrapper(input, this).$ms;
    }

    return wrapper(this.$ms + another * (isSubtract ? -1 : 1), this);
  };

  _proto.subtract = function subtract(input, unit) {
    return this.add(input, unit, true);
  };

  _proto.locale = function locale(l) {
    var that = this.clone();
    that.$l = l;
    return that;
  };

  _proto.clone = function clone() {
    return wrapper(this.$ms, this);
  };

  _proto.humanize = function humanize(withSuffix) {
    return $d().add(this.$ms, 'ms').locale(this.$l).fromNow(!withSuffix);
  };

  _proto.milliseconds = function milliseconds() {
    return this.get('milliseconds');
  };

  _proto.asMilliseconds = function asMilliseconds() {
    return this.as('milliseconds');
  };

  _proto.seconds = function seconds() {
    return this.get('seconds');
  };

  _proto.asSeconds = function asSeconds() {
    return this.as('seconds');
  };

  _proto.minutes = function minutes() {
    return this.get('minutes');
  };

  _proto.asMinutes = function asMinutes() {
    return this.as('minutes');
  };

  _proto.hours = function hours() {
    return this.get('hours');
  };

  _proto.asHours = function asHours() {
    return this.as('hours');
  };

  _proto.days = function days() {
    return this.get('days');
  };

  _proto.asDays = function asDays() {
    return this.as('days');
  };

  _proto.weeks = function weeks() {
    return this.get('weeks');
  };

  _proto.asWeeks = function asWeeks() {
    return this.as('weeks');
  };

  _proto.months = function months() {
    return this.get('months');
  };

  _proto.asMonths = function asMonths() {
    return this.as('months');
  };

  _proto.years = function years() {
    return this.get('years');
  };

  _proto.asYears = function asYears() {
    return this.as('years');
  };

  return Duration;
}();

var duration = (function (option, Dayjs, dayjs) {
  $d = dayjs;
  $u = dayjs().$utils();

  dayjs.duration = function (input, unit) {
    var $l = dayjs.locale();
    return wrapper(input, {
      $l: $l
    }, unit);
  };

  dayjs.isDuration = isDuration;
  var oldAdd = Dayjs.prototype.add;
  var oldSubtract = Dayjs.prototype.subtract;

  Dayjs.prototype.add = function (value, unit) {
    if (isDuration(value)) value = value.asMilliseconds();
    return oldAdd.bind(this)(value, unit);
  };

  Dayjs.prototype.subtract = function (value, unit) {
    if (isDuration(value)) value = value.asMilliseconds();
    return oldSubtract.bind(this)(value, unit);
  };
});

var isBetween = (function (o, c, d) {
  c.prototype.isBetween = function (a, b, u, i) {
    var dA = d(a);
    var dB = d(b);
    i = i || '()';
    var dAi = i[0] === '(';
    var dBi = i[1] === ')';
    return (dAi ? this.isAfter(dA, u) : !this.isBefore(dA, u)) && (dBi ? this.isBefore(dB, u) : !this.isAfter(dB, u)) || (dAi ? this.isBefore(dA, u) : !this.isAfter(dA, u)) && (dBi ? this.isAfter(dB, u) : !this.isBefore(dB, u));
  };
});

var isLeapYear = (function (o, c) {
  var proto = c.prototype;

  proto.isLeapYear = function () {
    return this.$y % 4 === 0 && this.$y % 100 !== 0 || this.$y % 400 === 0;
  };
});

var isMoment = (function (o, c, f) {
  f.isMoment = function (input) {
    return f.isDayjs(input);
  };
});

var isSameOrAfter = (function (o, c) {
  c.prototype.isSameOrAfter = function (that, units) {
    return this.isSame(that, units) || this.isAfter(that, units);
  };
});

var isSameOrBefore = (function (o, c) {
  c.prototype.isSameOrBefore = function (that, units) {
    return this.isSame(that, units) || this.isBefore(that, units);
  };
});

var isToday = (function (o, c, d) {
  var proto = c.prototype;

  proto.isToday = function () {
    var comparisonTemplate = 'YYYY-MM-DD';
    var now = d();
    return this.format(comparisonTemplate) === now.format(comparisonTemplate);
  };
});

var isTomorrow = (function (o, c, d) {
  var proto = c.prototype;

  proto.isTomorrow = function () {
    var comparisonTemplate = 'YYYY-MM-DD';
    var tomorrow = d().add(1, 'day');
    return this.format(comparisonTemplate) === tomorrow.format(comparisonTemplate);
  };
});

var isYesterday = (function (o, c, d) {
  var proto = c.prototype;

  proto.isYesterday = function () {
    var comparisonTemplate = 'YYYY-MM-DD';
    var yesterday = d().subtract(1, 'day');
    return this.format(comparisonTemplate) === yesterday.format(comparisonTemplate);
  };
});

var isoWeekPrettyUnit = 'isoweek';
var isoWeek = (function (o, c, d) {
  var getYearFirstThursday = function getYearFirstThursday(year, isUtc) {
    var yearFirstDay = (isUtc ? d.utc : d)().year(year).startOf(Y);
    var addDiffDays = 4 - yearFirstDay.isoWeekday();

    if (yearFirstDay.isoWeekday() > 4) {
      addDiffDays += 7;
    }

    return yearFirstDay.add(addDiffDays, D);
  };

  var getCurrentWeekThursday = function getCurrentWeekThursday(ins) {
    return ins.add(4 - ins.isoWeekday(), D);
  };

  var proto = c.prototype;

  proto.isoWeekYear = function () {
    var nowWeekThursday = getCurrentWeekThursday(this);
    return nowWeekThursday.year();
  };

  proto.isoWeek = function (week) {
    if (!this.$utils().u(week)) {
      return this.add((week - this.isoWeek()) * 7, D);
    }

    var nowWeekThursday = getCurrentWeekThursday(this);
    var diffWeekThursday = getYearFirstThursday(this.isoWeekYear(), this.$u);
    return nowWeekThursday.diff(diffWeekThursday, W) + 1;
  };

  proto.isoWeekday = function (week) {
    if (!this.$utils().u(week)) {
      return this.day(this.day() % 7 ? week : week - 7);
    }

    return this.day() || 7;
  };

  var oldStartOf = proto.startOf;

  proto.startOf = function (units, startOf) {
    var utils = this.$utils();
    var isStartOf = !utils.u(startOf) ? startOf : true;
    var unit = utils.p(units);

    if (unit === isoWeekPrettyUnit) {
      return isStartOf ? this.date(this.date() - (this.isoWeekday() - 1)).startOf('day') : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf('day');
    }

    return oldStartOf.bind(this)(units, startOf);
  };
});

var isoWeeksInYear = (function (o, c) {
  var proto = c.prototype;

  proto.isoWeeksInYear = function () {
    var isLeapYear = this.isLeapYear();
    var last = this.endOf('y');
    var day = last.day();

    if (day === 4 || isLeapYear && day === 5) {
      return 53;
    }

    return 52;
  };
});

var localeData = (function (o, c, dayjs) {
  // locale needed later
  var proto = c.prototype;

  var getLocalePart = function getLocalePart(part) {
    return part && (part.indexOf ? part : part.s);
  };

  var getShort = function getShort(ins, target, full, num, localeOrder) {
    var locale = ins.name ? ins : ins.$locale();
    var targetLocale = getLocalePart(locale[target]);
    var fullLocale = getLocalePart(locale[full]);
    var result = targetLocale || fullLocale.map(function (f) {
      return f.substr(0, num);
    });
    if (!localeOrder) return result;
    var weekStart = locale.weekStart;
    return result.map(function (_, index) {
      return result[(index + (weekStart || 0)) % 7];
    });
  };

  var getDayjsLocaleObject = function getDayjsLocaleObject() {
    return dayjs.Ls[dayjs.locale()];
  };

  var getLongDateFormat = function getLongDateFormat(l, format) {
    return l.formats[format] || t(l.formats[format.toUpperCase()]);
  };

  var localeData = function localeData() {
    var _this = this;

    return {
      months: function months(instance) {
        return instance ? instance.format('MMMM') : getShort(_this, 'months');
      },
      monthsShort: function monthsShort(instance) {
        return instance ? instance.format('MMM') : getShort(_this, 'monthsShort', 'months', 3);
      },
      firstDayOfWeek: function firstDayOfWeek() {
        return _this.$locale().weekStart || 0;
      },
      weekdays: function weekdays(instance) {
        return instance ? instance.format('dddd') : getShort(_this, 'weekdays');
      },
      weekdaysMin: function weekdaysMin(instance) {
        return instance ? instance.format('dd') : getShort(_this, 'weekdaysMin', 'weekdays', 2);
      },
      weekdaysShort: function weekdaysShort(instance) {
        return instance ? instance.format('ddd') : getShort(_this, 'weekdaysShort', 'weekdays', 3);
      },
      longDateFormat: function longDateFormat(format) {
        return getLongDateFormat(_this.$locale(), format);
      },
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    };
  };

  proto.localeData = function () {
    return localeData.bind(this)();
  };

  dayjs.localeData = function () {
    var localeObject = getDayjsLocaleObject();
    return {
      firstDayOfWeek: function firstDayOfWeek() {
        return localeObject.weekStart || 0;
      },
      weekdays: function weekdays() {
        return dayjs.weekdays();
      },
      weekdaysShort: function weekdaysShort() {
        return dayjs.weekdaysShort();
      },
      weekdaysMin: function weekdaysMin() {
        return dayjs.weekdaysMin();
      },
      months: function months() {
        return dayjs.months();
      },
      monthsShort: function monthsShort() {
        return dayjs.monthsShort();
      },
      longDateFormat: function longDateFormat(format) {
        return getLongDateFormat(localeObject, format);
      },
      meridiem: localeObject.meridiem,
      ordinal: localeObject.ordinal
    };
  };

  dayjs.months = function () {
    return getShort(getDayjsLocaleObject(), 'months');
  };

  dayjs.monthsShort = function () {
    return getShort(getDayjsLocaleObject(), 'monthsShort', 'months', 3);
  };

  dayjs.weekdays = function (localeOrder) {
    return getShort(getDayjsLocaleObject(), 'weekdays', null, null, localeOrder);
  };

  dayjs.weekdaysShort = function (localeOrder) {
    return getShort(getDayjsLocaleObject(), 'weekdaysShort', 'weekdays', 3, localeOrder);
  };

  dayjs.weekdaysMin = function (localeOrder) {
    return getShort(getDayjsLocaleObject(), 'weekdaysMin', 'weekdays', 2, localeOrder);
  };
});

var localizedFormat = (function (o, c, d) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  d.en.formats = englishFormats;

  proto.format = function (formatStr) {
    if (formatStr === void 0) {
      formatStr = FORMAT_DEFAULT;
    }

    var _this$$locale = this.$locale(),
        _this$$locale$formats = _this$$locale.formats,
        formats = _this$$locale$formats === void 0 ? {} : _this$$locale$formats;

    var result = u(formatStr, formats);
    return oldFormat.call(this, result);
  };
});

var minMax = (function (o, c, d) {
  var sortBy = function sortBy(method, dates) {
    if (!dates || !dates.length || !dates[0] || dates.length === 1 && !dates[0].length) {
      return null;
    }

    if (dates.length === 1 && dates[0].length > 0) {
      var _dates = dates;
      dates = _dates[0];
    }

    var result;
    var _dates2 = dates;
    result = _dates2[0];

    for (var i = 1; i < dates.length; i += 1) {
      if (!dates[i].isValid() || dates[i][method](result)) {
        result = dates[i];
      }
    }

    return result;
  };

  d.max = function () {
    var args = [].slice.call(arguments, 0); // eslint-disable-line prefer-rest-params

    return sortBy('isAfter', args);
  };

  d.min = function () {
    var args = [].slice.call(arguments, 0); // eslint-disable-line prefer-rest-params

    return sortBy('isBefore', args);
  };
});

var objectSupport = (function (o, c, dayjs) {
  var proto = c.prototype;

  var isObject = function isObject(obj) {
    return !(obj instanceof Date) && !(obj instanceof Array) && obj instanceof Object;
  };

  var prettyUnit = function prettyUnit(u) {
    var unit = proto.$utils().p(u);
    return unit === 'date' ? 'day' : unit;
  };

  var parseDate = function parseDate(cfg) {
    var date = cfg.date,
        utc = cfg.utc;
    var $d = {};

    if (isObject(date)) {
      if (!Object.keys(date).length) {
        return new Date();
      }

      var now = utc ? dayjs.utc() : dayjs();
      Object.keys(date).forEach(function (k) {
        $d[prettyUnit(k)] = date[k];
      });
      var d = $d.day || (!$d.year && !($d.month >= 0) ? now.date() : 1);
      var y = $d.year || now.year();
      var M = $d.month >= 0 ? $d.month : !$d.year && !$d.day ? now.month() : 0; // eslint-disable-line no-nested-ternary,max-len

      var h = $d.hour || 0;
      var m = $d.minute || 0;
      var s = $d.second || 0;
      var ms = $d.millisecond || 0;

      if (utc) {
        return new Date(Date.UTC(y, M, d, h, m, s, ms));
      }

      return new Date(y, M, d, h, m, s, ms);
    }

    return date;
  };

  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    cfg.date = parseDate.bind(this)(cfg);
    oldParse.bind(this)(cfg);
  };

  var oldSet = proto.set;
  var oldAdd = proto.add;

  var callObject = function callObject(call, argument, string, offset) {
    if (offset === void 0) {
      offset = 1;
    }

    if (argument instanceof Object) {
      var keys = Object.keys(argument);
      var chain = this;
      keys.forEach(function (key) {
        chain = call.bind(chain)(argument[key] * offset, key);
      });
      return chain;
    }

    return call.bind(this)(argument * offset, string);
  };

  proto.set = function (string, _int) {
    _int = _int === undefined ? string : _int;
    return callObject.bind(this)(function (i, s) {
      return oldSet.bind(this)(s, i);
    }, _int, string);
  };

  proto.add = function (number, string) {
    return callObject.bind(this)(oldAdd, number, string);
  };

  proto.subtract = function (number, string) {
    return callObject.bind(this)(oldAdd, number, string, -1);
  };
});

var pluralGetSet = (function (o, c) {
  var proto = c.prototype;
  var pluralAliases = ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'isoWeeks', 'months', 'quarters', 'years', 'dates'];
  pluralAliases.forEach(function (alias) {
    proto[alias] = proto[alias.replace(/s$/, '')];
  });
});

// Plugin template from https://day.js.org/docs/en/plugin/plugin
var preParsePostFormat = (function (option, dayjsClass) {
  var oldParse = dayjsClass.prototype.parse;

  dayjsClass.prototype.parse = function (cfg) {
    if (typeof cfg.date === 'string') {
      var locale = this.$locale();
      cfg.date = locale && locale.preparse ? locale.preparse(cfg.date) : cfg.date;
    } // original parse result


    return oldParse.bind(this)(cfg);
  }; // // overriding existing API
  // // e.g. extend dayjs().format()


  var oldFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // original format result
    var result = oldFormat.call.apply(oldFormat, [this].concat(args)); // return modified result

    var locale = this.$locale();
    return locale && locale.postformat ? locale.postformat(result) : result;
  };

  var oldFromTo = dayjsClass.prototype.fromToBase;

  if (oldFromTo) {
    dayjsClass.prototype.fromToBase = function (input, withoutSuffix, instance, isFrom) {
      var locale = this.$locale() || instance.$locale(); // original format result

      return oldFromTo.call(this, input, withoutSuffix, instance, isFrom, locale && locale.postformat);
    };
  }
});

var quarterOfYear = (function (o, c) {
  var proto = c.prototype;

  proto.quarter = function (quarter) {
    if (!this.$utils().u(quarter)) {
      return this.month(this.month() % 3 + (quarter - 1) * 3);
    }

    return Math.ceil((this.month() + 1) / 3);
  };

  var oldAdd = proto.add;

  proto.add = function (number, units) {
    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = this.$utils().p(units);

    if (unit === Q) {
      return this.add(number * 3, M);
    }

    return oldAdd.bind(this)(number, units);
  };

  var oldStartOf = proto.startOf;

  proto.startOf = function (units, startOf) {
    var utils = this.$utils();
    var isStartOf = !utils.u(startOf) ? startOf : true;
    var unit = utils.p(units);

    if (unit === Q) {
      var quarter = this.quarter() - 1;
      return isStartOf ? this.month(quarter * 3).startOf(M).startOf(D) : this.month(quarter * 3 + 2).endOf(M).endOf(D);
    }

    return oldStartOf.bind(this)(units, startOf);
  };
});

var relativeTime = (function (o, c, d) {
  o = o || {};
  var proto = c.prototype;
  var relObj = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  };
  d.en.relativeTime = relObj;

  proto.fromToBase = function (input, withoutSuffix, instance, isFrom, postFormat) {
    var loc = instance.$locale().relativeTime || relObj;
    var T = o.thresholds || [{
      l: 's',
      r: 44,
      d: S
    }, {
      l: 'm',
      r: 89
    }, {
      l: 'mm',
      r: 44,
      d: MIN
    }, {
      l: 'h',
      r: 89
    }, {
      l: 'hh',
      r: 21,
      d: H
    }, {
      l: 'd',
      r: 35
    }, {
      l: 'dd',
      r: 25,
      d: D
    }, {
      l: 'M',
      r: 45
    }, {
      l: 'MM',
      r: 10,
      d: M
    }, {
      l: 'y',
      r: 17
    }, {
      l: 'yy',
      d: Y
    }];
    var Tl = T.length;
    var result;
    var out;
    var isFuture;

    for (var i = 0; i < Tl; i += 1) {
      var t = T[i];

      if (t.d) {
        result = isFrom ? d(input).diff(instance, t.d, true) : instance.diff(input, t.d, true);
      }

      var abs = (o.rounding || Math.round)(Math.abs(result));
      isFuture = result > 0;

      if (abs <= t.r || !t.r) {
        if (abs <= 1 && i > 0) t = T[i - 1]; // 1 minutes -> a minute, 0 seconds -> 0 second

        var format = loc[t.l];

        if (postFormat) {
          abs = postFormat("" + abs);
        }

        if (typeof format === 'string') {
          out = format.replace('%d', abs);
        } else {
          out = format(abs, withoutSuffix, t.l, isFuture);
        }

        break;
      }
    }

    if (withoutSuffix) return out;
    var pastOrFuture = isFuture ? loc.future : loc.past;

    if (typeof pastOrFuture === 'function') {
      return pastOrFuture(out);
    }

    return pastOrFuture.replace('%s', out);
  };

  function fromTo(input, withoutSuffix, instance, isFrom) {
    return proto.fromToBase(input, withoutSuffix, instance, isFrom);
  }

  proto.to = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this, true);
  };

  proto.from = function (input, withoutSuffix) {
    return fromTo(input, withoutSuffix, this);
  };

  var makeNow = function makeNow(thisDay) {
    return thisDay.$u ? d.utc() : d();
  };

  proto.toNow = function (withoutSuffix) {
    return this.to(makeNow(this), withoutSuffix);
  };

  proto.fromNow = function (withoutSuffix) {
    return this.from(makeNow(this), withoutSuffix);
  };
});

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
}; // Cache time-zone lookups from Intl.DateTimeFormat,
// as it is a *very* slow method.

var dtfCache = {};

var getDateTimeFormat = function getDateTimeFormat(timezone, options) {
  if (options === void 0) {
    options = {};
  }

  var timeZoneName = options.timeZoneName || 'short';
  var key = timezone + "|" + timeZoneName;
  var dtf = dtfCache[key];

  if (!dtf) {
    dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: timeZoneName
    });
    dtfCache[key] = dtf;
  }

  return dtf;
};

var timezone = (function (o, c, d) {
  var defaultTimezone;

  var makeFormatParts = function makeFormatParts(timestamp, timezone, options) {
    if (options === void 0) {
      options = {};
    }

    var date = new Date(timestamp);
    var dtf = getDateTimeFormat(timezone, options);
    return dtf.formatToParts(date);
  };

  var tzOffset = function tzOffset(timestamp, timezone) {
    var formatResult = makeFormatParts(timestamp, timezone);
    var filled = [];

    for (var i = 0; i < formatResult.length; i += 1) {
      var _formatResult$i = formatResult[i],
          type = _formatResult$i.type,
          value = _formatResult$i.value;
      var pos = typeToPos[type];

      if (pos >= 0) {
        filled[pos] = parseInt(value, 10);
      }
    }

    var hour = filled[3]; // Workaround for the same behavior in different node version
    // https://github.com/nodejs/node/issues/33027

    /* istanbul ignore next */

    var fixedHour = hour === 24 ? 0 : hour;
    var utcString = filled[0] + "-" + filled[1] + "-" + filled[2] + " " + fixedHour + ":" + filled[4] + ":" + filled[5] + ":000";
    var utcTs = d.utc(utcString).valueOf();
    var asTS = +timestamp;
    var over = asTS % 1000;
    asTS -= over;
    return (utcTs - asTS) / (60 * 1000);
  }; // find the right offset a given local time. The o input is our guess, which determines which
  // offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
  // https://github.com/moment/luxon/blob/master/src/datetime.js#L76


  var fixOffset = function fixOffset(localTS, o0, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    var utcGuess = localTS - o0 * 60 * 1000; // Test whether the zone matches the offset for this ts

    var o2 = tzOffset(utcGuess, tz); // If so, offset didn't change and we're done

    if (o0 === o2) {
      return [utcGuess, o0];
    } // If not, change the ts by the difference in the offset


    utcGuess -= (o2 - o0) * 60 * 1000; // If that gives us the local time we want, we're done

    var o3 = tzOffset(utcGuess, tz);

    if (o2 === o3) {
      return [utcGuess, o2];
    } // If it's different, we're in a hole time.
    // The offset has changed, but the we don't adjust the time


    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
  };

  var proto = c.prototype;

  proto.tz = function (timezone, keepLocalTime) {
    if (timezone === void 0) {
      timezone = defaultTimezone;
    }

    var oldOffset = this.utcOffset();
    var date = this.toDate();
    var target = date.toLocaleString('en-US', {
      timeZone: timezone
    });
    var diff = Math.round((date - new Date(target)) / 1000 / 60);
    var ins = d(target).$set(MS, this.$ms).utcOffset(-Math.round(date.getTimezoneOffset() / 15) * 15 - diff, true);

    if (keepLocalTime) {
      var newOffset = ins.utcOffset();
      ins = ins.add(oldOffset - newOffset, MIN);
    }

    ins.$x.$timezone = timezone;
    return ins;
  };

  proto.offsetName = function (type) {
    // type: short(default) / long
    var zone = this.$x.$timezone || d.tz.guess();
    var result = makeFormatParts(this.valueOf(), zone, {
      timeZoneName: type
    }).find(function (m) {
      return m.type.toLowerCase() === 'timezonename';
    });
    return result && result.value;
  };

  var oldStartOf = proto.startOf;

  proto.startOf = function (units, startOf) {
    if (!this.$x || !this.$x.$timezone) {
      return oldStartOf.call(this, units, startOf);
    }

    var withoutTz = d(this.format('YYYY-MM-DD HH:mm:ss:SSS'));
    var startOfWithoutTz = oldStartOf.call(withoutTz, units, startOf);
    return startOfWithoutTz.tz(this.$x.$timezone, true);
  };

  d.tz = function (input, arg1, arg2) {
    var parseFormat = arg2 && arg1;
    var timezone = arg2 || arg1 || defaultTimezone;
    var previousOffset = tzOffset(+d(), timezone);

    if (typeof input !== 'string') {
      // timestamp number || js Date || Day.js
      return d(input).tz(timezone);
    }

    var localTs = d.utc(input, parseFormat).valueOf();

    var _fixOffset = fixOffset(localTs, previousOffset, timezone),
        targetTs = _fixOffset[0],
        targetOffset = _fixOffset[1];

    var ins = d(targetTs).utcOffset(targetOffset);
    ins.$x.$timezone = timezone;
    return ins;
  };

  d.tz.guess = function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  d.tz.setDefault = function (timezone) {
    defaultTimezone = timezone;
  };
});

var toArray = (function (o, c) {
  var proto = c.prototype;

  proto.toArray = function () {
    return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
  };
});

var toObject = (function (o, c) {
  var proto = c.prototype;

  proto.toObject = function () {
    return {
      years: this.$y,
      months: this.$M,
      date: this.$D,
      hours: this.$H,
      minutes: this.$m,
      seconds: this.$s,
      milliseconds: this.$ms
    };
  };
});

var updateLocale = (function (option, Dayjs, dayjs) {
  dayjs.updateLocale = function (locale, customConfig) {
    var localeList = dayjs.Ls;
    var localeConfig = localeList[locale];
    if (!localeConfig) return;
    var customConfigKeys = customConfig ? Object.keys(customConfig) : [];
    customConfigKeys.forEach(function (c) {
      localeConfig[c] = customConfig[c];
    });
    return localeConfig; // eslint-disable-line consistent-return
  };
});

var REGEX_VALID_OFFSET_FORMAT = /[+-]\d\d(?::?\d\d)?/g;
var REGEX_OFFSET_HOURS_MINUTES_FORMAT = /([+-]|\d\d)/g;

function offsetFromString$1(value) {
  if (value === void 0) {
    value = '';
  }

  var offset = value.match(REGEX_VALID_OFFSET_FORMAT);

  if (!offset) {
    return null;
  }

  var _ref = ("" + offset[0]).match(REGEX_OFFSET_HOURS_MINUTES_FORMAT) || ['-', 0, 0],
      indicator = _ref[0],
      hoursOffset = _ref[1],
      minutesOffset = _ref[2];

  var totalOffsetInMinutes = +hoursOffset * 60 + +minutesOffset;

  if (totalOffsetInMinutes === 0) {
    return 0;
  }

  return indicator === '+' ? totalOffsetInMinutes : -totalOffsetInMinutes;
}

var utc = (function (option, Dayjs, dayjs) {
  var proto = Dayjs.prototype;

  dayjs.utc = function (date) {
    var cfg = {
      date: date,
      utc: true,
      args: arguments
    }; // eslint-disable-line prefer-rest-params

    return new Dayjs(cfg); // eslint-disable-line no-use-before-define
  };

  proto.utc = function (keepLocalTime) {
    var ins = dayjs(this.toDate(), {
      locale: this.$L,
      utc: true
    });

    if (keepLocalTime) {
      return ins.add(this.utcOffset(), MIN);
    }

    return ins;
  };

  proto.local = function () {
    return dayjs(this.toDate(), {
      locale: this.$L,
      utc: false
    });
  };

  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    if (cfg.utc) {
      this.$u = true;
    }

    if (!this.$utils().u(cfg.$offset)) {
      this.$offset = cfg.$offset;
    }

    oldParse.call(this, cfg);
  };

  var oldInit = proto.init;

  proto.init = function () {
    if (this.$u) {
      var $d = this.$d;
      this.$y = $d.getUTCFullYear();
      this.$M = $d.getUTCMonth();
      this.$D = $d.getUTCDate();
      this.$W = $d.getUTCDay();
      this.$H = $d.getUTCHours();
      this.$m = $d.getUTCMinutes();
      this.$s = $d.getUTCSeconds();
      this.$ms = $d.getUTCMilliseconds();
    } else {
      oldInit.call(this);
    }
  };

  var oldUtcOffset = proto.utcOffset;

  proto.utcOffset = function (input, keepLocalTime) {
    var _this$$utils = this.$utils(),
        u = _this$$utils.u;

    if (u(input)) {
      if (this.$u) {
        return 0;
      }

      if (!u(this.$offset)) {
        return this.$offset;
      }

      return oldUtcOffset.call(this);
    }

    if (typeof input === 'string') {
      input = offsetFromString$1(input);

      if (input === null) {
        return this;
      }
    }

    var offset = Math.abs(input) <= 16 ? input * 60 : input;
    var ins = this;

    if (keepLocalTime) {
      ins.$offset = offset;
      ins.$u = input === 0;
      return ins;
    }

    if (input !== 0) {
      var localTimezoneOffset = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
      ins = this.local().add(offset + localTimezoneOffset, MIN);
      ins.$offset = offset;
      ins.$x.$localOffset = localTimezoneOffset;
    } else {
      ins = this.utc();
    }

    return ins;
  };

  var oldFormat = proto.format;
  var UTC_FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ss[Z]';

  proto.format = function (formatStr) {
    var str = formatStr || (this.$u ? UTC_FORMAT_DEFAULT : '');
    return oldFormat.call(this, str);
  };

  proto.valueOf = function () {
    var addedOffset = !this.$utils().u(this.$offset) ? this.$offset + (this.$x.$localOffset || new Date().getTimezoneOffset()) : 0;
    return this.$d.valueOf() - addedOffset * MILLISECONDS_A_MINUTE;
  };

  proto.isUTC = function () {
    return !!this.$u;
  };

  proto.toISOString = function () {
    return this.toDate().toISOString();
  };

  proto.toString = function () {
    return this.toDate().toUTCString();
  };

  var oldToDate = proto.toDate;

  proto.toDate = function (type) {
    if (type === 's' && this.$offset) {
      return dayjs(this.format('YYYY-MM-DD HH:mm:ss:SSS')).toDate();
    }

    return oldToDate.call(this);
  };

  var oldDiff = proto.diff;

  proto.diff = function (input, units, _float) {
    if (input && this.$u === input.$u) {
      return oldDiff.call(this, input, units, _float);
    }

    var localThis = this.local();
    var localInput = dayjs(input).local();
    return oldDiff.call(localThis, localInput, units, _float);
  };
});

var weekOfYear = (function (o, c, d) {
  var proto = c.prototype;

  proto.week = function (week) {
    if (week === void 0) {
      week = null;
    }

    if (week !== null) {
      return this.add((week - this.week()) * 7, D);
    }

    var yearStart = this.$locale().yearStart || 1;

    if (this.month() === 11 && this.date() > 25) {
      // d(this) is for badMutable
      var nextYearStartDay = d(this).startOf(Y).add(1, Y).date(yearStart);
      var thisEndOfWeek = d(this).endOf(W);

      if (nextYearStartDay.isBefore(thisEndOfWeek)) {
        return 1;
      }
    }

    var yearStartDay = d(this).startOf(Y).date(yearStart);
    var yearStartWeek = yearStartDay.startOf(W).subtract(1, MS);
    var diffInWeek = this.diff(yearStartWeek, W, true);

    if (diffInWeek < 0) {
      return d(this).startOf('week').week();
    }

    return Math.ceil(diffInWeek);
  };

  proto.weeks = function (week) {
    if (week === void 0) {
      week = null;
    }

    return this.week(week);
  };
});

var weekYear = (function (o, c) {
  var proto = c.prototype;

  proto.weekYear = function () {
    var month = this.month();
    var weekOfYear = this.week();
    var year = this.year();

    if (weekOfYear === 1 && month === 11) {
      return year + 1;
    }

    if (month === 0 && weekOfYear >= 52) {
      return year - 1;
    }

    return year;
  };
});

var weekday = (function (o, c) {
  var proto = c.prototype;

  proto.weekday = function (input) {
    var weekStart = this.$locale().weekStart || 0;
    var $W = this.$W;
    var weekday = ($W < weekStart ? $W + 7 : $W) - weekStart;

    if (this.$utils().u(input)) {
      return weekday;
    }

    return this.subtract(weekday, 'day').add(input, 'day');
  };
});

var index = [
  advancedFormat,
  arraySupport,
  badMutable,
  buddhistEra,
  calendar,
  customParseFormat,
  dayOfYear,
  duration,
  isBetween,
  isLeapYear,
  isMoment,
  isSameOrAfter,
  isSameOrBefore,
  isToday,
  isTomorrow,
  isYesterday,
  isoWeek,
  isoWeeksInYear,
  localeData,
  localizedFormat,
  minMax,
  objectSupport,
  pluralGetSet,
  preParsePostFormat,
  quarterOfYear,
  relativeTime,
  timezone,
  toArray,
  toObject,
  updateLocale,
  utc,
  weekOfYear,
  weekYear,
  weekday
];

export default index;
