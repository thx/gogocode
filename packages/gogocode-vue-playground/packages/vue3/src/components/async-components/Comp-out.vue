<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <AsyncComp msg="异步组件加载成功" />
    <AsyncCompOption msg="异步组件Option加载成功" />
  </div>
</template>
<script>
import * as Vue from 'vue'
const AsyncComp = Vue.defineAsyncComponent(() => import('./Async'))
const AsyncCompOption = Vue.defineAsyncComponent({
  loader: () => import('./Async'),
  delay: 500,
})
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/async-components.html */
export default {
  name: 'async-components',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '异步组件',
      version: Vue.version,
    }
  },
  components: {
    AsyncComp,
    AsyncCompOption,
  },
}
</script>
<style scoped>
h1 {
  color: #64b587;
}
</style>
