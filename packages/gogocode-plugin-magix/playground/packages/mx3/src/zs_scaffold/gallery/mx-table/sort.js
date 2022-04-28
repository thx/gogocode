/*md5:879ab2e3f664a716bf44a5ea7b7a0467*/
/**
 * mx-table使用，不再维护，集成到mx-stickytable中
 * 
 * table场景
 * 1. 一个view多个table
 * 2. 多个table嵌套
 */
let $ = require('$');
let Magix = require('magix');
let Router = Magix.Router;
let Map = {
    desc: '&#xe6cd;',
    asc: '&#xe6ce;',
    default: '&#xe6cc;'
}
module.exports = {
    ctor() {
        let me = this;
        let ready = () => {
            let locParams = Router.parse().params;
            let context = $('#' + me.id);

            ['mx-table/index', 'mx-table/excel'].forEach(tableKey => {
                // 按照table区分
                // 1. 一个view可能多个table
                // 2. view的子view还可能包含table
                // =====================================
                // 处理步骤
                // 1. 先过滤出本view的table，不包含子view
                // 2. 过滤出单个table的trigger
                let tables = context.find(`[mx-view*="${tableKey}"]`);
                for (let i = 0; i < tables.length; i++) {
                    let t = tables[i];

                    // 是否为子table，节点取出来是有序的，判断当前这个table是否为前序table的子集即可判断是否为子table
                    let isChild = false;
                    for (let j = 0; j < i; j++) {
                        let p = tables[j];
                        if (Magix.inside(t, p)) {
                            isChild = true;
                            break;
                        }
                    }

                    // 只过滤出当前view的table
                    if (!isChild) {
                        // 过滤出当前table的trigger
                        let triggers = t.querySelectorAll('[sort-trigger]');
                        for (let k = 0; k < triggers.length; k++) {
                            let item = $(triggers[k]);
                            let closestTable = item.closest(`[mx-view*="${tableKey}"]`);
                            if (closestTable[0] == t) {
                                let field = item.attr('sort-trigger');

                                // 保留在地址栏的排序字段key
                                let orderFieldKey = item.attr('order-field-key') || 'orderField';
                                // 当前排序字段
                                let orderField = item.attr('sort-field') || locParams[orderFieldKey];

                                // 保留在地址栏的排序方式key
                                let orderByKey = item.attr('order-by-key') || 'orderBy';
                                // 当前排序方式
                                let orderBy = item.attr('sort-orderby') || locParams[orderByKey] || 'default';

                                let icon;
                                if (orderField == field) {
                                    icon = Map[orderBy];
                                } else {
                                    icon = Map.default;
                                }

                                // 同一个view可能有多个table，需要保证key唯一
                                let tId = closestTable.attr('mxa');
                                me[`@{${tId}.order.field.key}`] = orderFieldKey;
                                me[`@{${tId}.order.field}`] = orderField;
                                me[`@{${tId}.order.by.key}`] = orderByKey;
                                me[`@{${tId}.order.by}`] = orderBy;

                                item.attr('sort-trigger-gallery', tableKey);
                                item.html(`<i class="mc-iconfont cursor-pointer" style="font-size: 14px; user-select: none; margin-left: 1px;">${icon}</i>`);
                            }
                        }
                    }
                }
            })
        }
        me.on('rendered', ready);
        me.on('domready', ready);
    },

    /**
     * 本地排序
     */
    sort(list, orderFieldKey, orderByKey) {
        list = list || [];

        let locParams = Router.parse().params;
        orderFieldKey = orderFieldKey || 'orderField';
        orderByKey = orderByKey || 'orderBy';
        let orderField = locParams[orderFieldKey],
            orderBy = locParams[orderByKey];
        if (!orderField) {
            return list;
        }

        let emptyList = [];
        for (var i = 0; i < list.length; i++) {
            let item = list[i];
            if (!item[orderField]) {
                emptyList.push(item);
                list.splice(i--, 1);
            }
        }

        list = list.sort((a, b) => {
            let ax = a[orderField] + '',
                bx = b[orderField] + '';

            let compare;
            if (isNaN(parseInt(ax)) || isNaN(parseInt(bx))) {
                // 字符串排序，忽略大小写
                switch (orderBy) {
                    case 'desc':
                        // 降序
                        if (bx.toUpperCase() < ax.toUpperCase()) {
                            compare = -1;
                        } else {
                            compare = 1;
                        }
                        break;
                    case 'asc':
                        // 升序
                        if (ax.toUpperCase() < bx.toUpperCase()) {
                            compare = -1;
                        } else {
                            compare = 1;
                        }
                        break;
                }
            } else {
                // 数字排序
                switch (orderBy) {
                    case 'desc':
                        // 降序
                        compare = (+bx) - (+ax);
                        break;
                    case 'asc':
                        // 升序
                        compare = (+ax) - (+bx);
                        break;
                }
            }

            return compare;
        });
        return list.concat(emptyList);
    },

    /**
     * 点击排序按钮
     */
    '$[sort-trigger]<click>'(e) {
        let me = this;
        let context = $('#' + me.id);
        let item = $(e.eventTarget);
        let trigger = item.attr('sort-trigger'),
            tableKey = item.attr('sort-trigger-gallery') || 'mx-table/index';
        let table = item.closest(`[mx-view*="${tableKey}"]`);
        let tId = table.attr('mxa');
        let oldOrderField = me[`@{${tId}.order.field}`],
            oldOrderBy = me[`@{${tId}.order.by}`];

        let orderBy, orderField = trigger;
        if (oldOrderField == trigger) {
            if (oldOrderBy == 'asc') {
                orderBy = 'desc';
            } else {
                orderBy = 'asc';
            }
        } else {
            // 默认降序
            orderBy = 'desc';
        }
        Router.to({
            [me[`@{${tId}.order.field.key}`]]: orderField,
            [me[`@{${tId}.order.by.key}`]]: orderBy
        });
    }
};