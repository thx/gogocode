const esbuild = require('esbuild')
const importPlugin = require('../index')

esbuild
  .build({
    entryPoints: ['test/index.jsx'],
    bundle: true,
    minify: false,
    outdir: 'dist',
    inject: ['test/react-shim.js'],
    loader: {
      '.jsx': 'jsx',
    },
    external: ['react', 'lodash', '@alife/mux-components', 'antd'],
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
  .catch(() => process.exit(1))
