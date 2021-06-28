<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <div>addYuan(toYuan(amount),'before'): {{ addYuan(toYuan(amount), 'before') }}</div>
    <div>addYuan(toYuan(amount),'after'): {{ addYuan(toYuan(amount), 'after') }}</div>
  </div>
</template>

<script>
import { version } from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/filters.html */
export default {
  name: 'filters',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '过滤器',
      version: version,
      amount: 1024,
    };
  },
  methods: {
    toYuan(value) {
      return (value / 100).toFixed(2);
    },
    addYuan(value, mode = 'after') {
      return mode === 'before' ? '￥' + value : value + '元';
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
