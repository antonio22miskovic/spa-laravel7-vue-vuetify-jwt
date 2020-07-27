//llamamos a vue y a vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
//usamos a vur router
Vue.use(VueRouter)

// nemespace de ayuda
const nemespaceComponents = '../../components/'
const nemespaceViews = '../../../views/'

export const routes = [
//rutas
   {
    path: '/',
    component: () => import('../../views/Index'),
    children:[
       {
           path: '/',
           name: 'welcome',
           component: () => import(`${nemespaceComponents}index/Welcome`)
       },
       {
           path: 'login',
           name: 'login',
           component: () => import(`${nemespaceComponents}layouts/auth/Login`)
       },
       {
           path: 'registro',
           name: 'registro',
           component: () => import(`${nemespaceComponents}index/Registro`)
       }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: () => import(`${nemespaceViews}Home`),
    meta: {
      requiresAuth: true
    },
  },

]
