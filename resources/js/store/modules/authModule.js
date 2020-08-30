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

		login(state){

			state.loading    = true
			state.auth_error = null
		},

		loginExitoso(state, payload){
			//por si intentaron resetear la contraseña y no lo terminaron
			localStorage.removeItem('email')
			localStorage.removeItem('datos')
			state.auth_error  = null
			state.isloggeadin = true
			state.loading     = false
			state.currentUser = Object.assign({},payload.user, {token: payload.access_token})
			localStorage.setItem('user',JSON.stringify(state.currentUser))

		},

		authError(state, payload){

			state.loading    = false
			state.auth_error = payload

		},

		MostrarError(state, payload){

			state.showResult = payload

		},

		updateTitle(state, payload){
			state.title = payload
		},

		logout(state){

			localStorage.removeItem('user')
			state.isloggeadin = false
			state.currentUser = null

		},

		// recuperar contraseña

		setResetEmail(state,payload){
			state.resetemail = payload
			state.loading    = false
			localStorage.setItem('email',JSON.stringify(payload))

		},

		setResetDatos(state,payload){
			state.resetdatos = payload
			state.loading    = false
			localStorage.setItem('datos',JSON.stringify(payload))

		},

		clearReset(state){

			localStorage.removeItem('email')
			localStorage.removeItem('datos')
			state.loading    = false
			state.resetemail = null
			state.resetdatos = null

		}

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
		},

		/// RECUPERACION DE CONTRASEÑA
			// verificacion del email
		async emailVerificacion(context,email){
			try {
				let res = await axios.post('/api/reset/email-vereificacion',{email:email})
				return res.data
			} catch(e) {
				throw new Error('email invalido')
			}
		},

			// verificacion del email
		async codigoVerificacion(context,datos){
			try {
				let res = await axios.post('/api/reset/codigo-vereificacion',datos)
				return res.data
			} catch(e) {
				throw new Error('codigo invalido')
			}
		},

		async codigoUpdate(context,datos){
			try {
				let res = await axios.post('/api/reset/update-codigo',datos)
				return res.data
			} catch(e) {
				throw new Error('no se puede actualizar codigo')
			}
		},

		// actualizar la contraseña
		async passwordReset(context,datos){
			try {
				let res = await axios.post('/api/reset/update-password',datos)
				return res.data
			} catch(e) {
				throw new Error('ah habido un problema al actualizar su contraseña')
			}
		},

		// actualizar codigo
		async CodigoUpdate(context,datos){
			try {
				let res = await axios.post('/api/reset/update-codigo',datos)
				return res.data
			} catch(e) {
				throw new Error('no se pudo actualizar el codigo')
			}
		},

		// registro del usuario
		async store(context,datos){
			try {
				let res = await axios.post('/api/auth/registro/user',datos)
				  	return res.data
			} catch(e) {
				return e
			}
		}

	}

}