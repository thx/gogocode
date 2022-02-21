const fs = require("fs").promises;
const path = require("path");

const vue2CompsFolder = path.resolve(
  __dirname,
  "../packages/vue2/src/components"
);
const vue3CompsFolder = path.resolve(
  __dirname,
  "../packages/vue3/src/components"
);

const cfgs = [
  {
    link: "array-refs",
    text: "v-for 中的 Ref 数组"
  },
  {
    link: "async-components",
    text: "异步组件"
  },
  {
    link: "attribute-coercion",
    text: "attribute 强制行为"
  },
  {
    link: "attrs-includes-class-style",
    text: "$attrs 包括 class & style"
  },
  {
    link: "children",
    text: "$children"
  },
  {
    link: "custom-directives",
    text: "自定义指令"
  },
  {
    link: "custom-elements-interop",
    text: "自定义元素交互"
  },
  {
    link: "data-option",
    text: "Data 选项"
  },
  {
    link: "emits-option",
    text: "emits Option"
  },
  {
    link: "events-api",
    text: "事件 API"
  },
  {
    link: "filters",
    text: "过滤器"
  },
  {
    link: "fragments",
    text: "片段"
  },
  {
    link: "functional-components",
    text: "函数式组件"
  },
  {
    link: "global-api",
    text: "全局 API"
  },
  {
    link: "global-api-treeshaking",
    text: "全局 API Treeshaking"
  },
  {
    link: "inline-template-attribute",
    text: "内联模板 Attribute"
  },
  {
    link: "key-attribute",
    text: "key attribute"
  },
  {
    link: "keycode-modifiers",
    text: "按键修饰符"
  },
  {
    link: "listeners-removed",
    text: "移除 $listeners"
  },
  {
    link: "props-default-this",
    text: "在 prop 的默认函数中访问 this"
  },
  {
    link: "render-function-api",
    text: "渲染函数 API"
  },
  {
    link: "slots-unification",
    text: "插槽统一"
  },
  {
    link: "transition",
    text: "过渡的 class 名更改"
  },
  {
    link: "transition-group",
    text: "Transition Group 根元素"
  },
  {
    link: "v-on-native-modifier-removed",
    text: "移除 v-on.native 修饰符"
  },
  {
    link: "v-model",
    text: "v-model"
  },
  {
    link: "v-if-v-for",
    text: "v-if 与 v-for 的优先级对比"
  },
  {
    link: "v-bind",
    text: "v-bind 合并行为"
  },
  {
    link: "watch",
    text: "Watch on Arrays"
  }
];

const vue2tmpl = ({ link, text }) =>
`<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
  </div>
</template>

<script>
	import Vue from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/${link}.html */
	export default {
		name: '${text}',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '${text}',
        version: Vue.version
			};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #64b587;
  }
</style>
`;

const vue3tmpl = ({ link, text }) =>
`<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
  </div>
</template>

<script>
  import { version } from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/${link}.html */
	export default {
		name: '${text}',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '${text}',
        version: version
			};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #64b587;
  }
</style>
`;

cfgs.forEach(({ link, text }) => {
  const code = vue3tmpl({ link, text });
  const dir = path.resolve(vue3CompsFolder, link);
  const filename = path.resolve(dir, "Comp.vue");
  fs.mkdir(dir, { recursive: true })
    .then(() => {
      return fs.writeFile(filename, code);
    })
    .catch(console.error);
});
