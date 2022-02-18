<template>
  <input type="text" v-on:input="handleInput" />
</template>

<script>
export default {
  name: 'ChildComp',
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    /* 这将允许 `value` 属性用于其他用途*/
    value: String,
    /* 使用 `title` 代替 `value` 作为 model 的 prop */
    title: {
      type: String,
      default: 'Default title',
    },
  },
  data() {
    return {};
  },
  methods:{
    handleInput:function(e){
      this.$emit('update:title', e.target.value);
    }
  }
};
</script>
