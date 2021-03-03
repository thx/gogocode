const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.next: empty code', () => {
    expect(()=>{
       const G = $('');
       G.next();
    }).not.toThrow();
})
test('$.next: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G.next();
    }).not.toThrow();
})
test('$.next: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.next();
    }).not.toThrow();
})
test('$.next: simple code 2', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
            let b = 2;
        }
        test();
        `
        const G = $(code)
        const ss = G.next()
    }).not.toThrow()
})


test('$.next: simple code 3', () => {
    expect(() => {
        const code = `
        let obj = { a: 1, b: 2 };
        let c = obj.a + obj.b;
        `
        const G = $(code)
        const ss = G.next()
    }).not.toThrow()
})
test('$.next: simple code 4', () => {
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
        const ss = G.next()
    }).not.toThrow()
})
test('$.next: simple code 4 result should be ok', () => {
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
    const result = G.next().generate()
    const compareCode = $(`function eat(){
    console.log('do eat');
}`).generate();
    expect(result).toBe(compareCode);
})
test('$.next: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.next();
    }).not.toThrow();
})
test('$.next: simple html code', () => {
    const code = `<div>
    <span>test</span>
    <a href="xxx">is a link</a>
    </div>`;
    expect(() => {
        const G = $(code, config.html).find('<span>$_$</span>');
        G.next();
    }).not.toThrow();
})
test('$.next: simple html code result should be ok', () => {
    const code = `<div>
    <span>test</span>
    <a href="xxx">is a link</a>
    </div>`;

    const G = $(code, config.html).find('<span>$_$</span>');
    const result = G.next().generate();
    expect(result).toBe(`\n    `);

})