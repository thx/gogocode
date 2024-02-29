---
title: Modify Node
order: 2
---

### .attr()

To get or modify the attributes of an AST node, the input parameters can be divided into three cases:

1. Return the node or attribute value corresponding to the attribute name

| Input parameters | Description | Type | Default value | Example |
| --- | --- | --- | --- | --- |
| `attrName` | attribute name of the ast node, supports multi-layer attributes, connected by `.` | string | None | declarations<br>declarations.0.id.name |



2. Modify the node or attribute value corresponding to the attribute name

| Parameter | Description | Type | Example |
| --- | --- | --- | --- |
| `attrName` | attribute name of ast node, supports multi-layer attributes, connected by . | string | declarations <br>declarations.0.id.name |
| `attrValue` | Modify the node or attribute obtained by the first input parameter to this input parameter <br>Note: The string will not be parsed as an ast node but directly replace the original attribute | node string | |



3. Modify the nodes or attribute values ​​corresponding to multiple attribute names

| Input parameter | | Type | Default value | Example |
| --- | --- | --- | --- | --- |
| `attrMap` | `attrName` | string | none | declarations <br>declarations.0.id.name |
| | `attrValue` | node | string | none | |



```typescript
AST.attr('init', initNode)

AST.attr({
  init: initNode,
  'program.body.0.params.0.name': 'a'
})

AST.attr('program.body.0.params.0.name')
````
### .has(selector, options)
Determine whether there is a child node, the return value is boolean type
Input parameters are the same as `.find()`

### .clone()
Returns a new node deep copied from the current node


### .replace(selector, replacer)
Replace the code matched by `selector` with `replacer` inside the current node, and return the current node

| Input parameter | | Explanation | Type | Example |
| --- | --- | --- | --- | --- |
| `selector` | | Code selector, which can be code or can replace part of the code with wildcards | `string` | `var $_$ = $_$` |
| `replacer` | | Replace the code, the same as the wildcard sequence of the code selector and the selector <br>It can also be a definite ast node | `string` | `node` | `let $_$ = $_$` |
| `options` | `ignoreSequence` | whether to ignore sequence when matching | object | none |
| | `parseOptions` | Parse input parameters | object | none |

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
````
### .replaceBy(replacerAST)
Replace the current node with replacerAST, returning the new node

| Input parameters | Type |
| --- | --- |
| `replacerAST` | AST <br>node <br> string |

### .after(ast)
Insert a node of the same level after the current node and return the current node

| Input parameters | Type |
| --- | --- |
| `ast` | AST <br> node <br> string |

### .before()
Insert a node of the same level before the current node and return the current node

| Input parameters | Type |
| --- | --- |
| `ast` | AST <br> node <br> string |

### .append(attr, ast)
Insert a child node at the end of an array property inside the current node and return the current node

| Input parameters | Type |
| --- | --- |
| `attr` | Array attribute name of the current node |
| `ast` | AST <br> node <br> string |

- Why do you need to pass in `attr`?

Because multiple attributes in some nodes are arrays, such as functions, there are two array sub-nodes of input parameter params and function body body, and attr must be used to determine the position of the inserted node

```typescript
AST
.find('function $_$() {}')
.append('params', 'b')
.prepend('body', 'b = b || 1;')
````
### .prepend()
Insert a child node at the first position of an array property inside the current node and return the current node

### .empty()
Clear all child nodes of the current node and return to the current node

### .remove()
Remove the current node and return to the root node

### .generate()
Output AST object as code