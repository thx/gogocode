<template>
  <div class="child">{{ text }}</div>
</template>

<script>
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html */
export default {
  name: 'child',
  props: {
    text: String,
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
