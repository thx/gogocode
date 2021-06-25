const _ = require('lodash');
const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api) {
    const $ = api.gogocode;
    const script =
    ast.parseOptions && ast.parseOptions.language === 'vue'
        ? ast.find('<script></script>')
        : ast;

    const vueName = scriptUtils.getVueName(script);

    const nameMap = {
        bind: 'beforeMount',
        inserted: 'mounted',
        update: 'updated',
        componentUpdated: 'updated',
        unbind: 'unMounted',
    };

    function processHookNodes(hookNodes) {
        hookNodes.forEach((node) => {
            const hookName = node.key.name;
            node.key.name = nameMap[hookName];
            // vnode.context => binding.instance
            if (hookName === 'bind') {
                const bindingParamName = _.get(node, 'params[1].name', '');
                const vnodeParamName = _.get(node, 'params[2].name', '');
                if (bindingParamName && vnodeParamName) {
                    const $node = $(node);
                    $node.replace(
                        `${vnodeParamName}.context`,
                        `${bindingParamName}.instance`
                    );
                }
            }
        });
    }

    /** Vue.directive() 形式的转换 */

    script.find(`${vueName}.directive($_$1, $_$2)`).each((res) => {
        const match = res.match;
        const hookNodes = _.get(match, '[2][0].node.properties', []);
        processHookNodes(hookNodes);
    });

    /** directives: {} 形式的转换 */
    script
        .find(
            `
  directives: {
    $_$1: $_$2
  }
  `
        )
        .each((res) => {
            const match = res.match;
            const hookNodes = _.get(match, '[2][0].node.properties', []);
            processHookNodes(hookNodes);
        });

    return ast;
};
