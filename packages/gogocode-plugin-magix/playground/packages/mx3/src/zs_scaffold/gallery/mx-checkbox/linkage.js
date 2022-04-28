/*md5:238feba0abf4376adf2c5f2d4ddca168*/
/**
 * mx-table使用，不再维护，集成到mx-stickytable中
 */
let $ = require('$');
let Magix = require('magix');
let FindNames = (node) => {
    node = $(node);
    let subs = node.find('input[linkage-parent]');
    let names = {};
    subs.each((idx, item) => {
        let name = $(item).attr('linkage-parent');
        names[name] = 1;
    });
    node.find('input[linkage]').each((idx, item) => {
        let name = $(item).attr('linkage');
        names[name] = 1;
    });
    return Magix.keys(names);
};
let SyncState = (node, checkbox, name) => {
    let all = node.find('input[linkage=' + name + ']');
    let subs = node.find('input[linkage-parent=' + name + ']');
    let parentToggle, //是否为父节点触发变化 
        parentChecked = all[0].checked; //父节点选中状态
    if (checkbox) {
        // 某个checkbox状态变化触发
        // 判断为父节点还是子节点
        parentToggle = (all[0] == checkbox);
    } else {
        // 默认由parent的初始化状态控制
        parentToggle = all[0].checked;
    }

    let subLen = subs.length,
        enabledLen = 0,
        disabledLen = 0,
        checkedLen = 0;
    subs.each((index, item) => {
        if (!item.disabled) {
            if (parentToggle) {
                item.checked = parentChecked;
            }
            if (item.checked) {
                checkedLen++;
            }
            enabledLen++;
        } else {
            disabledLen++;
        }
    });

    all.prop('checked', (checkedLen == enabledLen) && (checkedLen > 0) && (enabledLen > 0));
    all.prop('indeterminate', (checkedLen < enabledLen) && (checkedLen > 0) && (enabledLen > 0));
    all.prop('disabled', (disabledLen == subLen || subs.length == 0));
};
let ApplyTableCheckbox = (node, checkbox) => {
    node = $(node);
    let names = FindNames(node);
    if (names.length) {
        for (let name of names) {
            SyncState(node, checkbox, name);
        }
    }
};
module.exports = {
    ctor() {
        let me = this;
        me.on('rendered', () => {
            ApplyTableCheckbox('#' + me.id);
        });
        me.on('domready', () => {
            ApplyTableCheckbox('#' + me.id);
        });
    },
    getSelectedIds(name) {
        let ids = [];
        $('#' + this.id + ' input:checked').each((idx, input) => {
            let value = input.value;
            let node = $(input);
            let pName = node.attr('linkage-parent');
            if (pName && value && (!name || (name && name == pName))) {
                ids.push(input.value);
            }
        });
        return ids;
    },
    '$input[linkage-parent]<change>'(e) {
        ApplyTableCheckbox('#' + this.id, e.eventTarget);
    },
    '$input[linkage]<change>'(e) {
        ApplyTableCheckbox('#' + this.id, e.eventTarget);
    }
};