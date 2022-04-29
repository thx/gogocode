const $ = require('gogocode');
const path = require('path');
const prettier = require('prettier');
const fs = require('fs');
const importMx = require('./src/import-mx');
const replaceView = require('./src/playground-replace-view');
const at = require('./src/at');
const updater = require('./src/updater');
const CompFileMap = {};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function execRule(ruleName) {
    if (!ruleName) {
        return;
    }

    const compFileNames = Array.isArray(CompFileMap[ruleName])
        ? CompFileMap[ruleName]
        : CompFileMap[ruleName]
            ? [CompFileMap[ruleName]]
            : ['index'];

    compFileNames.forEach((compFileName) => {
        const inputPath = path.resolve(
            __dirname,
            `./playground/packages/mx3/src/zs_scaffold/views/pages/demo/${ruleName}/${compFileName}.ts`
        );
        const inputTemplatePath = path.resolve(
            __dirname,
            `./playground/packages/mx3/src/zs_scaffold/views/pages/demo/${ruleName}/${compFileName}.html`
        );
        const outputPath = path.resolve(
            __dirname,
            `./playground/packages/mx5/src/magix5-site/views/pages/demo-out/${ruleName}/${compFileName}.ts`
        );
        const outputTemplatePath = path.resolve(
            __dirname,
            `./playground/packages/mx5/src/magix5-site/views/pages/demo-out/${ruleName}/${compFileName}.html`
        );

        const rule = require(`./src/${ruleName}`);

        Promise.all([fs.promises.readFile(inputPath, 'utf-8'), fs.promises.readFile(inputTemplatePath, 'utf-8')])
            .then(([inputCode, inputTemplate]) => {
                const script = $(inputCode);
                const template = $(inputTemplate, { parseOptions: { language: 'html' } });

                const rules = [importMx, replaceView, updater, at, rule];
                const api = { gogocode: $ };
                const out = rules.reduce(
                    ({ script, template }, rule) =>
                        rule({ script, template }, api, {
                            filePath: inputPath,
                            rootPath: path.resolve(__dirname, `./playground/packages/mx3/src/zs_scaffold/`),
                            outFilePath: outputPath,
                            outRootPath: path.resolve(__dirname, `./playground/packages/mx3/src/zs_scaffold/`),
                        }),
                    { script, template }
                );

                const outputCode = out.script.generate();
                const outputTemplate = out.template.generate();

                const prettierOutPut = prettier.format(outputCode, {
                    trailingComma: 'es5',
                    tabWidth: 2,
                    semi: false,
                    singleQuote: true,
                    printWidth: 80,
                    parser: 'typescript',
                });

                ensureDirectoryExistence(outputPath);
                ensureDirectoryExistence(outputTemplatePath);

                Promise.all([
                    fs.promises.writeFile(outputPath, prettierOutPut),
                    fs.promises.writeFile(outputTemplatePath, outputTemplate),
                ]).then(() => {
                    console.log('The file was saved!');
                });
            })
            .catch((err) => {
                throw err;
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
