<template>
  <div>
    <my-radio v-model:value="radio" label="1">备选项</my-radio>
    <my-radio v-model:value="radio" label="2">备选项</my-radio>
  </div>
</template>

<script>
import * as Vue from 'vue'
import { ElRadio as Radio } from 'element-plus'
export default {
  name: 'import',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'import',
      version: Vue.version,
      radio: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  components: {
    myRadio: Radio,
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
