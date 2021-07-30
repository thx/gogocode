const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, { gogocode: $ }) {
    const isVueFile = ast.parseOptions && ast.parseOptions.language === 'vue';
    const script = isVueFile ? ast.find('<script></script>') : ast;

    const isFunctional = script.has('{ functional: true }');

    if (isFunctional) {
        scriptUtils.addVueImport(script);

        if (isVueFile) {
            // <template functional> => <template>
            const tAttr = ast.attr('template.attr');
            if (tAttr) {
                delete tAttr.functional;
            }
        }
        script.find('{ functional: true }').each((ast) => {
            script.replace('render: ($$$1) => { $$$2 }', 'render($$$1) { $$$2 }')
            script.replace('render: function ($$$1) { $$$2 }', 'render($$$1) { $$$2 }')
            let renderFunction = script.find('render() { }')
            if (renderFunction.length) {
                const hName = renderFunction.attr('params.0.name');
                renderFunction.replace(`${hName}($$$)`, 'Vue.h($$$)');
                const contextName = renderFunction.attr('params.1.name') || 'context';

                const propsStr = $(renderFunction.attr('params.1')).generate();
                const hasDestructContext = renderFunction.attr('params.1.type') === 'ObjectPattern';
                renderFunction.attr('params', []);
                renderFunction.append('params', '_props');
                renderFunction.append('params', '_context');

                if (hasDestructContext) {
                    renderFunction.prepend('body', `const ${propsStr} = ${contextName};`);
                }

                renderFunction.prepend(
                    'body',
                    `const ${contextName} = {..._context, props: _props, data: _context.attr, children: _context.slots };`
                );
                const renderFunctionStr = `function ${renderFunction.generate()}`;
                renderFunction.parent(1).replaceBy(renderFunctionStr);
            }
        });
    }

    // remove functional: true
    return ast;
};
