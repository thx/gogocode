<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>

    <div class="mt20 text-left">
      <div>space: <input type="text" v-on:keyup.space="keys('space')" /></div>
      <div class="mt20">
        space number 32:
        <input type="text" v-on:keyup.32="keys('keycode 32 space')" />
      </div>
      <div class="mt20">
        <!--eslint-disable-next-line-->
        custom space: <input v-on:keyup.custom="keys('custom keycode space')" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
Vue.config.keyCodes = {
  custom: 32,
};
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/keycode-modifiers.html */
export default {
  name: '按键修饰符',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '按键修饰符',
      version: Vue.version,
    };
  },
  methods: {
    keys(key) {
      alert('您按下的是' + key);
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
