<template>
  <label>
    {{ label }}
    <input type="button" v-bind="$attrs" v-on="$listeners" />

    <input
      type="button"
      v-bind="{ ...$attrs }"
      v-on="{
        ...$listeners,
        input: handleInput,
      }"
    />
    <input
      type="button"
      v-bind="{ ...$attrs }"
      v-on="{        
        input: handleInput,
        ...$listeners
      }"
    />

    <input
      type="button"
      v-bind="{ ...$attrs }"
      v-on="
        Object.assign({}, {
          input: handleInput,
        }, $listeners)
      "
    />
  </label>
</template>
<script>
export default {
  name: "ButtonWithLable",
  inheritAttrs: false,
  props: {
    msg: String,
    label: String,
  },
  data() {
    return {};
  },
};
</script>
