---
title: Basic Tutorial
order: 1
---

## The basic flow of one code conversion

![CodMod](https://img.alicdn.com/imgextra/i2/O1CN0189h5A61dXiON3ZhjR_!!6000000003746-2-tps-2800-664.png)

The above diagram outlines the four processes of a single code conversion, and our next tutorials will follow these four steps in sequence.

1. Parse the code into an abstract syntax tree (AST)
2. Find the code we want to change
3. Change it to what we want it to look like
4. Generate the code back into string form

## Parsing Code with GoGoCode

First we install and introduce GoGoCode

```
npm install gogocode --save
```

```js
import $ from 'gogocode';
// or for commonjs
const $ = require('gogocode');
```

We borrowed jQuery's $ naming to make the code easier to write!

To parse different types of code using GoGoCode.

```js
// source is the string of the code to be parsed

// parse JavaScript/TypScript files
const ast = $(source);

// parsing html files requires the language to be specified in the parseOptions passed in
const ast = $(source, { parseOptions: { language: 'html' } });

// Parse the Vue file
const ast = $(source, { parseOptions: { language: 'vue' } });
```

> Tips: The code snippets in this tutorial you can try right now in [GoGoCode PlayGround](https://play.gogocode.io)!

![playground](https://img.alicdn.com/imgextra/i4/O1CN01olgSUR22vPH6OJwJk_!!6000000007182-2-tps-1992-1012.png)

You can switch the code type in the drop-down box as shown, and the corresponding sample code will be provided on the right side.


## Selecting code by code selector

After parsing the code from a string into an AST, we move to the second step, finding the exact AST node we want to modify from an entire section of code.

### ast.find Code Selector

Unlike other code conversion tools that match syntax tree nodes by AST type, GoGoCode provides a more intuitive way to "find code with code".

Suppose you want to pick the function named log in the following code.

```js
function log(a) {
  console.log(a);
}

function alert(a) {
  alert(a);
}
```

Simply use the **find** method as follows.

```js
const ast = $(source);
const test1 = ast.find('function log() {}');
```

GoGoCode will automatically match the `function` node named `log` based on `function log() {}` and return the child node that meets the matching criteria.

### Use `generate` to output nodes as code strings 

Just call `.generate` on the AST node you found, and you'll get the code string for that node.

```js
const ast = $(source);
const test1 = ast.find('function log() {}');

const code = test1.generate()
// code is the following string.
// function log(a) {
// console.log(a);
// }
```

[Playgroud Online Demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3Z5CxUmXr8ATnAbM2HBWmWrxIADQgA7kkUBrZOiy58REuTiL6EbjhMBbWjjD8AkhFd68lBggUhQss5q7GScPHBkACRkALxBYALUNEhc6NGxzvG8MIoEaClkXr7+SAJFJWh5XAXy3PGpCbR1pYyNcWRwaK0AjOX0rQJeECi0AOTStnLCtGpiMz0cimhwxfaDcEMZaBBa9APL4uz64NDwADJO1FZwAJ5QgwSKYOFXABZjAAqbODELRYBwwNAGbgwABGADUwGhDAAVV4YbAONAYMRAA)


#### \$\_\$ Wildcard

Suppose you want to pick out the declaration and initialization statements for the variable `a` in the following code.

```js
const a = 123;
```

As previously described, we can simply write it like the following.

```js
const aDef = ast.find('const a = 123');
```

But this only matches to ``const a = 123``, not to ``const a = 456``. In real code matching, we are often not sure of the whole code, so GoGoCode supports fuzzy matching using wildcards: 

```js
const aDef = ast.find('const a = $_$0');
```

Replacing the original `123` with `$_$0` will help you match all statements that initialize `const a`: 

```js
// each of the following statements will be matched
const a = 123;
const a = b;
const a = () => 1;
// ......
```

The node at position `$_$0` can be obtained by using the `match` property of the query result.

```js
const aDef = ast.find('const a = $_$');
const match = aDef.match;
```

As shown below, `match` is a dictionary structure, the number after `$_$` is the index of `match`, and the collection of ASTs matched by `$_$0` position can be retrieved by `match[0]`.

This collection has only one element, corresponding to `123` in `const a = 123`, and you can get the original AST node corresponding to it via `node`, or the fragment of this node in the code directly via `value`.

![match structure](https://img.alicdn.com/imgextra/i4/O1CN01yPrWjC25tytEoAb80_!!6000000007585-2-tps-756-562.png)

> Tip: Using the debugger more often to see the intermediate results is a good way to write code conversions

[Playgroud Online Demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABAIbEC8xAjAEwDMA3ADoQD0bxe6xARmgBskAdy6kIZAQSR80xAGZIYEFHwCexACQB9TQAZWHLviJlKfFu055CJclQAUASkoA+GoxAAaEMKQAnAGtkdCwQeWUcODB8Yjh-cQJFfwBbB3kwATQASQhFLzIoMAKkKGiTF2BWYmNbLXNSIoA6AHMkNu40atrTaRh-HDkqDKzcxSa+ga6JHrtTKk0HScGnbptTUgARNHkGoiaMlQcAcnW7cx19Y9WZs+IU0jgcAAsG7fkmh6fn7qN0XhgLRaaH83X8aDg-QkXxeAG09ABdeEIpoAN1IAhg0wAvqxvOBoPAADLiFphOBqKBoAg4fxgMr456kAgABXBcGiIKw8gxBDQPgIMF4ADUwGhhAAVSkYbDxNAYbFAA)

#### Collection operations

Going back to this example.

```js
function log(a) {
  console.log(a);
}

function alert(a) {
  alert(a);
}
```

If we use wildcards, we can match all function definitions by name, so the result of the `.find` query could be a collection

``` js
// fns is a result set containing all function definitions by name
const fns = ast.find(`function $_$0() {}`);
```

This result set `fns` has the same type as `ast` and has exactly the same member methods; if there are multiple elements in the set, using the methods directly on them will only work on the first AST node.

We provide the each method to iterate through this result collection, and the following example collects the function names that are matched into an array named `names`.

```js
const fns = ast.find(`function $_$0() {}`);
const names = [];
fns.each((fnNode) => {
  const fnName = fnNode.match[0][0].value;
  names.push(fnName);
});
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3Z5CxUmXr8ATnAbM2HBWmWrxIADQgA7kkUBrZOiy58REuTiL6EbjhMBbWjjD8AkhFd68lBggUhQss5q7GScPHBkACRkALxBYALUNEhc6NGxzvG8MIoEaClkXr7+SAJFJWh5XAXy3PGpCbR1pYyNcRXO5fStAl4QKLQABtK2cgkA+gkADLRqYhM9HE2tZBD0bmjc5QDaALp5OM4CaPQEABa0nhAAcqhozMkAfCx5MVvxF089mVUgDXgI3PQ4HcjosTjCTgIAG4KGANDgxXb7bgCWDce4AoEbGJiIlkRRoODFciYg4CABWSEgtAA5HpmRsJBB9OBoPAADJOahWOAATygBwIijA4W5tyGAAVyXBiFosDgFNw0AZuDAAEYANTAaEMABUxRhsA40BgxEA)

#### Using multiple wildcards

Sometimes we need more than one wildcard character, you can write `$_$0`, `$_$1`, `$_$2`, `$_$3` ...... in the code selector to achieve your goal.

Let's say you want to match the two parameters of the following function.

```js
sum(a, b);
```

```js
const sumFn = ast.find('sum($_$0, $_$1)');
const match = sumFn.match;
console.log(`${match[0][0].value},${match[1][0].value}`); // a,b
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDOMC2AFAIYA0ABAEYCUIpIA7kgE4DWy6WIAZjBAMZwwSCOTjNiEHNxZFuYADZoAkhBkViUMBSRQhInNXLAAOqPL8DccgBJyAXnKawAOgDmSD5fRnyFq+Q4SDDM-GgO5PJKqjIuQSFhvv5S1sQ41o42hPGhaNRJlimBBABioo5pcC7yECiEAOR4RDYA+jYADBStNgCM1PX55oXp5PjEcPwAFhFNZS5jE5NJzGhwIaIABjbAC1MA2u0AugeHLgBuxAowaAC+pNu7k3s9x0fnl9c3G2Y3ZnTg0HgABlJG4uHAAJ5QNA4fjMMB6f6TNIABRWcCEaGYWG4lxwaHoeEoADUwGgGAAVKEYbDiNAYG5AA)

#### Match multiple nodes of the same kind

Earlier we learned about using the `$_$` wildcard to do fuzzy queries, suppose we have the following code.

```js
console.log(a);

console.log(a, b);

console.log(a, b, c);
```

Their parameter lists are not the same length, what will be the result of our search with the following selectors respectively?

```js
ast.find(`console.log()`);
ast.find(`console.log($_$0)`);
// The above two statements will find all three lines of code

ast.find(`console.log($_$0, $_$1)`);
// This statement will find the first two lines of code

ast.find(`console.log($_$0, $_$1, $_$2)`);
// This statement will only find the third line of code
```

You can see the principle of GoGoCode's wildcard matching: the more you write, the more restrictive the query will be.

If you want to match any number of nodes of the same type, GoGoCode provides wildcards of the form `$$$`, and for the above statements with indefinite parameters you can uniformly use `ast.find('console.log($$$0)')` to match.

Instead of `ast.find('console.log()')`, you can use `$$$` to catch all similar nodes in the placeholder by using the match property. For example, use it to match `console.log(a, b, c)`.

```js
const res = ast.find('console.log($$$0)');
const params = res.match['$$$0'];
const paramNames = params.map((p) => p.name);
// paramNames: ['a', 'b', 'c']
```

As before, we can get the array of nodes `params` matched by the wildcard `$$$0` from inside `match`, the elements in this array correspond to the AST nodes `a`, `b`, `c` respectively.

![match](https://img.alicdn.com/imgextra/i3/O1CN01zbO62T1ZdQsYRGT5l_!!6000000003217-2-tps-734-536.png)

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOSANmgHTFIDmAFAIYA0ABAEbM4CUIDIA7kgCcA1snRYQAMxgQccMPiZwBdQhMEBbGhLCkAkhDXM6UMMyRQ5+AhybAAOhCZM8hOEwAkTALxNjYMlTUSHjoDk4uBG5EMAI4aN5M2noGSGTRsWhhzlZudJEJ7jTpcRxZEW4CaAQJeXBk2hAoNADkESTklLTu3QAMHM2ljtmuTFB0yurVPpUEZOp0cDgAFgDazd3uPc0AulmVcDGOYxOz81A0UN4AfKNkEHTqaIMAvg7c4NDwADIqVOJwAE8oFUcAIwBZ3ks8gAFfZyNACLBKGBoHgEGAsABqYDQvAAKkCMNglGgMM8gA)

There is a lot more to `$$$` than matching indefinite parameters:

Match all the keys and values of a dictionary named dict and print

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

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABCmDiQLzHAA6ExxAhpsQIwA09jARqwExcGxHKwDkAMzFCAviA4gA7kgBOAa2TosICTAgUw+YnBVNCE1QFsAFBLAAbNAEkIFjsyhh3SKHEOEAShpuEXwiYgASYmomTwA6AHMkJLx0ELxCEgIkGBUcNGjiO0cXCzjs3Pz0sJImcOoI6wq8tADqzOIVNAJCurg4uwgUazEM8LIKQuBIiIiABmIZMTbhMZI1ADce6i6COMsmOBwACwBtMVn5sQBdEK64XIZNvYOoa03ogD5iAAMI4E2cTUaAAnnEIExLGgZJh-oCNkx7DA0HEEUjoT8VvQZPR5OBoPAADJmBLaOAgqDdHAqMC+PHHOoABXufjQKiwEkRBDQCgIMB4ADUwGhFAAVCkYbAmNAYGRAA)

### ast.has

We use `.has` to determine if a piece of code is present in the source code, e.g.

```js
if (ast.has(`import $_$0 from 'react'`)) {
  console.log('has React!');
}
```

You can tell if this code imports the React package, which is actually equivalent to.

``` js
if (ast.find(`import $_$0 from 'react'`).length) {
  console.log('has React!');
}
```

That is, determine if there is a lookup for at least one matching statement.

## Replace the code

With the above tutorial, I'm sure you've learned how to find specific statements in your code based on code selectors and wildcards, so let's move on to step 3 and change the found statements to what we want.

### The almighty replace

We often use the "find/replace" function to do some basic operations when making bulk changes to our code in the editor, but they are all based on strings or regular expressions and are not compatible with different indents, line feeds and even with or without semicolons. AST-level code replacement can be done in a form close to string replacement.

#### Function renaming

Recall our first example: the

```js
function log(a) {
  console.log(a);
}

function alert(a) {
  alert(a);
}
```

If we want to rename the `log` function to `record`, it's very simple to do it with `replace`: ``

```js
ast.replace('function log($$$0) { $$$1 }', 'function record($$$0) { $$$1 }');
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3Z5CxUmXr8ATnAbM2HBWmWrxIADQgA7kkUBrZOiy58REuTiL6EbjhMBbWjjD8AkhFd68lBggUhQss5q7GScPHBkACRkALxBYALUNEhc6NGxzvG8MIoEaClkXr7+SAJFJWh5XAXy3PGpCbR1pYx5efStAopoUBT0pbQA5NK2csK0CQsADGqJCwCMZGITelM2EWRDXIoo80srCwkbWz0QeUNwxeT9cBloEFr0cGi0N+Ls+uBoPAADJOahWOAATygaG4BEUYHCAIAFv0AAr3YhaLA4BTcNAGbgwABGADUwGhDAAVaEYbAONAYMRAA)

`replace` takes two arguments, the first is the code selector, the second is what we want to replace it with, we use `$$$0` to match the list of arguments and `$$$1` to match the statements inside the function body, putting them back in their original position in the second argument ensures that the only thing that has changed is the name of the function.

#### Enumeration list property renaming

We often use enumeration lists such as

```javascript
const list = [
  {
    text: 'A-strategy',
    value: 1,
    tips: 'Atip',
  },
  {
    text: 'B-strategy',
    value: 2,
    tips: 'Btip',
  },
  {
    text: 'C-strategy',
    value: 3,
    tips: 'Ctip',
  },
];
```

One day, in order to unify the various enumerations in the code, we need to rename the text attribute to name and the value attribute to id, which is difficult to match exactly with a regular and easy to miss, with GoGoCode we just need to replace it like this

```javascript
ast.replace(
  '{ text: $_$1, value: $_$2, $$$0 }',
  '{ name: $_$1, id: $_$2, $$$0 }',
);
```

where `$_$1` and `$_$2` match the `value` node of the name, and `$$` matches the rest of the nodes, kind of like `...' in es6. `, this code matches the `text` and `value` values and fills in the `name` and `id`, leaving the rest intact.

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABADZhHEC8xA2gDoTHHCPPNxoAecmx9IAIKA1b0CmrgIA0bdgDcAhqRho+ARilN2cMFAJ8BgrVEnSAvuuasNHbr34gAQmONXi8xcuIAmc5u2679obOzGbSluzEnDx6IAhOID7Mbkp8AMyJkX4xCEEJpuoAugDcCSAA7kgATgDWyOhYIABmMBA4WviRlXKEjVUAtgAUjWCkaACSEL0SxHJQYNNIUO2EAJQs0niEJAAk1DNzAHQA5kgneOgb+JQESDCVOGh7w6MTvQc3dw+XWzOUNNsDD73NArRjSOREA6VNBQUhyB4DaQAcmAkRsfG2AH1tmpXAoUsQsdtvITttsAAzEExInwo4gQOR9DxE3FgFAY7EkskUqlI6SgiDSaFwO5MCFwY5oCBoLqcAYCkyMUqQWBwAAy3SODTgAE8oGgCDhKto4KUABYQgAKwq0MqwjQUBDQEhABBgACMAGpgNBlAAqeow2Dg0IwJiAA)

#### JSX tag attribute replacement

For a more complex example, make this change to a piece of code:

- import from antd instead of @alifd/next
- h2 text: Before to After
- change value of `type` in Button as follow: normal -> default，medium -> middle
- change `text` in Button to `type="link"`
- change `warning` in Button to `danger`

```jsx
import * as React from 'react';
import * as styles from './index.module.scss';
import { Button } from '@alifd/next';

const Btn = () => {
  return (
    <div>
      <h2>Before</h2>
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

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBc4C2UkBOcABAFTECGAzsQEpoUDGJAZgUjsQOQEPNcBuADoQweQiXLViVOAE8ANmhpsO3AHQB6SOgAe6nKhhL1VRlSqCRY-EWLBiAIXhwkEYgF9iqzkJAABCgUwFhRNCDRdOD9hCBFGN1knOHcAXmIACgBKYlSAPnsRYmJeOBgCdwyi4uIAHhQwADc86pq6gAsAJjzAG3jARejAWSVazS6W9za6hubWidrnOFd3eSg0VL8IQhwgvzyAOU2g4fnFsYmauZc3YmXVvygCMQoCOR2ABQeCLeejy4hTs7qxyuNzWICoaASEBQTxeIDyAGUIW5od9NEC-jM2pjzujrnIVqCNp9tiBrpE4HsDgofgs3P8zhdaUt8bcQPdHs8-GSonl3hy5DSTtjiozFniCX5wZCUbDuRTEdKYYK6cLiKrRcCWYSqVyAO5PUQQADmlOJ1LRv3p500Uytw1t1SysQ8sREkVsJHQLAoxhIjhSAhAABoQLrCABrZDoLAgFgwCDMMDAggUCBUFibDIsMBKACSEAzQcoUDARaQUDgSbTOWA1UhSQAJLli2B1EakO2Eug64kSFQkOVGGhm9m8wWkKYBwQhz20yRqCR0g2Mv3B2gsiJqguZupeFAFEw0FVxm0AAY2CT2YgNm8ABk83nYvgCQRCYQiUT8p6D2PP4jsDg3g295eD4aogKmcAoF+MwbiexC7mg+6Hhkp61KM-RDCM3TfsQaEYX0gBwKsMoynnBbSIchQ7HmcaG4iC6w6qSQG3nkyp-N+v4asyEogF6PoKNEzF3mxFpMnkp6wTue4HtRXG4lQYAAF6sjgaANDAOBcixonohJP7wcUdG-DIymqWAKAoEo2kiexElSfBlGyUe8kmXA5LXrZYknJxhl4dx4qssEEDhjZwG6ZaknweRNROShrlMsQ+oVJARqeeFdm+bRAXQsaaAEOlrGZQ51SlOU7gLm2aARCm7nZCIHgiMG4DQPAAAyqZGjGNxmA8FbNe01DvGgCxgPlWDego4IhlQMAAEYAGpjbqAAqLIxgkeBPBgHhAA)

#### More complex substitution with functions

If you need more freedom in the replacement, you can also pass a function to the second parameter that will take the `match` dictionary as an argument and return a new piece of code to replace the matched code.

Suppose we have the following constant definition.

```js
const stock_code_a = 'BABA';
const stock_code_b = 'JD';
const stock_code_c = 'TME';
```

Want to bulk change their variable names to uppercase strings:

```js
ast.replace(`const $_$0 = $_$1`, (match, node) => {
  const name = match[0][0].value;
  const value = match[1][0].raw;
  return `const ${name.toUpperCase()} = ${value}`;
});
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABEUjgNYD6e6VAhsQLzEDkAQgIJesA6EeQiTKUaqNFQBGzNgCkAInwH4ipOOWq0JOGawAqAWQCirEABoQAdyQAnCsnRYQAMxgC4YfMTg36hZ7YAtgAUzmAANmgAkhABZsT0UGDxSFAeKgCUxMD8xMSCqgAkMolgAHQA5khVWrn5KsJIMDY4aDJhkTEBZQRNLWh1BST0qiyFwb3NrRn8dSNwZTZoUOH0rcEABkPEhVSFAAwyu4UAjBvxwYH0cDgAFvEQ4llMAHzZdXnbEPSBbSxXN1uAG19gBdEGgsoAN3o4RgAwgeU+DWIMLhf2IALuQJO4LBi3olg+xCWcGaiK2KMKwG+vzK6gAqlAoGgbAgRmhghkAL5HYBo+HcjZ1bkzCB1UnkhJESpoCCs66csXc-jmcDQeAAGT8FSccAAniyCDgbGA0mrbiMAAqkjysrDOWEENAWAgwSQANTAaEsekNGGweECUHoSxA3KAA)

