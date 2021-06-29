<template>
  <label>
    {{ label }}
    <input type="button" v-bind="$attrs" />

    <input
      type="button"
      v-bind="{ ...$attrs }"
      v-on="{
        input: handleInput,
      }"
    />
    <input
      type="button"
      v-bind="{ ...$attrs }"
      v-on="{
        input: handleInput,
      }"
    />

    <input
      type="button"
      v-bind="{ ...$attrs }"
      v-on="
        Object.assign(
          {},
          {
            input: handleInput,
          }
        )
      "
    />
  </label>
</template>
<script>
export default {
  name: 'ButtonWithLable',
  inheritAttrs: false,
  props: {
    msg: String,
    label: String,
  },
  data() {
    return {}
  },
}
</script>
