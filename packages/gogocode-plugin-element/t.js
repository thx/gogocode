const $ = require('gogocode');
const path = require('path');
const prettier = require('prettier');
const fs = require('fs');
const vuePlugin = require('gogocode-plugin-vue');
const importRule = require('./src/import');
const vModelEleRule = require('./src/v-model-ele');
const vueTransform = vuePlugin.transform;
const CompFileMap = {

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
            `../gogocode-element-playground/packages/vue2/src/components/${ruleName}/${compFileName}.vue`
        );
        const outputPath = path.resolve(
            __dirname,
            `../gogocode-element-playground/packages/vue3/src/components/${ruleName}/${compFileName}-out.vue`
        );
        const rule = require(`./src/${ruleName}`);

        fs.readFile(inputPath, function read(err, code) {
            if (err) {
                throw err;
            }

            let sourceCode = code.toString();

            sourceCode = vueTransform(
                {
                    path: inputPath,
                    source: sourceCode,
                },
                {
                    gogocode: $,
                },
                {
                    rootPath: path.resolve(__dirname, `../gogocode-element-playground/packages/vue2/src/`),
                    outFilePath: outputPath,
                    outRootPath: path.resolve(__dirname, `../gogocode-element-playground/packages/vue3/src/`),
                }
            );

            const ast = $(sourceCode, { parseOptions: { language: 'vue' } });

            const rules = [importRule, vModelEleRule, rule];
            const api = { gogocode: $ };
            const outAst = rules.reduce(
                (ast, rule) =>
                    rule(ast, api, {
                        filePath: inputPath,
                        rootPath: path.resolve(__dirname, `../gogocode-element-playground/packages/vue2/src/`),
                        outFilePath: outputPath,
                        outRootPath: path.resolve(__dirname, `../gogocode-element-playground/packages/vue3/src/`),
                    }),
                ast
            );

            const outputCode = outAst.generate();

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
        console.log(ruleName);
        execRule(ruleName);
    });
}

run();
