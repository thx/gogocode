/*md5:6c37481e9e445513fc5032b59a70f398*/
/**
 * mx-table使用，不再维护，集成到mx-stickytable中
 */
let $ = require('$');
let Magix = require('magix');
module.exports = {
    ctor() {
        let me = this;
        me['@{state.store}'] = {};
        let ready = e => {
            let state = me['@{state.store}'];
            let ipts = $('#' + (e.id || me.id) + ' input[linkage-parent]');
            ipts.each((idx, item) => {
                let linkName = $(item).attr('linkage-parent');
                let object = state[linkName] || (state[linkName] = {});
                if (item.checked) {
                    object[item.value] = 1;
                } else {
                    if (object && object[item.value] == 1) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                }
            });
        };
        me.on('domready', ready);
    },

    /**
     * 清除选择
     */
    clearStoreState(parent, children) {
        let me = this;
        let store = this['@{state.store}'];

        if (!parent) {
            // 全部清空
            this['@{state.store}'] = {};
            $('#' + me.id).find('input[linkage]').prop('checked', false);
            $('#' + me.id).find('input[linkage-parent]').prop('checked', false);
        } else {
            if (!children) {
                // 清空某一个父节点
                delete this['@{state.store}'][parent];
                $('#' + me.id).find(`input[linkage="${parent}"]`).prop('checked', false);
                $('#' + me.id).find(`input[linkage-parent="${parent}"]`).prop('checked', false);
            } else {
                // 清空子节点  children = string / array
                let childList = [];
                if ($.isArray(children)) {
                    childList = children;
                } else {
                    childList = (children + '').split(',');
                }
                childList.forEach(child => {
                    delete this['@{state.store}'][parent][child];
                    let childNode = $('#' + me.id).find(`input[linkage-parent="${parent}"][value="${child}"]`);
                    if (childNode[0].checked) {
                        childNode.prop('checked', false)
                        childNode.trigger('change');
                    }
                })
            }
        }
    },

    /**
    * 设置mx-table 中checkbox，无参数代表设置全选
    * @param {*} parent
    * @param {*} children 选中的值
    */
    setStoreState(parent, children) {
        let me = this;
        
        if (!parent) {
            $('#' + me.id).find('input[linkage]').prop('checked', true);
            $('#' + me.id).find('input[linkage-parent]').prop('checked', true).trigger('change');
        } else {
            if (!children) {
                $('#' + me.id).find(`input[linkage="${parent}"]`).prop('checked', true);
                $('#' + me.id).find(`input[linkage-parent="${parent}"]`).prop('checked', true).trigger('change');
            } else {
                let childList = [];
                if ($.isArray(children)) {
                    childList = children;
                } else {
                    childList = (children + '').split(',');
                }
                childList.forEach(child => {
                    let childNode = $('#' + me.id).find(`input[linkage-parent="${parent}"][value="${child}"]`);
                    if (childNode[0].checked) {
                        childNode.prop('checked', true);
                        childNode.trigger('change');
                    }
                })
            }
        }
    },

    getStoreState(parent) {
        let store = this['@{state.store}'];
        let keys = [];
        let value;
        if (parent) {
            value = store[parent];
            if (value) {
                keys = Magix.keys(value);
            }
        } else {
            for (let p in store) {
                value = store[p];
                if (value) {
                    keys = keys.concat(Magix.keys(value));
                }
            }
        }
        return keys;
    },
    '$input[linkage-parent]<change>'(e) {
        let me = this;
        let node = $(e.eventTarget);
        let value = node.val();
        let linkName = node.attr('linkage-parent');
        if (value) {
            let object = me['@{state.store}'][linkName];
            if (!object) {
                object = me['@{state.store}'][linkName] = {};
            }
            if (!node[0].disabled && node[0].checked) {
                object[value] = 1;
            } else {
                delete object[value];
            }
        }
    },
    '$input[linkage]<change>'(e) {
        let me = this;
        let linkName = $(e.eventTarget).attr('linkage');
        let object = me['@{state.store}'][linkName];
        if (!object) {
            object = me['@{state.store}'][linkName] = {};
        }
        $('#' + me.id + ' input[type=checkbox]').each((index, input) => {
            input = $(input);
            let tempName = input.attr('linkage-parent');
            let value = input.val();
            if (value && (tempName == linkName)) {
                if (input[0].disabled) {
                    delete object[value];
                } else {
                    if (e.target.checked) {
                        object[value] = 1;
                    } else {
                        delete object[value];
                    }
                }
            }
        });
    }
};