<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
	<Child inline-template>
		<div>
			<p>它们被编译为组件自己的模板-{{name}}</p>
			<p>不是父级所包含的内容。</p>
		</div>
	</Child>
  </div>
</template>

<script>
  import { version } from 'vue';
  import Child from './Child';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/inline-template-attribute.html */
	export default {
		name: 'inline-attribute',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '内联模板 Attribute',
        version: version
			};
		},
		components: { Child },
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #64b587;
  }
</style>
