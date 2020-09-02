
/////////////////////////// INDEX DE VUEX MANEJO DEl HOME DEL NIVEL ADMIN  //////////////

export const adminHome = {

	namespaced: true,

	state : () => ({

    	drawer: false,

	}),

	mutations:{

		SET_DRAWER(state, payload){

			state.drawer = payload

		}

	},

	actions:{}

}