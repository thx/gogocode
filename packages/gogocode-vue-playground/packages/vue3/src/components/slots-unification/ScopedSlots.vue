<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>

    <h1>{{slots}}</h1>
  </div>
</template>

<script>
export default {
  name: 'ScopedSlots',
  mounted() {
    console.log("vue3 $slots",this.$slots);
    console.log("vue3",'$slots.footer',this.$slots.footer);
  },
  data() {
    return {
      slots: this.$slots
    };
  },
};
</script>
