---
title: GoGoCode 插件开发
order: 8
---

### 介绍
gogocode支持插件化运行，通过[gogocode-cli](https://www.npmjs.com/package/gogocode-cli) 初始化一个插件项目，在项目中可以自定义插件逻辑。并且可由[gogocode-cli](https://www.npmjs.com/package/gogocode-cli)执行。
### 插件开发
#### 初始化一个插件
1、下载[gogocode-cli](https://www.npmjs.com/package/gogocode-cli)
```bash
npm install gogocode-cli -g
```
2、初始化gogocode插件项目
```bash
gogocode init
```
gogocode init 命令执行完毕，会在当前目录创建一个gogocode插件项目。
#### 插件项目结构
gogocode 插件项目是一个标准的npm项目。项目的主入口配置在package.json的main节点。
![image.png](https://img.alicdn.com/imgextra/i2/O1CN01QvYbud1VtgPvReVzV_!!6000000002711-2-tps-838-454.png)

上图截图我们可以看到，插件项目转换逻辑入口为transform.js，具体定义如下：


```javascript
/**
 * 转换入口导出一个函数，按照如下函数签名
 * @param {*} fileInfo 包含 source 和 path 属性。source为待转换文本，path为路径
 * @param {*} api 包含 gogocode 作为转换工具
 * @param {*} options 其他 option 由此传入
 * @returns {string} 返回转换后的代码
 */
module.exports = function(fileInfo, api, options) {
  const sourceCode = fileInfo.source;
  const $ = api.gogocode;
  return $(sourceCode)
    .replace('const a = $_$', 'const a = 2')
    .generate();
};
```


我们的转换逻辑需要定义在上面的函数中，在该函数中我们可以使用gogocode进行AST转换。
