---
title: What can you do with GoGoCode?
order: 0
redirect_from:
  - /zh/docs/specification
---

GoGoCode is an AST-based JavaScript/Typescript/HTML code conversion tool that you can use to build a code conversion program to help you automate tasks such as framework upgrades, code refactoring, multi-platform conversions and more.

Currently GoGoCode supports parsing and manipulating the following types of code.
- JavaScript(JSX) 
- Typescript(TSX) 
- HTML 
- Vue 

## Advantages of GoGoCode

### Easy to use 

The GoGoCode project seeks to make the matter of code conversion simple, and GoGoCode offers a more intuitive API than its counterparts.

- A JQuery-like API for finding and processing ASTs
- A syntax close to regular expressions to match and replace code

With this API, we allow users to do AST lookups and changes just like string find and replace!

### Tried and tested 

In addition to simplicity of use, GoGoCode has helped upgrade the front-end framework for over 100,000 lines of projects within AliMama, and is contributing to the community with the [Vue2 to Vue3](/docs/vue/vue2-to-vue3) solution, making GoGoCode fully functional and muscular under the exercise of these complex scenarios.

### Peripheral completeness 

We have a complete plugin and CLI mechanism for building a large CodMod

There is a [gogocode playground](https://play.gogocode.io ) for users to visually and quickly write a conversion fragment

There is [gogocode-vscode](https://marketplace.visualstudio.com/items?itemName=mmfe.vscode-gogocode ) to help users to quickly convert the code of the current project in vscode

| project | description |
| --------------------- | ---------------------------------------------------------- |
| [gogocode-plugin-vue] | Convert vue2 syntax projects to vue3 with this gogocode plugin |
| [gogocode-cli] | gogocode's command line tools |
| [gogocode-playground] | You can try gogocode conversions in the browser |
| [gogocode-vscode] | Refactor your code with gogocode in vscode with this plugin |

[gogocode-plugin-vue]: https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-vue
[gogocode-cli]: https://github.com/thx/gogocode/tree/main/packages/gogocode-cli
[gogocode-playground]: https://play.gogocode.io
[gogocode-vscode]: https://marketplace.visualstudio.com/items?itemName=mmfe.vscode-gogocode


