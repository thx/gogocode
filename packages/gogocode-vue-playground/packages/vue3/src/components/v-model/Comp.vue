<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <ChildComp :title="pageTitle1" @update:title="pageTitle1 = $event" /><br />
    {{ pageTitle1 }}<br />
	<ChildValComp v-model="pageTitle2"/><br>
	{{pageTitle2}}<br>
  </div>
</template>

<script>
import { version } from 'vue';
import ChildComp from './ChildComp';
import ChildValComp from './ChildValComp';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/v-model.html */
// 找到.sync 属性
//删除 .sync 属性，使用:title 和 @update:title 替代
export default {
  name: 'v-model',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'v-model',
      version: version,
      pageTitle1: '',
      pageTitle2: '',
    };
  },
  components: {
    ChildComp,
    ChildValComp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
