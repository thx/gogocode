# gogocode-plugin-vue

进行 Vue2 到 Vue3 的 GoGoCode 插件

## 开发方式

1. 严格按照 packages/gogocode-vue-playground 中转换的命名编写 rule
2. 在本仓库中 npm run t rule 即可触发对应规则的转换，例如 `npm run t array-refs`
3. 转换过程：从 packages/gogocode-vue-playground 对应的 Vue2 仓库拿到 Comp.vue 文件通过对应规则的处理再放回 Vue3 仓库名为 Comp-out.vue
4. 在 packages/gogocode-vue-playground/packages/vue3/src/router/index.js 路由中把原来 import 的 Comp.vue 文件改成 Comp-out.vue 文件即可在 playground 中查看文件的运行效果
5. 在转换中如果需要 debug，请配置 .vscode/launch.json，下面是例子

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "vue-transform",
      "runtimeExecutable": "node",
      "args": ["${workspaceFolder}/packages/gogocode-plugin-vue/t.js", "array-refs"]
    }
  ]
}


```