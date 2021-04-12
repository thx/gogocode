const core = require('../js-core/core');
const htmlCore = require('../html-core/core')
const NodePath = require('../NodePath');
const AST = require('../Ast');
module.exports = {
    getTemplate(ast) {
        // 仅针对vue，取template，后续通过htmlcore处理
        if (ast.node.template) {
            const template = htmlCore.buildAstByAstStr(
                ast.node.template.content,
                {},
                {
                    isProgram: true,
                    parseOptions: { language: 'html' }
                }
            );
            const nodePath = new NodePath(template);
            const templateAST = new AST(nodePath, {  
                parseOptions: { language: 'html' },
                rootNode: nodePath
            })
            templateAST.sfc = ast
            return templateAST;
        } else {
            return ast;
        }
    },
    getScript(ast) {
        // 仅针对vue，取script，后续通过jscore处理
        if (ast.node.script) {
            const content = ast.node.script.content.replace(/\n/g, '')
            const script = core.buildAstByAstStr(
                content, {},
                { isProgram: true }
            );
            const nodePath = new NodePath(script);
            const scriptAST = new AST(nodePath, {  
                rootNode: nodePath,
            })
            scriptAST.sfc = ast
            return scriptAST;
        } else {
            return ast;
        }
    }
}