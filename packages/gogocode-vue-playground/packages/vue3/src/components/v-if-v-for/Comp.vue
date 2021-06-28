<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <ul>
      <template v-for="(item, index) in items">
        <li v-bind:key="index" v-if="isShow">{{ item }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
import { version } from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html */
// v-for 和 v-if同时存在，将v-for逻辑提取到v-if逻辑上层
export default {
  name: 'v-if 与 v-for 的优先级对比',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'v-if 与 v-for 的优先级对比',
      version: version,
      items: [1, 2, 3, 4, 5],
      isShow: false,
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
