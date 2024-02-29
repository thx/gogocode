---
title: Plugin Development
order: 8
---

### introduce
gogocode supports plug-in operation. A plug-in project is initialized through [gogocode-cli](https://www.npmjs.com/package/gogocode-cli), and the plug-in logic can be customized in the project. And can be executed by [gogocode-cli](https://www.npmjs.com/package/gogocode-cli).
### Plugin Development
#### Initialize a plugin
1. Download [gogocode-cli](https://www.npmjs.com/package/gogocode-cli)

```bash
npm install gogocode-cli -g
```

2. Initialize the gogocode plugin project

```bash
gogocode init
```

After the gogocode init command is executed, a gogocode plugin project will be created in the current directory.
#### Plugin project structure
The gogocode plugin project is a standard npm project. The main entry of the project is configured in the main node of package.json.
![image.png](https://img.alicdn.com/imgextra/i2/O1CN01QvYbud1VtgPvReVzV_!!6000000002711-2-tps-838-454.png)

From the screenshot above, we can see that the transformation logic entry of the plug-in project is transform.js, which is defined as follows:


```javascript
/**
 * The conversion entry exports a function, according to the following function signature
 * @param {*} fileInfo contains source and path properties. source is the text to be converted, path is the path
 * @param {*} api contains gogocode as conversion tool
 * @param {*} options other options are passed in here
 * @returns {string} returns the converted code
 */
module.exports = function(fileInfo, api, options) {
  const sourceCode = fileInfo.source;
  const $ = api.gogocode;
  return $(sourceCode)
    .replace('const a = $_$', 'const a = 2')
    .generate();
};
```


Our transformation logic needs to be defined in the function above, where we can use gogocode for AST transformation.