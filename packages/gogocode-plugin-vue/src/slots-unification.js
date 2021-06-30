module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/slots-unification.html
    let scriptAst = ast.find('<script></script>')
    scriptAst.replace(`$scopedSlots`, `$slots`)
    scriptAst.find([`$_$1.$slots.$_$2`, `$slots.$_$2`]).each(node => {
        if (!node.parent().generate().startsWith(node.generate())) {
            node.attr('property.name', node.attr('property.name') + '()')
        }
    })
    return ast
}