const parse = require('./parse');
const jsCore = require('../js-core/core');
const htmlCore = require('../html-core/core')
const NodePath = require('../NodePath');
const core = {
    getAstsBySelector(ast, selector, { parseOptions } = {}) {
        parseOptions = Object.assign({}, parseOptions);
        let newAst = ast;
        if (selector == '<template></template>') {
            parseOptions.language = 'html';
            parseOptions.rootLanguage = 'vue';
            if (ast.templateAst) {
                newAst = ast.templateAst;
            } else {
                ast.templateAst = core.getTemplate(ast);
                newAst = ast.templateAst;
            }
        } else if (selector == '<script></script>') {
            parseOptions.language = 'js'
            parseOptions.rootLanguage = 'vue';
            if (ast.scriptAst) {
                newAst = ast.scriptAst;
            } else {
                ast.scriptAst = core.getScript(ast);
                newAst = ast.scriptAst;
            }
        }
        return { nodePathList: [newAst], matchWildCardList: [], extra: { parseOptions } }
    },
    getTemplate(ast) {
        // 仅针对vue，取template，后续通过htmlcore处理
        if (ast.template) {
            const template = htmlCore.buildAstByAstStr(
                ast.template.content,
                {},
                {
                    isProgram: true,
                    parseOptions: { language: 'html' }
                }
            );
            return new NodePath(template);
        } else {
            return new NodePath(ast);
        }
    },
    getScript(ast) {
        // 仅针对vue，取script，后续通过jscore处理
        if (ast.script) {
            const content = ast.script.content
            // const content = ast.script.content.replace(/\n/g, '')
            const script = jsCore.buildAstByAstStr(
                content, {},
                { isProgram: true }
            );
            return new NodePath(script);
        } else {
            return new NodePath(ast);
        }
    },
    buildAstByAstStr(str, astPatialMap = {}, { isProgram = false, parseOptions } = {}) {
        try {
            const program = parse(str, parseOptions);
            if (program) {
                if (isProgram) {
                    return program;
                } else {
                    if (program.template && program.template.ast) {
                        return program.template
                    } else return null
                }
            } else {
                return null;
            }
        } catch(e) {
            console.log('buildAstByAstStr failed:' + e)
        }
    }
}

module.exports = core;