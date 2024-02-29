---
title: Vue2 to Vue3 Upgrade Guide
order: 1
---
# start migration

The arrival of Vue3 has brought us many surprise changes, but because Vue3 has many compatibility problems with Vue2 at the Api level, it cannot achieve a smooth upgrade. So we use [gogocode](https://gogocode.io/) this code conversion tool according to [v3 migration guide](https://v3.cn.vuejs.org/guide/migration/introduction.html), use it Operating AST, developed a set of Vue2 [upgrade tool](https://github.com/thx/gogocode/tree/main/packages/gogocode-plugin-vue). Use this tool to quickly upgrade your Vue2 code to Vue3.

This set of tools is very simple to use, just need to execute simple commands.
 
## install tools
Install the latest gogocode-cli globally
```bash
npm install gogocode-cli -g
````
## Migrate source files

Jump to the Vue project path that needs to be upgraded in the terminal. If you need to upgrade the vue code in the src path, execute the following command:​

Note: -s is followed by the directory/file name of the original file, and -o is followed by the output directory/file name. If the two are the same, the conversion plugin will overwrite your code. Please make a backup before this operation.

```bash
gogocode -s ./src -t gogocode-plugin-vue -o ./src-out
```

The new Vue3 code will be written to the src-out directory after the conversion operation is completed.

## Dependency upgrade
In addition to upgrading the source code, we also need to upgrade Vue3 related dependencies, which can also be done automatically. Jump to the Vue project path to be upgraded in the terminal and execute the following command:

```bash
gogocode -s package.json -t gogocode-plugin-vue -o package.json
```

This command will help you upgrade the Vue/Vuex/Vue-router/Vue compilation tools in package.json to the version compatible with Vue3

```bash
npm install
```
You can complete the installation of Vue3 related dependencies​

Note: If you are using an old version of vue-cli to generate a project, you need to upgrade vue-cli yourself to ensure that the Vue3 project can be built successfully, please refer to: [What did the vue-cli2 project upgrade to vue-cli4 do] (https://blog.liuyunzhuge.com/2019/12/19/vue-cli2%E7%9A%84%E9%A1%B9%E7%9B%AE%E5%8D%87%E7%BA%A7 %E5%88%B0vue-cli4%E5%81%9A%E4%BA%86%E5%93%AA%E4%BA%9B%E4%BA%8B%E6%83%85/), [Migrating from v3](https://cli.vuejs.org/migrating-from-v3/#upgrade-all-plugins-at-once)
 
## What needs attention

We automate our tools as much as possible, but there are some issues that require your attention.
### Global App

Since Vue3 global object becomes `createApp()` created. The conversion tool passes the `createApp()` return object to `window.$vueApp`. At this point, the user needs to move the `window.$vueApp = Vue.createApp(App)` block to the front of the code that calls `window.$vueApp`. Avoid situations where `window.$vueApp` is `undefined`. ![image.png](https://img.alicdn.com/imgextra/i4/O1CN01OmRYkc1QkulG5KuKO_!!6000000002015-2-tps-2344-1234.png)
### The dependent Vue2 component library needs to be upgraded by itself

Some component libraries that depend on Vue2 development have also released Vue3 versions, and their APIs have undergone some changes, which requires you to manually upgrade.

### About Cannot read property 'parseComponent' of undefined error
The reason for the error is that the parseComponent function in vue-template-compiler was deleted after the vue upgrade.

solve this problem:

1. You need to confirm whether vue-template-compiler in package.json has been replaced with @vue/compiler-sfc, otherwise you need to replace it, and then reinstall the dependencies.

2. If this error is still reported, you need to check whether the third-party dependencies referenced by the project have a Vue2 version, and if so, you need to update to a version that supports Vue3.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01XCpDY81oddH7hV2vt_!!6000000005248-2-tps-2032-484.png)

### Check and test

In addition, because it is a static code conversion, there may be some unexpected ways of writing in your code, which may cause confusion in the conversion. Please do manual comparison and testing after the conversion! Issues found to convert can be [submitted](https://github.com/thx/gogocode/issues) to us.​
## other projects
For other project upgrades, please refer to the official Vue [link](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E5%85%B6%E4%BB%96%E9%A1%B9% E7%9B%AE)

# Transformation rule override
| Rules | Conversion Support | Documentation |
| --- | --- | --- |
| Ref array in v-for | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/array-refs.html) |
| Async Components | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/async-components.html) |
| attribute coercion behavior | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/attribute-coercion.html) |
| $attrs includes class&style | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html) |
| $children | ✖️ | [link](https://v3.cn.vuejs.org/guide/migration/children.html) |
| Custom Directives | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/custom-directives.html) |
| Custom Elements Interop | No Conversion Required | [Link](https://v3.cn.vuejs.org/guide/migration/custom-elements-interop.html) |
| Data option | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/data-option.html) |
| emits option | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/emits-option.html) |
| Events API | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/events-api.html) |
| Filters | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/filters.html) |
| Fragments | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/fragments.html) |
| Functional Components | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/functional-components.html) |
| Global API | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/global-api.html) |
| Global API Treeshaking | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html) |
| Inline Template Attribute | ✖️ | [Link](https://v3.cn.vuejs.org/guide/migration/inline-template-attribute.html) |
| keyattribute | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/key-attribute.html) |
| Key Modifiers | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/keycode-modifiers.html) |
| remove $listeners | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/listeners-removed.html) |
| Mount API Changes | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/mount-changes.html) |
| propsData | In development | [Link](https://v3.cn.vuejs.org/guide/migration/props-data.html) |
| Accessing this in prop's default function | No conversion required | [Link](https://v3.cn.vuejs.org/guide/migration/props-default-this.html) |
| Render Function API | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/render-function-api.html) |
| Slots Unification | ✔ | [Link](https://v3.cn.vuejs.org/guide/migration/slots-unification.html) |
| Suspense | No conversion required | [Link](https://v3.cn.vuejs.org/guide/migration/suspense.html) |
| Transition class name change | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/transition.html) |
| Transition as Root | In Development | [Link](https://v3.cn.vuejs.org/guide/migration/transition-as-root.html) |
| Transition Group root element | ✔ | [link](https://v3.cn.vuejs.org/guide/migration/transition-group.html) |
| Remove v-on.native modifier | ✔ | [link](https:/