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

[http://localhost:8099/](http://localhost:8099/)

Vue2地址：

[http://localhost:8102/](http://localhost:8102/)

Vue3地址：

[http://localhost:8103/](http://localhost:8103/)

### 代码


Vue2 目录：

`packages/vue2/src/components`

Vue3 目录：

`packages/vue3/src/components`


### Vue VsCode 插件

为了方便你的开发，请下载 Vetur 插件