### replaceBy

In addition to replacing code with `.replace`, you can also replace this statement directly with `.replaceBy` after `.find` has found the corresponding statement, for example, if we want to rewrite `console.log(a)` inside the `log` function to `alert(a)` without accidentally hurting the outside statement.

```js
function log(a) {
  console.log(a);
}

console.log(a);
```

You can chain `.find` to `console.log(a)` inside the function and then replace it with `.replaceBy`

```js
const console = ast.find('function log($_$0) {}').find('console.log($_$0)');

console.replaceBy('alert(a)');
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABADZIDmAFAIYCUZwAOuWQaQM5IVoA6KnSbsAvu3ZcIvfkJoNGIADQgA7kgBOAa2TosufERLk4m+jJxaAtrRxh+ASQhXlZelDBukUYj2ZsHNLccGQAJGQAvO6eAtQ0SFzo7GScPKG8MJoEaFFk9k4uSAKZ2WgpaTKh9CF5YbSlOYySQemVsrnRNXAVqQL2ECi0AOR4hH7kwrRhAPphAAwBYsPNHH0DQ8PBfIJTswuMKy2p23KaaFAU9DkAQgCeI-T8mnCKRxAV53BZ5N1xaBA0OY4GhaKsJBAVOBoPAADIWagGOB3KBobgETRgXxQgAWNQACl9iECsDgntw0KpuDAAEYANTAaDUABUURhsFxrFB6OcQGIgA)

## Insert code

Now that we've learned this, we can try to solve a more complex code conversion problem!

Here is a snippet of code from the React documentation:

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

The documentation tells us that the callback function for the `React` event needs to be specially bound to `this` in the `constructor`, so let's remove the binding statement `this.handleClick = this.handleClick.bind(this);` and consider writing a conversion logic that uses GoGoCode automatically recognizes the callback function `onClick` in JSX and adds the binding statement in the `constructor` for us.

### Inserting code with replace

The almighty `.replace` is not just a simple replacement, use `$$$` to capture and fill in the original content, then add the statement you want to insert to achieve the operation of inserting code, the following are the detailed steps.

```js
const ast = $(source);

