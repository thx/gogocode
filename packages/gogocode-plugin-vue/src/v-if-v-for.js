module.exports = function (sourceAst, { gogocode: $ }, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length === 0) {
        return sourceAst;
    }
    return templateAst.find('<$_$1 v-for=$_$2>').each(function (ast) {
        const innerIfASt = $(ast.generate(), {
            parseOptions: { language: 'html' }
        });

        const attrs = ast.attr('content.attributes') || [];
        const ifIndex = attrs.findIndex(attr => (
            attr.key.content === 'v-if'
        ));
        if (ifIndex < 0) {
            return;
        }
        // outside remove if attr
        ast.attr('content.attributes').splice(ifIndex, 1);

        // inner attrs take if attr only
        const attrPath = 'content.children.0.content.attributes';
        const innerAttrs = innerIfASt.attr(attrPath);
        innerIfASt.attr(attrPath, innerAttrs.filter(attr => (
            attr.key.content === 'v-if'
        )));

        // rename outside tagname
        ast.attr('content.name', 'template');
        ast.attr('content.children', [innerIfASt.node.content.children[0]]);

    }).root();
}