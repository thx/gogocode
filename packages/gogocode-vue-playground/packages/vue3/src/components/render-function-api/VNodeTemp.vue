<script>
import { h } from 'vue';
export default {
  name: 'VNodeTemp',
  props: {
    level: {
      require: true,
      type: Number,
    },
  },
  render() {
    return h(
      'h' + this.level,
      {
        class: ['button', { 'is-outlined': 'is-outlined' }],
        style: [{ color: '#ff0088' }, { backgroundColor: '#eaeaea' }],
        id: 'submit',
        innerHTML: 'Hello world! vue3',
        key: 'submit-button',
      },
     this.$slots.default
    );
  },
};
</script>
