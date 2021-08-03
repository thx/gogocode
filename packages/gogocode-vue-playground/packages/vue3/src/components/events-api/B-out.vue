<template>
  <div>B:{{ num }}</div>
</template>

<script>
import {
  $on,
  $off,
  $once,
  $emit,
} from '../../../../vue3/src/utils/gogocodeTransfer'
import TinyEmmitterBus from './utils/tiny-emitter-bus.js'
import eventHub from './EventHub'
export default {
  mixins: [TinyEmmitterBus],
  name: 'B',
  data: {
    num: 0,
  },
  data() {
    return {
      num: 0,
    }
  },
  mounted() {
    // this.picker.$on('inc') => this.picker.vueOn('inc')
    // that.picker.$on('inc') => that.picker.vueOn('inc')

    // picker.$on => this.vueOn
    // this.$on
    // 添加 eventHub 监听器
    $on(eventHub, 'inc', () => {
      this.num += 10
    })
  },
  beforeUnmount() {
    $off(eventHub, 'inc')
  },
}
</script>
