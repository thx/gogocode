---
title: 快速开始
order: 0
redirect_from:
  - /zh/docs/specification
---

## Install

```bash
npm install gogocode
```

## 快速开始

对于下面的代码：

```javascript
const code = `
  const moment = require('moment');
  var a = 1;
  const b = 2;
  function log (x, y = 'World') {
    console.log('a')
    console.log(a, x, y);
  }
`;
```

创建一个 AST 实例：

```javascript
const $ = require('gogocode');
const AST = $(code);
```

**将所有的 `a` 变量名替换为 `c`，只需要一步**

```javascript
$(code).replace('a', 'c')
```


**把 `var a = 1` 里的变量名改为  `c`，只需要两步**

1. 取变量 a 的定义赋值语句：

```javascript
$(code).find('var a = 1');
```

2. 将 `a` 变量名替换为 `c`，并输出整体代码

```javascript
$(code)
  .find('var a = 1')
  .attr('declarations.0.id.name', 'c')
  .root()
  .generate();
```

这是直接操作 AST 的方式，有没有更简单的方法呢？你可以使用万能的`replace`

```javascript
$(code).replace(`var a = 1`, `var c = 1`)
```

更多请参考 [基础教程](/zh/docs/specification/basic)
