const $ = require('gogocode');
const t = require('../transform');
const path = require('path');
const fs = require('fs');

const inputPath = path.resolve(__dirname, './input.vue');
const outputPath = path.resolve(__dirname, './output.vue');

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

    fs.writeFile(outputPath, outputCode, function (err) {
        if (err) {
            throw err;
        }
        console.log('The file was saved!');
    });
});
