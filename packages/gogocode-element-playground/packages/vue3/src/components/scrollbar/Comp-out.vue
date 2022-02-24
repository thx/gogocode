<template>
  <el-scrollbar height="400px" ref="scrollBarRef">
    <p
      v-for="item in 20"
      :key="item"
      class="scrollbar-demo-item"
      @click="getScrollRef()"
    >
      {{ item }}
    </p>
  </el-scrollbar>
</template>

<script>
import * as Vue from 'vue'
export default {
  name: 'scrollbar',
  data() {
    return {
      name: 'scrollbar',
      version: Vue.version,
    }
  },
  methods: {
    getScrollRef() {
      alert(
        this.$refs.scrollBarRef.wrap$ +
          this.$refs['scrollBarRef'].wrap$ +
          this.$refs.scrollBarRef.$refs.wrap$
      )
    },
  },
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #ecf5ff;
  color: #409eff;
}
</style>
