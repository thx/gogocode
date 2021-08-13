const scriptUtils = require('../utils/scriptUtils');
module.exports = function (ast, api, options) {

    // gogocodeTransfer.js 文件不需要转换
    if (options.filePath && options.filePath.includes('gogocodeTransfer.js')) {
        return ast;
    }

    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;

    const $childrenFuncCode = `
      export function $children(
        instance
      ) {
        function $walk(vnode, children) {
          if (vnode.component && vnode.component.proxy) {
            children.push(vnode.component.proxy)
          } else if (vnode.shapeFlag & 1 << 4) {
            const vnodes = vnode.children
            for (let i = 0; i < vnodes.length; i++) {
              $walk(vnodes[i], children)
            }
          }
        }
        const root = instance.$.subTree
        const children = []
        if (root) {
          $walk(root, children)
        }
        return children
      }
    `;

    if (script.find('$_$.$children').length) {
        const relativePath = scriptUtils.addUtils(
            api.gogocode,
            $childrenFuncCode,
            options.outRootPath,
            options.outFilePath
        );

        script.replace('$_$.$children', '$children($_$)').generate()

        if (!script.has(`import { $children } from '${relativePath}'`)) {
            script.before(`import { $children } from '${relativePath}';\n`);
        }
    }

    return ast
};
