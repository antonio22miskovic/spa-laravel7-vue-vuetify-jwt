////////////////////////////////// MODULO DE AUTENTICACION ///////////////////////////////////

import {getlocaluser, getEmailReset, getDatosReset} from '../../helpers/getAuthUser'

const user = getlocaluser()

// reseteo de contraseña
const er = getEmailReset()
const dr = getDatosReset()

export const authModule = {

	namespaced: true,

	state : () => ({

		currentUser : user,
		isloggeadin : !!user,
		loading     : false,
		title       : 'login',

		// errores de validacion
		auth_error  : null,
		showResult  : false,
		// Reseteo de contraseña
		resetemail   : er,
		resetdatos   : dr,

	}),

	mutations:{

		LOADING(state){

			state.loading    = true
			state.auth_error = null

		},

		lOGIN_SUCCESS(state, payload){

			//por si intentaron resetear la contraseña y no lo terminaron
			localStorage.removeItem('email')
			localStorage.removeItem('datos')
			state.auth_error  = null
			state.isloggeadin = true
			state.loading     = false
			state.currentUser = Object.assign({},payload.user, {token: payload.access_token})
			localStorage.setItem('user',JSON.stringify(state.currentUser))

		},

		AUTH_ERROR(state, payload){

			state.loading    = false
			state.auth_error = payload

		},

		ERROR_ON(state, payload){

			state.showResult = payload

		},

		TITLE(state, payload){

			state.title = payload

		},

		lOGOUT(state){

			localStorage.removeItem('user')
			state.isloggeadin = false
			state.currentUser = null

		},

		// recuperar contraseña

		SET_RESET_EMAIL(state,payload){

			state.resetemail = payload
			state.loading    = false
			localStorage.setItem('email',JSON.stringify(payload))

		},

		SET_RESET_DATOS(state,payload){

			state.resetdatos = payload
			state.loading    = false
			localStorage.setItem('datos',JSON.stringify(payload))

		},

		CLEAR_RESET(state){

			localStorage.removeItem('email')
			localStorage.removeItem('datos')
			state.loading    = false
			state.resetemail = null
			state.resetdatos = null

		},

		LOADING_FALSE(state){

			state.loading = false

		}

	},

	getters:{},

	actions:{

		async AUTH(context,credenciales){
			try {
				let res = await axios.post('/api/auth/login',credenciales)
				return res.data
			} catch(e) {
				throw new Error('credenciales invalidas')
			}
		},

		/// RECUPERACION DE CONTRASEÑA
			// verificacion del email
		async EMAIL_RESET_PASSWORD(context,email){
			try {
				let res = await axios.post('/api/reset/email-vereificacion',{email:email})
				return res.data
			} catch(e) {
				throw new Error('email invalido')
			}
		},

			// verificacion codigo
		async CODIGO_RESET_PASSWORD(context,datos){
			try {
				let res = await axios.post('/api/reset/codigo-vereificacion',datos)
				return res.data
			} catch(e) {
				throw new Error('codigo invalido')
			}
		},

		async UPDATE_CODIGO_RESET_PASSWORD(context,datos){
			try {
				let res = await axios.post('/api/reset/update-codigo',datos)
				return res.data
			} catch(e) {
				throw new Error('no se puede actualizar codigo')
			}
		},

		// actualizar la contraseña
		async PASSWORD_UPDATE_RESET_PASSWORD(context,datos){
			try {
				let res = await axios.post('/api/reset/update-password',datos)
				return res.data
			} catch(e) {
				throw new Error('ah habido un problema al actualizar su contraseña')
			}
		},

		// actualizar codigo
		async CODIGO_UPDATE_RESET_PASSWORD(context,datos){
			try {
				let res = await axios.post('/api/reset/update-codigo',datos)
				return res.data
			} catch(e) {
				throw new Error('no se pudo actualizar el codigo')
			}
		},

		// registro del usuario
		async STORE_USER(context,datos){
			try {
				let res = await axios.post('/api/auth/registro/user',datos)
				  	return res.data
			} catch(e) {
				    return e
			}
		}

	}

}