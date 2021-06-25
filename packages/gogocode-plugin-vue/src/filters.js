const scriptUtils = require('../utils/scriptUtils');
const _ = require('lodash');

function callSeq(scopedFilterList, arr, index) {
    if (index === arr.length - 1) {
        return arr[index];
    }

    if (scopedFilterList.includes(arr[index])) {
        return `${scopedFilterList.includes(arr[index]) ? '' : '$filters.'}${
            arr[index]
        }_filter(${callSeq(scopedFilterList, arr, index + 1)})`;
    } else {
        return `$filters.${arr[index]}(${callSeq(
            scopedFilterList,
            arr,
            index + 1
        )})`;
    }
}

module.exports = function (ast) {
    const vueAppName = 'window.$vueApp';
    const isVueFile = ast.parseOptions && ast.parseOptions.language === 'vue';
    const script = isVueFile ? ast.find('<script></script>') : ast;

    const vueName = scriptUtils.getVueName();

    // Vue.filter() => app.config.globalProperties.$filters

    script.find(`${vueName}.filter($_$1, $_$2)`).each((filterAst) => {
        const match = filterAst.match;

        const filterName = match[1][0].value;
        const functionStr = match[2][0].value;

        filterAst.replaceBy(
            `(${vueAppName}.config.globalProperties.$filters || (${vueAppName}.config.globalProperties.$filters = {})).${filterName} = ${functionStr}`
        );
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
                        `${functionStr.replace(
                            new RegExp(`^${filterName}`),
                            `${filterName}_filter`
                        )}`
                    );
                } else {
                    scriptUtils.addMethod(script, `${filterName}_filter: ${functionStr}`);
                }
            }
        }

        filter.replaceBy('// filter');
    }

    if (isVueFile) {
        const template = ast.find('<template></template>');
        template.find('<$_$1>$_$2</$_$1>').each((node) => {
            const nodes = _.get(node, 'match.[2].[0].node', []);
            nodes.forEach((node) => {
                const html = _.get(node, 'content.value.content', '');
                if (node.nodeType === 'text' && html) {
                    const html = _.get(node, 'content.value.content');
                    const reg = /\{\{\s*([^{}]+)(?:\s+\|\s+([^{}]+))+\s*\}\}/g;
                    const innerReg = /\s+\|\s+(\w+)/g;
                    const newHtml = html.replace(reg, (mustacheHtml, firstElemnt) => {
                        const matchArr = [firstElemnt];
                        let res;
                        while ((res = innerReg.exec(mustacheHtml))) {
                            matchArr.push(res[1]);
                        }
                        matchArr.reverse();

                        const newMustacheHtml = `{{ ${callSeq(
                            scopedFilterList,
                            matchArr,
                            0
                        )} }}`;
                        return newMustacheHtml;
                    });
                    node.content.value.content = newHtml;
                }
            });
        });
    }

    return ast;
};
