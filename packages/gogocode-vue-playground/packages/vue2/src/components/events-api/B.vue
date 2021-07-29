<template>
    <div>B:{{ num }}</div>
</template>

<script>
import TinyEmmitterBus from './utils/tiny-emitter-bus.js';
import tiny_emitter from 'tiny-emitter/instance';
import eventHub from './EventHub';
export default {
    mixins: [TinyEmmitterBus],
    name: 'B',
    data: {
        num: 0,
    },
    data() {
        return {
            num: 0,
        };
    },
    mounted() {
        // this.picker.$on('inc') => this.picker.vueOn('inc')
        // that.picker.$on('inc') => that.picker.vueOn('inc')

        // picker.$on => this.vueOn
        // this.$on

        const tiny_emitter_override = {
            $on: (...args) => tiny_emitter.on(...args),
            $once: (...args) => tiny_emitter.once(...args),
            $off: (...args) => tiny_emitter.off(...args),
            $emit: (...args) => tiny_emitter.emit(...args),
        };

        Object.assign(eventHub,tiny_emitter_override)

        // 添加 eventHub 监听器
        eventHub.$on('inc', () => {
            this.num += 10;
        });
    },
    beforeUnmount() {
        eventHub.$off('inc');
    },
};
</script>
