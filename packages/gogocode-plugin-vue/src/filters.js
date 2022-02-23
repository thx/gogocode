const scriptUtils = require('../utils/scriptUtils');
const _ = require('lodash');

function callSeq(scopedFilterList, arr, index) {
    const item = arr[index];
    const name = item.name;
    const args = item.args;
    if (index === arr.length - 1) {
        return name;
    }

    const filterName = scopedFilterList.includes(name) ? `${name}_filter` : `$filters.${name}`;

    return `${filterName}(${callSeq(scopedFilterList, arr, index + 1)}${args.length ? `, ${args.join(', ')}` : ''})`;
}

module.exports = function (ast, api) {
    const $ = api.gogocode;
    const vueAppName = 'window.$vueApp';
    const isVueFile = ast.parseOptions && ast.parseOptions.language === 'vue';
    const script = isVueFile ? ast.find('<script></script>') : ast;

    const vueName = scriptUtils.getVueName();

    // Vue.filter() => app.config.globalProperties.$filters

    script.find(`${vueName}.filter($_$1, $_$2)`).each((filterAst) => {
        const match = filterAst.match;

        const filterName = match[1][0].value;

        if (match[2]) {
            const functionStr = match[2][0].value;
            filterAst.replaceBy(
                `(${vueAppName}.config.globalProperties.$filters || (${vueAppName}.config.globalProperties.$filters = {})).${filterName} = ${functionStr}`
            );
        }
    });

    const filter = script.find(`filters: { $_$1: $_$2 }`);

    const scopedFilterList = [];

    if (filter.length) {
        const filterMatch = filter.match;
        if (filterMatch[1] && filterMatch[1].length) {
            for (let i = 0; i < filterMatch[1].length; ++i) {
                const filterName = filterMatch[1][i].value;
                const functionStr = filterMatch[2][i].value;
                scopedFilterList.push(filterName);
                if (functionStr.indexOf(filterName) === 0) {
                    scriptUtils.addMethod(
                        script,
                        `${functionStr.replace(new RegExp(`^${filterName}`), `${filterName}_filter`)}`
                    );
                } else {
                    scriptUtils.addMethod(script, `${filterName}_filter: ${functionStr}`);
                }
            }
        }
    }

    // 干掉原来的 filter
    script.replace('{ $$$1, filters: { $$$2 } }', '{ $$$1 }');

    // x | A | B | C =>  C(B(A(x)))
    function converFilterExpression(filterExpression) {
        const filterExpressionArr = filterExpression.split(' | ');
        if (filterExpressionArr.length === 1) {
            return filterExpression;
        }
        const matchArr = filterExpressionArr.map((e) => {
            // A or B(x)
            const expItem = e.trim();
            // https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcICGAKADwBoBPIgLyIHIBnKgShCJAHckAnAa2XSxADMYEAMZwwSCAAI47HBBr8OAWzz8wAGzQBJCIqKScUMPqRQxEmvUnAAOlMnCLcSQBJJAXgNGAdAHMk-o7odpIOTpI0SDDswmgekmqaOorekdGxIWHyzjg0zp4ueGkxaPrAYDQACuwBskqYCTjqNGgAvvSZjtnSJFBxnrlw3jhwMnhUaARQ7Gg0NOIQ3nC9aAyd4fwQAHI4Sv0GecOj7OOT07PzEt7CTZpo3hC7qx32XXkOtzt7NPGDR2MTKYzOYLYbsXwwPYQOB0ejeJSGPA4cEeAB8riR4LhvjQEDQsjgaDw9BeoRmcGiUk2XzQdladiY4Gg8AAMnJfHxln0aMJ2GAzIyABa5apoUZgfFYGQwUogGgwABGADUJSwACorTkzDCtIA
            const expressionStatementAst = $(expItem, { isProgram: false });
            const expressionType = expressionStatementAst.attr('expression.type') || 'Identifier';
            if (expressionType === 'CallExpression') {
                const args = (expressionStatementAst.attr('expression.arguments') || []).map((arg) =>
                    $(arg).generate()
                );
                const fnName = expressionStatementAst.attr('expression.callee.name') || '';
                return {
                    name: fnName,
                    args,
                };
            } else {
                return {
                    name: expItem,
                    args: [],
                };
            }
        });
        const newCallExpression = callSeq(scopedFilterList, _.reverse(matchArr), 0);
        return newCallExpression;
    }

    if (isVueFile) {
        const template = ast.find('<template></template>');
        template.find('<$_$1>$_$2</$_$1>').each((node) => {
            const nodes = _.get(node, 'match.[2].[0].node', []);
            nodes.forEach((node) => {
                const html = _.get(node, 'content.value.content', '');
                if (node.nodeType === 'text' && html) {
                    const html = _.get(node, 'content.value.content');
                    const reg = /\{\{\s*(.*?)\s*\}\}/g;

                    const newHtml = html.replace(reg, (_mustacheHtml, innerExp) => {
                        const newCallExpression = converFilterExpression(innerExp);
                        const newMustacheHtml = `{{ ${newCallExpression} }}`;
                        return newMustacheHtml;
                    });
                    node.content.value.content = newHtml;
                }
            });
        });

        template.find('<$_$1></$_$1>').each((node) => {
            const attrs = node.attr('content.attributes') || [];
            attrs.forEach((attr) => {
                const key = _.get(attr, 'key.content', '');
                const value = _.get(attr, 'value.content', '');
                if (key.indexOf('v-bind:') === 0 || key.indexOf(':') === 0) {
                    attr.value.content = converFilterExpression(value);
                }
            });
        });
    }

    return ast;
};
