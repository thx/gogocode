<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <Child class="bg-green" style="border: 1px solid red" />
  </div>
</template>

<script>
import { version } from 'vue';
import Child from './Child-out';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html */
export default {
  name: 'attrs-includes-class-style',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '$attrs 包括 class & style',
      version: version,
    };
  },
  components: {
    Child,
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
