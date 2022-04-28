/*md5:a139b1757b2cd6e70472e11cf89b6818*/
import Magix from 'magix';
import * as $ from '$';
import * as View from '../mx-util/view';
Magix.applyStyle('@index.less');

export default View.extend({
    tmpl: '@db.html',
    init(extra) {
        this.assign(extra);
    },
    assign(extra) {
        let { data, closeMap, highlightMap = {}, valueKey } = extra;
        data.children.forEach(item => {
            let val = item[valueKey];
            item.close = closeMap[val];
            item.highlight = highlightMap[val];
        })

        this.updater.set(extra);
        return true;
    },
    render() {
        this.updater.digest();

        // 部分选中态
        let { data, viewId, mode, stateConstant } = this.updater.get();
        data.children.forEach((item, index) => {
            let node;
            if (mode == 'checkbox') {
                node = $(`#cb_${viewId}_${index}`);
                node.prop('indeterminate', (item.checkboxState == stateConstant.indeterminate));
            }

            if (item.highlight && node && node[0]) {
                // 滚动到可视范围之内
                if (node[0].scrollIntoViewIfNeeded) {
                    node[0].scrollIntoViewIfNeeded();
                } else if (node[0].scrollIntoView) {
                    node[0].scrollIntoView();
                }
            }
        })
    },

    '@{checkParentState}'() {
        let me = this;
        let { data, viewId, stateConstant } = me.updater.get();
        let parent = me.owner.parent();
        if (parent) {
            let hasChecked = false,
                hasUnchecked = false;
            data.children.forEach(item => {
                if (item.checkboxState == stateConstant.indeterminate) {
                    hasChecked = hasUnchecked = true;
                } else if (item.checkboxState == stateConstant.checked) {
                    hasChecked = true;
                } else {
                    hasUnchecked = true;
                }
            })

            // 更新父view数据状态
            let checkboxState = (hasChecked && hasUnchecked) ? stateConstant.indeterminate : (hasChecked ? stateConstant.checked : stateConstant.unchecked);
            data.checkboxState = checkboxState;

            let node = $(`#cb_${viewId}`);
            if (checkboxState == stateConstant.indeterminate) {
                node.prop('indeterminate', true);
            } else {
                node.prop('indeterminate', false);
                node.prop('checked', checkboxState == stateConstant.checked);
            }
            parent.invoke('@{checkParentState}');
        }
    },

    '@{check}<change>'(e) {
        let me = this;
        let index = e.params.index,
            checked = e.eventTarget.checked;
        let { data, stateConstant } = me.updater.get();
        data.children.forEach((item, i) => {
            if (index == i) {
                let _loop = (c) => {
                    if (c.children && c.children.length) {
                        c.children.forEach(cc => {
                            _loop(cc);
                        })
                    }

                    c.checkboxState = checked ? stateConstant.checked : stateConstant.unchecked;
                }
                _loop(item);
            }
        })
        me.updater.digest({
            data
        })
        me['@{checkParentState}'](me.id);
    },
    /**
     * 展开收起
     */
    '@{toggle}<click>'(e) {
        e.stopPropagation();
        let index = e.params.index;
        let { data, closeMap, valueKey } = this.updater.get();
        data.children[index].close = !data.children[index].close;
        let value = data.children[index][valueKey];
        closeMap[value] = data.children[index].close;
        this.updater.digest({
            data,
            closeMap
        })
    }
});