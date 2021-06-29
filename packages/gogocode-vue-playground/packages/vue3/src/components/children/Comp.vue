<template>
  <div>
    <GoodChild>
      <p>迁移：{{ name }}</p>
      <p>Vue版本：{{ version }}</p>
      <div>childProps: {{ childProps }}</div>
      <Child class="bg-green" text="1" />
      <Child class="bg-yellow" text="2" />
    </GoodChild>
  </div>
</template>

<script>
import { version } from 'vue';
import Child from './Child';
import GoodChild from './GoodChild';

/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/children.html */
export default {
  name: 'children',
  data() {
    return {
      name: '$children',
      version: version,
      childProps: '',
    };
  },
  mounted() {
    this.childProps = this.$children.map((c) => {
      return c.$props.text;
    });
  },
  components: {
    Child,
    GoodChild,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
