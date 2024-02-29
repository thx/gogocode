---
title: 基础教程
order: 1
---

## 一次代码转换的基本流程

![CodMod](https://img.alicdn.com/imgextra/i2/O1CN0189h5A61dXiON3ZhjR_!!6000000003746-2-tps-2800-664.png)

上图概述了一次代码转换的四个流程，我们接下来的教程也会按照这四步依次进行：

1. 把代码解析成抽象语法树（AST）
2. 找到我们要改动的代码
3. 把它修改成我们想要的样子
4. 把它再生成回字符串形式的代码

## 通过 GoGoCode 读取并解析代码

首先我们安装并引入 GoGoCode

```
npm install gogocode --save
```

```js
import $ from 'gogocode';
// or for commonjs
const $ = require('gogocode');
```

我们借用 jQuery 的 $ 命名让代码写起来更简单！

使用 GoGoCode 解析不同类型的代码：

```js
// source 为待解析代码的字符串

// 解析 JavaScript/TypScript 文件
const ast = $(source);

// 解析 html 文件需要在传入的 parseOptions 中指定 language
const ast = $(source, { parseOptions: { language: 'html' } });

// 解析 Vue 文件
const ast = $(source, { parseOptions: { language: 'vue' } });
```

> Tips：本教程中的代码片段你可以在 [GoGoCode PlayGround](https://play.gogocode.io) 中立刻尝试一下！

![playground](https://img.alicdn.com/imgextra/i4/O1CN01olgSUR22vPH6OJwJk_!!6000000007182-2-tps-1992-1012.png)

如图所示的下拉框中可以切换代码类型，右侧会提供对应的样板代码。

## 通过代码选择器选择代码

在把代码从字符串解析成 AST 后，我们进入第二步，从一整段代码中精确查找到我们要修改的 AST 节点。

### ast.find 代码选择器

与其它代码转换工具通过 AST 类型去匹配语法树节点不同，GoGoCode 提供了更直观的「用代码找代码」的方式，和 jQuery 查找 DOM 一样，你只需要编写一段代码片段作为「代码选择器」，GoGoCode 就能智能地帮你匹配到源码中和它吻合的片段。

假设你想在下面代码中挑选出名为 log 的函数：

```js
function log(a) {
  console.log(a);
}

function alert(a) {
  alert(a);
}
```

只需要按照如下方式使用 **find** 方法即可：

```js
const ast = $(source);
const test1 = ast.find('function log() {}');
```

GoGoCode 会根据 `function log() {}` 自动去帮你匹配名为 `log` 的 `function` 节点，返回能满足匹配条件的子节点。

#### 用 generate 把节点输出成代码字符串 

只要对找到 AST 节点调用 `.generate`，就可以得到这个节点对应的代码字符串。

```js
const ast = $(source);
const test1 = ast.find('function log() {}');

const code = test1.generate()
// code 是如下字符串：
// function log(a) {
//   console.log(a);
// }
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3Z5CxUmXr8ATnAbM2HBWmWrxIADQgA7kkUBrZOiy58REuTiL6EbjhMBbWjjD8AkhFd68lBggUhQss5q7GScPHBkACRkALxBYALUNEhc6NGxzvG8MIoEaClkXr7+SAJFJWh5XAXy3PGpCbR1pYyNcWRwaK0AjOX0rQJeECi0AOTStnLCtGpiMz0cimhwxfaDcEMZaBBa9APL4uz64NDwADJO1FZwAJ5QgwSKYOFXABZjAAqbODELRYBwwNAGbgwABGADUwGhDAAVV4YbAONAYMRAA)

#### \$\_\$ 通配符

假设你想在下面代码中挑选出对于变量`a`的声明和初始化语句：

```js
const a = 123;
```

按照之前介绍的，我们只要像下面这么写就可以了：

```js
const aDef = ast.find('const a = 123');
```

但这只能匹配到 `const a = 123`，对于 `const a = 456` 就无能为力了，在实际的代码匹配中，我们往往不确定代码的全貌，这时候 GoGoCode 支持使用通配符来做模糊匹配：

```js
const aDef = ast.find('const a = $_$0');
```

用 `$_$0` 替代原来的 `123` 能帮你匹配到对 `const a` 做初始化的所有语句：

```js
// 以下每一种都能被匹配到
const a = 123;
const a = b;
const a = () => 1;
// ……
```

`$_$0` 位置的节点可以通过查询结果的 `match` 属性获取：

```js
const aDef = ast.find('const a = $_$');
const match = aDef.match;
```

如下图所示， `match` 是一个字典结构，`$_$` 后面的数字即为 `match` 的索引，通过 `match[0]` 就能取出 `$_$0` 位置匹配到的 AST 集合。

这个集合只有一个元素，对应着 `const a = 123` 中的 `123`，你可以通过`node`拿到它对应的原始 AST 节点，也可以通过 `value` 直接拿到这个节点在代码中的片段。

![match结构](https://img.alicdn.com/imgextra/i4/O1CN01yPrWjC25tytEoAb80_!!6000000007585-2-tps-756-562.png)

> Tip: 多使用 debugger 查看一下中间结果是编写代码转换的不二法门

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABAIbEC8xAjAEwDMA3ADoQD0bxe6xARmgBskAdy6kIZAQSR80xAGZIYEFHwCexACQB9TQAZWHLviJlKfFu055CJclQAUASkoA+GoxAAaEMKQAnAGtkdCwQeWUcODB8Yjh-cQJFfwBbB3kwATQASQhFLzIoMAKkKGiTF2BWYmNbLXNSIoA6AHMkNu40atrTaRh-HDkqDKzcxSa+ga6JHrtTKk0HScGnbptTUgARNHkGoiaMlQcAcnW7cx19Y9WZs+IU0jgcAAsG7fkmh6fn7qN0XhgLRaaH83X8aDg-QkXxeAG09ABdeEIpoAN1IAhg0wAvqxvOBoPAADLiFphOBqKBoAg4fxgMr456kAgABXBcGiIKw8gxBDQPgIMF4ADUwGhhAAVSkYbDxNAYbFAA)

#### 集合操作

回过头来看这个例子：

```js
function log(a) {
  console.log(a);
}

function alert(a) {
  alert(a);
}
```

如果使用通配符，我们能匹配到所有名字的函数定义，所以 `.find` 查询的结果可能是一个集合

```js
// fns 是一个结果集，包含了所有名称的函数定义
const fns = ast.find(`function $_$0() {}`);
```

这个结果集合 `fns` 拥有和 `ast` 为同一类型，拥有完全相同的成员方法，如果集合里有多个元素，对其直接使用方法，将只对第一个 AST 节点生效。

我们提供 each 方法来遍历这个结果集合，下面的例子把 match 到的函数名收集到了名为 `names` 的数组里：

```js
const fns = ast.find(`function $_$0() {}`);
const names = [];
fns.each((fnNode) => {
  const fnName = fnNode.match[0][0].value;
  names.push(fnName);
});
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3Z5CxUmXr8ATnAbM2HBWmWrxIADQgA7kkUBrZOiy58REuTiL6EbjhMBbWjjD8AkhFd68lBggUhQss5q7GScPHBkACRkALxBYALUNEhc6NGxzvG8MIoEaClkXr7+SAJFJWh5XAXy3PGpCbR1pYyNcRXO5fStAl4QKLQABtK2cgkA+gkADLRqYhM9HE2tZBD0bmjc5QDaALp5OM4CaPQEABa0nhAAcqhozMkAfCx5MVvxF089mVUgDXgI3PQ4HcjosTjCTgIAG4KGANDgxXb7bgCWDce4AoEbGJiIlkRRoODFciYg4CABWSEgtAA5HpmRsJBB9OBoPAADJOahWOAATygBwIijA4W5tyGAAVyXBiFosDgFNw0AZuDAAEYANTAaEMABUxRhsA40BgxEA)



#### 使用多个通配符

有时我们不止需要一个通配符，你可以在代码选择器中书写 `$_$0`、`$_$1`、`$_$2`、`$_$3`……达到你的目的。

比如你想匹配下面函数的两个参数：

```js
sum(a, b);
```

```js
const sumFn = ast.find('sum($_$0, $_$1)');
const match = sumFn.match;
console.log(`${match[0][0].value},${match[1][0].value}`); // a,b
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDOMC2AFAIYA0ABAEYCUIpIA7kgE4DWy6WIAZjBAMZwwSCOTjNiEHNxZFuYADZoAkhBkViUMBSRQhInNXLAAOqPL8DccgBJyAXnKawAOgDmSD5fRnyFq+Q4SDDM-GgO5PJKqjIuQSFhvv5S1sQ41o42hPGhaNRJlimBBABioo5pcC7yECiEAOR4RDYA+jYADBStNgCM1PX55oXp5PjEcPwAFhFNZS5jE5NJzGhwIaIABjbAC1MA2u0AugeHLgBuxAowaAC+pNu7k3s9x0fnl9c3G2Y3ZnTg0HgABlJG4uHAAJ5QNA4fjMMB6f6TNIABRWcCEaGYWG4lxwaHoeEoADUwGgGAAVKEYbDiNAYG5AA)

#### 匹配多个同类节点

前面我们学习了使用 `$_$` 通配符来做模糊的查询，假设有下面的代码：

```js
console.log(a);

console.log(a, b);

console.log(a, b, c);
```

它们的参数列表长度不一致，我们分别用以下几种选择选择器进行查找结果会如何呢？

```js
ast.find(`console.log()`);
ast.find(`console.log($_$0)`);
// 上面两条语句会找到全部三行代码

ast.find(`console.log($_$0, $_$1)`);
// 这条语句会找到前两行代码

ast.find(`console.log($_$0, $_$1, $_$2)`);
// 这条语句只会找到第三行代码
```

可以看出 GoGoCode 的通配符匹配的原则：写得越多，查询限制越大。

如果你想匹配任意数量的同类型节点，GoGoCode 提供了 `$$$` 形式的通配符，对于上面不定参数的语句，你可以统一使用 `ast.find('console.log($$$0)')` 来匹配。

比起 `ast.find('console.log()')` ，使用 `$$$` 可以通过 match 属性捕获占位符里的所有同类节点。例如用它去匹配 `console.log(a, b, c)`：

```js
const res = ast.find('console.log($$$0)');
const params = res.match['$$$0'];
const paramNames = params.map((p) => p.name);
// paramNames: ['a', 'b', 'c']
```

和之前一样，我们可以从 `match` 里面拿到通配符 `$$$0` 匹配到的节点数组 `params`，这个数组里的元素分别对应了 `a`、`b`、`c` 的 AST 节点：

![match](https://img.alicdn.com/imgextra/i3/O1CN01zbO62T1ZdQsYRGT5l_!!6000000003217-2-tps-734-536.png)

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOSANmgHTFIDmAFAIYA0ABAEbM4CUIDIA7kgCcA1snRYQAMxgQccMPiZwBdQhMEBbGhLCkAkhDXM6UMMyRQ5+AhybAAOhCZM8hOEwAkTALxNjYMlTUSHjoDk4uBG5EMAI4aN5M2noGSGTRsWhhzlZudJEJ7jTpcRxZEW4CaAQJeXBk2hAoNADkESTklLTu3QAMHM2ljtmuTFB0yurVPpUEZOp0cDgAFgDazd3uPc0AulmVcDGOYxOz81A0UN4AfKNkEHTqaIMAvg7c4NDwADIqVOJwAE8oFUcAIwBZ3ks8gAFfZyNACLBKGBoHgEGAsABqYDQvAAKkCMNglGgMM8gA)

除了匹配不定长的参数，`$$$` 还有很多能发挥作用的地方:

匹配名为 dict 字典的所有 key 和 value 并打印

```js
const dict = {
  a: 1,
  b: 2,
  c: 'f',
};
```

```js
const res = ast.find('const dict = { $$$0 }');
const kvs = res.match['$$$0'];
kvs.map((kv) => `${kv.key.name}:${kv.value.value}`);
// a:1,b:2,c:f
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABCmDiQLzHAA6ExxAhpsQIwA09jARqwExcGxHKwDkAMzFCAviA4gA7kgBOAa2TosICTAgUw+YnBVNCE1QFsAFBLAAbNAEkIFjsyhh3SKHEOEAShpuEXwiYgASYmomTwA6AHMkJLx0ELxCEgIkGBUcNGjiO0cXCzjs3Pz0sJImcOoI6wq8tADqzOIVNAJCurg4uwgUazEM8LIKQuBIiIiABmIZMTbhMZI1ADce6i6COMsmOBwACwBtMVn5sQBdEK64XIZNvYOoa03ogD5iAAMI4E2cTUaAAnnEIExLGgZJh-oCNkx7DA0HEEUjoT8VvQZPR5OBoPAADJmBLaOAgqDdHAqMC+PHHOoABXufjQKiwEkRBDQCgIMB4ADUwGhFAAVCkYbAmNAYGRAA)

### ast.has 判断代码是否存在

我们通过 `.has` 可以判断某段代码是否存在于源码中，例如：

```js
if (ast.has(`import $_$0 from 'react'`)) {
  console.log('has React!');
}
```

可以判断这段代码是否导入了 React 包，其实它等价于：

```js
if (ast.find(`import $_$0 from 'react'`).length) {
  console.log('has React!');
}
```

也就是判断是否有查找到至少一个匹配的语句。

## 替换代码

通过上面的教程，相信你已经了解到如何根据代码选择器和通配符找到代码里的特定语句了，接下来我们进入到第三步，把找到的语句改成我们想要的样子。

### 万能的 replace

日常我们在编辑器中批量修改代码的时候也会经常使用到「查找\替换」的功能去做一些基本操作，但它们都基于字符串或正则表达式，对于不同的缩进、换行乃至加不加分号都无法兼容，而利用 GoGoCode 的代码选择器特性配合 `replace` 方法，可以让你以接近字符串替换的形式完成 AST 级别的代码替换操作。

#### 函数更名

回想我们的第一个例子：

```js
function log(a) {
  console.log(a);
}

function alert(a) {
  alert(a);
}
```

如果我们想给 `log` 函数改名成 `record`，用 `replace` 做非常简单：

```js
ast.replace('function log($$$0) { $$$1 }', 'function record($$$0) { $$$1 }');
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3Z5CxUmXr8ATnAbM2HBWmWrxIADQgA7kkUBrZOiy58REuTiL6EbjhMBbWjjD8AkhFd68lBggUhQss5q7GScPHBkACRkALxBYALUNEhc6NGxzvG8MIoEaClkXr7+SAJFJWh5XAXy3PGpCbR1pYx5efStAopoUBT0pbQA5NK2csK0CQsADGqJCwCMZGITelM2EWRDXIoo80srCwkbWz0QeUNwxeT9cBloEFr0cGi0N+Ls+uBoPAADJOahWOAATygaG4BEUYHCAIAFv0AAr3YhaLA4BTcNAGbgwABGADUwGhDAAVaEYbAONAYMRAA)

`replace` 接受两个参数，第一个参数是代码选择器，第二个参数是我们要替换成的样子，我们使用了 `$$$0` 来匹配参数列表，`$$$1` 来匹配函数体内的语句，在第二参里把他们放回原有的位置，就可以保证唯一有变动的是函数的名字。

#### 枚举列表属性更名

我们经常使用这样的枚举列表：

```javascript
const list = [
  {
    text: 'A策略',
    value: 1,
    tips: 'Atip',
  },
  {
    text: 'B策略',
    value: 2,
    tips: 'Btip',
  },
  {
    text: 'C策略',
    value: 3,
    tips: 'Ctip',
  },
];
```

有一天为了统一代码里的各种枚举，我们需要把 text 属性更名为 name，把 value 属性更名为 id，这个用正则很难精确匹配容易误伤，用 GoGoCode 只需要这么替换一下就行了：

```javascript
ast.replace(
  '{ text: $_$1, value: $_$2, $$$0 }',
  '{ name: $_$1, id: $_$2, $$$0 }',
);
```

其中 `$_$1` 和 `$_$2` 匹配了名称的 `value` 节点，`$$$` 则可以匹配剩下的节点，有点像 es6 里的 `...` ，这段代码匹配出了 `text` 和 `value` 这对应的值填给了 `name` 和 `id`，剩下的原封不动放回去。

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABADZhHEC8xA2gDoTHHCPPNxoAecmx9IAIKA1b0CmrgIA0bdgDcAhqRho+ARilN2cMFAJ8BgrVEnSAvuuasNHbr34gAQmONXi8xcuIAmc5u2679obOzGbSluzEnDx6IAhOID7Mbkp8AMyJkX4xCEEJpuoAugDcCSAA7kgATgDWyOhYIABmMBA4WviRlXKEjVUAtgAUjWCkaACSEL0SxHJQYNNIUO2EAJQs0niEJAAk1DNzAHQA5kgneOgb+JQESDCVOGh7w6MTvQc3dw+XWzOUNNsDD73NArRjSOREA6VNBQUhyB4DaQAcmAkRsfG2AH1tmpXAoUsQsdtvITttsAAzEExInwo4gQOR9DxE3FgFAY7EkskUqlI6SgiDSaFwO5MCFwY5oCBoLqcAYCkyMUqQWBwAAy3SODTgAE8oGgCDhKto4KUABYQgAKwq0MqwjQUBDQEhABBgACMAGpgNBlAAqeow2Dg0IwJiAA)

#### JSX 标签属性替换

再举一个更为复杂些的例子，对一份代码做这样的修改：

- 从 @alifd/next 导入改成 antd
- 转译前 改成 转译后
- Button 中 type 参数转换：normal -> default，medium -> middle
- Button 中有 text 参数的改成 type="link"
- Button 中 warning 参数的改成 danger

```jsx
import * as React from 'react';
import * as styles from './index.module.scss';
import { Button } from '@alifd/next';

const Btn = () => {
  return (
    <div>
      <h2>转译前</h2>
      <div>
        <Button type="normal">Normal</Button>
        <Button type="primary">Prirmary</Button>
        <Button type="secondary">Secondary</Button>

        <Button type="normal" text>
          Normal
        </Button>
        <Button type="primary" text>
          Primary
        </Button>
        <Button type="secondary" text>
          Secondary
        </Button>

        <Button type="normal" warning>
          Normal
        </Button>
      </div>
    </div>
  );
};

export default Btn;
```

```typescript
ast
  .replace(`import { $$$0 } from "@alifd/next"`, `import { $$$0 } from "antd"`)
  .replace(`<h2>转译前</h2>`, `<h2>转译后</h2>`)
  .replace(
    `<Button type="normal" $$$0></Button>`,
    `<Button type="default" $$$0></Button>`,
  )
  .replace(
    `<Button size="medium" $$$0></Button>`,
    `<Button size="middle" $$$0></Button>`,
  )
  .replace(`<Button text $$$0></Button>`, `<Button type="link" $$$0></Button>`)
  .replace(`<Button warning $$$0></Button>`, `<Button danger $$$0></Button>`);
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBc4C2UkBOcABAFTECGAzsQEpoUDGJAZgUjsQOQEPNcBuADoQweQiXLViVOAE8ANmhpsO3AHQB6SOgAe6nKhhL1VRlSqCRY-EWLBiAIXhwkEYgF9iqzkJAABCgUwFhRNCDRdOD9hCBFGN1knOHcAXmIACgBKYlSAPnsRYmJeOBgCdwyi4uIAHhQwADc86pq6gAsAJjzAG3jARejAWSVazS6W9za6hubWidrnOFd3eSg0VL8IQhwgvzyAOU2g4fnFsYmauZc3YmXVvygCMQoCOR2ABQeCLeejy4hTs7qxyuNzWICoaASEBQTxeIDyAGUIW5od9NEC-jM2pjzujrnIVqCNp9tiBrpE4HsDgofgs3P8zhdaUt8bcQPdHs8-GSonl3hy5DSTtjiozFniCX5wZCUbDuRTEdKYYK6cLiKrRcCWYSqVyAO5PUQQADmlOJ1LRv3p500Uytw1t1SysQ8sREkVsJHQLAoxhIjhSAhAABoQLrCABrZDoLAgFgwCDMMDAggUCBUFibDIsMBKACSEAzQcoUDARaQUDgSbTOWA1UhSQAJLli2B1EakO2Eug64kSFQkOVGGhm9m8wWkKYBwQhz20yRqCR0g2Mv3B2gsiJqguZupeFAFEw0FVxm0AAY2CT2YgNm8ABk83nYvgCQRCYQiUT8p6D2PP4jsDg3g295eD4aogKmcAoF+MwbiexC7mg+6Hhkp61KM-RDCM3TfsQaEYX0gBwKsMoynnBbSIchQ7HmcaG4iC6w6qSQG3nkyp-N+v4asyEogF6PoKNEzF3mxFpMnkp6wTue4HtRXG4lQYAAF6sjgaANDAOBcixonohJP7wcUdG-DIymqWAKAoEo2kiexElSfBlGyUe8kmXA5LXrZYknJxhl4dx4qssEEDhjZwG6ZaknweRNROShrlMsQ+oVJARqeeFdm+bRAXQsaaAEOlrGZQ51SlOU7gLm2aARCm7nZCIHgiMG4DQPAAAyqZGjGNxmA8FbNe01DvGgCxgPlWDego4IhlQMAAEYAGpjbqAAqLIxgkeBPBgHhAA)

