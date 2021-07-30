const recast = require('recast-yx');
const babelParse = require('@babel/parser');
module.exports = function(code, options) {
    options = options || global.parseOptions;
    let plugins = ((options && options.plugins) ? options.plugins : [])
        .concat([
            'plugin-syntax-typescript',
            'typescript',
            'asyncGenerators',
            'bigInt',
            'classProperties',
            'classPrivateProperties',
            'classPrivateMethods',
            'doExpressions',
            'dynamicImport',
            'exportDefaultFrom',
            'exportNamespaceFrom',
            'functionBind',
            'functionSent',
            'importMeta',
            'logicalAssignment',
            'nullishCoalescingOperator',
            'numericSeparator',
            'objectRestSpread',
            'optionalCatchBinding',
            'optionalChaining',
            'partialApplication',
            ['pipelineOperator', {'proposal': "smart"}],
            'throwExpressions',
            'topLevelAwait',
            'decorators-legacy', 
            ['@babel/plugin-syntax-decorators','decorators', { decoratorsBeforeExport: true }]
        ]);
    const parseOptions = {
        // sourceType: 'module',
        allowHashBang: true,
        ecmaVersion: Infinity,
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        allowUndeclaredExports: true,
        allowSuperOutsideMethod: true,
        startLine: 1,
        tokens: true,
        ...(options || {}),
        plugins,
    };
    return recast.parse(code, {
        parser: {
            parse(code) {
                try {
                    try {
                        return babelParse.parse(code, parseOptions);   
                    } catch(e) {
                        // 是否存在jsx可能导致parse报错，所以在此兼容
                        if (parseOptions.plugins) {
                            const jsxIndex = parseOptions.plugins.indexOf('jsx');
                            if (jsxIndex == -1) {
                                parseOptions.plugins.push('jsx');
                            } else {
                                parseOptions.plugins.splice(jsxIndex, 1)
                            }
                        }
                        return babelParse.parse(code, parseOptions);
                    }
                } catch(e) {
                    throw Error(e.message)
                }
            }
        }
    });
}