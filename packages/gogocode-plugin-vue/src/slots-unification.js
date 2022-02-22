module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/slots-unification.html
    let scriptAst = ast.find('<script></script>')
    scriptAst.replace(`$scopedSlots`, `$slots`)
    scriptAst.find([`$_$1.$slots.$_$2`, `$slots.$_$2`]).each(node => {
        if (!node.parent().generate().endsWith('()')) {
            //node.attr('property.name', node.attr('property.name') + '()')
            node.replaceBy(` (${ node.generate() } && ${ node.generate() }()) `  )
        }
    })
    let templateAst = ast.find('<template></template>')
    templateAst.find('<$_$ slot="$_$">').each(cast => {        
        // if(cast.attr('content.name') != 'template'){
        let attrList = cast.attr('content.attributes') || []
        let valueContent = ''
        attrList.forEach((attr, index) => {
            if (attr.value && attr.key && attr.key.content == 'slot') {    
                valueContent = attr.value && attr.value.content || ''              
            }                
        })
        // 如果直接就是 template 那么修改其属性即可
        if(valueContent && cast.attr('content.name') === 'template') {
            const slotAttr = attrList.find(attr => attr.key && attr.key.content == 'slot')
            delete slotAttr.value
            slotAttr.key.content = `v-slot:${ valueContent }`
        } else if(valueContent){
            cast.replaceBy(
                `<template v-slot:${ valueContent }>
                    ${ cast.generate() }
                    </template>`
            );
        }            
        // }       
    })
    return ast
}