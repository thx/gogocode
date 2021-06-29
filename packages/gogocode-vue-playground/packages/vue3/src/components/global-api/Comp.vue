<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <button-counter></button-counter>
  </div>
</template>

<script>
import { version } from "vue";
import Globalcount from "./Globalcount";

window.$vueApp.component("button-counter", Globalcount);

window.$vueApp.directive("focus", {
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
