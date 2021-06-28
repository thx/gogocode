<template>
  <Fragment>
    <slot></slot>
  </Fragment>
</template>
<script>
function stringToHash(string) {
  let hash = 0;

  if (string.length == 0) return hash;

  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

export default {
  beforeMount() {
    const slot = this.$slots.default();
    const parent = this.$parent;
    if (!parent.$children) {
      parent.$children = [];
    }
    this.marked = true;
    const childrenVNode = slot.filter((e) => typeof e.type !== 'string');
    childrenVNode.forEach((vnode, index) => {
      const type = vnode.type;
      if (!type.hasModifyMounted) {
        type._oldMounted = type.mounted;
        type.hasModifyMounted = true;
      }
      type.mounted = function (...args) {
        parent.$children[index] = this;
        type._oldMounted && type._oldMounted.apply(this, args);
        type.mounted = type._oldMounted || function () {};
      };
    });
  },
};
</script>
