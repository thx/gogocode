<template>
  <el-popconfirm
    @cancel="onCancel"
    @confirm="onConfirm"
    confirm-button-text="好的"
    cancel-button-text="不用了"
    icon="el-icon-info"
    icon-color="red"
    title="这是一段内容确定删除吗？"
  >
    <template v-slot:reference>
      <el-button slot="reference">删除</el-button>
    </template>
  </el-popconfirm>
</template>

<script>
import * as Vue from 'vue'
export default {
  name: 'pop-confirm',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'pop-confirm',
      version: Vue.version,
    }
  },
  methods: {
    onConfirm() {
      alert('onConfirm')
    },
    onCancel() {
      alert('onCancel')
    },
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