#### 用函数进行更复杂的替换

如果在替换中需要更大的自由度，也可以给第二参传入和一个函数，它将接收到 `match` 字典作为参数，并返回一段新的代码用来替换匹配到的代码。

假如我们有如下的常量定义：

```js
const stock_code_a = 'BABA';
const stock_code_b = 'JD';
const stock_code_c = 'TME';
```

想把它们的变量名批量改成大写的字符串：

```js
ast.replace(`const $_$0 = $_$1`, (match, node) => {
  const name = match[0][0].value;
  const value = match[1][0].raw;
  return `const ${name.toUpperCase()} = ${value}`;
});
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABEUjgNYD6e6VAhsQLzEDkAQgIJesA6EeQiTKUaqNFQBGzNgCkAInwH4ipOOWq0JOGawAqAWQCirEABoQAdyQAnCsnRYQAMxgC4YfMTg36hZ7YAtgAUzmAANmgAkhABZsT0UGDxSFAeKgCUxMD8xMSCqgAkMolgAHQA5khVWrn5KsJIMDY4aDJhkTEBZQRNLWh1BST0qiyFwb3NrRn8dSNwZTZoUOH0rcEABkPEhVSFAAwyu4UAjBvxwYH0cDgAFvEQ4llMAHzZdXnbEPSBbSxXN1uAG19gBdEGgsoAN3o4RgAwgeU+DWIMLhf2IALuQJO4LBi3olg+xCWcGaiK2KMKwG+vzK6gAqlAoGgbAgRmhghkAL5HYBo+HcjZ1bkzCB1UnkhJESpoCCs66csXc-jmcDQeAAGT8FSccAAniyCDgbGA0mrbiMAAqkjysrDOWEENAWAgwSQANTAaEsekNGGweECUHoSxA3KAA)

### replaceBy

除了使用 `.replace` 替换代码，你也可以在 `.find` 查找到对应语句后直接通过 `.replaceBy` 把这条语句替换掉，例如我们想把下面 `log` 函数内的 `console.log(a)` 改写成 `alert(a)` 而不误伤下面的语句：

```js
function log(a) {
  console.log(a);
}

