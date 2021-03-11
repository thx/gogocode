const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const jc3 = require('./code/simple3');
const jTryout = require('./code/simple-tryout');
const hc1 = require('./code/simple1.html');
const CODE = `
const m = {
    a: function() {
        console.log('test a');
    },
    b: function() {
        console.log('test b');
    }
}
m.a();
`;
const COMPARE_CODE = `
const m = {
    a: function() {
        console.log('test a');
    },
    b: function() {
        console.log('test b');
    }
}
m.b();
`;
test('$.replace: simple code', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.a()','$_$.b()')
    }).not.toThrow();
})

test('$.replace: simple code', () => {
    const G = $(CODE);
    G.replace('$_$.a()','$_$.b()');
    const code = G.generate();
    expect(code).toBe(COMPARE_CODE);
})
test('$.replace: this[0] is null', () => {
    expect(()=>{
       const G = $('var a = 1;');
       G[0] = null
       G.replace();
    }).toThrow();
})
test('$.replace: null', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.a()',null)
    }).not.toThrow();
})
test('$.replace: no $_$', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.a()','m.b()');
    }).not.toThrow();
})
test('$.replace: not find', () => {
    expect(() => {
        const G = $(CODE);
        G.replace('$_$.c()','m.b()');
    }).not.toThrow();
})
test('$.replace: simple1 js code result should be ok', () => {
    const G = $(jc1);
    const result = G.replace('const c = add();', 'const b = add();');
    const code = result.generate();
    expect(code.indexOf('const c = add()') < 0 && code.indexOf('const b = add()') > -1).toBeTruthy();
})
test('$.replace: simple2 js code result should be ok', () => {
    const G = $(jc2);
    const result = G.replace('this.updater.digest(loc);', 'this.updater.set(loc);');
    const code = result.generate();
    expect(code.indexOf('this.updater.digest(loc)') < 0 && code.indexOf('this.updater.set(loc)') > -1).toBeTruthy();
})

test('$.replace: simple3 js code result should be ok', () =>{
    const code = $(jc3)
    .replace(`await $_$()`, `
    try {
        await $_$()
    } catch(e) {
        handleError()
    }`)
    .replace(`my.alert({
        title: $_$1,
        content: $_$2,
        success: $_$3
    })`,    `this.alert($_$1, $_$2, $_$3)`)
    .root()
    .generate();
    const result = code.indexOf('handleError()') > -1 && code.indexOf('this.alert(') > -1
    expect(result).toBeTruthy();
})

test('$.replace: simple3 js code with $$$ result should be ok', () =>{
    const code = $(jc3)
    .replace(`
    Page({
        onShow($_$1) {
            $$$1
        },
        $$$2
    })
    `, 
    `
    View.extend({
        init() {
            this.onInit();
            this.didMount();
        },
        render($_$1) {
            var a = 1
            $$$1
        },
        $$$2
    })
    `)
    .root()
    .generate();
    const result = code.indexOf('View.extend(') > -1;
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code replace width array should be ok', () =>{
    const code = $(jTryout)
    .replace([
        'var $_$ = Tryout.TRYOUT_SID_391',
        'let $_$ = Tryout.TRYOUT_SID_391',
        'const $_$ = Tryout.TRYOUT_SID_391'
    ], 'let $_$ = true;')
    .root()
    .generate();
    const result = code.indexOf('let t1 = true') > -1 && code.indexOf('let t2 = true') > -1 && code.indexOf('let t3 = true') > -1
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code result should be ok', () => {
    const code = $(jTryout)
        .replace(`Tryout.TRYOUT_SID_391 ? $_$1 : $_$2`, '$_$1')
        .root()
        .generate();
    const result = code.indexOf('const t4 = 1') > -1
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code result should be ok', () => {
    const code = $(jTryout)
        .replace(`!Tryout.TRYOUT_SID_391 ? $_$1 : $_$2`, '$_$2')
        .root()
        .generate();
        // 结果把字符串'2' 变成数字 2 了
    const result = code.indexOf(`const t7 = "2"`) > -1 && code.indexOf(`const t8 = "2"`) > -1
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code if condition result should be ok', () => {
    const code = $(jTryout)
        .replace(`if(Tryout.TRYOUT_SID_391){$_$}`, '$_$')
        .root()
        .generate();
    const result = code.indexOf(`if (Tryout.TRYOUT_SID_391)`) < 0
    expect(result).toBeTruthy();
})
// test('$.replace: simple tryout js code if condition with $$$ result should be ok', () => {
//     // 貌似这种情况不太可能支持
//     const code = $(jTryout)
//         .replace(`if(Tryout.TRYOUT_SID_391 $$$){$_$}`, 'if($$$){$_$}')
//         .root()
//         .generate();
//     const result = code.indexOf(`if (Tryout.TRYOUT_SID_391`) < 0
//     expect(result).toBeTruthy();
// })
// test('$.replace: simple tryout js code if condition with $$$ result should be ok', () => {
//     // 貌似这种情况不太可能支持
//     const code = $(jTryout)
//         .replace(`if(!Tryout.TRYOUT_SID_391 $$$){$_$}`, 'if(false $$$){$_$}')
//         .root()
//         .generate();
//     const result = code.indexOf(`if (!Tryout.TRYOUT_SID_391`) < 0
//     expect(result).toBeTruthy();
// })

test('$.replace: replace with $_$', () => {
    const G = $(jc2);
    const result = G.replace(`import $_$ from 'moment';`, `import $_$ from 'new_moment';`);
    const code = result.generate();
    expect(code.indexOf(`import moment from 'moment';`) < 0 &&
        code.indexOf(`import moment from 'new_moment';`) > -1).toBeTruthy();
})
test('$.replace: simple1 html code', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.replace('<span>test</span>','<span>replace</span>');
    }).not.toThrow();
})

test('$.replace: simple1 html code, replacer is empty should throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.replace('<span>test</span>');
    }).not.toThrow();
})
test('$.replace: simple1 html code, replacer is ast node should not throw error', () => {
    expect(() => {
        const G = $(hc1, config.html);
        G.replace('<span>test</span>',$('<div>test</div>', config.html).node);
    }).not.toThrow();
})

test('$.replace: simple1 html code, replacer is ast node result should be ok', () => {

    const G = $(hc1, config.html);
    const replacer = $('<div>test</div>', config.html).node;
    const code = G.replace('<span>test</span>', replacer).generate();
    expect(code.indexOf('<span>test</span>') < 0).toBeTruthy();

})
test('$.replace: simple1 html code result should be ok', () => {

    const G = $(hc1, config.html);
    G.replace('<span>test</span>','<span>replace</span>');
    const code = G.generate();
    expect(code.indexOf('<span>test</span>') < 0 && code.indexOf('<span>replace</span>') > -1).toBeTruthy();

})

test('$.replace: simple1 html code use $_$ result should be ok', () => {

    const G = $(hc1, config.html);
    G.replace('<span>$_$</span>','<i>$_$</i>');
    const code = G.generate();
    expect(code.indexOf('<i>\ntest</i>') > -1).toBeTruthy();

})

// test('$.replace: simple1 html code use $_$ result should be ok', () => {

//     const G = $(hc1, config.html);
//     const code = G.replace('<form id=$_$1 $$$>$_$2</form>','<div formId=$_$1 $$$>$_$2</div>').root().generate();
//     expect(code.indexOf(`<div formId="myform" class="mt10" style="margin-top:10px;"`) > -1).toBeTruthy();

// })
