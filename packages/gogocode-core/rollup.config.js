import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const commonPlugins = [
    json(),
    commonjs(),
    resolve({ preferBuiltins: false, browser: true }),
    nodePolyfills(),
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
        onwarn: function (warning) {
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            console.error(warning.message);
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
        onwarn: function (warning) {
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            console.error(warning.message);
        },
        plugins: [...commonPlugins, terser()],
    },
];
