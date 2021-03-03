const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.prepend: empty code should not throw error', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prepend('');
    }).not.toThrow();
})
test('$.prepend: null should throw error', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prepend(null);
    }).toThrow();
})
test('$.prepend: undefined should throw error', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prepend(undefined);
    }).toThrow();
})
test('$.prepend: simple code', () => {
    expect(()=>{
        const CODE = `
        function a(){
            var a = 1;
        }
        `;
       $(CODE).prepend('var a = 1;');
    }).not.toThrow();
})
test('$.prepend: simple code result should to be passed', () => {
    const G = $(jc2).prepend($('{test:function(){}}').node);
    const result = G.node.program.body[0].properties[0].key.name === 'test';
    expect(result).toBeTruthy();
});
test('$.prepend: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prepend($('var b = 1;'));
    }).not.toThrow();
})
test('$.prepend: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prepend($('var b = 1;').node);
    }).not.toThrow();
})
test('$.prepend: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.prepend('<span>span</span>');
    }).not.toThrow();
})
test('$.prepend: simple1 html code result should to be ok', () => {
    const CODE = '<div>test prepend</div>'
    const G = $(hc1, config.html);
    const result = G.find('<html>').prepend(CODE).generate();
    expect(result.indexOf(CODE) > -1).toBeTruthy();
})