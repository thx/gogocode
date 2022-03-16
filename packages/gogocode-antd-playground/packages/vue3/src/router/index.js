const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
    },
    {
        path: '/icon',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/icon/Comp-out.vue')
    }
];

export default routes;
