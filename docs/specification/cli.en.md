---
title: GoGoCode CLI
order: 7
---

### 说明
[gogocode-cli](https://www.npmjs.com/package/gogocode-cli) 是一个用来初始化gogocode插件项目和执行gogocode转换插件的命令行工具
### 参数说明
| 参数 | 缩写 | 参数说明 |
| --- | --- | --- |
| init | init | 初始化一个插件sample项目 |
| --src | -s | 需要转换的源文件路径 |
| --transform=file or npm package | -t | 插件路径或者npm包名称，多个插件支持逗号分隔 |
| --out | -o | 输出文件路径 |
| --dry | -d | 转换文件不输出 |
| --info | -i | 打印转换中的文件信息 |
| --params | -p | 以key=value的形式将参数透传到plugin的options对象里面 |

### 使用
#### 安装 gogocode
```bash
npm install gogocode-cli -g
```
#### 初始化插件项目
```bash
gogocode init
```
插件开发指南可以看[这里](https://gogocode.io/zh/docs/specification/cli)
#### 运行插件（本地）
```bash
gogocode -s a.js -t t.js -o a-out.js
```
#### 运行插件（npm包）
```bash
gogocode -s a.js -t gogocode-plugin-sample -o a-out.js
```
其中 “gogocode-plugin-sample” 为一个gogocode插件的npm包名称，gogocode-cli会自动下载并执行该插件内的转换逻辑
#### 取消格式化代码
```bash
gogocode -s a.js -t t.js -o a-out.js -p format=false
```
#### 显示转换文件信息
```bash
gogocode -s a.js -t t.js -o a-out.js -i
```