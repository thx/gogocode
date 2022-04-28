/*md5:1fffaac5a1ea5adc60dd9737dbe9d727*/
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
    /**
     * 建议使用 <mx-error type="empty-content"/> 替代
     */
    'mx-effects.empty'(i) {
        let { content, attrsKV } = i;

        return `<div ${ProcessAttr(attrsKV, '', {}, ((attrsKV.bg == 'white') ? 'mx-effects-empty-white' : 'mx-effects-empty'))}>
            <img class="mx-effects-img" src="https://img.alicdn.com/tfs/TB1zGfFVFP7gK0jSZFjXXc5aXXa-600-600.png" />
            <div class="mx-effects-tip">${(attrsKV.content || content || '暂无内容')}</div>
        </div>`;
    },
    'mx-effects.breath'(i) {
        let { attrsKV } = i;
        return `<span ${ProcessAttr(attrsKV, `--mx-breath-color: ${(attrsKV.color || 'var(--color-brand)')}; --mx-breath-width: ${(attrsKV.width || 16)}px;`, {
            color: 1
        }, 'mx-breath')}>
            <span class="mx-breath-inner"></span>
        </span>`;
    },
    'mx-effects.icon': {
        tag: 'span'
    }
};
