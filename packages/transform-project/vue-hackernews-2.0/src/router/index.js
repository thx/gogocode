import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

// route-level code splitting
const createListView = (id) => () =>
  import('../views/CreateListView').then((m) => m.default(id))
const ItemView = Vue.defineAsyncComponent(() => import('../views/ItemView.vue'))
const UserView = Vue.defineAsyncComponent(() => import('../views/UserView.vue'))

export function createRouter() {
  return VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    fallback: false,
    scrollBehavior: () => ({
      top: 0,
    }),
    routes: [
      { path: '/top/:page(\\d+)?', component: createListView('top') },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/', redirect: '/top' },
    ],
  })
}
