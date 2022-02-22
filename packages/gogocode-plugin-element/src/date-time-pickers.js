const templateUtils = require('../utils/templateUtils');

module.exports = function (ast) {
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;

    if(ast.parseOptions && ast.parseOptions.language === 'vue' ) {
        const template = ast.find('<template></template>');
        template.replace(
            '<el-date-picker :picker-options="$_$1" $$$1>$$$2</el-date-picker>',
            '<el-date-picker :shortcuts="$_$1 && $_$1.shortcuts" :disabled-date="$_$1 && $_$1.disabledDate" :cell-class-name="$_$1 && $_$1.cellClassName" $$$1>$$$2</el-date-picker>'
        );
    }

    // 修改 shortcuts

    script.find(`$emit($_$1, 'pick', $_$2)`).each(ast => {
        const pickerName = ast.match?.[1]?.[0]?.value;
        const dateName = ast.match?.[2]?.[0]?.value;
        const methodAst = ast.parent({type: 'ObjectMethod'})
        const propertyAst = ast.parent({type: 'ObjectProperty'})

        if(methodAst.length && methodAst.attr('key.name') === 'onClick') {
            methodAst.node.key.name = 'value'
            methodAst.replace(pickerName, '')
            ast.replaceBy(`return ${dateName}`)
        } else if(propertyAst.length && propertyAst.attr('key.name') === 'onClick') {
            propertyAst.node.key.name = 'value'
            propertyAst.replace(pickerName, '')
            ast.replaceBy(`return ${dateName}`)
        }

    })

    // template.replace(
    //     '<el-date-picker :picker-options="$_$1" $$$1>$$$2</el-date-picker>',
    //     '<el-date-picker :shortcuts="$_$1 && $_$1.shortcuts" :disabled-date="$_$1 && $_$1.disabledDate" :cell-class-name="$_$1 && $_$1.cellClassName" $$$1>$$$2</el-date-picker>'
    // );


    return ast;
};
