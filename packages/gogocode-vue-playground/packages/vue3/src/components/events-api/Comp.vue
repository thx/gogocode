<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <A />
    <B />
  </div>
</template>

<script>
import { version } from 'vue';
import A from './A';
import B from './B';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/events-api.html */
export default {
  components: {
    A,
    B,
  },
  name: 'events-api',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '事件 API',
      version: version,
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
