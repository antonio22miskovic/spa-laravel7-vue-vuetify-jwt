import { Auth } from './helpers/auth'

 const info = new Auth()

const user = info.getlocaluser()

export default {

state:{
	drawer:false,
		currentUser : user,
	isloggeadin: !!user,
	loading: false,
	auth_error: null,
	productos:[],


},

mutations:{

	header(state){

		axios.defaults.headers.common['Authorization'] = `Bearer ${state.currentUser.token}`
	},

	login(state){

		state.loading = true
		state.auth_error = null

	},

	loginexitoso(state, payload){

		state.auth_error = null
		state.isloggeadin = true
		state.loading = false
		state.currentUser = Object.assign({},payload.user, {token: payload.access_token})

		localStorage.setItem('user',JSON.stringify(state.currentUser))

	},

	loginfallido(state, payload){

		state.loading = false
		state.auth_error = payload.error

	},

	logout(state){

		localStorage.removeItem('user')
		state.isloggeadin = false
		state.currentUser = null

	},
	draweroff(state){
  		state.drawer = true
  	},
  	updatedrawer(state, paylod){
  		state.drawer = paylod
  	},
	// cargarproductos(state,payload){
	// 	state.productos = payload
	// }


},
getters:{},
actions:{
	login(context){
		context.commit('login')
	},
	// getproductos(context){

	// 	axios.get('/api/home/productos')
	// 	.then(res =>{
	// 		context.commit('cargarproductos', res.data)
	// 	})

	// }

},


}