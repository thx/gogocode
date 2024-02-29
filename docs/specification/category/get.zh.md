---
title: 获取节点
order: 1
---

所有的节点获取操作都会返回一个新的AST实例，实例中可能挂了多个AST节点路径，如通过`find()`、`siblings()`获取的实例，也有某些api返回的实例只存在一个AST节点路径，如`next()`
### AST.find(selector, options)

| 入参 |  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| `selector【必传】` |  | 代码选择器，可以是代码，也可以将代码中的部分内容替换为通配符 | string <br> array | 无 |
| `options` | `ignoreSequence` | 匹配时是否忽略顺序<br>忽略顺序的情况：`{a:$_$}`匹配`{b:1, a:2}`<br>需要严格按照顺序匹配的情况：`function($_$, b){}` 匹配`function(a, b){}` | boolean | false |
|  | `parseOptions` |  同构造函数的`parseOptions` |  | |

#### 对于match的解释
当selector中存在 `$_$` 通配符时，返回的AST实例中存在 `match` 属性，也就是被 `$_$` 匹配到的AST节点
如：`$('var a = 1').find('var $_$1 = $_$2')`，得到的结构为：

<img style="width:800px; display:block" src="https://alp.alicdn.com/1619218197857-1876-1154.png"/>


其中对应的 `match` 结构为：

```
{
    1:[{
        node: { type: 'Identifier', name: 'a' ... },
        value: 'a'
    }],
    2: [{
        node: { type: 'NumericLiteral', value: 1 ... },
        value: '1'
    }]
}
```

`$_$1` 匹配到的在 `match[1]` 中，`$_$2` 匹配到的结果在 `match[2]` 中

#### vue sfc的特殊处理
vue single file component同时包含template和script，转换时需要区分处理，做法如下：

```javascript
$(input, { parseOptions: { language: 'vue' } })
.find('<template></template>')
......    // 对template的处理
.root()     // 拿到sfc根节点
.find(`<script></script>`)
......      // 对script的处理
.root()
.generate()
```


### .parent(level)
获取某个父节点

| 入参 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `level` | 自内向外第n层父元素 | number | 0 |



### .parents()
获取所有父节

### .root()
获取根节点
- 对于js来说根节点是`type`为'File'的节点
- 对于html来说根节点是`nodeType`为'document'的节点
- 对于vue来说 `root()`返回的是完整的sfc节点
    - 在template内部操作之后想要获取template的根节点，则调用：`.root('template')`
    - 在script内部操作之后想要获取template的根节点，则调用：`.root('script')`
示例如下：

通常对AST进行操作之后需要调用root之后再generate，才是完整的转换后代码


### .siblings()
获取所有兄弟节点

### .prev()
获取前一个节点

### .prevAll()
获取当前节点之前的同级节点

### .next()
获取后一个节点

### .nextAll()
获取当前节点之后的同级节点

### .each(callback)
以每一个匹配的元素作为上下文来执行一个函数。

| 入参 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `callback` | 对于每个匹配的元素所要执行的函数<br>执行函数时，会给函数传递当前节点`node`和`index` | function | 无 |

### .eq(index)
获取当前链式操作中第N个AST对象

| 入参 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `index` | 需要获取的AST对象的位置 | number | 0 |