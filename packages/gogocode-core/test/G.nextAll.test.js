const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.nextAll: empty code', () => {
    expect(()=>{
       const G = $('');
       G.nextAll();
    }).not.toThrow();
})
test('$.nextAll: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.nextAll();
    }).not.toThrow();
})
test('$.nextAll: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.nextAll();
    }).not.toThrow();
})
test('$.nextAll: simple code 2', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
            let b = 2;
        }
        test();
        `
        const G = $(code)
        const ss = G.nextAll()
    }).not.toThrow()
})


test('$.nextAll: simple code 3', () => {
    expect(() => {
        const code = `
        let obj = { a: 1, b: 2 };
        let c = obj.a + obj.b;
        `
        const G = $(code)
        const ss = G.nextAll()
    }).not.toThrow()
})
test('$.nextAll: simple code 4', () => {
    expect(() => {
        const code = `
        function parent(){
            let name = 'jerry';
            function eat(){
                console.log('do eat');
            }
        }
        parent();
        `
        const G = $(code).find('let $_$ = \'$_$\'');
        const ss = G.nextAll()
    }).not.toThrow()
})
test('$.nextAll: simple code 4', () => {
    const code = `
    function parent(){
        let name = 'jerry';
        function eat(){
            console.log('do eat');
        }
    }
    parent();
    `
    const G = $(code).find('let $_$ = \'$_$\'');
    const result = G.nextAll().generate()
    const compareCode = $(`function eat(){
    console.log('do eat');
}`).generate();
// comment：可以考虑去掉换行符和空格之后再做对比，不然代码缩进会影响结果
    expect(result).toBe(compareCode);
})
test('$.nextAll: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.nextAll();
    }).not.toThrow();
})
test('$.nextAll: simple html code', () => {
    const code = `<div>
    <span>test</span>
    <a href="xxx">is a link</a>
    </div>`;
    expect(() => {
        const G = $(code, config.html).find('<span>$_$</span>');
        G.nextAll();
    }).not.toThrow();
})

test('$.nextAll: simple html code result should be ok', () => {
    const code = `<div>
    <span>test</span>
    <a href="xxx">is a link</a>
    </div>`;
    const G = $(code, config.html).find('<span>$_$</span>');
    const result = G.nextAll().generate();
    expect(result).toBe(`\n    `);
})