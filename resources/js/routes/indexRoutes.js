import Vue from 'vue'
import VueRouter from 'vue-router'

// Importaciones de rutas
import {routes} from './routes'

//instancia  de vue-router
Vue.use(VueRouter)
export const router = new VueRouter({
	routes,
	mode: 'history'
})
