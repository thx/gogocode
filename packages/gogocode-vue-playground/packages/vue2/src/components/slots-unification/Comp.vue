<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <scoped-slots>
      <div slot="header">slot: header</div>
      <div>slot: default</div>
      <div slot="footer">slot: footer</div>
    </scoped-slots>
  </div>
</template>

<script>
	import Vue from 'vue';
  import ScopedSlots from './ScopedSlots.vue'
  /* 迁移指南: https://v3.cn.vuejs.org/guide/migration/slots-unification.html */
	export default {
		name: 'ScopedSlots',
		props: {
			msg: String,
		},
    components:{
      ScopedSlots
    },
		data() {
			return {
				name: '插槽统一',
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
