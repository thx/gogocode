<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'ScopedSlots',
  mounted() {   
    console.log("vue2", "$slots", this.$slots);   
    console.log("$scopedSlots.console", this.$scopedSlots.footer);
    console.log("$scopedSlots.console", this.$scopedSlots.footer());

    this.$scopedSlots.footer({
      text: "来自子组件的数据",
      name: "aaa",
      id: "aaaaa",
    });
  },
};
</script>
