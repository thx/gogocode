import { transformFileSync, transform } from '@babel/core'
import { join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import plugin from '../src/index'

describe('index', () => {
  afterEach(() => {
    global.__clearBabelAntdPlugin();
  });

  const fixturesDir = join(__dirname, 'fixtures');
  let fixtures = readdirSync(fixturesDir);
  const onlyFixtures = fixtures.filter(fixture => fixture.indexOf('-only') > -1);

  if (onlyFixtures.length) {
    fixtures = onlyFixtures;
  }

  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName);
    const actualFile = join(fixtureDir, 'actual.js');
    const expectedFile = join(fixtureDir, 'expected.js');

    it(`should work with ${caseName.split('-').join(' ')}`, () => {
      let pluginWithOpts;
      caseName = caseName.replace(/-only$/, '');
      if (caseName === 'import-css') {
        pluginWithOpts = [plugin, { libraryName: 'antd', style: true }];
      } else if (caseName === 'material-ui') {
        pluginWithOpts = [
          plugin,
          { libraryName: 'material-ui', libraryDirectory: '', camel2DashComponentName: false },
        ];
      } else if (caseName === 'keep-named-import') {
        pluginWithOpts = [plugin, { libraryName: 'stream', transformToDefaultImport: false }];
      } else if (caseName === 'react-toolbox') {
        pluginWithOpts = [
          plugin,
          { libraryName: 'react-toolbox', camel2UnderlineComponentName: true },
        ];
      } else if (caseName === 'use-multiple-times') {
        pluginWithOpts = [plugin, { libraryName: 'antd-mobile' }];
      } else if (caseName === 'file-name') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'antd-mobile-fake-2.0',
            fileName: 'index.native',
          },
        ];
      } else if (caseName === 'custom-name') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'plat/antd',
            customName: name => `antd/lib/${name}`,
          },
        ];
      } else if (caseName === 'custom-name-source-file') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'plat/antd',
            customName: join(__dirname, 'fixtures', 'custom-name-source-file', 'customName.js'),
          },
        ];
      } else if (caseName === 'custom-style-path') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'antd',
            style: name => `${name}/style/2x`,
          },
        ];
      } else if (caseName === 'custom-style-path-ignore') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'antd',
            style: name => {
              if (name === 'antd/lib/animation') {
                return false;
              }
              return `${name}/style/2x`;
            },
          },
        ];
      } else if (caseName === 'style-library-name') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'element-ui',
            styleLibraryDirectory: 'lib/theme-chalk',
          },
        ];
      } else if (caseName === 'custom-style-name') {
        pluginWithOpts = [
          plugin,
          {
            libraryName: 'element-ui',
            customStyleName: name => `element-ui/lib/theme-light/${name}`,
          },
        ];
      } else {
        pluginWithOpts = [plugin, { libraryName: 'antd' }];
      }

      const actual = (function () {
        if (caseName === 'modules-false') {
          return transform(readFileSync(actualFile), {
            presets: ['umi'],
            plugins: [[plugin, { libraryName: 'antd', style: true }]],
          }).code;
        } else if (caseName === 'multiple-libraries') {
          return transformFileSync(actualFile, {
            presets: ['@babel/preset-react'],
            plugins: [
              [plugin, { libraryName: 'antd' }, 'antd'],
              [plugin, { libraryName: 'antd-mobile' }, 'antd-mobile'],
            ],
          }).code;
        } else if (caseName === 'multiple-libraries-hilojs') {
          return transformFileSync(actualFile, {
            presets: ['@babel/preset-react'],
            plugins: [
              [plugin, { libraryName: 'antd' }, 'antd'],
              [
                plugin,
                {
                  libraryName: 'hilojs',
                  customName(name) {
                    switch (name) {
                      case 'class':
                        return `hilojs/core/${name}`;
                      default:
                        return `hilojs/${name}`;
                    }
                  },
                },
                'hilojs',
              ],
            ],
          }).code;
        } else if (caseName === 'super-class') {
          return transformFileSync(actualFile, {
            plugins: [[plugin, { libraryName: 'antd' }]],
            babelrc: false,
          }).code;
        } else {
          return transformFileSync(actualFile, {
            presets: ['@babel/preset-react'],
            plugins: [pluginWithOpts || plugin],
          }).code;
        }
      })();

      if (onlyFixtures.length) {
        console.warn();
        console.warn(actual);
      }

      const expected = readFileSync(expectedFile, 'utf-8');
      expect(actual.trim()).toEqual(expected.trim());
    });
  });

  xit(`tmp`, () => {
    const actualFile = join(fixturesDir, `variable-declaration/actual.js`);
    const actual = transformFileSync(actualFile, {
      presets: ['@babel/preset-react'],
      plugins: [plugin],
    }).code;
    console.log(actual);
  });
});