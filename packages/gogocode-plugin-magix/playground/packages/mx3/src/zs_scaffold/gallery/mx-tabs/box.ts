/*md5:914525228a7da0126c6536607f6a0f93*/
/**
 * 盒状分组
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@box.less');

export default View.extend({
    tmpl: '@box.html',
    init(extra) {
        this.assign(extra);
    },
    assign(data) {
        let that = this;
        that.updater.snapshot();

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        let disabled = (data.disabled + '' === 'true') || $('#' + that.id)[0].hasAttribute('mx-disabled');

        let textKey = data.textKey || 'text',
            valueKey = data.valueKey || 'value';

        let originList;
        try {
            originList = (new Function('return ' + data.list))();
        } catch (e) {
            originList = data.list;
        }
        let list = (originList || []).map((item) => {
            return {
                ...item,
                tip: item.tips || item.tip || '', // 提示：兼容tips和tip
                color: disabled ? '#cccccc' : (item.color || ''),
                text: item[textKey],
                value: item[valueKey]
            }
        });

        let selected = data.selected || (list[0] || {})['value'];

        // box 类型
        //   spliter 分割线
        //   shadow 阴影效果的
        let mode = data.mode || 'spliter';
        if (['shadow', 'spliter', 'vertical'].indexOf(mode) < 0) {
            mode = 'spliter';
        }

        that.updater.set({
            mode,
            disabled,
            list,
            selected,
        });

        that['@{owner.node}'] = $('#' + that.id);
        that['@{owner.node}'].val(selected);

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },

    '@{select}<click>'(e) {
        this['@{select}'](e.params.item);
    },

    '@{select}'(item) {
        let that = this;
        let value = item.value;
        let { selected } = that.updater.get();
        if (selected == value) {
            return;
        }

        let event = $.Event('change', {
            item: item,
            value: value,
            text: item.text,
            selected: value
        });
        that['@{owner.node}'].trigger(event);
        if (!event.isDefaultPrevented()) {
            // 支持外部同步校验，event.preventDefault()
            that['@{owner.node}'].val(value);
            that.updater.digest({
                selected: value,
                hover: value
            })
        }
    }
});