<template>
  <div class="child"></div>
</template>

<script>
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html */
import Vue from 'vue'

export default {
  inheritAttrs: false,
  name: 'child',
  mounted() {
    this.a = 1
  },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}

.child {
  width: 200px;
  height: 200px;
}
</style>
