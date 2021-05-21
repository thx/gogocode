const plugin = require('./plugin')

module.exports = {
    input:'input1.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs'
    },
    plugins:[
        plugin() 
    ],
}
