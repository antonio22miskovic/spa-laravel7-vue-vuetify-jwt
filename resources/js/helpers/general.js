
export function initialize(store, router){

			//ajuste de seguridad de rutas
			router.beforeEach((to, from, next) => {

			const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
			const currentUser = store.state.currentUser

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
				store.commit('logout')
				// router.push('/')
			}

			return Promise.reject(error)

		})
		let userStr = localStorage.getItem('user')

			if (!userStr) {

			return null
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.currentUser.token}`

}