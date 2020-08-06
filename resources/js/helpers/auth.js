import { setAuthorization } from "./general"

export function  Auth (email, password) {

	let credenciales = { 'email': email, 'password': password }

		return new Promise((resolve, reject) =>{

			axios.post('/api/auth/login', credenciales)
				.then( response => {
					setAuthorization(response.data.access_token)
					return resolve(response.data)
				})
				.catch((error) => {
				   return reject('credenciales invalidas')

				})
		})
}

export function	getlocaluser() {

		const userStr = localStorage.getItem('user')

		if (!userStr)

			return null

		else

			return JSON.parse(userStr)

	}
