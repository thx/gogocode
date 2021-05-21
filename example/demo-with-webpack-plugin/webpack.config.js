const Plugin = require('./plugin')

const path = require('path')

module.exports = {
    mode: 'development',
    entry: './input1.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new Plugin()
    ],
}