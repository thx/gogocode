const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
  },
  {
    path: '/array-refs',
    name: 'array-refs',
    component: () =>
      import(/* webpackChunkName: "array-refs" */ '@/components/array-refs/Comp-out.vue'),
  },
  {
    path: '/async-components',
    name: 'async-components',
    component: () =>
      import(
        /* webpackChunkName: "async-components" */ '@/components/async-components/Comp-out.vue'
      ),
  },
  {
    path: '/attribute-coercion',
    name: 'attribute-coercion',
    component: () =>
      import(
        /* webpackChunkName: "attribute-coercion" */ '@/components/attribute-coercion/Comp.vue'
      ),
  },
  {
    path: '/attrs-includes-class-style',
    name: 'attrs-includes-class-style',
    component: () =>
      import(
        /* webpackChunkName: "attrs-includes-class-style" */ '@/components/attrs-includes-class-style/Comp.vue'
      ),
  },
  {
    path: '/children',
    name: 'children',
    component: () =>
      import(/* webpackChunkName: "children" */ '@/components/children/Comp-out.vue'),
  },
  {
    path: '/custom-directives',
    name: 'custom-directives',
    component: () =>
      import(
        /* webpackChunkName: "custom-directives" */ '@/components/custom-directives/Comp-out.vue'
      ),
  },
  {
    path: '/custom-elements-interop',
    name: 'custom-elements-interop',
    component: () =>
      import(
        /* webpackChunkName: "custom-elements-interop" */ '@/components/custom-elements-interop/Comp.vue'
      ),
  },
  {
    path: '/data-option',
    name: 'data-option',
    component: () =>
      import(/* webpackChunkName: "data-option" */ '@/components/data-option/Comp-out.vue'),
  },
  {
    path: '/emits-option',
    name: 'emits-option',
    component: () =>
      import(/* webpackChunkName: "emits-option" */ '@/components/emits-option/Comp.vue'),
  },
  {
    path: '/events-api',
    name: 'events-api',
    component: () =>
      import(/* webpackChunkName: "events-api" */ '@/components/events-api/Comp.vue'),
  },
  {
    path: '/filters',
    name: 'filters',
    component: () =>
      import(/* webpackChunkName: "filters" */ '@/components/filters/Comp.vue'),
  },
  {
    path: '/fragments',
    name: 'fragments',
    component: () =>
      import(/* webpackChunkName: "fragments" */ '@/components/fragments/Comp.vue'),
  },
  {
    path: '/functional-components',
    name: 'functional-components',
    component: () =>
      import(
        /* webpackChunkName: "functional-components" */ '@/components/functional-components/Comp.vue'
      ),
  },
  {
    path: '/global-api',
    name: 'global-api',
    component: () =>
      import(/* webpackChunkName: "global-api" */ '@/components/global-api/Comp-out.vue'),
  },
  {
    path: '/global-api-treeshaking',
    name: 'global-api-treeshaking',
    component: () =>
      import(
        /* webpackChunkName: "global-api-treeshaking" */ '@/components/global-api-treeshaking/Comp-out.vue'
      ),
  },
  {
    path: '/inline-template-attribute',
    name: 'inline-template-attribute',
    component: () =>
      import(
        /* webpackChunkName: "inline-template-attribute" */ '@/components/inline-template-attribute/Comp.vue'
      ),
  },
  {
    path: '/key-attribute',
    name: 'key-attribute',
    component: () =>
      import(/* webpackChunkName: "key-attribute" */ '@/components/key-attribute/Comp.vue'),
  },
  {
    path: '/keycode-modifiers',
    name: 'keycode-modifiers',
    component: () =>
      import(
        /* webpackChunkName: "keycode-modifiers" */ '@/components/keycode-modifiers/Comp.vue'
      ),
  },
  {
    path: '/listeners-removed',
    name: 'listeners-removed',
    component: () =>
      import(
        /* webpackChunkName: "listeners-removed" */ '@/components/listeners-removed/Comp.vue'
      ),
  },
  {
    path: '/props-default-this',
    name: 'props-default-this',
    component: () =>
      import(
        /* webpackChunkName: "props-default-this" */ '@/components/props-default-this/Comp.vue'
      ),
  },
  {
    path: '/render-function-api',
    name: 'render-function-api',
    component: () =>
      import(
        /* webpackChunkName: "render-function-api" */ '@/components/render-function-api/Comp.vue'
      ),
  },
  {
    path: '/slots-unification',
    name: 'slots-unification',
    component: () =>
      import(
        /* webpackChunkName: "slots-unification" */ '@/components/slots-unification/Comp.vue'
      ),
  },
  {
    path: '/transition',
    name: 'transition',
    component: () =>
      import(/* webpackChunkName: "transition" */ '@/components/transition/Comp.vue'),
  },
  {
    path: '/transition-group',
    name: 'transition-group',
    component: () =>
      import(
        /* webpackChunkName: "transition-group" */ '@/components/transition-group/Comp.vue'
      ),
  },
  {
    path: '/v-on-native-modifier-removed',
    name: 'v-on-native-modifier-removed',
    component: () =>
      import(
        /* webpackChunkName: "v-on-native-modifier-removed" */ '@/components/v-on-native-modifier-removed/Comp.vue'
      ),
  },
  {
    path: '/v-model',
    name: 'v-model',
    component: () =>
      import(/* webpackChunkName: "v-model" */ '@/components/v-model/Comp.vue'),
  },
  {
    path: '/v-if-v-for',
    name: 'v-if-v-for',
    component: () =>
      import(/* webpackChunkName: "v-if-v-for" */ '@/components/v-if-v-for/Comp.vue'),
  },
  {
    path: '/v-bind',
    name: 'v-bind',
    component: () => import(/* webpackChunkName: "v-bind" */ '@/components/v-bind/Comp.vue'),
  },
  {
    path: '/watch',
    name: 'watch',
    component: () => import(/* webpackChunkName: "watch" */ '@/components/watch/Comp.vue'),
  },
];

export default routes;
