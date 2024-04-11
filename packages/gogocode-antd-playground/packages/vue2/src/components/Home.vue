<template>
  <div>
    <p>微服务加载成功</p>
    <p>Vue版本：{{ version }}</p>
  </div>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'Home',
		props: {
			msg: String,
		},
		data() {
			return {
				name: 'Home',
        version: Vue.version
			};
		},
	};
</script>

<style scoped>
  h1 {
    color: #64b587;
  }
</style>
