<template>
  <div>B:{{ num }}</div>
</template>
<script>
import tiny_emitter from 'tiny-emitter/instance'
import eventHub from './EventHub'
const tiny_emitter_override = {
  $on: (...args) => tiny_emitter.on(...args),
  $once: (...args) => tiny_emitter.once(...args),
  $off: (...args) => tiny_emitter.off(...args),
  $emit: (...args) => tiny_emitter.emit(...args),
}
Object.assign(eventHub, tiny_emitter_override)
export default {
  name: 'B',
  mounted() {
    // 添加 eventHub 监听器
    eventHub.$on('inc', () => {
      this.num += 1
    })
    // 添加 eventHub 监听器
    eventHub.$once('inc', () => {
      this.num * 100
    })
  },
  beforeUnmount() {
    eventHub.$off('inc')
  },
}
</script>
