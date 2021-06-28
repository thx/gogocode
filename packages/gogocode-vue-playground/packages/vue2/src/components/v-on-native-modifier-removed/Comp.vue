<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <InputComp v-on:change="handleChange" /><br />
    <InputComp v-on:focus.native="handleFocus" />
  </div>
</template>

<script>
import Vue from 'vue';
import InputComp from './InputComp';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-on-native-modifier-removed.html */
export default {
  name: '移除 v-on.native 修饰符',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '移除 v-on.native 修饰符',
      version: Vue.version,
    };
  },
  methods: {
    handleChange: () => {
      console.log('change');
    },
    handleFocus: () => {
      console.log('focus');
    },
  },
  components: {
    InputComp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
