<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
	import Vue from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/async-components.html */
	export default {
		name: 'Async',
		props: {
			msg: String,
		},
		data() {
			return {

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
