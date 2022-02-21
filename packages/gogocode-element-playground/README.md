# GoGoCode Vue Playground

## 简介

为了直观对比 Vue2 和 Vue3 代码编写差异，方便检视 GoGoCode 的迁移效果

使用 [qinakun](https://github.com/umijs/qiankun) 作为微前端方案

Ref：[Vue3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)

![](https://img.alicdn.com/imgextra/i3/O1CN01ABXJjm1fQxj473HRP_!!6000000004002-2-tps-2434-1058.png)

## 开发

### Node.js

请使用 Node 14 版本
### Host

请确保有以下 host：

`127.0.0.1 localhost`
### Yarn

为了多 repo 管理，借助了 yarn 的 workspace 能力，因此需要用 yarn 而不是 npm 管理

安装 Yarn：

`npm install -g yarn`

安装 Yrm：

`npm install -g yrm`

切换成淘宝源加速安装：

`yrm use taobao`

安装依赖：

`yarn`

### 启动

`yarn start`

对比地址：

[http://localhost:7099/](http://localhost:7099/)

Vue2地址：

[http://localhost:7102/](http://localhost:7102/)

Vue3地址：

[http://localhost:7103/](http://localhost:7103/)

### 代码

[Vue3 迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html) 中的 29 个组件文件已经提前为大家生成好了，填写具体文件就可以，文件名和迁移指南的地址后缀一致

Vue2 目录：

`packages/vue2/src/components`

Vue3 目录：

`packages/vue3/src/components`


### Vue VsCode 插件

为了方便你的开发，请下载 Vetur 插件


## Roadmap 预估

- 28

- [v-for 中的 Ref 数组 /array-refs](https://v3.cn.vuejs.org/guide/migration/index)  @池冰 100%

- [异步组件 /async-components](https://v3.cn.vuejs.org/guide/migration/index) @池冰 100%

- [attribute 强制行为 /attribute-coercion](https://v3.cn.vuejs.org/guide/migration/index) @池冰 暂时忽略

- [$attrs 包括 class & style /attrs-includes-class-style](https://v3.cn.vuejs.org/guide/migration/index) @池冰 100%

- [$children /children](https://v3.cn.vuejs.org/guide/migration/index) @池冰

- [自定义指令 /custom-directives](https://v3.cn.vuejs.org/guide/migration/index) @池冰 100%
 
- [自定义元素交互 /custom-elements-interop](https://v3.cn.vuejs.org/guide/migration/index) @池冰 暂时忽略

- [Data 选项 /data-option](https://v3.cn.vuejs.org/guide/migration/index) @池冰 100%

- [过滤器 /filters](https://v3.cn.vuejs.org/guide/migration/index) @池冰

- [函数式组件 /functional-components](https://v3.cn.vuejs.org/guide/migration/index) @池冰

- [emits Option /emits-option](https://v3.cn.vuejs.org/guide/migration/index) @灼日

- [事件 API /events-api](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [片段 /fragments](https://v3.cn.vuejs.org/guide/migration/index) @叶兮 100%

- [全局 API /global-api](https://v3.cn.vuejs.org/guide/migration/index) @池冰 100%

- [全局 API Treeshaking /global-api-treeshaking](https://v3.cn.vuejs.org/guide/migration/index) @池冰 100%

- [内联模板 Attribute /inline-template-attribute](https://v3.cn.vuejs.org/guide/migration/index) @池冰 暂时忽略

- [key attribute /key-attribute](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [按键修饰符 /keycode-modifiers](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [移除 $listeners /listeners-removed](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [在 prop 的默认函数中访问 this /props-default-this](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [渲染函数 API /render-function-api](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [插槽统一 /slots-unification](https://v3.cn.vuejs.org/guide/migration/index) @王萌
 
- [过渡的 class 名更改 /transition](https://v3.cn.vuejs.org/guide/migration/index) @王萌

- [Transition Group 根元素 /transition-group](https://v3.cn.vuejs.org/guide/migration/index) @灼日

- [移除 v-on.native 修饰符 /v-on-native-modifier-removed](https://v3.cn.vuejs.org/guide/migration/index) @灼日

- [v-model /v-model](https://v3.cn.vuejs.org/guide/migration/index) @灼日

- [v-if 与 v-for 的优先级对比 /v-if-v-for](https://v3.cn.vuejs.org/guide/migration/index) @灼日

- [v-bind 合并行为 /v-bind](https://v3.cn.vuejs.org/guide/migration/index) @灼日

- [Watch on Arrays /watch](https://v3.cn.vuejs.org/guide/migration/index) @灼日
