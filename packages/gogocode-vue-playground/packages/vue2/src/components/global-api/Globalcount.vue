<template>
  <div>
    <button @click="count++">Clicked {{ count }} times.</button>
  </div>
</template>


<script>
    /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html */
	export default {
		name: 'global-api',
		props: {
			msg: String,
		},
		data() {
			return {
				count: 0 
			};
		},
	};
</script>


