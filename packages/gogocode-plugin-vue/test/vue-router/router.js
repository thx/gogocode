import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))

export function createRouter () {
    return new Router({
        mode: 'history',
        base: '/app',
        fallback: false,
        scrollBehavior: () => ({ y: 0, x: 1 }),
        routes: [
            { path: '/top/:page(\\d+)?', component: createListView('top') }
        ]
    })
}
