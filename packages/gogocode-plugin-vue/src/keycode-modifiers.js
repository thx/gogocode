const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/keycode-modifiers.html
    if (ast.find('<template></template>').length < 1) {
        return ast
    }
    let keyCodeMap = options && options.keyCodeMap ? options.keyCodeMap : scriptUtils.DEFAULTKEYCODE
    let scriptAst = ast.find('<script></script>')
  
    scriptAst.find([`$$$.config.keyCodes = {$_$}`, `$$$.config.keyCodes.$_$ = $_$`]).remove()

    ast.find('<template></template>')
        .find(['<$_$></$_$>', '<$_$ />']).each((node) => {
            if (Array.isArray(node.attr('content.attributes'))) {
                node.attr('content.attributes').forEach((attr) => {
                    for (let keyItem in keyCodeMap) {
                        if (attr.key.content.endsWith(`.${keyItem}`)) {
                            attr.key.content = attr.key.content.replace(`.${keyItem}`, `.${keyCodeMap[keyItem]}`)
                        }
                    }
                })
            }
        })
    return ast
}