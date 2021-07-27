const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');



test('$.attr: empty code', () => {
    expect(()=>{
       const G = $('');
       G.attr('a','a');
    }).not.toThrow();
})
test('$.attr: get attr', () => {
    expect(() => {
        const G = $(jc1);
        const b = G.attr('program');
    }).not.toThrow();
})
test('$.attr: simple code get attr', () => {
    expect(()=>{
       const G = $(jc1);
       const body = G.attr('program.body');
    }).not.toThrow();
})
test('$.attr: simple code get attr should to be ok', () => {
    const G = $(jc1);
    const body = G.attr('program.body');
    expect(Array.isArray(body)).toBeTruthy();
})
// later
// test('$.attr: simple code get attr should support array index ', () => {
//     const G = $(jc1);
//     const body0 = G.attr('program.body[0]');
//     expect(body0.kind === 'const').toBeTruthy();
// })
test('$.attr: simple code set attr', () => {
    expect(()=>{
       const G = $(jc1);
       G.attr('program.test','test');
    }).not.toThrow();
})
test('$.attr: simple code set attr result should be ok', () => {
    const G = $(jc1);
    G.attr('program.test','test');
    const result = G.node.program.test === 'test';
    expect(result).toBeTruthy();
})
test('$.attr: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.attr();
    }).not.toThrow();
})
test('$.attr: object input', () => {
    expect(()=>{
       const G = $(jc1);
       G.attr({a:'a'});
    }).not.toThrow();
})
test('$.attr: object input result should be ok', () => {
    expect(()=>{
       const G = $(jc1);
       G.attr({a:'a'});
    }).not.toThrow();
})
test('$.attr: attr key should be a string', () => {
    expect(() => {
        const G = $(jc1);
        G.attr(1, 'a');
    }).toThrow();
})

test('$.attr: simple1 html code get attr', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.attr('content');
    }).not.toThrow();
})
test('$.attr: simple1 html code get attr', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.attr('content.children');
    }).not.toThrow();
})
test('$.attr: simple1 html code get attr', () => {
    const G = $(hc1, config.html);
    const result = G.attr('content.children');
    expect(Array.isArray(result)).toBeTruthy();
})
test('$.attr: simple1 html code set attr', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.attr('content.test','test');
    }).not.toThrow();
})
test('$.attr: simple1 html code set attr result should be ok', () => {

    const G = $(hc1, config.html);
    G.attr('content.test', 'test');
    const result = G.node.content.test === 'test';
    expect(result).toBeTruthy();

})

test('$.attr: simple1 html code set attr result should be ok', () => {

    const result = $(`<div v-model="a"></div>`, config.html)
    .find(`<$_$1 v-model="$_$2"></$_$1>`)
    .each(item => {
        item.attr('content.attributes').push({
            key: { type: "token:attribute-key", content: 'newAttr'},
            value: { type: 'token:attribute-value', content: '1'}
        })
    })
    .root()
    .generate()
    expect(result.match('newAttr')).toBeTruthy();
})