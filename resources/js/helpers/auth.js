
export function Auth (email, password) {
	console.log(email, password)
	let credenciales = { 'email': email, 'password': password }

		return new Promise((resolve, reject) =>{

			axios.post('/api/auth/login', credenciales)

				.then( response => {

				return resolve(response.data)

				})

				.catch((error) => {

				return  reject(" verifique los datos por favor ")

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
