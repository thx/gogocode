import { transformFileSync, transform } from '@babel/core'
import { join } from 'path'
import glob from 'glob'
import { readdirSync, readFileSync } from 'fs'
import plugin from '../src/index'
import esbuild from 'esbuild'
import importPlugin from '../index'

// ? 使用数组形式获取 actuals & expecteds
// ? 形如：[actuals, expecteds] = glob.sync(???)

// ? 使用通配的匹配符获取 name
const actuals = glob.sync('./fixtures/*/actual.js')
const expecteds = glob.sync('./fixtures/*/expected.js')

/* XXX: 之后可以通过多入口来提升测试速度 */
const getEsbuildOptions = (actualFile, pluginOptions, otherOptions) => {
  return {
    entryPoints: [actualFile],
    bundle: false,
    minify: false,
    outdir: 'dist',
    inject: ['test/react-shim.js'],
    loader: {
      '.jsx': 'jsx',
    },
    plugin: [
      importPlugin(pluginOptions),
    ],
    ...otherOptions,
  }
}
describe('index', async () => {
  const fixturesDir = join(__dirname, 'fixtures')
  const fixtures = readdirSync(fixturesDir)

  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName)
    const actualFile = join(fixtureDir, 'actual.js')
    const expectedFile = join(fixtureDir, 'expected.js')
    console.log('caseName', caseName)
    it(`should work with ${caseName.split('-').join(' ')}`, () => {
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
          options: {
            libraryName: 'plat/antd',
            customName: name => `antd/lib/${name}`,
          },
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

      
      /** ==================== esbuild.build ==================== */
      // if (caseName === 'modules-false') {
      //   return transform(readFileSync(actualFile), {
      //     presets: ['umi'],
      //     plugins: [[plugin, { libraryName: 'antd', style: true }]],
      //   }).code
      // } 
      // if (caseName === 'multiple-libraries') {
      //   return transformFileSync(actualFile, {
      //     presets: ['@babel/preset-react'],
      //     plugins: [
      //       [plugin, { libraryName: 'antd' }, 'antd'],
      //       [plugin, { libraryName: 'antd-mobile' }, 'antd-mobile'],
      //     ],
      //   }).code
      } else if (caseName === 'multiple-libraries-hilojs') {
        esbuild.build(getEsbuildOptions(actualFile))
        return transformFileSync(actualFile, {
          plugins: [
            [plugin, { libraryName: 'antd' }, 'antd'],
            [
              plugin,
              {
                libraryName: 'hilojs',
                customName(name) {
                  switch (name) {
                    case 'class':
                      return `hilojs/core/${name}`
                    default:
                      return `hilojs/${name}`
                  }
                },
              },
              'hilojs',
            ],
          ],
        }).code
      }
      // else if (caseName === 'super-class') {
      //   return transformFileSync(actualFile, {
      //     plugins: [[plugin, { libraryName: 'antd' }]],
      //     babelrc: false,
      //   }).code
      //   return esbuild.build()
      // }
      else {
        await esbuild.build(getEsbuildOptions(actualFile, pluginOptions))
      }

      const actual = readFileSync('dist/index.js', 'utf-8')

      const expected = readFileSync(expectedFile, 'utf-8')
      expect(actual.trim()).toEqual(expected.trim())
    })
  })

  xit(`tmp`, () => {
    const actualFile = join(fixturesDir, `variable-declaration/actual.js`)
    const actual = transformFileSync(actualFile, {
      presets: ['@babel/preset-react'],
      plugins: [plugin],
    }).code
    console.log(actual)
  })
})
