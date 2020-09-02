import {setAuthorization} from './axiosDefaultHeaders'

export function handler(store, router){

	axios.interceptors.response.use(null, (error) =>{

		switch (error.response.status){

			case 401:
				store.commit('auth/logout')
				router.push('/')
			break

			case 500:
				console.log('ah ocurrido un problema en el servidor')
				return Promise.reject(error)
			break

			default:

			break
		}
	})

	// detecta si envie el nuevo token en el header para actualizarlo en el localstore
	axios.interceptors.response.use((response) => {
  		let headers = response.headers
  		console.log(headers)
  		if (headers.authorization !== undefined) {
  				let updateToken = store.state.AUTH.currentUser
  				updateToken.token = headers.authorization
  			localStorage.setItem('user',JSON.stringify(updateToken))
   			setAuthorization(headers.authorization)
  		}
  		    return response
	})

}