console.log(a);
```

可以先通过 `.find` 链式查找到函数体内的 `console.log(a)` 再通过 `.replaceBy` 替换掉

```js
const console = ast.find('function log($_$0) {}').find('console.log($_$0)');

console.replaceBy('alert(a)');
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3ZcIvfkJoNGIADQgA7kgBOAa2TosufERLk4m+jJxaAtrRxh+ASQhXlZelDBukUYj2ZsHNLccGQAJGQAvO6eAtQ0SFzo7GScPKG8MJoEaFFk9k4uSAKZ2WgpaTKh9CF5YbSlOYySQemVsrnRNXAVqQL2ECi0AOR4hH7kwrRhAPphAAwBYsPNHH0DQ8PBfIJTswuMKy2p23KaaFAU9DkAQgCeI-T8mnCKRxAV53BZ5N1xaBA0OY4GhaKsJBAVOBoPAADIWagGOB3KBobgETRgXxQgAWNQACl9iECsDgntw0KpuDAAEYANTAaDUABUURhsFxrFB6OcQGIgA)

## 插入代码

学习到这里，我们可以来尝试着解决一个复杂一点的代码转换问题了！

下面这是一段 React 文档的代码：

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

文档告诉我们对于 `React` 事件的回调函数需要在 `constructor` 里特殊绑定 `this`，我们接下来把绑定语句`this.handleClick = this.handleClick.bind(this);`删掉，考虑编写一段转换逻辑，利用 GoGoCode 自动识别 JSX 中 `onClick` 的回调函数并在 `constructor` 里帮我们把这个绑定语句补上。

