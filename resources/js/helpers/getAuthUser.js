
	export function	getlocaluser() {

		const userStr = localStorage.getItem('user')

		if (!userStr)

			return null

		else

			return JSON.parse(userStr)

	}


	//////// funciones de reseteo de contraseña
	export function	getEmailReset() {
		const emailReset = localStorage.getItem('email')
		if (!emailReset)
			return null
		else
			return JSON.parse(emailReset)
	}

	export function	getDatosReset() {
		const datosReset = localStorage.getItem('datos')
		if (!datosReset)
			return null
		else
			return JSON.parse(datosReset)
	}