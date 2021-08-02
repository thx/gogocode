module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/events-api.html

    let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast
    if (scriptAst.length < 1) {
        return ast
    }
    scriptAst.find([`$_$1.$on($_$2)`, `$_$1.$off($_$2)`, `$_$1.$once($_$2)`, `$_$1.$emit($_$2)`]).each(node => {
        const isThisEmit = node.attr('callee.object.type') == 'ThisExpression' && node.generate().startsWith('this.$emit')
        // this.$on 处理
        if (isThisEmit && scriptAst.has(`mixins: $$$`)) {
            node.replace('this.$emit($$$)', `tiny_emitter.emit($$$)`)
                .replace('this.$on($$$)', `tiny_emitter.on($$$)`)
                .replace('this.$off($$$)', `tiny_emitter.off($$$)`)
                .replace('this.$once($$$)', `tiny_emitter.once($$$)`)
            if (!scriptAst.has(`import tiny_emitter from 'tiny-emitter/instance'`)) {
                scriptAst.prepend(`import tiny_emitter from 'tiny-emitter/instance';\n`)
            }
        }
        // xxx.$on() 情况处理
        else if(!isThisEmit) {
            node.replace('$$$.$emit($$$)', `tiny_emitter.emit($$$)`)
                .replace('$$$.$on($$$)', `tiny_emitter.on($$$)`)
                .replace('$$$.$off($$$)', `tiny_emitter.off($$$)`)
                .replace('$$$.$once($$$)', `tiny_emitter.once($$$)`)
            if (!scriptAst.has(`import tiny_emitter from 'tiny-emitter/instance'`)) {
                scriptAst.prepend(`import tiny_emitter from 'tiny-emitter/instance';\n`)
            }
        }
    })
    return ast
}