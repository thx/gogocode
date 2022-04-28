/*md5:867a9839b9000a2a0396afa547d0423b*/
let Magix = require('magix');
let $ = require('$');
let Util = require('@./util');
const { foreverStr: ForeverStr, padZero: PadZero, dateFormat: DateFormat, dateParse: DateParse, getDefaultDate: GetDefaultDate, getQuickInfos: GetQuickInfos, getOffsetDate: GetOffsetDate, parseDateType: ParseDateType } = Util;
Magix.applyStyle('@index.less');
let I18n = require('../mx-medusa/util');

let Days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(key => {
    return I18n['calendar.' + key];
})

let Today = new Date();

let GetNumOfDays = (year, month) => {
    return 32 - new Date(year, month - 1, 32).getDate();
};

let GetWeekText = (weekStart) => {
    let a = [];
    for (let i = 0; i < 7; i++) {
        a[i] = Days[(i + weekStart) % 7];
    }
    return a;
};

let DateDisabled = (current, start, end, disabledWeeks) => {
    // disabledWeeks 不可选择周几
    let day = current.getDay();
    if (disabledWeeks.indexOf(day) > -1) {
        return true;
    }

    let ts = current.getTime(),
        flag;
    if (start) {
        flag = ts < start.getTime();
    }
    if (!flag) {
        if (end) {
            flag = ts > end.getTime();
        } else {
            flag = false;
        }
    }
    return flag;
};

let MonthDisabled = (year, month, start, end) => {
    let flag, current = parseInt(year + PadZero(month), 10);
    if (start) {
        start = parseInt(start.getFullYear() + PadZero(start.getMonth()), 10);
        flag = current < start;
    }
    if (!flag && end) {
        end = parseInt(end.getFullYear() + PadZero(end.getMonth()), 10);
        flag = current > end;
    }
    return flag;
};

let YearDisabled = (year, start, end) => {
    let flag;
    if (start) {
        flag = year < start.getFullYear();
    }
    if (!flag && end) {
        flag = year > end.getFullYear();
    }
    return flag;
};

