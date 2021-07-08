<script>
import * as Vue from 'vue'
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/functional-components.html */
export default function render(_props, _context) {
  const context = {
    ..._context,
    props: _props,
    data: _context.attr,
    children: _context.slots,
  }
  const { props } = context
  return Vue.h('p', `render by h: ${props.msg}`)
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
