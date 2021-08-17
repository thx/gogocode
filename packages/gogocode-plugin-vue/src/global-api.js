const scriptUtils = require('../utils/scriptUtils');
const path = require('path');
const fse = require('fs-extra');

module.exports = function (ast, api, options) {
   
    const vueAppName = 'window.$vueApp';
    const script =
    ast.parseOptions && ast.parseOptions.language === 'vue'
        ? ast.find('<script></script>')
        : ast;
    const vueName = scriptUtils.getVueName(script);

    script.replace(`${vueName}.config.productionTip = $_$`, ``);
    script.replace(
        `${vueName}.config.ignoredElements = $_$`,
        `
  ${vueAppName}.config.isCustomElement = (tag) => $_$.some(t => t instanceof RegExp ? t.test(tag) : tag === t)
  `
    );
    script.replace(`${vueName}.observable`, `${vueAppName}.reactive`);
    script.replace(`${vueName}.config`, `${vueAppName}.config`);
    script.replace(`${vueName}.component`, `${vueAppName}.component`);
    script.replace(`${vueName}.directive`, `${vueAppName}.directive`);
    script.replace(`${vueName}.mixin`, `${vueAppName}.mixin`);
    script.replace(`${vueName}.use`, `${vueAppName}.use`);
    script.replace(
        `${vueName}.prototype`,
        `${vueAppName}.config.globalProperties`
    );

    const isMFile = isMainFile(options.rootPath, options.filePath);
    if (isMFile) {
        script.find(`new ${vueName}($_$)`).each((fAst) => {
            if (
                !fAst.match[0] ||
                !fAst.match[0].length ||
                !fAst.match[0][0].node
            ) {
                return;
            }
            const { properties, type } = fAst.match[0][0].node;
            // 处理 const app = new Vue({....}) 和 直接new Vue({....}) 的情况
            const position = getPosition(fAst);
            if (type === 'Identifier') {
                // todo
            } else if (type === 'ObjectExpression') {
                properties.forEach((prop) => {
                    const key = prop.key.name;
                    if (!prop.value) {
                        return;
                    }
                    let value = prop.value.name;
                    if (key === 'router') {
                        position.after(`${vueAppName}.use(${value});`);
                    } else if (key === 'store') {
                        position.after(`${vueAppName}.use(${value});`);
                    } else if (key === 'el') {
                        if (prop.value.type === 'StringLiteral') {
                            value = `'${prop.value.value}'`;
                        }
                        position.after(`${vueAppName}.mount(${value});`);
                    }
                });
            }

            // add global function for router-link
            // https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4-router-link-%E4%B8%AD%E7%9A%84-append-%E5%B1%9E%E6%80%A7
            position.after(`${vueAppName}.config.globalProperties.routerAppend = (path, pathToAppend) => {
                return path + (path.endsWith('/') ? '' : '/') + pathToAppend; };`);

            // find appName for createApp
            let appName = '';
            fAst
                .find([`{render:$_$=>$_$($_$1)}`, `{render:($_$)=>$_$($_$1)}`])
                .each((ast) => {
                    const value = pickValue(ast, 1, 0);
                    if (value) {
                        appName = value;
                    }
                });
            fAst.find(`{components:{$_$}}`).each((ast) => {
                const value = pickValue(ast, 0, 0);
                if (value) {
                    appName = value;
                }
            });
            fAst.find(`router.start($_$,$_$1)`).each((ast) => {
                fAst.remove(`router.start($_$,$_$1)`);
                const value = pickValue(ast, 0, 0);
                if (value) {
                    appName = value;
                }
            });
            //处理 https://github.com/thx/gogocode/issues/29
            script.find(`new ${vueName}($$$).$mount($_$)`).each((ffAst) => {
                ffAst.replace(`new ${vueName}($$$).$mount($_$)`, `${vueAppName} = ${vueName}.createApp(${appName})`);
                if (ffAst.match[0].length) {
                    const vuePosition = getPosition(ffAst);
                    const value = ffAst.match[0][0].raw;
                    vuePosition.after(`${vueAppName}.mount(${value});`);
                }
            });
            fAst.replace(
                `$mount`,
                `mount`
            );
            fAst.replace(
                `new ${vueName}($_$)`,
                `${vueAppName} = ${vueName}.createApp(${appName})`
            );
            
        });
    } else {
        script.replace(
            `new ${vueName}($_$)`,
            `($_$)`
        );
        script.replace(
            `new ${vueName}()`,
            `({})`
        );
        script.replace(
            `${vueName}.extend($_$)`,
            `($_$)`
        );
    }

    return ast;
};

function withoutExt(p) {
    return p.replace(/\.[^/.]+$/, '');
}

function isMainFile(rootPath, filePath) {
    const isDir = fse.existsSync(rootPath) && fse.statSync(rootPath).isDirectory();
    const relative = isDir ? path.relative(rootPath, filePath) : path.basename(filePath);
    return ['src/main', 'src/index', 'src/app', 'main', 'index', 'app'].includes(withoutExt(relative));
}

function getPosition(ast) {
    let newAst = ast;
    let level = 0;
    while (level < 10) {
        newAst = newAst.parent();
        if (newAst.node && (newAst.node.type === 'VariableDeclaration' || newAst.node.type === 'ExpressionStatement')) {
            break;
        }
        if (!newAst.parent().node) {
            break;
        }
        level++;
    }
  
    return newAst;
}
function pickValue(ast, m, n) {
    if (ast.match &&
    ast.match[m] &&
    ast.match[m].length > 0 &&
    ast.match[m][n] &&
    ast.match[m][n].value
    ) {
        return ast.match[m][n].value;
    }
    return '';
}
