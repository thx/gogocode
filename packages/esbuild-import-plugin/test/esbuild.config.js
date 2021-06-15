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
    inject: ['test/react-shim.js'],
    loader: {
      '.jsx': 'jsx',
    },
    incremental: true,
  })


