<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu index="2">
      <template v-slot:title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-sub-menu index="2-4">
        <template v-slot:title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"
      ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
    >
  </el-menu>
</template>

<script>
import * as Vue from 'vue'
import { ElSubMenu as Submenu } from 'element-plus'
export default {
  name: 'sub-menu',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'sub-menu',
      version: Vue.version,
      activeIndex: '1',
      Submenu,
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
