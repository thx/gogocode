/*md5:b7e040915e3bfef74d2f00335c3a2b5f*/
import Magix, { Vframe } from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@branch.html',
    init(extra) {
        let { list, closeMap, highlightMap = {}, valueKey } = extra;
        list.forEach(item => {
            let val = item[valueKey];
            item.close = closeMap[val];
            item.highlight = highlightMap[val];
        })

        this.updater.set(extra);
    },
    render() {
        this.updater.digest({
            viewId: this.id
        });
    },
    '@{getCheckedState}'() {
        let me = this;
        let viewId = me.id;
        let hasChecked, hasUnchecked;
        $('#' + viewId + ' input[type="checkbox"][name="' + viewId + '"]').each((i, n) => {
            if (n.indeterminate) {
                hasChecked = hasUnchecked = true;
            } else if (n.checked) {
                hasChecked = true;
            } else {
                hasUnchecked = true;
            }
        });
        if (hasChecked && hasUnchecked) {
            return 3;
        } else if (hasChecked) {
            return 2;
        }
        return 1;
    },
    '@{checkParentState}'(key) {
        let me = this;
        let parent = me.owner.parent();
        let state = 0;
        if (parent) {
            let children = parent.children();
            for (var i = 0; i < children.length; i++) {
                if (children[i] == key) {
                    let vf = Vframe.get(children[i]);
                    if (vf) {
                        state |= vf.invoke('@{getCheckedState}');
                    }
                    break;
                }
            }

            let node = $('#cb_' + key);
            if (state === 3) {
                node.prop('indeterminate', true);
            } else {
                node.prop('indeterminate', false);
                node.prop('checked', state == 2);
            }
            parent.invoke('@{checkParentState}', [parent.id]);
        }
    },
    '@{checkAll}'(state) {
        let me = this;
        let viewId = me.id;
        $('#' + viewId + ' input[type="checkbox"][name="' + viewId + '"]')
            .prop('indeterminate', false)
            .prop('checked', state);
        let owner = me.owner;
        let children = owner.children();
        for (let c of children) {
            let vf = Vframe.get(c);
            if (vf) {
                vf.invoke('@{checkAll}', [state]);
            }
        }
    },
    '@{check}<change>'(e) {
        let me = this;
        let vf = Vframe.get(me.id + '_' + e.params.index);
        if (vf) {
            vf.invoke('@{checkAll}', [e.eventTarget.checked]);
        }
        me['@{checkParentState}'](me.id);
    },
    /**
     * 展开收起
     */
    '@{toggle}<click>'(e) {
        e.stopPropagation();
        let node = $(e.eventTarget);
        let index = e.params.index;
        let cName = '@index.less:close';
        let branch = $('#' + this.id + '_' + index);
        branch.toggleClass(cName);
        let { list, closeMap, valueKey } = this.updater.get();
        let value = list[index][valueKey];
        if (branch.hasClass(cName)) {
            node.html('&#xe65b;');
            closeMap[value] = true;
        } else {
            node.html('&#xe65a;');
            closeMap[value] = false;
        }
    },
    setCheckboxValues(bottomValues) {
        bottomValues = bottomValues.map(v => {
            return v + '';
        })
        let me = this;
        let viewId = me.id;
        let nodes = $('#' + viewId + ' input[type="checkbox"][name="' + viewId + '"]');
        nodes.each((i, n) => {
            if (bottomValues.indexOf(n.value + '') > -1) {
                n.checked = true;
            }
        });
        me['@{checkParentState}'](viewId);
    },

    /**
     * 多选
     * 获取叶子节点的值
     */
    getBottomInfos(type) {
        type = type || 'value';
        let me = this;
        let viewId = me.id;
        let result = {
            values: [],
            items: []
        };

        let { list } = me.updater.get();
        list.forEach((item, index) => {
            let children = item.children || [];
            if (children.length == 0) {
                // 当前节点为叶子节点时，才作为返回值
                let node = $('#cb_' + viewId + '_' + index);
                if (node && node[0] && node[0].checked) {
                    switch (type) {
                        case 'item':
                            // 完整对象
                            result.items.push(item);
                            break;

                        case 'value':
                            // value值
                            result.values.push(node[0].value);
                            break;

                        case 'all':
                            result.items.push(item);
                            result.values.push(node[0].value);
                            break;
                    }
                }
            }
        })
        return result;
    },

    /**
     * 多选
     * 子节点全选，获取父节点value
     */
    getRealInfos() {
        let me = this;
        let viewId = me.id;
        let values = [],
            items = [];

        let { list } = me.updater.get();
        list.forEach((item, index) => {
            let node = $('#cb_' + viewId + '_' + index);
            if (!node.prop('indeterminate') && node[0].checked && !item.isAll) {
                values.push(node[0].value);
                items.push(item);
            }
        })
        return {
            values,
            items
        };
    }
});