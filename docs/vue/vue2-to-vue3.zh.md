---
title: Vue2 到 Vue3 升级指南
order: 1
---
# 开始迁移
​
Vue3的到来为我们带来了许多惊喜的变化,但是由于Vue3对于Vue2在Api层面存在诸多兼容问题，并不能做到平滑升级。所以我们根据[v3迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)利用[gogocode](https://gogocode.io/)这个代码转换利器，利用它操作AST，开发了一套Vue2[升级工具](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-vue)。利用这套工具能够快速地把你的Vue2代码升级到Vue3。​

这套工具使用非常简单，只需要执行简单的命令就可以了。
 
## 安装工具
全局安装最新的 gogocode-cli
```bash
npm install gogocode-cli -g
``` 
## 迁移源文件

在终端（terminal）中跳转到需要升级的Vue项目路径。如果需要升级src路径下的vue代码，执行如下命令：​

注意：-s 后面是原文件的目录/文件名，-o 后面是输出的目录/文件名，如果两者相同，转换插件会覆盖你的代码，在此操作前请做好备份。
```bash
gogocode -s ./src -t gogocode-plugin-vue -o ./src-out
```
转换操作执行完毕后新的Vue3代码会被写入到src-out目录中。

## 依赖升级
除了升级源码，我们还需要升级 Vue3 相关依赖，这一点也可以自动完成，在终端（terminal）中跳转到需要升级的Vue项目路径，执行如下命令：
```bash
gogocode -s package.json -t gogocode-plugin-vue -o package.json
```
这条命令会帮你把 package.json 里面的 Vue/Vuex/Vue-router/Vue 编译工具 升级到适配 Vue3 的版本
```bash
npm install
```
即可完成Vue3相关依赖的安装​

注意：如果你是使用老版本的 vue-cli 生成的项目，需要自行升级 vue-cli 以确保 Vue3 项目能成功被构建，可参考：[vue-cli2的项目升级到vue-cli4做了哪些事情](https://blog.liuyunzhuge.com/2019/12/19/vue-cli2%E7%9A%84%E9%A1%B9%E7%9B%AE%E5%8D%87%E7%BA%A7%E5%88%B0vue-cli4%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85/)、[Migrating from v3](https://cli.vuejs.org/migrating-from-v3/#upgrade-all-plugins-at-once)
 
## 需要关注的地方
​
我们尽可能让工具自动化，但有些问题还是需要你注意一下。​
### 全局 App
​
由于 Vue3 全局对象变成 `createApp()`创建。转换工具将 `createApp()` 返回对象传递给 `window.$vueApp`。此时使用者需要将`window.$vueApp = Vue.createApp(App)` 代码块移动到调用 `window.$vueApp` 代码的最前面。避免`window.$vueApp` 为 `undefined` 的情况出现。![image.png](https://img.alicdn.com/imgextra/i4/O1CN01OmRYkc1QkulG5KuKO_!!6000000002015-2-tps-2344-1234.png)
### 依赖的 Vue2 组件库需自行升级
​
一些依赖于 Vue2 开发的组件库也推出了 Vue3 的版本，它们的 API 发生了一些变化，这需要你手动升级。

### 关于 Cannot read property 'parseComponent' of undefined 报错问题
报错的原因是 vue升级后 vue-template-compiler 中的 parseComponent 函数被删除了。

解决这个问题：

1. 需要确认 package.json 中的 vue-template-compiler 是否已经替换为 @vue/compiler-sfc，否则的话需要替换，然后重新安装依赖。

2. 如果还报这个错误，则需要检查下项目引用的第三方依赖是否还有 Vue2 的版本，如果有的话需要对应更新为支持 Vue3 的版本。

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01XCpDY81oddH7hV2vt_!!6000000005248-2-tps-2032-484.png)

### 做好检查和测试

另外，由于是静态的代码转换，可能你的代码里会有些我们没想到的写法导致转换出乱子，转换后请做好人工比对和测试！发现转换的问题可以[提交](https://github.com/thx/gogocode/issues)给我们。​
## 其他项目
其它项目升级请参考Vue官方[链接](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E5%85%B6%E4%BB%96%E9%A1%B9%E7%9B%AE) 

# 转换规则覆盖
| 规则 | 转换支持 | 文档 |
| --- | --- | --- |
| v-for 中的 Ref 数组 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/array-refs.html)  |
| 异步组件 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/async-components.html)  |
| attribute 强制行为 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/attribute-coercion.html)  |
| $attrs包含class&style | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html)  |
| $children | ✖️ | [链接](https://v3.cn.vuejs.org/guide/migration/children.html)  |
| 自定义指令 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/custom-directives.html)  |
| 自定义元素交互 | 无需转换 | [链接](https://v3.cn.vuejs.org/guide/migration/custom-elements-interop.html)  |
| Data 选项 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/data-option.html)  |
| emits选项 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/emits-option.html)  |
| 事件 API | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/events-api.html)  |
| 过滤器 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/filters.html)  |
| 片段 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/fragments.html)  |
| 函数式组件 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/functional-components.html)  |
| 全局 API | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/global-api.html)  |
| 全局 API Treeshaking | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html)  |
| 内联模板 Attribute | ✖️ | [链接](https://v3.cn.vuejs.org/guide/migration/inline-template-attribute.html)  |
| keyattribute | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/key-attribute.html)  |
| 按键修饰符 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/keycode-modifiers.html)  |
| 移除$listeners | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/listeners-removed.html)  |
| 挂载API变化 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/mount-changes.html)  |
| propsData | 开发中 | [链接](https://v3.cn.vuejs.org/guide/migration/props-data.html)  |
| 在 prop 的默认函数中访问this | 无需转换 | [链接](https://v3.cn.vuejs.org/guide/migration/props-default-this.html)  |
| 渲染函数 API | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/render-function-api.html)  |
| 插槽统一 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/slots-unification.html)  |
| Suspense | 无需转换 | [链接](https://v3.cn.vuejs.org/guide/migration/suspense.html)  |
| 过渡的 class 名更改 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/transition.html)  |
| Transition 作为 Root | 开发中 | [链接](https://v3.cn.vuejs.org/guide/migration/transition-as-root.html)  |
| Transition Group 根元素 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/transition-group.html)  |
| 移除v-on.native修饰符 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/v-on-native-modifier-removed.html)  |
| v-model | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/v-model.html)  |
| v-if 与 v-for 的优先级对比 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html)  |
| v-bind 合并行为 | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/v-bind.html)  |
| VNode 生命周期事件 | 开发中 | [链接](https://v3.cn.vuejs.org/guide/migration/vnode-lifecycle-events.html)  |
| Watch on Arrays | ✔ | [链接](https://v3.cn.vuejs.org/guide/migration/watch.html)  |
| vuex | ✔ | [链接](https://next.vuex.vuejs.org/zh/guide/migrating-to-4-0-from-3-x.html) |
| vue-router | ✔ | [链接](https://next.router.vuejs.org/zh/guide/migration/index.html) |

# 联系我们
如果你在使用过程中遇到其他问题可以通过如下方式联系我们：

github: [https://github.com/thx/gogocode/issues](https://github.com/thx/gogocode/issues)

钉钉群：34266233

gogocode 转换问题可以分享[https://play.gogocode.io/](https://play.gogocode.io/)相关链接给我们

# 相关文档
[vue-cli升级](https://v3.cn.vuejs.org/guide/migration/introduction.html#vue-cli)
