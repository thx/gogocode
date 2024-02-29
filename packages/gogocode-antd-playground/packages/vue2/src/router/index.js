import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue')
    },
    {
        path: '/icon',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/icon/Comp.vue')
    }
];

export default routes;
