module.exports = function (ast) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/events-api.html

    let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast
    if (scriptAst.length < 1) {
        return ast
    }
    let nodeStart = 0
    scriptAst.find([`$_$1.$on($_$2)`, `$_$1.$off($_$2)`, `$_$1.$once($_$2)`, `$_$1.$emit($_$2)`]).each(e => {
        let transform = false
        if (e.attr('callee.object.name')) {
            let nodes = scriptAst.find([
                `import ${e.attr('callee.object.name')} from '$_$'`,
                `const ${e.attr('callee.object.name')} = $_$`,
                `let ${e.attr('callee.object.name')} = $_$`,
            ])
            const eventHub = `Object.assign(${e.attr('callee.object.name')} ,tiny_emitter_override);\n`
            // 查找eventhub定义
            nodes.each(hub => {
                if (!scriptAst.has(eventHub)) {
                    if (hub.attr('type') == 'ImportDeclaration') {
                        let imports = scriptAst.find(`import '$_$'`)
                        imports.eq(imports.length - 1).after(eventHub)
                    }
                    else {
                        hub.after(eventHub)
                    }
                    transform = true
                }
            })
            // 没找到定义的情况 
            if (nodes.length == 0) {
                // https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcI0A8pIBOcABOgGYCGMANqcADoQkkSUC2amJA5AEI8ANExbskMCHDQoAFGgBuaSQAkYAIwCUJYCxYjdCpXFVqAdABIkEGT0gBjISRlaAvAD5t+3STgALMADOphAw7CQA1C4kAIwA3F4kAL4asd4JhirqFlZ2aDb2js4k7p7M3j7+QSFhAFQxAAz18WUsyc2twmVqaOREaACqEGIScEWMLSQZxlmW5OT5EA4p+omdibEggiAA7kQA1sjoWCDkEnZwYFY+hJQQAb2E7DLkYDRoAJIQvYIklFBgPyQUAuVgCWnGLDsoNI5mKv3+pgA5khkVD0PooXdSAFxIRcnCXm9Pr1TDiYHi0PoAPRUkiACnVAJvxgBnEwAr8YA9tUABvKAfFdAAhGgBC3QDHcoBAD30hDQcHJzHMMjJFI0pheEFkAG0AAbmAD65mi2WsmvMACYNKqALryqCUMWSALOUwWq1wG3yxFKNA3KTOJiJJibcDQeAAGVuiOOcAAnlA0AE7IQwMDfb5KAEAApiuAXN1YOCEGBoLZQ9j2tAAeXgsDgWZzaESQA
                if (!e.parents().parents().has(eventHub)) {
                    e.before(eventHub)
                    transform = true
                }
            }
        }
        else if (e.attr('callee.object.object.type') == 'ThisExpression' && e.attr('callee.object.property.name')) {
            const eventHub = `Object.assign(this.${e.attr('callee.object.property.name')} ,tiny_emitter_override);\n`
            if (nodeStart != 0 && e.attr('start') < nodeStart) {
                scriptAst.remove(eventHub)
            }
            if (!scriptAst.has(eventHub)) {
                nodeStart = e.attr('start')
                e.before(eventHub)
                transform = true
            }
        }
        else if (e.attr('callee.object.object.type') == 'Identifier' && e.attr('callee.object.property.name')) {
            const eventHub = `Object.assign(${e.attr('callee.object.object.name')}.${e.attr('callee.object.property.name')}, tiny_emitter_override);\n`
            if (!e.parents().parents().has(eventHub)) {
                e.before(eventHub)
                transform = true
            }
        }
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