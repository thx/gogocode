const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api, options) {
    if(options.type == 'perStart'){
        //收集
        return;
    }
    // 迁移指南: https://v3.cn.vuejs.org/guide/migration/render-function-api.html
    let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast

    if (scriptAst.length < 1) {
        return ast
    }
    // 搜集注册组件
    let components = options && options.components ? options.components : []
    scriptAst.find(`$$$.component($_$)`).each(c => {
        let argumentList = c.attr('arguments')
        if (Array.isArray(argumentList) && argumentList.length > 0) {
            if (c.attr('arguments')[0].type == 'StringLiteral') {
                components.push(c.attr('arguments')[0].value)                
            }
        }
    })

    let hName = ''
    scriptAst.find([`render($$$1){$$$2}`, `render: $$$1 => $$$2`, `render: function($$$1){$$$2}`]).each(node => {
        let params = node.attr('params') || node.attr('value.params') || []
        params.forEach((item, index) => {
            hName = item.name
            params.splice(index, 1);
            scriptUtils.addVueImport(scriptAst)
        })
        node.find(`${hName}($$$)`).each(ast => {
            let args = ast.attr('arguments') || []
            args.forEach((arg, index) => {
                if (arg.type == 'StringLiteral' && arg.value && components.indexOf(arg.value) > -1) {
                    ast.replace(`'${arg.value}'`, `Vue.resolveComponent('${arg.value}')`)
                }
                else if (index == 1 && arg.type == 'ObjectExpression') {
                    const plantRenderParaCode = `export function plantRenderPara(params){const transProps={staticClass:"class",staticStyle:"style",on:"",domProps:"",props:"",attrs:"",};function obj2arr(obj){return typeof obj=="string"?[obj]:Object.keys(obj).map((pk,index)=>{return{[pk]:Object.values(obj)[index]}})}let result={};for(let key in params){if(transProps[key]==null){if(typeof params[key]=="object"){result[key]=obj2arr(params[key])}else{result[key]=params[key]}}}for(let key in params){if(transProps[key]===""){if(typeof params[key]=="object"){Object.assign(result,{...params[key]})}else{result[key]=params[key]}}}for(let key in params){if(transProps[key]){result[transProps[key]]=result[transProps[key]]||[];result[transProps[key]]=result[transProps[key]].concat(obj2arr(params[key]))}}return result}`
                    try {
                        const relativePath = scriptUtils.addUtils(options.rootPath, options.filePath, plantRenderParaCode, api.gogocode)
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