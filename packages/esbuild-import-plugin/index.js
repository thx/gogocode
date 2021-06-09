const gogocode = require('gogocode')
const fs = require('fs')
const kebabCase = require('lodash/kebabCase')
const path = require('path')

// const replacer = kebabCase
// 测试用例:
// - 使用引用
// - 直接使用
// - 重复 —— 去重
const getUsedComponents = (source, libName) => {
  const components = []
  const usedComponents = source.find(`${libName}.$_$`)
  usedComponents.each(ast => {
    const componentName = ast.match[0][0].value
    const parentNode = ast.parent()
    components.push(componentName)
    switch (parentNode.node.type) {
      case 'VariableDeclarator': {
        /**
         * const Button = Antd.Button -> N/A
         */
        let removedFlag = false
        ast.parents().each(parentNode => {
          switch (parentNode.value.type) {
            case 'VariableDeclaration': {
              if (removedFlag) {
                return
              }
              parentNode.remove()
              removedFlag = true
            }
          }
        })
        break
      }
      default: {
        /**
         * <Antd.Select /> -> <Select />
         */
        ast.replaceBy(componentName)
      }
    }
  })

  return [...new Set(components)]
}

const pluginImport = (options = {}) => ({
  name: 'esbuild-plugin-import',
  setup(build, { transform } = {}) {
    const {
      filter = /\.(jsx|tsx|js|ts)$/,
      namespace = 'file',
      options: importOptions = [],
    } = options
    const transformContents = ({ contents, args }) => {
      const {path: filePath} = args

      const ext = path.extname(filePath).slice(1)
      return new Promise((resolve, reject) => {
        try {
          const source = gogocode(contents)

          source
            .find([`import {$$$1} from '$_$1'`, `import $$$1 from '$_$1'`])
            .each(ast => {
              const [libAst] = ast.match[1]
              const libraryName = libAst.value
              const option = importOptions.find(
                importOption => importOption.libraryName,
              )
              if (!option) {
                return
              }
              const {
                style,
                libraryDirectory = 'lib',
                camel2DashComponentName,
              } = option

              const astReplace = importSpecifier => {
                switch (importSpecifier.type) {
                  case 'ImportDefaultSpecifier': {
                    const localLibName = importSpecifier.local.name
                    const components = getUsedComponents(source, localLibName)
                    components.forEach(component => {
                      ast.after(
                        `import ${component} from '${libraryName}${libraryDirectory}/${
                          camel2DashComponentName
                            ? kebabCase(component)
                            : component
                        }/index'\n`,
                      )
                      style &&
                        ast.after(
                          `import '${libraryName}${libraryDirectory}/${
                            camel2DashComponentName
                              ? kebabCase(component)
                              : component
                          }/index.css'`,
                        )
                    })
                    break
                  }
                  default: {
                    const component = importSpecifier.local.name
                    ast.after(
                      `import ${component} from '${libraryName}${libraryDirectory}/${
                        camel2DashComponentName
                          ? kebabCase(component)
                          : component
                      }/index'\n`,
                    )
                    style &&
                      ast.after(
                        `import '${libraryName}${libraryDirectory}/${
                          camel2DashComponentName
                            ? kebabCase(component)
                            : component
                        }/index.css'`,
                      )
                  }
                }
              }

              ast.match.$$$1 && ast.match.$$$1.forEach(astReplace)
              ast.remove()
            })

          const result = source.generate()

          resolve({ contents: result, loader: ext.match(/j|tsx?$/) ? ext : 'js' })
        } catch (e) {
          console.error(e)
          reject(e)
        }
      })
    }

    if (transform) return transformContents(transform)

    build.onLoad({ filter, namespace }, async args => {
      try {
        const contents = await fs.promises.readFile(args.path, 'utf8')
        return transformContents({ args, contents })
      } catch (e) {
        console.error(e)
        process.exit(1)
      }
    })
  },
})

module.exports = pluginImport
