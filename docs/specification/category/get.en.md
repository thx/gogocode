---
title: Find Node
order: 1
---

All node acquisition operations will return a new AST instance. The instance may contain multiple AST node paths, such as `find()`, `siblings()`, etc. The instance returned by some APIs will only have one AST node path. , such as `next()`
###AST.find(selector, options)

| Input parameters | | Description | Type | Default value |
| --- | --- | --- | --- | --- |
| `selector` | | Code selector, which can be code or can replace part of the code with wildcards | string | None |
| `options` | `ignoreSequence` | Whether to ignore the sequence when matching <br>The case of ignoring the sequence: `{a:$_$}` matches `{b:1, a:2}`<br>It needs to be in strict order Matching cases: `function($_$, b){}` matches `function(a, b){}` | boolean | false |
| | `parseOptions` | same as `parseOptions` of constructor | | |

When there is a `$_$` wildcard in the selector, there is a `match` attribute in the returned AST instance, that is, the AST node matched by `$_$`
For example: `$('var a = 1').find('var $_$ = $_$')`, the resulting structure is:

<img style="width:800px; display:block" src="https://alp.alicdn.com/1614534004290-2222-1032.png"/>


The corresponding `match` structure is:

````
[{
    structure: { type: 'Identifier', name: 'a' ... } : Node,
    value: 'a'
}, {
    structure: { type: 'NumericLiteral', value: 1 ... } : Node,
    value: '1'
}]
````



### .parent(level)
get a parent node

| Input parameters | Description | Type | Default value |
| --- | --- | --- | --- |
| `level` | nth level parent element from inside to outside | number | 0 |



### .parents()
get all parent sections

### .root()
Get the root node, for js it is a node with `type` as 'File', for html it is a node with `nodeType` as 'document'
Usually, after operating the AST, you need to get the root element and then output it


### .siblings()
Get all sibling nodes

### .prev()
get previous node

### .prevAll()
Get the sibling node before the current node

### .next()
get the next node

### .nextAll()
Get the sibling nodes after the current node

### .each(callback)
Executes a function with each matched element as context.

| Input parameters | Description | Type | Default value |
| --- | --- | --- | --- |
| `callback` | The function to be executed for each matched element<br>When executing the function, it will pass the current node `node` and `index` to the function | function | none |

### .eq(index)
Get the Nth AST object in the current chain operation

| Input parameters | Description | Type | Default value |
| --- | --- | --- | --- |
| `index` | The position of the AST object to be retrieved | number | 0 |

Translated with www.DeepL.com/Translator (free version)