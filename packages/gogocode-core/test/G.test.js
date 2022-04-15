const $ = require('../index');
// const $ = require('../umd/gogocode')
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
    }).not.toThrow();
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

test('getfunction', () => {
    expect(() => {
        $(`function greet() {
            a

            function greet() {
                b
            }
          }`)
          .find(`function greet() {}`)
          .each(item => {
              $(item.attr('body')).generate()
          })
    }).not.toThrow()
})

test('getfunctionbody', () => {
    expect(() => {
        $(code)
            .find(`function greet() {}`)
            .each(item => {
                $(item.attr('body')).generate()			// 函数内容
                item.attr('body')										// 函数内容对应的ast节点
            })
            .root()
            .find(`function greet() {
                $_$
            }`)
            .each(item => {
            item.match[0][0].value		// 函数内容
                item.match[0][0].node			// 函数内容对应的ast节点
            })
    }).not.toThrow()
})


test('getif', () => {
    expect(() => {
        $(`if (a && 1 || 0) { b } else { c; dosth() }`)
        .find(`if ($_$1) { $_$2 } else { $_$3 }`)
        .each(item => {
            console.log(item.match)
        })
    }).not.toThrow()
})

test('getclass', () => {
    expect(() => {
        $(`class Car {
            color = c
            a = 1
            size = s
          }`)
        .find(`class Car {
            color = $_$c
            size = $_$s
          }`)
        .each(item => {
            console.log(item.match)
        })
    }).not.toThrow()
})

test('get obj property', () => {
    expect(() => {
        $(`const car = {
            x: 2,
            greet() {
                this.g = '';
            },
            a: '1'
        }`)
        // `greet() {}` parse 抛异常
        .find(`greet() {}`)
        .each(item => {
            console.log(item.match)
        })
        .root()
        .find(`{ a: '1' }`)
        .each(item => {
            console.log(item.match)
        })
        .root()
        .find(`const car = $_$`)
        .each(item => {
            // item.match是被通配符匹配到的节点
            if (item.match[0][0].node.type == 'ObjectExpression') {
              // 找到car被赋值的节点，判断是不是对象类型
          }
        })
    }).not.toThrow()
})


test('get type', () => {
    expect(() => {
        $(`const c:CheckBoxProps = {};
            CheckBoxProps.prop = null;
            (a, b: CheckBoxProps, CheckBoxProps) => {
                console.log()
            }
            `)
        .find('CheckBoxProps')		// 找到的有可能是变量名，也有可能是类型定义
        .each(item => {
            if (item.parent().node.type == 'TSTypeReference') {
                // 判断其父节点是类型定义TSTypeReference，就找到了
            }
        })
        .root()
        .find('const $_$1:CheckBoxProps = $_$2')
        .each(item => {
            item.match
        })
        .root()
        .find(`($_$: CheckBoxProps) => {}`)
        .each(item => {
            item.match
        })
    }).not.toThrow()
})



test('get import', () => {
    expect(() => {
        $(`import '@ali/sd'
        import a from '@ali/sd'
        import('@ali/sd').then()
        export * from '@path/sth'
        export {a, b} from 'path/sth'
        `)
        .find(`import($_$)`)	// 找到的有可能是变量名，也有可能是类型定义
        .each(item => {
            item.match
        })
        .root()
        .find(`export $_$ from '@path/sth'`)
        .each(item => {
            item.match
        })
        .root()
        .find(`export * from '@path/sth'`)
        .each(item => {
            item.match
        })
        .root()
        .find(`import $_$1 from '$_$2'`)
        .each(item => {
            item.match
        })
    }).not.toThrow()
})



test('replaceimport', () => {
    expect(() => {
        const res = $(`import a from 'bb/bb-plugin'
        import { useContext, userLogger } from '@as/mdw-hk'
        `)
        .find(`import $_$1 from '$_$2'`)
        .each(item => {
            const source = item.match[2][0].value;
            item.match[2][0].node.value = source.replace('bb/', 'bb/gogocode/');
        })
        .root()
        .replace(`import { useContext, $$$ } from '@as/mdw-hk'`, `import { useFContext, $$$ } from '@as/mdw-hk'`)
        // .replace(`import $_$ from 'bb/bb-plugin'`, `import $_$ from 'gogocode'`)
        .generate()
    }).not.toThrow()
})

test('findcall', () => {
    expect(() => {
        const res = $(`callfunc(am,b)`)
        .find('$_$()')
        .each(item => {
            item.match		// 函数名
            item.node			// 函数对应的ast节点
            item.attr('arguments')		// 调用函数的入参
        })
    }).not.toThrow()
})

test('replacemethodname', () => {
    expect(() => {
        const res = $(`Page({
            onShow() { },
            data: { }
          })`)
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
            .generate()
    }).not.toThrow()
})

