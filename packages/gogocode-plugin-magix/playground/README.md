# GoGoCode Element Playground

## 简介

为了直观对比 Element UI 和 Element Plus 代码编写差异，方便检视 GoGoCode 的迁移效果

使用 [qinakun](https://github.com/umijs/qiankun) 作为微前端方案

Ref：[Element 迁移指南](https://github.com/element-plus/element-plus/discussions/5658)

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

Vue2 Element 地址：

[http://localhost:7102/](http://localhost:7102/)

Vue3 Element Plus 地址：

[http://localhost:7103/](http://localhost:7103/)

### 代码

Element 目录：

`packages/vue2/src/components`

Element Plus 目录：

`packages/vue3/src/components`


### Vue VsCode 插件

为了方便你的开发，请下载 Vetur 插件
