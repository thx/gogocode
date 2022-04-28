<template>
  <div>
    <el-popover
      :hide-after="delay"
      :show-after="delay"
      placement="bottom"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template v-slot:reference>
        <el-button slot="reference">hover 激活</el-button>
      </template>
    </el-popover>

    <el-popover
      auto-close="$_$"
      show-after="500"
      placement="bottom"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template v-slot:reference>
        <el-button slot="reference">hover 激活</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script>
import * as Vue from 'vue'
export default {
  name: 'popover',
  data() {
    return {
      visible: false,
      delay: 500,
      name: 'popover',
      version: Vue.version,
    }
  },
}
</script>
