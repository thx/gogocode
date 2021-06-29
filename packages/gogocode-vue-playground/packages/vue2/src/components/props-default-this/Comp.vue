<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <props-this />
  </div>
</template>

<script>
import Vue from 'vue';
import PropsThis from './PropsThis.vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/props-default-this.html */
export default {
  name: '在 prop 的默认函数中访问 this',
  props: {
    msg: String,
  },
  components: {
    PropsThis,
  },
  data() {
    return {
      name: '在 prop 的默认函数中访问 this',
      version: Vue.version,
    };
  },
  // methods: {
  //   sayHi() {
  //     alert('hi aaa');
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
