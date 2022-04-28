/*md5:f983ddf7bedda15eef3d60821cb792f5*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Util from './util';
import * as Monitor from '../mx-util/monitor';
import * as I18n from '../mx-medusa/util';
const { foreverStr: ForeverStr, padZero: PadZero, dateFormat: DateFormat, dateParse: DateParse, getDefaultDate: GetDefaultDate, getQuickInfos: GetQuickInfos, getOffsetDate: GetOffsetDate, parseDateType: ParseDateType } = Util;
Magix.applyStyle('@rangepicker.less');

export default View.extend({
    tmpl: '@rangepicker.html',
    init(extra) {
        let that = this;

        Monitor['@{setup}']();
        that.on('destroy', () => {
            Monitor['@{remove}'](that);
            Monitor['@{teardown}']();

            if (that['@{anim.timer}']) {
                clearTimeout(that['@{anim.timer}']);
            }
        });

        that['@{owner.node}'] = $('#' + that.id);
        that.assign(extra);
    },

    assign(extra) {
        let that = this;

        // 当前数据截快照
        that.updater.snapshot();

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        that['@{ui.disabled}'] = (extra.disabled + '' === 'true') || $('#' + that.id)[0].hasAttribute('mx-disabled');

        // vsEnable 是否可对比，默认关闭
        // vs 对比初始状态 
        // vsSingle 可对比情况下，关闭对比时是选择时间段还是单天
        let vsEnable = (/^true$/i).test(extra.vsenable) || false,
            vs = false;
        if (vsEnable) {
            vs = (/^true$/i).test(extra.vs) || false;
        }
        let vsSingle = vsEnable ? ((/^true$/i).test(extra.single) || false) : false;

        let timeType = extra.timeType; //可选时分秒
        let formatter = extra.formatter || ('YYYY-MM-DD' + (timeType ? ' hh:mm:ss' : ''));
        let dateType = extra.dateType; //可选年月日
        let types = ParseDateType(dateType); //解析年月日
        if (types.day) {
            // 可选择日期
        } else {
            if (types.month) {
                // 可选择月份 
                formatter = formatter.slice(0, 7);
            } else {
                // 只可选择年份 
                formatter = formatter.slice(0, 4);
            }
        }

        // 快捷选项
        let startDisabled = (/^true$/i).test(extra.startDisabled) || false; //开始时间是否可选
        let endDisabled = (/^true$/i).test(extra.endDisabled) || false;//结束时间是否可选
        let showShortcuts = !(/^false$/i).test(extra.shortcuts); // 默认开启快捷选项的
        let quickDates = showShortcuts ? (extra.shortkeys || ['today', 'yesterday', 'preWeekMon', 'lastestWeekMon', 'preMonth', 'lastestThisMonth']) : [];
        if (startDisabled) {
            // 开始时间禁止使用的时候，只允许使用动态计算的快捷日期
            // 动态计算的都是依据开始时间计算的
            showShortcuts = false;
            for (var i = 0; i < quickDates.length; i++) {
                if ((quickDates[i].indexOf('dynamic') < 0) && (quickDates[i].indexOf('forever') < 0)) {
                    quickDates.splice(i--, 1);
                }
            }
        }
        if (endDisabled) {
            // 结束时间禁止选择的时候，不允许使用快捷方式
            showShortcuts = false;
            quickDates = [];
        }

        let { start, end, min, max } = extra;
        if (!start) {
            start = GetDefaultDate(min, max, formatter);
        }
        // 包含快捷方式不限的时候end=不限，不需默认初始化
        if (!end && (!showShortcuts || (quickDates.indexOf('forever') < 0))) {
            end = GetDefaultDate(min, max, formatter);
        }
        let dateStartStr = DateFormat(start, formatter);
        let dateStart = DateParse(dateStartStr);
        let dateEnd, dateEndStr;
        if (end == ForeverStr) {
            dateEnd = dateEndStr = ForeverStr;
        } else {
            dateEndStr = DateFormat(end, formatter);
            dateEnd = DateParse(dateEndStr);
        }

        // 快捷操作，检测是否匹配到快捷日期
        let quickInfos = GetQuickInfos(quickDates, dateStartStr, formatter);
        let quickDateText, quickDateKey;
        // 可能匹配到多个
        for (let index = 0; index < quickInfos.length; index++) {
            let q = quickInfos[index];
            if (q.start == dateStartStr && q.end == dateEndStr) {
                quickDateText = q.text;
                quickDateKey = q.key;
                break;
            }
        }

        let dates = {
            start: dateStart, //Date
            startStr: dateStartStr,
            end: dateEnd, //Date or Forever
            endStr: dateEndStr,
            formatter,
            quickDateText,
            quickDateKey
        }

        // 对齐方式
        let textAlign = extra.textAlign || 'center';
        if (['left', 'center', 'right'].indexOf(textAlign) < 0) {
            textAlign = 'center';
        }

        that.updater.set({
            rangeInfo: {
                min,
                max,
                timeType,
                dateType,
                formatter,
                quickDates,
                quickGap: extra.quickGap,
                align: extra.align,
                vsEnable,
                vs,
                vsSingle,
                startDisabled,
                endDisabled,
                dates,
                disabledWeeks: extra.disabledWeeks || [],
                minGap: +extra.minGap || 0,
                maxGap: +extra.maxGap || 0
            },
            textAlign,
        });

        // 开始时间和结束时间默认值可能被修改，修改则通知更新
        // 不同时区的时差问题 https://www.kancloud.cn/javascript-jdxia/web/1590503
        // that['@{fire}'](
        //     (extra.start !== dates.startStr) ||
        //     (extra.end !== dates.endStr)
        // );

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        this['@{fill.to.node}']();
    },

    '@{fill.to.node}'() {
        let that = this;
        let { dates, vs, vsSingle, formatter } = that.updater.get('rangeInfo');
        let { startStr, endStr, quickDateText } = dates;
        let today = DateFormat(GetOffsetDate(0), formatter),
            yesterday = DateFormat(GetOffsetDate(-1), formatter),
            tomorrow = DateFormat(GetOffsetDate(1), formatter);
        let map = {
            [today]: I18n['calendar.today'],
            [yesterday]: I18n['calendar.yesterday'],
            [tomorrow]: I18n['calendar.tomorrow']
        };
        let textFn = (str) => {
            return map[str] || str;
        };

        let strs = {
            centetTip: vs ? I18n['calendar.vs'] : I18n['calendar.to']
        }
        if (vs) {
            Magix.mix(strs, {
                startStr: textFn(startStr),
                endStr: textFn(endStr),
            })
        } else {
            // 非对比情况
            if (vsSingle) {
                // 选择单日
                Magix.mix(strs, {
                    startStr: textFn(startStr),
                })
            } else {
                // 选择连续时间
                if (quickDateText) {
                    if (quickDateText == ForeverStr) {
                        // 不限的情况显示开始时间
                        Magix.mix(strs, {
                            startStr,
                            endStr: ForeverStr,
                        })
                    } else {
                        Magix.mix(strs, {
                            startStr: quickDateText,
                        })
                    }
                } else {
                    Magix.mix(strs, {
                        startStr,
                        endStr,
                    })
                }
            }
        };
        that.updater.digest({ strs });
    },

    '@{stop}<change,focusin,focusout>'(e) {
        if (!e.dates) {
            e.stopPropagation();
        }
    },

    '@{toggle}<click>'(e) {
        e.preventDefault();
        let that = this;
        if (that['@{ui.disabled}'] || that.updater.get('animing')) {
            return;
        }

        // 扩散动画时长变量
        let ms = that['@{get.css.var}']('--mx-comp-expand-amin-timer');

        // 只记录状态不digest
        let node = e.eventTarget;
        that.updater.set({ animing: true })
        node.setAttribute('mx-comp-expand-amin', 'animing');
        that['@{anim.timer}'] = setTimeout(() => {
            node.setAttribute('mx-comp-expand-amin', 'animend');
            that.updater.set({ animing: false })
        }, ms.replace('ms', ''));

        let { show } = that.updater.get();
        that[show ? '@{hide}' : '@{show}']();
    },

    '@{show}'() {
        let that = this;
        let { rangeInfo, show } = that.updater.get();
        if (!show) {
            that.updater.digest({
                show: true
            })

            let inputNode = $('#trigger_' + that.id),
                calNode = $('#rpcnt_' + that.id);

            let left = 0,
                top = inputNode.outerHeight();
            if (rangeInfo.align == 'right') {
                left = inputNode.outerWidth() - calNode.outerWidth();
            }

            that.updater.digest({
                top,
                left
            })

            that['@{owner.node}'].trigger('focusin');
            Monitor['@{add}'](that);
        }
    },

    '@{hide}'() {
        let that = this;
        let { show } = that.updater.get();
        if (show) {
            that.updater.digest({
                show: false
            })

            // mx-form里对change和focusout事件都进行了监听
            // 多key值双向绑定的时候，change和focusout都从事件上取值，focusout也要传入改动值
            // that['@{owner.node}'].trigger('focusout');
            let { dates, vs } = this.updater.get('rangeInfo');
            that['@{owner.node}'].trigger({
                type: 'focusout',
                start: dates.startStr,
                end: dates.endStr,
                vs: vs,
                dates: dates
            });
            Monitor['@{remove}'](that);
        }
    },

    '@{range.picked}<change>'(e) {
        let that = this;
        e.stopPropagation();

        let { rangeInfo } = that.updater.get();
        let { dates, vs } = e;
        that.updater.set({
            rangeInfo: Magix.mix(rangeInfo, {
                dates: dates,
                vs: vs
            })
        })

        that['@{fill.to.node}']();
        that['@{hide}']();
        that['@{fire}'](true);
    },

    '@{fire}'(fire) {
        let { dates, vs } = this.updater.get('rangeInfo');
        this['@{owner.node}'].val(JSON.stringify({
            start: dates.startStr,
            end: dates.endStr,
            vs: vs
        }));
        if (fire) {
            // 支持多绑定
            // 多绑定value直接从event上取
            this['@{owner.node}'].trigger({
                type: 'change',
                start: dates.startStr,
                end: dates.endStr,
                vs: vs,
                dates: dates
            });
        }
    },

    '@{hide}<cancel>'(e) {
        e.stopPropagation();
        this['@{hide}']();
    },

    '@{inside}'(node) {
        let that = this;
        let inView = Magix.inside(node, that.id) ||
            Magix.inside(node, that['@{owner.node}'][0]);
        if (!inView) {
            let children = that.owner.children();
            for (let i = children.length - 1; i >= 0; i--) {
                let child = Magix.Vframe.get(children[i]);
                if (child) {
                    inView = child.invoke('@{inside}', [node]);
                }
                if (inView) break;
            }
        }
        return inView;
    }
});