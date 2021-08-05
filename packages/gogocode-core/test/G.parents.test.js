const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
const CODE = `
function parent(){
    let name = 'jerry';
    function eat(){
        console.log('do eat');
    }
}
`
test('$.parents: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.parents();
    }).not.toThrow();
})
test('$.parents: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.parents();
    }).not.toThrow();
})
test('$.parents: parents find', () => {
    expect(()=>{
       const G = $(CODE).find('let $_$ = $_$;');
       const parents = G.parents();
       const psCode = parents.generate();
    }).not.toThrow();
})
test('$.parents: parents find', () => {
    expect(()=>{
       const G = $(CODE).find('let $_$ = \'$_$\';');
       G.parents();
    }).not.toThrow();
})

test('$.parents: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.parents();
    }).not.toThrow();
})
test('$.parents: simple2 code parents find result should be ok', () => {
    const G = $(jc2).find('this.render()');
    const parent = G.parents();
    const psCode = parent.eq(1).generate();
    expect(psCode).toBe(
`{
    this.render()
}`
    );
})
test('$.parents: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const parent = G.parents();
    expect(!parent[0]).toBeTruthy();
})
test('$.parents: simple1 html code use find result should be ok', () => {
    const G = $(hc1, config.html);
    const parent = G.find('<title>title</title>').parents();
    const psCode = parent.generate();
    expect(psCode.indexOf('<head>' >  -1)).toBeTruthy();
})
