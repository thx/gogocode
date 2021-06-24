module.exports = function (sourceAst) {
    // https://v3.cn.vuejs.org/guide/migration/transition-group.html#%E6%A6%82%E8%A7%88
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length === 0) {
        return sourceAst;
    }
    return templateAst.find('<transition-group>').each(function (ast) {
        const attrs = ast.attr('content.attributes') || [];
        if (attrs.length === 0 || !attrs.find(attr => attr.key.content === 'tag')) {
            ast.replace('<transition-group $$$>$_$</transition-group>', '<transition-group tag="span" $$$>$_$</transition-group>')
        }
    })
        .root();
}