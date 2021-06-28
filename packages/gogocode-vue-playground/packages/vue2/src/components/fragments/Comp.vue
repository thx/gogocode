<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
	<h1>Vuew的片段必须放到一个根节点例如div中</h1>
  </div>
</template>

<script>
	import Vue from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/fragments.html */
	export default {
		name: 'fragments',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '片段',
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
