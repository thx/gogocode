import { loadMicroApp } from 'qiankun';
import Vue from 'vue/dist/vue.esm';
import { CompsConfig } from './comps-config';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  base: '/',
  mode: 'history',
});

new Vue({
  el: '#main-app',
  router,
  data() {
    return {
      selected: '/',
      CompsConfig,
    };
  },
  mounted() {
    this.selected = this.$route.path;
  },
  methods: {
    changeRoute() {
      this.$router.push({ path: this.selected });
    },
  },
});

// const vue2App = loadMicroApp({
//   name: 'vue2',
//   entry: '//localhost:7102',
//   container: '#vue2',
// }, {
//   sandbox: {
//     strictStyleIsolation: true
//   }
// });

// const vue3App = loadMicroApp({
//   name: 'vue3',
//   entry: '//localhost:7103',
//   container: '#vue3',
// }, {
//   sandbox: {
//     strictStyleIsolation: true
//   }
// });
