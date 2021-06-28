<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <test-ele />
  </div>
</template>

<script>
import Vue from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/custom-elements-interop.html */
// Vue.config.ignoredElements.push('test-ele');
export default {
  name: 'custom-elements-interop',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '自定义元素交互',
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