// find the statement defined by reactClass
const reactClass = ast.find('class $_$0 extends React.Component {}');

// find the tag with the onClick attribute in jsx
const onClick = reactClass.find('<$_$0 onClick={$_$1}></$_$0>');

// Create an array to collect the names of the hanlder corresponding to onClick
const clickFnNames = [];

// It is possible to find many tags with onClick, we use each to handle each one here
onClick.each((e) => {
  // use match[1][0] to find the handler node corresponding
  // to the first onClick attribute matched by $_$1
  // take the value as the node name
  // handlerName = 'this.handleClick'
  const handlerName = e.match[1][0].value;
  clickFnNames.push(handlerName);
});

// Replace the original constructor, but use $$$ to keep the original parameters and statements, just add the bind statement at the end
reactClass.replace(
  'constructor($$$0) { $$$1 }',
  `constructor($$$0) { 
    $$$1;
    ${clickFnNames.map((name) => `${name} = ${name}.bind(this)`).join(';')}
  }`,
);
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZm8RNEnw9yREBhBEEaEjpAA2gBdQPyYO3TI5LV1AvhkgxyAoeMnVMZm4QD4PYCzgCMX2xs-TLUrvYH9z4oecmk0-taytMWKxpFeKDoymbra1kOefBv6UH2Uhx1r19St6sD7WgwfCCF4ODOB2K5dh26Zdnw9QEHgUTfh+jaAe4sBEEeb4AS2-oklWjgjmGhDjnUUCEFaRzbAmbqqOoWjqkx6b5MmTErgkkLkscAAGtb0VcjHMaxPxseqK5LF0ybAPWORoXhRCiXIIFSseEB4UYPhtDx6rAOprbRFqun6TEfBnJOmjPAYPFVlJph8AAVkgkDxnYlbol00Q8Y4hGrGU+yyNGVCsFY1R5DI6IUuA0DwAAMqkVCMnAACelhEDgyhgFAcBRSkRAAAq7PKVhYJEaCUuYZwAGpgGgVLkKlGDYAowgEHUIDREAA)

