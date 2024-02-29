---
title: Element UI 到 Element Plus 升级指南
order: 2
---

## 升级 Vue3 的最后一块拼图

之前我们发布了基于代码转换工具 [GoGoCode](https://github.com/thx/gogocode) 的 Vue 转换插件（[阿里妈妈又做了新工具，帮你把 Vue2 代码改成 Vue3 的](https://juejin.cn/post/6977259197566517284)），它能够帮你把项目里的 Vue2 的代码升级成 Vue3 的，但我们也收到很多朋友的反馈：我用了基于 Vue2 的 ElementUI，它还没有支持 Vue3，我把我的业务代码升级上去也没法跑起来。

如今 ElementUI 的 Vue3 版本 Element Plus [已经正式发布了](https://juejin.cn/post/7061850934095609863)，它大部分兼容了 ElementUI 的 API，但也存在着一些 [breaking change](https://github.com/element-plus/element-plus/discussions/5657)，在两个团队的合作下，我们给大家带来 [gogocode-element-plugin](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-element)，它可以自动化地修改你的项目代码来适应所有的 breaking change，大大减少你的升级工作量。

最后一块拼图已经拼上！

## 一个大项目的升级实战

为了保证我们的转换规则能适配复杂场景，我们挑选了社区上火热的 Vue2 + ElementUI 项目 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，它覆盖了大多数 Vue2 和 Element 的用法，我们来试试通过转换插件把它转换成 Vue3 + Element Plus 的！

### 做好版本控制，使用一个新的分支

为了方便对比，我们接下来的命令会让转换工具覆写你原来的代码，建议你切换到一个新的分支操作，**如果你的代码没有被 git 托管，请不要输出在同一目录。**

```bash
git checkout -b to-vue3
```

### 安装 gogocode-cli

```bash
npm install gogocode-cli -g
```

### 格式化源代码，方便对比代码更改

因为代码经过工具的 AST 修改后可能会发生格式的变化，所以建议预先把所有的源码用 prettier 格式化一遍，再和转换后的作对比就一目了然了。

```bash
gogocode -s ./src -t gogocode-plugin-prettier  -o ./src
```

在提示是否覆盖源代码的时输入 y 回车即可

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/346a43979b714afe80297183e96c876d~tplv-k3u1fbpfcp-watermark.image?)

经过了 prettier 后，代码都被统一成了一样的格式：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd3c022a113f4bf7844d5b37f6cd1e31~tplv-k3u1fbpfcp-watermark.image?)

把这个修改提交到 git 上


### 使用工具把代码从 Vue2 转换成 Vue3

这次我们使用 gogocode-plugin-vue 插件把项目代码从 Vue2 升级到 Vue3：

```bash
gogocode -s ./src -t gogocode-plugin-vue  -o ./src
```

这个项目有 258 个文件，转换程序卖力工作中：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b7627042edd4141ae9aa4c56f497336~tplv-k3u1fbpfcp-watermark.image?)


转换完成！有 151 个文件发生了改动，这要是用手改头发可能就保不住了。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1edd92d9e22e4c0dbc5b6e3348cab8e7~tplv-k3u1fbpfcp-watermark.image?)

可以发现一些生命周期已经被转换了：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a6b602c4f744fbeaa9b05ac2e146f55~tplv-k3u1fbpfcp-watermark.image?)

slot 和 filter 语法也不在话下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1965c2d62f684f98b13e59f6b6088fa0~tplv-k3u1fbpfcp-watermark.image?)

函数式组件已经被改得面目全非了：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29c2bc18dd2e4b1bbf4af632fc6c09de~tplv-k3u1fbpfcp-watermark.image?)

挨个文件看一遍，如果没什么大问题就 commit 并进入下一步！

一些可能需要手动修改的地方可以参考这个：[需要关注的地方](https://gogocode.io/zh/docs/vue/vue2-to-vue3#%E9%9C%80%E8%A6%81%E5%85%B3%E6%B3%A8%E7%9A%84%E5%9C%B0%E6%96%B9)，不过建议你在最后能跑起来的时候再关心这些细节。


### 使用工具把代码从 ElementUI 转换成 Element Plus

我们使用 [gogocode-element-plugin](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-element) 插件把项目代码从 ElementUI 升级到 Element Plus：

```bash
gogocode -s ./src -t gogocode-plugin-element  -o ./src
```

这里是官方总结的：[Element Plus 不兼容变化](https://github.com/element-plus/element-plus/discussions/5657)，[gogocode-element-plugin](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-element) 插件覆盖了几乎所有的规则。


#### 插件自动帮你搞定的转换

- icon 从 class 模式转换成了组件模式，组件也被自动的导入

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97f76ca3f6324b5199c8d96ab8f3febf~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76ac78c454874381ae1c934821b7e281~tplv-k3u1fbpfcp-watermark.image?)

- 组件自动更名

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3946a0e47ffb4b5dba5219c8053fce14~tplv-k3u1fbpfcp-watermark.image?)

- 参数自动更名

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/209961af2faa4d74ba6111ec8bc2c7b2~tplv-k3u1fbpfcp-watermark.image?)

- 属性自动更名

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b05a2159d8c24dc58de032fb5a9c265b~tplv-k3u1fbpfcp-watermark.image?)

- 导入自动从 element-ui 变更到 element-plus

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93cc8299ee214f7b8b4d446d705be0c9~tplv-k3u1fbpfcp-watermark.image?)

#### 手动修改部分 

这些只需要一次性、单文件的改动手动去做即可~

#####  package.json

`element-ui` 换成 `element-plus`

如果使用了图标，别忘记 `@element-plus/icons` 也装上

##### css 引入

```js
import 'element-plus/theme-chalk/index.css'
```

### 升级依赖和构建

每个人的构建环境不同，你可以通过下面的命令帮你更新 package.json 里面的 vue 和 vue-cli 的版本号：

```bash
gogocode -s ./package.json -t gogocode-plugin-vue  -o ./package.json
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25672d590a4746e2ae16c77a9a2e94ee~tplv-k3u1fbpfcp-watermark.image?)

我这里遇到了 Webpack4 升级到 Webpack5 的一些问题，具体参考了 [vue-cli 升级文档](https://cli.vuejs.org/migrations/migrate-from-v4.html#e2e-nightwatch-plugin) 也都一一解决了。


### 跑起来试试，根据报错进一步修改

运行项目，看看有哪些报错一一修复之，一些是第三方组件带来的，一些是构建带来的，对于这样体量的项目我大概修改了 100 多行的样子：[commit](https://github.com/gogocodeio/vue-element-admin/commit/2f17bf01d2f020e0f1b9f0929cfb7acdc05fe97f)

然后就见到了我期待的画面：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c66858c289f4ec4b910176462e0c5c0~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05eb6eb23e154baaa4fc5e85a1011d51~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c6addce5ace4b62be1444075ac75c91~tplv-k3u1fbpfcp-watermark.image?)

## 希望能得到大家的反馈

希望 [GoGoCode](https://github.com/thx/gogocode) 和配套的代码转换工具能帮助大家少做一些千篇一律的工作，早点下班回家，如果你在使用中遇到什么问题，欢迎通过以下方式联系我们：

issues: [github.com/thx/gogocod…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fthx%2Fgogocode%2Fissues "https://github.com/thx/gogocode/issues")

钉钉群：34266233

最后：求 star 支持！

Github：[github.com/thx/gogocod…](https://github.com/thx/gogocode)（本项目在 packages/gogocode-plugin-element/ 目录下）

官网：[gogocode.io](https://gogocode.io)


