
require('./bootstrap')
//llamando a las librerias
import Vue from 'vue'

//importaciones de configuracones de librerias
import Render from './Render'
import {router} from './routes/indexRoutes'
import {store} from './store/indexStore'


//importacion de configuracion
import vuetify from './helpers/vuetify'
import {initialize} from './helpers/general'
import {handler} from './helpers/Exeption'

//confugurando axios
window.axios = require('axios')
Vue.prototype.$http = window.axios


//llamamos a la funcion de configuracion
	handler(store, router)
 	initialize(store, router)

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(Render)
})
