<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
	<ChildComp :title.sync="pageTitle"/><br>
	{{pageTitle}}<br>
	<ChildValComp v-model="pageTitle2"/><br>
	{{pageTitle2}}<br>
  </div>
</template>

<script>
import Vue from 'vue';
import ChildComp from './ChildComp';
import ChildValComp from './ChildValComp';

/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-model.html*/
export default {
  name: 'v-model',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'v-model',
      version: Vue.version,
	    pageTitle: '',
	    pageTitle2: ''
    };
  },
  components: {
    ChildComp,
	ChildValComp
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
