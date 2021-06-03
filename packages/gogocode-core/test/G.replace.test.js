const $ = require('../index');
const config = require('./config');
const jc1 = require('./code/simple1');
const jc2 = require('./code/simple2');
const jc3 = require('./code/simple3');
const jc4 = require('./code/simple4');
const jTryout = require('./code/simple-tryout');
const jReact = require('./code/react');
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
    }).not.toThrow();
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
// TODO
// test('$.replace: replace head String should be ok', () => {
//     const code = `'aaaa';`;
//     const output = $(code).replace(`'aaaa'`, `'bbbb'`).generate();
//     expect(output).toBe(`"bbbb"`);
// })
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
test('$.replace: simple2 js code, replace with multiple $_$ show throw error', () => {
    expect(() => {
        // 是否允许多个$_$ 出现？
        const G = $(jc2);
        const result = G.replace('$_$.updater.digest($_$);', '$_$.setData($_$);');
        const code = result.generate();
    }).not.toThrow();
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
    .generate();
    const result = code.indexOf('let t1 = true') > -1 && code.indexOf('let t2 = true') > -1 && code.indexOf('let t3 = true') > -1
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code result should be ok', () => {
    const code = $(jTryout)
        .replace(`Tryout.TRYOUT_SID_391 ? $_$1 : $_$2`, '$_$1')
        .generate();
    const result = code.indexOf('const t4 = 1') > -1
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code result should be ok', () => {
    const code = $(jTryout)
        .replace(`!Tryout.TRYOUT_SID_391 ? $_$1 : $_$2`, '$_$2')
        .generate();
    const result = code.indexOf(`const t7 = "2"`) > -1 && code.indexOf(`const t8 = "2"`) > -1
    expect(result).toBeTruthy();
})
test('$.replace: simple js code result should be ok', () => {
    const CODE = `alert({
        type: 'error',
        content: '请填写必填项',
        done: () => {}
      })`;
    const code = $(CODE)
        .replace(`alert({ type: $_$1, done: $_$3, content: $_$2})`,
            `alert( $_$1, $_$2, $_$3 )`)
        .generate();
    const result = code.indexOf(`alert( 'error', '请填写必填项', () => {} )`) > -1 ;
    expect(result).toBeTruthy();
})

test('$.replace: replace use $$$ result should be ok', () => {
    const CODE = `alert({
        type: 'error',
        content: '请填写必填项',
        done: () => {}
      })`;
    const code = $(CODE)
        .replace(`alert($$$)`, `alert(this, $$$)`)
        .generate();
    const result = code.indexOf(`alert(this,`) > -1 ;
    expect(result).toBeTruthy();
})
test('$.replace: replace use $$$ result should be ok', () => {
    const CODE = `const code = Page({
        onShow() { },
        data: { }
      })`;
    const code = $(CODE)
        .replace(`Page({
            onShow() {
              $$$1  
            },
            $$$2
          })`, `Page({
            render() {
              $$$1
            },
            $$$2
          })`)
        .generate();
    const result = code.indexOf(`render()`) > -1 && code.indexOf(`onShow()`) < 0;
    expect(result).toBeTruthy();
})
test('$.replace: simple tryout js code if condition result should be ok', () => {
    const code = $(jTryout)
        .replace(`if(Tryout.TRYOUT_SID_391){$_$}`, '$_$')
        .generate();
    const result = code.indexOf(`if (Tryout.TRYOUT_SID_391)`) < 0
    expect(result).toBeTruthy();
})
test('$.replace: replace use callback function result should be ok', () => {
    const map = { input: 'textarea' }   // 在map中有映射的才进行修改

    const code = $(`
        const componentList = [{
        index: 1,
        component: 'input'
      }, {
        index: 2,
        component: 'radio'
      }, {
        index: 3,
        component: 'checkbox'
      }]`)
        .replace('component: $_$', (match => {
            if (map[match[0][0].value]) {
                return `component: '${map[match[0][0].value]}'`
            } else {
                return 'component: $_$'
            }
        }))
        .generate();
    const result = code.indexOf(`component: 'input'`) < 0 && code.indexOf(`component: 'textarea'`) > -1;
    expect(result).toBeTruthy();
})
test('$.replace: use replace to insert code result should be ok', () => {
    const code = $(`
    Page({
        onShow() { },
        data: { }
      })`)
        .replace(`Page({
        $$$2
      })`, `Page({
        init() { 
          this.data = {} 
        },
        $$$2
      })`)
        .generate();
    const result = code.indexOf(`init()`) > -1;
    expect(result).toBeTruthy();
})
test('$.replace:  replace import result should be ok', () => {
    const code = $(jc2)
    .replace(`import $_$ from 'moment';`, `import $_$ from 'gogocode';`)
        .generate();
    const result = code.indexOf(`'gogocode'`) > -1;
    expect(result).toBeTruthy();
})

