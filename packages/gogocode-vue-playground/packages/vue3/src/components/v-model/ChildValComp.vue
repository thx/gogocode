<template>
  <input type="text" v-on:input="handleInput" />
</template>

<script>
export default {
  name: 'ChildValComp',
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },
  methods:{
    handleInput:function(e){
      this.$emit('update:modelValue', e.target.value);
    }
  }
};
</script>
