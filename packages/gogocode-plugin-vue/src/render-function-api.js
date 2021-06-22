const scriptUtils = require('../utils/scriptUtils');
const domProps = {
  staticClass: {
    key: 'class'
  },
  staticStyle: {
    key: 'style'
  },
  on: '',
  domProps: '',
  props: '',
  attrs: ''
}

module.exports = function (ast, options) {
  // 迁移指南: https://v3.cn.vuejs.org/guide/migration/render-function-api.html
  let scriptAst = ast.parseOptions && ast.parseOptions.language == 'vue' ? ast.find('<script></script>') : ast

  if (scriptAst.length < 1) {
    return ast
  }
  let hName = ''
  scriptAst.find([`render($_$){}`, `render: $_$ => $_$`]).each(node => {
    let params = node.attr('params') || node.attr('value.params') || []
    params.forEach((item, index) => {
      hName = item.name
      params.splice(index, 1);
      scriptUtils.addVueImport(scriptAst)      
    })
    node.find(`${hName}($_$,$_$,$_$)`).each(ast => {
      let args = ast.attr('arguments')
      if (Array.isArray(args) && args[1] && args[1].type == 'ObjectExpression') {
        const plantRenderParaCode = `plantRenderPara(params) {
                    const transProps = {
                      staticClass: "class",
                      staticStyle: "style",
                      on: "",
                      domProps: "",
                      props: "",
                      attrs: "",
                    };   
                    function obj2arr(obj) {
                      return typeof obj == "string"
                        ? [obj]
                        : Object.keys(obj).map((pk, index) => {
                            return { [pk]: Object.values(obj)[index] };
                          });
                    }
                    let result = {};
                    for (let key in params) {
                      if (transProps[key] == null) {
                        if (typeof params[key] == "object") {
                          result[key] = obj2arr(params[key]);
                        } else {
                          result[key] = params[key];
                        }
                      }
                    }
                    for (let key in params) {
                      if (transProps[key] === "") {
                        if (typeof params[key] == "object") {
                          Object.assign(result, { ...params[key] });
                        }
                        else{
                          result[key] = params[key];
                        }
                      }
                    }
                    for (let key in params) {
                      if (transProps[key]) {
                        result[transProps[key]] = result[transProps[key]] || [];
                        result[transProps[key]] = result[transProps[key]].concat(obj2arr(params[key]));
                      }
                    }
                    return result;
                  }`
        args[1] = `this.plantRenderPara(${ast.match[0][1].value})`
        if (!node.parent().has(plantRenderParaCode)) {
          node.after(plantRenderParaCode)
        }
      }
    })
  })


  // 搜集注册组件
  let components = options && options.components ? options.components : []
  scriptAst.find(`Vue.component($_$)`).each(c => {
    let argumentList = c.attr('arguments')
    if (Array.isArray(argumentList) && argumentList.length > 0) {
      if (c.attr('arguments')[0].type == 'StringLiteral') {
        components.push(c.attr('arguments')[0].value)
        scriptUtils.addVueImport(scriptAst)
      }
    }
  })
  if (Array.isArray(components)) {
    scriptAst.find(`${hName}($_$)`).each(ast => {
      let args = ast.attr('arguments')
      if (Array.isArray(args)) {
        let stringArg = args.find(s => s.type == 'StringLiteral')
        if (stringArg && stringArg.value) {
          ast.replace(`'${stringArg.value}'`, `Vue.resolveComponent('${stringArg.value}')`)
        }
      }    
    })
  }
  return ast
}