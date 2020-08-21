<template>
	<div>
		<div class="layout column align-center">
        	<img src="logos/logo.png" alt="recuperacion de password" width="180" height="180">
        	<h1 class="flex my-4 primary--text">recuperacion de contraseña</h1>
    	</div>
         <v-card-text>
		<v-form >
            <v-text-field prepend-icon="mdi-email" v-model="email" name="email" :rules="[rules.required]" label="introduzaca su email"></v-text-field>
            <v-card-actions>
            	  <v-btn block color="primary" @click="confirmacion" :loading="loading">enviar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
      <div class="text-center">
    	<v-btn text :to="{name:'login_in'}">login</v-btn>
 	</div>
	</div>
</template>
<script>
import { mapState , mapActions , mapMutations } from 'vuex'

	export default{

		name:'EmailVerifique',

		data: () => ({

			email:'',
			rules: {
        		required: value => !!value || 'Required.'
      		}

		}),

		methods:{

			confirmacion(){
				 this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
				this.$store.dispatch('auth/emailVerificacion',this.email).then(res => {
					this.$store.commit('auth/setResetEmail',res.email)
					this.$router.push({name:'codigoVerifique'})
				})
				.catch( err => {
					this.$store.commit('auth/authError',err)
					this.ErrorModal = true
				})
			}

		},
		computed:{

			 loading(){
        		return this.$store.state.auth.loading
      		},
      		ErrorModal:{
      			set(value){
          			return this.$store.commit('auth/MostrarError',value)
      			},
      			get(){
          			return this.$store.state.auth.showResult
      			}
    		},
		}
	}
</script>