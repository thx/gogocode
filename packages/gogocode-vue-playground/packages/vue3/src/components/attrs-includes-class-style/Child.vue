<template>
  <div class="child"></div>
</template>

<script>
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html */
function inheriltClassAndStyle() {
  const attrs = this.$attrs;
  attrs.class && this.$el.classList.add(attrs.class);
  attrs.style &&
    Object.entries(attrs.style).forEach(([k, v]) => {
      this.$el.style[k] = v;
    });
}

export default {
  inheritAttrs: false,
  name: 'child',
  data() {
    return {};
  },
  mounted() {
    inheriltClassAndStyle.call(this);
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
}
</style>
