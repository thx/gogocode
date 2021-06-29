<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
	<span id="red" v-bind="{ id: 'blue' }">红色</span>
	<!--标签属性优先级从左往右依次递增-->

  </div>
</template>
<style>
#red {
  color: red;
}
#blue {
  color: blue;
}
</style>
<script>
  import { version } from 'vue';
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-bind.html */
  // 找到标签中v-bind的属性。
  // 将v-bing 和标签中同时存在的属性标记
  // 将已标记的标签中的属性转移到v-bing定义之后
  // 难点： v-bind 属性溯源
	export default {
		name: 'v-bind 合并行为',
		props: {
			msg: String,
		},
		data() {
			return {
				name: 'v-bind 合并行为',
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
