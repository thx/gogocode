const esbuild = require('esbuild')
const importPlugin = require('../index')
const { readFileSync } = require('fs')

const result = esbuild
  .build({
    entryPoints: ['test/index.jsx'],
    bundle: false,
    minify: false,
    inject: ['test/react-shim.js'],
    loader: {
      '.jsx': 'jsx',
    },
    incremental: true,
    // external: ['react', 'lodash', '@alife/mux-components', 'antd'],
    plugins: [
      importPlugin({
        options: [
          {
            libraryName: 'lodash',
            libraryDirectory: '',
            camel2DashComponentName: false,
          },
          {
            libraryName: 'antd',
            style: true,
          },
          {
            libraryName: '@alife/mux-components',
            libraryDirectory: 'dist/es',
            style: true,
          },
        ],
      }),
    ],
  })

1
console.log('result', result)

