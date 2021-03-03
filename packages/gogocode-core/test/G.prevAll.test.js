const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.prevAll: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prevAll();
    }).not.toThrow();
})
test('$.prevAll: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.prevAll();
    }).not.toThrow();
})
test('$.prevAll: simple code 2', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
            let b = 2;
        }
        test();
        `
        const G = $(code)
        const ss = G.prevAll()
    }).not.toThrow()
})


test('$.prevAll: simple code 3', () => {
    expect(() => {
        const code = `
        let obj = { a: 1, b: 2 };
        let c = obj.a + obj.b;
        `
        const G = $(code)
        const ss = G.prevAll()
    }).not.toThrow()
})
test('$.prevAll: simple code 4', () => {
    expect(() => {
        const code = `
        function parent(){
            function eat(){
                console.log('do eat');
            }
            let name = 'jerry';
        }
        parent();
        `
        const G = $(code).find('let $_$ = \'$_$\'');
        const ss = G.prevAll()
    }).not.toThrow()
})
test('$.prevAll: simple code 4', () => {
    const code = `
    function parent(){
        function eat(){
            console.log('do eat');
        }
        let name = 'jerry';
    }
    parent();
    `
    const G = $(code).find('let $_$ = \'$_$\'');
    const result = G.prevAll().generate()
    const compareCode = $(`function eat(){
    console.log('do eat');
}`).generate();
    expect(result).toBe(compareCode);
})
test('$.prevAll: simple2 code result should be ok', () => {
    const G = $(jc2).find(`this.updater.digest({ list, total })`);
    const result = G.prevAll().generate()
    const compareCode = $(`const params = { name: '1' };`).generate();
    expect(result).toBe(compareCode);
})
test('$.prevAll: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.prevAll();
    }).not.toThrow();
})
test('$.prevAll: simple html code', () => {
    const code = `<div>
    <a href="xxx">is a link</a>
    <span>test</span>
    </div>`;
    expect(() => {
        const G = $(code, config.html).find('<span>$_$</span>');
        G.prevAll();
    }).not.toThrow();
})
test('$.prevAll: simple html code result should be ok', () => {
    const code = `<div>
    <a href="xxx">is a link</a>
    <span>test</span>
    </div>`;
    const G = $(code, config.html).find('<span>$_$</span>');
    const result = G.prevAll().generate();
    expect(result).toBe(`\n    `);
})