const jsCore = require('./js-core/core');
const htmlCore = require('./html-core/core');
const vueCore = require('./vue-core/core');
const NodePath = require('./NodePath');
const AST = require('./Ast');
// const build = require('./build-node');
const loadFile = require('./file-tool/read-file');
const writeFile = require('./file-tool/write-file');
const pkg = require('../package.json');

const langCoreMap = {
    'vue': vueCore,
    'html': htmlCore,
    'js': jsCore
}

function getCore(parseOptions = {}) {
    let core = jsCore
    if (parseOptions.language && langCoreMap[parseOptions.language]) {
        core = langCoreMap[parseOptions.language]
    }
    if (parseOptions.html) {
        core = htmlCore
        parseOptions.language = 'html'
    }
    return core
}

const main = (code, options = {}) => {
    code = code || '';
    let node;
    let nodePath;
    let parseOptions;
    let astFragment;
    let isProgram = 
        options.isProgram === undefined || options.isProgram === true;
    if (typeof options.parseOptions == 'object') {
        parseOptions = options.parseOptions;
    }

    if (typeof options.astFragment == 'object') {
        astFragment = options.astFragment;
    }

    if (typeof code == 'string') {
        try {
            const core = getCore(parseOptions)
            node = core.buildAstByAstStr(
                code,
                astFragment,                 
                {
                    parseOptions,
                    isProgram
                }
            );
        } catch (e) {
            return { 
                src: code,
                error: `Only correct js / html / vue could be parse successfully, please check the code or parseOptions!`
            }
        }
        nodePath = new NodePath(node);
    } else if (code.nodeType) {
        nodePath = new NodePath(code);
    } else if (code.type) {
        // 传入ast node对象
        nodePath = new NodePath(code);
    } else if (code.node && code.parent) {
        // 传入nodePath对象
        nodePath = code;
    } else {
        throw new Error('$ failed! invalid input! accept code / ast node / nodePath');
    }

    let ast = new AST(nodePath, { parseOptions, rootNode: nodePath });
    return ast;
};

main.loadFile = (filePath, { parseOptions } = {}) => {
    const code = loadFile(filePath).toString();
    return main(code, { parseOptions })
};

main.writeFile = writeFile;

main.version = pkg.version;

module.exports = main;
