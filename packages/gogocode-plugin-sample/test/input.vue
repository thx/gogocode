<template>
  <div>
    <el-popover
      open-delay="10"
      hide-after="500"
      title="标题"
      width="200"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      v-model="visible">
      <el-button slot="reference" @click="visible = !visible">手动激活</el-button>
    </el-popover>
    <ul>
      <li :key="num" v-for="num in arr" ref="arr">
        {{ num }}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'v-for 中的 Ref 数组',
  data() {
    return {
      visible: false,
      arr: [1, 2, 3, 4, 5]
    };
  }
};
</script>