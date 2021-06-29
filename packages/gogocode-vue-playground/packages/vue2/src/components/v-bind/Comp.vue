<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <span id="red" v-bind="{ id: 'blue' }">红色</span>
	<!--标签属性优先级大于v-bind优先级-->
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
import Vue from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-bind.html */
export default {
  name: 'v-bind 合并行为',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'v-bind 合并行为',
      version: Vue.version,
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
