<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <Child ref="child1" />
    <Child ref="child2" />
    <button @click="add">增</button>
  </div>
</template>

<script>
import Vue from 'vue';
import Child from './Child';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/data-option.html */
export default {
  name: 'data-option',
  props: {
    msg: String,
  },
  data:  {
    name: 'Data 选项',
    version: Vue.version,
  },
  methods: {
    add() {
      this.$refs.child1.addCount();
    },
  },
  components: {
    Child,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
