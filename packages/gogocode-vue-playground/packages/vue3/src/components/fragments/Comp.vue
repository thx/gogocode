<template>
	<Fragment>
    <h1>vue3说是支持多根节点，但是为什么加一个就报错呢：{{ name }}</h1>
	<h1>vue3说是支持多根节点，但是为什么加一个就报错呢1111：{{ name }}</h1>
	</Fragment>
</template>

<script>
  import { version } from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/fragments.html */
	export default {
		name: '片段',
		props: {
			msg: String,
		},
		data() {
			return {
				name: '片段',
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
