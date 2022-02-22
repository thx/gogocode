const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
  },
  {
    path: '/icon',
    name: 'icon',
    component: () =>
      import(/* webpackChunkName: "icon" */ '@/components/icon/Comp-out.vue'),
  },
];

export default routes;
