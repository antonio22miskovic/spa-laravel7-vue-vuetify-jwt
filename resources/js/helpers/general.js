
export function initialize(store, router){

			//ajuste de seguridad de rutas
			router.beforeEach((to, from, next) => {

			const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
			const currentUser = store._modules.root.state.auth.currentUser // acedemos al estado del modulo auth

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

			let logout = store._modules.root._children.auth._rawModule.mutations.logout
				logout()
			}

			return Promise.reject(error)

		})
		let userStr = localStorage.getItem('user')

			if (!userStr) {

			return null
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${store._modules.root.state.auth.currentUser.token}`

}