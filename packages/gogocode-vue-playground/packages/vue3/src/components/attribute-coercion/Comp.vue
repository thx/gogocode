<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <div :draggable="false">
      没发现啥大的区别，暂时不管
    </div>
  </div>
</template>

<script>
import { version } from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/attribute-coercion.html */
export default {
  name: 'attribute-coercion',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'attribute 强制行为',
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
