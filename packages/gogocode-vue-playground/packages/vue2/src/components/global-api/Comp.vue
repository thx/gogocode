<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <button-counter></button-counter>
  </div>
</template>

<script>
import Vue from "vue";
import Globalcount from "./Globalcount";

Vue.component("button-counter", Globalcount);

Vue.config.productionTip = true
Vue.config.ignoredElements = ['my-el', /^ion-/]


Vue.directive("focus", {
  inserted: (el) => el.focus(),
});

/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html */
export default {
  name: "global-api",
  props: {
    msg: String,
  },
  data() {
    return {
      name: "全局 API",
      version: Vue.version,
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
