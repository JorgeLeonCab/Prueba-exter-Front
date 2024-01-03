import Home from 'pages/HomePage/IndexPage.vue';
import Login from 'src/pages/Login/LoginP.vue';

const routes = [
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: 'home', 
        component: Home,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    component: Login,
  },





  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
