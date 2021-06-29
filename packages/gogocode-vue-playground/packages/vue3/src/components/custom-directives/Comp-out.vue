<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <p v-if="visible" v-highlight="color">hehe</p>
    <p>vmForDirective:{{ vmForDirective }}</p>
    <button @click="changeColor">更换颜色</button>
    <button @click="changeVisible">加载/卸载</button>
  </div>
</template>
<script>
import * as Vue from 'vue'
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/custom-directives.html */

Vue.directive('drag', {
  mounted: function (el) {
    el.onmousedown = function (e) {
      var disx = e.pageX - el.offsetLeft
      var disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        el.style.left = e.pageX - disx + 'px'
        el.style.top = e.pageY - disy + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
    const vm = binding.instance
    vm.vmForDirective = 'after'
  },

  // and update
  updated(el, binding) {
    el.style.background = binding.value
    el.parentNode.style.border = `1px solid ${binding.value}`
  },
  unMounted(el, binding) {
    alert('Vue2-directive-highlight 已经卸载')
  },
})

export default {
  name: 'custom-directives',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'custom-directives',
      version: Vue.version,
      color: 'yellow',
      visible: true,
      vmForDirective: 'before',
    }
  },
  methods: {
    changeColor() {
      this.color = this.color === 'yellow' ? 'red' : 'yellow'
    },
    changeVisible() {
      this.visible = !this.visible
    },
  },
  directives: {
    highlight: {
      beforeMount(el, binding, vnode) {
        el.style.background = binding.value
        const vm = binding.instance
        vm.vmForDirective = 'after'
      },
      mounted(el, binding) {
        el.parentNode.style.border = `1px solid ${binding.value}`
      },
      // and update
      updated(el, binding) {
        el.style.background = binding.value
        el.parentNode.style.border = `1px solid ${binding.value}`
      },
      unMounted(el, binding) {
        alert('Vue2-directive-highlight 已经卸载')
      },
    },
  },
}
</script>
<style scoped>
h1 {
  color: #64b587;
}
</style>
