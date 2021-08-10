const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/render-function-api');

test('render-function-api', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } });
        transform(ast, $, {});
    }).not.toThrow();
})
//render(h)

// test('render-function-api', () => {
//     const vuePath = path.join(__dirname, 'Comp.vue');
//     const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
//     transform(ast,{gogocode: $},{outRootPath:'',outFilePath:''});
//     let result = true
//     ast.find('<script></script>').find([`render($_$){}`, `render: ($_$) => {}`]).each(e => {
//         let params = e.attr('params') || e.attr('value.params') || []
//         params.forEach((item) => {
//             if (item.name == 'h') {
//                 result = false
//             }
//         })
//     })
//     expect(result).toBeTruthy();
// })

// test('render-function-api', () => {
//     const vuePath = path.join(__dirname, 'Comp.vue');
//     const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
//     transform(ast);
//     let result = true
//     ast.find('<script></script>').find([`h($_$)`, `h:($_$)`]).each(e => {        
//         let argumentList = e.attr('arguments') || e.attr('value.arguments') || []
//         argumentList.forEach((item) => {
//             if (item.type == 'StringLiteral') {
//                 result = false
//             }
//         })
//     })
//     expect(result).toBeTruthy();
// })

