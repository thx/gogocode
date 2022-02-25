const $ = require('gogocode');
const path = require('path');
const prettier = require('prettier');
const fs = require('fs');

const globalApiTreeshaking = require('./src/global-api-treeshaking');
const globalApi = require('./src/global-api');

const CompFileMap = {
    'array-refs': ['Comp-ele', 'Comp'],
    'attrs-includes-class-style': 'Child',
    'slots-unification': ['Comp', 'ScopedSlots'],
    'listeners-removed': 'ButtonWithLable',
    'render-function-api': 'VNodeTemp',
    'events-api': ['A', 'B', 'EventHub'],
    'functional-components': 'HComp',
};

function execRule(ruleName) {
    if (!ruleName) {
        return;
    }

    const compFileNames = Array.isArray(CompFileMap[ruleName])
        ? CompFileMap[ruleName]
        : CompFileMap[ruleName]
            ? [CompFileMap[ruleName]]
            : ['Comp'];

    compFileNames.forEach((compFileName) => {
        const inputPath = path.resolve(
            __dirname,
            `../gogocode-vue-playground/packages/vue2/src/components/${ruleName}/${compFileName}.vue`
        );
        const outputPath = path.resolve(
            __dirname,
            `../gogocode-vue-playground/packages/vue3/src/components/${ruleName}/${compFileName}-out.vue`
        );
        const rule = require(`./src/${ruleName}`);

        fs.readFile(inputPath, function read(err, code) {
            if (err) {
                throw err;
            }

            const sourceCode = code.toString();
            const ast = $(sourceCode, { parseOptions: { language: 'vue' } });

            const rules = [globalApi, globalApiTreeshaking, rule];

            const api = { gogocode: $ };
            const outAst = rules.reduce(
                (ast, rule) =>
                    rule(ast, api, {
                        filePath: inputPath,
                        rootPath:  path.resolve(__dirname, `../gogocode-vue-playground/packages/vue2/src/`),
                        outFilePath: inputPath,
                        outRootPath: path.resolve(__dirname, `../gogocode-vue-playground/packages/vue3/src/`),
                    }),
                ast
            );

            const outputCode = outAst.root().generate();

            const prettierOutPut = prettier.format(outputCode, {
                trailingComma: 'es5',
                tabWidth: 2,
                semi: false,
                singleQuote: true,
                printWidth: 80,
                parser: 'vue',
            });

            fs.writeFile(outputPath, prettierOutPut, function (err) {
                if (err) {
                    throw err;
                }
                console.log('The file was saved!');
            });
        });
    });
}

function run() {
    process.argv.slice(2).forEach((ruleName) => {
        console.log(ruleName)
        execRule(ruleName);
    });
}

run();
