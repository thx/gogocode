const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.append: empty code should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.append('');
    }).not.toThrow();
})
test('$.append: null should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.append(null);
    }).not.toThrow();
})
test('$.append: undefined should not throw error', () => {
    expect(() => {
        const G = $('var a = 1;');
        G.append(undefined);
    }).not.toThrow();
})
test('$.append: simple code should not throw error', () => {
    expect(() => {
        const CODE = `
        function a(){
            var a = 1;
        }
        `;
        $(CODE).append('var a = 1;');
    }).not.toThrow();
})
test('$.append: simple code with $ object should not throw error', () => {
    expect(() => {
        const CODE = `
        var a = 1;
        `;
        $(CODE).append($(` function a(){
            var a = 1;
        }`));
    }).not.toThrow();
})
test('$.append: simple code result should be ok', () => {

    const CODE = `
        var b = 1;
        `;
    const code = $(CODE).append($(` function a(){
            var a = 1;
        }`)).generate();

    const compareCode = '\n        var b = 1;\n        function a(){\n                   var a = 1;\n               }\n        ';
    expect(code).toBe(compareCode);

})
test('$.append: simple code result should be ok', () => {
    const CODE = `
    function a(){
        var a = 1;
    }
    `;
    const code = $(CODE).append($('var b = 1;').node).generate();
    const compareCode = '\n    function a(){\n        var a = 1;\n    }\n    var b = 1;\n    ';
    expect(code).toBe(compareCode);
})
test('$.append: simple2 code result should to be passed', () => {
    const G = $(jc2).append($('{test:function(){}}').node);
    const result = G.node.program.body[G.node.program.body.length - 1].properties[0].key.name === 'test';
    expect(result).toBeTruthy();
});
test('$.append: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(hc1, config.html);
        G.append('<span>span</span>');
    }).not.toThrow();
})
test('$.append: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
    }).not.toThrow();
})
test('$.append: simple1 html code result should to be ok', () => {

    const CODE = '<div>test append</div>'
    const G = $(hc1, config.html);
    const result = G.find('<html>').append(CODE).generate();
    expect(result.indexOf(CODE) > -1).toBeTruthy();

})