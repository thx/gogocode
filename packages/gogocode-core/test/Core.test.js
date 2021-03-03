const core = require('../src/js-core/core');
const htmlCore = require('../src/html-core/core');
const generate = require('../src/js-core/generate');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const hc1 = require('./code/simple1.html');

test('core.getAstsBySelector simple code deep is 1 should not throw error', () => {
    expect(() => {
        const code = `function test(b) { let a =  b + 1 ; let c = a + 1; return c + 1;}`;
        const ast = core.buildAstByAstStr(code);
        core.getAstsBySelector(ast, 'let $_$;', { deep: '1' });
    }).not.toThrow();
})
test('core.getAstsBySelector simple code deep is nn should not throw error', () => {
    expect(() => {
        const code = `function test(b) { let a =  b + 1 ; let c = a + 1; return c + 1;}`;
        const ast = core.buildAstByAstStr(code);
        core.getAstsBySelector(ast, 'let $_$;', { deep: 'nn' });
    }).not.toThrow();
})
test('core.getAstsBySelector simple code deep is n should not throw error', () => {
    expect(() => {
        const code = `function test(b) { let a =  b + 1 ; let c = a + 1; return c + 1;}`;
        const ast = core.buildAstByAstStr(code);
        core.getAstsBySelector(ast, 'let $_$;', { deep: 'n' });
    }).not.toThrow();
})

test('core.getAstsBySelector simple code deep is other should not throw error', () => {
    expect(() => {
        const code = `function test(b) { let a =  b + 1 ; let c = a + 1; return c + 1;}`;
        const ast = core.buildAstByAstStr(code);
        core.getAstsBySelector(ast, 'let $_$;', { deep: 'xx' });
    }).not.toThrow();
})

test('core.buildAstByAstStr simple object code should not throw error', () => {
    expect(() => {
        const code = `{a:1}`;
        core.buildAstByAstStr(code);
    }).not.toThrow();
})

test('core.buildAstByAstStr simple object code should not throw error', () => {
    expect(() => {
        const code = `{a:1}`;
        core.buildAstByAstStr(code, {});
    }).not.toThrow();
})

test('core.buildAstByAstStr simple object code should not throw error', () => {
    expect(() => {
        const code = `{a:1}`;
        core.buildAstByAstStr(code, {}, { isProgram: true });
    }).not.toThrow();
})
test('core.visit simple object code should not throw error', () => {
    expect(() => {
        const code = `{a:1}`;
        core.visit();
    }).not.toThrow();
})
test('core.appendJsxAttr:  no input should throw error', () => {
    expect(() => {
        core.appendJsxAttr();
    }).toThrow();
})
test('core.appendJsxAttr:  no input should throw error', () => {
    expect(() => {
        const ast = core.buildAstByAstStr('<div></div>');
        core.appendJsxAttr(ast);
    }).toThrow();
})
test('core.appendJsxAttr:  no input should throw error', () => {
    expect(() => {
        const ast = core.buildAstByAstStr('');
        core.appendJsxAttr(ast);
    }).toThrow();
})
test('core.appendJsxAttr: simple code should not throw error', () => {
    expect(() => {
        const ast = core.buildAstByAstStr('<div></div>');
        core.appendJsxAttr(ast, { width: `'100'` });
    }).not.toThrow();
})
test('core.appendJsxAttr: simple code,result should be right', () => {
    const ast = core.buildAstByAstStr('<div></div>');
    core.appendJsxAttr(ast, { width: `'100'` });
    const code = generate(ast);
    expect(code).toEqual(`<div width='100'></div>`);
})

test('core.traverse: simple code should not throw error', () => {
    expect(() => {
        const code = `
        let obj = {
            a: 1,
            b: (arg) => {
                console.log(arg);
            }
        };
        `
        const ast = core.buildAstByAstStr(code);
        core.traverse(ast, () => {

        });
    }).not.toThrow();
})

test('core.traverse: no input should throw error', () => {
    expect(() => {
        core.traverse();
    }).toThrow();
})
test('core.traverse: no input should throw error', () => {
    expect(() => {
        const code = `
        let obj = {
            a: 1,
            b: (arg) => {
                console.log(arg);
            }
        };
        `
        const ast = core.buildAstByAstStr(code);
        core.traverse(ast);
    }).toThrow();
})
// test('core.modifySelBySel: simple code should not throw error', () => {
//     expect(() => {
//         const code = `
//         let obj = {};
//         obj.name = 'test2';
//         `;
//         const ast = core.buildAstByAstStr(code);
//         core.modifySelBySel(ast, '$_$.name', '$_$.title')
//     }).not.toThrow();
// })

