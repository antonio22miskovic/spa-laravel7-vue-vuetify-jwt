<template>
	<div>
		<v-card-title primary-title>
        	<h6> Introduzca el codigo que fue enviado a su correo: {{$store.state.auth.resetemail}} </h6>
        </v-card-title>
		<v-form >
            <v-text-field prepend-icon="mdi-email" v-model="codigo" name="codigo" label="codigo"></v-text-field>
            <v-card-actions>
            	<v-btn primary large block @click="confirmacion" >confirmar</v-btn>
            </v-card-actions>
        </v-form>
	</div>
</template>
<script>

	export default{

		name:'EmailVerifique',

		mounted(){
			if (this.$store.state.auth.auth_error !== null) {
				this.$store.commit('auth/refreshError')
			}

			if (this.$store.state.auth.resetemail === null) {
				this.$router.push({name:'login_in'})
			}
		},

		data: () => ({

			codigo:''

		}),

		methods:{

			confirmacion(){

				let datos = {
					email  : this.$store.state.auth.resetemail,
					codigo : this.codigo
				}

				this.$store.dispatch('auth/codigoVerificacion',datos).then(res => {
					this.$store.commit('auth/setResetDatos',res.datos)
					this.$router.push({name:'updatePassword'})
				})
				.catch( err =>{
					this.$store.commit('auth/authError',err)
				})
			}

		},

		computed:{

		}
	}
</script>