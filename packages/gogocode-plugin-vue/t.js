const $ = require('gogocode');
const path = require('path');
const prettier = require('prettier');
const fs = require('fs');

const globalApiTreeshaking = require('./src/global-api-treeshaking');

const CompFileMap = {
    'attrs-includes-class-style': 'Child',
    'slots-unification': 'ScopedSlots',
    'listeners-removed': 'ButtonWithLable',
    'render-function-api': 'VNodeTemp',
    'events-api': 'B',
    'functional-components': 'HComp'
}

function run() {
    const ruleName = process.argv[2];

    if (!ruleName) {
        return;
    }

    const compFileName = CompFileMap[ruleName] ?? 'Comp'

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

        const rules = [globalApiTreeshaking, rule];

        const api = { gogocode: $ };
        const outAst = rules.reduce((ast, rule) => rule(ast, api, {
            outFilePath: inputPath,
            outRootPath: path.resolve(
                __dirname,
                `../gogocode-vue-playground/packages/vue3/src/`
            )
        }), ast);

        const outputCode = outAst.root().generate();

        const prettierOutPut = prettier.format(outputCode, {
            trailingComma: 'es5',
            tabWidth: 2,
            semi: false,
            singleQuote: true,
            printWidth: 80,
            parser: 'vue',
        });

        fs.writeFile(outputPath, prettierOutPut, function(err) {
            if (err) {
                throw err;
            }
            console.log('The file was saved!');
        });
    });
}

run();
