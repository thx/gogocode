<template>
  <div>count: {{ count }}</div>
</template>

<script>
import Vue from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/data-option.html */
export default {
  name: 'Child',
  props: {
    msg: String,
  },
  data: {
    count: 0,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addCount() {
      this.count = this.count + 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
