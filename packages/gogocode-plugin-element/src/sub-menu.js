const _ = require('lodash')

module.exports = function (ast) {
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;
    const template = ast.find('<template></template>');

    template.find('<$_$></$_$>').each((ast) => {
        const tagName = _.get(ast, `node.content.name`);
        if (tagName === 'el-submenu') {
            ast.node.content.name = 'el-sub-menu';
        }
    });

    script.replace('ElSubmenu', 'ElSubMenu')

    return ast;
};