test('insert method', () => {
    expect(() => {
        const res = $(`Page({
            onShow() { },
            data: { }
          })`)
          .find(`Page({})`)
          .each(item => {
                $(item.attr('arguments.0')).append('properties', `init() {}`)
              // page的arguments[0]是第一个入参对象，通过attr获取到这个节点之后用$()转为AST实例，
              // 就可以链式调用进行后续操作，append第一个参数是第二个参数指定插入的位置
          })
            .root()
            .generate()
    }).not.toThrow()
})

test('modify jsx attr', () => {
    expect(() => {
        const res = $(`<View>
        <View name="1" class="active" />
        <View name="1" t="2">sd</View>
      </View>`)
      .replace(`<View name="1" $$$1>$$$2</View>`,`<View type="input" $$$1>$$$2</View>`)
      .generate()
    }).not.toThrow()
})

test('declaration', () => {
    expect(() => {
        const res = $(`const {a,b = {b1},c = 3} = d`)
        .find('const { $_$1 = $_$2 } = $_$3')
        .each(item => {
            const keyList = item.match[1].filter((item, i) => i%2 == 0)
            const obj = item.match[3][0].value
            const newkeyList = keyList.map((key, i) => {
                let dec = `${key.value} = ${obj}.${key.value}`
                if (item.match[2][i].value != key.value) {
                    dec += ('||' + item.match[2][i].value)
                }
                return dec
            })
            item.replaceBy(`const ${newkeyList.join(', ')}`)
        })
    }).not.toThrow()
})


test('append', () => {
    expect(() => {
        const res = $(`function create(aaa) { bbb 
            ccc
        }`)
        .find(`function create() {}`)
        .each(item => {
                $(item.attr('body')).append('body', `
                        let type = 'success'
                        console.log('success')
                `)
        })
        .generate()
    }).not.toThrow()
})

