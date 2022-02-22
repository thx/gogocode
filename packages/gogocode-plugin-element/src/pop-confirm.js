module.exports = function (ast) {
    const template = ast.find('<template></template>');
    template.replace('<el-popconfirm @on-confirm="$_$1" $$$1>$$$2</el-popconfirm>', '<el-popconfirm @confirm="$_$1" $$$1>$$$2</el-popconfirm>')
    template.replace('<el-popconfirm @onConfirm="$_$1" $$$1>$$$2</el-popconfirm>', '<el-popconfirm @confirm="$_$1" $$$1>$$$2</el-popconfirm>')
    template.replace('<el-popconfirm @on-cancel="$_$1" $$$1>$$$2</el-popconfirm>', '<el-popconfirm @cancel="$_$1" $$$1>$$$2</el-popconfirm>')
    template.replace('<el-popconfirm @onCancel="$_$1" $$$1>$$$2</el-popconfirm>', '<el-popconfirm @cancel="$_$1" $$$1>$$$2</el-popconfirm>')
    return ast;
};
