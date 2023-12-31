import Home from 'pages/HomePage/IndexPage.vue';
import Login from 'src/pages/LoginP.vue';
import Register from 'src/pages/RegisterP.vue';


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },





  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
