import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  PATHS,
  NAMES,
} from '../conf/constants';

import Home from '../views/Home.vue';
import MyOntologies from '../views/MyOntologies.vue';
import Classes from '../views/Classes.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/${PATHS.HOME}`,
      name: NAMES.HOME,
      component: Home,
    },
    {
      path: `/${PATHS.MY_ONTOLOGIES}`,
      name: NAMES.MY_ONTOLOGIES,
      component: MyOntologies,
    },
    {
      path: `/${PATHS.CLASSES}`,
      name: NAMES.CLASSES,
      component: Classes,
    },
    {
      path: `/${PATHS.ABOUT}`,
      name: NAMES.ABOUT,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
  ],
});

export default router;