### 巧用 replace 插入代码

万能的 `.replace` 并不只能做单纯的替换，合理利用 `$$$` 捕获和填充原有的内容，在后面补上你想插入的语句即可实现插入代码的操作，下面是详细的操作步骤：

```js
const ast = $(source);

// 找到 reactClass 定义的语句
const reactClass = ast.find('class $_$0 extends React.Component {}');

// 找到 jsx 里面带有 onClick 属性的标签
const onClick = reactClass.find('<$_$0 onClick={$_$1}></$_$0>');

// 创建一个数组用来收集 onClick 对应的 hanlder 的名称
const clickFnNames = [];

// 有可能找到很多个带有 onClick 的标签，我们这里用 each 去处理每一条
onClick.each((e) => {
  // 用 match[1][0] 来找到 $_$1 匹配到的第一个 onClick 属性对应的 handler 节点
  // 取 value 即为节点名
  // handlerName = 'this.handleClick'
  const handlerName = e.match[1][0].value;
  clickFnNames.push(handlerName);
});

// 替换原有的 constructor，但利用 $$$ 保留原有的参数和语句，只是在最后补上 bind 语句即可
reactClass.replace(
  'constructor($$$0) { $$$1 }',
  `constructor($$$0) { 
    $$$1;
    ${clickFnNames.map((name) => `${name} = ${name}.bind(this)`).join(';')}
  }`,
);
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZm8RNEnw9yREBhBEEaEjpAA2gBdQPyYO3TI5LV1AvhkgxyAoeMnVMZm4QD4PYCzgCMX2xs-TLUrvYH9z4oecmk0-taytMWKxpFeKDoymbra1kOefBv6UH2Uhx1r19St6sD7WgwfCCF4ODOB2K5dh26Zdnw9QEHgUTfh+jaAe4sBEEeb4AS2-oklWjgjmGhDjnUUCEFaRzbAmbqqOoWjqkx6b5MmTErgkkLkscAAGtb0VcjHMaxPxseqK5LF0ybAPWORoXhRCiXIIFSseEB4UYPhtDx6rAOprbRFqun6TEfBnJOmjPAYPFVlJph8AAVkgkDxnYlbol00Q8Y4hGrGU+yyNGVCsFY1R5DI6IUuA0DwAAMqkVCMnAACelhEDgyhgFAcBRSkRAAAq7PKVhYJEaCUuYZwAGpgGgVLkKlGDYAowgEHUIDREAA)

### 用 append, prepend 给函数添两行

你也可以用 `.append` 方法实现插入代码，`.append` 支持两个参数

第一个参数是你要插入的位置，你可以填写 `'params'` 或者 `'body'`，分别对应着插入一个新的函数参数和插入到大括号包裹着的区块内。

我们用 `.append` 实现刚才同样的功能：

```js
const ast = $(source);

