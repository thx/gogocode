module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/slots-unification.html
    
    ast.find('<script></script>').each(scriptAst => {
        scriptAst.replace(`$scopedSlots`,`$slots`)
        scriptAst.find(`$_$1.$slots.$_$2`).each(e => {            
            if(!e.parent().generate().startsWith(e.generate())){                
                e.attr('property.name',e.attr('property.name')+'()')
            }
            e.replace(`$scopedSlots`,`$slots`)
        })      
    })    
    return ast
}