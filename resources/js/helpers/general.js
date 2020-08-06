
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

		if (store.state.auth.currentUser) {
      		setAuthorization(store.state.auth.currentUser.token)
  		}

}
// funcion de manejo de cabezera para manipular el token
export function setAuthorization(token){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}