// 找到 reactClass 定义的语句
const reactClass = ast.find('class $_$0 extends React.Component {}');

// 找到 jsx 里面带有 onClick 属性的标签
const onClick = reactClass.find('<$_$0 onClick={$_$1}></$_$0>');

// 创建一个数组用来收集 onClick 对应的 hanlder 的名称
const clickFnNames = [];

// 有可能找到很多个带有 onClick 的标签，我们这里用 each 去处理每一条
onClick.each((e) => {
  // 用 match[1][0] 来找到 $_$1 匹配到的第一个 onClick 属性对应的 handler 节点
  // 取 value 即为节点名
  // handlerName = 'this.handleClick'
  const handlerName = e.match[1][0].value;
  clickFnNames.push(handlerName);
});

/** 以上代码与之前相同 **/

// 找到 constructor 方法
const constructorMethod = ast.find('constructor() {}');

// 给它的函数体内添加 bind 语句
constructorMethod.append(
  'body',
  `
    ${clickFnNames.map((name) => `${name} = ${name}.bind(this)`).join(';')}
  `,
);
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZm8RNEnw9yREBhBEEaEjpAA2gBdQPyYO3TI5LV1AvhkgxyAoeMnVMZm4QD4PYCzgCMX2xs-TLUrvYH9z4oecmk0-taytMWKxpFeKDoymbra1kOefBv6UH2Uhx1r19St6sD7WgwfCCF4ODOB2K5dh26Zdnw9QEHgUTfh+jaAe4sBEEeb4AS2-oklWrpqn2aqqOoygALJlM4qBatGsZTgmbpkVcWj5BWhE1sxaisVRLioHwUqWHGxyQmcqAAJ6QuSxwAAY-MmwD1jkaF4UQClyCBUrHhAeFGD4bSyeqwC6a20RasZpkxHwZyTpozwGLJVZdF0fAAFZIJA8Z2JW6JdPJ8ScXIuz7LI0ZUKwVjVHkMjohS4DQPAAAyqRUIycASZYRA4MoYBQHA8UpEQAAKuzylYWCRGglLmGcABqYBoFS5CZRg2AKMIBB1CA0RAA)

