const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
    },
    {
        path: '/import',
        name: 'import',
        component: () => import(/* webpackChunkName: "import" */ '@/components/import/Comp-out.vue'),
    },
    {
        path: '/icon',
        name: 'icon',
        component: () => import(/* webpackChunkName: "icon" */ '@/components/icon/Comp-out.vue'),
    },
    {
        path: '/v-model-ele',
        name: 'v-model-ele',
        component: () => import(/* webpackChunkName: "v-model-ele" */ '@/components/v-model-ele/Comp-out.vue'),
    },
    {
        path: '/sub-menu',
        name: 'sub-menu',
        component: () => import(/* webpackChunkName: "sub-menu" */ '@/components/sub-menu/Comp-out.vue'),
    },
    {
        path: '/pop-confirm',
        name: 'pop-confirm',
        component: () => import(/* webpackChunkName: "pop-confirm" */ '@/components/pop-confirm/Comp-out.vue'),
    },
    {
        path: '/date-time-pickers',
        name: 'date-time-pickers',
        component: () => import(/* webpackChunkName: "date-time-pickers" */ '@/components/date-time-pickers/Comp-out.vue'),
    },
];

export default routes;
