const esbuild = require('esbuild')
const importPlugin = require('../index')
const { readFileSync } = require('fs')

esbuild
  .build({
    entryPoints: ['test/index.jsx'],
    bundle: true,
    minify: false,
    external: ['react', 'antd'],
    outdir: 'dist',
    loader: {
      '.jsx': 'jsx',
    },
    plugins: [
      importPlugin({
        options: [{ libraryName: 'antd', style: true }]
      })
    ]
  })
