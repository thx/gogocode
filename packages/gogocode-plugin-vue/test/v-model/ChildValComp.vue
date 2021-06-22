<template>
  <input type="text" v-on:input="handleInput" />
</template>

<script>
export default {
  name: 'ChildValComp',
  props: {
    value: String,
  },
  data() {
    return {};
  },
  methods:{
    handleInput:function(e){
      this.$emit('input', e.target.value);
    }
  }
};
</script>
