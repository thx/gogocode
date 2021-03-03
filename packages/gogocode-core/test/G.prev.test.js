const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.prev: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.prev();
    }).not.toThrow();
})
test('$.prev: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.prev();
    }).not.toThrow();
})
test('$.prev: simple code 2', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
            let b = 2;
        }
        test();
        `
        const G = $(code)
        const ss = G.prev()
    }).not.toThrow()
})


test('$.prev: simple code 3', () => {
    expect(() => {
        const code = `
        let obj = { a: 1, b: 2 };
        let c = obj.a + obj.b;
        `
        const G = $(code)
        const ss = G.prev()
    }).not.toThrow()
})
test('$.prev: simple code 4', () => {
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
        const ss = G.prev()
    }).not.toThrow()
})
test('$.prev: simple code 4', () => {
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
    const result = G.prev().generate()
    const compareCode = $(`function eat(){
    console.log('do eat');
}`).generate();
    expect(result).toBe(compareCode);
})
test('$.prev: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.prev();
    }).not.toThrow();
})
test('$.prev: simple2 code result should be ok', () => {
    const G = $(jc2).find(`this.updater.digest({ list, total })`);
    const result = G.prev().generate()
    const compareCode = $(`let total = result.total || 0`).generate();
    expect(result).toBe(compareCode);
})
test('$.prev: simple html code', () => {
    const code = `<div>
    <a href="xxx">is a link</a>
    <span>test</span>
    </div>`;
    expect(() => {
        const G = $(code, config.html).find('<span>$_$</span>');
        G.prev();
    }).not.toThrow();
})
test('$.prev: simple html code result should be ok', () => {
    const code = `<div>
    <a href="xxx">is a link</a>
    <span>test</span>
    </div>`;

    const G = $(code, config.html).find('<span>$_$</span>');
    const result = G.prev().generate();
    expect(result).toBe(`\n    `);

})
