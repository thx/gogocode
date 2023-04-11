const _ = require('lodash');
const fse = require('fs-extra');
const path = require('path');
const scriptUtils = require('../utils/scriptUtils');

module.exports = function (ast, api, options) {
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
        unbind: 'unmounted',
    };

    function processHookNodes(hookNodes) {
        hookNodes.forEach((node) => {
            if(node && node.key) {
                const hookName = node.key.name;
                if(nameMap[hookName]) {
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

    if(isDirectiveFile(options.rootPath, options.filePath)) {
        script
            .find(`{ $_$1: $_$2}`)
            .each((res) => {
                const match = res.match;
                const hookNodes = (match[2] || []).map(e => e.node);
                processHookNodes(hookNodes);
            });
    }
    
    
    return ast;
};

function isDirectiveFile(rootPath, filePath) {
    const isDir = fse.existsSync(rootPath) && fse.statSync(rootPath).isDirectory();
    const relative = isDir ? path.relative(rootPath, filePath) : path.basename(filePath);
    return relative.indexOf('directive') > -1;
}
