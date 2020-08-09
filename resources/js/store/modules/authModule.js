////////////////////////////////// MODULO DE AUTENTICACION ///////////////////////////////////

import {getlocaluser} from '../../helpers/getAuthUser'

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

		loginExitoso(state, payload){

			state.auth_error  = null
			state.isloggeadin = true
			state.loading     = false
			state.currentUser = Object.assign({},payload.user, {token: payload.access_token})
			localStorage.setItem('user',JSON.stringify(state.currentUser))

		},

		loginFallido(state, payload){

			state.loading    = false
			state.auth_error = payload

		},

		logout(state){

			localStorage.removeItem('user')
			state.isloggeadin = false
			state.currentUser = null

		},

		refreshError(state,payload){

			state.auth_error = payload

		},

	},

	getters:{},

	actions:{

		async auth(context,credenciales){
			try {
				let res = await axios.post('/api/auth/login',credenciales)
				return res.data
			} catch(e) {
				throw new Error('credenciales invalidas')
			}
		}
	}

}