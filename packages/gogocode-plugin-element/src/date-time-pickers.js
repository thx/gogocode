const _ = require('lodash')

const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast) {
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;

    // el-date-picker
    if (ast.parseOptions && ast.parseOptions.language === 'vue') {
        const template = ast.find('<template></template>');
        template.replace(
            '<el-date-picker :picker-options="$_$1" $$$1>$$$2</el-date-picker>',
            '<el-date-picker :shortcuts="$_$1 && $_$1.shortcuts" :disabled-date="$_$1 && $_$1.disabledDate" :cell-class-name="$_$1 && $_$1.cellClassName" $$$1>$$$2</el-date-picker>'
        );

        if(template.has('<el-date-picker :default-time="$_$1" $$$1>$$$2</el-date-picker>')) {
            scriptUtils.addDayjsImport(script);
            scriptUtils.addData(script, {
                dayjs: 'dayjs',
            });
            template.replace(
                '<el-date-picker :default-time="$_$1" $$$1>$$$2</el-date-picker>',
                `<el-date-picker :default-time="$_$1.map(d => dayjs(d, 'hh:mm:ss').toDate())" $$$1>$$$2</el-date-picker>`
            );
        }

    }

    // 修改 shortcuts
    script.find(`$emit($_$1, 'pick', $_$2)`).each((ast) => {
        const pickerName = _.get(ast.match, `[1][0].value`);
        const dateName = _.get(ast.match, `[2][0].value`);
        const methodAst = ast.parent({ type: 'ObjectMethod' });
        const propertyAst = ast.parent({ type: 'ObjectProperty' });

        if (methodAst.length && methodAst.attr('key.name') === 'onClick') {
            methodAst.node.key.name = 'value';
            methodAst.replace(pickerName, '');
            ast.replaceBy(`return ${dateName}`);
        } else if (propertyAst.length && propertyAst.attr('key.name') === 'onClick') {
            propertyAst.node.key.name = 'value';
            propertyAst.replace(pickerName, '');
            ast.replaceBy(`return ${dateName}`);
        }
    });

    // el-time-select
    if (ast.parseOptions && ast.parseOptions.language === 'vue') {
        const template = ast.find('<template></template>');
        template.replace(
            '<el-time-select :picker-options="$_$1" $$$1>$$$2</el-time-select>',
            '<el-time-select :start="$_$1 && $_$1.start" :end="$_$1 && $_$1.end" :step="$_$1 && $_$1.step" :min-time="$_$1 && $_$1.minTime" :max-time="$_$1 && $_$1.maxTime" $$$1>$$$2</el-time-select>'
        );
    }

    return ast;
};
