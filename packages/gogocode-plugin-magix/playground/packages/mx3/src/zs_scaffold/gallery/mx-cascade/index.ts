/*md5:483d1aac51b79a4aa434134b7094e7d3*/
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
import Util from '../mx-tree/util';
import * as I18n from '../mx-medusa/util';
import * as Monitor from '../mx-util/monitor';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@index.html',
    init(extra) {
        let that = this;

        that.updater.set({
            keyword: '',
            text: {
                search: I18n['dropdown.search'],
                empty: I18n['empty.text'],
            }
        })

        that['@{owner.node}'] = $('#' + that.id);
        that.assign(extra);

        Monitor['@{setup}']();
        that.on('destroy', () => {
            Monitor['@{remove}'](that);
            Monitor['@{teardown}']();

            ['@{search.delay.timer}', '@{anim.timer}', '@{delay.hover.timer}'].forEach(key => {
                if (that[key]) {
                    clearTimeout(that[key]);
                }
            })
        });
    },
    assign(extra) {
        let that = this;
        // 当前数据截快照
        that.updater.snapshot();

        let valueKey = extra.valueKey || 'value';
        let textKey = extra.textKey || 'text';
        let parentKey = extra.parentKey || 'pValue';

        // 是否支持搜索
        let searchbox = extra.searchbox + '' === 'true';

        // mx-disabled作为属性，动态更新不会触发view改变，兼容历史配置，建议使用disabled
        let disabled = (extra.disabled + '' === 'true') || $('#' + that.id)[0].hasAttribute('mx-disabled');

        // 点击展现或者hover展示
        // click
        // hover
        let triggerType = extra.triggerType || 'click';

        // 默认只能选择叶子节点
        // 只在triggerType=hover下支持，click下只能选择叶子
        let leafOnly = (extra.leafOnly + '' !== 'false');

        // 对齐方式：left right
        let align = extra.align || 'left';

        let emptyText = extra.emptyText;
        let originList = $.extend(true, [], extra.list);
        if (emptyText) {
            // 配置空状态值，添加一个空选项
            originList.unshift({
                [textKey]: emptyText,
                [valueKey]: '',
                [parentKey]: null
            })
        }

        let { map, list } = Util.listToTree(originList, valueKey, parentKey);
        that.updater.set({
            align,
            searchbox,
            disabled,
            placeholder: emptyText || I18n['choose'],
            valueKey,
            textKey,
            parentKey,
            map,
            list,
            expand: false,
            triggerType,
            leafOnly,
            width: that['@{owner.node}'].outerWidth(),
        })

        // 选择结果
        let result = that['@{get}'](extra.selected || '');
        that.updater.set(result);

        // altered是否有变化
        // true：有变化
        let altered = that.updater.altered();
        return altered;
    },
    render() {
        this.updater.digest();

        // 双向绑定
        this['@{owner.node}'].val(this.updater.get('selectedValue'));
    },
    '@{get}'(selectedValue) {
        let { valueKey, textKey, parentKey, placeholder, map, list } = this.updater.get();

        let selectedTexts = [],
            selectedValues = [],
            groups = [];

        // 恢复默认态
        let _end = (item) => {
            item.cur = false;
            item.hover = false;
            item.hide = false;
            if (item.children && item.children.length) {
                item.children.forEach(child => {
                    _end(child);
                })
            }
        }
        list.forEach(item => {
            _end(item);
        });

        if (selectedValue === '' || selectedValue === undefined || selectedValue === null || !map[selectedValue]) {
            // 1. 未选中
            // 2. 选中值不在可选列表中
            selectedValue = '';
            selectedValues = [];
            selectedTexts = [placeholder];
            list.forEach(item => {
                item.cur = item[valueKey] === '';
            });
            groups = [list];
        } else {
            // 已选中
            let _loop = (v) => {
                let i = map[v];
                selectedValues.unshift(i[valueKey] + '');
                selectedTexts.unshift(i[textKey]);
                if (i[parentKey] === '' || i[parentKey] === undefined || i[parentKey] === null) {
                    // 根节点
                    i.cur = true;
                    groups.unshift(list);
                } else {
                    i.cur = true;
                    let siblings = map[i[parentKey]].children;
                    groups.unshift(siblings);
                    _loop(i[parentKey]);
                }
            }
            _loop(selectedValue);
        }

        return {
            allHide: false,
            keyword: '', // 清空关键词
            groups,
            selectedValues,
            selectedTexts,
            selectedValue,
            selectedText: selectedTexts.join('/') // 结果框显示的拼接文案
        }
    },

    '@{inside}'(node) {
        return Magix.inside(node, this.id);
    },

    '@{hide}'(e) {
        let { expand } = this.updater.get();
        if (expand) {
            this.updater.digest({
                expand: false
            });

            this['@{owner.node}'].trigger('focusout');
            Monitor['@{remove}'](this);
        }
    },

    '@{toggle}<click>'(e) {
        let that = this;
        let { expand, disabled, selectedValue } = that.updater.get();
        if (disabled) {
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

        if (!expand) {
            // 重新获取数据，可能是切换之后未选择直接失去焦点了
            let result = that['@{get}'](selectedValue);
            result.expand = true;
            that.updater.digest(result);

            that['@{owner.node}'].trigger('focusin');
            Monitor['@{add}'](that);
        } else {
            that['@{hide}']();
        }
    },

    /**
     * trigger-type说明
     * 1. hover类型：hover展示
     * 2. click类型：点击展示
     */
    '@{select}<mouseover>'(e) {
        if (Magix.inside(e.relatedTarget, e.eventTarget)) {
            return;
        }

        let that = this;
        if (that.updater.get('animing')) {
            // 判断动画是否结束
            return;
        }

        clearTimeout(that['@{delay.hover.timer}']);
        that['@{delay.hover.timer}'] = setTimeout(that.wrapAsync(() => {
            let { selectedValues, valueKey, groups, triggerType } = that.updater.get();
            let { gIndex, iIndex } = e.params;
            let list = groups[gIndex];
            let item = list[iIndex];

            if (triggerType == 'hover') {
                // 置空当前列hover态
                list.forEach(i => {
                    i.hover = false;
                })
                item.hover = true;

                // hover展开子项时处理子项
                // 否则只更新hover态
                groups = groups.slice(0, gIndex + 1);
                if (item.children && item.children.length > 0) {
                    // hover有子节点
                    // 1. 恢复选中态
                    // 2. 置空hover态
                    item.children.forEach(c => {
                        c.hover = false;
                        c.cur = (selectedValues.indexOf(c[valueKey] + '') > -1);
                    })

                    groups.push(item.children);
                }
            } else {
                // 置空当前列hover态
                groups.forEach(l => {
                    l.forEach(i => {
                        i.hover = false;
                    })
                })
                item.hover = true;
            }

            that.updater.digest({
                groups
            })
        }), 150);
    },

    /**
    * trigger-type说明
    * 1. hover类型：hover展示
    *      叶子节点：需要点击事件，选中叶子节点
    *      非叶子：不需要点击事件 / 需要点击事件，选中该节点
    * 2. click类型：点击展示
    *      叶子节点：选中叶子节点
    *      非叶子：展开子项
    */
    '@{select}<click>'(e) {
        let that = this;
        let { selectedValues, valueKey, groups, triggerType, map, leafOnly } = that.updater.get();
        let { gIndex, iIndex } = e.params;
        let list = groups[gIndex];
        let item = list[iIndex];

        if (!item.children || !item.children.length ||
            (!leafOnly && item.children.length && triggerType == 'hover')) {
            // 可选中的节点
            // 1. 选中叶子节点
            // 2. hover展开，非叶子节点也可选中
            let selectedValue = item[valueKey];
            let result = that['@{get}'](selectedValue);
            that.updater.digest(result);

            let items = result.selectedValues.map(v => {
                return map[v];
            })
            let event = $.Event('change', {
                item,
                items,
                selected: selectedValue
            });
            that['@{owner.node}'].val(selectedValue).trigger(event);
            that['@{hide}']();
        } else {
            // 还有子节点
            if (triggerType == 'click') {
                // 点击展开子项时响应
                list.forEach(g => {
                    g.hover = false;
                    g.cur = false;
                })
                item.cur = true;
                item.hover = true;
                groups = groups.slice(0, gIndex + 1);

                // 恢复选中态
                item.children.forEach(c => {
                    c.cur = (selectedValues.indexOf(c[valueKey] + '') > -1);
                })

                groups.push(item.children);
                that.updater.digest({
                    groups
                })
            }
        }
    },

    /**
     * 展开时候单次搜索
     */
    '@{fn.search}'() {
        let that = this;
        let { list, map, selectedValue, keyword, textKey, valueKey, parentKey } = that.updater.get();

        if (!keyword) {
            return that['@{get}'](selectedValue);
        } else {
            let linkGap = `_${that.id}_`,
                hoverSearchVs = [], // 命中的第一个选项
                searchShowMap = {};
            let _end = (item) => {
                if ((item._search_text.indexOf(keyword) > -1) && (hoverSearchVs.length == 0)) {
                    hoverSearchVs = item._search_value.split(linkGap);
                }

                if (item.children && item.children.length) {
                    item.children.forEach(child => {
                        Magix.mix(child, {
                            _search_text: [item._search_text, child[textKey]].join(linkGap),
                            _search_value: [item._search_value, child[valueKey]].join(linkGap),
                        });
                        _end(child);
                    })
                } else {
                    // 叶子节点
                    if (item._search_text.indexOf(keyword) > -1) {
                        item._search_value.split(linkGap).forEach(v => {
                            searchShowMap[v] = true;
                        })
                    }
                }
            };
            list.forEach(item => {
                Magix.mix(item, {
                    _search_text: item[textKey] + '',
                    _search_value: item[valueKey] + '',
                });
                _end(item);
            });

            let allHide = true,
                groups = [];
            if (hoverSearchVs.length > 0) {
                let _loop = (v) => {
                    let i = map[v];
                    if (i[parentKey] === '' || i[parentKey] === undefined || i[parentKey] === null) {
                        // 根节点
                        list.forEach(s => {
                            s.hover = false;
                            s.hide = !searchShowMap[s[valueKey]];
                            allHide = allHide && s.hide;
                        })
                        i.hover = true;
                        groups.unshift(list);
                    } else {
                        let siblings = map[i[parentKey]].children;
                        siblings.forEach(s => {
                            s.hover = false;
                            s.hide = !searchShowMap[s[valueKey]];
                        })
                        i.hover = true;
                        groups.unshift(siblings);
                        _loop(i[parentKey]);
                    }
                }
                _loop(hoverSearchVs[hoverSearchVs.length - 1]);
            } else {
                // 无匹配项
                allHide = true;
                groups = [list];
            }

            return {
                allHide,
                groups,
            }
        }
    },

    '@{search}<change>'(e) {
        e.stopPropagation();

        let that = this;
        clearTimeout(that['@{search.delay.timer}']);
        let val = $.trim(e.eventTarget.value);
        that.updater.set({
            keyword: val
        });
        that['@{search.delay.timer}'] = setTimeout(that.wrapAsync(() => {
            if (val != that['@{last.value}']) {
                that['@{last.value}'] = val;
                let result = that['@{fn.search}']();
                that.updater.digest(result);
            }
        }), 250);
    },
});