### Add some lines to a function with append, prepend

You can also use the `.append` method to insert code, `.append` supports two parameters

The first parameter is where you want to insert it, you can fill in `'params'` or `'body'`, which corresponds to inserting a new function parameter and inserting it into the block wrapped in curly braces, respectively.

Let's use `.append` to achieve the same thing we just did: `.

```js
const ast = $(source);

// find the statement defined by reactClass
const reactClass = ast.find('class $_$0 extends React.Component {}');

// find the tag with the onClick attribute in jsx
const onClick = reactClass.find('<$_$0 onClick={$_$1}></$_$0>');

// Create an array to collect the names of the hanlder corresponding to onClick
const clickFnNames = [];

// It is possible to find many tags with onClick, we use each to handle each one here
onClick.each((e) => {
  // use match[1][0] to find the handler node corresponding 
  // to the first onClick attribute matched by $_$1
  // take the value as the node name
  // handlerName = 'this.handleClick'
  const handlerName = e.match[1][0].value;
  clickFnNames.push(handlerName);
});

/** The above code is the same as before ***/

// Find the constructor method
const constructorMethod = ast.find('constructor() {}');

// Add a bind statement to its function body
constructorMethod.append(
  'body',
  `
    ${clickFnNames.map((name) => `${name} = ${name}.bind(this)`).join(';')}
  `,
);
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZm8RNEnw9yREBhBEEaEjpAA2gBdQPyYO3TI5LV1AvhkgxyAoeMnVMZm4QD4PYCzgCMX2xs-TLUrvYH9z4oecmk0-taytMWKxpFeKDoymbra1kOefBv6UH2Uhx1r19St6sD7WgwfCCF4ODOB2K5dh26Zdnw9QEHgUTfh+jaAe4sBEEeb4AS2-oklWrpqn2aqqOoygALJlM4qBatGsZTgmbpkVcWj5BWhE1sxaisVRLioHwUqWHGxyQmcqAAJ6QuSxwAAY-MmwD1jkaF4UQClyCBUrHhAeFGD4bSyeqwC6a20RasZpkxHwZyTpozwGLJVZdF0fAAFZIJA8Z2JW6JdPJ8ScXIuz7LI0ZUKwVjVHkMjohS4DQPAAAyqRUIycASZYRA4MoYBQHA8UpEQAAKuzylYWCRGglLmGcABqYBoFS5CZRg2AKMIBB1CA0RAA)

Using `.prepend` is exactly the same as using `.append`, except that the statement is added to the top.

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZm8RNEnw9yREBhBEEaEjpAA2gBdQPyYO3TI5LV1AvhkgxyAoeMnVMZm4QD4PYCzgCMX2xs-TLUrvYH9z4oecmk0-taytMWKxpFeKDoymbra1kOefBv6UH2Uhx1r19St6sD7WgwfCCF4ODOB2K5dh26Zdnw9QEHgUTfh+jaAe4sBEEeb4AS2-oklWrpqn2aqqOoygALJlM4qBatGsZTgmbpkVcWj5BWhE1sxaisVRLioHwUqWHGxyQmcqAAJ6QuSxwAAY-MmwD1jkaF4UQClyCBUrHhAeFGD4bSyeqwC6a20RasZpkxHwZyTpozwGLJVZdF0fAAFZIJA8Z2JW6JdPJ8ScXIuz7LI0ZUKwVjVHkMjohS4DQPAAAyqRUIycASZYRA4MoYBQHA8UpEQAAKuzylYWCRGglLmGcABqYBoFS5CZRg2AKMIBB1CA0RAA)

### Inserting code with before and after

For the React component example above, if you want to add a log that prints `state` before and after each `setState`, you can use the `.before` and `.after` methods, which will insert the arguments passed in before or after the current ast node.

```js
const ast = $(source);

