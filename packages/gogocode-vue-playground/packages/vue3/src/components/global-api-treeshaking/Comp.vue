<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
  </div>
</template>

<script>
  import { version } from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html */
	export default {
		name: '全局 API Treeshaking',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '全局 API Treeshaking',
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
