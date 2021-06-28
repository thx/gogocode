<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <button-with-lable class="mt20" :label="labelText" value="LableButtom" @click="buttonClick" />
  </div>
</template>

<script>
import Vue from 'vue';
import ButtonWithLable from './ButtonWithLable.vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/listeners-removed.html */
export default {
  name: '移除listeners',
  props: {
    msg: String,
  },
  components: {
    ButtonWithLable,
  },
  data() {
    return {
      name: '移除 $listeners',
      version: Vue.version,
      labelText: 'listeners',
    };
  },
  methods: {
    buttonClick() {
      alert('vue的版本号:' + Vue.version);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