const reactClass = ast.find('class $_$0 extends React.Component {}');

reactClass.find('this.setState()').each((setState) => {
  setState.before(`console.log('before', this.state)`);
  setState.after(`console.log('after', this.state)`);
});
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYViq3TtuLwMsQyH4PXxBWxNJD8BHSOqAPrqgAMDGYrHYpC4PH4QhEYggEmA0UhAZmq1DiEIJBjkBQ8eepQqVRYeUrfFDzh9ZTG1ranVMRAHHbQfDOaF5dU0AAMTUg6Hw8NR49PZ2hIRLW4D-fOq10x+3qnwCEyWFpF4pl5O11R4xerzuIv8PBODIeSUfHLt9rI0ZUKwVjVHkMjohS4DQPAAAyqRUIycAAJ6WEQODKGAUBwFBKREAACrs8pWFgkRoJS5hnAAamAaBUuQqEYNgCjCAQdQgNEQA)

## Remove code

After our previous efforts, we wrote a conversion program that added `.bind(this)` to all the callback functions in the original code, and then you read back half a page of the documentation and found that you could write it like this

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // The following line is no longer needed
    // this.handleClick = this.handleClick.bind(this)
  }

  // from class member method to public class fields syntax
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

First, this tells us that to learn a new tool, the documentation must be read in its entirety, otherwise we will be left with regrets.

