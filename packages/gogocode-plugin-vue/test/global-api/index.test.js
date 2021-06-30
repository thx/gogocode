const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/global-api');
test('global-api: should not throw error', () => {
    expect(() => {
        const jsPath = path.join(__dirname, 'app.js');
        const ast = $.loadFile(jsPath);
        const options = { rootPath: '/test', filePath: '/test/src/main.js' };
        transform(ast, { gogocode: $ }, options);
    }).not.toThrow();
})
test('global-api: test App', () => {
    const jsPath = path.join(__dirname, 'app.js');
    const ast = $.loadFile(jsPath);
    const options = { rootPath: '/test', filePath: '/test/src/main.js' };
    const newAst = transform(ast, { gogocode: $ }, options);
    const code = newAst.generate();
    const result = code.indexOf('createApp(App)') > -1;
    expect(result).toBeTruthy();
})
test('global-api: test App', () => {
    const ast = $(`
    import App from './App';
    Vue.use();
    const app = new Vue({ components:{App} })
    `);
    const options = { rootPath: '/test', filePath: '/test/src/main.js' };
    const newAst = transform(ast, { gogocode: $ }, options);
    const code = newAst.generate();
    const result = code.indexOf('createApp(App)') > -1;
    expect(result).toBeTruthy();
})
test('global-api: test mount', () => {
    const ast = $(`
    import App from './App';
    Vue.use();
    const app = new Vue({ components:{App} }).$mount('#app');
    `);
    
    const options = { rootPath: '/test', filePath: '/test/src/main.js' };
    const newAst = transform(ast, { gogocode: $ }, options);
    const code = newAst.generate();
    const result = code.indexOf(`window.$vueApp.mount('#app')`) > -1;
    expect(result).toBeTruthy();
})