test('core.insertAstListBefore: simple code should not throw error', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
        }
        `;

        const newCode = `
        let b = 2;
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `let a = $_$;`, 'nn', false);
        const newAst = core.buildAstByAstStr(newCode);
        core.insertAstListBefore(pathList[0], newAst);
    }).not.toThrow();
})
test('core.insertAstListBefore: simple code, result should be right', () => {
    const code = `
        function test(){
            let a = 1;
        }
        `;

    const newCode = `
        let b = 2;
        `;

    const ast = core.buildAstByAstStr(code);
    let { pathList } = core.getAstsBySelector(ast, `let a = $_$;`, 'nn', false);
    const newAst = core.buildAstByAstStr(newCode);
    core.insertAstListBefore(pathList[0], newAst);
    const result = generate(ast);
    expect(result).toEqual('function test(){\n    let b = 2;\n    let a = 1;\n}');
})
test('core.insertAstListAfter: simple code', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
        }
        `;

        const newCode = `
        let b = 2;
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `let a = $_$;`, 'nn', false);
        const newAst = core.buildAstByAstStr(newCode);
        core.insertAstListAfter(pathList[0], newAst);
    }).not.toThrow();
})
test('core.insertAstListAfter: simple code, result should be right', () => {
    
        const code = `
        function test(){
            let a = 1;
        }
        `;

        const newCode = `
        let b = 2;
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `let a = $_$;`, 'nn', false);
        const newAst = core.buildAstByAstStr(newCode);
        core.insertAstListAfter(pathList[0], newAst);
        const result = generate(ast);
        expect(result).toEqual('function test(){\n    let a = 1;\n    let b = 2;\n}');
})
test('core.getPrevAst: simple code', () => {
    expect(() => {
        const code = `
        const obj = { name: 'test' };
        function test(){
            let a = 1;
        }
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `function $_$(){$_$}`);
        core.getPrevAst(pathList[0]);
    }).not.toThrow();
})
test('core.getNextAst: simple code', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
        }
        const obj = { name: 'test' };
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `function $_$(){$_$}`);
        core.getNextAst(pathList[0]);
    }).not.toThrow();
})
test('core.getNextAst: simple code', () => {
    expect(() => {
        const code = `
        function test(){
            let a = 1;
        }
        const obj = { name: 'test' };
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `const $_$ = $_$`);
        core.getNextAst(pathList[0]);
    }).not.toThrow();
})
test('core.hasChildrenSelector: simple code', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `function parent(){$_$}`);
        core.hasChildrenSelector(pathList[0],'const obj = $_$');
    }).not.toThrow();
})
test('core.getParentListByAst: simple code', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.buildAstByAstStr(code);
        let { pathList } = core.getAstsBySelector(ast, `const obj = $_$`);
        core.getParentListByAst(pathList[0]);
    }).not.toThrow();
})
test('core.replaceStrByAst: simple code', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.replaceStrByAst(code,{name:'test2'});
    }).not.toThrow();
})
test('core.removeAst: simple code', () => {
    expect(() => {
        core.removeAst();
    }).toThrow();
})
test('htmlCore.removeAst: simple code no input should throw error', () => {
    expect(() => {
        htmlCore.removeAst();
    }).toThrow();
})
test('core.removeAst: simple code no selector should throw error', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.buildAstByAstStr(code);
        core.removeAst(ast);
    }).toThrow();
})
test('core.removeAst: simple code width selector', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.buildAstByAstStr(code);
        core.removeAst(ast, 'const obj = $_$');
    }).not.toThrow();
})
test('htmlCore.removeAst: simple1 code,no selector should throw error', () => {
    expect(() => {
       const ast = htmlCore.buildAstByAstStr(hc1);
       htmlCore.removeAst(ast);
    }).toThrow();
})
test('htmlCore.removeAst: simple1 code ', () => {
    expect(() => {
       const ast = htmlCore.buildAstByAstStr(hc1);
       htmlCore.removeAst(ast,'<span>test</span>');
    }).not.toThrow();
})
test('htmlCore.remove: simple1 code ', () => {
    expect(() => {
       const ast = htmlCore.buildAstByAstStr(hc1);
       htmlCore.remove(ast);
    }).toThrow();
})
test('core.replaceSelBySel: simple code', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.buildAstByAstStr(code);
        core.replaceSelBySel(ast, 'const obj = $_$', '');
    }).not.toThrow();
})
test('core.replaceSelBySel: simple code selector do not has $_$', () => {
    expect(() => {
        const code = `
        function parent(){
            function test(){
                let a = 1;
            }
            const obj = { name: 'test' };
        }
        `;

        const ast = core.buildAstByAstStr(code);
        core.replaceSelBySel(ast, 'const obj = $_$', 'const obj =  1');
    }).not.toThrow();
})