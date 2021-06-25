module.exports = function (ast) {
    const script =
    ast.parseOptions && ast.parseOptions.language === 'vue'
        ? ast.find('<script></script>')
        : ast;

    script.replace(`import $_$ from 'vue';`, `import * as $_$ from 'vue';`);

    return ast;
};
