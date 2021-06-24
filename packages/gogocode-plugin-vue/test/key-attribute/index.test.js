const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/key-attribute');

test('key-attribute', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast);        
    }).not.toThrow();
})

test('key-attribute', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);
    let result = true;
    ast.find('<template></template>')
    .find(['<$_$></$_$>', '<$_$ />']).each((ast) => {       
        let attrList = Array.isArray(ast.attr('content.attributes')) ? ast.attr('content.attributes') : []
        result = attrList.some(attr => { 
            return attr.key 
                && ['v-if', 'v-else', 'v-else-if'].indexOf(attr.key.content) > -1
                && ['key', ':key', 'v-bind:key'].indexOf(attr.key.content) > -1
        })
    })
    expect(result).toBeTruthy();
})
