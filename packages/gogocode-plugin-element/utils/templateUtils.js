function isNil(value) {
    return value === undefined || value === null;
}

function modifyAttr(templateAst, oldKV = {}, newKV = {}) {
    templateAst.find('<$_$>').each(function (ast) {
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
    });
}

module.exports = {};
