<template functional>
  <div>
    render by functional template: {{props.msg}}
  </div>
</template>

<script>
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/functional-components.html */
export default {
  name: 'FComp',
  functional: true,
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
