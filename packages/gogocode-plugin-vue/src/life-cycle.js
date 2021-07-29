const _ = require('lodash');
const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api) {
    const $ = api.gogocode;
    const script =
    ast.parseOptions && ast.parseOptions.language === 'vue'
        ? ast.find('<script></script>')
        : ast;

    const nameMap = {
        destroyed: 'unmounted',
        beforeDestroy: 'beforeUnmount'
    };

    function processHookNodes(hookNodes) {
        hookNodes.forEach((node) => {
            if(node && node.key) {
                const hookName = node.key.name;
                if(nameMap[hookName]) {
                    node.key.name = nameMap[hookName];
                }
            }
        });
    }

    script
        .find(`{ $_$1: $_$2}`)
        .each((res) => {
            const match = res.match;
            const hookNodes = (match[2] || []).map(e => e.node);
            processHookNodes(hookNodes);
        });

    return ast;
};
