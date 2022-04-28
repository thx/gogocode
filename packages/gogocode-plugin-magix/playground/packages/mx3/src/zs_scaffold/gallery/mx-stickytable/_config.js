/*md5:d67f32e860f3ba9183e6e29cbab47ad5*/
//#gallery-config
let ProcessAttr = (attrs, style, ignores, className) => {
    let attrStr = '',
        classAdded = false,
        styleAdded = false;
    for (let p in attrs) {
        if (ignores[p] !== 1) {
            let v = attrs[p];
            if ((p == 'class') && className) {
                attrStr += ` class="${className} ${v}"`;
                classAdded = true;
            } else if ((p == 'style') && style) {
                attrStr += ` style="${style};${v}"`;
                styleAdded = true;
            } else {
                if (v === true) v = '';
                else v = '="' + v + '"';
                attrStr += ' ' + p + v;
            }
        }
    }
    if (!classAdded && className) {
        attrStr += ` class="${className}"`;
    }
    if (!styleAdded && style) {
        attrStr += ` style="${style}"`;
    }
    return attrStr;
};

module.exports = {
    'mx-stickytable'(tag) {
        let { content } = tag;
        let ctrl = tag.seprateAttrs('div');

        // 匹配中thead
        // thead和tbody分隔开，用div包裹
        let arr = [];
        content = content.replace(/<thead[^>]*>[\s\S]*?<\/thead>/g, (...results) => {
            arr.push('<div mx-stickytable-wrapper="placeholder"><div mx-stickytable-wrapper="head"><table>' + results[0] + '</table></div></div>');
            return '';
        });
        content = content.replace(/<table/g, '<div mx-stickytable-wrapper="body">$&').replace(/<\/table>/g, '$&</div>');

        // tbody前加colgroup占位 避免第一行tr里td有colspan导致样式错位
        // 这种写法有个问题是，如果模板里用 {{each list }} td {{/each}} 此时只会取到一个导致col个数错误
        // let reg1 = /<tbody[^>]*>[\s\S]*?<\/tbody>/g; // 匹配中thead
        // let reg2 = /<tr[^>]*>[\s\S]*?<\/tr>/; // 匹配第一个tr
        // let reg3 = /<td[^>]*>[\s\S]*?<\/td>/g; // 匹配第一个tr中的所有td
        // let reg4 = /colspan\s*="\s*([\d\.]+)"/; // 匹配colspan
        // content = content.replace(reg1, (...results) => {
        //     let tr = results[0].match(reg2)[0];
        //     let str = '<colgroup mx-stickytable-wrapper="colgroup">';
        //     let tds = tr.match(reg3);
        //     for (let j = 0; j < tds.length; j++) {
        //         let td = tds[j];
        //         let span = 1;
        //         let m = td.match(reg4);
        //         if (m) {
        //             span = +m[1];
        //         }
        //         for (let k = 0; k < span; k++) {
        //             str += `<col span="1" />`;
        //         }
        //     }
        //     str += '</colgroup>';
        //     return str + results[0];
        // });
        // tbody追加一个colgroup占位符
        content = content.replace(/<tbody/g, (...results) => {
            return '<colgroup mx-stickytable-wrapper="colgroup"></colgroup>' + results[0];
        });

        return `<${ctrl.tag} mx-view="${tag.mxView}" ${ctrl.attrs} ${ctrl.viewAttrs}>
            ${arr.join('') + content}
            <div mx-stickytable-wrapper="bar"><div mx-stickytable-wrapper="bar-inner"></div></div>
        </${ctrl.tag}>`;
    },

    /**
     * 支持拖动排序的表头th标签
     */
    'mx-stickytable.th-drag'(tag) {
        let { content, attrsKV } = tag;
        return `<th ${ProcessAttr(attrsKV, '', {
            value: 1
        }, '')} mx-stickytable-drag="${attrsKV.value}">
            ${content}
            <span mx-stickytable-drag-trigger="item"></span>
            <span mx-stickytable-drag-trigger="mask"></span>
        </th>`;
    },

    /**
     * 表头文案包裹
     */
    'mx-stickytable.th-text'(tag) {
        return `<span ${tag.attrs} mx-stickytable-th="text">${tag.content}</span>`;
    },
    /**
     * mx-stickytable-operation="line"
     * 单独的操作行，分栏超出的操作项包裹
     */
    'mx-stickytable.over-opers'(tag) {
        return `<div ${tag.attrs} mx-stickytable-operation="line-over-opers">${tag.content}</div>`;
    },

    /**
     * 展开子行trigger
     * 注意属性改变不会digest，不支持外部更新
     */
    'mx-stickytable.sub'(tag) {
        let { content, attrsKV } = tag;
        return `<span  ${ProcessAttr(attrsKV, '', {
            value: 1,
            expand: 1
        }, '')} mx-stickytable-sub="${attrsKV.value}" mx-stickytable-sub-expand="${attrsKV.expand}">${content}</span>`;
    },

    /**
     * 排序指标
     * 注意属性改变不会digest，不支持外部更新
     */
    'mx-stickytable.sort'(tag) {
        let { content, attrsKV } = tag;
        return `<span  ${ProcessAttr(attrsKV, '', {
            value: 1,
            order: 1,
            'order-field': 1,
            'order-by': 1
        }, '')} mx-stickytable-sort="${attrsKV.value}" mx-stickytable-sort-order="${attrsKV.order}" mx-stickytable-sort-order-field="${attrsKV['order-field'] || 'orderField'}" mx-stickytable-sort-order-by="${attrsKV['order-by'] || 'orderBy'}">${content}<i class="mc-iconfont" mx-stickytable-sort-trigger="true"></i></span>`;
    },

    /**
     * 表头联动筛选项包裹容器
     */
    'mx-stickytable.filter'(tag) {
        return `<div mx-stickytable-filter="placeholder">
            <div ${tag.attrs} mx-stickytable-filter="wrapper">${tag.content}</div>
        </div>`;
    },
}
