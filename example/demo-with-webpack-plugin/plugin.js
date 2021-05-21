// transform-var-to-let-plugin.js
const $ = require('gogocode')

const pluginName = 'TransformVarToLetPlugin'

class TransformVarToLetPlugin {
    apply (compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            Object.keys(compilation.assets).forEach(item => {
                // .source() 是获取构建产物的文本
                // .assets 中包含构建产物的文件名
                let content = compilation.assets[item].source()
                let ast = $(content).replace('var $_$1 = $_$2', 'let $_$1 = $_$2')
                content = ast.generate()
                // 更新构建产物对象
                compilation.assets[item] = {
                    source: () => content,
                    size: () => content.length,
                }
            })
        })
    }
}

module.exports = TransformVarToLetPlugin