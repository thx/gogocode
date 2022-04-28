const _ = require('lodash')

function isNil(value) {
    return value === undefined || value === null;
}

function modifyElementAttr(templateAst, oldKV = {}, newKV = {}) {
    templateAst.find('<$_$>').each(function (ast) {
        if(_.get(ast.node, `content.name`, '').indexOf('el-') === 0) {
            const attrs = ast.attr('content.attributes') || [];
            attrs.every((attr) => {
                const key = attr.key.content;
                const value = attr.value.content;
                if ((!oldKV.key || oldKV.key === key) && (!oldKV.value || oldKV.value === value)) {
                    attr.key.content = newKV.key;
                    attr.value.content = newKV.value;
                    return false;
                }
                return true;
            });
        }
    });
}

function findElmentTags(templateAst) {
    const tags = [];
    templateAst.find('<$_$>').each(function (ast) {
        if(_.get(ast.node, `content.name`, '').indexOf('el-') === 0) {
            tags.push(ast)
        }
    });
    return tags;
}

module.exports = {
    modifyElementAttr,
    findElmentTags
};
