/*md5:3c68a0510dca789d5dc1a435aa061da4*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Util from './util';
import * as Monitor from '../mx-util/monitor';
import * as I18n from '../mx-medusa/util';
const { foreverStr: ForeverStr, padZero: PadZero, dateFormat: DateFormat, dateParse: DateParse, getDefaultDate: GetDefaultDate, getQuickInfos: GetQuickInfos, getOffsetDate: GetOffsetDate, parseDateType: ParseDateType } = Util;
Magix.applyStyle('@rangepicker.less');

export default View.extend({
    tmpl: '@datepicker.html',
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

        let dateInfo = $.extend(true, {}, extra);
        dateInfo.placeholder = dateInfo.placeholder || I18n['choose'];
        // 默认有箭头
        dateInfo.arrow = (dateInfo.arrow + '' !== 'false');
        that.updater.set({
            dateInfo
        })

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        that['@{ui.disabled}'] = (extra.disabled + '' === 'true') || $('#' + that.id)[0].hasAttribute('mx-disabled');
    },

    render() {
        // 没有selected默认不填充
        // if (!dateInfo.selected) {
        //     dateInfo.selected = GetDefaultDate(dateInfo.min, dateInfo.max, dateInfo.formatter);
        // }
        let that = this;
        that.updater.digest();
        that['@{owner.node}'] = $('#' + that.id);

        let { dateInfo } = that.updater.get();
        that['@{owner.node}'].val(dateInfo.selected || '');
    },
    '@{inside}'(node) {
        let that = this;
        return Magix.inside(node, that.id) || Magix.inside(node, that['@{owner.node}'][0]);
    },

    '@{stop}<change,focusin,focusout>'(e) {
        if (!e.dates) {
            e.stopPropagation();
        }
    },

    '@{toggle}<click>'(e) {
        let that = this;
        e.preventDefault();
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

        let show = that.updater.get('show');
        that[show ? '@{hide}' : '@{show}']();
    },

    '@{show}'() {
        let that = this;
        let { show, dateInfo } = that.updater.get();
        if (!show) {
            that.updater.digest({
                show: true
            })

            let inputNode = $('#trigger_' + that.id),
                calNode = $('#dpcnt_' + that.id);
            let left = 0,
                top = inputNode.outerHeight();
            if (dateInfo.align == 'right') {
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
        let show = that.updater.get('show');
        if (show) {
            that.updater.digest({
                show: false
            })

            that['@{owner.node}'].trigger('focusout');
            Monitor['@{remove}'](that);
        }
    },

    '@{date.picked}<change>'(e) {
        let that = this;
        e.stopPropagation();
        let dateInfo = that.updater.get('dateInfo');
        dateInfo.selected = e.date + (e.time ? ' ' + e.time : '');
        that.updater.digest({
            dateInfo: dateInfo
        })
        that['@{hide}']();

        // 通知外层数据更新
        that['@{owner.node}'].val(dateInfo.selected).trigger({
            type: 'change',
            date: e.date,
            time: e.time
        });
    },
    '@{hide}<cancel>'() {
        this['@{hide}']();
    }
});