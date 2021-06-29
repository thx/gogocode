import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'index.js',
        output: {
            name: 'gogocode',
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            json(),
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
        ],
    },
    {
        input: 'index.js',
        output: {
            name: 'gogocode',
            file: 'umd/gogocode.min.js',
            format: 'umd',
        },
        plugins: [
            json(),
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            terser()
        ],
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    // {
    //     input: 'index.js',
    //     output: [
    //         { file: pkg.main, format: 'cjs' },
    //         { file: pkg.module, format: 'es' },
    //     ],
    //     plugins: [
    //         resolve(), // so Rollup can find `ms`
    //         commonjs(), // so Rollup can convert `ms` to an ES module
    //     ],
    // },
];
