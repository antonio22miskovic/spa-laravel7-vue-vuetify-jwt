
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
				store.commit('auth/logout')
			}

			return Promise.reject(error)

		})

		// axios.interceptors.response.use((response) => {
  // 			let headers = response.headers
 	// 		 // your 401 check here
  // 			// token refresh - update client session
  // 			if (headers.authorization !== undefined) {
  //  					setAuthorization(headers.authorization);
  // 			}

  // 				return response
		// })

		let userStr = localStorage.getItem('user')

			if (!userStr) {

			return null
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.auth.currentUser.token}`

}

