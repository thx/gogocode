const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jv = require('./code/simple-vue');
const hc1 = require('./code/simple1.html');

test('$.clone: empty code', () => {
    expect(()=>{
       const G = $('');
       G.clone();
    }).not.toThrow();
})

test('$.clone: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.clone();
    }).not.toThrow();
})
test('$.clone: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.clone();
    }).not.toThrow();
})
test('$.clone: this[0] is null,return should be self', () => {
    const G = $('var a = 1;');
    G[0] = null
    const newOne = G.clone();
    expect(!!newOne).toBeTruthy();
})
test('$.clone: should not be the same instance', () => {
    const G = $('var a = 1;');
    const newG = G.clone();
    expect(G === newG).not.toBeTruthy();
})

test('$.clone: deep equal ',()=>{
    const G = $('var a = 1;');
    const newG = G.clone();
   // expect(G.node).toEqual(newG.node);
})
test('$.clone: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const newG = G.clone();
    }).not.toThrow();
})
test('$.clone: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const newG = G.clone();
    expect(newG.node).toEqual(G.node);
})
test('$.clone: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const newG = G.clone();
    expect(newG.node).toEqual(G.node);
})
test('$.clone: test vue', () => {
    expect(() => {
        $(jv, config.vue)
            .find('<template></template>').find('<$_$1 v-for=$_$2>').each(function (ast) {
                const newAst = ast.clone();
                console.log(newAst);
            });
    }).not.toThrow();
})

test('$.clone: test vue', () => {
    const newAst = $(`const a = {
        age: 22,
        some: 'foo'
        }`)
        .clone()
    expect(newAst.find('const a = { $$$ }').generate().match('age')).toBeTruthy()
})
