<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <div>
      <div>arr:</div>
      <ul>
        <li v-for="num in arr" :ref="getRefSetter('arr')" :key="num">
          {{ num }}
        </li>
      </ul>
    </div>
    <div>
      <div>arr from ref:</div>
      <ul>
        <li :key="ele.innerText" v-for="ele in arrFromRef">
          {{ ele.innerText }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue'
export default {
  methods: {
    getRefSetter(refKey) {
      return (ref) => {
        !this.$arrRefs && (this.$arrRefs = {})
        !this.$arrRefs[refKey] && (this.$arrRefs[refKey] = [])
        ref && this.$arrRefs[refKey].push(ref)
      }
    },
  },

  name: 'v-for 中的 Ref 数组',

  props: {
    msg: String,
  },

  data() {
    return {
      name: 'array-refs',
      version: Vue.version,
      arr: [1, 2, 3, 4, 5],
      arrFromRef: [],
    }
  },

  mounted() {
    this.arrFromRef = this.$arrRefs.arr
  },

  beforeUpdate() {
    this.$arrRefs && (this.$arrRefs = {})
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
