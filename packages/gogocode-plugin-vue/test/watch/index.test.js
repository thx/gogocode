const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/watch');
function isWatchObj(prop) {
    const props = prop.value.properties;
    const fPs = props.filter(p => (p.key && p.key.name === 'handler'));
    return fPs.length > 0;
}
test('watch', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
        transform(ast, { gogocode: $ });
    }).not.toThrow();
})
test('watch: result should be ok', () => {

    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast, { gogocode: $ });
    const scriptAst = ast.find('<script></script>');
    let result = false;
    scriptAst.find('watch: { $_$ }').each(function (fAst) {
        const props = fAst.attr('value.properties');
        props.forEach((prop) => {
            if (!prop.value || !prop.value.properties) {
                return;
            }
            if (!isWatchObj(prop)) {
                return;
            }
            const innerProps = prop.value.properties;
            const deepProp = innerProps.find(ip => (ip.key.name === 'deep'));
            if (deepProp) {
                result = true;
            }
        });
    });
    expect(result).toBeTruthy();
})