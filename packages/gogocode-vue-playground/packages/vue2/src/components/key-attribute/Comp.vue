<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>

    <h1 v-if="version == '2.6.12'" key="yes">I have key attribute</h1>
    <h1 v-else key="no">vue version is {{ version }}</h1>
    <div class="mt20">
      <!--eslint-disable-next-line-->
      <template v-for="(opt, index) in options">
        <span :key="index" class="mr20">{{index}}</span>
        <span :key="index" >{{ opt }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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
      version: Vue.version,
      options: ['I','have','key','attribute']
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
