const { join } = require('path')
const glob = require('glob')
const { readdirSync, readFileSync } = require('fs')
const esbuild = require('esbuild')
const importPlugin = require('../index')

// ? 使用数组形式获取 actuals & expecteds
// ? 形如：[actuals, expecteds] = glob.sync(???)

// ? 使用通配的匹配符获取 name
const actuals = glob.sync('./fixtures/*/actual.js')
const expecteds = glob.sync('./fixtures/*/expected.js')

const getEsbuildOptions = (actualFile, pluginOptions, otherOptions) => {
  return {
    entryPoints: [actualFile],
    bundle: false,
    minify: false,
    outdir: 'dist',
    loader: {
      '.jsx': 'jsx',
    },
    format: 'cjs',
    plugins: [
      importPlugin(pluginOptions),
    ],
    ...otherOptions,
  }
}

describe('index', () => {
  const fixturesDir = join(__dirname, 'fixtures')
  const fixtures = readdirSync(fixturesDir)

  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName)
    const [actualFile] = glob.sync(`${fixtureDir}/actual.@(jsx|js)`)
    const expectedFile = join(fixtureDir, 'expected.js')

    it(`should work with ${caseName.split('-').join(' ')}`, async () => {
      let pluginOptions
      if (caseName === 'import-css') {
        pluginOptions = {
          options: [{ libraryName: 'antd', style: true }]
        }
      } else if (caseName === 'material-ui') {
        pluginOptions = {
          options: [
            {
              libraryName: 'material-ui',
              libraryDirectory: '',
              camel2DashComponentName: false,
            },
          ]
        }
      } else if (caseName === 'keep-named-import') {
        pluginOptions = {
          options: [
            { libraryName: 'stream', transformToDefaultImport: false },
          ]
        }
      } else if (caseName === 'react-toolbox') {
        pluginOptions = {
          options: [
            { libraryName: 'react-toolbox', camel2UnderlineComponentName: true },
          ]
        }
      } else if (caseName === 'use-multiple-times') {
        pluginOptions = {
          options: [{ libraryName: 'antd-mobile' }]
        }
      } else if (caseName === 'file-name') {
        pluginOptions = {
          options: [{
            libraryName: 'antd-mobile-fake-2.0',
            fileName: 'index.native',
          }]
        }
      } else if (caseName === 'custom-name') {
        pluginOptions = {
          options: [
            {
              libraryName: 'plat/antd',
              customName: name => `antd/lib/${name}`,
            },
          ]
        }
      } else if (caseName === 'custom-name-source-file') {
        pluginOptions = {
          options: [
            {
              libraryName: 'plat/antd',
              customName: join(
                __dirname,
                'fixtures',
                'custom-name-source-file',
                'customName.js',
              ),
            },
          ]
        }
      } else if (caseName === 'custom-style-path') {
        pluginOptions = {
          options: [
            {
              libraryName: 'antd',
              style: name => `${name}/style/2x`,
            },
          ]
        }
      } else if (caseName === 'custom-style-path-ignore') {
        pluginOptions = {
          options: [
            {
              libraryName: 'antd',
              style: name => {
                if (name === 'antd/lib/animation') {
                  return false
                }
                return `${name}/style/2x`
              },
            },
          ]
        }
      } else if (caseName === 'style-library-name') {
        pluginOptions = {
          options: [
            {
              libraryName: 'element-ui',
              styleLibraryDirectory: 'lib/theme-chalk',
            },
          ]
        }
      } else if (caseName === 'custom-style-name') {
        pluginOptions = {
          options: [
            {
              libraryName: 'element-ui',
              customStyleName: name => `element-ui/lib/theme-light/${name}`,
            },
          ]
        }
      } else if (caseName === 'multiple-libraries') {
        pluginOptions = {
          options: [
            [{ libraryName: 'antd' }],
            [{ libraryName: 'antd-mobile' }],
          ]
        }
      } else if (caseName === 'multiple-libraries-hilojs') {
        pluginOptions = {
          options: [
            { libraryName: 'antd' },
            {
              libraryName: 'hilojs',
              customName (name) {
                switch (name) {
                  case 'class':
                    return `hilojs/core/${name}`
                  default:
                    return `hilojs/${name}`
                }
              },
            },
          ]
        }
      } else {
        pluginOptions = {
          options: [{ libraryName: 'antd' }]
        }
      }

      await esbuild.build(getEsbuildOptions(actualFile, pluginOptions))
        .then(() => {
          const actual = readFileSync('dist/actual.js', 'utf-8')
          const expected = readFileSync(expectedFile, 'utf-8')
          expect(actual.trim()).toEqual(expected.trim())
        })
        .catch(e => {
          console.error(e)
        })
    })
  })
})
