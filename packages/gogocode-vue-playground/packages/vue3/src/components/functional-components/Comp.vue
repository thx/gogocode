<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <h-comp msg="h-comp" />
    <f-comp msg="f-comp" />
  </div>
</template>

<script>
import { version } from 'vue';
import HComp from './HComp-out.vue';
import FComp from './FComp.vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/functional-components.html */
export default {
  name: 'functional-components',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '函数式组件',
      version: version,
    };
  },
  components: {
    HComp,
    FComp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
