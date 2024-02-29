---
title: 与社区流行工具对比
order: 2
---

## 与编写 babel 插件对比

对于下面这段 js 代码

```javascript
import a from 'a';
console.log('get A');
var b = console.log();
console.log.bind();
var c = console.log;
console.log = func;
```

我们希望对不同的 console.log 做不同的处理，变成下面这样

```
import a from 'a';
var b = void 0;
console.log.bind()
var c = function(){};
console.log = func
```

- Babel 插件实现的核心代码：

```javascript
// 代码来源：https://zhuanlan.zhihu.com/p/32189701
module.exports = function({ types: t }) {
return {
    name: "transform-remove-console",
    visitor: {
    CallExpression(path, state) {
        const callee = path.get("callee");

        if (!callee.isMemberExpression()) return;

        if (isIncludedConsole(callee, state.opts.exclude)) {
        // console.log()
        if (path.parentPath.isExpressionStatement()) {
            path.remove();
        } else {
        //var a = console.log()
            path.replaceWith(createVoid0());
        }
        } else if (isIncludedConsoleBind(callee, state.opts.exclude)) {
        // console.log.bind()
            path.replaceWith(createNoop());
        }
    },
    MemberExpression: {
        exit(path, state) {
        if (
            isIncludedConsole(path, state.opts.exclude) &&
            !path.parentPath.isMemberExpression()
        ) {
        //console.log = func
            if (
            path.parentPath.isAssignmentExpression() &&
            path.parentKey === "left"
            ) {
            path.parentPath.get("right").replaceWith(createNoop());
            } else {
            //var a = console.log
            path.replaceWith(createNoop());
            }
        }
        }
    }
    }
};

```

> 其中 isIncludedConsole、isIncludedConsoleBind、createNoop 等方法还需额外开发引入

- 用 GoGoCode 实现：

```javascript
$(code)
  .replace(`var $_$ = console.log()`, `var $_$ = void 0`)
  .replace(`var $_$ = console.log`, `var $_$ = function(){}`)
  .find(`console.log()`)
  .remove()
  .generate();
```

**几行代码即可完成，可读性非常强**

## 与 jscodeshift 工具对比

对于下面这段代码：

```javascript
import car from 'car';

const suv = car.factory('white', 'Kia', 'Sorento', 2010, 50000, null, true);
const truck = car.factory(
  'silver',
  'Toyota',
  'Tacoma',
  2006,
  100000,
  true,
  true
);
```

我们希望将函数的多个入参封装为一个对象传入，变成下面这样

```javascript
import car from 'car';
const suv = car.factory({
  color: 'white',
  make: 'Kia',
  model: 'Sorento',
  year: 2010,
  miles: 50000,
  bedliner: null,
  alarm: true
});
const truck = car.factory({
  color: 'silver',
  make: 'Toyota',
  model: 'Tacoma',
  year: 2006,
  miles: 100000,
  bedliner: true,
  alarm: true
});
```

- 用 jscodeshift 实现的核心代码：

```javascript
// 代码来源：https://www.toptal.com/javascript/write-code-to-rewrite-your-code
export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // find declaration for "car" import
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'car'
    }
  });

  // get the local name for the imported module
  const localName = importDeclaration.find(j.Identifier).get(0).node.name;

  // current order of arguments
  const argKeys = [
    'color',
    'make',
    'model',
    'year',
    'miles',
    'bedliner',
    'alarm'
  ];

  // find where `.factory` is being called
  return (
    root
      .find(j.CallExpression, {
        callee: {
          type: 'MemberExpression',
          object: {
            name: localName
          },
          property: {
            name: 'factory'
          }
        }
      })
      .replaceWith(nodePath => {
        const { node } = nodePath;

        // use a builder to create the ObjectExpression
        const argumentsAsObject = j.objectExpression(
          // map the arguments to an Array of Property Nodes
          node.arguments.map((arg, i) =>
            j.property('init', j.identifier(argKeys[i]), j.literal(arg.value))
          )
        );

        // replace the arguments with our new ObjectExpression
        node.arguments = [argumentsAsObject];

        return node;
      })

      // specify print options for recast
      .toSource({ quote: 'single', trailingComma: true })
  );
};
```

- 用 GoGoCode 实现：

```javascript
const argKeys = [
  'color',
  'make',
  'model',
  'year',
  'miles',
  'bedliner',
  'alarm'
];
const argObj = {};
$(code)
  .find(`const $_$1 = car.factory($_$2);`)
  .each(item => {
    const variableName = item.match[1][0].value;
    item.match[2].forEach((match, j) => {
        argObj[argKeys[j]] = match.value;
    });
    item.replaceBy(
        $(`const ${variableName} = car.factory(${JSON.stringify(argObj)})`)
    );
  })
  .root()
  .generate()
```
