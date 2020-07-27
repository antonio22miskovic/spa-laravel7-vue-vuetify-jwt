////////////////////////////////// MODULO DE AUTENTICACION ///////////////////////////////////

import {getlocaluser} from '../../helpers/auth'

const user = getlocaluser()

export const authModule = {
	namespaced: true,
	state : () => ({

		currentUser : user,
		isloggeadin : !!user,
		loading     : false,
		auth_error  : null,

	}),

	mutations:{

		login(state){

			state.loading    = true
			state.auth_error = null

		},

		loginexitoso(state, payload){

			state.auth_error  = null
			state.isloggeadin = true
			state.loading     = false
			state.currentUser = Object.assign({},payload.user, {token: payload.access_token})
			localStorage.setItem('user',JSON.stringify(state.currentUser))

		},

		loginfallido(state, payload){

			state.loading    = false
			state.auth_error = payload.error

		},

		logout(state){

			localStorage.removeItem('user')
			state.isloggeadin = false
			state.currentUser = null

		},
	},

	getters:{},

	actions:{
		login(context){ context.commit('login') },
	}
}
// mutations:{


// 	draweroff(state){
//   		state.drawer = true
//   	},
//   	updatedrawer(state, paylod){
//   		state.drawer = paylod
//   	},
// 	// cargarproductos(state,payload){
// 	// 	state.productos = payload
// 	// }

