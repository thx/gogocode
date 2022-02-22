const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast) {
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;
    const template = ast.find('<template></template>');
    scriptUtils.addDayjsImport(script);
    scriptUtils.addData(script, {
        dayjs: 'dayjs',
    });

    if (ast.parseOptions && ast.parseOptions.language === 'vue') {
        const template = ast.find('<template></template>');
        template.replace(
            '<el-calendar :range="$_$1" $$$1>$$$2</el-calendar>',
            `<el-calendar :range="$_$1.map(d => dayjs(d, 'YYYY-MM-DD').toDate())" $$$1>$$$2</el-calendar>`
        );
    }
    return ast;
};
