<template>
  <div>
    B:{{num}}
  </div>
</template>
<script>
import eventHub from './EventHub';
export default {
  name: 'B',
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