test('$.replace:  replace import result should be ok', () => {
    const code = $(jc2)
    .replace(`import { useContext, $$$ } from '@as/mdw-hk'`, `import { useFContext, $$$ } from '@as/mdw-hk'`)
        .generate();
    const result = code.indexOf(`{ useFContext, rest }`) > -1;
    expect(result).toBeTruthy();
})
test('$.replace:  replace with multiple $_$', () => {
    const code = `this.$emit('input', e.target.value)`
    const compareCode = $(code)
    .replace(`$_$1.$emit('input',$$$1)`, `$_$1.$emit('update:modelValue', $$$1)`)
    .generate();
    expect(compareCode).toBe(`this.$emit('update:modelValue', e.target.value)`);
})
test('$.replace:  replace with $_$ and $$$', () => {
    const code = `this.$emit('input', e.target.value)`
    const compareCode = $(code)
    .replace(`$_$1.$emit('input',$$$)`, `$_$1.$emit('update:modelValue',$$$)`)
    .generate();
    expect(compareCode).toBe(`this.$emit('update:modelValue',e.target.value)`);
})
test('$.replace: react js  result should be ok', () => {
    let code = $(jReact.code)
        .replace(`import { $$$ } from "@alifd/next"`, `import { $$$ } from "antd"`)
        .replace(`<h2>转译前</h2>`, `<h2>转译后</h2>`)
        .replace(
            `<Button type="normal" $$$></Button>`,
            `<Button type="default" $$$></Button>`
        )
        .replace(
            `<Button size="medium" $$$></Button>`,
            `<Button size="middle" $$$></Button>`
        )
        .replace(`<Button text $$$></Button>`, `<Button type="link" $$$></Button>`)
        .replace(`<Button warning $$$></Button>`, `<Button danger $$$></Button>`)
        .generate();
    
   
    expect(code).toBe(jReact.compareCode);
})
test('$.replace: replace attr  result should be ok', () => {
    let code = $(jc4)
        .replace(
            '{ text: $_$1, value: $_$2, $$$ }',
            '{ name: $_$1, id: $_$2, $$$ }'
        )
        .generate();
    const result = code.indexOf('text:') < 0 && code.indexOf('name:') > -1 &&
        code.indexOf('value:') < 0 && code.indexOf('id:') > -1 && 
        code.indexOf('tips:') > -1
    expect(result).toBeTruthy();
})
test('$.replace: replace like remove  result should be ok', () => {
    let code = $(jc1)
        .replace(
            `const XXMonitor = require($_$);`,
            ''
        )
        .generate();
    const result = code.indexOf(`const XXMonitor = require('../monitor');`) < 0 
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
    expect(code.indexOf('<i>test</i>') > -1).toBeTruthy();

})
// test('$.replace: replace html tag result should be ok', () => {

//     const G = $(hc1, config.html);
//     const code = G.replace('<form $$$1>$$$2</form>','<mx-form $$$1>$$$2</mx-form>').generate();
//     expect(code.indexOf('<form') < 0 && code.indexOf('<mx-form') > -1).toBeTruthy();

// })
// TODO

// test('$.replace: simple1 html code use $_$ result should be ok', () => {

//     const G = $(hc1, config.html);
//     const code = G.replace('<form id=$_$1 $$$>$_$2</form>','<div formId=$_$1 $$$>$_$2</div>').root().generate();
//     expect(code.indexOf(`<div formId="myform" class="mt10" style="margin-top:10px;"`) > -1).toBeTruthy();

// })

test('$.replace: jsx tag replace should be ok', () => {

    const G = $(`<a v="1"></a>`);
    const res = G.replace('<$_$1 $$$1>$$$2</$_$1>', '<$_$1 $$$1>$$$2 ssssss</$_$1>').generate()
    expect(res.indexOf('ssssss') > -1).toBeTruthy();

})

test('$.replace: class replace should be ok', () => {
    const res = $(`import { MM } from "@mm"
    import { loaders } from 'p.js'
    export class Sc extends MMG {
      constructor(options) {
        super(options);
      }
  
      onInited() {
        
      }
      /**
       * 初始化加载器
       */
      initLoader() {
        
        const textureLoader = new loaders.Loader();
        
        textureLoader.load();
      }
    }
    `).replace(`initLoader(){$$$}`, `abc() {
        $$$
    }`).generate()
    expect(res.indexOf('abc') > -1).toBeTruthy();

})



test('$.replace: class replace should be ok', () => {
    const res = $('<div></div>', {parseOptions: { html: true}}).replace(`<div $$$1>$$$2</div>`, 
    `<div mx-view="xxx" $$$1> $$$2</div>`).generate()
    expect(res.indexOf('xxx') > -1).toBeTruthy();

})


