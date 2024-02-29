---
title: AST Instance
order: 0
---

Call `$()` to construct a piece of code or an ast node as an instance of GoGoCode's AST instance

### $(code, options)

| Parameters | | Description | Type | Example |
| --- | --- | --- | --- | --- |
| `code` | | The code or AST node to be instantiated | string NodePath Node | `'var a = 1'` |
| `options` | `parseOptions` | When parsing js, it is exactly the same as the options of babel/parse<br>When parsing html and vue, you need to pass in language | object | `{ plugins: ['jsx'] }`<br > ` { language: 'html' } ` <br> ` { language: 'vue' } ` |
| | `astFragment` | ast node to be inserted into the code | Node | `{ content: astNode }` |
| | `isProgram` | Whether to return the complete ast<br>js The outermost node of the complete ast is of type File <br>html complete ast is of type document | Boolean | Default is true |
```typescript
$('var a = 1');

$(astNode);

$('<div></div>', {
  parseOption: { plugins: ['jsx'] },
});

$(`Alert.show({content: $content$ , type: $type$ })`, {
  astFragment: {
    content: contentNode,
    type: typeNode,
  },
});
```

### $.loadFile(path, options)

Same role as the constructor, the first input can be a file path, directly construct the contents of the file to AST instance.

### AST instance Detail

The AST instance contains all chain-callable APIs, which will be described in the next section.

Now let's introduce two concepts, `Node` and `NodePath`

#### Node

A separate AST node with the following structure, with different statements corresponding to different types and attributes

<img style="width:500px; display:block" src="https://alp.alicdn.com/1612753991244-1062-596.jpg"/>

#### NodePath

Current ast node structure and its path information

#### Attributes on AST instance

- 0-n

An AST instance can store multiple ast elements, obtained by integer index

| Parameters | | Description |
| -------------- | -------- | -------------------------------------------------------- |
| `nodePath` | `node` | ast node |
| `parent` | the parent of the ast node |
| `parseOptions` | | The parsing parameters passed in when constructing the AST instance |
| `match` | | the nodes in the complete node that are matched by the wildcard |
| `node` | node structure, same as node |
| `value` | The simplified node structure, or the string value if the node is a string type |

- node

Get the first ast node on an AST instance

- match

Get the node matched by the wildcard in the first ast node on the AST instance, as explained in `.find()`
