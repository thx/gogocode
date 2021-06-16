## Example

#### `{ "libraryName": "antd" }`

```javascript
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);
      ↓ ↓ ↓ ↓ ↓ ↓
var import_button = __toModule(require("antd/lib/button/index"));
ReactDOM.render(/* @__PURE__ */ React.createElement("div", {
  component: import_button.default
}));
```

#### `{ "libraryName": "antd", style: "css" }`

```javascript
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);
      ↓ ↓ ↓ ↓ ↓ ↓
var import_button = __toModule(require("antd/lib/button/index"));
var import_style = __toModule(require("antd/lib/button/style/css"));
ReactDOM.render(/* @__PURE__ */ React.createElement("div", {
  component: import_button.default
}));
```

#### `{ "libraryName": "antd", style: true }`

```javascript
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);
      ↓ ↓ ↓ ↓ ↓ ↓
var import_button = __toModule(require("antd/lib/button/index"));
var import_style = __toModule(require("antd/lib/button/style"));
ReactDOM.render(/* @__PURE__ */ React.createElement("div", {
  component: import_button.default
}));
```

Note : with `style: true` css source files are imported and optimizations can be done during compilation time. With `style: "css"`, pre bundled css files are imported as they are.

`style: true` can reduce the bundle size significantly, depending on your usage of the library.

## Usage

```bash
npm install esbuild-dynamic-import-plugin --save-dev
```

Via `esbuild.config.js`.

```js
const importPlugin = require('esbuild-dynamic-import-plugin')
esbuid.build({
  plugins: [
      importPlugin({
          options: [option1, option2],
      })
  ]
})
```

### options

`options` is an array of config.

For Example:

```javascript
[
  {
    libraryName: "antd",
    libraryDirectory: "lib",   // default: lib
    style: true
  },
  {
    libraryName: "antd-mobile"
  },
]
```

common config:
```javascript
{
  libraryName: "antd",
  style: true,   // or 'css'
}
```

```javascript
{
  libraryName: "lodash",
  libraryDirectory: "",
  camel2DashComponentName: false,  // default: true
}
```

```javascript
{
  libraryName: "@material-ui/core",
  libraryDirectory: "components",  // default: lib
  camel2DashComponentName: false,  // default: true
}
```

#### style

- `{ libraryName: "antd" }`: import js modularly
- `{ libraryName: "antd", style: true }`: import js and css modularly (LESS/Sass source files)
- `{ libraryName: "antd", style: "css" }`: import js and css modularly (css built files)

If option style is a `Function`, `esbuild-dynamic-plugin-import` will auto import the file which filepath equal to the function return value. This is useful for the components library developers.

e.g.
- ``{ libraryName: "antd", style: (name) => `${name}/style/2x` }]``: import js and css modularly & css file path is `ComponentName/style/2x`

If a component has no style, you can use the `style` function to return a `false` and the style will be ignored.

e.g.
```js
esbuild.build({
    options: [
        {
          libraryName: "antd",
          style: (name: string, file: Object) => {
            if (name === 'antd/lib/utils') {
              return false;
            }
            return `${name}/style/2x`;
          }
        }
    ]
})
```

#### styleLibraryDirectory

- `{ libraryName: "element-ui", styleLibraryDirectory: "lib/theme-chalk" }`: import js and css modularly

If `styleLibraryDirectory` is provided (default `null`), it will be used to form style file path,
`style` will be ignored then. e.g.

```javascript
{
  libraryName: "element-ui",
  styleLibraryDirectory: "lib/theme-chalk",
}
import { Button } from 'element-ui';
      ↓ ↓ ↓ ↓ ↓ ↓
var import_button = __toModule(require("element-ui/lib/button/index"));
var import_style = __toModule(require("element-ui/lib/theme-chalk/button/index"));
```

#### customName

We can use `customName` to customize import file path.

For example, the default behavior:

```typescript
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var import_time_picker = __toModule(require('antd/lib/time-picker'));
```

You can set ``camel2DashComponentName` to `false` to disable transfer from camel to dash:

```typescript
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var import_time_picker = __toModule(require('antd/lib/TimePicker'));
```

And finally, you can use `customName` to customize each name parsing:

```js
{
    options: [
        {
          "libraryName": "antd",
          "customName": (name: string, file: object) => {
            const filename = file.opts.filename;
            if (name === 'TimePicker'){
              return 'antd/lib/custom-time-picker';
            }
            if (filename.indexOf('/path/to/my/different.js') >= 0) {
              return 'antd/lib/custom-name';
            }
            return `antd/lib/${name}`;
          }
        }
    ]
}
```

So this result is:

```typescript
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var import_time_picker = __toModule(require('antd/lib/custom-time-picker'));
```

In some cases, the transformer may serialize the configuration object. If we set the `customName` to a function, it will lost after the serialization.

So we also support specifying the customName with a JavaScript source file path:

```js
{
    options: [
        {
          libraryName: "antd",
          customName: require('path').resolve(__dirname, './customName.js')
        }
    ]
}
```

The `customName.js` looks like this:

```js
module.exports = function customName(name) {
  return `antd/lib/${name}`;
};
```

#### customStyleName

`customStyleName` works exactly the same as customName, except that it deals with style file path.

#### transformToDefaultImport

Set this option to `false` if your module does not have a `default` export.