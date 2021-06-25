module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/events-api.html

    let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast
    if (scriptAst.length < 1) {
        return ast
    }
    let nodeStart = 0
    scriptAst.find([`$_$1.$on($_$2)`, `$_$1.$off($_$2)`, `$_$1.$once($_$2)`, `$_$1.$emit($_$2)`]).each(e => {
        let transform = false
        // xxx.$on() 情况处理
        if (e.attr('callee.object.name')) {
            let nodes = scriptAst.find([
                `import ${e.attr('callee.object.name')} from '$_$'`,
                `const ${e.attr('callee.object.name')} = $_$`,
                `let ${e.attr('callee.object.name')} = $_$`,
                `var ${e.attr('callee.object.name')} = $_$`,
            ])
            const tinyEmitter = `Object.assign(${e.attr('callee.object.name')} ,tiny_emitter_override);\n`
            // 查找eventhub定义
            nodes.each(hub => {
                if (!scriptAst.has(tinyEmitter)) {
                    if (hub.attr('type') == 'ImportDeclaration') {
                        let imports = scriptAst.find(`import '$_$'`)
                        imports.eq(imports.length - 1).after(tinyEmitter)
                    }
                    else {
                        hub.after(tinyEmitter)
                    }
                    transform = true
                }
            })
            // 没找到定义的情况 
            if (!nodes.length) {                
                if (!e.parent(1).has(tinyEmitter)) {
                    e.before(tinyEmitter)
                    transform = true
                }
            }
        }
        // this.xxx.$on() 情况处理
        else if (e.attr('callee.object.object.type') == 'ThisExpression' && e.attr('callee.object.property.name')) {
            const tinyEmitter = `Object.assign(this.${e.attr('callee.object.property.name')} ,tiny_emitter_override);\n`
            if (nodeStart != 0 && e.attr('start') < nodeStart) {
                scriptAst.remove(tinyEmitter)
            }
            if (!scriptAst.has(tinyEmitter)) {
                nodeStart = e.attr('start')
                e.before(tinyEmitter)
                transform = true
            }
        }
         // xxx.xxx.$on() 情况处理
        else if (e.attr('callee.object.object.type') == 'Identifier' && e.attr('callee.object.property.name')) {
            const tinyEmitter = `Object.assign(${e.attr('callee.object.object.name')}.${e.attr('callee.object.property.name')}, tiny_emitter_override);\n`
            if (!e.parents().parents().has(tinyEmitter)) {
                e.before(tinyEmitter)
                transform = true
            }
        }
        // 转换后增加tiny-emitter引用
        if (transform && !scriptAst.has(`import tiny_emitter from 'tiny-emitter/instance'`)) {
            scriptAst.prepend(`import tiny_emitter from 'tiny-emitter/instance';\n`)
            let imports = scriptAst.find(`import '$_$'`)
            imports.eq(imports.length - 1).after(`const tiny_emitter_override = {
                $on: (...args) => tiny_emitter.on(...args),
                $once: (...args) => tiny_emitter.once(...args),
                $off: (...args) => tiny_emitter.off(...args),
                $emit: (...args) => tiny_emitter.emit(...args),
              };\n`)
        }
    })
    return ast
}