使用 `.prepend` 的方法和 `.append` 完全一致，不同的是语句将添加到最前面。

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZm8RNEnw9yREBhBEEaEjpAA2gBdQPyYO3TI5LV1AvhkgxyAoeMnVMZm4QD4PYCzgCMX2xs-TLUrvYH9z4oecmk0-taytMWKxpFeKDoymbra1kOefBv6UH2Uhx1r19St6sD7WgwfCCF4ODOB2K5dh26Zdnw9QEHgUTfh+jaAe4sBEEeb4AS2-oklWrpqn2aqqOoygALJlM4qBatGsZTgmbpkVcWj5BWhE1sxaisVRLioHwUqWHGxyQmcqAAJ6QuSxwAAY-MmwD1jkaF4UQClyCBUrHhAeFGD4bSyeqwC6a20RasZpkxHwZyTpozwGLJVZdF0fAAFZIJA8Z2JW6JdPJ8ScXIuz7LI0ZUKwVjVHkMjohS4DQPAAAyqRUIycASZYRA4MoYBQHA8UpEQAAKuzylYWCRGglLmGcABqYBoFS5CZRg2AKMIBB1CA0RAA)

### 用 before, after 给代码前后插入代码

对于上面的 React 组件示例，如果你想在每一个 `setState` 前后添上一条打印 `state` 的 log，可以使用 `.before` 和 `.after` 方法，它会把传进去的参数插入到当前 ast 节点的前面或后面。

```js
const ast = $(source);

const reactClass = ast.find('class $_$0 extends React.Component {}');

reactClass.find('this.setState()').each((setState) => {
  setState.before(`console.log('before', this.state)`);
  setState.after(`console.log('after', this.state)`);
});
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZmq1DiEIJBjkBQ8eepQqVRYeUrfFDzh9ZTG1ranVMRAHHbQfDOaF5dU0AAMTUg6Hw8NR49PZ2hIRLW4D-fOq10x+3qnwCEyWFpF4pl5O11R4xerzuIv8PBODIeSUfHLt9rI0ZUKwVjVHkMjohS4DQPAAAyqRUIycAAJ6WEQODKGAUBwFBKREAACrs8pWFgkRoJS5hnAAamAaBUuQqEYNgCjCAQdQgNEQA)

## 删除代码

经过我们之前的努力，写了一个转换程序，给原来的代码里所有回调函数都加上了 `.bind(this)`，然后你往后多看了半页文档，发现竟然可以这么写：

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // 下面一行不再需要了
    // this.handleClick = this.handleClick.bind(this)
  }

  // 这里从成员方法改成 public class fields syntax
  handleClick = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

首先，这告诉我们，学一个新的工具，文档一定要看全，否则会留下遗憾。

其次，我们可以考虑再写一个转换工具，把代码转换成这个样子，不留遗憾！

我们先请出万能的 `replace`，把回调函数 `handleClick() {}` 改转换成 `handleClick = () {}`：

```js
const ast = $(source);

// 找到 reactClass 定义的语句
const reactClass = ast.find('class $_$0 extends React.Component {}');

