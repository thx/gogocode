---
title: AST实例
order: 0
---

调用 `$()` 即可将一段代码或一个 ast 节点构造为 GoGoCode 的核心 AST 实例。支持 js（包括 jsx）、html、vue

### $(code, options)

| 入参 |  | 说明 | 类型 | 举例 |
| --- | --- | --- | --- | --- |
| `code` |  | 需要被实例化的代码或AST节点 | string  NodePath  Node | `'var a = 1'` |
| `options` | `parseOptions` | 解析js时，它与babel/parse的options完全一致<br>解析html、vue时需要传入language | object | `{ plugins: ['jsx'] }`<br> ` { language: 'html' } ` <br> ` { language: 'vue' } ` |
|  | `astFragment` | 需要插入到代码中的ast节点 | Node | `{ content: astNode }` |
|  | `isProgram` | 是否需要返回完整ast<br>js的完整ast最外层节点是File类型<br>html完整ast是document类型 | Boolean | 默认为true |                                                        |

```typescript
$('var a = 1');

$(astNode);

$('<div></div>', {
  parseOption: { plugins: ['jsx'] },
});

$(`function demo() { $_$content$_$ }`, {
  astFragment: {
    content: $('var a = 1', { isProgram: false }).node,
  },
});
```

### $.loadFile(path, options)



与构造函数作用相同，第一个入参可以是文件路径，直接将文件内容实例化



### AST 实例详细介绍



AST 实例包含所有可链式调用的 API，将在下一节一一介绍

先介绍两个概念，`Node`和`NodePath`



#### Node

独立的 ast 节点，结构如下，不同的语句对应不同的 type 和属性。所有的代码转换都是靠对某个 Node 中属性的修改
<img style="width:500px; display:block" src="https://alp.alicdn.com/1612753991244-1062-596.jpg"/>



#### NodePath

包含当前 ast 节点结构及其路径信息，一般不需要直接操作



#### AST 实例上的属性

- 0-n
  一个 AST 实例可以挂多个 ast NodePath，通过整数索引获取

| 参数           |          | 说明                                                     |
| -------------- | -------- | -------------------------------------------------------- |
| `nodePath`     | `node`   | ast 节点                                                 |
|                | `parent` | ast 节点的父节点                                         |
| `parseOptions` |          | 构造 AST 实例时传入的解析参数                            |
| `match`        |          | 完整节点中被通配符匹配到的节点                           |
|                | `node`   | 节点结构，同 node                                        |
|                | `value`  | 简化后的节点结构，如果节点是字符串类型，则直接是字符串值 |

- length

返回匹配到 Nodepath 的个数

- node

获取 AST 实例上的第一个 ast 节点

- match

获取 AST 实例上的第一个 ast 节点中被通配符匹配到的节点，match 的具体解释见`.find()`
