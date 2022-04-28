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
        path: '/import',
        name: 'import',
        component: () => import(/* webpackChunkName: "import" */ '@/components/import/Comp.vue')
    },
    {
        path: '/icon',
        name: 'icon',
        component: () => import(/* webpackChunkName: "icon" */ '@/components/icon/Comp.vue')
    },
    {
        path: '/v-model-ele',
        name: 'v-model-ele',
        component: () => import(/* webpackChunkName: "v-model-ele" */ '@/components/v-model-ele/Comp.vue')
    },
    {
        path: '/sub-menu',
        name: 'sub-menu',
        component: () => import(/* webpackChunkName: "sub-menu" */ '@/components/sub-menu/Comp.vue')
    },
    {
        path: '/pop-confirm',
        name: 'pop-confirm',
        component: () => import(/* webpackChunkName: "pop-confirm" */ '@/components/pop-confirm/Comp.vue')
    },
    {
        path: '/date-time-pickers',
        name: 'date-time-pickers',
        component: () => import(/* webpackChunkName: "date-time-pickers" */ '@/components/date-time-pickers/Comp.vue')
    },
    {
        path: '/tool-tip',
        name: 'tool-tip',
        component: () => import(/* webpackChunkName: "tool-tip" */ '@/components/tool-tip/Comp.vue')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import(/* webpackChunkName: "calendar" */ '@/components/calendar/Comp.vue')
    },
    {
        path: '/popover',
        name: 'popover',
        component: () => import(/* webpackChunkName: "popover" */ '@/components/popover/Comp.vue')
    },
    {
        path: '/scrollbar',
        name: 'scrollbar',
        component: () => import(/* webpackChunkName: "scrollbar" */ '@/components/scrollbar/Comp.vue')
    },
    {
        path: '/form',
        name: 'form',
        component: () => import(/* webpackChunkName: "form" */ '@/components/form/Comp.vue')
    }
];

export default routes;
