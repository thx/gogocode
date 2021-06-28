<template>
  <div>
    A:
    <button @click="inc">inc</button>
  </div>
</template>
<script>
import eventHub from './EventHub'
export default {
  methods: {
    inc() {
      eventHub.$emit('inc')
    }
  }
}
</script>
