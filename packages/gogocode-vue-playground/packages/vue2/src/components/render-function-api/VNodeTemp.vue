<template></template>
<script>
import Vue from "vue";

Vue.component("button-counter", {
  data() {
    return {
      count: 0,
    };
  },
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `,
});

export default {
  name: "VNodeTemp",
  props: {
    level: {
      require: true,
      type: Number,
    },
  },
  render(h) {
    return h("button-counter", {     
      staticClass: "button",     
      staticStyle: { color: "#34495E" },      
      attrs: { id: "submit" },
      domProps: { innerHTML: "innerHTML" },
      on: { click: submitForm },
      key: "submit-button",
    });
  },
};
</script>
