import Home from 'pages/HomePage/IndexPage.vue';
import Login from 'src/pages/Login/LoginP.vue';

const routes = [
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: Home
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
