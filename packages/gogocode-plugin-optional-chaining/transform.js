/**
 * 转换入口导出一个函数，按照如下函数签名
 * @param {*} fileInfo 包含 source 和 path 属性
 * @param {*} api 包含 gogocode 作为转换工具
 * @param {*} options 其他 option 由此传入
 * @returns {string} 返回转换后的代码
 */
module.exports = function (fileInfo, api, options) {
    const $ = api.gogocode
    const source = fileInfo.source
    const ast = $(source)

    const opt = ast.find(
        {type: 'OptionalMemberExpression'}
    )

    if(!opt.length) {
        return ast.generate();
    }

    if(!ast.has([`const _ = require('lodash')`, `import _ from 'lodash'`])) {
        ast.prepend(`const _ = require('lodash')\n\n`)
    }

    function toNormalChain(optAst) {
        const property = optAst.attr('property')
        const object = optAst.attr('object')
        let str = $(property).generate()

        if (property.type === 'StringLiteral' || property.type === 'NumericLiteral') {
            str = `[${str}]`
        } else {
            str = `.${str}`
        }
      
        if(object.type === 'MemberExpression' || object.type === 'OptionalMemberExpression') {
            const res = toNormalChain($(object))
            return {
                object: res.object,
                path: `${res.path}${str}`
            }
        } else {
            return {
                object: $(object).generate(),
                path: str.replace(/^\./, '')
            }
        }
    }

    opt.each(item => { 
        if(item.parent()?.node?.type !== 'OptionalMemberExpression') {
            const { object, path } = toNormalChain(item)
            item.replaceBy(`_.get(${object}, \`${path}\`)`)
        }
    })

    // return your transformed code here
    return ast.generate()
};
