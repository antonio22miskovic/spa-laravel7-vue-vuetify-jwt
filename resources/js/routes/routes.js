//llamamos a vue y a vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
//usamos a vur router
Vue.use(VueRouter)
export const routes = [
//rutas
  {
    path:'/',
    component: () => import('./../views/index/Index'),
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
      {
        path:'/registro',
        name:'registro',
        component: () => import('./../components/layouts/auth/Registro')
      },
    ]// fin del children del index
  },
  {
    path:'/home',
    name:'home',
    component: () => import('./../views/admin/Home'),
    meta: {
      requiresAuth: true
    },
  },

]// fin array de rutas