module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        this['@{extra}'] = $.extend(true, {}, extra.configs);
    },
    render() {
        let me = this;

        let ops = me['@{extra}'];
        ops = ops || {};
        let forever = (ops.selected == ForeverStr);
        let formatter = ops.formatter || 'YYYY-MM-DD';

        // 最大最小不关心时分秒，时分秒的大小不限制
        let max, min;
        // Safari不支持YYYY-MM-DD，使用YYYY/MM/DD
        if (ops.max) {
            max = new Date(DateFormat(ops.max, 'YYYY/MM/DD') + ' 23:59:59');
        }
        if (ops.min) {
            min = new Date(DateFormat(ops.min, 'YYYY/MM/DD') + ' 00:00:00');
        }
        let today = new Date();
        if (!ops.selected || forever) {
            ops.selected = GetDefaultDate(ops.min, ops.max, ops.formatter);
        }
        let selected = DateParse(ops.selected);
        let timeValue = DateFormat(selected, 'hh:mm:ss'),
            dateValue = DateFormat(selected, formatter.slice(0, 10));
        let types = ParseDateType(ops.dateType);
        let weekStart = ops.weekStart | 0;
        let timeType = ops.timeType;

        let disabledWeeks = (ops.disabledWeeks || []).map(w => {
            return +w;
        });
        me.updater.set({
            formatter,
            types,
            showYear: 0,
            showMonth: 0,
            timeType,
            timeValue,
            dateValue,
            max,
            min,
            id: me.id,
            weekStart,
            weekText: GetWeekText(weekStart),
            disabledWeeks
        });

        // 不限的情况特殊处理，不设置选中值
        me['@{update.selected}'](selected, forever);
        me['@{update.years}']();
        me['@{update.months}']();
        me['@{update.days}'](true);
    },
    '@{toDefaultPanel}'() {
        let me = this;
        let updater = me.updater;
        updater.set({
            showYear: 0,
            showMonth: 0
        });
        let data = updater.get();
        if (data.timeType) {
            if (me['@{date.value.bak}']) {
                me['@{update.selected}'](me['@{date.value.bak}']);
                me['@{update.years}']();
                me['@{update.months}']();
                me['@{update.days}']();
                delete me['@{date.value.bak}'];
            }
            if (me['@{time.value.bak}']) {
                updater.set({
                    timeValue: me['@{time.value.bak}']
                });
                delete me['@{time.value.bak}'];
            }
        }
        updater.digest();
    },

    '@{update.selected}'(selected, forever) {
        let me = this,
            data = me.updater;
        selected = DateParse(selected);
        let formatter = data.get('formatter');
        if (selected) {
            data.set({
                year: selected.getFullYear(),
                month: selected.getMonth() + 1,
                selectedYear: selected.getFullYear(),
                selectedMonth: selected.getMonth() + 1,
                selected: forever ? '' : DateFormat(selected, formatter)
            });
        }
    },
    '@{update.years}'(render) {
        let me = this;
        let data = me.updater;
        let json = data.get();
        let year = json.year;
        let min = json.min;
        let max = json.max;
        let startYear = year - year % 10 - 1;
        let endYear = startYear + 11;
        let rows = [];
        for (let i = startYear; i <= endYear; i++) {
            rows.push({
                year: i,
                selected: i == json.selectedYear,
                disabled: YearDisabled(i, min, max)
            });
        }
        data.set({
            startYear: startYear,
            endYear: endYear,
            years: rows
        });
        if (render) {
            data.digest();
        }
    },
    '@{update.months}'(render) {
        let rows = [],
            data = this.updater,
            json = data.get(),
            year = json.year,
            min = json.min,
            max = json.max;
        for (let i = 1; i <= 12; i++) {
            rows.push({
                month: i,
                selected: year == json.selectedYear && i == json.selectedMonth,
                disabled: MonthDisabled(year, i - 1, min, max)
            });
        }
        data.set({
            months: rows
        });
        if (render) {
            data.digest();
        }
    },
    '@{update.days}'(render) {
        let me = this;
        let trs = [];
        let data = me.updater;
        let weekStart = data.get('weekStart');
        let disabledWeeks = data.get('disabledWeeks');

        let year = data.get('year');
        let month = data.get('month');
        let startOffset = (7 - weekStart + new Date(year, month - 1, 1).getDay()) % 7;
        let tds = [];
        let days = GetNumOfDays(year, month),
            i;
        let preDays = GetNumOfDays(year, month - 1);
        let max = data.get('max');
        let min = data.get('min');

        let day, date, formatDay;

        // 日期不关注时分秒
        let formatter = data.get('formatter');
        formatter = formatter.slice(0, 10);

        let selected = data.get('selected');
        if(selected){
            // 不限的情况下，selected = ''
            selected = DateFormat(selected, formatter);
        }

        let today = DateFormat(Today, formatter);
        for (i = 1; i <= startOffset; i++) {
            day = preDays - (startOffset - i);
            date = new Date(year, month - 2, day);
            tds.push({
                month: month - 1,
                full: DateFormat(date, formatter),
                day: day,
                otherMonth: true,
                disabled: DateDisabled(date, min, max, disabledWeeks)
            });
        }
        for (i = 1; i <= days; i++) {
            date = new Date(year, month - 1, i);
            formatDay = DateFormat(date, formatter);
            tds.push({
                today: formatDay == today,
                selected: formatDay == selected,
                day: i,
                month: month,
                full: formatDay,
                disabled: DateDisabled(date, min, max, disabledWeeks)
            });
            if (((i + startOffset) % 7) === 0) {
                trs.push(tds);
                tds = [];
            }
        }
        let fillStart = tds.length; //补充
        let fillEnd = 14; //2周
        for (i = fillStart; i < fillEnd; i++) {
            day = i - fillStart + 1;
            date = new Date(year, month, day);
            tds.push({
                month: month + 1,
                day: day,
                otherMonth: true,
                full: DateFormat(date, formatter),
                disabled: DateDisabled(date, min, max, disabledWeeks)
            });
            if ((i + 1) % 7 === 0) {
                trs.push(tds);
                tds = [];
                if (trs.length == 6) break;
            }
        }
        data.set({
            days: trs
        });
        if (render) {
            data.digest();
        }
    },
    '@{fire.event}'(fromBtn) {
        let me = this;
        let data = me.updater.get();
        if (data.types.day) {
            if ((data.timeType && fromBtn) || !data.timeType) {
                $('#' + me.id).trigger({
                    type: 'change',
                    date: data.dateValue,
                    time: data.timeType ? data.timeValue : null
                });
            }
        } else {
            $('#' + me.id).trigger({
                type: 'change',
                date: data.selectedYear + (data.types.month ? '-' + ('0' + data.selectedMonth).slice(-2) : '')
            });
        }
    },
    '@{changeMonth}<click>'(e) {
        let me = this,
            data = me.updater,
            month = data.get('month'),
            year = data.get('year');
        if (e.params.next) {
            month += 1;
            if (month > 12) {
                month = 1;
                year++;
            }
        } else {
            month -= 1;
            if (month < 1) {
                month = 12;
                year--;
            }
        }
        data.set({
            year: year,
            month: month
        });
        me['@{update.days}'](true);
    },
    '@{changeYear}<click>'(e) {
        let me = this;
        let params = e.params;
        let data = me.updater,
            year = data.get('year');
        if (params.range) {
            year = year + (params.next ? 10 : -10);
        } else {
            year = year + (params.next ? 1 : -1);
        }
        data.set({
            year: year
        });
        if (params.range) {
            me['@{update.years}'](true);
        } else {
            me['@{update.months}'](true);
        }
    },
    '@{showMonths}<click>'() {
        let me = this;
        me.updater.set({
            showMonth: 1
        });
        me['@{update.months}'](true);
    },
    '@{showYears}<click>'() {
        let me = this;
        me.updater.set({
            showYear: 1
        });
        me['@{update.years}'](true);
    },
    '@{pickYear}<click>'(e) {
        let year = e.params.year;
        let me = this;
        let updater = me.updater;
        let data = updater.get();
        let types = data.types;
        if (types.day || types.month) {
            me.updater.set({
                showYear: 0,
                year: +year
            });
            if (types.month) {
                me['@{update.months}'](true);
            } else {
                me['@{update.days}'](true);
            }
        } else {
            me['@{update.selected}'](year + '-01-01');
            me['@{update.years}'](true);
            me['@{fire.event}']();
        }
    },
    '@{pickMonth}<click>'(e) {
        let month = e.params.month;
        let me = this;
        let updater = me.updater;
        let data = updater.get();
        if (data.types.day) {
            updater.set({
                showMonth: 0,
                month: +month
            });
            me['@{update.days}'](true);
        } else {
            me['@{update.selected}'](data.year + '-' + month + '-01');
            me['@{update.months}'](true);
            me['@{fire.event}']();
        }
    },
    '@{choose}<click>'(e) {
        let me = this;
        let data = me.updater;
        let month = data.get('month');
        let turnMonth = e.params.toMonth != month;
        me['@{update.selected}'](e.params.date);
        if (!me['@{date.value.bak}']) {
            me['@{date.value.bak}'] = data.get('dateValue');
        }
        if (turnMonth) {
            me['@{update.years}']();
            me['@{update.months}']();
        }
        data.set({
            dateValue: e.params.date
        });
        me['@{update.days}'](true);
        me['@{fire.event}']();
    },

    '@{setTime}<change>'(e) {
        e.stopPropagation();
        let me = this;
        if (!me['@{time.value.bak}']) {
            me['@{time.value.bak}'] = me.updater.get('timeValue');
        }
        me.updater.set({
            timeValue: e.time
        });
        me['@{update.days}'](true);
        me['@{fire.event}']();
    },

    '@{hide}<click>'(e) {
        let me = this;
        if (e.params.enter) {
            delete me['@{date.value.bak}'];
            delete me['@{time.value.bak}'];
            me['@{fire.event}'](true);
            return;
        }
        $('#' + me.id).trigger('cancel');
    },

    '@{prevent}<contextmenu>'(e) {
        e.preventDefault();
    }
});