// 找到 jsx 里面带有 onClick 属性的标签
const onClick = reactClass.find('<$_$0 onClick={$_$1}></$_$0>');

// 创建一个数组用来收集 onClick 对应的 hanlder 的名称
const clickFnNames = [];

// 有可能找到很多个带有 onClick 的标签，我们这里用 each 去处理每一条
onClick.each((e) => {
  // 用 match[1][0] 来找到 $_$1 匹配到的第一个 onClick 属性对应的 handler 节点
  // 取 value 即为节点名
  // handlerName = 'this.handleClick'
  const handlerName = e.match[1][0].value;
  clickFnNames.push(handlerName);
});

clickFnNames.forEach((name) => {
  // 剔除掉前面的 this. 获得纯粹的函数名
  const fnName = name.replace('this.', '');

  // 把 class method 改成 public class fields syntax
  reactClass.replace(
    `${fnName}() {$$$0}`,
    `${fnName} = () => {
        $$$0
    }`,
  );
});
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYVnIsVjSIA-I0ADEo7bi8DLEMiALO1AJJygBC3QC30YBT5VdaqjPEQhBIWo9fEFbE0kPwcdI6oA+uqAAwMZisdikLi5gRIYSicSSaKQgMzeLBsORgBWREYpEAM4mAI3TAGR6gEhzG4QD7ZUiAPR1AOQGycA4BaAP28s6bbpkclq6rnYyRi5AUGWTjX68vV48HwBGL7Yh91lr9wOkYeANhKgBfeoAAHKAFRygAOpoAI36ABSugCm5oAbKaAGNpT4nmugCf2oAKXrJqQrx4OgyikMmgCwKoAD56HhI+D3EiEAwgQghoGQfgANoALp-sOC6APfKgC-ARGgAR+oAWJpgYuqH3ER+6ADD-gCIRoAN3KAJvxU4wQwPDOKQgDdyoAIJqAGAugDz1iBgCG5o4x73Hw0bOJomj+q0yqmMOymCF4ODOMxr6scxdasaQcERlWtavqQgCcyoAsonhsmgA03uBYmnluWE4a8KB0IRgBBQYAnQ7HMOgBryqQ9QEHgUSkIAzsqAFxyaXERlIYJUldEMVqkLPHwVXvGhkLHCaEhNcoNXWgwfCOXAzmue5nl8Ll+VoG1aE0d17iwEQFmdd1A5zAOxpTbR9GMcWGgAKKqZZECbUYPhtJ0dkhoAKkqACZpgCRxoAskozjhDWkIA7cGAOn6gD1foAnT7JoAv4oQeV2ztaQTIbbVfiHQxfB1FAhBWmWDWQhKkK-oOXTnjG+buDDcM1D8pAAAbqsAoPddEmzAOqVN1tEBPkvjRMk2DMRapsJ22V0chU-W+O08cy0JKtqxlPsshFlQrBWNUeQyOiFLgNA8AADKpFQjJwAAnpYRA4MoYBQHA8spEQAAKuzylYWCRGglLmGcABqYBoFS5Baxg2AKMIBB1CA0RAA)

然后我们看看如何把原来的 `.bind(this)` 语句删掉。

### 用 replace 删除代码

删掉语句最简单的办法就是用 replace 把它替换成空：

