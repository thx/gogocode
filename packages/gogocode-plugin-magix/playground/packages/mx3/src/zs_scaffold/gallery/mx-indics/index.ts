/*md5:b99ea8a293e5795674973c4958140de1*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import * as Dialog from '../mx-dialog/index';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    mixins: [Dialog],
    init(e) {
        this.assign(e);
    },
    assign(e) {
        let that = this;
        that.updater.snapshot();

        let textKey = e.textKey || 'text',
            valueKey = e.valueKey || 'value',
            parentKey = e.parentKey || 'pValue';
        let fields = [];
        (e.fields || []).forEach(item => {
            fields.push(Magix.mix(item, {
                text: item[textKey],
                value: item[valueKey],
                pValue: item[parentKey]
            }));
        })

        let parents = [];
        (e.parents || []).forEach(item => {
            parents.push(Magix.mix(item, {
                text: item[textKey],
                value: item[valueKey]
            }))
        })

        // 方便判断
        let customs = (e.customs || []).map(v => {
            return '' + v;
        });
        let defaults = (e.defaults || []).map(v => {
            return '' + v;
        });

        // 当自定义为空时，默认为defaults
        if (customs.length == 0) {
            customs = defaults;
        }

        // 可选指标上限 max，历史配置指标为limit
        let max = +e.max || +e.limit || 0;

        // 最少选择下限，至少要选择一个才可提交
        let min = +e.min || 1;

        // 是否可排序
        let sortable = (e.sortable + '' === 'true');

        // lineNumber：每行个数，默认情况下
        // 可排序：一行四个
        // 不可排序：一行五个
        let lineNumber = e.lineNumber || (sortable ? 4 : 5);

        // 组件使用模式
        // 1. mode=all：支持自定义和默认值切换
        // 2. mode=custom：只支持自定义（两种展现样式，icon or 文案版）
        //      display=icon：icon样式
        //      display=text：文案样式
        //      display=flat：平铺展示
        let mode = e.mode || 'all';
        let display = e.display || that['@{get.css.var}']('--mx-indics-custom-display', 'icon'),
            displayText = e.displayText || '指标';

        // 1 默认
        // 2 自定义
        let map = {
            1: {
                label: '默认数据',
                list: defaults
            },
            2: {
                label: '自定义数据',
                list: customs
            }
        }
        let type;
        switch (mode) {
            case 'all':
                type = (e.custom + '' === 'true') ? 2 : 1;
                break;

            case 'custom':
                type = 2;
                break;
        }

        this.updater.set({
            disabled: (e.disabled + '' === 'true'), // 是否禁用
            fieldsMap: Magix.toMap(fields, 'value'),
            data: {
                mode,
                display,
                displayText,
                parents,
                fields,
                sortable,
                lineNumber,
                max,
                min,
                map,
                type,
                tip: e.tip || ''
            }
        })

        // altered是否有变化 true：有变化
        let altered = that.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();
    },

    'toggleDefault<click>'(e) {
        let data = this.updater.get('data');
        data.type = (data.type == 1) ? 2 : 1;
        this.updater.digest({ data });
        this['@{fire}']('btn-switch');
    },

    '@{fire}'(triggerType) {
        let that = this;
        let { type, map } = that.updater.get('data');
        $('#' + that.id).trigger({
            type: 'change',
            triggerType,
            defaults: map[1].list,
            custom: (type == 2), //是否为自定义指标
            customs: map[2].list
        });
    },

    /**
     * 开浮层编辑了就是自定义数据了 
     */
    'show<click>'(e) {
        e.preventDefault();

        let that = this;
        let viewOptions = $.extend(true, {}, that.updater.get('data'));
        viewOptions.selected = viewOptions.map[viewOptions.type].list;
        viewOptions.callback = (d) => {
            // 自定义数据
            let data = that.updater.get('data');
            data.type = 2;
            data.map[data.type]['list'] = d.selected;
            that.updater.digest({
                data
            });
            that['@{fire}']('dialog-setting');
        };
        that.mxModal('@./dialog', viewOptions, {
            width: 1000,
            closable: false,
            card: false
        });
    },

    /**
     * 重新排序
     */
    'drag<dragfinish>'(e) {
        let selected = [];
        let drags = document.querySelectorAll('#' + this.id + ' .@index.less:drag');
        for (let i = 0, len = drags.length; i < len; i++) {
            let attrs = drags[i].attributes;
            selected.push(attrs['data-value'].value);
        };
        let data = this.updater.get('data');
        data.map[data.type]['list'] = selected;
        this.updater.digest({
            data
        });
        this['@{fire}']('dialog-setting');
    },
});

