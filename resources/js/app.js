
require('./bootstrap')
//llamando a las librerias
import Vue from 'vue'

//importaciones de configuracones de librerias
import Render from './Render'
import {router} from './routes/indexRoutes'
import {store} from './store/indexStore'


//importacion de configuracion
import vuetify from './helpers/vuetify'
import {axiosHeaders} from './helpers/axiosDefaultHeaders'
import {handler} from './helpers/Exeption'
import {Interceptor} from './helpers/RouterInterceptor'

//confugurando axios
window.axios = require('axios')
Vue.prototype.$http = window.axios


//llamamos a la funcion de configuracion
	handler(store, router) // intercepta los status devueltos por el back-end
	Interceptor(store, router) // intercepta la ruta para protegerlas o redireccionar
 	axiosHeaders(store) // inyecta el token en el headers

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(Render)
})
