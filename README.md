[![Code transform has never been easier: GoGoCode](https://img.alicdn.com/imgextra/i1/O1CN01KMiK8i1uEL75yOSuc_!!6000000006005-2-tps-1949-552.png)](https://gogocode.io)

[![npm version](https://img.shields.io/npm/v/gogocode.svg)](https://www.npmjs.com/package/gogocode) [![license](https://img.shields.io/npm/l/gogocode.svg)](LICENSE) 

[>>>>>>>>>>>>>>>>>>>阿里妈妈前端招聘啦~ ](https://talent.taotian.com/off-campus/position-detail?lang=zh&positionId=1019223&track_id=SSP1691116011187KXRTJqqMmf1253)

## What is GoGoCode?

[中文 README](README-cn.md)

GoGoCode is a transformer for JavaScript/Typescript/HTML based on AST but providing an intuitive API:

-   A jQuery-like API to select and transform AST.
-   A Regex-like syntax to match and replace code.

Learn more at [GoGoCode.io](https://gogocode.io) and [GoGoCode: Yet Another Automated Refactor Tool for Web Developers](https://medium.com/@fengyuhere/gogocode-yet-another-automatic-refactor-tool-for-web-developers-df8a6a3560da)

## Intro

Let's show you how to select and modify code with our API

### In

```javascript
const a = 1;
const b = 2;
```

### Transform With GoGoCode

```javascript
const $ = require('gogocode');
const script = $(source);
// use $_$ as a wildcard to match AST element at any position you want
const aAssignment = script.find('const a = $_$');
// get matched AST element value
const aValue = aAssignment.match?.[0]?.[0]?.value;
// replace AST as same as replace a string
// but ignore code format (space、indent or linebreak)
script.replace('const b = $_$', `const b = ${aValue}`);
// generate ast to string
const outCode = script.generate();
```

### Out

```javascript
const a = 1;
const b = 1;
```

Try this demo out at our [Playground](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABAIbEC8xAjADoR6EkBGlxATPSADQgDuSAE4BrZOiwgAZjAZww+YnEGlCkoQFsAFJLAAbNAEkIa7mShhTSKHPwEAlMWD1ixRkWIASNqXMA6AOZIgXjozq62JARIMII4aGw6+kZqvlExcfRhbpE4gmDWbB6aabFodmEA9BXEMATxHgD6XqQEZMR8eig4pIIoikjE6qRwOAAWxACCAMoAKsRo+upoECTDZBAAnsRQSARgNhDEG9HtKnBZEWQTBHv+EEsrbAS5+XC+OhAomgDk2W1UjQ833Kh2IVWI-jQJDgo3iQxGsL60zmCzQDxIADdSLoYGgLkwyAA1bG47zXW73ZZveFjAD8vgA2gAGAC69OZbN8WJxeNB4MEaCgulIcUmszIrQIpCWEuIAqFIvi5CIeQg-mIzHgxDAdyE8Rh8RC8TUgnhxGKUEVgEAGSDoR5CYi6SBoZgC0jCEEuZ55ay+eXCuI-P6sAFNb6mAAGwcKwFIxJ5AF8I56wdVIRA0Mo4Er3HABirIP4wgK4DFDt7XgFlpnhmhNCCE1xeJBYHAADIqfwSOAbKBoCvWHggUYtAAKJbkmawSlxvDw6ktAoA8vBW9PBLiE0A).

## Related Project

| Project                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| [gogocode-plugin-vue]     | transform a project from vue2 to vue3             |
| [gogocode-plugin-element] | transform a project from ElementUI to ElementPlus |
| [gogocode-cli]            | command-line tool for gogocode                    |
| [gogocode-playground]     | test gogocode at browser instantly                |
| [gogocode-vscode]         | refactor your project with gogocode in vscode     |

[gogocode-plugin-vue]: https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-vue
[gogocode-plugin-element]: https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-element
[gogocode-cli]: https://github.com/thx/gogocode/tree/main/packages/gogocode-cli
[gogocode-playground]: https://play.gogocode.io
[gogocode-vscode]: https://marketplace.visualstudio.com/items?itemName=mmfe.vscode-gogocode

## Support

-   [issues](https://github.com/thx/gogocode/issues)
-   Ding Group：34266233
-   QQ Group：735216094

## License

[MIT](LICENSE)
