
export class Auth {

	constructor(email, password){

		this.password = password,
		this.email = email

	}

	login(){

		let credenciales = {

			'email': this.email,
			'password': this.password
		}

		return new Promise((res ,rej) => {

		axios.post('/api/auth/login', credenciales)
		.then( response => {

			res(response.data)

		})
		.catch((error) => {

			rej(" verifique los datos por favor ")

		})

	})


	}

	getlocaluser(){

	const userStr = localStorage.getItem('user')

	if (!userStr) {

		return null
	}

	return JSON.parse(userStr)

	}

}