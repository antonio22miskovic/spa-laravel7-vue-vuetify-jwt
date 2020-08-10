<template>
	<div>
		<v-card-title primary-title>
        	<h4> nueva contraseña </h4><br>
        	<h6>{{$store.state.auth.resetdatos.email}}</h6>
        </v-card-title>
		<v-form >
            <v-text-field prepend-icon="mdi-password" v-model="newPassword" name="password" label="contraseña"></v-text-field>
            <v-text-field prepend-icon="mdi-password" v-model="newPasswordc" name="password" label="confirmar"></v-text-field>
            <v-card-actions>
            	<v-btn primary large block  @click="confirmacion" >confirmar</v-btn>
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

			if (this.$store.state.auth.resetdatos === null) {
				this.$router.push({name:'login_in'})
			}
		},

		data: () => ({

			newPassword:'',
			newPasswordc:''

		}),

		methods:{

			confirmacion(){

				if (this.newPasswordc === this.newPassword) {
					let datos = {
						email       : this.$store.state.auth.resetdatos.email,
						codigo      : this.$store.state.auth.resetdatos.codigo,
						newPassword : this.newPassword
					}

					this.$store.dispatch('auth/passwordReset',datos).then(res => {
					this.$store.commit('auth/clearReset')
					this.$store.commit('auth/refreshError',null)
					this.$router.push({name:'login_in'})
					})
					.catch( err =>{
						this.$store.commit('auth/authError',err)
					})
				}else{
					this.newPasswordc = null
					this.$store.commit('auth/authError','contraseña no coinciden')
				}

			}

		},

		computed:{

		}
	}
</script>