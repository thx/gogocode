<template>
  <div>
    <p>迁移：按键修饰符</p>
    <p>
      迁移策略： 1.Vue3不再支持使用数字 (即键码) 作为 v-on 修饰符 2.不再支持
      config.keyCodes
    </p>
    <div class="mt20 text-left">
      <div>
        space:<input
          v-bind="$attrs"
          v-on="$listeners"
          type="text"
          @keyup.space="keys('space')"
        />
      </div>
      <div>
        space:<input
          v-on="$listeners"
          type="text"
          @keyup.32="keys('keycode 32 space')"
        />
      </div>
      <div>f2:<input type="text" @keyup.113="keys('keycode 32 space')" /></div>
      <div>
        space:<input
          type="text"
          @keyup.customSpace="keys('keycode 32 space')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
Vue.config.keyCodes = {
  customSpace: 32,
  customDelete: 46,
};
Vue.config.keyCodes.f1 = 112;
Vue.config.keyCodes.myDelete = 46;

export default {
  name: "按键修饰符",
  methods: {
    keys(key) {
      alert("您按下的是" + key);
    },
  },
};
</script>


<style scoped>
</style>
