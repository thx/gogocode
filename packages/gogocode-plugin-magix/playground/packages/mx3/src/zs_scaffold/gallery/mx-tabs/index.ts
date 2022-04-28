/*md5:4621b99290e55c7fb88a2da2c4b3afeb*/
/**
 * 底边线tab切换
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        this.assign(extra);
    },
    assign(data) {
        let that = this;
        that.updater.snapshot();

        //你可以在这里对数据data进行加工,然后通过set方法放入到updater中
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
                disabled: (item.disabled + '' === 'true'),
                text: item[textKey],
                value: item[valueKey]
            }
        });
        let selected = data.selected || (list[0] || {})['value'];

        // 展示类型
        //    shrink 底边线收缩
        //    edit 可编辑样式
        let mode = data.mode, allowModeMap = { shrink: true, edit: true };
        if (!allowModeMap[mode]) {
            mode = 'shrink';
        }

        // mode=edit时参数，是否支持编辑，默认true
        let editable = (data.editable + '' !== 'false');

        // pipeline导航特有字段
        let color = data.color || '#FF0036';
        let colorGradient = data.colorGradient || color;

        that.updater.set({
            mode,
            list,
            selected,
            color,
            colorGradient,
            editable,
        });

        // 双向绑定
        that['@{owner.node}'] = $('#' + that.id);
        that['@{owner.node}'].val(selected);

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },

    '@{remove}<click>'(e) {
        // 阻断@{select}
        e.stopPropagation();
        let that = this;
        let { selected, list } = that.updater.get();
        let index = e.params.index;
        let item = list[index];

        // 移除当前项
        list.splice(index, 1);

        if (selected == item.value) {
            // 当移除当前选中项时，更新到第一个
            that['@{select}'](list[0]);
        } else {
            // list更新了，强制change
            let item = {};
            for (let i = 0; i < list.length; i++) {
                if (list[i].value == selected) {
                    item = list[i];
                    break;
                }
            }
            that['@{select}'](item, true);
        }
    },

    '@{add}<click>'(e) {
        let { list } = this.updater.get();
        this['@{owner.node}'].trigger($.Event('add', {
            list,
        }));
    },

    '@{select}<click>'(e) {
        this['@{select}'](e.params.item);
    },

    '@{select}'(item, force) {
        let that = this;

        // 兼容编辑场景list删空
        item = item || {};
        let value = (item.value === null || item.value === undefined) ? '' : item.value;

        let { selected, list } = that.updater.get();
        if (!force && (selected == value)) {
            return;
        }

        let event = $.Event('change', {
            list, // 可编辑状态下，list会变更，此处也返回
            item,
            value,
            text: item.text,
            selected: value
        });
        that['@{owner.node}'].trigger(event);
        if (!event.isDefaultPrevented()) {
            // 支持外部同步校验，event.preventDefault()
            that['@{owner.node}'].val(value);
            that.updater.digest({
                list,
                selected: value,
                hover: value
            })
        }
    }
});