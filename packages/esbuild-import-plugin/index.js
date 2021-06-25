const gogocode = require('gogocode')
const fs = require('fs')
const kebabCase = require('lodash/kebabCase')
const path = require('path')
/**
 * 搜索
 * const { Button, Select } = Antd -> {remove}
 * const Button = Antd.Button -> {remove}
 * const AntdSelect = Antd.Select -> {remove}
 * <Antd.Button>click me!!</Antd.Button> -> <Button>click me!!</Button>
 */
const getUsedComponents = (source, libName) => {
  const components = []
  const usedComponents = source.find([`<${libName}.$_$ $$$ />`, `<${libName}.$_$ $$$></${libName}.$_$>`])

  /**
   *  <Antd.Button>click me!!</Antd.Button> -> <Button>click me!!</Button>
   *  <Antd.TimePicker value={value} /> -> <TimePicker value={value} />
   */
  usedComponents.each(ast => {
    const componentName = ast.match[0][0].value
    components.push({
      local: componentName,
      source: componentName,
    })
    ast.attr('openingElement.name', gogocode(componentName, {isProgram: false}).node)
    ast.attr('closingElement.name', gogocode(componentName, {isProgram: false}).node)
  })

  /**
   * const Button = Antd.Button -> {remove}
   * var MySelect = Antd.Select -> {remove}
   */
  source.find([`const $_$ = ${libName}.$_$1`, `var $_$ = ${libName}.$_$1`, `let $_$ = ${libName}.$_$1`])
    .each(ast => {
      const {value: localName} = ast.match[0][0]
      const {value: sourceName} = ast.match[1][0]
      components.push({
        local: localName,
        source: sourceName
      })
      ast.remove()
    })

  /**
   * const { Button: MyButton, Select } = Antd
   */
  source.find([`const {$$$} = ${libName}`, `var {$$$} = ${libName}`, `let {$$$} = ${libName}`])
    .each(ast => {
      const spreadComponents = ast.match.$$$$
      spreadComponents.forEach(component => {
        const localName = component.value.name
        const sourceName = component.original.key.name
        components.push({
          local: localName,
          source: sourceName,
        })
      })
      ast.remove()
    })
  return [...new Set(components)]
}

const pluginImport = (options = {}) => ({
  name: 'esbuild-plugin-import',
  setup(build) {
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
                const { source } = component
                if (!style && !styleLibraryDirectory) {
                  return
                }
                const formatedComponentName = camel2DashComponentName
                  ? kebabCase(source)
                  : source
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
                const { local, source } = component
                const formatedComponentName = camel2DashComponentName
                  ? kebabCase(source)
                  : source
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
                  `import ${local} from '${finalComponentPath}'\n`,
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
                    const componentName = importSpecifier.local.name
                    importStyle(ast, {
                      local: componentName,
                      source: componentName
                    })
                    importComponent(ast, {
                      local: componentName,
                      source: componentName
                    })
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
