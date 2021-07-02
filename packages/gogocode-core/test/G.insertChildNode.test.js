const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.insertChildNode: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.insertChildNode('','');
    }).not.toThrow();
})
test('$.insertChildNode: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.insertChildNode();
    }).not.toThrow();
})
test('$.insertChildNode: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.insertChildNode('','');
    }).not.toThrow();
})