test('replacefunction', () => {
    expect(() => {
        const map = { input: 'textarea' }
        const res = $(`
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
                return `component: ${map[match[0][0].value]}`
            } else {
                return 'component: $_$'
            }
        }))
        .generate()
    }).not.toThrow()
})


test('replacefetch', () => {
    expect(() => {
        const res = $(`const fetch = () => {}; const noModify = 'fetch'`)
        .find('fetch')
        .each(item => {
            item.attr('name', 'request')
        })
        .root()
        .generate()
    }).not.toThrow()
})

test('getidentifier', () => {
    expect(() => {
        const iden = 
        $(`(a.b.c && b) || (c && d)`)
        .find('$_$')
        .each(item => {
            if (item.parent().node.type == 'MemberExpression' && item.parent(1).node.type != 'MemberExpression') {
                console.log(item.parent().generate())
            } else if (item.parent().node.type != 'MemberExpression') {
                console.log(item.generate())
            }
        })
    }).not.toThrow()
})

test('replaceattr', () => {
    expect(() => {
        const res = $(`var a = {visibility:iconVisibility('coupon')}`)
        .replace(`{$_$:$_$1}`, '$_$:$_$1')
        .generate()
    }).not.toThrow()
})

test('replacestring2ident', () => {
    expect(() => {
        const pres = $('<p class="title"></p>')
        .replace(`<p class="$_$"></p>`, (match => {
        return `<View style={styles.${match[0][0].value}}></View>`
        }))
        .generate()
    }).not.toThrow()
})


test('replacejsxfor', () => {
    expect(() => {
        const res = $('<View style={styles.listItem} v-for="(item,index) in list"><Text style={styles.title}>AAA</Text></View>')
        .replace(`<View v-for="$_$2" $$$1>$$$2</View>`, (match => {
            const expression = $(match[2][0].value, { isProgram: false });       // 这是v-for后面整个字符串 (item,index) in list 需要单独转为ast解析
            const listKey = expression.attr('expression.right.name')
            const itemKey = expression.attr('expression.left.expressions.0.name')
            return `
            { ${listKey}.map(${itemKey}=>{
                return (<View $$$1>$$$2</View>);
            }) }`
        }))
        .generate()
        var res1 = $('var a = 1').find('var $_$1 = $_$2')

    }).not.toThrow()
})

test('replaceimg', () => {
    expect(() => {
        var code = $(`<View>
            <Image class="angle"/>
            <Image/>
            </View>`)

            .replace(`<Image/>`, (match, path) => {
                if (path.node.openingElement && path.node.openingElement.attributes.length) {
                    
                }
            })
    }).not.toThrow()
})

test('selector not', () => {
    expect(() => {
        var code = $(`import A from 'a';
        import B from 'b';
        import C from 'c';`)
            .find(`import $_$1 from '$_$2'`)
            .each(item => {
                if (item.match[2][0].value != 'a') {
                    return;
                }
            })
    }).not.toThrow()
})

test('parse decorator', () => {
    expect(() => {
        var code = $(`@Form.create()
        class Template extends React.PureComponent {
            render()  {
                return (
                    <div>
                        Hello, Template!
                    </div>
                );
            }
        }`)
    }).not.toThrow()
})

test('parse decorator', () => {
    const res = $(`function demo() { $_$content$_$ }`, {
        astFragment: {
            content: $('var a = 1', { isProgram: false }).node
        }
    }).generate()
    expect(res.match(`var a = 1`)).toBeTruthy()
})

test('parse html', () => {
    const res = $(`<div></div>`, {
        parseOptions: { language: 'html' }
    }).generate()
    expect(res.match(`<div></div>`)).toBeTruthy()
})

test('parse decorator', () => {
    expect(() => {
        const res = $(`
        @Form.create()
        class Template extends React.PureComponent {
            render()  {
                return (
                    <div>
                        Hello, Template!
                    </div>
                );
            }
        }`)
        // .find(`@Form.create()`)
        .generate()
    }).not.toThrow()
})


test('parse decorator 2', () => {
    expect(() => {
        const res = $(`
            import { Provide, Func, Inject } from '@midwayjs/decorator';
            import { FunctionHandler, FaaSContext } from '@ali/midway-faas';
            import render from '@ali/ice-faas-render';

            @Provide()
            @Func('render.handler', { event: 'HTTP', path: '/*' })
            export class RenderHandler implements FunctionHandler {
            @Inject()
            ctx: FaaSContext;

            @Inject('baseDir')
            baseDir: string;

            async handler() {
                await render(this.ctx, {
                title: 'ICE & Midway Hooks',
                g_config: {},
                baseDir: this.baseDir,
                favicon: 'https://img.alicdn.com/tfs/TB1.WE9xkL0gK0jSZFAXXcA9pXa-200-200.png',
                });
            }
            }
        `, {
            parseOptions: {  
                ecmaVersion: 2015, ecmaFeatures: { legacyDecorators: true },
                plugins: [['decorators', { decoratorsBeforeExport: false }]] }
        })
        // .find(`@Form.create()`)
    }).not.toThrow()
})

test('parse decorator 3', () => {
    expect(() => {
        const res = $(`
            import { Component } from 'vue-class';
            import render from 'index.html';
            @Component({
                render,
                name: 'p',
                props: {}
            })
            export default class Posi extends Mask {
                value;
                get v(): string {
                    return this.value
                }
            }
        `)
        // .replace(`import { $$$ } from 'vue-class'`, `import { $$$ } from 'vue-class1'`)
        // .generate();
        // .find(`@Form.create()`)
    }).not.toThrow()
})


test('parse html contains & ', () => {
    expect(() => {
        let res = $(`
        <template>
            <div>
                ss
                <div v-if="true && true">
                    <a>wer{{ss}}qwre<i></i></a>
                </div>
            </div>
        </template>
        `, { parseOptions: { language: 'vue' } })
        .find('<template></template>')
        .find('<div></div>')
        .eq(1)
        .attr('content.attributes.0.value.content')
        var a = 1
    }).not.toThrow()
})


test('parse closing tag', () => {
    expect(() => {
        let res = $(`
        <template>
        <div class="todoList full-screen">
          <div class="todoList_tips" v-if="taskTotalInfo.noHandle > 0">
            <template v-if="searchType == 0">
              <span
                >还有<i>{{ taskTotalInfo.noHandle }}</i
                >笔工单尚未指派</span
              >
            </template>
          </div>
        </div>
        </template>
      
        `, { parseOptions: { language: 'vue' } })
        .find('<template></template>')
        .generate()
      res
    }).not.toThrow()
})


test('parse html contains > ', () => {
    let res = $(`
    <dd>1<5</dd> <view>我是打酱油</view>
    `, { parseOptions: { language: 'html' } })
        .replace(`<dd $$$1>$$$2</dd>`,
        `<dd test="zpzpzpzp" $$$1>$$$2</dd>`)
        .generate()
    console.log(res)
    expect(!!res.match('1<5</dd>')).toBeTruthy()
})

test('parse html attr contains > ', () => {
    let res = $(`
    <dd class="1<a">1<5</dd> <view>我是打酱油</view>
    `, { parseOptions: { language: 'html' } })
        .replace(`<dd $$$1>$$$2</dd>`,
        `<dd test="zpzpzpzp" $$$1>$$$2</dd>`)
        .generate()
    console.log(res)
    expect(!!res.match('1<5</dd>')).toBeTruthy()
})

test('parse html attr contains > ', () => {
    let res = $(`
    <dd class="1<5">1<5</dd> <view>我是打酱油</view>
    `, { parseOptions: { language: 'html' } })
        .replace(`<dd $$$1>$$$2</dd>`,
        `<dd test="zpzpzpzp" $$$1>$$$2</dd>`)
        .generate()
    console.log(res)
    expect(!!res.match('1<5</dd>')).toBeTruthy()
})

test('html attr generate', () => {
    const code = `
    <div class="a" @ok="
        getContractBookkeepingTaskList();
        stopBookTaskVisible = bookTaskVisible = taskVisible = false;
        $emit('refresh-product-list');
        ">1</div>
        <div class="a">2</div>
    `;

    const ast = $(code, { parseOptions: { language: 'html'}}).generate()
    expect(!!ast.match(`false;`)).toBeTruthy()
})