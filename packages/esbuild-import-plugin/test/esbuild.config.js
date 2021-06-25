const esbuild = require('esbuild')
const importPlguin = require('../index')

esbuild.build({
  entryPoints: ['./test/index'],
  bundle: false,
  minify: false,
  outdir: 'dist',
  format: 'cjs',
  plugins: [
    importPlguin({
      options: [
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: true,
        },
      ],
    }),
  ],
})
