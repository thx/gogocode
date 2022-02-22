module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/slots-unification.html
    let scriptAst = ast.find('<script></script>');
    scriptAst.replace(`$scopedSlots`, `$slots`);
    scriptAst.find([`$_$1.$slots.$_$2`, `$slots.$_$2`]).each((node) => {
        if (!node.parent().generate().endsWith('()')) {
            //node.attr('property.name', node.attr('property.name') + '()')
            node.replaceBy(` (${node.generate()} && ${node.generate()}()) `);
        }
    });
    let templateAst = ast.find('<template></template>');
    templateAst.find('<$_$ slot="$_$">').each((cast) => {
        // if(cast.attr('content.name') != 'template'){
        let attrList = cast.attr('content.attributes') || [];
        const slotAttr = attrList.find((attr) => attr.key && attr.key.content == 'slot');
        const slotScopeValue = attrList.find((attr) => attr.key && attr.key.content == 'slot-scope')?.value?.content;
        const valueContent = (slotAttr.value && slotAttr.value.content) || '';
        // 如果直接就是 template 那么修改其属性即可
        if (cast.attr('content.name') === 'template') {

            // v-slot:xxx or v-slot:xxx="{ a, b, c }"
            if(!slotScopeValue) {
                delete slotAttr.value;
            } else {
                slotAttr.value.content = slotScopeValue
            }
            slotAttr.key.content = `v-slot:${valueContent}`;
            // remove slot-scope attr
            attrList.forEach((attr, index) => {
                if (attr.key && attr.key.content == 'slot-scope') {
                    attrList.splice(index, 1);
                }
            });

        } else if(valueContent) {
            attrList.forEach((attr, index) => {
                if (attr.key && attr.key.content == 'slot') {
                    attrList.splice(index, 1);
                } else if (attr.key && attr.key.content == 'slot-scope') {
                    attrList.splice(index, 1);
                }
            });
            cast.replaceBy(
                `<template v-slot:${valueContent}${slotScopeValue ? `=${slotScopeValue}` : ''}>
                    ${cast.generate()}
                 </template>`
            );
        }
        // }
    });
    return ast;
};
