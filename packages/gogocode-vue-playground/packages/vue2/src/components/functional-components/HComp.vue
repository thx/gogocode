<script>
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/functional-components.html */
export default {
  name: 'HComp',
  props: {
    msg: String,
  },
  functional: true,
  render: function (h, { props })  {
    return h('p', `render by h: ${props.msg}`);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
