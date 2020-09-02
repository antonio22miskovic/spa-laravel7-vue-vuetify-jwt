/////////////////////////// INDEX DE VUEX MANEJO DE MODULOS DE LA TIENDA //////////////
import Vue from 'vue'
import Vuex from 'vuex'

/// INYECTION DE MODULES
import {authModule} from './modules/authModule'
import {adminHome} from './modules/adminHome'




// instacia de vuex
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules:{
		AUTH       : authModule, // modulo de autenticacion
		ADMIN_HOME : adminHome // modulo del home del admin

	},
})
//import { mapState , mapActions , mapMutations } from 'vuex'