Secondly, we might consider writing another conversion tool to convert the code to this, without regrets!

Let's start by using the almighty `replace` to convert the callback function `handleClick() {}` to `handleClick = () {}`.

```js
const ast = $(source);

// find the statement defined by reactClass
const reactClass = ast.find('class $_$0 extends React.Component {}');

// find the tag with the onClick attribute in jsx
const onClick = reactClass.find('<$_$0 onClick={$_$1}></$_$0>');

// Create an array to collect the names of the hanlder corresponding to onClick
const clickFnNames = [];

// It is possible to find many tags with onClick, we use each to handle each one here
onClick.each((e) => {
  // use match[1][0] to find the handler node corresponding
  // to the first onClick attribute matched by $_$1
  // take the value as the node name
  // handlerName = 'this.handleClick'
  const handlerName = e.match[1][0].value;
  clickFnNames.push(handlerName);
});

clickFnNames.forEach((name) => {
  // Eliminate the preceding this. Get the pure function name
  const fnName = name.replace('this.', '');

  // change class method to public class fields syntax
  reactClass.replace(
    `${fnName}() {$$$0}`,
    `${fnName} = () => {
        $$$0
    }`,
  );
});
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1lSaJlHZwI2OgQ8MBwAa00jaXi5FzcPNDgAZTgvNG1lNAA3SurfAD5STQLTUwDqWjRQ8IBCHQamlj4eoP6IRzlogwM4uaT4urYrPONC0jq4GGVZTVnTAB4AI3g4UVJRDKzsn2Bi9xS0tDuc6JbjrqfXd0840mfVCpAA-KQAOTBABykNI4WhADEkZDEts5CcAPQXOBXCDfbaLRzo6IgAA0IAA7hpssh0FgQAAzGAQXhga4qVJEJkaQSaJlgOgASQgvPJpAIUDAEr0cA5EEMWzkCkVEgAJL5JdK+FRqEgFOhHKqlKQiEh9jh6H5BSKxUgPBblFbjYoJMQJH51ZpzZa0AYVnIsVjSIA-I0ADEo7bi8DLEMiALO1AJJygBC3QC30YBT5VdaqjPEQhBIWo9fEFbE0kPwcdI6oA+uqAAwMZisdikLi5gRIYSicSSaKQgMzeLBsORgBWREYpEAM4mAI3TAGR6gEhzG4QD7ZUiAPR1AOQGycA4BaAP28s6bbpkclq6rnYyRi5AUGWTjX68vV48HwBGL7Yh91lr9wOkYeANhKgBfeoAAHKAFRygAOpoAI36ABSugCm5oAbKaAGNpT4nmugCf2oAKXrJqQrx4OgyikMmgCwKoAD56HhI+D3EiEAwgQghoGQfgANoALp-sOC6APfKgC-ARGgAR+oAWJpgYuqH3ER+6ADD-gCIRoAN3KAJvxU4wQwPDOKQgDdyoAIJqAGAugDz1iBgCG5o4x73Hw0bOJomj+q0yqmMOymCF4ODOMxr6scxdasaQcERlWtavqQgCcyoAsonhsmgA03uBYmnluWE4a8KB0IRgBBQYAnQ7HMOgBryqQ9QEHgUSkIAzsqAFxyaXERlIYJUldEMVqkLPHwVXvGhkLHCaEhNcoNXWgwfCOXAzmue5nl8Ll+VoG1aE0d17iwEQFmdd1A5zAOxpTbR9GMcWGgAKKqZZECbUYPhtJ0dkhoAKkqACZpgCRxoAskozjhDWkIA7cGAOn6gD1foAnT7JoAv4oQeV2ztaQTIbbVfiHQxfB1FAhBWmWDWQhKkK-oOXTnjG+buDDcM1D8pAAAbqsAoPddEmzAOqVN1tEBPkvjRMk2DMRapsJ22V0chU-W+O08cy0JKtqxlPsshFlQrBWNUeQyOiFLgNA8AADKpFQjJwAAnpYRA4MoYBQHA8spEQAAKuzylYWCRGglLmGcABqYBoFS5Baxg2AKMIBB1CA0RAA)

Now let's see how to remove the original `.bind(this)` statement.

### Deleting code with replace

The easiest way to delete a statement is to replace it with an empty one by replacing it with

```js
clickFnNames.forEach((name) => {
  // Get the pure function name by eliminating the preceding this.
  const fnName = name.replace('this.', '');

  // change class method to public class fields syntax
  reactClass.replace(
    `${fnName}() {$$$0}`,
    `${fnName} = () => {
        $$$0
      }`,
  );

  // Remove the original bind
  reactClass.replace(`this.${fnName} = this.${fnName}.bind(this)`, ``);
});
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1knV3dnAjY6BDwwHABrXwjEvmTUtHTMrL4AI0gUTRc3A0domUdClDSM7M0jaXi5WvciNDgAZTgvNG1lNAA3EbHfAD5STW7TUwDqWjRQ8IBCHWnZlj51oK2IRzlogwM4y6b4ybYrTuMe0km4GGVZTQvTAB5yvA4KJSKIStkfMA+gUUq1iu0stF5n9VtD8p4jidNqFSAB+UgAcmCADlCaRwsSAGJUwmNN5yf4AeiBcBBEBRbxuDRk0RAABoQAB3DRZZDoLAgABmMAgvDAoJUKSIUo0gk0UrAdAAkhBVfzSAQoGADXo4AqIIZXnIFJaJAASXJGsB8KjUJAKdCOW1KUhEJBfHD0PyanV6pAeAPKIPexQSYgSPz2zT+wNoerneJMpmkQB+RoAGJXe3F46WIZEAWdqASTlACFugFvowCnyrG7UWeIhCCQnUo+Jq2JpCfgy6R7QB9e0ABgYzFY7FIXFbAiQwlE4kk0UJGcc2bzhYAVkRGKRADOJgCN0wBkeoBIczBEAhOUAejqAcgNq4BwC0Aft5N33gxG5Sat0skbtVH2-wjuOV43lCIEAIzIsyIFjvM673HIW6ANhKgBfeoAAHKAFRygAOpoAI36ABSugCm5oAbKaAGNpYFfoAn9qACl61akIUeDoMopDVoAsCqAA+e74SPgpRUhAJIEIIaBkH4ADaAC6SGkFu56APfKgC-AQWgAR+oAWJpYRelGlKxr6ADD-gCIRoAN3KAJvxh4EQwPDOKQgDdyoAIJqAGAugDz1hhgCG5o4n6lHwxbOJomjpgs1qmFu5mCF4ODOGJkESWJY4SaQREFkOo6QaQgCcyoAson5tWgA03thWnZKQD60fRLR0CxgBBQYAnQ5-FugBryqQUwEHgUSkIAzsqAFxyVVsTVOalVYgnCbkhIwn1N6En8PoSH1ygDcGDB8KFcDhZF0WxXwjXNWgE2Ivxs3uLARA+dNs0ZpcG7xLx2S7UJIndhoACilm+RAN1GD4iwrEFOaACpKgAmaYAkcaALJKx70TCpCAO3BgDp+oA9X6AJ0+1aAL+KOHdW8k2kFKAk3bkL3CXwkxQIQQZ9jChIGoSiGZqsW6AFFG8jtmQwkuKgpCAJymgAIRqQsDlO0dODpqaBMWQRAAJ4QKMjB-D+Jb03jaAEzw4yoqQAAG9rABjs3RC8wD2rrY7RMr-JK6r6uY8J0S5C872Basci6+OSsG3851UzmgDfnr9gD5yue9GVGwkvFm2Zay-LRPGzCasazdFt+BHpuaxUgF9AYhvG8rzsNC7RafN8hpdlQrBWGMnS8jIArgNA8AADIpFQkpwMLlhEDgyhgFAcDl8kRAAAofOaVhYJEaCCuY5QAGpgGgQrkI3GDYAowgEJMIDREAA)

