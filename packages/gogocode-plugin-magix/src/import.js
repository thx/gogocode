const _ = require('lodash')

module.exports = function (ast) {
    const script = ast.parseOptions && ast.parseOptions.language === 'vue' ? ast.find('<script></script>') : ast;
    script.replace(`import $_$1 from 'element-ui'`, `import $_$1 from 'element-plus'`);
    const importStatement = script.find(`import { $$$1 } from 'element-ui'`);

    if (importStatement.length) {
        const specifiers = [];
        _.get(importStatement, `node.specifiers`, []).forEach((specifier) => {
            const localName = specifier.local.name;
            const importedName = `El${specifier.imported.name}`;
            specifiers.push({
                localName,
                importedName,
            });
        });

        script.replace(
            `import { $$$1 } from 'element-ui'`,
            `import { ${specifiers.map((s) =>
                s.localName === s.importedName ? s.localName : `${s.importedName} as ${s.localName}`
            ).join(',')} } from 'element-plus'`
        );
    }

    return ast;
};
