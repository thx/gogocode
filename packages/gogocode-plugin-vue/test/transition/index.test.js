const path = require('path');
const $ = require('gogocode');
const transform = require('../../src/transition');
const csstree = require('css-tree');

test('transition', () => {
    expect(() => {
        const vuePath = path.join(__dirname, 'Comp.vue');
        const ast = $.loadFile(vuePath, { parseOptions: { html: true } });
        transform(ast);
    }).not.toThrow();
})

test('transition', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);
    let result = true
    let style = ast.attr('styles.0.content') || ''
    if (style) {
        let tree = csstree.parse(style)
        csstree.walk(tree, node => {
            if (node.type == 'Raw' && node.value.startsWith('//')) {
                result = false
            }
        });
        ast.attr('styles.0.content', csstree.generate(tree));
    }
    expect(result).toBeTruthy();
})

test('transition', () => {
    const vuePath = path.join(__dirname, 'Comp.vue');
    const ast = $.loadFile(vuePath, { parseOptions: { language: 'vue' } })
    transform(ast);
    let result = true
    let style = ast.attr('styles.0.content') || ''
    let classNames = []
    if (style) {
        let tree = csstree.parse(style)
        let classNames = []
        csstree.walk(tree, node => {
            if (node.type == 'ClassSelector') {
                classNames.forEach(classname => {
                    if ([classname + '-enter', classname + '-leave', 'v-enter', 'v-leave'].indexOf(node.name) > -1) {
                        result = false
                    }
                })
            }
        });
    }
    expect(result).toBeTruthy();
})
