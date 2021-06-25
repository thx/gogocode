const scriptUtils = require('../utils/scriptUtils');
const path = require('path');
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


    if (isMainFile(options.rootPath, options.filePath)) {
        script.find(`new ${vueName}($_$)`).each((fAst) => {
            if (
                !fAst.match ||
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
            fAst.replace(
                `new ${vueName}($_$)`,
                `${vueAppName} = ${vueName}.createApp(${appName})`
            );
        });

        script.replace(
            `$mount`,
            `mount`
        );
    }

    return ast;
};

function withoutExt(p) {
    return p.replace(/\.[^/.]+$/, '');
}

function isMainFile(rootPath, filePath) {
    const relative = path.relative(rootPath, filePath);
    return ['src/main', 'src/index', 'src/app'].includes(withoutExt(relative));
}

function getPosition(ast) {
    let newAst = ast;
    let level = 0;
    while (
        newAst.node &&
    newAst.node.type !== 'VariableDeclarator' &&
    level < 10
    ) {
        newAst = newAst.parent();
        level++;
    }
    return newAst.parent();
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
