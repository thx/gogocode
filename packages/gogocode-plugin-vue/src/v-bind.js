module.exports = function (sourceAst) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-bind.html
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length === 0) {
        return sourceAst;
    }
    return templateAst.find('<$_$>').each(function (ast) {
        const attrs = ast.attr('content.attributes') || [];
        const bindAttrs = [];
        let newAttrs = attrs.filter((attr) => {
            const key = attr.key.content
            if (key.indexOf('v-bind') === 0 || key.indexOf('v-bind:') === 0) {
                bindAttrs.push(attr)
                return false;
            }
            return true;
        });
            
        if (bindAttrs.length > 0) {
            // move bind attributes to the first
            newAttrs = [...bindAttrs, ...newAttrs];
            ast.attr('content.attributes', newAttrs);
        }
    })
        .root();
}