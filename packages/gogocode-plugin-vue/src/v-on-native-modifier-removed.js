const N = '.native';

module.exports = function (sourceAst, { gogocode: $ } ,options) {
    // 迁移指南 https://v3.cn.vuejs.org/guide/migration/v-on-native-modifier-removed.html#%E6%A6%82%E8%A7%88
    const templateAst = sourceAst.find('<template></template>');
    if (templateAst.length === 0) {
        return sourceAst;
    }

    return templateAst.find('<$_$>').each(function (ast) {
        const attrs = ast.attr('content.attributes') || [];
        attrs.forEach((attr) => {
            const key = attr.key.content;
            const index = key.lastIndexOf(N);
            // '.native' mast be the end of the key string
            if (index > -1 && index === key.length - N.length) {
                attr.key.content = key.substr(0, index);
            }
        });
    })
        .root();

};