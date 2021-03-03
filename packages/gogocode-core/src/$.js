const core = require('./js-core/core');
const hcore = require('./html-core/core');
const NodePath = require('./NodePath');
const AST = require('./Ast');
// const build = require('./build-node');
const loadFile = require('./file-tool/read-file');
const writeFile = require('./file-tool/write-file');

const main = (code, options = {}) => {
    code = code || '';
    let node;
    let nodePath;
    let parseOptions;
    let astFragment;
    const isProgram =
        options.isProgram === undefined || options.isProgram === true;
    if (typeof options.parseOptions == 'object') {
        parseOptions = options.parseOptions;
    }

    if (typeof options.astFragment == 'object') {
        astFragment = options.astFragment;
    }

    if (typeof code == 'string') {
        if (parseOptions && parseOptions.html) {
            node = hcore.buildAstByAstStr(code, astFragment, {
                isProgram,
                parseOptions
            });
        } else {
            node = core.buildAstByAstStr(code, astFragment, {
                isProgram,
                parseOptions
            });
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

    return new AST(nodePath, { parseOptions, rootNode: nodePath });
};

main.loadFile = (filePath, { parseOptions } = {}) => {
    const code = loadFile(filePath).toString();
    let node;
    try {
        if (parseOptions && parseOptions.html) {
            node = hcore.buildAstByAstStr(
                code,
                {},
                {
                    parseOptions,
                    isProgram: true
                }
            );
        } else {
            node = core.buildAstByAstStr(
                code,
                {},
                {
                    parseOptions,
                    isProgram: true
                }
            );
        }
        const nodePath = new NodePath(node);
        return new AST(nodePath, { rootNode: nodePath, parseOptions });
    } catch (e) {
        return { 
            src: code,
            error: `Only correct js or html could be parse successfully, please check the code or parseOptions!`
        }
    }
};

main.writeFile = writeFile;

module.exports = main;
