<template>
    <div>
        <my-radio v-model="radio" label="1">备选项</my-radio>
        <my-radio v-model="radio" label="2">备选项</my-radio>
    </div>
</template>

<script>
import Vue from 'vue';
import { Radio } from 'element-ui';
export default {
    name: 'import',
    props: {
        msg: String
    },
    data() {
        return {
            name: 'import',
            version: Vue.version,
            radio: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    components: {
        myRadio: Radio
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: #64b587;
}
</style>
