<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <Child inline-template>
      <div>
        子组件模板渲染
      </div>
    </Child>
  </div>
</template>

<script>
	import Vue from 'vue';
  import Child from './Child'
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/inline-template-attribute.html */
	export default {
		name: '内联模板 Attribute',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '内联模板 Attribute',
        version: Vue.version,
        parentMsg: 'parentMsg'
			};
		},
    components: {
      Child
    }
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #64b587;
  }
</style>
