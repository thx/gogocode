import tiny_emitter from 'tiny-emitter/instance'
export default {
  methods: {
    vueOn(...args) {
      tiny_emitter.on(...args)
    },
    vueOnce(...args) {
      tiny_emitter.once(...args)
    },
    vueOff(...args) {
      tiny_emitter.off(...args)
    },
    vueEmit(...args) {
      this.$emit(...args)
      tiny_emitter.emit(...args)
    },
  },
}