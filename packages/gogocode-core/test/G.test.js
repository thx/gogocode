const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');
test('$:first input is empty string should not throw error', () => {
    expect(() => {
        const G = $('')
    }).not.toThrow();
})


test('$: first input is empty object should throw error', () => {
    expect(() => {
        const G = $({});
    }).toThrow();
})

test('$: first input is undefined should not throw error', () => {
    expect(() => {
        const G = $(undefined);
    }).not.toThrow();
})

test('$: first input is null should not throw error ', () => {
    expect(() => {
        const G = $(null);
    }).not.toThrow();
})

test('$: second input is undefined should throw error ', () => {
    expect(() => {
        const G = $('var a = 1;', undefined);
    }).not.toThrow();
})

test('$: second input is null should throw error ', () => {
    expect(() => {
        const G = $('var a = 1;', null);
    }).toThrow();
})

test('$: second input is empty object should not throw error ', () => {
    expect(() => {
        const G = $('var a = 1;', {});
    }).not.toThrow();
})
test('$: second input is {isProgram: true} should not throw error ', () => {
    expect(() => {
        const G = $('var a = 1;', {isProgram: true});
    }).not.toThrow();
})

test('$: second input astFragment is empty should not throw error ', () => {
    expect(() => {
        const G = $('var a = 1;', { astFragment: '' });
    }).not.toThrow();
})

test('$: second input astFragment is empty should not throw error ', () => {
    expect(() => {
        const G = $('var a = 1;', { astFragment: 'test' });
    }).not.toThrow();
})

test('$: simple js code', () => {
    expect(() => {
        const G = $('var a = 1;');
    }).not.toThrow();
})
test('$: first input is AST object', () => {
    expect(() => {
        const node = $('var a = 1;').rootNode.node
        const G = $(node);
    }).not.toThrow();
})
test('$: first input is AST object result should be ok', () => {

    const node = $('var a = 1;').rootNode.node
    const G = $(node);
    const code = G.generate();
    expect(code).toBe('var a = 1;')

})
test('$: first input is $ object', () => {
    expect(() => {
        const node = $('var a = 1;')
        const G = $(node);
    }).not.toThrow();
})
test('$: first input is $ object result should be ok', () => {

    const node = $('var a = 1;')
    const G = $(node);
    const code = G.generate();
    expect(code).toBe('var a = 1;')

})
test('$: simple js code', () => {
    code = `
    var a = 1;
    function test(){
        a = b;
    }
    var obj = {
        a: 'a'
    };
    `
    expect(() => {
        const G = $(code);
    }).not.toThrow();
})
test('$: simple js object code', () => {
    code = `{
        a: 'a'
    };
    `
    expect(() => {
        const G = $(code);
    }).not.toThrow();
})
test('$: comments code', () => {
    code = `//test`
    expect(() => {
        const G = $(code);
    }).not.toThrow();
})
test('$: comments code', () => {
    code = `{a}`
    expect(() => {
        const G = $(code);
    }).not.toThrow();
})
test('$: input is found code ', () => {
    code = `
    var a = 1;
    function test(){
        a = b;
    }
    var obj = {
        a: 'a'
    };
    `
    expect(() => {
        const G = $(code).find('var a = $_$;');
        $(G);
    }).not.toThrow();
})
test('$: nodeType ', () => {
    code = { nodeType: 'test' };
    expect(() => {
        const G = $(code);
    }).not.toThrow();
})
test('$: isProgram is true', () => {
    code = { nodeType: 'test' };
    expect(() => {
        const G = $('var a = 1;', { isProgram: true });
    }).not.toThrow();
})

test('$: astFragment', () => {

    expect(() => {
        const code = `const $_$a$_$ = 'test'`;
        const option = {
            astFragment: {
                a: 'a'
            }
        };
        const G = $(code, option);
    }).not.toThrow();
})
test('$: astFragment', () => {
    const code = `const $_$a$_$ = 'test'`;
    const option = {
        astFragment: {
            a: 'a'
        }
    };
    const G = $(code, option);
    const compareCode = G.generate();
    expect(compareCode).toBe(`const a = 'test'`);
})
test('$: wrong code', () => {
    const code = `
  
    function test(){
       
    `
    expect(() => {
        const G = $(code);
    }).toThrow();
})
test('$: jsx code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code);
    }).not.toThrow();
})
test('$: simple1 code should not throw error', () => {
    expect(() => {
        const G = $(jc1);
    }).not.toThrow();
})
test('$: simple2 code should not throw error', () => {
    expect(() => {
        const G = $(jc2);
    }).not.toThrow();
})
test('$: html empty string should not throw error', () => {
    const code = ``;
    expect(() => {
        const G = $(code, config.html);
    }).not.toThrow();
})
test('$: html DOCTYPE code', () => {
    const code = `<!DOCTYPE html>`;
    expect(() => {
        const G = $(code, config.html);
    }).not.toThrow();
})
test('$: html DOCTYPE code', () => {
    const code = `<!DOCTYPE html>`;
    const G = $(code, config.html);
    const result = G.generate();
    expect(result).toBe('<!doctype html>');
})
test('$: simple html code', () => {
    const code = `<div>test</div>`;
    expect(() => {
        const G = $(code, config.html);
    }).not.toThrow();
})
test('$: simple html code result should be ok', () => {
    const code = `<div>test</div>`;
    const G = $(code, config.html);
    const result = G.generate();
    expect(result).toBe(code);
})
test('$: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
    }).not.toThrow();
})

test('$: simple1 html code, isProgram option config', () => {
    expect(() => {
        const G = $(hc1, { isProgram: true, ...config.html });
    }).not.toThrow();
})

test('$: simple1 html code result should be ok', () => {
    const G = $(hc1, config.html);
    const result = G.generate();
    expect(result.indexOf('<html>') > -1).toBeTruthy();

})
test('$: simple1 html code', () => {
    const G = $(hc1, config.html).find('<span>$_$</span>');
    const code = G.generate();
    expect(code).toBe('<span>test</span>');
})

// todo 而且astFragment的value必须是ast节点
// test('$: simple1 html code use fragment', () => {
//     const option = {
//         astFragment: {
//             a: 'a'
//         },
//         ...config.html
//     };
//     const code = `<span>$_$a$_$</span>`
//     const G = $(code, option);
//     const compareCode = G.generate();
//     expect(compareCode).toBe('<span>test</span>');
// })