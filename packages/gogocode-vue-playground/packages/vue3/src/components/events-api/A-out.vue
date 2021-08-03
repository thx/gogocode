<template>
  <div>
    A:
    <button @click="inc">inc</button>
  </div>
</template>

<script>
import {
  $on,
  $off,
  $once,
  $emit,
} from '../../../../vue3/src/utils/gogocodeTransfer'
import eventHub from './EventHub'
import TinyEmmitterBus from './utils/tiny-emitter-bus.js'

export default {
  mixins: [TinyEmmitterBus],
  methods: {
    inc() {
      $emit(eventHub, 'inc')
    },
  },
}
</script>
