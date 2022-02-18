const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/events-api');

test('events-api', () => {

    expect(() => {

        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast,{ gogocode: $ }, {outRootPath: __dirname +'/' ,outFilePath:vuePath});        
    }).not.toThrow();
})
