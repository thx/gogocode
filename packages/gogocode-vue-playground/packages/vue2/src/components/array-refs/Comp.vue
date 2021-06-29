<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <div>
      <div>arr:</div>
      <ul>
        <li :key="num" v-for="num in arr" ref="arr">
          {{ num }}
        </li>
      </ul>
    </div>
    <div>
      <div>arr from ref:</div>
      <ul>
        <li :key="ele.innerText" v-for="ele in arrFromRef">
          {{ ele.innerText }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/array-refs.html */
export default {
  name: 'v-for 中的 Ref 数组',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'array-refs',
      version: Vue.version,
      arr: [1, 2, 3, 4, 5],
      arrFromRef: [],
    };
  },
  mounted() {
    this.arrFromRef = this.$refs.arr;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
