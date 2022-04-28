/*md5:84bfa37492be12a44bc22ccfe830b833*/
/**
 * 单选多选混合选择：https://aone.alibaba-inc.com/req/33785293
 * demo：https://done.alibaba-inc.com/file/lKXtJBCkVypm/QMr2WG4FxSpLd7w4/preview?aid=4B516C1E-F859-4562-B011-124598902CED
 */
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@../mx-tabs/box.less');

export default View.extend({
    tmpl: '@box.html',
    init(ops) {
        this.assign(ops);
    },
    assign(ops) {
        let that = this;
        that.updater.snapshot();

        // mode
        // single：单选
        // multiple：多选
        // combine：单选多选混合
        let mode = ops.mode || 'single';

        // 整体禁用
        let disabled = (ops.disabled + '' === 'true');

        // 已选中数据
        let selectedMap = [];
        if ($.isArray(ops.selected)) {
            // 数组，保留初始数据状态，双向绑定原样返回
            that['@{bak.type}'] = 'array';
            ops.selected.forEach(v => {
                selectedMap[v] = true;
            })
        } else {
            // 字符串
            ((ops.selected === undefined || ops.selected === null) ? [] : (ops.selected + '').split(',')).map(v => {
                selectedMap[v] = true;
            })
        }

        that['@{origin.list}'] = JSON.parse(JSON.stringify(ops.list || []));
        let textKey = ops.textKey || 'text',
            valueKey = ops.valueKey || 'value';
        let list = that['@{origin.list}'].map(item => {
            let v = item[valueKey];
            return {
                ...item,
                tip: item.tips || item.tip || '', // 提示：兼容下tips和tip
                text: item[textKey],
                value: v,
                selected: selectedMap[v],
                multiple: (mode == 'multiple') || (mode == 'combine' && item.multiple + '' === 'true'),
            }
        });

        if (mode == 'combine') {
            // 混合模式下，单选在前
            let lasts = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].multiple) {
                    lasts = lasts.concat(list.splice(i--, 1));
                }
            }
            list = list.concat(lasts);
        }

        that.updater.set({
            minWidth: ops.minWidth ? (ops.minWidth + 'px') : 'calc(var(--font-size)*8)',
            textKey,
            valueKey,
            disabled,
            mode,
            list,
            selectedMap,
        });

        that['@{owner.node}'] = $('#' + that.id);
        that['@{val}']();

        let altered = that.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },

    '@{val}'() {
        let that = this;
        let { selectedMap } = that.updater.get();
        let values = Object.keys(selectedMap);
        if (that['@{bak.type}'] == 'array') {
            that['@{owner.node}'].val(values);
        } else {
            that['@{owner.node}'].val(values.join(','));
        }
    },

    '@{select}<click>'(e) {
        let that = this;
        let { list, selectedMap: oldSelectedMap, valueKey } = that.updater.get();
        let curItem = e.params.item, selectedMap = {};
        if (curItem.multiple) {
            // 多选，删除所有单选项
            list.forEach(item => {
                if (item.multiple) {
                    if (item.value == curItem.value) {
                        item.selected = !item.selected;
                    };
                    if (item.selected) {
                        selectedMap[item.value] = true;
                    }
                } else {
                    item.selected = false;
                }
            })
        } else {
            // 单选，删除所有多选项
            list.forEach(item => {
                if (item.multiple) {
                    item.selected = false;
                } else {
                    item.selected = (item.value == curItem.value);
                    if (item.selected) {
                        selectedMap[item.value] = true;
                    }
                }
            })
        }
        if (Object.keys(selectedMap).join(',') == Object.keys(oldSelectedMap).join(',')) {
            return;
        }

        let items = [];
        that['@{origin.list}'].forEach(item => {
            if (selectedMap[item[valueKey]]) {
                items.push(item);
            }
        });
        let values = Object.keys(selectedMap);
        let event = $.Event('change', {
            items,
            values,
            selected: (that['@{bak.type}'] == 'array') ? values : values.join(',')
        });
        that.updater.digest({ selectedMap });

        that['@{val}']();
        that['@{owner.node}'].trigger(event);
    },
});
