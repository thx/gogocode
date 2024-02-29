---
title: Quick Start
order: 0
redirect_from:
  - /zh/docs/specification
---

## Install

```bash
npm install gogocode
```

## Quick Start

For the following code:

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

Build an AST instance：

```javascript
const $ = require('gogocode');
const AST = $(code);
```

**Replace all `a` variable names with `c` in one step**

```javascript
$(code).replace('a', 'c')
```


**Replace the variable name in `var a = 1` with `c` in two steps**

1. Take the variable declaration statement of variable a：

```javascript
$(code).find('var a = 1');
```

2. Relace the variable `a` with `c` and generate the whole code

```javascript
$(code)
  .find('var a = 1')
  .attr('declarations.0.id.name', 'c')
  .root()
  .generate();
```

以上直接操作 AST 的方式，有没有更简单的方法呢？
The above is a direct way to manipulate the AST. Is there a simpler way?
You can use the almighty `replace`!

```javascript
$(code).replace(`var a = 1`, `var c = 1`)
```

For more please refer to [Basic Tutorial](/zh/docs/specification/basic)
