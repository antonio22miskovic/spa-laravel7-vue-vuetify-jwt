//llamamos a vue y a vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
//usamos a vur router
Vue.use(VueRouter)


//importando los componentes views de las rutas
import NotFound from './components/notfound/NotFound'



const routes = [
//rutas
	 {
    path: '/',
    component: () => import( './views/Index'),
    children:[
       {
           path: '/',
           name: 'welcome',
           component: () => import( './components/index/Welcome')
       },
       {
           path: 'login',
           name: 'login',
           component: () => import( './components/layouts/auth/Login')
       },
       {
           path: 'registro',
           name: 'registro',
           component: () => import('./components/index/Registro')
       }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: () => import('./views/Home'),
    meta: {
      requiresAuth: true
    },
  },
	{
  	// rutas no encontradas
 	 path: '*',
 	 name:'404',
 	 component:NotFound
	}
]

export default routes