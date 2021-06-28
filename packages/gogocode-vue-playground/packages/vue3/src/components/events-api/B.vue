<template>
  <div>
    B:{{num}}
  </div>
</template>
<script>
import emitter from 'tiny-emitter/instance'

const eventHub = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}

export default {
  name: 'B',
  data() {
    return {
      num: 0,
    };
  },
  mounted() {
     // 添加 eventHub 监听器
    eventHub.$on('inc', () => {
      this.num += 1;
    });
    // 添加 eventHub 监听器
    eventHub.$once('inc', () => {
      this.num * 100;
    });
  },
  beforeUnmount() {
    eventHub.$off('inc');
  },
};
</script>
