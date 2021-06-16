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
      const { path: filePath } = args

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
                importOption => importOption.libraryName === libraryName,
              )
              if (!option) {
                return
              }
              const {
                style,
                libraryDirectory = 'lib',
                camel2DashComponentName = 'true',
                styleLibraryDirectory,
                customStyleName,
                customName,
              } = option

              const importStyle = (ast, component) => {
                  if (!style && !styleLibraryDirectory) {
                    return
                  }
                  const formatedComponentName = camel2DashComponentName
                    ? kebabCase(component)
                    : component
                  let finalCssPath

                  if (customStyleName && typeof customStyleName === 'function') {
                    finalCssPath = customStyleName(formatedComponentName)
                    if (!finalCssPath) {
                      return
                    }
                  } else {
                    const libPath = `${libraryName}/${(styleLibraryDirectory || libraryDirectory) + '/'}${formatedComponentName}`
                    let cssPath
                    if (typeof style === 'function') {
                      cssPath = style(libPath)
                      if (!cssPath) {
                        return
                      }
                    } else {
                      cssPath = style === 'css' ? 'style/css' : 'style'
                    }
                    finalCssPath = `${libPath}/${cssPath}`
                  }
                  ast.after(
                    `import '${finalCssPath}'\n`,
                  )
              }

              const importComponent = (ast, component) => {
                const formatedComponentName = camel2DashComponentName
                  ? kebabCase(component)
                  : component
                let finalComponentPath
                if (customName && typeof customName === 'function') {
                  finalComponentPath = customName(formatedComponentName)
                  if (!finalComponentPath) {
                    return
                  }
                } else {
                  finalComponentPath = `${libraryName}/${libraryDirectory + '/'}${formatedComponentName}/index`
                }
                ast.after(
                  `import ${component} from '${finalComponentPath}'\n`,
                )
              }
              const astReplace = importSpecifier => {
                switch (importSpecifier.type) {
                  case 'ImportDefaultSpecifier': {
                    const localLibName = importSpecifier.local.name
                    const components = getUsedComponents(source, localLibName)
                    components.forEach(component => {
                      importStyle(ast, component)
                      importComponent(ast, component)
                    })
                    break
                  }
                  default: {
                    const component = importSpecifier.local.name
                    importStyle(ast, component)
                    importComponent(ast, component)
                  }
                }
              }

              ast.match.$$$1 && ast.match.$$$1.forEach(astReplace)
              ast.remove()
            })

          const result = source.generate()
          resolve({
            contents: result,
            loader: ext.match(/j|tsx?$/) ? ext : 'js',
          })
        } catch (e) {
          console.error(e)
          reject(e)
          // process.exit(1)
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

exports.default = pluginImport
module.exports = pluginImport
