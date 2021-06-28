<template>
  <div>
    <p>迁移：{{ name }}-out</p>
    <p>Vue版本：{{ version }}</p>
    <button-counter></button-counter>
  </div>
</template>
<script>
import * as Vue from 'vue'
import Globalcount from './Globalcount'

window.$vueApp.component('button-counter', Globalcount)

window.$vueApp.config.isCustomElement = (tag) =>
  ['my-el', /^ion-/].some((t) =>
    t instanceof RegExp ? t.test(tag) : tag === t
  )

window.$vueApp.directive('focus', {
  inserted: (el) => el.focus(),
})

/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html */
export default {
  name: 'global-api',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '全局 API',
      version: Vue.version,
    }
  },
}
</script>
<style scoped>
h1 {
  color: #64b587;
}
</style>
