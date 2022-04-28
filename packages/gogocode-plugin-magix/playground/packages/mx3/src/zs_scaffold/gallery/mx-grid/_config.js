/*md5:100e7481917ad33334042b7db2873ddb*/
//#gallery-config
let DirectionMap = {
    'row': 'row',
    'col': 'column'
}
let JustifyMap = {
    'left': 'flex-start',
    'right': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around'
}
let AlignMap = {
    'top': 'flex-start',
    'bottom': 'flex-end',
    'center': 'center',
    'stretch': 'stretch'
}

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
    'mx-grid.row'(i) {
        let { content, attrsKV } = i;

        let styles = [
            'display: flex'
        ]
        if (attrsKV.width) {
            styles.push(`width: ${attrsKV.width}`);
        }
        if (attrsKV.height) {
            styles.push(`height: ${attrsKV.height}`);
        }

        let direction = DirectionMap[attrsKV.direction || 'row'] || 'row';
        styles.push(`flex-direction: ${direction}`);

        let justify = JustifyMap[attrsKV.justify || 'left'] || 'flex-start';
        styles.push(`justify-content: ${justify}`);

        let align = AlignMap[attrsKV.align || 'stretch'] || 'stretch';
        styles.push(`align-items: ${align}`);

        let gutter = attrsKV.gutter || 0;
        styles.push(`--mx-grid-gutter: ${gutter}`);
        if (direction == 'row') {
            styles.push(`margin-left: calc(0px - var(--mx-grid-gutter) / 2)`);
            styles.push(`margin-right: calc(0px - var(--mx-grid-gutter) / 2)`);
        } else {
            styles.push(`margin-top: calc(0px - var(--mx-grid-gutter) / 2)`);
            styles.push(`margin-bottom: calc(0px - var(--mx-grid-gutter) / 2)`);
        }

        return `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            width: 1,
            height: 1,
            direction: 1,
            justify: 1,
            align: 1,
            gutter: 1,
            content: 1
        })}>${content}</div>`;
    },
    'mx-grid.col'(i) {
        let { content, attrsKV, nodesMap, pId } = i;
        let styles = [];
        let pNode = nodesMap[pId];

        // width > flex
        if (attrsKV.width) {
            styles.push(`flex: 0 0 ${attrsKV.width}`);
        } else {
            let flex = attrsKV.flex || 1;
            styles.push(`flex: ${flex}`);
        }

        if (attrsKV.height) {
            styles.push(`height: ${attrsKV.height}`);
        }

        //检查父标签是mx-grid.row且有gutter属性
        // if (!i.lastElement &&
        //     pNode.tag == 'mx-grid.row' &&
        //     pNode.attrsKV.gutter) {
        //     let dir = `right`;
        //     if (pNode.attrsKV.direction == 'col') {
        //         dir = 'bottom';
        //     }
        //     styles.push(`margin-${dir}:${pNode.attrsKV.gutter}`);
        // }
        if (pNode.tag == 'mx-grid.row' &&
            pNode.attrsKV.gutter) {
            if (pNode.attrsKV.direction == 'col') {
                styles.push(`margin-top: calc(var(--mx-grid-gutter) / 2)`);
                styles.push(`margin-bottom: calc(var(--mx-grid-gutter) / 2)`);
            } else {
                styles.push(`margin-left: calc(var(--mx-grid-gutter) / 2)`);
                styles.push(`margin-right: calc(var(--mx-grid-gutter) / 2)`);
            }
        }

        return `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            width: 1,
            height: 1,
            content: 1
        })}>${content}</div>`;
    },
    'mx-grid.title'(i) {
        let { content, attrsKV } = i;

        let styles = [
            'padding: var(--mx-grid-title-v-gap, 10px) var(--mx-grid-title-h-gap, 24px)'
        ];
        if (!(attrsKV.border === 'none' || attrsKV.border === 'false')) {
            styles.push('border-bottom: 1px solid var(--mx-grid-title-color-border, #e6e6e6)');
        }

        let tmpl = `<div ${ProcessAttr(attrsKV, styles.join(';'), {
            icon: 1, // 标题前icon
            content: 1, // 标题
            tip: 1, // 标题旁提示
            tag: 1, // 打标
            'tag-tip': 1, // 打标提示信息
            'icon-tip': 1, // 标题旁小问号
            border: 1, // 是否底边线
        }, 'clearfix')}>`;

        // 标题，提示，icon
        tmpl += '<div style="float: left; display: inline-flex; height: var(--input-height); overflow: hidden; align-items: center; justify-content: center;">';
        if (attrsKV.icon) {
            tmpl += `<span style="margin-right: 4px; color: #ccc;">${attrsKV.icon}</span>`;
        }
        tmpl += '<span class="grid-title" style="margin-right: 16px;">' + attrsKV.content + (attrsKV.tag ? `<mx-effects.icon style="margin-left: 4px;" type="error" content="${attrsKV.tag}" tip="${attrsKV['tag-tip'] || ''}"/>` : '') + (attrsKV['icon-tip'] ? `<mx-popover class="mc-iconfont mc-tip-iconfont" tag="i" width="220" content="${attrsKV['icon-tip']}">&#xe72f;</mx-popover>` : '') + '</span>';
        if (attrsKV.tip) {
            tmpl += `<span style="margin-right: 16px; color: #999; font-size: 12px;">${attrsKV.tip}</span>`;
        }
        tmpl += '</div>';

        // 筛选项
        if (content) {
            tmpl += `${content}`;
        }

        tmpl += '</div>';
        return (attrsKV.sticky + '' === 'true') ? `<div mx-grid-sticky="outer"><div mx-grid-sticky="inner">${tmpl}</div></div>` : tmpl;
    },
    'mx-grid.body'(i) {
        let { content, attrsKV } = i;
        let tmpl = `<div ${ProcessAttr(attrsKV, 'padding: var(--mx-grid-body-v-gap, 16px) var(--mx-grid-body-h-gap, 24px);', {
            content: 1
        }, 'clearfix')}>${content}</div>`;

        return (attrsKV.sticky + '' === 'true') ? `<div mx-grid-sticky="outer"><div mx-grid-sticky="inner">${tmpl}</div></div>` : tmpl;
    }
};
