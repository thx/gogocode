/*md5:7a53fc477356489d2de3aa469eb27a82*/
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
    'mx-carousel'(i) {
        let ctrl = i.seprateAttrs('div');
        return `<${ctrl.tag} mx-view="${i.mxView}" ${ctrl.attrs} ${ctrl.viewAttrs}>
            <div data-carousel="true" class="swiper-container">
                <div data-carousel-inner="true" class="swiper-wrapper">${i.content}</div>
            </div>
        </${ctrl.tag}>`;
    },
    'mx-carousel.panel'(i) {
        let { content, attrsKV } = i;
        return `<div ${ProcessAttr(attrsKV, '', {}, 'swiper-slide')} data-carousel-panel="true">${content}</div>`;
    }
}