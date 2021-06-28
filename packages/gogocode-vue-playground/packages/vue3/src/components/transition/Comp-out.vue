<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <input type="button" @click.prevent="tag_class" value="button" />
    <a-select
      placeholder="请选择市"
      :disabled="true"
      @blur="saveToSession"
      v-model="domain.cityName"
      style="width: 200px; margin-right: 20px"
      allowClear
    >
      <a-select-option
        v-for="city in domain.cities"
        :key="city.id"
        :value="city.name"
      >
        {{ city.name }}
      </a-select-option>
    </a-select>
    <transition>
      <h1 v-if="clobj">this is h1</h1>
    </transition>

    <transition name="slide">
      <div class="z-10">z10</div>
    </transition>

    <transition name="menina-nav-fade" appear>
      <div class="z-20">z20</div>
    </transition>
  </div>
</template>
<script>
import * as Vue from 'vue'
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/transition.html */
export default {
  name: '过渡的 class 名更改',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '过渡的 class 名更改',
      version: Vue.version,
      clobj: true,
    }
  },
  methods: {
    tag_class: function () {
      this.clobj = !this.clobj
    },
  },
}
</script>
<style lang="less">
h1 {
  color: #64b587; /*// 增加注释*/
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 3s ease;
}
.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  overflow: hidden;
}
.slide-enter-from {
  overflow: hidden;
  max-height: 0;
}
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
