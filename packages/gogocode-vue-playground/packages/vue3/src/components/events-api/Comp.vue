<template>
  <div>
    <p>迁移：{{ name }}</p>
    
    <A />
    <B />
  </div>
</template>

<script>
import Vue from 'vue';
import A from './A-out';
import B from './B-out';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/events-api.html */
export default {
  components: { A, B },
  name: 'events-api',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '事件 API',      
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
