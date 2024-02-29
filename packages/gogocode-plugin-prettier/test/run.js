const $ = require('gogocode');
const t = require('../index');
const path = require('path');
const fs = require('fs');

const inputPath = path.resolve(__dirname, './input.js');
const outputPath = path.resolve(__dirname, './output/no-config.js');
const outputPathWithConfig = path.resolve(__dirname, './output/custom-config.js');

fs.readFile(inputPath, function read(err, code) {
    if (err) {
        throw err;
    }
    const outputCode = t(
        {
            source: code.toString(),
            path: inputPath
        },
        {
            gogocode: $
        },
        {
            rootPath: __dirname,
            outFilePath: outputPath,
            outRootPath: __dirname,
        }
    );
    const outputCodeWithConfig = t(
        {
            source: code.toString(),
            path: inputPath
        },
        {
            gogocode: $
        },
        {
            rootPath: __dirname,
            outFilePath: outputPath,
            outRootPath: __dirname,
            prettierrc: "./prettierrc.json"
        }
    );

    fs.writeFileSync(outputPath, outputCode, { encoding: "utf-8" });
    fs.writeFileSync(outputPathWithConfig, outputCodeWithConfig, { encoding: "utf-8" });
    console.log('The file was saved!');
});
