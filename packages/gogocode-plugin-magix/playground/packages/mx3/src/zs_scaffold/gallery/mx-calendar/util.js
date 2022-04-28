/*md5:7fbb245c49f14546380fe914be2785fc*/
let I18n = require('../mx-medusa/util');

let Today = new Date();
let Formatter = 'YYYY-MM-DD';
let ForeverStr = I18n['calendar.forever'];
let DayMillisecond = 24 * 60 * 60 * 1000;
let PadZero = (str) => {
    return ('0' + str).slice(-2);
};

let DateReg = {
    y: {
        reg: /y+/gi,
        fn(m, d) {
            return String(d.getFullYear()).slice(-m.length);
        }
    },
    M: {
        reg: /M+/g,
        fn(m, d, t) {
            t = d.getMonth() + 1;
            return PadZero(t).slice(-m.length);
        }
    },
    d: {
        reg: /d+/gi,
        fn(m, d, t) {
            t = d.getDate();
            return PadZero(t).slice(-m.length);
        }
    },
    h: {
        reg: /h+/gi,
        fn(m, d, t) {
            t = d.getHours();
            return PadZero(t).slice(-m.length);
        }
    },
    m: {
        reg: /m+/g,
        fn(m, d, t) {
            t = d.getMinutes();
            return PadZero(t).slice(-m.length);
        }
    },
    s: {
        reg: /s+/g,
        fn(m, d, t) {
            t = d.getSeconds();
            return PadZero(t).slice(-m.length);
        }
    },
    S: {
        reg: /S+/g,
        fn(m, d, t) {
            t = d.getMilliseconds();
            return String(t).substring(0, m.length);
        }
    }
};

