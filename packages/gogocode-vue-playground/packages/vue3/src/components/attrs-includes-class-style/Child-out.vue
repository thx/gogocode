<template>
  <div class="child"></div>
</template>
<script>
import * as Vue from 'vue'
function inheriltClassAndStyle() {
  const attrs = this.$attrs
  attrs.class && this.$el.classList.add(attrs.class)
  attrs.style &&
    Object.entries(attrs.style).forEach(([k, v]) => {
      this.$el.style[k] = v
    })
}
export default {
  inheritAttrs: false,
  name: 'child',
  data() {
    return {}
  },
  mounted() {
    this.a = 1
    inheriltClassAndStyle.call(this)
  },
}
</script>
<style scoped>
h1 {
  color: #64b587;
}

.child {
  width: 200px;
  height: 200px;
}
</style>
