const esbuild = require('esbuild')
const importPlugin = require('../index')
const { readFileSync } = require('fs')

esbuild
  .build({
    entryPoints: ['test/index.jsx'],
    bundle: false,
    minify: false,
    // external: ['react', 'antd'],
    outdir: 'dist',
    loader: {
      '.jsx': 'jsx',
    },
    format: 'cjs',
    plugins: [
      // importPlugin({
      //   options: [
      //     { libraryName: 'antd' },
      //     {
      //       libraryName: 'hilojs',
      //       customName (name) {
      //         switch (name) {
      //           case 'class':
      //             return `hilojs/core/${name}`
      //           default:
      //             return `hilojs/${name}`
      //         }
      //       },
      //     },
      //   ]
      // })
    ]
  })
