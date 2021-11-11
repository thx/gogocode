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
test('$.parent: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.parent();
    }).not.toThrow();
})
test('$.parent: simple code result should be ok', () => {

    const G = $('var a = 1;');
    const code = G.parent().generate();
    expect(code).toBe('var a = 1;');

})
test('$.parent: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.parent();
    }).not.toThrow();
})
test('$.parent: parents find', () => {
    expect(()=>{
       const G = $(CODE).find('let $_$ = $_$;');
       const parent = G.parent();
       const psCode = parent.generate();
    }).not.toThrow();
})
test('$.parent: parents find result should be ok', () => {
    const G = $(CODE).find('let $_$ = $_$;');
    const parent = G.parent();
    const psCode = parent.generate();
    expect(psCode).toBe(
`{
    let name = 'jerry';
    function eat(){
        console.log('do eat');
    }
}`
    );
})
test('$.parent: simple2 code parents find result should be ok', () => {
    const G = $(jc2).find('this.render()');
    const parent = G.parent();
    // 做了处理 不生成大括号
    const psCode = parent.generate();
    expect(psCode).toBe(
`this.render()`
    );
})
test('$.parent: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.parent();
    }).not.toThrow();
})
test('$.parent: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.parent();
    }).not.toThrow();
})

test('$.parent: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const parent = G.parent();
    const psCode = parent.generate();
    expect(psCode.indexOf('<html>' >  -1)).toBeTruthy();
})
test('$.parent: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const parent = G.find('<title>title</title>').parent();
    const psCode = parent.generate();
    expect(psCode.indexOf('<head>' >  -1)).toBeTruthy();
})

test('$.parent: simple1 html code result should be ok', () => {
    let res = $(`that.fun('test').fun1().fun2()`)
    .find(`fun`)
    .parent({ type: 'MemberExpression'})
    expect(res.length == 3).toBeTruthy();
})