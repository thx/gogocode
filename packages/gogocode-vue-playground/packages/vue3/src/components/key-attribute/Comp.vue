<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <key-attr :version="version" :options="options"/>
  </div>
</template>

<script>
import { version } from 'vue';
import keyAttr from './keyAttr.vue'
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/key-attribute.html */
export default {
  name: 'key attribute',
  props: {
    msg: String,
  },
  components: {
    keyAttr
  },
  data() {
    return {
      name: 'key attribute',
      version: version,
      options: ['I',`don't`,'have','key','attribute']
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
