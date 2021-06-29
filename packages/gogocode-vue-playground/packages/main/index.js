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

const vue2App = loadMicroApp({
  name: 'vue2',
  entry: '//localhost:7102',
  container: '#vue2',
});

const vue3App = loadMicroApp({
  name: 'vue3',
  entry: '//localhost:7103',
  container: '#vue3',
});

class TestEle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const div = document.createElement('div');
    div.innerText = 'haha';
    this.append(div);
  }
}
window.customElements.define('test-ele', TestEle);
