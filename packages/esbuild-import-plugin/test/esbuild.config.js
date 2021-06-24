const esbuild = require('esbuild')

esbuild.build({
    entryPoints: ['./test/index'],
    bundle: true,
    minify: true,
    outdir: 'dist',
})