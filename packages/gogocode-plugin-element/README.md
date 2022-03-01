# Element to Element Plus 升级插件

## 开始迁移

Element Plus 稳定版已经正式发布，在使用上与 Element 存在一定的差异。我们根据[Element Plus Breaking Changes](https://github.com/element-plus/element-plus/discussions/5658)利用[gogocode](https://gogocode.io/)这个代码转换利器，开发了[Element to Element Plus升级插件](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-element)。这个插件能够快速地把你的 Element 代码升级到 Element Plus。

首先需要确认的是，你的项目是否已经从 Vue2 升级为 Vue3，如果还没有，建议尝试使用[Vue2 to Vue3 升级插件](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-vue)来协助你

然后就可以开始进行 对 Element 引用的升级

## 安装工具

全局安装最新的 [gogocode-cli](https://www.npmjs.com/package/)

```bash
npm install gogocode-cli -g
``` 

## 一键升级 Element 的引用代码

执行如下命令：​

注意：-s 后面是原文件的目录/文件名，-o 后面是输出的目录/文件名，如果两者相同，转换插件会覆盖你的代码，在此操作前请做好备份。

```bash
gogocode -s ./src -t gogocode-plugin-element -o ./src-out
```

转换操作执行完毕后新的引用 Element Plus 的代码会被写入到 src-out 目录中。

另外，由于是静态的代码转换，可能你的代码里会有些我们没想到的写法导致转换出乱子，转换后请做好人工比对和测试！发现转换的问题可以[提交](https://github.com/thx/gogocode/issues)给我们。

# 联系我们
如果你在使用过程中遇到其他问题可以通过如下方式联系我们：

github: [https://github.com/thx/gogocode/issues](https://github.com/thx/gogocode/issues)

钉钉群：34266233

gogocode 转换问题可以分享[https://play.gogocode.io/](https://play.gogocode.io/)相关链接给我们

# 相关文档
[Element Plus Breaking Changes](https://github.com/element-plus/element-plus/discussions/5658)
