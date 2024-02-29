---
title: 你可以用 GoGoCode 做什么？
order: 0
redirect_from:
  - /zh/docs/specification
---

GoGoCode 是一个基于 AST 的 JavaScript/Typescript/HTML 代码转换工具，你可以用它来构建一个代码转换程序来帮你自动化完成如框架升级、代码重构、多平台转换等工作。

当前 GoGoCode 支持解析和操作如下类型的代码：
-  JavaScript(JSX) 
-  Typescript(TSX) 
-  HTML 
-  Vue 

## GoGoCode 的优势

### 使用简单 

GoGoCode 项目追求让代码转换一事变得简单，相较于同类，GoGoCode 提供了更符合直觉的 API：

- 一套类 JQuery 的 API 用来查找和处理 AST
- 一套和正则表达式接近的语法用来匹配和替换代码

通过这样的 API，我们能让使用者像字符串查找替换一样去做 AST 的查询和变更！

### 历经考验 

除了使用上的简洁，在阿里妈妈内部，GoGoCode 帮助了十万行以上项目进行前端框架的升级，也在为社区贡献了 [Vue2 升级到 Vue3](/docs/vue/vue2-to-vue3) 的方案，在这些复杂场景的锻炼下，GoGoCode 变得功能齐全、肌肉健壮。

### 周边完备 

我们有完善的插件和 CLI 机制方便用户去构建一个大型的 CodMod

有 [gogocode playground](https://play.gogocode.io ) 方便用户可视化地快速编写一个转换片段

有 [gogocode-vscode](https://marketplace.visualstudio.com/items?itemName=mmfe.vscode-gogocode ) 帮助用户在 vscode 里快速对当前项目进行代码转换

| 项目                  | 描述                                                       |
| --------------------- | ---------------------------------------------------------- |
| [gogocode-plugin-vue] | 通过这个 gogocode 插件可以把 vue2 语法的项目转换成 vue3 的 |
| [gogocode-cli]        | gogocode 的命令行工具                                      |
| [gogocode-playground] | 可以在浏览器里尝试 gogocode 转换                           |
| [gogocode-vscode]     | 在 vscode 中通过此插件用 gogocode 重构你的代码             |

[gogocode-plugin-vue]: https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-vue
[gogocode-cli]: https://github.com/thx/gogocode/tree/main/packages/gogocode-cli
[gogocode-playground]: https://play.gogocode.io
[gogocode-vscode]: https://marketplace.visualstudio.com/items?itemName=mmfe.vscode-gogocode
