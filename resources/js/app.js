
require('./bootstrap')
//llamando a las librerias
import Vue from 'vue'
import VueRouter from 'vue-router'


//importaciones de configuracones de librerias

import Render from './Render'
import {router} from './routes/indexRoutes'
import vuetify from './helpers/vuetify'
import {store} from './store/indexStore'
//importacion de configuracion
import {initialize} from './helpers/general'

//confugurando axios
window.axios = require('axios')
Vue.prototype.$http = window.axios


//llamamos a la funcion de configuracion
 initialize(store, router)

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(Render)
});
