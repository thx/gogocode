# GOGOCODE

全网最简单易上手，可读性最强的 AST 处理工具！

# Install

```
    npm install gogocode
```

## 快速开始

对于下面的代码

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

创建一个 AST 实例

```javascript
const $ = require('gogocode');
const AST = $(code);
```
-----

- 小明想将 所有的 `a` 变量名替换为 `c`，只需要

```javascript
$(code).replace('a', 'c')
```

-----

- 小明改主意了，只想把 `var a = 1` 里的变量名改为  `c`，需要两步：

  - 取变量 a 的定义赋值，

  ```javascript
  $(code).find('var a = 1');
  ```

  - 将 `a` 变量名替换为 `c`，并输出整体代码

  ```javascript
  $(code)
    .find('var a = 1')
    .attr('declarations.0.id.name', 'c')
    .root()
    .generate();
  ```
<br>

这是直接操作AST的方式，有没有更简单的方法呢？有！

```javascript
$(code).replace(`var a = 1`, `var c = 1`)
```

<br>

replace确实用起来爽，但当你在分析转换代码时遇到replace覆盖不到的场景时，请用GoGoCode提供的其他api来精准操作AST吧！

-----

- 小明又改主意了，想把所有定义语句的 `a` 都改成  `c`，只需要将目标语句改一下写成：

```javascript
$(code).replace(`var a = $_$`, `var c = $_$`)
```

> 看到这里，你应该已经理解 `find`和`replace` 的第一参有点类似‘jquery 选择器’，而这里的选择器是你需要查找的代码片段，无论想要匹配多么复杂的代码都可以匹配到，其中 `$_$` 通配符可以匹配任意确定代码，代码选择器及通配符详细介绍 <a href="/zh/docs/specification/selector">看这里</a>

-----

- 小明想试试将代码里的 `var` 改为 `let`，`require` 改为 `import`，他发现用 GoGoCode 真的可以像字符串的 replace 一样简单！

```javascript
$(code)
.replace('var $_$ = $_$', 'let $_$ = $_$');
.replace('const $_$ = require($_$)', 'import $_$ from $_$')
```

# API

### 核心 AST 实例

所有选择器、获取操作返回的都是这个结构

```typescript
interface AST {
	nodePath: NodePath    // ast的结构及上下文
	parseOptions: ParseOption,    // 解析参数，同babel
  match?: AST[],	// 当选择器中有通配符时，通配符所匹配的ast节点
  ...api-func			// api方法挂在实例上
}
```

### 构造 AST 实例：$()

#### $(code, options)

```typescript
const $ = (
    code: string | ast,
    options?: {
        parseOptions: ParseOptions;
        astFragment: {
            [string]: AST;
        };
    }
) => AST;
```

| 字段    |              | 解释                                                     | 例                                                                              |
| ------- | ------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| code    |              | 代码字符串，可以包含 ast 节点对应的标识<br />或 ast 片段 | 'var a = 1'                                                                     |
|         |              |                                                          | `Alert.show({content: $_$content$_$ })`                                         |
| options | parseOptions | 解析参数(同 babel)                                       | { plugins: ['jsx'] } <br /> 当解析 html 时，需要传 parseOptions: { html: true } |
|         | astFragment  | ast 节点映射                                             | { content: contentNode }                                                        |

```typescript
$('var a = 1');

$(astNode);

$('<div></div>', {
    parseOption: { plugins: ['jsx'] }
});

$(`Alert.show({content: $_$content$_$ , type: $_$type$_$ })`, {
    astFragment: {
        content: contentNode,
        type: typeNode
    }
});
```

#### $.loadFile

```typescript
$.loadFile = (
    filePath: string,
    options?: {
        parseOptions: ParseOptions;
    }
) => AST | string;
```

| 字段     |              | 解释               | 例                                                                              |
| -------- | ------------ | ------------------ | ------------------------------------------------------------------------------- |
| filePath |              | 文件路径           |                                                                                 |
| options  | parseOptions | 解析参数(同 babel) | { plugins: ['jsx'] } <br /> 当解析 html 时，需要传 parseOptions: { html: true } |

```typescript
$.loadFile('src/input.js');

$.loadFile('src/input.html', { parseOptions: { html: true } });

$.loadFile('src/input.css'); // 除js和html之外的代码不会被解析成ast，只会返回原有代码
```

### 节点获取

$.find(AST, selector, options)

#### $(code).find(selector, options)

```typescript
$(code).find = function (selector: string,
     options?: {
       ignoreSequence: boolean
  						// true的情况：不要求顺序，如{a:$_$}匹配{b:1, a:2}
           		// false的情况：需要严格按照顺序匹配，如function($_$, b){} 匹配function(a, b){}
     }
) => AST
```

