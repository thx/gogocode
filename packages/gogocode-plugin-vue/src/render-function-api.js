const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api, options) {
    // gogocodeTransfer.js 文件不需要转换
    if (options.filePath && options.filePath.includes('gogocodeTransfer.js')) {
        return ast;
    }
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/render-function-api.html
    let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast
    if (scriptAst.length < 1) {
        return ast
    }
    let components = options && Array.isArray(options.components) ? options.components : []    
    scriptAst.find([`render(){$$$}`, `render: () => $$$`, `render: function(){$$$}`, `function render(){$$$}`]).each(node => {
        node.find(`Vue.h($$$)`).each(ast => {
            let args = ast.attr('arguments') || []
            args.forEach((arg, index) => {
                if (arg.type == 'StringLiteral' && arg.value && components.indexOf(arg.value) > -1) {
                    ast.replace(`'${arg.value}'`, `Vue.resolveComponent('${arg.value}')`)
                }
                else if (index == 1 && arg.type == 'ObjectExpression' && options && options.outRootPath && options.outFilePath) {
                    const plantRenderParaCode = `export function plantRenderPara(params){const transProps={staticClass:'class',staticStyle:'style',on:'',domProps:'',props:'',attrs:'',}
                    function obj2arr(obj){return typeof obj=='string'?[obj]:Object.keys(obj).map((pk,index)=>{return{[pk]:Object.values(obj)[index]}})}
                    let result={};for(let key in params){if(transProps[key]==null){if(typeof params[key]=='object'){result[key]=obj2arr(params[key])}else{result[key]=params[key]}}}
                    for(let key in params){if(transProps[key]===''){if(typeof params[key]=='object'){for(let k in params[key]){result[k]=params[key][k]}}else{result[key]=params[key]}}}
                    for(let key in params){if(transProps[key]){result[transProps[key]]=result[transProps[key]]||[]
                      result[transProps[key]]=result[transProps[key]].concat(obj2arr(params[key]))}}
                    return result}`
                    try {
                        const relativePath = scriptUtils.addUtils(
                            api.gogocode,
                            plantRenderParaCode, 
                            options.outRootPath, 
                            options.outFilePath
                        )
                        let para = ast.find(`Vue.h(${args.map(() => '$_$').join()})`).match[0][1].value
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
        })
    })   
    return ast
}