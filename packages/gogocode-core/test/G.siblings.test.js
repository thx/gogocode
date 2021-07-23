const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$.siblings: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.siblings();
    }).not.toThrow();
})
test('$.siblings: simple code', () => {
    expect(()=>{
       const G = $('var a = 1;')
       G.siblings()
    }).not.toThrow()
})
test('$.siblings: simple code 2', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
            let b = 2;
        }
        test();
        `
        const G = $(code)
        const ss = G.siblings()
    }).not.toThrow()
})


test('$.siblings: simple code 3', () => {
    expect(() => {
        const code = `
        let obj = { a: 1, b: 2 };
        let c = obj.a + obj.b;
        `
        const G = $(code)
        const ss = G.siblings()
    }).not.toThrow()
})
test('$.siblings: simple code 4', () => {
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
        const ss = G.siblings()
    }).not.toThrow()
})
test('$.siblings: simple code 4', () => {
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
    const result = G.siblings().generate()
    const compareCode = $(`function eat(){
    console.log('do eat');
}`).generate();
    expect(result).toBe(compareCode);
})
test('$.siblings: simple2 code result should be ok', () => {
  
    const G = $(jc1).find('let $_$ = \'$_$\'');
    const result = G.siblings().generate()
    const compareCode = $(`const $ = require('../index');`).generate();
    expect(result).toBe(compareCode);
})
test('$.siblings: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
        G.siblings();
    }).not.toThrow();
})

test('$.siblings: simple html code', () => {
    const code = `<div>
    <img src=""/>
    <span>test</span>
    <a href="xxx">is a link</a>
    </div>`;
    expect(() => {
        const G = $(code, config.html).find('<span>$_$</span>');
        const s = G.siblings();
    }).not.toThrow();
})
test('$: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        const s = G.siblings();
    }).not.toThrow();
})
test('$: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const s = G.siblings();
    const code = s.generate();
    expect(code).toBe('\n');
})
test('$: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const s = G.siblings().eq(0);
    const code = s.generate();
    expect(code).toBe('\n        ');
})

test('$: simple1 html code result should be ok', () => {
    const res = $(`
    //a
function foo(){
    console.log('foo')
}
function foo1(){
    console.log('foo1')
}
//b
function foo2(){
    console.log('foo2')
}
`)
    .find('//b')
    .parent(1)
    .siblings()
    .generate();

    expect(!!res.match('a')).toBeTruthy();
})