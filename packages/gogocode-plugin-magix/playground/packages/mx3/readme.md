# Magix
基于 `Magix` 套件的通用 BP 后台管理系统脚手架，整合多个周边平台，其中包含了
  - [Magix](http://thx.github.io/magix/)：单页应用底层框架
  - [Magix Gallery](https://mo.m.taobao.com/page_201912120119435)：基于 Magix 的组件系统
  - [Magix Cli](https://thx.github.io/magix-cli-book/#/)：Magix工程套件
  - [RAP](https://rap2.alibaba-inc.com/)：RAP 接口管理平台
  - [DEF](https://work.def.alibaba-inc.com/my)：DEF 前端发布平台
  - [Iconfont](https://www.iconfont.cn/)：字体图标管理平台
  - [ChartPark](https://chartpark.alibaba-inc.com/)：图表管理平台

# zs_scaffold
当前项目为Magix配套的脚手架，以简洁的示例集成现有业务场景解决方案
  - [RAP](https://rap2.alibaba-inc.com/repository/editor?id=1453)：RAP 接口管理仓库
  - [Iconfont](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.13&manage_type=myprojects&projectId=428788&keyword=&project_type=&page=)：字体图标仓库


## 开发流程
1. 安装 [mm-cli](https://thx.github.io/rmx-cli-book/) 命令行工具（已安装请忽略）：

```
  tnpm i -g @ali/mm-cli
```
2. 执行 `mm cd` 一键创建带时间戳的开发分支 (`mm cd` 是插件命令，首次需要安装)
3. 执行 `mm dev` 会启动本地开发服务器(接口对接 RAP 接口模拟)，并自动打开浏览器访问
  > `mm dev -d` 可以选择对接真实接口数据调试的环境，一般联调时使用


## css管理
全局样式写在 `assets` 目录下，然后修改 `package.json` ，把新增加的样式添加到 `scopedCss` 配置项中

其它样式写在模块当前目录下，在js里用 `Magix.applyStyle('@./index.less')` 调用

> 注意：品牌色等的项目级别的样式变量存放在 `gallery/mx-style/_group.less` 里，如果要改品牌色等等不要直接修改`_group.less`文件，修改 `assets/group_override.less` 即可

## 发布命令

`mm d` : 日常开发在开发分支下执行该命令即可打包并发布到预发环境

`mm p` : 在开发分支下执行该命令即可完成发布代码至生产环境，然后得到一个时间戳格式的版本号，如 `20171212.1645.444` 这种类型

## 跨项目渲染view

目前脚手架已经兼容跨项目渲染view功能，相关约定及说明，[点这里](https://thx.github.io/magix-cli-book/#/crossProjectView)

------
## Magix VSCode 插件

[安装地址](https://marketplace.visualstudio.com/items?itemName=mmfe.magix)