```js
clickFnNames.forEach((name) => {
  // 剔除掉前面的 this. 获得纯粹的函数名
  const fnName = name.replace('this.', '');

  // 把 class method 改成 public class fields syntax
  reactClass.replace(
    `${fnName}() {$$$0}`,
    `${fnName} = () => {
        $$$0
      }`,
  );

  // 移除原有的 bind
  reactClass.replace(`this.${fnName} = this.${fnName}.bind(this)`, ``);
});
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1knV3dnAjY6BDwwHABrXwjEvmTUtHTMrL4AI0gUTRc3A0domUdClDSM7M0jaXi5WvciNDgAZTgvNG1lNAA3EbHfAD5STW7TUwDqWjRQ8IBCHWnZlj51oK2IRzlogwM4y6b4ybYrTuMe0km4GGVZTQvTAB5yvA4KJSKIStkfMA+gUUq1iu0stF5n9VtD8p4jidNqFSAB+UgAcmCADlCaRwsSAGJUwmNN5yf4AeiBcBBEBRbxuDRk0RAABoQAB3DRZZDoLAgABmMAgvDAoJUKSIUo0gk0UrAdAAkhBVfzSAQoGADXo4AqIIZXnIFJaJAASXJGsB8KjUJAKdCOW1KUhEJBfHD0PyanV6pAeAPKIPexQSYgSPz2zT+wNoerneJMpmkQB+RoAGJXe3F46WIZEAWdqASTlACFugFvowCnyrG7UWeIhCCQnUo+Jq2JpCfgy6R7QB9e0ABgYzFY7FIXFbAiQwlE4kk0UJGcc2bzhYAVkRGKRADOJgCN0wBkeoBIczBEAhOUAejqAcgNq4BwC0Aft5N33gxG5Sat0skbtVH2-wjuOV43lCIEAIzIsyIFjvM673HIW6ANhKgBfeoAAHKAFRygAOpoAI36ABSugCm5oAbKaAGNpYFfoAn9qACl61akIUeDoMopDVoAsCqAA+e74SPgpRUhAJIEIIaBkH4ADaAC6SGkFu56APfKgC-AQWgAR+oAWJpYRelGlKxr6ADD-gCIRoAN3KAJvxh4EQwPDOKQgDdyoAIJqAGAugDz1hhgCG5o4n6lHwxbOJomjpgs1qmFu5mCF4ODOGJkESWJY4SaQREFkOo6QaQgCcyoAson5tWgA03thWnZKQD60fRLR0CxgBBQYAnQ5-FugBryqQUwEHgUSkIAzsqAFxyVVsTVOalVYgnCbkhIwn1N6En8PoSH1ygDcGDB8KFcDhZF0WxXwjXNWgE2Ivxs3uLARA+dNs0ZpcG7xLx2S7UJIndhoACilm+RAN1GD4iwrEFOaACpKgAmaYAkcaALJKx70TCpCAO3BgDp+oA9X6AJ0+1aAL+KOHdW8k2kFKAk3bkL3CXwkxQIQQZ9jChIGoSiGZqsW6AFFG8jtmQwkuKgpCAJymgAIRqQsDlO0dODpqaBMWQRAAJ4QKMjB-D+Jb03jaAEzw4yoqQAAG9rABjs3RC8wD2rrY7RMr-JK6r6uY8J0S5C872Basci6+OSsG3851UzmgDfnr9gD5yue9GVGwkvFm2Zay-LRPGzCasazdFt+BHpuaxUgF9AYhvG8rzsNC7RafN8hpdlQrBWGMnS8jIArgNA8AADIpFQkpwMLlhEDgyhgFAcDl8kRAAAofOaVhYJEaCCuY5QAGpgGgQrkI3GDYAowgEJMIDREAA)

### 用 remove 删除代码

或者，你也可以用先查找再调用 `.remove` 方法的方式来做到同样的事情:

```js
clickFnNames.forEach((name) => {
  // 剔除掉前面的 this. 获得纯粹的函数名
  const fnName = name.replace('this.', '');

  // 把 class method 改成 public class fields syntax
  reactClass.replace(
    `${fnName}() {$$$0}`,
    `${fnName} = () => {
        $$$0
      }`,
  );

  // 移除原有的 bind
  reactClass.find(`this.${fnName} = this.${fnName}.bind(this)`).remove();
});
```

[Playgroud 在线演示](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1knV3dnAjY6BDwwHABrXwjEvmTUtHTMrL4AI0gUTRc3A0domUdClDSM7M0jaXi5WvciNDgAZTgvNG1lNAA3EbHfAD5STW7TUwDqWjRQ8IBCHWnZlj51oK2IRzlogwM4y6b4ybYrTuMe0km4GGVZTQvTAB5yvA4KJSKIStkfMA+gUUq1iu0stF5n9VtD8p4jidNqFSAB+UgAcmCADlCaRwsSAGJUwmNN5yf4AeiBcBBEBRbxuDRk0RAABoQAB3DRZZDoLAgABmMAgvDAoJUKSIUo0gk0UrAdAAkhBVfzSAQoGADXo4AqIIZXnIFJaJAASXJGsB8KjUJAKdCOW1KUhEJBfHD0PyanV6pAeAPKIPexQSYgSPz2zT+wNoerneJMpmkQB+RoAGJXe3F46WIZEAWdqASTlACFugFvowCnyrG7UWeIhCCQnUo+Jq2JpCfgy6R7QB9e0ABgYzFY7FIXFbAiQwlE4kk0UJGcc2bzhYAVkRGKRADOJgCN0wBkeoBIczBEAhOUAejqAcgNq4BwC0Aft5N33gxG5Sat0skbtVH2-wjuOV43lCIEAIzIsyIFjvM673HIW6ANhKgBfeoAAHKAFRygAOpoAI36ABSugCm5oAbKaAGNpYFfoAn9qACl61akIUeDoMopDVoAsCqAA+e74SPgpRUhAJIEIIaBkH4ADaAC6SGkFu56APfKgC-AQWgAR+oAWJpYRelGlKxr6ADD-gCIRoAN3KAJvxh4EQwPDOKQgDdyoAIJqAGAugDz1hhgCG5o4n6lHwxbOJomjpgs1qmFu5mCF4ODOGJkESWJY4SaQREFkOo6QaQgCcyoAson5tWgA03thWnZKQD60fRLR0CxgBBQYAnQ5-FugBryqQUwEHgUSkIAzsqAFxyVVsTVOalVYgnCbkhIwn1N6En8PoSH1ygDcGDB8KFcDhZF0WxXwjXNWgE2Ivxs3uLARA+dNs0ZpcG7xLx2S7UJIndhoACilm+RAN1GD4iwrEFOaACpKgAmaYAkcaALJKx70TCpCAO3BgDp+oA9X6AJ0+1aAL+KOHdW8k2kFKAk3bkL3CXwkxQIQQZ9jChIGoSiGZqsW6AFFG8jtmQwkuKgpCAJymgAIRqQsDlO0dODpqaBMWQRAAJ4QKMjB-D+Jb03jaAEzw4yoqQAAG9rABjs3RC8wD2rrY7RMr-JK6r6uY8J0S5C872Basci6+OSsG3851UzmgDfnr9gD5yue9GVGwkvFm2ZZKwBvbKzCasazdFt+BHpuaxUgF9AYyunbbsuCEgUzjGnVzSR8XyyAmrqsFYYydLyMgCuA0DwAAMikVCSnAwuWEQODKGAUBwNXyREAACh85pWFgkRoIK5jlAAamAaBCuQrcYNgCjCAQkwgNEQA)


以上是用 GoGoCode 做代码转换的基本教程，感谢你的耐心看到这里，如果在使用过程中仍有疑问，可以查阅我们的 [API 文档](/zh/docs/specification/category/instance) 和 [Cookbook](/zh/docs/specification/cookbook)，祝你代码转换顺利！