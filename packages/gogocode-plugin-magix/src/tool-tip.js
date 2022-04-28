module.exports = function (ast) {
    const template = ast.find('<template></template>');
    template.replace('<el-tooltip open-delay="$_$1" $$$1>$$$2</el-tooltip>', '<el-tooltip show-after="$_$1" $$$1>$$$2</el-tooltip>')
    template.replace('<el-tooltip :open-delay="$_$1" $$$1>$$$2</el-tooltip>', '<el-tooltip :show-after="$_$1" $$$1>$$$2</el-tooltip>')

    template.replace('<el-tooltip hide-after="$_$1" $$$1>$$$2</el-tooltip>', '<el-tooltip auto-close="$_$1" $$$1>$$$2</el-tooltip>')
    template.replace('<el-tooltip :hide-after="$_$1" $$$1>$$$2</el-tooltip>', '<el-tooltip :auto-close="$_$1" $$$1>$$$2</el-tooltip>')

    template.replace('<el-tooltip close-delay="$_$1" $$$1>$$$2</el-tooltip>', '<el-tooltip hide-after="$_$1" $$$1>$$$2</el-tooltip>')
    template.replace('<el-tooltip :close-delay="$_$1" $$$1>$$$2</el-tooltip>', '<el-tooltip :hide-after="$_$1" $$$1>$$$2</el-tooltip>')
    return ast;
};