| 字段     |                | 解释                                                           | 例                                                                             |
| -------- | -------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| selector |                | 代码选择器，可以是代码也可以将代码中的部分内容挖空替换为通配符 | $_$<br />var $& = $&<br />var #1 = #2<br />var sdjkewiow33223 = sdjkewiow33223 |
| options  | ignoreSequence | 匹配时是否忽略顺序                                             | true                                                                           |

```typescript
// 选择器selector示例：
var $_$1 = $_$2

function $_$name () { $_$body }

View.extend($_$)

$_$a ? $_$b : $_$c

$_$1 && $_$2

if ($_$1) {
    $_$2
}
```

#### .parent()

#### .parents()

() => AST[]

> 获取所有父节点

#### ~~.children()~~

~~() => AST[]~~

> ~~获取所有子节点<br />~~

#### .siblings()

() => AST[]

> 获取所有兄弟节点

#### .has

(selector, options) => boolean

> 是否有某个子节点

#### .prev()

() => AST

> 获取前一个节点

#### .prevAll()

() => AST[]

> 获取前面所有节点

#### .next()

() => AST

> 获取后一个节点

#### .nextAll()

() => AST[]

> 获取后面所有节点

#### .root()

() => AST

> 获取根节点

#### .each(index, node) => AST[]

#### .eq()

#### 节点操作

#### .attr()

> (attrName) => AST

> 获取 AST 节点的某个属性
> ( attrName, attrValue ) => AST

> 修改 AST 节点的某个属性
> ({ attrName: attrValue }) => AST

> 修改 AST 节点的多个属性

attrName 支持多级别，attrValue 支持节点或字符串，但字符串不会被解析为 ast 节点而是直接插入

```typescript
$(code).attr('init', initNode);

$(code).attr({
    init: initNode,
    'program.body.0.params.0.name': 'a'
});

$(code).attr('program.body.0.params.0.name');
```

#### .clone()

() => AST

> 深度复制一个节点

#### .replace(matcher, replacer)

(matcher, replacer, options) => AST

> 在当前节点内部用替换代码替换选择器匹配到的代码,返回当前节点

matcher和replacer中的 `$_$1` 和 `$_$2` 相当于正则中的通配符，但是在这里只会匹配代码里有效的 AST 节点，`$$$` 则可以匹配剩下的节点，有点像 es6 里的 `...` 

```typescript
$(code).replace = (selector: string, replacer: string | AST | null) => AST;
```

| 字段     |                | 解释                                                                                                 | 例            |
| -------- | -------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| selector |                | 代码选择器，可以是代码也可以将代码中的部分内容挖空替换为通配符                                       | var $_$1 = $_$2 |
| replacer |                | 替换代码，可以是代码，也可以与 selector 一样将部分内容替换为通配符，通配符顺序与 selector 的保持一致 | let $_$1 = $_$2 |
| options  | ignoreSequence | 查找时是否忽略顺序                                                                                   | true          |

####

```typescript
$(code).replace(`Component`, `module.exports = Magix.View.extend`);

$(code).replace(
  `export default function calculateData($_$1){$$$}`,
  `function calculateData($_$1){$$$}`
)

$(code).replace(
  `navigateToOutside({url: $_$})`,
  `jm.attachUrlParams($_$)`,
  options: { ignoreSequence: true }
)

$(code).replace(
  '{ text: $_$1, value: $_$2, $$$ }',
  '{ name: $_$1, id: $_$2, $$$ }'
)

$(code)
    .replace(`import { $$$ } from "@alifd/next"`, `import { $$$ } from "antd"`)
    .replace(`<h2>转译前</h2>`, `<h2>转译后</h2>`)
    .replace(`<Button type="normal" $$$></Button>`, `<Button type="default" $$$></Button>`)
```

#### .replaceBy(replacerAST)

(AST1) => AST2

> 用 AST2 实例替换 AST1 实例，AST2 可以为字符串或 ast 节点

#### .after(AST)

(AST) => AST

> 在当前节点后面插入一个同级别的节点，返回当前节点

#### .before()

(AST) => AST

> 在当前节点前面插入一个同级别的节点，返回当前节点

#### .append()

(AST) => AST

> 在当前节点内部最后插入一个子节点，返回当前节点

#### .prepend()

(AST) => AST

> 在当前节点内部最前插入一个子节点，返回当前节点

#### .empty()

(AST) => AST

> 清空当前节点所有子节点，返回当前节点

#### .remove()

(AST) => AST

> 移除当前节点，返回父节点

### 输出

#### .generate()

> 将 ast 实例输出为代码字符串

```typescript
$(code).generate = () => string;
```

#### $.writeFile()

> 将字符串写入文件

```typescript
$.writeFile(result, 'src/output.js');
```
