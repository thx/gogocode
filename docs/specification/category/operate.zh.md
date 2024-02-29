---
title: 操作节点
order: 2
---

### .attr()

获取或修改AST节点的属性，入参可分三种情况：

1. 返回属性名称对应的节点或属性值

| 入参 | 说明 | 类型 | 默认值 | 举例 |
| --- | --- | --- | --- | --- |
| `attrName` | ast节点的属性名称，支持多层属性，通过`.`连接 | string | 无 | declarations<br>declarations.0.id.name |



2. 修改属性名称对应的节点或属性值

| 入参 | 说明 | 类型 | 举例 |
| --- | --- | --- | --- | 
| `attrName` | ast节点的属性名称，支持多层属性，通过.连接 | string | declarations <br>declarations.0.id.name |
| `attrValue` | 将第一个入参获取到的节点或属性修改为该入参 <br>注意：字符串不会被解析为ast节点而是直接替换原有属性 | node  string |  |



3. 修改多个属性名称对应的节点或属性值

| 入参 |  | 类型 | 默认值 | 举例 |
| --- | --- | --- | --- | --- |
| `attrMap` | `attrName` | string | 无 | declarations <br>declarations.0.id.name |
|  | `attrValue` | node | string | 无 |  |



```typescript
AST.attr('init', initNode)

AST.attr({ 
  init: initNode,
  'program.body.0.params.0.name': 'a'
})

AST.attr('program.body.0.params.0.name')
```
### .has(selector, options)
判断是否有某个子节点，返回值为boolean类型
入参同`.find()`

### .clone()
返回由当前节点深度复制的新节点


### .replace(selector, replacer)
在当前节点内部用`replacer`替换`selector`匹配到的代码，返回当前节点

| 入参 |  | 解释 | 类型 | 例 |
| --- | --- | --- | --- | --- |
| `selector` |  | 代码选择器，可以是代码也可以将代码中的部分内容挖空替换为通配符 | `string` | `var $_$ = $_$` |
| `replacer` |  | 替换代码，同代码选择器通配符顺序与selector的保持一致<br>也可以是确定的ast节点 | `string` | `node` | `let $_$ = $_$` |
| `options` | `ignoreSequence` | 匹配时是否忽略顺序 | object | 无 |
|  | `parseOptions` | 解析入参 | object | 无 |

### 
```typescript
AST.replace(`Component`, `module.exports = Magix.View.extend`);

AST.replace(
  `export default function calculateData($_$1){$_$2}`, 
  `function calculateData($_$2){$_$1}`
)

AST.replace(
  `navigateToOutside({url: $_$})`, 
  `jm.attachUrlParams($_$)`, 
  options: { ignoreSequence: true }
)
```
### .replaceBy(replacerAST)
用replacerAST替换当前节点，返回新节点

| 入参 | 类型 |
| --- | --- |
| `replacerAST` | AST <br>node <br> string |

### .after(ast)
在当前节点后面插入一个同级别的节点，返回当前节点

| 入参 | 类型 |
| --- | --- |
| `ast` | AST <br> node <br> string |

### .before()
在当前节点前面插入一个同级别的节点，返回当前节点

| 入参 | 类型 |
| --- | --- |
| `ast` | AST <br> node <br> string |

### .append(attr, ast)
在当前节点内部某个数组属性的末尾插入一个子节点，返回当前节点

| 入参 | 类型 |
| --- | --- |
| `attr` | 当前节点的数组属性名称 |
| `ast` | AST <br> node <br> string |

- 为什么需要传入`attr`？

因为某些节点中多个属性都为数组，如函数，存在入参params和函数体body两个数组子节点，必须通过attr来判断插入节点的位置

```typescript
AST
.find('function $_$() {}')
.append('params', 'b')
.prepend('body', 'b = b || 1;')
```
### .prepend()
在当前节点内部某个数组属性的首位插入一个子节点，返回当前节点

### .empty()
清空当前节点所有子节点，返回当前节点

### .remove()
移除当前节点，返回根节点

### .generate()
将AST对象输出为代码
