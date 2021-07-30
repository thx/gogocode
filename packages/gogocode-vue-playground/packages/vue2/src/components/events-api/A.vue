<template>
  <div>
    A:
    <button @click="inc">inc</button>
  </div>
</template>
<script>
import eventHub from './EventHub'
import TinyEmmitterBus from './utils/tiny-emitter-bus.js'
import tiny_emitter from 'tiny-emitter/instance';

export default {
  mixins: [TinyEmmitterBus],
  methods: {
    inc() {

        const tiny_emitter_override = {
            $on: (...args) => tiny_emitter.on(...args),
            $once: (...args) => tiny_emitter.once(...args),
            $off: (...args) => tiny_emitter.off(...args),
            $emit: (...args) => tiny_emitter.emit(...args),
        };

        Object.assign(eventHub,tiny_emitter_override)

      eventHub.$emit('inc')
     
    }
  }
}
</script>
