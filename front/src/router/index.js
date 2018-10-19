import Vue from 'vue';
import Router from 'vue-router';
import Tests from '@/components/Tests';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/tests',
      name: 'Tests',
      component: Tests,
    },
  ],
});
