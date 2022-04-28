/*md5:cd982eb153d5a0ff6acb5c9fffff181f*/
/**
 * 包含dom操作，展开收起有缓动效果
 * 缺点：数据量大时可能性能较差
 */
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import Util from './util';
import * as I18n from '../mx-medusa/util';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(ops) {
        // 保留历史展开收起状态
        this['@{close.map}'] = {};
        this['@{owner.node}'] = $('#' + this.id);

        this.assign(ops);
    },
    assign(ops) {
        let me = this;
        me.updater.snapshot();

        // 选择模式mode
        //      checkbox：多选（默认）
        //      radio：单选
        //      readonly：只读
        // 兼容老的只读配置read-only=true的api
        let mode = ops.mode || ((ops.readOnly + '' === 'true') ? 'readonly' : 'checkbox');
        if (['checkbox', 'radio', 'readonly'].indexOf(mode) < 0) {
            mode = 'checkbox';
        }

        // 取值key
        let valueKey = ops.valueKey || 'value';
        let textKey = ops.textKey || 'text';
        let parentKey = ops.parentKey || 'pValue';

        // 是否有连接线
        let hasLine = (ops.hasLine + '') === 'true';

        // 是否需要全选功能，默认关闭
        let needAll = (ops.needAll + '') === 'true';
        if (mode == 'radio') {
            needAll = false;
        }

        // 是否可展开收起，默认false
        let needExpand = (ops.needExpand + '') === 'true';

        // 是否支持搜索
        let searchbox = (ops.searchbox + '') === 'true';

        // 搜索框宽度
        let width = ops.width || '100%';
        if (width.indexOf('%') < 0 && width.indexOf('px') < 0) {
            width += 'px';
        }

        // 保留原始数据
        me['@{origin.list}'] = ops.list || [];

        // 组织树状结构
        let info = Util.listToTree(ops.list, valueKey, parentKey);
        let list;
        if (needAll) {
            let all = {
                [valueKey]: me.id + '_all',
                [textKey]: I18n['select.all'],
                isAll: true,
                children: info.list,
            };
            list = [all];
        } else {
            list = info.list
        }

        // 叶子节点的选中结果
        let valueType = 'bottom';
        let bottomValues = (ops.bottomValues || []).map(val => {
            return val + '';
        });
        if (mode == 'checkbox' && ops.hasOwnProperty('realValues')) {
            // 多选
            // 汇总到父节点的选中值，realValues
            // 转成叶子节点选中值
            valueType = 'real';
            bottomValues = [];
            let realValues = (ops.realValues || []).map(val => {
                return val + '';
            })
            let _lp1 = (arr, match) => {
                arr.forEach(item => {
                    let val = item[valueKey] + '';
                    if (item.children && item.children.length > 0) {
                        _lp1(item.children, (match || (realValues.indexOf(val) > -1)));
                    } else {
                        // 叶子节点
                        if (match || (realValues.indexOf(val) > -1)) {
                            bottomValues.push(val);
                        }
                    }
                })
            }
            list.forEach(item => {
                let val = item[valueKey] + '';
                let match = (realValues.indexOf(val) > -1);
                if (item.children && item.children.length) {
                    _lp1(item.children, match);
                } else {
                    if (match) {
                        bottomValues.push(val);
                    }
                }
            })
        } else if (mode == 'radio') {
            // 单选：结构统一
            // 任意节点可选，realValue
            // 仅叶子节点可选，bottomValue
            if (ops.hasOwnProperty('realValue')) {
                valueType = 'real';
                if (ops.realValue !== undefined && ops.realValue !== null) {
                    bottomValues = [ops.realValue];
                }
            } else {
                if (ops.bottomValue !== undefined && ops.bottomValue !== null) {
                    bottomValues = [ops.bottomValue];
                }
            }
        }

        // 展开收起状态，默认false
        // 切换数据时保留历史展开收起状态
        let close = (ops.close + '') === 'true';
        let map = {};
        let _lp2 = (arr) => {
            arr.forEach(item => {
                map[item[valueKey]] = close;
                if (item.children && item.children.length > 0) {
                    _lp2(item.children);
                }
            })
        }
        _lp2(list);
        me['@{close.map}'] = Magix.mix(map, me['@{close.map}']);

        me.updater.set({
            viewId: me.id,
            ownerId: me.id,
            searchbox,
            width,
            keyword: me['@{last.value}'] = '',
            mode,
            hasLine,
            needExpand,
            valueType,
            valueKey,
            textKey,
            parentKey,
            list,
            closeMap: me['@{close.map}'],
            highlightMap: {},
            bottomValues, // checkbox 选中值
        });

        // altered是否有变化 true：有变化
        let altered = me.updater.altered();
        return altered;
    },

    render() {
        this.updater.digest();

        let { mode, bottomValues } = this.updater.get();
        if (bottomValues.length > 0) {
            // 恢复选中值
            if (mode == 'checkbox') {
                // 多选
                this.loop((vf) => {
                    vf.invoke('setCheckboxValues', [bottomValues]);
                });
            } else if (mode == 'radio') {
                // 单选
                this.setRadioValue();
            }
        }

        // 双向绑定
        this['@{trigger}']();
    },

    setRadioValue() {
        let { viewId, ownerId, bottomValues } = this.updater.get();
        let node = $(`#${viewId} input[type="radio"][name="${ownerId}"][value="${bottomValues[0]}"]`);
        if (node[0]) {
            node[0].checked = true;
        }
    },

    '@{change}<change>'(e) {
        e.stopPropagation();
        this['@{trigger}'](true);
    },

    '@{trigger}'(trigger) {
        let me = this;
        let { valueType, mode, ownerId } = me.updater.get();
        if (mode == 'readonly') {
            // 只读模式无需绑定
            return;
        }

        if (mode == 'checkbox') {
            // 多选
            let { values, items } = me[`get${valueType.slice(0, 1).toUpperCase() + valueType.slice(1)}`]();
            me['@{owner.node}'].val(values);
            if (trigger) {
                me['@{owner.node}'].trigger($.Event('change', {
                    [`${valueType}Values`]: values,
                    [`${valueType}Items`]: items
                }));
            }
        } else if (mode == 'radio') {
            // 单选
            let selectedRadio = $(`#${me.id} input[type="radio"][name="${ownerId}"]:checked`);
            let value = selectedRadio[0] ? selectedRadio[0].value : '';
            me['@{owner.node}'].val(value);
            if (trigger) {
                me['@{owner.node}'].trigger($.Event('change', {
                    [`${valueType}Value`]: value,
                }));
            }
        }
    },

    /**
     * 向上汇总的节点，即子节点全选时，获取值为父节点value
     */
    getReal() {
        let me = this;
        let allValues = [], allItems = [];
        me.loop((vf) => {
            let result = vf.invoke('getRealInfos');
            allValues = allValues.concat(result.values);
            allItems = allItems.concat(result.items);
        })

        let pMap = {};
        let { parentKey, valueKey } = me.updater.get();
        me['@{origin.list}'].forEach(item => {
            pMap[item[valueKey]] = item[parentKey];
        });

        let realValues = [], realItems = [];
        for (let i = 0; i < allValues.length; i++) {
            let pValue = pMap[allValues[i]];
            if (!pValue || (allValues.indexOf(pValue + '') < 0)) {
                // 只保留父节点
                // 1. 无父节点
                // 2. 父节点不在选中集合里
                realValues.push(allValues[i]);
                realItems.push(allItems[i]);
            }
        }
        return {
            values: realValues,
            items: realItems
        };
    },

    getBottom() {
        let bottomValues = [], bottomItems = [];
        this.loop((vf) => {
            let { values, items } = vf.invoke('getBottomInfos', ['all']);
            bottomValues = bottomValues.concat(values);
            bottomItems = bottomItems.concat(items);
        })
        return {
            values: bottomValues,
            items: bottomItems
        };
    },

    getBottomValues() {
        let bottomValues = [];
        this.loop((vf) => {
            let { values } = vf.invoke('getBottomInfos', ['value']);
            bottomValues = bottomValues.concat(values);
        })
        return bottomValues;
    },

    getBottomItems() {
        let bottomItems = [];
        this.loop((vf) => {
            let { items } = vf.invoke('getBottomInfos', ['item']);
            bottomItems = bottomItems.concat(items);
        })
        return bottomItems;
    },

    loop(fn) {
        let me = this;
        let children = me.owner.children();
        let _loop = (children) => {
            for (let c of children) {
                if (c.startsWith('tree_')) {
                    // 每一个view只获取当前view的input选中态：不获取其子view的选中
                    let vf = Vframe.get(c);
                    fn(vf);

                    let cc = vf.children();
                    if (cc && (cc.length > 0)) {
                        _loop(cc);
                    }
                }

            }
        }
        _loop(children);
    },

    /**
     * 展开+命中高亮
     */
    '@{fn.search}'(val) {
        let me = this;
        let { textKey, valueKey, parentKey, mode } = me.updater.get();
        let lowVal = (val + '').toLocaleLowerCase();

        let originList = me['@{origin.list}'], originMap = {};
        originList.forEach(item => {
            // 有搜索值时：所有都收起
            // 无搜索值时：所有都展开
            me['@{close.map}'][item[valueKey]] = !!lowVal;
            originMap[item[valueKey]] = item;
        })

        // 搜索命中的匹配值
        me['@{highlight.map}'] = {};

        if (lowVal) {
            let list = [];
            for (let i = 0; i < originList.length; i++) {
                let item = originList[i];
                let it = (item[textKey] + '').toLocaleLowerCase(),
                    iv = (item[valueKey] + '').toLocaleLowerCase();
                if (it.indexOf(lowVal) > -1 || iv.indexOf(lowVal) > -1) {
                    list.push(item);
                    me['@{highlight.map}'][item[valueKey]] = true;
                }
            }
            if (list.length > 0) {
                // 命中值的父节点全部展开
                let lp = (item) => {
                    if (item[parentKey]) {
                        me['@{close.map}'][item[parentKey]] = false;
                        lp(originMap[item[parentKey]]);
                    }
                }
                list.forEach(item => {
                    lp(item);
                })
            }
        }

        let bottomValues = me.getBottomValues();
        me.updater.digest({
            closeMap: me['@{close.map}'],
            highlightMap: me['@{highlight.map}'],
            bottomValues,
        })
        if (bottomValues.length > 0) {
            if (mode == 'checkbox') {
                // 多选恢复选中值
                me.loop((vf) => {
                    vf.invoke('setCheckboxValues', [bottomValues]);
                });
            } else if (mode == 'radio') {
                me.setRadioValue();
            }
        }
    },

    '@{search}<change>'(e) {
        e.stopPropagation();

        let me = this;
        clearTimeout(me['@{search.delay.timer}']);
        let val = $.trim(e.eventTarget.value);
        me.updater.set({
            keyword: val
        });
        me['@{search.delay.timer}'] = setTimeout(me.wrapAsync(() => {
            if (val != me['@{last.value}']) {
                me['@{fn.search}'](me['@{last.value}'] = val);
            }
        }), 250);
    },
});