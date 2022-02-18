function isNil(value) {
    return value === undefined || value === null;
}

function modifyAttr(templateAst, oldKV, newKV) {
    templateAst.find('<$_$>').each(function (ast) {
        const attrs = ast.attr('content.attributes') || [];
        attrs.forEach((attr) => {
            const key = attr.key.content;
            const value = attr.value.content;

            


        });
    });
}


module.exports = {

}