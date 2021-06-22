const csstree = require('css-tree');

module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/transition.html    
    if(ast.find('<template></template>').length < 1){
        return ast
    }
    let classNames = []
    ast.find('<template></template>')
        .find(`<transition name=$_$></transition>`).each(ast => {
            let className = ast.match && ast.match[0] && ast.match[0][0] && ast.match[0][0].value
            if (typeof className == 'string') {
                classNames.push(className)
            }
        });
    let style = ast.attr('styles.0.content') || ''
    if (style) {
        let tree = csstree.parse(style)
        csstree.walk(tree, node => {            
            if(node.type == 'Raw' && node.value.startsWith('//')){
                const start = node.value.indexOf('\n')
                if(start > -1){
                    node.value = '/*'+ node.value.slice(0, start) + '*/' + node.value.slice(start) 
                }
                else{
                    node.value = '/*'+ node.value + '*/'
                }                               
            }
            if (node.type == 'ClassSelector') {
                classNames.forEach(classname => {
                    if ([classname + '-enter', classname + '-leave', 'v-enter', 'v-leave'].indexOf(node.name) > -1) {
                        node.name += '-from'
                    }
                })
            }
        });
        ast.attr('styles.0.content',csstree.generate(tree));
    }
    return ast    
}