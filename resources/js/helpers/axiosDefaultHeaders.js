// esta funcion inyecta constatemente el token que esta en el estado
export function axiosHeaders(store){

		if (store.state.AUTH.currentUser) {
      		setAuthorization(store.state.AUTH.currentUser.token)
  		}

}

// funcion de manejo de cabezera para manipular el token
export function setAuthorization(token){
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}