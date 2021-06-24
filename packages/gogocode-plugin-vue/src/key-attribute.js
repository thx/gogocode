module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/key-attribute.html
    
    let templateAst = ast.find('<template></template>')    
    if(templateAst.length < 1){
        return ast
    }
    templateAst.find(['<$_$></$_$>', '<$_$ />']).each((ast) => {       
        let attrList = Array.isArray(ast.attr('content.attributes')) ? ast.attr('content.attributes') : []
        attrList.forEach((attr, index) => {
            if (attr.value && attr.key && ['key', ':key', 'v-bind:key'].indexOf(attr.key.content) > -1) {
                if (attrList.some(attr => { return attr.key && ['v-if', 'v-else', 'v-else-if'].indexOf(attr.key.content) > -1 })) {
                    attrList.splice(index, 1);
                }
            }
        })
    })
    templateAst.find('<template v-for="$_$"></template>').each(ast => {
        let childrens = Array.isArray(ast.attr('content.children')) ? ast.attr('content.children') : []
        let attrKey = null
        childrens.forEach(children => {
            let attrList = children.content && Array.isArray(children.content.attributes) ? children.content.attributes : []
            attrList.forEach((attr, index) => {
                if ([':key', 'v-bind:key'].indexOf(attr.key.content) > -1) {
                    attrList.splice(index, 1);
                    attrKey = attr
                }
            })
        })
        if (attrKey) {
            ast.attr('content.attributes').push(attrKey)
        }
    })
    return ast
}