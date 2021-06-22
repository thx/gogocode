const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/global-api');
test('global-api: should not throw error', () => {
    expect(() => {
        const jsPath = path.join(__dirname, 'app.js');
        const ast = $.loadFile(jsPath);
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('global-api: test App', () => {
    const jsPath = path.join(__dirname, 'app.js');
    const ast = $.loadFile(jsPath);
    const newAst = transform(ast, { gogocode: $ });
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
    const newAst = transform(ast, { gogocode: $ });
    const code = newAst.generate();
    const result = code.indexOf('createApp(App)') > -1;
    expect(result).toBeTruthy();
})
