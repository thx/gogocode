import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import insert from 'rollup-plugin-insert';
import pkg from './package.json';

const commonPlugins = [
    json(),
    builtins(),
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.platform': JSON.stringify('darwin'),
        'process.env': '{}',
        'process.stdout': 'null',
    }),
    insert.prepend(
        `const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};`
    ),
];

export default [
    // browser-friendly UMD build
    {
        input: 'index.js',
        output: {
            name: 'gogocode',
            file: pkg.browser,
            format: 'umd',
        },
        plugins: commonPlugins,
    },
    {
        input: 'index.js',
        output: {
            name: 'gogocode',
            file: 'umd/gogocode.min.js',
            format: 'umd',
        },
        plugins: [...commonPlugins, terser()],
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
