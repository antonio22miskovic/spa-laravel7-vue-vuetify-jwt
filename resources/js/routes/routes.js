//llamamos a vue y a vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
//usamos a vur router
Vue.use(VueRouter)
export const routes = [
//rutas
  {
    path: '/',
    name:'index',
    component: () => import('./../views/index/Index'),
  },

  {
    path: '/login/',
    component: () => import('./../views/index/Login'),
    children:[
      {
        path:'/',
        name:'login_in',
        component: () => import('./../components/layouts/auth/Login_in')
      },
       {
        path:'email-verifique',
        name:'emailVerifique',
        component: () => import('./../components/layouts/auth/EmailVerifique')
      },
      {
        path:'codigo-verifique',
        name:'codigoVerifique',
        component: () => import('./../components/layouts/auth/CodigoVerifique')
      },
       {
        path:'update-password',
        name:'updatePassword',
        component: () => import('./../components/layouts/auth/UpdatePassword')
      },

    ]
 },
 {
    path: '/registro',
    name: 'registro',
    component: () => import('./../views/index/Registro')
 },
 {
    path:'/home',
    name:'home',
    component: () => import('./../views/Home'),
    meta: {
      requiresAuth: true
    },
  },

]// fin array de rutas
