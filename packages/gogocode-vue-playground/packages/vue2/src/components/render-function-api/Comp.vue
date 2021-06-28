<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <VNodeTemp :level="1">Hello world!</VNodeTemp>
  </div>
</template>

<script>
	import Vue from 'vue';
  import VNodeTemp from './VNodeTemp.vue';


  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/render-function-api.html */
	export default {
		name: '渲染函数 API',
		props: {
			msg: String,
		},
    components: {
      VNodeTemp
    },
		data() {
			return {
				name: '渲染函数 API',
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
