import { route } from 'quasar/wrappers';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { http } from '../boot/axios';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory(
      process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    const api_url = process.env.API_URL

    if(to.meta.authRequired) {
      if(!localStorage.getItem('access_token')) {
        return next('/auth/login')
      }
      http(
        `${api_url}/userinfo`,
        'get',
        {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      ).then( () => {
        next()
      }).catch(() => {
        next('/auth/login')
      })
    }else {
      next()
    }
  })

  return Router;
});
