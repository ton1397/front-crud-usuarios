import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/FormBox.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          authRequired: true,
        }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/FormBox.vue'),
    children: [
      {
        path: '',
        redirect: '/auth/login'
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          authRequired: false,
        }
      },
      {
        path: 'registro',
        component: () => import('pages/RegistroPage.vue'),
        meta: {
          authRequired: false,
        }
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      authRequired: false,    }
  },
];

export default routes;
