<template>
  <div>    
  </div>
</template>
<script>
import Vue from "vue";
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      Clicked {{ count }} times.
    </button>
  `
})

export default {
  name: "渲染函数",
  data() {
    return {     
      customButton: [
        {
          render(h, params) {
            return h('button-counter', {
              props: {
                rowData: params.row               
              },
            });
          },
        },
        {
          render: (h, params) => {
            return h('button-counter', {
              props: {
                row: {
                  ...params.row,
                },
                isDissuader: true,
              },
            });
          },
        },
      ],
    };
  },
  render(h) {
    return h('button-counter');
  },
  methods: {
    keys(key) {
      alert("您按下的是" + key);
    },
  },
};
</script>


<style scoped>

</style>