let DateParse = (date) => {
    let d;
    if (date instanceof Date) {
        return date;
    } else {
        // date = new Date(Date.parse(String(date).replace(/-/g, '/')));
        // Date.parse('2019/12') safari 下不支持
        // Date.parse('2019-12') safari 下支持
        // todo遗留问题：new Date不同时区的时差问题 https://www.kancloud.cn/javascript-jdxia/web/1590503
        d = new Date(Date.parse(String(date).replace(/\//g, '-')));
        if (date && (d == 'Invalid Date' || isNaN(d))) {
            // safari兼容处理
            let vs = String(date).split(/[^0-9]/);
            d = new Date((vs[0] || ''), vs[1] ? ((+vs[1] - 1) + '') : '', (vs[2] || ''), (vs[3] || ''), (vs[4] || ''), (vs[5] || ''));
        }
    }
    if (d instanceof Date && (d != 'Invalid Date') && !isNaN(d)) {
        return d;
    }
    return null;
};

let DateFormat = (date, formatter) => {
    date = DateParse(date);
    formatter = formatter || Formatter;
    let key;
    let replacement = (match) => {
        return DateReg[key].fn(match, date);
    };
    for (key in DateReg) {
        formatter = formatter.replace(DateReg[key].reg, replacement);
    }
    return formatter;
};

let GetOffsetDate = (offset, date) => {
    if (!date) {
        date = new Date();
    }
    offset = offset || 0;
    let uom = new Date(date.getTime() + offset * DayMillisecond);
    uom = uom.getFullYear() + '/' + (uom.getMonth() + 1) + '/' + uom.getDate();
    return new Date(uom);
}

module.exports = {
    foreverStr: ForeverStr,
    getOffsetDate: GetOffsetDate,
    dateParse: DateParse,
    dateFormat: DateFormat,
    padZero: PadZero,
    getDefaultDate: (min, max, formatter) => {
        min = DateParse(min);
        max = DateParse(max);
        let today = Today;
        let init;
        if (min && (min.getTime() > today.getTime())) {
            init = min;
        } else if (max && (max.getTime() < today.getTime())) {
            init = max;
        } else {
            init = today;
        }
        return DateFormat(init, formatter);
    },
    /**
     * 包含dynamic的动态快捷日期，跟开始时间有关
     */
    getQuickInfos: (quickDates, startStr, formatter) => {
        let quickInfos = [];
        quickDates = quickDates || [];
        quickDates.forEach(quickKey => {
            let text, start, end, tip;
            if (quickKey == 'today') {
                text = I18n['calendar.today'];
                tip = I18n['calendar.today'];
                start = GetOffsetDate(0);
                end = GetOffsetDate(0);
            } else if (quickKey == 'yesterday') {
                text = I18n['calendar.yesterday'];
                tip = I18n['calendar.yesterday'];
                start = GetOffsetDate(-1);
                end = GetOffsetDate(-1);
            } else if (quickKey == 'beforeYesterday') {
                text = I18n['calendar.before.yesterday'];
                tip = I18n['calendar.before.yesterday'];
                start = GetOffsetDate(-2);
                end = GetOffsetDate(-2);
            } else if (quickKey == 'preMonth') {
                text = I18n['calendar.last.month'];
                tip = I18n['calendar.last.month'];
                start = new Date(Today.getFullYear(), Today.getMonth() - 1, 1);
                let startYear = start.getFullYear(),
                    startMonth = start.getMonth(),
                    lastDay = 32 - new Date(startYear, startMonth, 32).getDate();
                end = new Date(startYear, startMonth, lastDay);
            } else if (quickKey == 'preWeekSun') {
                text = I18n['calendar.last.week'];
                tip = I18n['calendar.last.week.sunday'];
                let temp = GetOffsetDate(-7);
                offset = 0 - temp.getDay();
                start = GetOffsetDate(offset, temp);
                end = GetOffsetDate(offset + 6, temp);
            } else if (quickKey == 'preWeekMon') {
                text = I18n['calendar.last.week'];
                tip = I18n['calendar.last.week.monday'];
                let temp = GetOffsetDate(-7);
                offset = 1 - temp.getDay();
                start = GetOffsetDate(offset, temp);
                end = GetOffsetDate(offset + 6, temp);
            } else if (quickKey == 'lastestWeekSun') {
                text = I18n['calendar.this.week'];
                tip = I18n['calendar.this.week.sunday'];
                offset = 0 - Today.getDay();
                start = GetOffsetDate(offset);
                end = GetOffsetDate(0);
            } else if (quickKey == 'lastestWeekMon') {
                text = I18n['calendar.this.week'];
                tip = I18n['calendar.this.week.monday'];
                offset = 1 - Today.getDay();
                start = GetOffsetDate(offset);
                end = GetOffsetDate(0);
            } else if (quickKey == 'passedThisMonth') {
                text = I18n['calendar.this.month'];
                tip = I18n['calendar.this.month.yestarday'];
                start = GetOffsetDate(-Today.getDate() + 1);
                end = GetOffsetDate(-1);
            } else if (quickKey == 'lastestThisMonth') {
                text = I18n['calendar.this.month'];
                tip = I18n['calendar.this.month.today'];
                start = GetOffsetDate(-Today.getDate() + 1);
                end = GetOffsetDate(0);
            } else if ((/^passed\d+$/i).test(quickKey)) {
                let n = +quickKey.replace('passed', '');
                text = I18n['calendar.passed'] + ' ' + n + ' ' + I18n['calendar.unit'];
                tip = I18n['calendar.passed'] + ' ' + n + ' ' + I18n['calendar.unit.yesterday'];
                start = GetOffsetDate(0 - n);
                end = GetOffsetDate(-1);
            } else if ((/^lastest\d+$/i).test(quickKey)) {
                let n = +quickKey.replace('lastest', '');
                text = I18n['calendar.lastest'] + ' ' + n + ' ' + I18n['calendar.unit'];
                tip = I18n['calendar.lastest'] + ' ' + n + ' ' + I18n['calendar.unit.today'];
                start = GetOffsetDate(1 - n);
                end = GetOffsetDate(0);
            } else if ((/^dynamicStart\d+$/i).test(quickKey)) {
                let n = +quickKey.replace('dynamicStart', '');
                text = I18n['calendar.dynamic.end'].replace('{day}', n);
                tip = I18n['calendar.dynamic.end.tip'].replace('{day}', n);
                start = DateParse(startStr);
                end = GetOffsetDate(n - 1, start);
            } else if (quickKey == 'dynamicEndThisMonth') {
                text = I18n['calendar.natural.month'];
                tip = I18n['calendar.natural.month.tip'];
                start = DateParse(startStr);
                let startYear = start.getFullYear(),
                    startMonth = start.getMonth(),
                    lastDay = 32 - new Date(startYear, startMonth, 32).getDate();
                end = new Date(startYear, startMonth, lastDay);
            } else if (quickKey == 'dynamicEndNextMonth') {
                text = I18n['calendar.next.month'];
                tip = I18n['calendar.next.month.tip'];
                start = DateParse(startStr);
                let startYear = start.getFullYear(),
                    nextMonth = start.getMonth() + 1,
                    lastDay = 32 - new Date(startYear, nextMonth, 32).getDate();
                end = new Date(startYear, nextMonth, lastDay);
            } else if (quickKey == 'forever') {
                text = ForeverStr;
                tip = I18n['calendar.forever.tip'];
                start = DateParse(startStr);
                end = ForeverStr;
            }
            if (text && tip && start) {
                quickInfos.push({
                    key: quickKey,
                    text,
                    tip,
                    start: DateFormat(start, formatter),
                    end: (end == ForeverStr) ? ForeverStr : DateFormat(end, formatter)
                })
            } else if (typeof quickKey === 'object') {
                // 用户自定义的快捷日期
                quickInfos.push(quickKey);
            }
        })
        return quickInfos;
    },
    parseDateType: (type) => {
        if (!type) {
            type = 'all';
        }
        let enables = {
            year: true,
            month: true,
            day: true
        };
        if (type != 'all') {
            for (let p in enables) {
                if (type.indexOf(p) === -1) {
                    delete enables[p];
                }
            }
        }
        return enables;
    }
}