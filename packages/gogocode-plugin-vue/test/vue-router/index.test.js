const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/vue-router');
test('vue-router: not has error', () => {
    expect(() => {
        const jsPath = path.join(__dirname, 'router.js');
        const ast = $.loadFile(jsPath);
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('vue-router: Vue.use should be remove', () => {
    const jsPath = path.join(__dirname, 'router.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf('Vue.use(') < 0;
    expect(result).toBeTruthy();
})
test('vue-router: base property should be moved to xxxHistory method', () => {
    const jsPath = path.join(__dirname, 'router.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`History('/app')`) > -1 && code.indexOf('base:') < 0;
    expect(result).toBeTruthy();
})
test('vue-router: no mode ,history property should be add', () => {
    const jsPath = path.join(__dirname, 'router-no-mode.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`history: VueRouter.createWebHashHistory('/app')`) > -1;
    expect(result).toBeTruthy();
})
test('vue-router: scrollBehavior property should be ok', () => {
    const jsPath = path.join(__dirname, 'router.js');
    const ast = $.loadFile(jsPath);
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`x: 1`) < 0 && code.indexOf(`left:1`) > -1;
    expect(result).toBeTruthy();
})
test('vue-router: router-link append attr should be remove', () => {
    const vuePath = path.join(__dirname, 'RouterLink.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' }});
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf('append>') < 0;
    expect(result).toBeTruthy();
})
test('vue-router: router-link append attr should be replace', () => {
    const vuePath = path.join(__dirname, 'RouterLink.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' }});
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`:to="routerAppend($route.path, 'child-route')"`) > -1;
    expect(result).toBeTruthy();
})
test('vue-router: router-view with transition', () => {
    const vuePath = path.join(__dirname, 'RouterView.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' }});
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`<router-view v-slot="{ Component }" class="view">`) > -1;
    expect(result).toBeTruthy();
})
test('vue-router: router-view with inner element', () => {
    const vuePath = path.join(__dirname, 'RouterViewInner.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' }});
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`<component :is="Component">\n  \n  <p>`) > -1;
    expect(result).toBeTruthy();
})
test('vue-router: router-view without inner element', () => {
    const ast = $(`<template><router-view class="view"></router-view></template>`, { parseOptions: { language: 'vue' }});
    const outAst = transform(ast, { gogocode: $ });
    const code = outAst.generate();
    const result = code.indexOf(`<router-view class="view"></router-view>`) > -1;
    expect(result).toBeTruthy();
})
