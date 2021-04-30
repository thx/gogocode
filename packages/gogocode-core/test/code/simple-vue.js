const code = `
<template>
<div>
  <p>迁移：{{ name }}</p>
  <p>Vue版本：{{ version }}</p>
    <ul>
    <li v-for="(item,index) in items" v-if="isShow" v-bind:key="index">{{ item }}</li>
  </ul>
</div>
</template>

<script>
import Vue from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html*/
export default {
name: 'v-if 与 v-for 的优先级对比',
props: {
  msg: String,
  items: [1, 2, 3, 4, 5],
    isShow: false
},
data() {
  return {
    name: 'v-if 与 v-for 的优先级对比',
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
`;
module.exports = code;