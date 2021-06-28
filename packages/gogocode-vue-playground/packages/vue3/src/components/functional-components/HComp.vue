<script>
import { h } from 'vue';
/* 迁移指南: https://v3.cn.vuejs.org/guide/migration/functional-components.html */
const HComp = (props, context) => {
  return h('p', `render by h: ${props.msg}`);
};
HComp.props = {
  msg: String,
};
export default HComp;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #64b587;
}
</style>
