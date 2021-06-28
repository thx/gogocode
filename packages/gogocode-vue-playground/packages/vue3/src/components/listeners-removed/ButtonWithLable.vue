<template>
  <label>
    {{ label }}
    <input type="button" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  name: 'ButtonWithLable',
  inheritAttrs: false,
  props: {
    msg: String,
    label: String
  },
  data() {
    return {};
  },
};
</script>
