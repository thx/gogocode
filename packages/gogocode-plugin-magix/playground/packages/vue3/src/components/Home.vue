<template>
  <div>
    <p>微服务加载成功</p>
    <p>Vue版本：{{ version }}</p>
  </div>
</template>

<script>
	import { version } from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/array-refs.html */
	export default {
		name: 'v-for 中的 Ref 数组',
		props: {
			msg: String,
		},
		data() {
			return {
				name: 'v-for 中的 Ref 数组',
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
