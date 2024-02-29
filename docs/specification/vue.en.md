---
title: Support for Vue
order: 5
---
Call `$()` to construct a piece of code or an ast node as the core AST instance of GoGoCode

### $(code, options)
| Input parameters | | Description | Type | Example |
| --- | --- | --- | --- | --- |
| `code` | | The code or AST node to be instantiated | string NodePath Node | `'var a = 1'` |
| | | Supports inserting an ast node in the code, then instantiate it, and use it with the `astFragment` input parameter. The ast node occupies the form of `$_$astNodeName$_$` | string | `Alert.show({ content : $_$content$_$ })` |
| `options` | `parseOptions` | Basically the same as the options of babel/parse<br>The only difference is that when parsing html, it needs to be defined as `{html: true}` | | `{ plugins: ['jsx'] }` |
| | `astFragment` | A map of ast nodes to be inserted into the code | | `{ content: contentNode }` |

```typescript
$('var a = 1')

$(astNode)

$('<div></div>', {
  parseOption: { plugins: ['jsx'] }
})

$(`Alert.show({content: $content$ , type: $type$ })`, {
  astFragment: {
content: contentNode ,
    type: typeNode
  }
})


````


### $.loadFile(path, options)

<br>

The same as the constructor, the first input parameter can be the file path, and the file content is instantiated directly

<br>

### AST example details

<br>

The AST instance contains all the chainable APIs, which will be introduced in the next section

First introduce two concepts, `Node` and `NodePath`

<br>

#### Node
Independent ast node, the structure is as follows, different statements correspond to different types and attributes
<img style="width:500px; display:block" src="https://alp.alicdn.com/1612753991244-1062-596.jpg"/>

<br>

#### NodePath
Current ast node structure and its path information

<br>

#### Attributes on AST instances

- 0-n
An AST instance can store multiple ast elements, which are obtained by integer indexing

| Parameters | | Description |
| --- | --- | --- |
| `nodePath` | | ast node and path |
| `parseOptions` | | Parsing parameters passed in when constructing an AST instance, basically the same as [babel/parse's options]([https://babeljs.io/docs/en/babel-parser#options](https:// babeljs.io/docs/en/babel-parser#options)) consistent |
| `match` | | nodes matched by wildcards in full nodes |
| | `structure` | Node structure, same as node |
| | `value` | Simplified node structure, if the node is a string type, it will be a string value directly |

- node

Get the first ast node on an AST instance

- match

Get the node matched by the wildcard in the first ast node on the AST instance. For details, see `.find()`