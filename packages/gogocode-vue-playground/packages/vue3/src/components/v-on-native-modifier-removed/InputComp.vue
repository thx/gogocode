<template>
  <input type="text" v-on:input="$emit('change', $event.target.value)"/>
</template>

<script>
export default {
  name: 'InputComp',
  data() {
    return {};
  },
  emits: ['change']
};
</script>
