<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <el-button type="primary" :icon="ElIconSearch" @click="open"
      >Search</el-button
    >
    <el-icon class="mr5" style="font-size: 20px"
      ><el-icon-circle-plus
    /></el-icon>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :icon="ElIconCirclePlus"
    ></el-tree>
  </div>
</template>

<script>
import {
  CirclePlus as ElIconCirclePlus,
  Search as ElIconSearch,
} from '@element-plus/icons'
import * as Vue from 'vue'
export default {
  data() {
    return {
      name: 'icon',
      version: Vue.version,
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      ElIconSearch,
      ElIconCirclePlus,
    }
  },
  components: {
    ElIconCirclePlus,
  },
  name: 'icon',
  props: {
    msg: String,
  },
  methods: {
    open() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
    },
  },
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
