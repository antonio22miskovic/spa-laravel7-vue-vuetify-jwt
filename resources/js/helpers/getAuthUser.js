
export function	getlocaluser() {

		const userStr = localStorage.getItem('user')

		if (!userStr)

			return null

		else

			return JSON.parse(userStr)

	}