### Remove code with remove

Alternatively, you can do the same thing by looking before calling the `.remove` method:

```js
clickFnNames.forEach((name) => {
  // Get the pure function name by eliminating the preceding this.
  const fnName = name.replace('this.', '');

  // change class method to public class fields syntax
  reactClass.replace(
    `${fnName}() {$$$0}`,
    `${fnName} = () => {
        $$$0
      }`,
  );

  // Remove the original bind
  reactClass.find(`this.${fnName} = this.${fnName}.bind(this)`).remove();
});
```

[Playgroud online demo](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACAFSQHMq81S0APONCFMgJTQJzgDpkAWyhIIrOKWAAdCKVI5RROACcYvJMoAUUZUihEAlJJly5RGFDRadewwG4TpuAAswRPkoItSAXklvKGjoAeQhMUhUYNABfB1knV3dnAjY6BDwwHABrXwjEvmTUtHTMrL4AI0gUTRc3A0domUdClDSM7M0jaXi5WvciNDgAZTgvNG1lNAA3EbHfAD5STW7TUwDqWjRQ8IBCHWnZlj51oK2IRzlogwM4y6b4ybYrTuMe0km4GGVZTQvTAB5yvA4KJSKIStkfMA+gUUq1iu0stF5n9VtD8p4jidNqFSAB+UgAcmCADlCaRwsSAGJUwmNN5yf4AeiBcBBEBRbxuDRk0RAABoQAB3DRZZDoLAgABmMAgvDAoJUKSIUo0gk0UrAdAAkhBVfzSAQoGADXo4AqIIZXnIFJaJAASXJGsB8KjUJAKdCOW1KUhEJBfHD0PyanV6pAeAPKIPexQSYgSPz2zT+wNoerneJMpmkQB+RoAGJXe3F46WIZEAWdqASTlACFugFvowCnyrG7UWeIhCCQnUo+Jq2JpCfgy6R7QB9e0ABgYzFY7FIXFbAiQwlE4kk0UJGcc2bzhYAVkRGKRADOJgCN0wBkeoBIczBEAhOUAejqAcgNq4BwC0Aft5N33gxG5Sat0skbtVH2-wjuOV43lCIEAIzIsyIFjvM673HIW6ANhKgBfeoAAHKAFRygAOpoAI36ABSugCm5oAbKaAGNpYFfoAn9qACl61akIUeDoMopDVoAsCqAA+e74SPgpRUhAJIEIIaBkH4ADaAC6SGkFu56APfKgC-AQWgAR+oAWJpYRelGlKxr6ADD-gCIRoAN3KAJvxh4EQwPDOKQgDdyoAIJqAGAugDz1hhgCG5o4n6lHwxbOJomjpgs1qmFu5mCF4ODOGJkESWJY4SaQREFkOo6QaQgCcyoAson5tWgA03thWnZKQD60fRLR0CxgBBQYAnQ5-FugBryqQUwEHgUSkIAzsqAFxyVVsTVOalVYgnCbkhIwn1N6En8PoSH1ygDcGDB8KFcDhZF0WxXwjXNWgE2Ivxs3uLARA+dNs0ZpcG7xLx2S7UJIndhoACilm+RAN1GD4iwrEFOaACpKgAmaYAkcaALJKx70TCpCAO3BgDp+oA9X6AJ0+1aAL+KOHdW8k2kFKAk3bkL3CXwkxQIQQZ9jChIGoSiGZqsW6AFFG8jtmQwkuKgpCAJymgAIRqQsDlO0dODpqaBMWQRAAJ4QKMjB-D+Jb03jaAEzw4yoqQAAG9rABjs3RC8wD2rrY7RMr-JK6r6uY8J0S5C872Basci6+OSsG3851UzmgDfnr9gD5yue9GVGwkvFm2ZZKwBvbKzCasazdFt+BHpuaxUgF9AYyunbbsuCEgUzjGnVzSR8XyyAmrqsFYYydLyMgCuA0DwAAMikVCSnAwuWEQODKGAUBwNXyREAACh85pWFgkRoIK5jlAAamAaBCuQrcYNgCjCAQkwgNEQA)


The above is a basic tutorial on how to do code conversion with GoGoCode, thank you for your patience to see this, if you still have questions in the process, you can check our [API documentation](/en/docs/specification/category/instance) and [Cookbook](/en/docs/specification/cookbook), good luck with your code conversion!