test('$.replace: class replace should be ok', () => {
    // const res = $(`
    //     getApp().globalData.eventEmmit.emit("openTasks",{} );
    // `, {parseOptions: { html: true}}).replace(`<div $$$1>$$$2</div>`, 
    // `<div mx-view="xxx" $$$1> $$$2</div>`).generate()
    // expect(res.indexOf('xxx') > -1).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        const a = {
            aaa: 1,
            bbb: 2,
        }
    `).replace('aaa: 1', '')
    .generate()
    expect(res.indexOf(',') == -1).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        import a from 'a';
        console.log('get A');
        var b = console.log();
        console.log.bind();
        var c = console.log;
        console.log = func;
    `)
    .replace(`var $_$ = console.log()`, `var $_$ = void 0`)
    .replace(`var $_$ = console.log`, `var $_$ = function(){};`)
    .find(`console.log()`)
    .remove()
    .generate();
    expect(res.match(/;/g).length == 4).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        import a from 'a';console.log('get A');var b = console.log();console.log.bind();var c = console.log;console.log = func;
    `)
    .replace(`var $_$ = console.log()`, `var $_$ = void 0;`)
    .replace(`var $_$ = console.log`, `var $_$ = function(){};`)
    .find(`console.log()`)
    .remove()
    .generate();
    expect(res.indexOf(`import a from 'a';var b = void 0;console.log.bind();var c = function(){};console.log = func;`) > -1).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        import * as ctx from '@ali/midway-hooks';
        import { useContext } from '@ali/midway-hooks';
        import ctx2 from '@ali/midway-hooks'
    `)
    .replace(`import $_$ from "@ali/midway-hooks"`, `import $_$ from "@al/hooks"`)
    .replace(`import * as $_$ from "@ali/midway-hooks"`, `import * as $_$ from "@al/hooks"`)
    .replace(`import { $$$ } from "@ali/midway-hooks"`, `import { $$$ } from "@al/hooks"`)
    .generate();
    expect(res.match(/\@al\/hooks/g).length == 3).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        import * as ctx from '@ali/midway-hooks';
        import { useContext } from '@ali/midway-hooks';
        import ctx2 from '@ali/midway-hooks'
    `)
    .replace(`import $_$ from "@ali/midway-hooks"`, `import $_$ from "@al/hooks"`)
    .replace(`import * as $_$ from "@ali/midway-hooks"`, `import * as $_$ from "@al/hooks"`)
    .replace(`import { $$$ } from "@ali/midway-hooks"`, `import { $$$ } from "@al/hooks"`)
    .generate();
    expect(res.match(/\@al\/hooks/g).length == 3).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        import * as ctx from '@ali/midway-hooks';
        import { useContext } from '@ali/midway-hooks';
        import ctx2 from '@ali/midway-hooks'
    `)
    .replace(`import $_$ from "@ali/midway-hooks"`, `import $_$ from "@al/hooks"`)
    .replace(`import * as $_$ from "@ali/midway-hooks"`, `import * as $_$ from "@al/hooks"`)
    .generate();
    expect(res.match(/\@al\/hooks/g).length == 2).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        import * as ctx from '@ali/midway-hooks';
        import { useContext } from '@ali/midway-hooks';
        import ctx2 from '@ali/midway-hooks'
    `)
    .replace(`import $_$ from "@ali/midway-hooks"`, `import $_$ from "@al/hooks"`)
    .generate();
    expect(res.match(/\@al\/hooks/g).length == 1).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`const a = b?.s?.c?.e`)
    .replace(`$_$1?.$_$2`, `$_$1 ? $_$1.$_$2 : null`)
    .generate();
    expect(res.indexOf('const a = b?.s?.c ? b?.s?.c.e : null') > -1).toBeTruthy();
})

test('$.replace: class replace should be ok', () => {
    const res = $(`
        "use strict";
        module.exports = app => {
        const mongoose = app.mongoose;
        const BrandSchema = new Schema({
            name: { type: String }
        });
        
        const Brand = mongoose.model('Brand');
        
        return Brand;
    };
    `)
    .replace(`module.exports = () => $_$`,  `$_$`)
    .replace(`return $_$`, `module.exports = $_$`)
    .before(`const app = require('mongoose')`)
    .generate();
    expect(res.indexOf('module.exports = Brand') > -1 && res.indexOf('module.exports = app') == -1).toBeTruthy();
})

test('$.replace: replace arguments should not throw error', () => {
    const code = `
    this.$emit("input", date, {
        type: "CUSTOM",
        value: date
      });
    `;
    expect(() => {
    const res = $(code)
    .replace(`$_$1.$emit('input',$$$)`, `$_$1.$emit('update:modelValue',$$$)`)
    }).not.toThrow();
})

test('$.replace: replace arguments should not throw error', () => {
    const code = `(v) => Boolean(v.text)`;
    const res = $(code)
        .replace('() => import($_$)', 'Vue.defineAsyncComponent(() => import($_$))').generate()
    expect(res.match(/Boolean\(v\.text\)/)).toBeTruthy();
})

test('$.replace: replace arguments should not throw error', () => {
    const code = `
    Vue.directive('a', 'b', {
        bind(a) {
        }
    })`;
    expect(() => {
        $(code)
        .replace(
            `
            Vue.directive($$$1, {
            bind($_$2) {
                $$$2
            },
            $$$3
            },
        )`,
            `
            Vue.directive($$$1, {
            beforeMount($_$2) {
                $$$2
            },
            $$$3
            },
        )
            `
        )
    }).not.toThrow();
})