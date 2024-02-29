---
title: 与打包工具结合使用
order: 6
---
# 引言
在本例中，我们将设计的一个简单的插件，将代码中的 var 经过打包全部改为 let，展示如何与 vite、webpack、babel、rollup 融合。
## 测试用例
```javascript
// input1.js
import increaser from './input2'
var num = 1
var str = 'foo'
var boo = false
var fn = () => {
    console.log(boo)
}
var b = window.localStorage.getItem(str)
var num2 = increaser(num)

fn()
console.log(num2, boo)
alert(b)

// input2.js
var increaser = function (x) {
    return x + 1
}
export default increaser
```

# babel
完整代码：[https://github.com/thx/gogocode/tree/main/example/demo-with-babel-plugin](https://github.com/thx/gogocode/tree/main/example/demo-with-babel-plugin)
## 安装依赖
```javascript
npm i babel-cli			// 依赖babel-cli运行babel插件
npm i gogocode			// 依赖gogocode完成代码转换
```
## 配置.babelrc
```javascript
{
  "plugins": [ "./plugin" ]			// plugin为你编写的插件的文件名
}
```
## 编写插件
babel插件通过 `visitor` 可以取到各种类型的 ast 节点。
我们在`visitor`中定义`Program(path) {}`，可以拿到完整代码对应的 ast，也就是`path.node`，使用`$()`实例化`path.node`，即可通过 gogocode 进行丰富的操作。
```javascript
const $ = require('gogocode')
module.exports = function () {
  return {
    name: "transform-var-to-let",
    visitor: {
      Program(path) {
        $(path.node).replace('var $_$1 = $_$2;', 'let $_$1 = $_$2;')
      }
    }
  };
};
```
## 命令行运行
当前目录下执行：
```javascript
npx babel --plugins ./plugin.js ./input1.js
```
附目录结构：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9005027567544ebc84d5f62286a82563~tplv-k3u1fbpfcp-zoom-1.image)
# webpack
完整代码：[https://github.com/thx/gogocode/tree/main/example/demo-with-webpack-plugin](https://github.com/thx/gogocode/tree/main/example/demo-with-webpack-plugin)
## 安装依赖
```bash
npm i webpack webpack-cli -D 	 // 安装 webpack 脚手架
npm i gogocode -D 		 // 安装 gogocode
```
## 编写插件
编写一个 var 转为 let 的插件，仅需要我们用到 webpack 插件中最基础的知识。
您只需要知道，webpack 的插件是一个类，在 webpack 的最初阶段，会初始化所有的插件并注册他们。在那之后，webpack 会在编译的不同的阶段，调用其钩子上注册的所有插件，以实现文件的代码转换和编译流程控制。


（参考下面的例子阅读效果更佳）

插件必须实现 `apply` 实例方法，供 webpack 在初始化阶段时调用，它接受一个 `compiler` 参数，该参数通过调用 `compiler.hooks.<hooksName>.<tapMethod>` 允许您访问编译阶段的钩子并进行挂载。挂载方式（tapMethod）分成 `tap` `tapAsync` `tapPromise` 等多种，通过它来告诉 webpack 使用同步 / 异步的方式访问这些钩子，这是由工具 [tapable](https://github.com/webpack/tapable) 提供的。在不同的钩子下会有不同的上下文供您调用，允许您对传入的数据做改动。


在本例中仅需让 `compiler` 调用 `emit` 钩子，并使用同步方式 `tap` 访问即可。
```javascript
// transform-var-to-let-plugin.js

const $ = require('gogocode')

const pluginName = 'TransformVarToLetPlugin'

class TransformVarToLetPlugin {
    apply (compiler) {
        compiler.hooks.emit.tap(pluginName, compilation => {
            Object.keys(compilation.assets).forEach(item => {
                // .source() 是获取构建产物的文本
                // .assets 中包含构建产物的文件名
                let content = compilation.assets[item].source()
                let ast = $(content).replace('var $_$1 = $_$2', 'let $_$1 = $_$2')
                content = ast.generate()
                // 更新构建产物对象
                compilation.assets[item] = {
                    source: () => content,
                    size: () => content.length,
                }
            })
        })
    }
}

module.exports = TransformVarToLetPlugin

```
## 配置 webpack.config.js
引入我们刚刚编写好的 transform-var-to-let-plugin，在 plugins 配置项中创建它的实例即可。为了更好的展示打包之后的效果，我们将 `mode` 设置为 `development`。

```javascript
const Plugin = require('./plugin')

const path = require('path')

module.exports = {
    mode: 'development',
    entry: './input1.js',
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new Plugin()
    ],
}
```
## 命令行运行
当前目录下执行，即可在 dist 文件夹中看到编译后的内容

```javascript
npx webpack
```
附目录结构：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f014009b4e684e3aa3d06b3f8a39f26c~tplv-k3u1fbpfcp-zoom-1.image)
# rollup
完整代码：[https://github.com/thx/gogocode/tree/main/example/demo-with-rollup-plugin](https://github.com/thx/gogocode/tree/main/example/demo-with-rollup-plugin)
## 安装依赖
```bash
npm i rollup -D 	// 安装 rollup
npm i gogocode -D       // 安装 gogocode
```
## 编写插件
与 webpack 不同的是，rollup 的 compiler 相对比较简单。rollup 的插件是一个函数，返回一个对象，对象中仅需实现 rollup 规定的生命周期钩子即可。
在本例中我们仅需实现 transform 函数，返回处理后的新代码：
```javascript
const $ = require('gogocode')

const transformVarToLetRollupPlugin = () => {
    return {
        name: 'transformVarToLetRollupPlugin',
        transform(code) {
            return {
                code: $(code).replace('var $_$1 = $_$2', 'let $_$1 = $_$2').generate()
            }
        },
    }
}
module.exports = transformVarToLetRollupPlugin
```
> rollup 的插件必须以 rollup-plugin- 前缀为开头。但本例的情形相对简单，故未如此做。

## 配置 rollup.config.js
```bash
const plugin = require('./plugin')

module.exports = {    
    input:'input1.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        plugin(),
    ],
}

```
## 命令行运行
当前目录下执行
```bash
npx rollup -c rollup.config.js
```
附目录结构：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52fac75bbecb4342ae9bb58b3b0c176e~tplv-k3u1fbpfcp-zoom-1.image)
# vite
完整代码：[https://github.com/thx/gogocode/tree/main/example/demo-with-vite-plugin](https://github.com/thx/gogocode/tree/main/example/demo-with-vite-plugin)
## 安装依赖
```bash
npm i vite -D				// 安装 vite
npm i gogocode -D		// 安装 gogocode
```
## 编写插件
vite 插件系统向后兼容 rollup 插件，仅比 rollup 多几个生命周期。因此我们直接复用之前写好的 rollup 插件。
> vite 的插件必须以 vite-plugin- 前缀为开头。以和 rollup-plugin 作区分。

## 配置 vite.config.js
vite 和 webpack 一样是开箱即用的，因此为了看清打包后的内容，我们针对性地更换掉一些配置。
```javascript
import { defineConfig } from 'vite'
import plugin from './plugin'

export default defineConfig({
    build: {
        minify: false,	// 关闭混淆
        rollupOptions: {
            input: './input1.js',	//改变 input 目录
        },
    },
    plugins: [plugin()]
})
```
## 命令行运行
```bash
npx vite build
```
附目录结构：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fead192ddcc45719c4ea5fabd13f719~tplv-k3u1fbpfcp-zoom-1.image)

---