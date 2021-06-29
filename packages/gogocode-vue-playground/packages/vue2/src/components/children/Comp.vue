<template>
  <div>
    <p>迁移：{{ name }}</p>
    <p>Vue版本：{{ version }}</p>
    <div>childProps: {{ childProps }}</div>
    <Child class="bg-green" text="1" />
    <Child class="bg-yellow" text="2" />
  </div>
</template>

<script>
import Vue from 'vue';
import Child from './Child';

/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/children.html */
export default {
  name: 'children',
  data() {
    return {
      name: '$children',
      version: Vue.version,
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
.bg-green {
  background: #64b587;
}
.bg-yellow {
  background: #e9bf34;
}
</style>
