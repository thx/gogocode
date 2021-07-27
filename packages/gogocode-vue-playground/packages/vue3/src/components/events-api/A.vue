<template>
    <div>
        A:
        <button @click="inc">inc</button>
    </div>
</template>
<script>
import tiny_emitter from 'tiny-emitter/instance';

export default {
    methods: {
        inc() {
            let eventHub = {};
            const tiny_emitter_override = {
                $on: (...args) => tiny_emitter.on(...args),
                $once: (...args) => tiny_emitter.once(...args),
                $off: (...args) => tiny_emitter.off(...args),
                $emit: (...args) => tiny_emitter.emit(...args),
            };
            this.picker = {}

            Object.assign(this.picker, tiny_emitter_override);

            Object.assign(eventHub, tiny_emitter_override);

            //Object.assign(this, tiny_emitter_override);

            tiny_emitter_override.$emit('inc');
        },
    },
};
</script>
