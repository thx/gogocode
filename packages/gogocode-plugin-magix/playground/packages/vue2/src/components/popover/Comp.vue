<template>
  <div>
    <el-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      :open-delay="delay"
      :close-delay="delay"
      >
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>

    <el-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      :open-delay="500"
      :close-delay="500"
      >
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>

    
  </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'popover',
    data() {
        return {
            visible: false,
            delay: 500,
            name: 'popover',
            version: Vue.version
        };
    },
};
</script>
