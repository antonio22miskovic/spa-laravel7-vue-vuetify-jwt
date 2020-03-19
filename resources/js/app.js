
require('./bootstrap');
//llamando a las librerias
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

//importaciones de configuracones de librerias
import routes from './routes'
import Render from './Render'
import StoreData from './store'
import vuetify from './helpers/vuetify'

//importacion de configuracion
import {initialize} from './helpers/general'

Vue.use(Vuex)
Vue.use(VueRouter)

//confugurando axios
window.axios = require('axios')
Vue.prototype.$http = window.axios

//instancia  de vue-router
const router = new VueRouter({

	routes,
	mode: 'history'

})

// instacia de vuex
const store = new Vuex.Store(StoreData)

//llamamos a la funcion de configuracion
initialize(store, router)

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(Render)
});
