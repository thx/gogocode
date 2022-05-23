const scriptUtils = require('../utils/scriptUtils');
const _ = require('lodash');

module.exports = function (ast, api) {
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
        // https://github.com/vuejs/core/blob/0683a022ec83694e29636f64aaf3c04012e9a7f0/packages/compiler-core/src/compat/transformFilter.ts#L62
        const validDivisionCharRE = /[\w).+\-_$\]]/

        function parseFilter(exp) {
            let inSingle = false
            let inDouble = false
            let inTemplateString = false
            let inRegex = false
            let curly = 0
            let square = 0
            let paren = 0
            let lastFilterIndex = 0
            let c,
                prev,
                i,
                expression,
                filters = []

            for (i = 0; i < exp.length; i++) {
                prev = c
                c = exp.charCodeAt(i)
                if (inSingle) {
                    if (c === 0x27 && prev !== 0x5c) inSingle = false
                } else if (inDouble) {
                    if (c === 0x22 && prev !== 0x5c) inDouble = false
                } else if (inTemplateString) {
                    if (c === 0x60 && prev !== 0x5c) inTemplateString = false
                } else if (inRegex) {
                    if (c === 0x2f && prev !== 0x5c) inRegex = false
                } else if (
                    c === 0x7c && // pipe
                    exp.charCodeAt(i + 1) !== 0x7c &&
                    exp.charCodeAt(i - 1) !== 0x7c &&
                    !curly &&
                    !square &&
                    !paren
                ) {
                    if (expression === undefined) {
                        // first filter, end of expression
                        lastFilterIndex = i + 1
                        expression = exp.slice(0, i).trim()
                    } else {
                        pushFilter()
                    }
                } else {
                    switch (c) {
                    case 0x22:
                        inDouble = true
                        break // "
                    case 0x27:
                        inSingle = true
                        break // '
                    case 0x60:
                        inTemplateString = true
                        break // `
                    case 0x28:
                        paren++
                        break // (
                    case 0x29:
                        paren--
                        break // )
                    case 0x5b:
                        square++
                        break // [
                    case 0x5d:
                        square--
                        break // ]
                    case 0x7b:
                        curly++
                        break // {
                    case 0x7d:
                        curly--
                        break // }
                    }
                    if (c === 0x2f) {
                        // /
                        let j = i - 1
                        let p
                        // find first non-whitespace prev char
                        for (; j >= 0; j--) {
                            p = exp.charAt(j)
                            if (p !== ' ') break
                        }
                        if (!p || !validDivisionCharRE.test(p)) {
                            inRegex = true
                        }
                    }
                }
            }

            if (expression === undefined) {
                expression = exp.slice(0, i).trim()
            } else if (lastFilterIndex !== 0) {
                pushFilter()
            }

            function pushFilter() {
                filters.push(exp.slice(lastFilterIndex, i).trim())
                lastFilterIndex = i + 1
            }

            if (filters.length) {
                for (i = 0; i < filters.length; i++) {
                    expression = wrapFilter(expression, filters[i])
                }
            }
            return expression
        }

        function wrapFilter(exp, filter) {
            const getName = (name) => {
                if (scopedFilterList.includes(name)) {
                    return `${name}_filter`
                }
                return `$filters.${name}`
            }

            const i = filter.indexOf('(')
            if (i < 0) {
                return `${getName(filter)}(${exp})`
            } else {
                const name = getName(filter.slice(0, i))
                const args = filter.slice(i + 1)
                return `${name}(${exp}${args !== ')' ? ',' + args : args}`
            }
        }

        return parseFilter(filterExpression)
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
