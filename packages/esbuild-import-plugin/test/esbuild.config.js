const esbuild = require('esbuild')
const importPlugin = require('../index')

esbuild
    .build({
        entryPoints: ['test/index.js'],
        bundle: false,
        minify: false,
        outdir: 'dist',
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
