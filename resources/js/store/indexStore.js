/////////////////////////// INDEX DE VUEX MANEJO DE MODULOS DE LA TIENDA //////////////
import Vue from 'vue'
import Vuex from 'vuex'

/// INYECTION DE MODULES
import {authModule} from './modules/authModule'




// instacia de vuex
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules:{
		auth: authModule // modulo de autenticacion

	},
})
//import { mapState , mapActions , mapMutations } from 'vuex'