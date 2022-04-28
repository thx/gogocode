/*md5:a2b542ee0ad28154bdebb4e8b5b96a31*/
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
     * 旺旺
     */
    'mx-im.ww'(i) {
        let { content, attrsKV } = i;

        return `<a ${ProcessAttr(attrsKV, '', {
            href: 1,
            target: 1,
            rel: 1,
            uid: 1,
            content: 1
        }, 'mx-ww')}
            href="https://amos.alicdn.com/getcid.aw?v=3&uid=${attrsKV.uid}&site=cntaobao&groupid=0&s=1&charset=UTF-8" 
            target="_blank" 
            rel="noopener noreferrer"><span class="mx-ww-img"></span>${attrsKV.content || content || ''}</a>`;
    },
    /**
     * 钉钉
     */
    'mx-im.dd'(i) {
        let a = i.seprateAttrs('a');
        return `<a href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=${a.viewAttrsMap.uid}" ${a.attrs}>
            <i class="mc-iconfont color-brand fontsize-18">&#xe677;</i>${a.viewAttrsMap.uname}
        </a>`;
    }
}