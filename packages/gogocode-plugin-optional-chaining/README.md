作为 npm 包，项目根目录的 transform.js 会被 gogocode-cli 调用

fileInfo 会包括 source 和 path 作为单个代码文件的内容和路径
api 目前只有 gogocode 作为转换库注入
options 将透传命令行的 options

```javascript

module.exports = function(fileInfo, api, options) {
  const sourceCode = fileInfo.source;
  const $ = api.gogocode;
  return $(sourceCode)
    .replace('const a = $_$', 'const a = 2')
    .generate();
};

```

命令行调用方式：


```

gogogcode --src script.js --out script-compiled.js --transform=transform.js


```
