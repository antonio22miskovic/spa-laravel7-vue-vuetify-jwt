
export function initialize(store, router){

			//ajuste de seguridad de rutas
			router.beforeEach((to, from, next) => {

			const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
			const currentUser = store.state.auth.currentUser // acedemos al estado del modulo auth

			if (requiresAuth && !currentUser) {

				next('/login')

			}else if(to.path == '/login' && currentUser){

				next('/home')

			}else{

				next()
			}

		})

		axios.interceptors.response.use(null, (error) =>{
			if (error.response.status === 401) {
				 store.dispatch('auth/logout',store.state.auth.currentUser.token)
			}

			return Promise.reject(error)

		})
		// axios.interceptors.response.use((response) => {
  // 			let headers = response.headers
  // 			console.log(headers)
 	// 	 	// your 401 check here
  // 			// token refresh - update client session
  // 			if (headers.authorization !== undefined) {
  //  				setAuthorization(headers.authorization)
  // 		}
  // 			return response
		// })

		if (store.state.auth.currentUser) {
      		setAuthorization(store.state.auth.currentUser.token)
  		}

}

// funcion de manejo de cabezera para manipular el token
export function setAuthorization(token){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}