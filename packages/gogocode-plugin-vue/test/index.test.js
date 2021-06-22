const index = require('../index');
const fileUtil = require('../../gogocode-cli/util/file');
const fs = require('fs');
const $ = require('../../gogocode-core/index');




test('index', () => {
    expect(() => {
        const files =fileUtil.listFiles('/Users/fuyingjun/Code/vue/vue2-happyfri/src/')
        files.forEach(filePath => {
            const source = fs.readFileSync(filePath).toString();
            if (fs.stat(filePath).isDirectory) {
                return;
            }
            const ast = index({ source, path: filePath }, { gogocode: $ }, {});
            
        });
       
    }).not.toThrow();
})