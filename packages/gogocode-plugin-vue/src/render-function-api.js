const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api, options) {
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/render-function-api.html
    let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast
    if (scriptAst.length < 1) {
        return ast
    }
    let components = options && Array.isArray(options.components) ? options.components : []

    let hName = ''
    scriptAst.find([`render($$$1){$$$2}`, `render: $$$1 => $$$2`, `render: function($$$1){$$$2}`]).each(node => {
        let params = node.attr('params') || node.attr('value.params') || []
        if(params.length){
            hName = params[0].name
            params.splice(0, 1);
            scriptUtils.addVueImport(scriptAst)
        }
        node.find([`${hName}($$$)`,`${hName}`]).each(ast => {
            let args = ast.attr('arguments') || []
            args.forEach((arg, index) => {
                if (arg.type == 'StringLiteral' && arg.value && components.indexOf(arg.value) > -1) {
                    ast.replace(`'${arg.value}'`, `Vue.resolveComponent('${arg.value}')`)
                }
                else if (index == 1 && arg.type == 'ObjectExpression' && options && options.outRootPath && options.outFilePath) {
                    const plantRenderParaCode = `export function plantRenderPara(params){const transProps={staticClass:'class',staticStyle:'style',on:'',domProps:'',props:'',attrs:'',}
                    function obj2arr(obj){return typeof obj=='string'?[obj]:Object.keys(obj).map((pk,index)=>{return{[pk]:Object.values(obj)[index]}})}
                    let result={};for(let key in params){if(transProps[key]==null){if(typeof params[key]=='object'){result[key]=obj2arr(params[key])}else{result[key]=params[key]}}}
                    for(let key in params){if(transProps[key]===''){if(typeof params[key]=='object'){for(let k in params[key]){result[key=='on'?'on'+k.replace(k[0],k[0].toUpperCase()):k]=params[key][k]}}else{result[key]=params[key]}}}
                    for(let key in params){if(transProps[key]){result[transProps[key]]=result[transProps[key]]||[]
                      result[transProps[key]]=result[transProps[key]].concat(obj2arr(params[key]))}}
                    return result}`
                    try {
                        const relativePath = scriptUtils.addUtils(options.outRootPath, options.outFilePath, plantRenderParaCode, api.gogocode)
                        let para = ast.find(`${hName}(${args.map(() => '$_$').join()})`).match[0][1].value
                        ast.replace(para, `plantRenderPara(${para})`)
                        if (!scriptAst.has(`import { plantRenderPara } from '${relativePath}'`)) {
                            scriptAst.before(`import { plantRenderPara } from '${relativePath}';\n`)
                        }
                    }
                    catch (ex) {
                        console.log('writeFile error', ex)
                    }
                }
            })
            ast.attr('callee.name', 'Vue.h')
        })
    })
    return ast
}