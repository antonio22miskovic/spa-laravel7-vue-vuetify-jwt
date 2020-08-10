<template>
	<div>
		<v-card-title primary-title>
        	<h4>Introduzca su email</h4>
        </v-card-title>
		<v-form >
            <v-text-field prepend-icon="mdi-email" v-model="email" name="email" label="email"></v-text-field>
            <v-card-actions>
            	<v-btn primary large block @click="confirmacion" >enviar</v-btn>
            </v-card-actions>
        </v-form>
	</div>
</template>
<script>
import { mapState , mapActions , mapMutations } from 'vuex'

	export default{

		name:'EmailVerifique',

		mounted(){
			if (this.$store.state.auth.auth_error !== null) {
				this.$store.commit('auth/refreshError')
			}
		},

		data: () => ({

			email:''

		}),

		methods:{

			confirmacion(){
				this.$store.dispatch('auth/emailVerificacion',this.email).then(res => {
					this.$store.commit('auth/setResetEmail',res.email)
					this.$router.push({name:'codigoVerifique'})
				})
				.catch( err =>{
					this.$store.commit('auth/authError',err)
				})
			}

		}
	}
</script>