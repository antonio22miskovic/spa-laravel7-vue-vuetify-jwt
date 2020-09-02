// vamos a interceptar todas las rutas
export function Interceptor(store, router){

	//ajuste de seguridad de rutas
	router.beforeEach((to, from, next) => {

		const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
		const currentUser = store.state.AUTH.currentUser// acedemos al estado del modulo auth

		if (requiresAuth && !currentUser) {

			next('/')

		}else if(to.path == '/' && currentUser){

			next('/home')

		}else{

			next()

		}

	})

}
