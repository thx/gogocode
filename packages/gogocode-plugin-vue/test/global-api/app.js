import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'


Vue.mixin(titleMixin)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


export function createApp () {
    // create store and router instances
    const store = createStore()
    const router = createRouter()


    sync(store, router)


    const app = new Vue({
        router,
        store,
        render: h => h(App),
        el: '#app'
    })


    return { app, router, store }
}
